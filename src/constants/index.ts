import type { StaticImageData } from "next/image";
import {
  bun,
  css,
  git,
  html,
  javascript,
  nextjs,
  prisma,
  reactjs,
  svelte,
  tailwind,
  tauri,
  typescript,
  vitejs,
} from "@/public/index";

const technologies: { name: string; icon: StaticImageData | string }[] = [
  {
    name: "HTML5",
    icon: html,
  },
  {
    name: "CSS3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Vite",
    icon: vitejs,
  },
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "Svelte",
    icon: svelte,
  },
  {
    name: "NextJS",
    icon: nextjs,
  },
  {
    name: "Bun",
    icon: bun,
  },
  {
    name: "TailwindCss",
    icon: tailwind,
  },
  {
    name: "Tauri",
    icon: tauri,
  },
  {
    name: "PrismORM",
    icon: prisma,
  },
  {
    name: "git",
    icon: git,
  },
];

const categories: { title: string; href: string }[] = [
  { title: "Life", href: "life" },
  { title: "Philosophy", href: "philosophy" },
  { title: "FAQ", href: "faq" },
  { title: "React", href: "react" },
  { title: "Svelte", href: "svelte" },
  { title: "Tools", href: "tools" },
];

const posts: { href: string }[] = [
  { href: "/blog/post/life" },
  { href: "/blog/post/philosophy" },
  { href: "/blog/post/faq" },
  { href: "/blog/post/react" },
  { href: "/blog/post/svelte" },
  { href: "/blog/post/tools" },
];

export { technologies, categories, posts };
