// // // import Image from "next/image";
// // // import React, { useEffect, useState } from "react";

// // // export default function HeroSection() {
// // //   const handleClick = (path) => {
// // //     if (path === `/interaction`) {
// // //       // navigate(`${path}/?platform=${platform}`);
// // //     } else {
// // //       // navigate(path);
// // //     }
// // //   };

// // //   const [isAnimating, setIsAnimating] = useState(true);
// // //   const [platform, setPlatform] = useState("");

// // //   // const navigate = useNavigate();

// // //   useEffect(() => {
// // //     //   sessionStorage.setItem("uuId", uuidv4());
// // //     //   console.log(sessionStorage.getItem("uuId"));
// // //   }, []);

// // //   useEffect(() => {
// // //     //   const platformName = getPlatform();
// // //     //   setPlatform(platformName);
// // //   }, []);

// // //   const items = [
// // //     {
// // //       title: "Explore Streax Products",
// // //       icon: "/svgs/search.svg",
// // //       path: "/interaction",
// // //     },

// // //     {
// // //       title: "Download Brochure PDF",
// // //       icon: "/svgs/download.svg",
// // //       path: "/download",
// // //     },
// // //   ];

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       setIsAnimating(false);
// // //     }, 1000); // Duration of the animation

// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   return (
// // //     <div className="flex justify-center items-center h-svh">
// // //       <div
// // //         className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
// // //         style={{
// // //           backgroundImage: "url('/images/light-bg.png')",
// // //         }}
// // //       >
// // //         <div className="relative z-10 h-full flex flex-col p-6">
// // //           {/* Top - Logo */}
// // //           <div className="text-center py-4">
// // //             <Image
// // //               src="/images/streax-logo.png"
// // //               alt="Logo"
// // //               width={120}
// // //               height={120}
// // //               className="mx-auto drop-shadow-lg"
// // //             />
// // //           </div>

// // //           {/* Middle - Main Content */}
// // //           <div className="flex-1 flex justify-center items-center">
// // //             <div className="w-full text-black">
// // //               {items?.map((e, index) => (
// // //                 <div
// // //                   onClick={() =>
// // //                     ["Find Trusted Painter", "Play to Win"].includes(e.title)
// // //                       ? {}
// // //                       : handleClick(e.path)
// // //                   }
// // //                   key={index}
// // //                   className={`${
// // //                     ["Find Trusted Painter"].includes(e.title)
// // //                       ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
// // //                       : "bg-white border-[#F7F7F7]/50"
// // //                   } group

// // //             md:max-h-14 group rounded-[6rem] w-full mx-auto mb-4 font-Poppins text-xl font-semibold text-center py-3 px-3 border-2 flex items-center cursor-pointer hover:shadow-xl
// // //             ${
// // //               !isAnimating
// // //                 ? "opacity-100 scale-100 transition-all duration-700 delay-200"
// // //                 : "opacity-0 scale-50"
// // //             }`}
// // //                 >
// // //                   <div className="flex flex-1 gap-1 items-center">
// // //                     <img
// // //                       className={`h-8 ${index === 2 && "opacity-30"}`}
// // //                       src={e.icon}
// // //                       alt="option icon"
// // //                     />
// // //                     <div className="flex flex-col items-start">
// // //                       <strong
// // //                         className={`${index === 2 && "text-[#969696]"}
// // //                    text-left  font-Poppins text-[13.23px] leading-[18.5px]  font-semibold`}
// // //                       >
// // //                         {e.title}
// // //                       </strong>

// // //                       {["Find Trusted Painter", "Play to Win"].includes(
// // //                         e.title
// // //                       ) && (
// // //                         <span className="font-Poppins text-xs font-semibold ">
// // //                           Coming Soon...{" "}
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                   <img
// // //                     className={`group-hover:animate-bounceLR ${
// // //                       index === 2 && "opacity-50"
// // //                     }`}
// // //                     src="/svgs/arrow.svg"
// // //                     alt="arrow"
// // //                   />
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           <div className="py-10">
// // //             <Image
// // //               src="/images/hivoco.png"
// // //               alt="Logo"
// // //               width={120}
// // //               height={120}
// // //               className="mx-auto drop-shadow-lg"
// // //             />
// // //           </div>

