

import getPlatform from "@/utils/platform";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default function SelectLanguage() {
  const [language, setLanguage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([]);
  const [moleculesVisible, setMoleculesVisible] = useState(false);
  const [unique, setUnique] = useState(null)

  const router = useRouter();
  useEffect(() => {
    const id =  uuidv4()
    setUnique(id)
  }, []);


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

  // Animation sequence on component mount
  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setTitleVisible(true), 600);

    // Show cards one by one with staggered delays
    languages.forEach((_, index) => {
      setTimeout(() => {
        setCardsVisible((prev) => [...prev, index]);
      }, 1000 + index * 150); // Start at 1000ms, then 150ms delay between each card
    });

    // Show molecules after all cards are visible
    const timer3 = setTimeout(
      () => setMoleculesVisible(true),
      1000 + languages.length * 150 + 200
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleClick = (language) => {
    if (platform === "iOS") {
      setTimeout(
        () =>
          router.push(
            `/talking-iOS-brochure?language=${language}&unique=${unique}`
          ),
        300
      );
    } else {
      setTimeout(
        () =>
          router.push(
            `/talking-brochure?language=${language}&unique=${unique}`
          ),
        300
      );
    }
  };

  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const platformName = getPlatform();
    setPlatform(platformName);
  }, []);

  const languagesUI = languages.map((lang, index) => {
    const isCardVisible = cardsVisible.includes(index);

    return (
      <div
        onClick={() => handleClick(lang?.name)}
        key={index}
        className={`bg-white/35
        hover:bg-[#494949]/60 hover:border-[3px] hover:border-white max-w-[136px] md:max-w-28 w-[136px] md:max-h-24 max-h-[116px] h-[116px] flex flex-col gap-y-3 items-center justify-center shadow-[0px_2px_6px_0px_#0000001A] rounded-[10px] py-[14px] px-8 cursor-pointer transition-all duration-500 active:scale-75
        ${
          isCardVisible
            ? "opacity-100 transform translate-y-0 scale-100"
            : "opacity-0 transform translate-y-8 scale-90"
        }`}
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
    <div
      className={`relative flex justify-center items-center h-svh transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center bg-[#C04A6D]">
        <div className="relative z-10 h-full flex flex-col p-6">
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full">
              <div
                className={`transition-all duration-800 ease-out mb-8 ${
                  titleVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                }`}
              >
                <h1 className="font-Poppins text-[28.1px] md:text-2xl font-semibold leading-[38.2px] text-center text-white select-none">
                  Choose Language
                </h1>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-2 items-center justify-center">
                {languagesUI}
              </div>
            </div>
          </div>
        </div>

        {/* Molecule decorations with fade in */}
        <div
          className={`transition-opacity duration-800 ease-out ${
            moleculesVisible ? "opacity-100" : "opacity-0"
          }`}
        >
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
            className="mx-auto drop-shadow-lg absolute -bottom-10 rotate-45 right-10"
          />
        </div>
      </div>
    </div>
  );
}
