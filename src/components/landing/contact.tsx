"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/hoc";
import { motion } from "framer-motion";
import { EarthCanvas } from "./canvas";
import { slideIn } from "@/utils/motion";
import { styles } from "./styles";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations("LandingPage");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICEID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID!,
        {
          from_name: form.name,
          to_name: "Noah Trần",
          from_email: form.email,
          to_email: "trananhquan1009@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(
        () => {
          setLoading(false);
          alert(t("contact.alertMessage.success"));
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert(t("contact.alertMessage.failed"));
        },
      );
  }

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-black-100 p-8"
      >
        <p className={styles.sectionSubText}>{t("contact.title")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.description")}</h3>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="mt-12 flex flex-col gap-8"
        >
          <Label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {t("contact.inputName.label")}
            </span>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.inputName.placeholder")}
              className="rounded-lg border-none bg-tertiary px-6 py-4 font-medium text-white outline-none placeholder:text-muted-foreground"
            />
          </Label>
          <Label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {t("contact.inputEmail.label")}
            </span>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.inputEmail.placeholder")}
              className="rounded-lg border-none bg-tertiary px-6 py-4 font-medium text-white outline-none placeholder:text-muted-foreground"
            />
          </Label>
          <Label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {t("contact.inputMessage.label")}
            </span>
            <Textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.inputMessage.placeholder")}
              className="rounded-lg border-none bg-tertiary px-6 py-4 font-medium text-white outline-none placeholder:text-muted-foreground"
            />
          </Label>
          <Button
            type="submit"
            className="w-fit rounded-xl bg-tertiary px-8 py-3 font-bold text-white shadow-md shadow-primary outline-none"
          >
            {loading
              ? t("contact.loadingMessage.loading")
              : t("contact.loadingMessage.notLoading")}
          </Button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");
