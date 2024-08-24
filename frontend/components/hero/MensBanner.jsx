import Image from "next/image";
import MensShoe from "@/public/mens-shoe.png";
import BannerText from "./BannerText";

const BannerInfo = {
  header: "Men's Collection",
  subHeader: "Shop our exclusive men's collection to see our latest styles.",
  buttonLink: "/shoes?gender=Men's",
  colour: "text-blue-700",
};

function MensBanner() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center bg-gradient-to-t from-[#ABC8FF] to-custom-white">
      <div className="w-1/2 flex items-center justify-center">
        <BannerText {...BannerInfo} />
      </div>
      <div className="w-1/2 flex">
        <Image
          priority
          quality={100}
          className="pointer-events-none select-none mx-auto"
          src={MensShoe}
          alt="mens-banner"
          style={{ objectFit: "cover", objectPosition: "50%" }}
        />
      </div>
    </div>
  );
}

export default MensBanner;
