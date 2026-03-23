import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FinLearn — Financial Markets",
    short_name: "FinLearn",
    description: "Financial markets lessons and flashcards from Hull & Rebonato",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#1a4a8a",
    orientation: "portrait",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
