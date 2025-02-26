import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconArrowReturnProps = Omit<IconProps, "children">;

const IconArrowReturn = React.forwardRef<SVGSVGElement, IconArrowReturnProps>(
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
            d="M2 5.68896C2 5.63767 2.00808 5.58823 2.02305 5.54178C2.04625 5.46965 2.08697 5.40172 2.14522 5.34437L5.39522 2.1444C5.5898 1.95281 5.90638 1.95173 6.10232 2.14199C6.29826 2.33224 6.29936 2.64179 6.10478 2.83337L3.70108 5.20007L10.6818 5.20007C13.0524 5.20007 15 7.22856 15 9.60004C15 11.9715 13.0524 14 10.6818 14L2.5 14C2.22386 14 2 13.7811 2 13.5111C2 13.2411 2.22386 13.0222 2.5 13.0222H10.6818C12.4567 13.0222 14 11.4749 14 9.60004C14 7.7252 12.4567 6.17784 10.6818 6.17784H3.70118L6.10478 8.54444C6.29936 8.73603 6.29826 9.04557 6.10232 9.23583C5.90638 9.42608 5.5898 9.425 5.39522 9.23342L2.14522 6.03344C2.09766 5.98662 2.0618 5.93275 2.03761 5.87531C2.01337 5.81787 2 5.75494 2 5.68896Z"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconArrowReturn.displayName = "IconArrowReturn";
export default IconArrowReturn;
