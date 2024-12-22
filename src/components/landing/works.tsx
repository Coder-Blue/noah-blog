"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image, { StaticImageData } from "next/image";
import { SectionWrapper } from "@/hoc";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "./styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { cn } from "@/lib/utils";
import { argon, github, natri, zircon } from "@/public/index";

type TagType = {
  name: string;
  color: string;
};

type TagsType = TagType[];

type ProjectCardProps = {
  index: number;
  name: string;
  description: string;
  tags: TagsType;
  image: StaticImageData | string;
  link: string;
};

function Works() {
  const t = useTranslations("LandingPage");

  const projects: {
    name: string;
    description: string;
    tags: TagsType;
    image: StaticImageData | string;
    link: string;
  }[] = [
    {
      name: "Argon Note",
      description: t("works.project1.description"),
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
      ],
      image: argon,
      link: "https://github.com/Coder-Blue/argon-note",
    },
    {
      name: "Natri Social",
      description: t("works.project2.description"),
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
      ],
      image: natri,
      link: "https://github.com/Coder-Blue/natri-reborn",
    },
    {
      name: "Zircon Blue",
      description: t("works.project3.description"),
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "appwrite",
          color: "pink-text-gradient",
        },
      ],
      image: zircon,
      link: "https://github.com/Coder-Blue/zircon-blue",
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={cn(styles.sectionSubText)}>{t("works.title")}</p>
        <h2 className={cn(styles.sectionHeadText)}>{t("works.overview")}</h2>
      </motion.div>
      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 max-w-3xl text-[17px] leading-[30px] text-secondary"
        >
          {t("works.description")}
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
}

function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  link,
}: ProjectCardProps) {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="w-full rounded-2xl bg-tertiary p-5 sm:w-[360px]"
      >
        <div className="relative h-[230px] w-full">
          <Image
            src={image}
            alt="project_image"
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
            <Link
              href={link}
              className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              target="_blank"
            >
              <Image
                src={github}
                alt="github_repo"
                className="size-1/2 object-contain"
              />
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-[24px] font-bold text-white">{name}</h3>
          <p className="mt-2 text-[14px] text-secondary">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={cn("text-[14px]", tag.color)}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

export default SectionWrapper(Works, "work");