// // //           <Image
// // //             src="/images/molecules.png"
// // //             alt="Logo"
// // //             width={120}
// // //             height={120}
// // //             className="mx-auto drop-shadow-lg absolute rotate-45 -top-12 left-10 z-30"
// // //           />
// // //           <Image
// // //             src="/images/molecules.png"
// // //             alt="Logo"
// // //             width={120}
// // //             height={120}
// // //             className="mx-auto drop-shadow-lg absolute -bottom-10 rotate-45 right-10 "
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import Image from "next/image";
// // import React, { useEffect, useState } from "react";

// // export default function ExplorePage() {
// //   const [isVisible, setIsVisible] = useState(false);
// //   const [logoAnimated, setLogoAnimated] = useState(false);
// //   const [contentAnimated, setContentAnimated] = useState(false);
// //   const [bottomImageVisible, setBottomImageVisible] = useState(false);
// //   const [moleculesVisible, setMoleculesVisible] = useState(false);

// //   const handleClick = (path) => {
// //     if (path === `/interaction`) {
// //       // navigate(`${path}/?platform=${platform}`);
// //     } else {
// //       // navigate(path);
// //     }
// //   };

// //   const [platform, setPlatform] = useState("");

// //   useEffect(() => {
// //     //   sessionStorage.setItem("uuId", uuidv4());
// //     //   console.log(sessionStorage.getItem("uuId"));
// //   }, []);

// //   useEffect(() => {
// //     //   const platformName = getPlatform();
// //     //   setPlatform(platformName);
// //   }, []);

// //   const items = [
// //     {
// //       title: "Explore Streax Products",
// //       icon: "/svgs/search.svg",
// //       path: "/interaction",
// //     },
// //     {
// //       title: "Download Brochure PDF",
// //       icon: "/svgs/download.svg",
// //       path: "/download",
// //     },
// //   ];

// //   useEffect(() => {
// //     // Start the animation sequence
// //     const timer1 = setTimeout(() => setIsVisible(true), 100);
// //     const timer2 = setTimeout(() => setLogoAnimated(true), 600);
// //     const timer3 = setTimeout(() => setContentAnimated(true), 1000);
// //     const timer4 = setTimeout(() => setBottomImageVisible(true), 1400);
// //     const timer5 = setTimeout(() => setMoleculesVisible(true), 1600);

// //     return () => {
// //       clearTimeout(timer1);
// //       clearTimeout(timer2);
// //       clearTimeout(timer3);
// //       clearTimeout(timer4);
// //       clearTimeout(timer5);
// //     };
// //   }, []);

// //   return (
// //     <div
// //       className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
// //         isVisible ? "opacity-100" : "opacity-0"
// //       }`}
// //     >
// //       <div
// //         className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
// //         style={{
// //           backgroundImage: "url('/images/light-bg.png')",
// //         }}
// //       >
// //         <div className="relative z-10 h-full flex flex-col p-6">
// //           {/* Top - Logo with slide animation */}
// //           <div className="text-center py-4">
// //             <div
// //               className={`transition-all duration-800 ease-out ${
// //                 logoAnimated
// //                   ? "transform translate-y-0 opacity-100"
// //                   : "transform translate-y-12 opacity-0"
// //               }`}
// //             >
// //               <Image
// //                 src="/images/streax-logo.png"
// //                 alt="Logo"
// //                 width={120}
// //                 height={120}
// //                 className="mx-auto drop-shadow-lg"
// //               />
// //             </div>
// //           </div>

