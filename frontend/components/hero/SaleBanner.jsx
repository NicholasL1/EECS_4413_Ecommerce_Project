import Image from "next/image";
import SaleShoe from "@/public/sales-shoe.png";
import BannerText from "./BannerText";

const BannerInfo = {
  header: "Sales",
  subHeader: "Browse our most exclusive offers.",
  buttonLink: "/",
  colour: "text-green-700",
};

function SaleBanner() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center bg-gradient-to-t from-[#A5FFBF] to-custom-white">
      <div className="w-1/2 flex lg:order-2 items-center justify-center">
        <BannerText {...BannerInfo} />
      </div>
      <div className="w-1/2 lg:order-1 flex">
        <Image
          priority
          quality={100}
          className="pointer-events-none select-none mx-auto"
          src={SaleShoe}
          alt="mens-banner"
          style={{ objectFit: "contain", objectPosition: "25%" }}
        />
      </div>
    </div>
  );
}

export default SaleBanner;
