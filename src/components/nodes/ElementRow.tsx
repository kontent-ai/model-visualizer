import React from "react";
import { SourceHandle } from "../controls/SourceHandle";
import { TargetHandle } from "../controls/TargetHandle";
import { AnnotatedElement, ContentGroup } from "../../utils/types/mapi";
import { elementTypeMap } from "../../utils/mapi";
import { isRelationshipElement, isRequirableElement } from "../../utils/layout";
import { ContentTypeElements } from "@kontent-ai/management-sdk";
import IconAccordion from "../icons/IconAccordion";
import IconRotateDoubleRight from "../icons/IconRotateDoubleRight";
import { InfoBadge } from "../controls/InfoBadge";
import IconBracesOctothorpe from "../icons/IconBracesOctothorpe";
import randomColor from "randomcolor";

type NamedElement =
  | Exclude<
    AnnotatedElement,
    ContentTypeElements.IGuidelinesElement | ContentTypeElements.ISnippetElement
  >
  | ({
    name: string;
    origin: { kind: "direct" };
  } & ContentTypeElements.ISnippetElement);

type ElementRowProps = {
  element: NamedElement;
  isLast: boolean;
  selfReferences?: boolean;
  contentGroup?: ContentGroup;
};

const linkedItemConditionMap: ReadonlyMap<"at_least" | "at_most" | "exactly", string> = new Map([
  ["at_least", "At least"],
  ["at_most", "At most"],
  ["exactly", "Exactly"],
]);

const getRandomColor = (seed: string) =>
  randomColor({
    luminosity: "dark",
    seed: seed,
  });

export const ElementRow: React.FC<ElementRowProps> = ({ element, isLast, selfReferences, contentGroup }) => (
  <div
    className={`flex items-center justify-between py-1 px-2 relative ${!isLast ? "border-b border-gray-200" : ""}`}
  >
    {element.type === "snippet" && ( // element height is 24px, handle is offset by 12px to align vertically
      <div className="absolute left-0 top-[-12px]">
        <TargetHandle id={`target-${element.id}`} />
      </div>
    )}
    {element.type === "taxonomy" && (
      <div className="absolute left-0 top-[-12px]">
        <TargetHandle id={`target-${element.id}`} />
      </div>
    )}
    {contentGroup && (
      <InfoBadge
        title={`Content group: ${contentGroup.name}`}
        icon="⚫︎"
        // using name instead of id as a seed ensures consistent colors across different content types with groups of the same name
        iconStyle={{ color: getRandomColor(contentGroup.name) }}
      />
    )}
    <div className="font-bold text-xs">{element.name}</div>
    <span className="flex-1"></span>
    {isRequirableElement(element) && element.is_required && (
      <InfoBadge
        title={`This element is required.`}
        icon="❋"
      />
    )}
    {element.origin.kind === "snippet" && (
      <InfoBadge title={`This element comes from ${element.origin.name} snippet`} icon={<IconAccordion />} />
    )}
    {selfReferences && (
      <InfoBadge title={`This element can reference its own content type.`} icon={<IconRotateDoubleRight />} />
    )}
    {(element.type === "modular_content" || element.type === "subpages") && (
      element.item_count_limit && (
        <InfoBadge
          title={`${linkedItemConditionMap.get(element.item_count_limit.condition)} ${element.item_count_limit.value} ${
            element.item_count_limit.value === 1 ? "item" : "items"
          }`}
          icon={<IconBracesOctothorpe />}
        />
      )
    )}
    <div className="text-xs">
      {elementTypeMap.get(element.type) || element.type}
    </div>
    {isRelationshipElement(element) && <SourceHandle id={`source-${element.id}`} />}
  </div>
);
