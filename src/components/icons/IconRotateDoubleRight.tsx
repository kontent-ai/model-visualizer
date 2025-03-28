import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconRotateDoubleRightProps = Omit<IconProps, "children">;

const IconRotateDoubleRight = React.forwardRef<SVGSVGElement, IconRotateDoubleRightProps>(
  ({ className, color, screenReaderText, size, ...props }, ref) => {
    return (
      <IconWrapper className={className} color={color} size={size} screenReaderText={screenReaderText}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="none"
          viewBox="0 0 16 16"
          ref={ref}
          {...props}
        >
          <path
            fill="currentColor"
            d="M8 3C10.4095 3 12.4195 4.71776 12.8809 7H11.9561C11.551 7 11.3154 7.45968 11.5509 7.79062L13.0733 9.93039C13.272 10.2096 13.6853 10.2096 13.8839 9.93039L15.4064 7.79062C15.6418 7.45968 15.4062 7 15.0011 7H13.894C13.4198 4.16229 10.9614 2 8 2 6.41203 2 4.96778 2.62238 3.89784 3.63643 3.69782 3.82599 3.68876 4.14244 3.87759 4.34324 4.06641 4.54404 4.38164 4.55314 4.58165 4.36357 5.47407 3.51777 6.67626 3 8 3ZM2.10597 9H.998933C.593829 9 .358187 8.54031.593649 8.20938L2.11611 6.06961C2.31474 5.79044 2.72804 5.79044 2.92668 6.06961L4.44914 8.20938C4.6846 8.54032 4.44896 9 4.04385 9H3.11908C3.58055 11.2822 5.59045 13 8 13 9.32374 13 10.5259 12.4822 11.4183 11.6364 11.6184 11.4469 11.9336 11.456 12.1224 11.6568 12.3112 11.8576 12.3022 12.174 12.1022 12.3636 11.0322 13.3776 9.58797 14 8 14 5.03857 14 2.5802 11.8377 2.10597 9Z"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconRotateDoubleRight.displayName = "IconRotateDoubleRight";
export default IconRotateDoubleRight;
