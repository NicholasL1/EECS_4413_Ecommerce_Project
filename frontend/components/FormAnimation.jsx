import React from "react";
import ShoeAnimation from "./ui/ShoeAnimation";

function FormAnimation() {
  return (
    <div>
      <div className="w-96 h-96 absolute inset-0 flex items-center justify-center my-auto mx-auto z-10">
        <ShoeAnimation />
      </div>
      {/* Background shapes centered */}
      <div className="relative w-full max-w-lg my-auto inset-0 flex items-center justify-center">
        <div className="absolute -left-2 -top-12 bottom-0 m-auto w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float1"></div>
        <div className="absolute -right-2 -top-12 bottom-0 m-auto w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float2"></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 m-auto w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float3"></div>
      </div>
    </div>
  );
}

export default FormAnimation;
