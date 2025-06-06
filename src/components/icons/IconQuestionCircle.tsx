import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconQuestionCircleProps = Omit<IconProps, "children">;

const IconQuestionCircle = React.forwardRef<SVGSVGElement, IconQuestionCircleProps>(
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
            d="M8 15C11.866 15 15 11.866 15 8C15 4.134 11.866 1 8 1C4.134 1 1 4.134 1 8C1 11.866 4.134 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58171 12.4183 0 8 0C3.58171 0 0 3.58171 0 8C0 12.4183 3.58171 16 8 16Z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M6.99363 10C6.99363 9.42463 7.06369 8.97143 7.20382 8.64039C7.34395 8.30542 7.57113 8.01576 7.88535 7.77143C8.19958 7.52709 8.43737 7.30443 8.59873 7.10345C8.76433 6.89852 8.84713 6.67389 8.84713 6.42956C8.84713 5.83448 8.55202 5.5 8 5.5C7.74522 5.5 7.41146 5.67253 7.20382 5.81366C6.99618 5.95479 6.76773 6.20493 6.75924 6.50049L5 6C5 5.5 5.27601 5.09951 5.80255 4.66207C6.32909 4.22069 7.06794 4 8.01911 4C8.96603 4 9.69851 4.20296 10.2166 4.60887C10.7389 5.01478 11 5.59212 11 6.34089C11 6.66798 10.9299 6.96552 10.7898 7.2335C10.6497 7.50148 10.4246 7.77537 10.1146 8.05517L9.38217 8.68769C9.1741 8.87291 9.02972 9.06404 8.94904 9.26108C8.86837 9.45419 8.82378 9.70049 8.81529 10H6.99363Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9 12C9 11.448 8.552 11 8 11C7.448 11 7 11.448 7 12C7 12.552 7.448 13 8 13C8.552 13 9 12.552 9 12Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconQuestionCircle.displayName = "IconQuestionCircle";
export default IconQuestionCircle;
