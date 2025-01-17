// @ts-ignore

import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JetBrains_Mono } from "next/font/google";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { highlight } from "sugar-high";

import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

const jetbrainFont = JetBrains_Mono({
  subsets: ["vietnamese"],
  weight: ["100"],
});

function Blockquote(props: any) {
  return (
    <blockquote
      className="blockquote rounded-md bg-blue-200 bg-opacity-30 p-4 dark:bg-blue-950 dark:bg-opacity-30"
      {...props}
    />
  );
}

function Code({ children, props }: any) {
  let codeHTML = highlight(children);

  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={jetbrainFont.className}
      {...props}
    />
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <Link {...props} />;
  }

  return <Link target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  function Heading({ children }: any) {
    let slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  }

  Heading.displayName = `Heading${level}`;
  return Heading;
}

function Table({ data }: any) {
  let headers = data.headers.map((header: any, index: any) => (
    <th key={index}>{header}</th>
  ));

  let rows = data.rows.map((cell: any, cellIndex: any) => (
    <td key={cellIndex}>{cell}</td>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  blockquote: Blockquote,
  Table,
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeKatex],
  },
};

export default function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={options}
    />
  );
}