// //           {/* Middle - Main Content with scale animation */}
// //           <div className="flex-1 flex justify-center items-center">
// //             <div
// //               className={`w-full text-black transition-all duration-800 ease-out ${
// //                 contentAnimated
// //                   ? "transform scale-100 opacity-100"
// //                   : "transform scale-75 opacity-0"
// //               }`}
// //             >
// //               {items?.map((e, index) => (
// //                 <div
// //                   onClick={() =>
// //                     ["Find Trusted Painter", "Play to Win"].includes(e.title)
// //                       ? {}
// //                       : handleClick(e.path)
// //                   }
// //                   key={index}
// //                   className={`${
// //                     ["Find Trusted Painter"].includes(e.title)
// //                       ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
// //                       : "bg-white border-[#F7F7F7]/50"
// //                   } group

// //             md:max-h-14 group rounded-[6rem] w-full mx-auto mb-4 font-Poppins text-xl font-semibold text-center py-3 px-3 border-2 flex items-center cursor-pointer hover:shadow-xl`}
// //                 >
// //                   <div className="flex flex-1 gap-1 items-center">
// //                     <img
// //                       className={`h-8 ${index === 2 && "opacity-30"}`}
// //                       src={e.icon}
// //                       alt="option icon"
// //                     />
// //                     <div className="flex flex-col items-start">
// //                       <strong
// //                         className={`${index === 2 && "text-[#969696]"}
// //                    text-left  font-Poppins text-[13.23px] leading-[18.5px]  font-semibold`}
// //                       >
// //                         {e.title}
// //                       </strong>

// //                       {["Find Trusted Painter", "Play to Win"].includes(
// //                         e.title
// //                       ) && (
// //                         <span className="font-Poppins text-xs font-semibold ">
// //                           Coming Soon...{" "}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <img
// //                     className={`group-hover:animate-bounceLR ${
// //                       index === 2 && "opacity-50"
// //                     }`}
// //                     src="/svgs/arrow.svg"
// //                     alt="arrow"
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Bottom image with fade in animation */}
// //           <div
// //             className={`py-10 transition-opacity duration-800 ease-out ${
// //               bottomImageVisible ? "opacity-100" : "opacity-0"
// //             }`}
// //           >
// //             <Image
// //               src="/images/hivoco.png"
// //               alt="Logo"
// //               width={120}
// //               height={120}
// //               className="mx-auto drop-shadow-lg"
// //             />
// //           </div>

// //           {/* Molecule decorations with fade in */}
// //           <div
// //             className={`transition-opacity duration-800 ease-out ${
// //               moleculesVisible ? "opacity-100" : "opacity-0"
// //             }`}
// //           >
// //             <Image
// //               src="/images/molecules.png"
// //               alt="Logo"
// //               width={120}
// //               height={120}
// //               className="mx-auto drop-shadow-lg absolute rotate-45 -top-12 left-10 z-30"
// //             />
// //             <Image
// //               src="/images/molecules.png"
// //               alt="Logo"
// //               width={120}
// //               height={120}
// //               className="mx-auto drop-shadow-lg absolute -bottom-10 rotate-45 right-10"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import getPlatform from "@/utils/platform";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export default function ExplorePage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [logoAnimated, setLogoAnimated] = useState(false);
//   const [contentAnimated, setContentAnimated] = useState(false);
//   const [bottomImageVisible, setBottomImageVisible] = useState(false);
//   const [moleculesVisible, setMoleculesVisible] = useState(false);

//   const handleClick = (path) => {
//     if (path === `/interaction`) {
//       navigate(`${path}/?platform=${platform}`);
//     } else {
//       navigate(path);
//     }
//   };

//   const [platform, setPlatform] = useState("");

//   useEffect(() => {
//       sessionStorage.setItem("uuId", uuidv4());
//       console.log(sessionStorage.getItem("uuId"));
//   }, []);

//   useEffect(() => {
//       const platformName = getPlatform();
//       setPlatform(platformName);
//   }, []);

