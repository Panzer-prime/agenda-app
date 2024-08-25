import * as React from "react"
import { SVGProps } from "react"
const User = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={26}
    fill="none"
    {...props}
  >
    <path
      fill="maroon"
      d="M20.526 21.01c.55-.119.879-.693.62-1.192-.629-1.212-1.639-2.277-2.939-3.084-1.637-1.017-3.643-1.567-5.707-1.567s-4.07.55-5.707 1.567c-1.3.807-2.31 1.872-2.939 3.084-.259.5.07 1.073.62 1.192a37.889 37.889 0 0 0 16.052 0Z"
    />
    <ellipse cx={12.5} cy={8.667} fill="maroon" rx={5.208} ry={5.417} />
  </svg>
)
export default User
