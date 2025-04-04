import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconExpandProps = Omit<IconProps, "children">;

const IconExpand = React.forwardRef<SVGSVGElement, IconExpandProps>(
  ({ className, color, screenReaderText, size, ...props }, ref) => {
    return (
      <IconWrapper className={className} color={color} size={size} screenReaderText={screenReaderText}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 16 16"
          ref={ref}
          {...props}
        >
          <path
            fill="currentColor"
            d="M1.49946 1C1.22362 1 1 1.22386 1 1.5V5.5C1 5.77614 1.22362 6 1.49946 6 1.77531 6 1.99892 5.77614 1.99892 5.5V2H5.49515C5.77099 2 5.99461 1.77614 5.99461 1.5 5.99461 1.22386 5.77099 1 5.49515 1H1.49946ZM10.5049 1C10.229 1 10.0054 1.22386 10.0054 1.5 10.0054 1.77614 10.229 2 10.5049 2H14.0011V5.5C14.0011 5.77614 14.2247 6 14.5005 6 14.7764 6 15 5.77614 15 5.5V1.5C15 1.22386 14.7764 1 14.5005 1H10.5049ZM14.4763 10.001C14.7521 10.001 14.9758 10.2248 14.9758 10.501V14.501C14.9758 14.7771 14.7521 15.001 14.4763 15.001H10.4806C10.2048 15.001 9.98116 14.7771 9.98116 14.501 9.98116 14.2248 10.2048 14.001 10.4806 14.001H13.9768V10.501C13.9768 10.2248 14.2005 10.001 14.4763 10.001ZM1.99892 10.5042C1.99892 10.2281 1.77531 10.0042 1.49946 10.0042 1.22362 10.0042 1 10.2281 1 10.5042V14.5042C1 14.7803 1.22362 15.0042 1.49946 15.0042H5.49515C5.77099 15.0042 5.99461 14.7803 5.99461 14.5042 5.99461 14.2281 5.77099 14.0042 5.49515 14.0042H1.99892V10.5042Z"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconExpand.displayName = "IconExpand";
export default IconExpand;
