"use client";

import "react-phone-input-2/lib/style.css";

import React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Send, Phone } from "lucide-react";

import PhoneInput from "react-phone-input-2";
import { BorderBeam } from "@/components/ui/border-beam";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

function ContactMe() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    reset();
  };

  return (
    <section
      id="contact-me"
      className="relative overflow-hidden pt-16 pb-10 bg-background scroll-mt-18"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/20 blur-[160px]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Work With{" "}
            <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Looking for a Full-Stack Developer to build scalable web apps,
            modern frontends, or robust backend systems? Let’s build something
            powerful together.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-[42px] p-[1.5px] overflow-hidden">
          {/* inner mask */}
          <div className="relative rounded-[40px] bg-card">
            <Card
              className="
                rounded-[40px]
                border border-border/50
                bg-card/95
                backdrop-blur-xl
                shadow-2xl
                p-6 md:p-10
                relative
              "
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Inputs */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Name */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Full Name
                    </label>

                    <Controller
                      name="fullName"
                      control={control}
                      rules={{ required: "Full name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="
                            h-16 rounded-2xl
                            border-border
                            bg-background/60
                            px-5
                            text-lg
                            focus-visible:border-primary
                            focus-visible:ring-0
                            focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)]
                          "
                        />
                      )}
                    />

                    {errors.fullName && (
                      <p className="text-sm text-destructive">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Email Address
                    </label>

                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="email@example.com"
                          className="
                            h-16 rounded-2xl
                            border-border
                            bg-background/60
                            px-5
                            text-lg
                            focus-visible:border-primary
                            focus-visible:ring-0
                            focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)]
                          "
                        />
                      )}
                    />

                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Phone Number
                    </label>

                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <PhoneInput
                          country={"us"}
                          value={field.value}
                          onChange={(phone) => field.onChange(phone)}
                          enableSearch
                          containerClass="w-full"
                          inputClass="!w-full !h-16 !rounded-2xl !border !border-border !bg-background/60 !text-foreground !text-lg !pl-16 !pr-5"
                          buttonClass="!bg-transparent !border-border"
                          dropdownClass="!bg-popover !text-popover-foreground !border-border"
                        />
                      )}
                    />

                    {errors.phone && (
                      <p className="text-sm text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Project Details
                  </label>

                  <Controller
                    name="message"
                    control={control}
                    rules={{
                      required: "Please describe your project",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        rows={7}
                        placeholder="Describe your project..."
                        className="
                          min-h-32
                          resize-none
                          rounded-3xl
                          border-border
                          bg-background/60
                          px-5 py-5
                          text-lg
                          focus-visible:border-primary
                          focus-visible:ring-0
                          focus-visible:shadow-[0_0_25px_hsl(var(--primary)/0.35)]
                        "
                      />
                    )}
                  />

                  {errors.message && (
                    <p className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    h-16 w-full rounded-2xl
                    bg-primary
                    text-primary-foreground
                    text-lg font-semibold
                    transition-all duration-300
                    hover:scale-[1.01]
                    hover:shadow-[0_0_45px_hsl(var(--primary)/0.5)]
                  "
                >
                  <span className="flex items-center gap-3 uppercase tracking-wide">
                    <Send size={20} />

                    {isSubmitting ? "Sending..." : "Send Project Request"}
                  </span>
                </Button>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Socials */}
                <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="flex items-center gap-2 text-lg text-muted-foreground transition hover:text-primary"
                  >
                    <Send size={20} />
                    GitHub
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="flex items-center gap-2 text-lg text-muted-foreground transition hover:text-primary"
                  >
                    <Send size={20} />
                    LinkedIn
                  </Link>

                  <span className="flex items-center gap-2 text-lg text-muted-foreground">
                    <Phone size={20} />
                    Available for freelance work
                  </span>
                </div>
              </form>
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
