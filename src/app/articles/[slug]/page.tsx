import { strapi } from "@strapi/client";
import qs from "qs";
import Image from "next/image";
import { type BlocksContent } from "@strapi/blocks-react-renderer";

import BlockRendererClient from "../../components/BlockRendererClient";

async function getArticle({ slug }: { slug: string }) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const path = `/api/articles`;

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    // populate: ["cover", "blocks"],
    populate: {
      blocks: {
        populate: "*", // Populates all relations and media fields one level deep within components
      },
      cover: {
        populate: "*", // Populates all relations and media fields one level deep within components
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch article post");

  const data = await res.json();
  const article = data?.data[0];

  return article;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticle({ slug: slug });

  const content: BlocksContent = article.blocks;
  // console.log(article);

  return (
    <div>
      <div className="max-w-[800px] mx-auto">
        <div className="relative flex flex-col gap-4">
          <h1 className="relative z-10 text-slate-900 text-4xl font-semibold max-w-[80%] capitalize">
            {article.title}
          </h1>

          <div className=" w-full aspect-video">
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              className="object-cover w-full h-full aspect-video"
              width={800}
              height={800}
            />
          </div>
          {content && <BlockRendererClient content={content} />}
        </div>
      </div>
    </div>
  );
}
