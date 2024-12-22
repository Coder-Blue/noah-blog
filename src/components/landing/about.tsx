"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "@/hoc";
import { motion } from "framer-motion";
import { backend, app, web, teacher } from "@/public/index";
import { fadeIn, textVariant } from "@/utils/motion";
import { styles } from "./styles";

function About() {
  const t = useTranslations("LandingPage");

  const services: { title: string; icon: StaticImageData | string }[] = [
    {
      title: t("about.web"),
      icon: web,
    },
    {
      title: t("about.app"),
      icon: app,
    },
    {
      title: t("about.backend"),
      icon: backend,
    },
    {
      title: t("about.teacher"),
      icon: teacher,
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("about.title")}</p>
        <h2 className={styles.sectionHeadText}>{t("about.headtext")}</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        {t("about.paragraph")}
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
}

function ServiceCard({
  index,
  title,
  icon,
}: {
  index: number;
  title: string;
  icon: any;
}) {
  return (
    <Tilt
      className="w-full xs:w-[250px]"
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="green-pink-gradient w-full rounded-[20px] p-[1px] shadow-card"
      >
        <div className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary px-12 py-5">
          <Image
            src={icon}
            alt="phat-trien-web"
            className="h-16 w-16 object-contain"
          />
          <h3 className="text-center text-[20px] font-bold text-white">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

export default SectionWrapper(About, "about");
