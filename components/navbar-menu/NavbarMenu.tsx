"use client";
import React, { useState } from "react";
import ChangeTheme from "../change-theme/ChangeTheme";
import ChangeLanguage from "../change-language/ChangeLanguage";
import { useTranslations } from "next-intl";
import {
  Menu,
  House,
  User,
  BriefcaseBusiness,
  FolderKanban,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

function NavbarMenu() {
  const t = useTranslations("navbar");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 30);
  });

  const navLinks = [
    { href: "#home", label: t("home"), icon: House },
    { href: "#about", label: t("about"), icon: User },
    { href: "#services", label: t("services"), icon: BriefcaseBusiness },
    { href: "#portfolio", label: t("portfolio"), icon: FolderKanban },
    { href: "#contact", label: t("contact"), icon: Mail },
  ];

  const handleLinkClick = () => setOpen(false);

  return (
    <div className="fixed inset-x-0 top-4 lg:top-6 z-999">
      <div className="container flex justify-center">
        <motion.nav
          animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible ? "0 10px 40px rgba(0,0,0,0.1)" : "none",
            width: visible ? "65%" : "100%",
            y: visible ? 10 : 0,
            borderRadius: visible ? "100px" : "12px",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
          }}
          className={cn(
            "w-full border border-border px-4 py-2 flex items-center justify-between",
            visible && "bg-white/10 dark:bg-neutral-900/70 backdrop-blur",
          )}
        >
          {/* logo */}
          <p className="hidden md:block text-lg font-bold">YS Studio</p>

          {/* desktop menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative flex items-center gap-2 text-foreground/80 hover:text-foreground transition py-1 group"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>

                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ChangeTheme />
            <ChangeLanguage />
          </div>

          {/* mobile */}
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="sr-only" />
                  <ChangeLanguage />
                </SheetHeader>

                <div className="flex flex-col gap-4 p-2">
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent"
                          >
                            <Icon className="h-5 w-5" />
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* mobile logo */}
          <p className="md:hidden absolute left-1/2 -translate-x-1/2 font-bold">
            YS Studio
          </p>

          {/* mobile theme */}
          <div className="md:hidden ms-auto">
            <ChangeTheme />
          </div>
        </motion.nav>
      </div>
    </div>
  );
}

export default NavbarMenu;
