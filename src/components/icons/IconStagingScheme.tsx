import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconStagingSchemeProps = Omit<IconProps, "children">;

const IconStagingScheme = React.forwardRef<SVGSVGElement, IconStagingSchemeProps>(
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
            d="M10.9968 1.49951C10.9968 1.22364 11.2208 1 11.4972 1H14.4996C14.776 1 15 1.22364 15 1.49951V4.49656C15 4.77243 14.776 4.99606 14.4996 4.99606H13.0169V7.4936C13.0169 7.62608 12.9642 7.75313 12.8704 7.84681C12.7765 7.94048 12.6492 7.99311 12.5165 7.99311L10.0145 7.99311V9.49859C10.0145 9.77446 9.79049 9.9981 9.51413 9.9981H6.51173C6.23536 9.9981 6.01133 9.77446 6.01133 9.49859V8.99115H4.00973V11.0039H4.5028C4.77916 11.0039 5.0032 11.2276 5.0032 11.5034V14.5005C5.0032 14.7764 4.77916 15 4.5028 15H1.5004C1.22404 15 1 14.7764 1 14.5005V11.5034C1 11.2276 1.22404 11.0039 1.5004 11.0039H3.00893V8.49164C3.00893 8.21577 3.23297 7.99214 3.50933 7.99214H6.01133V6.50154C6.01133 6.22567 6.23536 6.00204 6.51173 6.00204H9.51413C9.79049 6.00204 10.0145 6.22567 10.0145 6.50154V6.99409L12.0161 6.9941V4.99606H11.4972C11.2208 4.99606 10.9968 4.77243 10.9968 4.49656V1.49951ZM13.9992 3.99705V1.99902H11.9976V3.99705H13.9992ZM9.01373 7.00105H7.01213V8.99908H9.01373V7.00105ZM4.0024 12.003H2.0008V14.001H4.0024V12.003Z"
            clipRule="evenodd"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconStagingScheme.displayName = "IconStagingScheme";
export default IconStagingScheme;
