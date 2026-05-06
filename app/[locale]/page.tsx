"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

function LanguageSwitcher() {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const changeLanguage = (locale: "en" | "fa") => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    router.refresh();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex gap-2 items-center">
      <span>{t("title")}</span>

      {/* Language */}
      <Button onClick={() => changeLanguage("en")}>English</Button>

      <Button onClick={() => changeLanguage("fa")}>فارسی</Button>

      {/* Theme */}
      <Button onClick={toggleTheme}>
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </Button>
    </div>
  );
}

export default LanguageSwitcher;
