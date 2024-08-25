import * as React from "react"
import { SVGProps } from "react"
const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={25}
    // height={25}
    fill="none"
    {...props}
  >
    <path
      fill="maroon"
      stroke="maroon"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16 1c1.035 0 1.875.84 1.875 1.875v11.25h11.25a1.875 1.875 0 0 1 0 3.75h-11.25v11.25a1.875 1.875 0 0 1-3.75 0v-11.25H2.875a1.875 1.875 0 0 1 0-3.75h11.25V2.875C14.125 1.839 14.965 1 16 1Z"
    />
  </svg>
)
export default Plus
