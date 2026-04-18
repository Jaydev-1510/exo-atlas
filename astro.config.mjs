// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import path from "path";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist/geist-thin.woff2"],
            weight: "100",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-extralight.woff2"],
            weight: "200",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-light.woff2"],
            weight: "300",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-regular.woff2"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-medium.woff2"],
            weight: "500",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-semibold.woff2"],
            weight: "600",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-bold.woff2"],
            weight: "700",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-extrabold.woff2"],
            weight: "800",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-black.woff2"],
            weight: "900",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-thin.woff2"],
            weight: "100",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-extralight.woff2"],
            weight: "200",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-light.woff2"],
            weight: "300",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic.woff2"],
            weight: "400",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-medium.woff2"],
            weight: "500",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-semibold.woff2"],
            weight: "600",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-bold.woff2"],
            weight: "700",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-extrabold.woff2"],
            weight: "800",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist/geist-italic-black.woff2"],
            weight: "900",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-thin.woff2"],
            weight: "100",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-extralight.woff2"],
            weight: "200",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-light.woff2"],
            weight: "300",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-regular.woff2"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-medium.woff2"],
            weight: "500",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-semibold.woff2"],
            weight: "600",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-bold.woff2"],
            weight: "700",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-extrabold.woff2"],
            weight: "800",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-black.woff2"],
            weight: "900",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-italic-thin.woff2"],
            weight: "100",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-extralight.woff2",
            ],
            weight: "200",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-light.woff2",
            ],
            weight: "300",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-italic.woff2"],
            weight: "400",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-medium.woff2",
            ],
            weight: "500",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-semibold.woff2",
            ],
            weight: "600",
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/geist-mono/geist-mono-italic-bold.woff2"],
            weight: "700",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-extrabold.woff2",
            ],
            weight: "800",
            style: "italic",
          },
          {
            src: [
              "./src/assets/fonts/geist-mono/geist-mono-italic-black.woff2",
            ],
            weight: "900",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Circle",
      cssVariable: "--font-geist-pixel-circle",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-pixel/geist-pixel-circle.woff2"],
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Grid",
      cssVariable: "--font-geist-pixel-grid",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-pixel/geist-pixel-grid.woff2"],
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Line",
      cssVariable: "--font-geist-pixel-line",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-pixel/geist-pixel-line.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Square",
      cssVariable: "--font-geist-pixel-square",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-pixel/geist-pixel-square.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Triangle",
      cssVariable: "--font-geist-pixel-triangle",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-pixel/geist-pixel-triangle.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  adapter: vercel({
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
});
