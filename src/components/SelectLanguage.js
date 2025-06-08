import Image from "next/image";
import { useState } from "react";

export default function SelectLanguage() {
  const [language, setLanguage] = useState("");

  const languages = [
    { icon: "/svgs/english.svg", name: "English" },
    { icon: "/svgs/hindi.svg", name: "Hindi" },
    { icon: "/svgs/tamil.svg", name: "Tamil" },
    { icon: "/svgs/marathi.svg", name: "Marathi" },
    { icon: "/svgs/bengali.svg", name: "Bengali" },
    { icon: "/svgs/kannada.svg", name: "Kannada" },
    { icon: "/svgs/telugu.svg", name: "Telugu" },
    { icon: "/svgs/malayalam.svg", name: "Malayalam" },
  ];

  const handleLanguageSelect = (langName) => {
    setTimeout(() => setLanguage(langName), 500);
  };

  const languagesUI = languages.map((lang, index) => {
    return (
      <div
        onClick={() => handleLanguageSelect(lang?.name)}
        key={index}
        className={`bg-white/35
        hover:bg-[#494949]/60 hover:border-[3px] hover:border-white max-w-[136px] md:max-w-28 w-[136px] md:max-h-24 max-h-[116px] h-[116px] flex flex-col gap-y-3 items-center justify-center shadow-[0px_2px_6px_0px_#0000001A] rounded-[10px] py-[14px] px-8 cursor-pointer
        `}
      >
        <Image
          src={lang.icon}
          alt="language icon"
          width={48}
          height={48}
          className="h-12 md:h-10 w-auto"
        />

        <span className="text-white font-Poppins text-xl md:text-lg font-medium text-center select-none">
          {lang.name}
        </span>
      </div>
    );
  });

  return (
    <div className="relative flex justify-center items-center h-svh bg-[#C04A6D]">
      <div className="relative w-md h-svh  rounded-lg overflow-hidden shadow-lg bg-cover bg-center">
        <div className="relative z-10 h-full flex flex-col p-6">
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full">
              <h1 className="font-Poppins text-[28.1px] md:text-2xl font-semibold leading-[38.2px] text-center text-white select-none mb-8">
                Choose Language
              </h1>
              <div className="flex flex-wrap gap-5 md:gap-2 items-center justify-center">
                {languagesUI}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/images/molecules.png"
        alt="Logo"
        width={120}
        height={120}
        className="mx-auto drop-shadow-lg absolute rotate-45 -top-12 left-10 z-30"
      />
      <Image
        src="/images/molecules.png"
        alt="Logo"
        width={120}
        height={120}
        className="mx-auto drop-shadow-lg absolute -bottom-10 rotate-45 right-10 "
      />
    </div>
  );
}
