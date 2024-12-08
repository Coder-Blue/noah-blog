"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { SectionWrapper } from "@/hoc";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { styles } from "./styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { avatar } from "@/public/index";

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  usingProduct: string;
  image: StaticImageData | string;
};

function Feedbacks() {
  const t = useTranslations("LandingPage");

  const testimonials = [
    {
      testimonial: t("testimonials.testimonial1"),
      name: t("testimonials.name"),
      designation: t("testimonials.designation"),
      usingProduct: "Natri SOC",
      image: avatar,
    },
    {
      testimonial: t("testimonials.testimonial2"),
      name: t("testimonials.name"),
      designation: t("testimonials.designation"),
      usingProduct: "Argon Note",
      image: avatar,
    },
    {
      testimonial: t("testimonials.testimonial3"),
      name: t("testimonials.name"),
      designation: t("testimonials.designation"),
      usingProduct: "Zircon Blue",
      image: avatar,
    },
  ];

  return (
    <div className="mt-12 rounded-[20px] bg-black-100">
      <div
        className={cn("min-h-[300px] rounded-2xl bg-tertiary", styles.padding)}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t("testimonials.title")}</p>
          <h2 className={styles.sectionHeadText}>
            {t("testimonials.description")}
          </h2>
        </motion.div>
      </div>
      <div className={cn("-mt-20 flex flex-wrap gap-7 pb-14", styles.paddingX)}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={`${testimonial.name} - ${index}`}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
}

function FeedbackCard({
  index,
  testimonial,
  name,
  designation,
  usingProduct,
  image,
}: FeedbackCardProps) {
  const t = useTranslations("LandingPage");

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="w-full rounded-3xl bg-black-200 p-10 xs:w-[320px]"
    >
      <p className="text-[48px] font-black text-white">"</p>
      <div className="mt-1">
        <p className="text-[18px] tracking-wider text-white">{testimonial}</p>
        <div className="mt-7 flex items-center justify-between gap-1">
          <div className="flex flex-1 flex-col">
            <p className="text-[16px] font-medium text-white">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            <p className="mt-1 text-[12px] text-secondary">
              {designation} {t("testimonials.of")} {usingProduct}
            </p>
          </div>
          <Image
            src={image}
            alt={`feedback by ${name} number ${index}`}
            className="size-10 rounded-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SectionWrapper(Feedbacks, "");
