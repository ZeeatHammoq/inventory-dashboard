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
  const [showKeypad, setShowKeypad] = useState(false);
  const customInputRef = useRef<HTMLDivElement>(null);

  const handleCustomInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowKeypad(true);
  };

  return (
    <div className="rounded-lg w-full h-full flex flex-col">
      {/* Header */}
      <div className="bg-[#595555] rounded-t-lg flex items-center justify-between p-3">
        <h3 className="text-white  text-lg">Quantity</h3>
        <div className="flex items-center">
          <span className="text-black text-sm  bg-[#BEBEBE] px-2 py-1 rounded-tl rounded-bl">
            Selected:
          </span>
          <div className="bg-white px-4 py-1 rounded-tr rounded-br border border-gray-300 w-20 h-7 text-center flex items-center justify-center">
            <span className="text-black text-sm">{selectedSize || ""}</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-[#D4FFFE] p-4 h-full">
        {/* Recommended Price Header */}
        <div className="border-4 border-[#D4FFFE] px-3 py-2 mx-6 rounded mb-3">
          <div className="flex gap-4 justify-center  font-bold text-lg">
            <span className="text-[#D4FFFE] ">Recommended price</span>
            {/* <span className="text-black">${recommendedPrice}</span> */}
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-3 gap-2 mb-2 h-4/5  ">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={` py-4 rounded-lg  text-lg transition-all  ${
                selectedSize === size
                  ? "bg-[#EBF5FF] text-black border-3 border-[#004787]"
                  : "bg-[#EBF5FF] text-black border-3 border-[#004787]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {/* Custom Price Section */}
      <div className="bg-[#BEBEBE] rounded-b-lg flex items-start flex-col p-3">
        <h3 className="text-black text-lg mb-2">Other Custom Size</h3>
        <div
          ref={customInputRef}
          className="flex items-center w-full cursor-pointer"
          onClick={handleCustomInputClick}
        >
          <div className="bg-white px-4 py-1 rounded border-3 border-[#004787] h-8 text-center flex items-center justify-center flex-1 hover:bg-gray-50 transition-colors">
            Other Custom Size
          </div>
        </div>
      </div>

      <NumericKeypad
        isOpen={showKeypad}
        onClose={() => setShowKeypad(false)}
        onConfirm={onSizeChange}
        anchorEl={customInputRef.current}
        placeholder={"Other Custom Size"}
      />
    </div>
  );
};
