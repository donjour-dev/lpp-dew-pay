import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "르쁘빠 근무계산표",
    short_name: "르쁘빠",
    description: "근무 시간을 입력하고 합계·예상급여를 계산합니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbfa",
    theme_color: "#e11d48",
    orientation: "portrait",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