//   const items = [
//     {
//       title: "Explore Streax Products",
//       icon: "/svgs/search.svg",

//     },
//     {
//       title: "Download Brochure PDF",
//       icon: "/svgs/download.svg",
//     },
//   ];

//   useEffect(() => {
//     // Start the animation sequence
//     const timer1 = setTimeout(() => setIsVisible(true), 100);
//     const timer2 = setTimeout(() => setLogoAnimated(true), 600);
//     const timer3 = setTimeout(() => setContentAnimated(true), 1000);
//     const timer4 = setTimeout(() => setBottomImageVisible(true), 1400);
//     const timer5 = setTimeout(() => setMoleculesVisible(true), 1600);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//       clearTimeout(timer5);
//     };
//   }, []);

//   return (
//     <div
//       className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
//         isVisible ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <div
//         className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/images/light-bg.png')",
//         }}
//       >
//         <div className="relative z-10 h-full flex flex-col p-6">
//           {/* Top - Logo with slide animation from center */}
//           <div className="text-center py-4">
//             <div
//               className={`transition-all duration-1000 ease-out ${
//                 logoAnimated
//                   ? "transform translate-x-0 translate-y-0 opacity-100"
//                   : "transform translate-x-0 translate-y-[40vh] opacity-100"
//               }`}
//             >
//               <Image
//                 src="/images/streax-logo.png"
//                 alt="Logo"
//                 width={120}
//                 height={120}
//                 className="mx-auto drop-shadow-lg"
//               />
//             </div>
//           </div>

//           {/* Middle - Main Content with scale animation */}
//           <div className="flex-1 flex justify-center items-center">
//             <div
//               className={`w-full text-black transition-all duration-800 ease-out ${
//                 contentAnimated
//                   ? "transform scale-100 opacity-100"
//                   : "transform scale-75 opacity-0"
//               }`}
//             >
//               {items?.map((e, index) => (
//                 <div
//                   onClick={() =>
//                     ["Find Trusted Painter", "Play to Win"].includes(e.title)
//                       ? {}
//                       : handleClick(e.path)
//                   }
//                   key={index}
//                   className={`${
//                     ["Find Trusted Painter"].includes(e.title)
//                       ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
//                       : "bg-white border-[#F7F7F7]/50"
//                   } group

//             md:max-h-14 group rounded-[6rem] w-full mx-auto mb-4  text-xl font-semibold text-center py-3 px-3 border-2 flex items-center cursor-pointer hover:shadow-xl`}
//                 >
//                   <div className="flex flex-1 gap-1 items-center">
//                     <img
//                       className={`h-8 ${index === 2 && "opacity-30"}`}
//                       src={e.icon}
//                       alt="option icon"
//                     />
//                     <div className="flex flex-col items-start">
//                       <strong
//                         className={`${index === 2 && "text-[#969696]"}
//                    text-left  font-Poppins text-[13.23px] leading-[18.5px]  font-semibold`}
//                       >
//                         {e.title}
//                       </strong>

//                       {["Find Trusted Painter", "Play to Win"].includes(
//                         e.title
//                       ) && (
//                         <span className="font-Poppins text-xs font-semibold ">
//                           Coming Soon...{" "}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <img
//                     className={`group-hover:animate-bounceLR ${
//                       index === 2 && "opacity-50"
//                     }`}
//                     src="/svgs/arrow.svg"
//                     alt="arrow"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bottom image with fade in animation */}
//           <div
//             className={`py-10 transition-opacity duration-800 ease-out ${
//               bottomImageVisible ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Image
//               src="/images/hivoco.png"
//               alt="Logo"
//               width={120}
//               height={120}
//               className="mx-auto drop-shadow-lg"
//             />
//           </div>

