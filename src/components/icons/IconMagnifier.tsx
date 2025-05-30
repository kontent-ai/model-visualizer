import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconMagnifierProps = Omit<IconProps, "children">;

const IconMagnifier = React.forwardRef<SVGSVGElement, IconMagnifierProps>(
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
            d="M12.436 11.7292C13.4108 10.5925 13.9997 9.11506 13.9997 7.50011C13.9997 3.9102 11.0896 1 7.49986 1C3.91009 1 1 3.9102 1 7.50011C1 11.09 3.91009 14.0002 7.49986 14.0002C9.11479 14.0002 10.5922 13.4112 11.7289 12.4364L14.1465 14.8536C14.3418 15.0488 14.6583 15.0488 14.8536 14.8535C15.0488 14.6582 15.0488 14.3416 14.8535 14.1464L12.436 11.7292ZM12.9997 7.50011C12.9997 10.5377 10.5374 13.0002 7.49986 13.0002C4.46236 13.0002 1.99998 10.5377 1.99998 7.50011C1.99998 4.46249 4.46236 2.00002 7.49986 2.00002C10.5374 2.00002 12.9997 4.46249 12.9997 7.50011Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconMagnifier.displayName = "IconMagnifier";
export default IconMagnifier;
