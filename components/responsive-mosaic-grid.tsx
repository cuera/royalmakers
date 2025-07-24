"use client"

import MosaicGrid from "@/components/mosaic-grid"
import MosaicGridMobile from "@/components/mosaic-grid-mobile"

export default function ResponsiveMosaicGrid(props: any) {
  return (
    <>
      <div className="block md:hidden">
        <MosaicGridMobile {...props} />
      </div>
      <div className="hidden md:block">
        <MosaicGrid {...props} />
      </div>
    </>
  )
}
