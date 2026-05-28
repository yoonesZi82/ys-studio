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
      className="relative bg-background pt-16 pb-10 overflow-hidden scroll-mt-18"
    >
      {/* Glow */}
      <div className="top-0 left-1/2 absolute bg-primary/20 blur-[160px] rounded-full w-125 h-125 -translate-x-1/2 pointer-events-none" />

      <div className="z-10 relative container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-bold text-foreground text-5xl md:text-6xl tracking-tight">
            Work With{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/40 text-transparent">
              Me
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-lg leading-8">
            Looking for a Full-Stack Developer to build scalable web apps,
            modern frontends, or robust backend systems? Let’s build something
            powerful together.
          </p>
        </div>

        <div className="relative mx-auto p-[1.5px] rounded-[42px] max-w-5xl overflow-hidden">
          {/* inner mask */}
          <div className="relative bg-card rounded-[40px]">
            <Card
              className="relative bg-card/95 shadow-2xl backdrop-blur-xl p-6 md:p-10 border border-border/50 rounded-[40px]"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Inputs */}
                <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                  {/* Name */}
                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
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

                  {/* Email */}
                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
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

                  {/* Phone */}
                  <div className="flex flex-col gap-3">
                    <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                      Phone Number
                    </label>

                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <div className="phone-input-container">
                          <PhoneInput
                            country={"us"}
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            enableSearch
                            containerClass="w-full"
                            inputClass="!w-full !h-16 !rounded-2xl !border !border-border !bg-background/60 !text-foreground !text-lg !pl-16 !pr-5"
                            buttonClass="!bg-transparent !border-border !rounded-l-2xl"
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

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
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

                {/* Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:shadow-[0_0_45px_hsl(var(--primary)/0.5)] rounded-2xl w-full h-16 font-semibold text-primary-foreground text-lg hover:scale-[1.01] transition-all duration-300"
                >
                  <span className="flex items-center gap-3 uppercase tracking-wide">
                    <Send size={20} />

                    {isSubmitting ? "Sending..." : "Send Project Request"}
                  </span>
                </Button>

                {/* Divider */}
                <div className="bg-gradient-to-r from-transparent to-transparent via-border w-full h-px" />

                {/* Socials */}
                <div className="flex flex-wrap justify-center items-center gap-8 pt-2">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary text-lg transition"
                  >
                    <Send size={20} />
                    GitHub
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary text-lg transition"
                  >
                    <Send size={20} />
                    LinkedIn
                  </Link>

                  <span className="flex items-center gap-2 text-muted-foreground text-lg">
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
