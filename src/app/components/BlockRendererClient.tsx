"use client";

import Markdown from "markdown-to-jsx";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  console.log(content[0]);
  const markdown: string = content[0].body;
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
