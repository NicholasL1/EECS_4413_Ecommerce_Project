import Link from "next/link";
import { Button } from "../ui/button";

function BannerText({ header, subHeader, buttonLink, colour }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="font-signika-negative text-4xl md:text-5xl lg:text-6xl font-semibold py-4 text-center">
        Shop <span className={`${colour} italic`}>{header}</span>
      </h1>
      <p className="py-4 text-2xl font-signika-negative font-light text-center">
        {subHeader}
      </p>
      <div className="flex py-4 w-full items-center justify-center">
        <Link href={buttonLink}>
          <Button
            type="button"
            className={`bg-transparent border border-gray-700 font-signika-negative text-lg text-black hover:bg-gray-600 hover:text-white p-8`}
          >
            SHOP NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default BannerText;
