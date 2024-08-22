import Image from "next/image";
import WomensShoe from "@/public/womens-shoe.png";
import BannerText from "./BannerText";

const BannerInfo = {
  header: "Women's Collection",
  subHeader: "Find the latest trends from our women's collection.",
  buttonLink: "/shoes?gender=Women's",
  colour: "text-purple-600",
};

function WomensBanner() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center bg-gradient-to-t from-[#FFC7DB] to-custom-white">
      <div className="w-1/2 flex lg:order-2 items-center justify-center">
        <BannerText {...BannerInfo} />
      </div>
      <div className="w-1/2 lg:order-1 flex">
        <Image
          priority
          quality={100}
          className="pointer-events-none select-none mx-auto"
          src={WomensShoe}
          alt="mens-banner"
          style={{ objectFit: "cover", objectPosition: "50%" }}
        />
      </div>
    </div>
  );
}

export default WomensBanner;
