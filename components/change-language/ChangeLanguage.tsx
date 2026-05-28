"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { setLocale } from "@/utils/helper";

function ChangeLanguage() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    setLocale(newLocale);
    setOpen(false);
    // Full navigation: router.refresh() re-renders next-themes' inline <script>
    // on the client, which triggers React 19's script-in-component warning.
    window.location.reload();
  };

  const languages = {
    en: { flag: "fi-gb", name: "English" },
    fa: { flag: "fi-ir", name: "فارسی" },
  };

  const current = languages[locale as keyof typeof languages] || languages.en;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <span className={`fi ${current.flag}`}></span>
            <span>{current.name}</span>
          </div>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2 z-1000">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="justify-between items-center gap-2"
            onClick={() => changeLanguage("en")}
          >
            <div className="flex items-center gap-2">
              <span className="fi fi-gb" />
              <span>English</span>
            </div>
            {locale === "en" && <Check size={16} />}
          </Button>
          <Button
            variant="ghost"
            className="justify-between items-center gap-2"
            onClick={() => changeLanguage("fa")}
          >
            <div className="flex items-center gap-2">
              <span className="fi fi-ir" />
              <span>فارسی</span>
            </div>{" "}
            {locale === "fa" && <Check size={16} />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ChangeLanguage;
