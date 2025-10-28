"use client";

import Markdown from "markdown-to-jsx";

interface Content {
  body: string;
}

export default function BlockRendererClient({
  content,
}: {
  readonly content: Content[];
}) {
  if (!content) return null;
  const articleContent: Content = content[0];
  // console.log(content[0]);
  const markdown: string = articleContent.body;
  return (
    <div className="">
      {/* <div className="blocks">
        <BlocksRenderer content={content} />
      </div> */}
      <div className="flex flex-col gap-7">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
