import React from "react";

interface AttributeToggleProps {
  showAttributes: boolean;
  onToggle: (value: boolean) => void;
}

export const AttributeToggle: React.FC<AttributeToggleProps> = ({
  showAttributes,
  onToggle,
}) => {
  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();
  
  return (
    <div 
      className="flex items-center"
      style={{ gap: `${12 * scale}px` }}
    >
      <span 
        className="text-white font-medium"
        style={{ fontSize: `${16 * scale}px` }}
      >
        Show Attributes
      </span>
      <button
        onClick={() => onToggle(!showAttributes)}
        className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none ${
          showAttributes ? "bg-[#D9D9D9]" : "bg-gray-400"
        }`}
        style={{
          height: `${28 * scale}px`,
          width: `${64 * scale}px`,
          boxShadow: showAttributes
            ? "inset 4px 0px 4px 1px gray"
            : "inset -4px 0px 4px 1px gray",
        }}
      >
        <span
          className={`inline-block transform rounded-full transition-transform ${
            showAttributes
              ? "bg-[#0C76D0]"
              : "bg-gray-600"
          }`}
          style={{
            height: `${24 * scale}px`,
            width: `${24 * scale}px`,
            transform: showAttributes 
              ? `translateX(${36 * scale}px)` 
              : `translateX(${4 * scale}px)`
          }}
        />
      </button>
    </div>
  );
};