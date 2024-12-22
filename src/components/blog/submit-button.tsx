"use client";

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("BlogPage");

  return (
    <Button aria-disabled={pending} disabled={pending}>
      {pending
        ? t("frontPage.footer.newletter.emailInput.submitButton.loading")
        : t("frontPage.footer.newletter.emailInput.submitButton.normal")}
    </Button>
  );
}
