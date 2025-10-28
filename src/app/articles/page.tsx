import qs from "qs";
import Image from "next/image";
import Link from "next/link";

async function getArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const path = "/api/articles";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      cover: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch articles");

  const data = await res.json();
  const articles = data.data;
  // console.log(articles);

  return articles;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  cover: {
    alternativeText: string;
    url: string;
  };
}

export default async function About() {
  const articles = await getArticles();

  return (
    <div>
      <h1>Our Team</h1>
      <div className="relative grid sm:grid-cols-3 gap-6">
        {articles.map((article: Article) => (
          <Link
            href={`/articles/${article.slug}`}
            className="relative  h-[40vh] shadow-md rounded-md flex justify-center items-center"
            key={article.slug}
          >
            <h2 className="relative z-10 text-slate-100 text-xl font-semibold max-w-[80%] text-center capitalize">
              {article.title}
            </h2>
            <div className="absolute top-0 left-0 z-0 w-full h-full">
              <Image
                src={article.cover.url}
                alt={article.cover.alternativeText}
                className="object-cover w-full h-full"
                width={800}
                height={800}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
