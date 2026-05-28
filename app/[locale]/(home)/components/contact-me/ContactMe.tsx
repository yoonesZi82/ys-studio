"use client";

import "react-phone-input-2/lib/style.css";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Phone, Send } from "lucide-react";

import PhoneInput from "react-phone-input-2";
import irLabels from "react-phone-input-2/lang/ir.json";
import { useLocale, useTranslations } from "next-intl";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

import { getSubmitContactErrorMessage } from "@/app/helper/contact-messages/contact-messages-client";
import { useSubmitContactMessage } from "@/app/hooks/contact-messages/use-submit-contact-message";

import {
  ContactFormCardOverlay,
  type ContactFormOverlayPhase,
} from "./components/contact-form-card-overlay";
import { ContactFormFeedbackAlert } from "./components/contact-form-feedback-alert";
import { GithubIcon } from "./svgs/github-icon";
import { TelegramIcon } from "./svgs/telegram-icon";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

function ContactMe() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRtl = locale === "fa";
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [overlayPhase, setOverlayPhase] = useState<
    "hidden" | ContactFormOverlayPhase
  >("hidden");

  const isFormLocked = overlayPhase !== "hidden";

  const { mutate: submitContactMessage, isPending } = useSubmitContactMessage();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setSubmitError(null);
    setOverlayPhase("loading");

    submitContactMessage(
      { ...data, locale },
      {
        onSuccess: () => {
          reset();
          setOverlayPhase("success");
        },
        onError: (error) => {
          setOverlayPhase("hidden");
          setSubmitError(
            getSubmitContactErrorMessage(error) ?? t("form.submitError"),
          );
        },
      },
    );
  };

  const dismissOverlay = () => setOverlayPhase("hidden");

  return (
    <section
      id="contact-me"
      className="relative bg-background pt-16 pb-10 overflow-hidden scroll-mt-18"
    >
      <ContactFormFeedbackAlert
        error={submitError}
        onDismissError={() => setSubmitError(null)}
      />
      <div className="top-0 left-1/2 absolute bg-primary/20 blur-[160px] rounded-full w-125 h-125 -translate-x-1/2 pointer-events-none" />

      <div className="z-10 relative container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-bold text-foreground text-5xl md:text-6xl tracking-tight">
            {t("heading.line1")}{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/40 text-transparent">
              {t("heading.line1Highlight")}
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-lg leading-8">
            {t("description")}
          </p>
        </div>

        <div className="relative mx-auto p-[1.5px] rounded-[42px] max-w-5xl overflow-hidden">
          <div className="relative bg-card rounded-[40px]">
            <Card className="relative bg-card/95 shadow-2xl backdrop-blur-xl p-6 md:p-10 border border-border/50 rounded-[40px] overflow-hidden">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(
                  "space-y-8 transition-[opacity,filter] duration-300",
                  isFormLocked &&
                    "opacity-50 pointer-events-none select-none blur-[1px]",
                )}
              >
                <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                      {t("form.fullName")}
                    </label>

                    <Controller
                      name="fullName"
                      control={control}
                      rules={{ required: t("form.errors.fullNameRequired") }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={t("form.fullNamePlaceholder")}
                          className="bg-background/60 focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)] px-5 border-border focus-visible:border-primary rounded-2xl focus-visible:ring-0 h-16 text-lg"
                        />
                      )}
                    />

                    {errors.fullName && (
                      <p className="text-destructive text-sm">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                      {t("form.email")}
                    </label>

                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: t("form.errors.emailRequired"),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t("form.errors.emailInvalid"),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder={t("form.emailPlaceholder")}
                          className="bg-background/60 focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)] px-5 border-border focus-visible:border-primary rounded-2xl focus-visible:ring-0 h-16 text-lg"
                        />
                      )}
                    />

                    {errors.email && (
                      <p className="text-destructive text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                      {t("form.phone")}
                    </label>

                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: t("form.errors.phoneRequired") }}
                      render={({ field }) => (
                        <div className="phone-input-container">
                          <PhoneInput
                            country={isRtl ? "ir" : "us"}
                            preferredCountries={
                              isRtl
                                ? ["ir", "ae", "tr", "de", "us"]
                                : ["us", "gb", "de", "ir"]
                            }
                            localization={isRtl ? irLabels : undefined}
                            searchPlaceholder={t("form.phoneSearchPlaceholder")}
                            searchNotFound={t("form.phoneSearchNotFound")}
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            enableSearch
                            containerClass="w-full"
                            inputClass={cn(
                              "!bg-background/60 !border !border-border !rounded-2xl !w-full !h-16 !text-foreground !text-lg",
                              isRtl
                                ? "!pr-16 !pl-5 !text-left"
                                : "!pl-16 !pr-5",
                            )}
                            buttonClass={cn(
                              "!bg-transparent !border-border",
                              isRtl ? "!rounded-r-2xl" : "!rounded-l-2xl",
                            )}
                            dropdownClass="!bg-popover !text-popover-foreground !border-border"
                            searchClass="!bg-popover !text-popover-foreground !border-border"
                          />
                        </div>
                      )}
                    />

                    {errors.phone && (
                      <p className="text-destructive text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                    {t("form.message")}
                  </label>

                  <Controller
                    name="message"
                    control={control}
                    rules={{
                      required: t("form.errors.messageRequired"),
                      minLength: {
                        value: 10,
                        message: t("form.errors.messageMinLength"),
                      },
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        rows={7}
                        placeholder={t("form.messagePlaceholder")}
                        className="bg-background/60 focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)] px-5 py-5 border-border focus-visible:border-primary rounded-3xl focus-visible:ring-0 min-h-32 text-lg resize-none"
                      />
                    )}
                  />

                  {errors.message && (
                    <p className="text-destructive text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isFormLocked}
                  className="bg-primary hover:shadow-[0_0_45px_hsl(var(--primary)/0.5)] rounded-2xl w-full h-16 font-semibold text-primary-foreground text-lg hover:scale-[1.01] transition-all duration-300"
                >
                  <span className="flex items-center gap-3 uppercase tracking-wide">
                    <Send size={20} />
                    {isPending || overlayPhase === "loading"
                      ? t("form.submitting")
                      : t("form.submit")}
                  </span>
                </Button>

                <div className="bg-gradient-to-r from-transparent to-transparent via-border w-full h-px" />

                <div className="flex flex-wrap justify-center items-center gap-8 pt-2">
                  <Link
                    href="https://github.com/yoonesZi82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary text-lg transition"
                  >
                    <GithubIcon size={20} />
                    {t("social.github")}
                  </Link>

                  <Link
                    href="https://t.me/Yoones_Zi82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary text-lg transition"
                  >
                    <TelegramIcon size={20} />
                    {t("social.telegram")}
                  </Link>

                  <Link
                    href="tel:+989912209730"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary text-lg transition"
                  >
                    <Phone size={20} className="shrink-0" aria-hidden />
                    {t("social.phone")} (+989912209730)
                  </Link>
                </div>
              </form>

              <AnimatePresence mode="wait">
                {overlayPhase !== "hidden" ? (
                  <ContactFormCardOverlay
                    key="overlay"
                    phase={overlayPhase}
                    onDismiss={dismissOverlay}
                  />
                ) : null}
              </AnimatePresence>

              <BorderBeam
                duration={8}
                size={100}
                colorFrom="#006239"
                colorTo="#72e3ad"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMe;
