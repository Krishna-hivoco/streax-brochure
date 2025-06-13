import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          Streax Professional Skin – Salon-Grade Brightening & Anti-Aging
          Skincare Kits
        </title>
        <meta
          name="description"
          content="Discover Streax Professional Skin – a dermatologist-tested skincare range with salon-grade brightening and anti-aging facial kits. Free from harmful chemicals, enriched with Glutathione, Niacinamide, and Collagen Peptides for visibly smoother, brighter, youthful skin. Safe for all skin types."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://streax.talkingbrochure.hivoco.com" />
        <meta
          property="og:title"
          content="Streax Professional Skin – Salon-Grade Brightening & Anti-Aging Skincare Kits"
        />
        <meta
          property="og:description"
          content="Discover Streax Professional Skin – a dermatologist-tested skincare range with salon-grade brightening and anti-aging facial kits. Free from harmful chemicals, enriched with Glutathione, Niacinamide, and Collagen Peptides for visibly smoother, brighter, youthful skin. Safe for all skin types."
        />
        <meta
          property="og:image"
          content="https://streax.talkingbrochure.hivoco.com/images/name.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Streax Professional Skin - Salon-Grade Skincare Products"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta
          name="twitter:title"
          content="Streax Professional Skin – Salon-Grade Brightening & Anti-Aging Skincare Kits"
        />
        <meta
          name="twitter:description"
          content="Discover Streax Professional Skin – a dermatologist-tested skincare range with salon-grade brightening and anti-aging facial kits. Free from harmful chemicals, enriched with Glutathione, Niacinamide, and Collagen Peptides for visibly smoother, brighter, youthful skin. Safe for all skin types."
        />
        <meta
          name="twitter:image"
          content="https://streax.talkingbrochure.hivoco.com/images/name.png"
        />
        <meta
          name="twitter:image:alt"
          content="Streax Professional Skin - Salon-Grade Skincare Products"
        />

        {/* Additional Open Graph tags */}
        <meta property="og:site_name" content="Streax Professional Skin" />
        <meta property="og:locale" content="en_US" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
