import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconProjectSchemeProps = Omit<IconProps, "children">;

const IconProjectScheme = React.forwardRef<SVGSVGElement, IconProjectSchemeProps>(
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
            d="M11.0005 1.49902C11.0005 1.22288 11.2243 0.999023 11.5005 0.999023H14.5009C14.777 0.999023 15.0009 1.22288 15.0009 1.49902V4.49944C15.0009 4.77558 14.777 4.99944 14.5009 4.99944H11.5005C11.2243 4.99944 11.0005 4.77558 11.0005 4.49944V4H9V8H11.0005V6.5C11.0005 6.22386 11.2243 6 11.5005 6H14.5009C14.777 6 15.0009 6.22386 15.0009 6.5V9.50041C15.0009 9.77656 14.777 10.0004 14.5009 10.0004H11.5005C11.2243 10.0004 11.0005 9.77656 11.0005 9.50041V9H9V13.0006H11.0005V11.501C11.0005 11.2248 11.2243 11.001 11.5005 11.001H14.5009C14.777 11.001 15.0009 11.2248 15.0009 11.501V14.5014C15.0009 14.7775 14.777 15.0014 14.5009 15.0014H11.5005C11.2243 15.0014 11.0005 14.7775 11.0005 14.5014V14.0006H8.5C8.22386 14.0006 8 13.7768 8 13.5006V9H5.99958V10.0006C5.99958 10.5528 5.55186 11.0006 4.99958 11.0006H1.99902C1.44674 11.0006 0.999023 10.5528 0.999023 10.0006V7C0.999023 6.44771 1.44674 6 1.99902 6H4.99958C5.55186 6 5.99958 6.44772 5.99958 7V8H8V3.5C8 3.22386 8.22386 3 8.5 3H11.0005V1.49902ZM4.99951 8.5L4.99958 8.49188V7H1.99902L1.99902 10.0006H4.99958V8.50812L4.99951 8.5ZM12.0005 3.99944H14.0009V1.99902H12.0005V3.99944ZM12.0005 7V9.00041H14.0009V7H12.0005ZM12.0005 12.001V14.0014H14.0009V12.001H12.0005Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconProjectScheme.displayName = "IconProjectScheme";
export default IconProjectScheme;
