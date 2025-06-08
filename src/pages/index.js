// 

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [facialKitVisible, setFacialKitVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setLogoAnimated(true), 600);
    const timer3 = setTimeout(() => setFacialKitVisible(true), 1200);
    const timer4 = setTimeout(() => setButtonVisible(true), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleGetStarted = () => {
    router.push("/explore");
  };

  return (
    <div
      className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/streax-girl.png')",
        }}
      >
        {/* Pink transparent overlay */}
        <div className="absolute inset-0 bg-[#C04A6D]/70"></div>

        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Top content area */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-center">
                {/* Logo with slide animation */}
                <div
                  className={`transition-all duration-800 ease-out ${
                    logoAnimated
                      ? "transform translate-y-0 opacity-100"
                      : "transform translate-y-12 opacity-0"
                  }`}
                >
                  <Image
                    src="/images/streax-logo.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="mx-auto drop-shadow-lg"
                  />
                </div>

                {/* Facial kit with opacity animation */}
                <div
                  className={`transition-opacity duration-800 ease-out mt-4 ${
                    facialKitVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src="/images/facial-kit.png"
                    alt="Facial Kit"
                    width={320}
                    height={120}
                    className="mx-auto drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom button with slide up animation */}
          <div className="flex justify-center">
            <div
              className={`w-full transition-all duration-800 ease-out ${
                buttonVisible
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-16 opacity-0"
              }`}
            >
              <button
                onClick={handleGetStarted}
                className="bg-white text-black font-semibold text-xl px-6 py-5 w-full rounded-full shadow-lg hover:bg-pink-50 hover:scale-105 transition-all duration-200 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}