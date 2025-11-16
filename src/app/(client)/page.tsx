import MainShop from "@/components/MainShop";
import Menubar from "@/components/Menubar";

import Slider from "@/components/Slider"
import TrustBadge from "@/components/TrustBadge";




export default function Home() {
  return (
    <>

      <div className="layout-container">
        <div className="menu-column">
          <Menubar width="w-full" position="relative" />
        </div>

        <div className="slider-column">
          <Slider />
        </div>
      </div>
      <br />
      <TrustBadge />
      <br />
      <MainShop />


    </>



  );
}
