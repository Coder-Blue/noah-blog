"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ComputersCanvas } from "./canvas";
import { cn } from "@/lib/utils";
import { styles } from "./styles";

export default function Hero() {
  const t = useTranslations("LandingPage");

  return (
    <section className="relative mx-auto h-screen w-full bg-[url('@/public/assets/herobg.png')]">
      <div
        className={cn(
          "absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5",
          styles.paddingX,
        )}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="size-5 rounded-full bg-[#915eff]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>
        <div>
          <h1 className={cn("text-white", styles.heroHeadText)}>
            {t.rich("hero.title", {
              span: (chunks) => (
                <span className="text-[#89CFF0]">{chunks}</span>
              ),
            })}
          </h1>
          <p className={cn("mt-2 text-white-100", styles.heroSubText)}>
            {t.rich("hero.description", {
              br: () => <br className="hidden sm:block" />,
            })}
          </p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute bottom-32 flex w-full items-center justify-center xs:bottom-10">
        <Link href={"#about"}>
          <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 size-3 rounded-full bg-secondary"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