//           {/* Molecule decorations with fade in */}
//           <div
//             className={`transition-opacity duration-800 ease-out ${
//               moleculesVisible ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Image
//               src="/images/molecules.png"
//               alt="Logo"
//               width={120}
//               height={120}
//               className="mx-auto drop-shadow-lg absolute rotate-45 -top-12 left-10 z-30"
//             />
//             <Image
//               src="/images/molecules.png"
//               alt="Logo"
//               width={120}
//               height={120}
//               className="mx-auto drop-shadow-lg absolute -bottom-10 rotate-45 right-10"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import getPlatform from "@/utils/platform";
import { useRouter } from "next/router";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ExplorePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [contentAnimated, setContentAnimated] = useState(false);
  const [bottomImageVisible, setBottomImageVisible] = useState(false);
  const [moleculesVisible, setMoleculesVisible] = useState(false);

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/Streax.pdf"; // PDF in public folder
    link.download = "downloaded-file.pdf"; // Optional: specify download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleClick = (path) => {
    if (path === `/interaction`) {
      router.push("/select-language");
    } else if (path === `/download`) {
      downloadPDF()
    } else {
      router.push(path);
    }
  };




 

  const items = [
    {
      title: "Explore Streax Products",
      icon: "/svgs/search.svg",
      path: "/interaction",
    },
    {
      title: "Download Brochure PDF",
      icon: "/svgs/download.svg",
      path: "/download",
    },
  ];

  useEffect(() => {
    // Start the animation sequence
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setLogoAnimated(true), 600);
    const timer3 = setTimeout(() => setContentAnimated(true), 1000);
    const timer4 = setTimeout(() => setBottomImageVisible(true), 1400);
    const timer5 = setTimeout(() => setMoleculesVisible(true), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="relative w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/light-bg.png')",
        }}
      >
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Top - Logo with slide animation from center */}
          <div className="text-center py-4">
            <div
              className={`transition-all duration-1000 ease-out ${
                logoAnimated
                  ? "transform translate-x-0 translate-y-0 opacity-100"
                  : "transform translate-x-0 translate-y-[40vh] opacity-100"
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
          </div>

          {/* Middle - Main Content with scale animation */}
          <div className="flex-1 flex justify-center items-center">
            <div
              className={`w-full text-black transition-all duration-800 ease-out ${
                contentAnimated
                  ? "transform scale-100 opacity-100"
                  : "transform scale-75 opacity-0"
              }`}
            >
              {items?.map((e, index) => (
                <div
                  onClick={() =>
                    ["Find Trusted Painter", "Play to Win"].includes(e.title)
                      ? {}
                      : handleClick(e.path)
                  }
                  key={index}
                  className={`${
                    ["Find Trusted Painter"].includes(e.title)
                      ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
                      : "bg-white border-[#F7F7F7]/50 font-semibold text-base "
                  } group 
            
            md:max-h-14 group rounded-[6rem] w-full mx-auto mb-4 font-Poppins text-xl font-semibold text-center py-3 px-3 border-2 flex items-center cursor-pointer hover:shadow-xl`}
                >
                  <div className="flex flex-1 gap-1 items-center">
                    <img
                      className={`h-8 ${index === 2 && "opacity-30"}`}
                      src={e.icon}
                      alt="option icon"
                    />
                    <div className="flex flex-col items-start">
                      <strong
                        className={`${index === 2 && "text-[#969696]"}
                   text-left  font-Poppins text-[13.23px] leading-[18.5px]  font-semibold`}
                      >
                        {e.title}
                      </strong>

                      {["Find Trusted Painter", "Play to Win"].includes(
                        e.title
                      ) && (
                        <span className="font-Poppins text-xs font-semibold ">
                          Coming Soon...{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  <img
                    className={`group-hover:animate-bounceLR ${
                      index === 2 && "opacity-50"
                    }`}
                    src="/svgs/arrow.svg"
                    alt="arrow"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom image with fade in animation */}
          <div
            className={`py-10 transition-opacity duration-800 ease-out ${
              bottomImageVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/images/hivoco.png"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto drop-shadow-lg"
            />
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
    </div>
  );
}
