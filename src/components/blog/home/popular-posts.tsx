"use client";

import { Link } from "@/i18n/routing";
import { popularPosts } from "@/constants";
import { Icons } from "@/components/icons";

export default function PopularPosts() {
  return (
    <ul className="overflow-auto">
      {popularPosts.map((post) => (
        <Link href={`/blog/`} key={post.title}>
          <li className="group flex cursor-pointer items-center gap-2 py-2">
            <Icons.arrowRight className="size-6 transition-all group-hover:translate-x-1" />
            <p>{post.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
