"use client";

import dynamic from "next/dynamic";

const Slideshow = dynamic(() => import("@/components/Slideshow"), {
  ssr: false,
});

export default function Home() {
  return <Slideshow />;
}