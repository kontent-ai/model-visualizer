import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconSeparateProps = Omit<IconProps, "children">;

const IconSeparate = React.forwardRef<SVGSVGElement, IconSeparateProps>(
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
            fillRule="evenodd"
            d="M4 4C4 5.10457 3.10457 6 2 6C0.895431 6 0 5.10457 0 4C0 2.89543 0.895431 2 2 2C2.74028 2 3.38663 2.4022 3.73244 3L12.2676 3C12.6134 2.4022 13.2597 2 14 2C15.1046 2 16 2.89543 16 4C16 5.10457 15.1046 6 14 6C12.8954 6 12 5.10457 12 4H7.28417C8.13704 4.70525 8.77305 5.82822 8.77305 7.5C8.77305 8.98565 9.24082 9.82015 9.87153 10.303C10.4795 10.7684 11.3183 10.9695 12.2694 10.9967C12.6157 10.4007 13.2611 10 14 10C15.1046 10 16 10.8954 16 12C16 13.1046 15.1046 14 14 14C12.8954 14 12 13.1046 12 12C12 11.9953 12 11.9907 12 11.986C11.0216 11.9296 10.0417 11.6926 9.26366 11.097C8.32685 10.3799 7.77305 9.21435 7.77305 7.5C7.77305 6.05099 7.21307 5.19993 6.55478 4.69745C5.87286 4.17693 5.04269 4 4.5 4H4ZM15 4C15 4.55228 14.5523 5 14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3C14.5523 3 15 3.44772 15 4ZM14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconSeparate.displayName = "IconSeparate";
export default IconSeparate;
