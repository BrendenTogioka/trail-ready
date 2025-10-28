"use client";
import { useState } from "react";
import Image from "next/image";
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

  return (
    <div className="flex flex-col gap-7">
      {content.map((data, i) => {
        if (data.__component === "shared.rich-text") {
          return <Markdown key={i}>{data.body}</Markdown>;
        } else if (data.__component === "shared.media") {
          return (
            <Image
              key={i}
              src={data.file.url}
              alt={data.file.alternativeText}
              width={data.file.width}
              height={data.file.height}
              className="rounded-lg"
            />
          );
        } else if (data.__component === "shared.quote") {
          return (
            <blockquote
              key={i}
              className="text-center py-20 bg-slate-900 text-slate-100 rounded-lg"
            >
              <p className="text-2xl">{data.body}</p>
              <cite className="text-lg">{data.title}</cite>
            </blockquote>
          );
        }
      })}
    </div>
  );
}
