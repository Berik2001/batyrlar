import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { THEME_INIT_SCRIPT } from "@/lib/store";

// cyrillic-ext покрывает казахские ә ғ қ ң ө ұ ү һ і
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Жыр мен тарихтан шыққан қазақ батырлары: ерлігі, сөзі және мұрасы. Портреттер, сюжеттік желілер және галерея.";

export const metadata: Metadata = {
  // Нужен, чтобы og:image отдавался абсолютной ссылкой
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://batyrlar.example"),
  title: {
    default: "Batyrlar — қазақ батырларының порталы",
    template: "%s · Batyrlar",
  },
  description: DESCRIPTION,
  // Картинку превью Next подхватывает сам из app/opengraph-image.jpg
  openGraph: {
    type: "website",
    siteName: "Batyrlar",
    title: "Batyrlar — қазақ батырларының порталы",
    description: DESCRIPTION,
    locale: "kk_KZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batyrlar — қазақ батырларының порталы",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="kk" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Тема выставляется до первой отрисовки, чтобы не было вспышки светлого фона */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
