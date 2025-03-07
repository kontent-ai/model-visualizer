import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconLayoutsProps = Omit<IconProps, "children">;

const IconLayouts = React.forwardRef<SVGSVGElement, IconLayoutsProps>(
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
            d="M1 1.5C1 1.22386 1.22386 1 1.5 1H12.5C12.7761 1 13 1.22386 13 1.5V6.5C13 6.77614 12.7761 7 12.5 7H1.5C1.22386 7 1 6.77614 1 6.5V1.5ZM2 2V6H12V2H2Z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M14.5002 3C14.7764 3 15.0002 3.22386 15.0002 3.5V14.4998C15.0002 14.776 14.7764 14.9998 14.5002 14.9998H3.86386C3.58772 14.9998 3.36386 14.776 3.36386 14.4998C3.36386 14.2237 3.58772 13.9998 3.86386 13.9998H14.0002V3.5C14.0002 3.22386 14.2241 3 14.5002 3Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.00023 8.51613C1.00024 8.23999 1.22409 8.01615 1.50023 8.01615H5.50132C5.63393 8.01615 5.76111 8.06884 5.85488 8.16261 5.94865 8.25639 6.00132 8.38357 6.00132 8.51618L6.00109 12.4974C6.00107 12.7735 5.77722 12.9974 5.50109 12.9974H1.5C1.36739 12.9974 1.24021 12.9447 1.14644 12.8509 1.05267 12.7571.999992 12.63 1 12.4973L1.00023 8.51613ZM2.0002 9.01615 2.00003 11.9974H5.00112L5.00129 9.01615H2.0002ZM7.5127 8.0166C7.23655 8.0166 7.0127 8.24046 7.0127 8.5166V12.5166C7.0127 12.7927 7.23655 13.0166 7.5127 13.0166H12.5127C12.7888 13.0166 13.0127 12.7927 13.0127 12.5166V8.5166C13.0127 8.24046 12.7888 8.0166 12.5127 8.0166H7.5127ZM8.0127 12.0166V9.0166H12.0127V12.0166H8.0127Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconLayouts.displayName = "IconLayouts";
export default IconLayouts;
