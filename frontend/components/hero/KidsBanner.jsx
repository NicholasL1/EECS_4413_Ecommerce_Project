import Image from "next/image";
import KidsShoe from "@/public/kids-shoe.png";
import BannerText from "./BannerText";

const BannerInfo = {
  header: "Kid's Collection",
  subHeader:
    "Kickstart the school year with some new styles from our kids collection.",
  buttonLink: "/shoes",
  colour: "text-orange-700",
};

function KidsBanner() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center bg-gradient-to-t from-[#FFE8DB] to-custom-white">
      <div className="w-1/2 flex items-center justify-center">
        <BannerText {...BannerInfo} />
      </div>
      <div className="w-1/2 flex">
        <Image
          priority
          quality={100}
          className="pointer-events-none select-none mx-auto"
          src={KidsShoe}
          alt="mens-banner"
          style={{ objectFit: "cover", objectPosition: "50%" }}
        />
      </div>
    </div>
  );
}

export default KidsBanner;
