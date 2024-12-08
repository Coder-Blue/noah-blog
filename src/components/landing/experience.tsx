"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionWrapper } from "@/hoc";
import HumanCanvas from "./canvas/human";
import { lamson, pc, webdev } from "@/public/index";

function Experience() {
  const t = useTranslations("LandingPage");
  const [animationName, setAnimationName] = useState("idle");

  const workExperiences = [
    {
      name: t("experience.job1.name"),
      pos: t("experience.job1.pos"),
      duration: t("experience.job1.duration"),
      title: t("experience.job1.title"),
      icon: lamson,
      animation: "victory",
    },
    {
      name: t("experience.job2.name"),
      pos: t("experience.job2.pos"),
      duration: t("experience.job2.duration"),
      title: t.rich("experience.job2.title", {
        a: (chunks) => (
          <a
            href="https://github.com/Coder-Blue"
            className="hover:pointer text-violet-600"
            target="_blank"
          >
            {chunks}
          </a>
        ),
      }),
      icon: webdev,
      animation: "clapping",
    },
    {
      name: t("experience.job3.name"),
      pos: t("experience.job3.pos"),
      duration: t("experience.job3.duration"),
      title: t("experience.job3.title"),
      icon: pc,
      animation: "salute",
    },
  ];

  return (
    <section className="my-20 px-5 sm:px-10">
      <div className="w-full text-white-600">
        <h3 className="text-gray_gradient text-3xl font-semibold sm:text-4xl">
          {t("experience.title")}
        </h3>
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="z-[99] col-span-1 rounded-[20px] border border-black-300 bg-tertiary">
            <HumanCanvas animationName={animationName} />
          </div>
          <div className="green-pink-gradient col-span-2 rounded-[20px] p-[1px] shadow-card">
            <div className="rounded-[20px] bg-tertiary px-2.5 py-5 sm:px-5 sm:py-10">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() =>
                    setAnimationName(item.animation.toLowerCase())
                  }
                  onPointerOut={() => setAnimationName("idle")}
                  className="group grid cursor-pointer grid-cols-[auto_1fr] items-start gap-5 rounded-[20px] px-2.5 transition-all duration-500 ease-in-out hover:bg-black-300 sm:px-5"
                >
                  <div className="flex h-full flex-col items-center justify-start py-2">
                    <div className="h-16 w-16 rounded-[20px] bg-black-600 p-2">
                      <Image
                        src={item.icon}
                        alt="logo"
                        className="h-full w-full"
                      />
                    </div>
                    <div className="mt-4 h-full w-0.5 flex-1 bg-black-300 group-last:hidden group-hover:bg-black-500" />
                  </div>
                  <div className="px-2.5 py-5 sm:p-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="mb-5 text-sm">
                      {item.pos} | <span>{item.duration}</span>
                    </p>
                    <p className="transition duration-500 ease-in-out group-hover:text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(Experience, "");
