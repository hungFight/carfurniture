import SlideHome from "@/components/Slide/SlideHome";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1536px]">
      <SlideHome />
      <div className="w-full h-12 bg-black"></div>
    </div>
  );
}
