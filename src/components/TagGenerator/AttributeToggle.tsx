import React from "react";

interface AttributeToggleProps {
  showAttributes: boolean;
  onToggle: (value: boolean) => void;
}

export const AttributeToggle: React.FC<AttributeToggleProps> = ({
  showAttributes,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white font-medium">Show Attributes</span>
      <button
        onClick={() => onToggle(!showAttributes)}
        className={`relative inline-flex h-7 md:h-5 lg:h-7 w-16 items-center rounded-full transition-colors focus:outline-none   ${
          showAttributes ? "bg-[#D9D9D9]" : "bg-gray-400"
        }`}
        style={{
          boxShadow: showAttributes
            ? "inset 4px 0px 4px 1px gray"
            : "inset -4px 0px 4px 1px gray",
        }}
      >
        <span
          className={`inline-block h-6 md:h-4 lg:h-6 w-6 transform rounded-full transition-transform ${
            showAttributes
              ? "translate-x-9 bg-[#0C76D0]"
              : "translate-x-1 bg-gray-600"
          }`}
        />
      </button>
    </div>
  );
};
