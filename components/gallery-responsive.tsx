import React from "react"
import Gallery from "./gallery"
import GalleryMobile from "./gallery-mobile"

export default function GalleryResponsive() {
  return (
    <>
      {/* Desktop: Shows original WebGL gallery on sm+ screens */}
      <div className="hidden sm:block">
        <Gallery />
      </div>
      
      {/* Mobile: Shows lightweight version on < sm screens */}
      <div className="block sm:hidden">
        <GalleryMobile />
      </div>
    </>
  )
}
