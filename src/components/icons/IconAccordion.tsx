import React from "react";
import { IconProps } from "./BaseIconWrapper";
import { IconWrapper } from "./BaseIconWrapper";

type IconAccordionProps = Omit<IconProps, "children">;

const IconAccordion = React.forwardRef<SVGSVGElement, IconAccordionProps>(
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
            d="M1.5 1C1.22386 1 1 1.22321 1 1.49854C1 1.77388 1.22386 1.99709 1.5 1.99709H14.5C14.7761 1.99709 15 1.77388 15 1.49854C15 1.22321 14.7761 1 14.5 1H1.5Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1 4.50113C1 4.22579 1.22386 4.00258 1.5 4.00258H14.5C14.7761 4.00258 15 4.22579 15 4.50113V7.49239C15 7.76773 14.7761 7.99093 14.5 7.99093H1.5C1.22386 7.99093 1 7.76773 1 7.49239V4.50113ZM2 4.99967V6.99384H14V4.99967H2Z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M1 10.4912C1 10.2159 1.22386 9.99265 1.5 9.99265H14.5C14.7761 9.99265 15 10.2159 15 10.4912 15 10.7665 14.7761 10.9897 14.5 10.9897H1.5C1.22386 10.9897 1 10.7665 1 10.4912ZM1.5 11.9954C1.22386 11.9954 1 12.2186 1 12.4939 1 12.7693 1.22386 12.9925 1.5 12.9925H14.5C14.7761 12.9925 15 12.7693 15 12.4939 15 12.2186 14.7761 11.9954 14.5 11.9954H1.5ZM1 14.5015C1 14.2261 1.22386 14.0029 1.5 14.0029H14.5C14.7761 14.0029 15 14.2261 15 14.5015 15 14.7768 14.7761 15 14.5 15H1.5C1.22386 15 1 14.7768 1 14.5015Z"
          />
        </svg>
      </IconWrapper>
    );
  },
);

IconAccordion.displayName = "IconAccordion";
export default IconAccordion;
