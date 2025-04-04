import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconFileProps = Omit<IconProps, "children">;

const IconFile = React.forwardRef<SVGSVGElement, IconFileProps>(
  ({ className, color, screenReaderText, size, ...props }, ref) => {
    return (
      <IconWrapper
        className={className}
        color={color}
        size={size}
        screenReaderText={screenReaderText}
      >
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
            d="M14.0127 8V4.62326L9.2127 0H3.0127C2.46041 0 2.0127 0.447714 2.0127 0.999999V8H1C0.447715 8 0 8.44771 0 9V15C0 15.5523 0.447715 16 1 16H15C15.5523 16 16 15.5523 16 15V9C16 8.44771 15.5523 8 15 8H14.0127ZM13.0127 8H3.0127L3.0127 0.999999L8.00293 1V4.50146C8.00293 5.32989 8.6745 6.00146 9.50293 6.00146H13.0127V8ZM2.9242 9C2.95335 9.00256 2.98287 9.00386 3.0127 9.00386H13.0127C13.0425 9.00386 13.072 9.00256 13.1012 9H15V15H1V9H2.9242ZM9.00293 1.18638L12.9639 5.00146H9.50293C9.22679 5.00146 9.00293 4.77761 9.00293 4.50146V1.18638Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconFile.displayName = "IconFile";
export default IconFile;
