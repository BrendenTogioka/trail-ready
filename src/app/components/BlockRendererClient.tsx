"use client";
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

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <BlocksRenderer content={content} />
      </div>
    </div>
  );
}
