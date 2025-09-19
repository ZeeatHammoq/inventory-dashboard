import React, { useRef, useState } from "react";
import NumericKeypad from "./CustomInput";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  console.log(sizes);
  const [showKeypad, setShowKeypad] = useState(false);
  const customInputRef = useRef<HTMLDivElement>(null);

  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();

  const handleCustomInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowKeypad(true);
  };

  return (
    <div className="rounded-lg w-full h-full flex flex-col">
      {/* Header */}
      <div
        className="bg-[#595555] rounded-t-lg flex items-center justify-between"
        style={{ padding: `${12 * scale}px` }}
      >
        <h3 className="text-white font-bold" style={{ fontSize: `${22 * scale}px` }}>
          Size
        </h3>
        <div className="flex items-center">
          <span
            className="text-black bg-[#BEBEBE] rounded-tl rounded-bl"
            style={{
              fontSize: `${13 * scale}px`,
              padding: `${4 * scale}px ${8 * scale}px`,
            }}
          >
            Selected:
          </span>
          <div
            className="bg-white rounded-tr rounded-br border border-gray-300 text-center flex items-center justify-center w-fit"
            style={{
              minWidth: `${80 * scale}px`,
              height: `${28 * scale}px`,
              padding: `${4 * scale}px ${16 * scale}px`,
            }}
          >
            <span
              className="text-black"
              style={{ fontSize: `${14 * scale}px` }}
            >
              {selectedSize || ""}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div
        className="bg-[#D4DCFF] flex-1 flex flex-col"
        style={{ padding: `${16 * scale}px` }}
      >
        {/* Empty header space for consistency */}
        <div
          className="border-[#D4DCFF] rounded opacity-0"
          style={{
            borderWidth: `${4 * scale}px`,
            padding: `${8 * scale}px ${24 * scale}px`,
            marginBottom: `${12 * scale}px`,
          }}
        >
          <div
            className="flex gap-4 justify-center font-bold"
            style={{ fontSize: `${18 * scale}px` }}
          >
            <span className="text-[#D4DCFF]">Placeholder</span>
          </div>
        </div>

        {/* Size Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 pt-2"
          style={{ gap: `${8 * scale}px` }}
        >
          {sizes.map((size,index) => (
            <button
              key={size+"-"+index}
              onClick={() => onSizeChange(size)}
              className={`rounded-lg transition-all flex items-center justify-center ${
                selectedSize === size
                  ? "bg-black text-white border-black shadow-[inset_0_0_0_4px_white]"
                  : "bg-[#EBF5FF] text-black border-[#004787]"
              }`}
              style={{
                borderWidth: `${selectedSize === size?1:3 * scale}px`,
                fontSize: `${28 * scale}px`,
                minHeight: `${28 * scale}px`,
                padding: `${20 * scale}px ${16 * scale}px`,
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Size Section */}
      <div className="bg-[#D4DCFF] flex justify-center pb-2">
        <div
          ref={customInputRef}
          onClick={handleCustomInputClick}
          className={`rounded-lg transition-all cursor-pointer flex items-center justify-center text-black border-[#004787] bg-[#EBF5FF]`}
          style={{
            borderWidth: `${3 * scale}px`,
            fontSize: `${28 * scale}px`,
            minHeight: `${48 * scale}px`,
            padding: `${8 * scale}px ${24 * scale}px`,
          }}
        >
          Other
        </div>
      </div>

      <NumericKeypad
        isOpen={showKeypad}
        onClose={() => setShowKeypad(false)}
        onConfirm={onSizeChange}
        anchorEl={customInputRef.current}
        placeholder={"Other Custom Size"}
        heading={"Custome Size"}
        bgColor={'bg-[#D4DCFF]'}
      />
    </div>
  );
};
