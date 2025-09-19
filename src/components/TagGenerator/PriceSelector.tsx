import React, { useRef, useState } from "react";
import NumericKeypad from "./CustomInput";

interface PriceSelectorProps {
  prices?: string[];
  recommendedPrice?: string;
  selectedPrice?: string;
  onPriceChange?: (price: string) => void;
}

export const PriceSelector: React.FC<PriceSelectorProps> = ({
  prices = [],
  recommendedPrice = "2.99",
  selectedPrice = "2.99",
  onPriceChange = () => {},
}) => {
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

  const displayPrices = prices;

  return (
    <div className="rounded-lg w-full h-full flex flex-col">
      {/* Header */}
      <div
        className="bg-[#595555] rounded-t-lg flex items-center justify-between"
        style={{ padding: `${12 * scale}px` }}
      >
        <h3 className="text-white font-bold" style={{ fontSize: `${22 * scale}px` }}>
          Price
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
            className="bg-white rounded-tr rounded-br border border-gray-300 text-center flex items-center justify-center"
            style={{
              width: `${80 * scale}px`,
              height: `${28 * scale}px`,
              padding: `${4 * scale}px ${16 * scale}px`,
            }}
          >
            <span
              className="text-black"
              style={{ fontSize: `${14 * scale}px` }}
            >
              ${selectedPrice.replace("$", "") || ""}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div
        className="bg-[#D4FFFE] flex-1 flex flex-col"
        style={{ padding: `${16 * scale}px` }}
      >
        {/* Recommended Price Header */}
        <div
          className="bg-[#EBF5FF] text-black border-[#004787] rounded-lg"
          style={{
            borderWidth: `${3 * scale}px`,
            padding: `${8 * scale}px ${24 * scale}px`,
            marginBottom: `${12 * scale}px`,
          }}
        >
          <div
            className="flex justify-center"
            style={{
              gap: `${16 * scale}px`,
              fontSize: `${24 * scale}px`,
            }}
          >
            <span className="text-black">Recommended price :</span>
            <span className="text-green-700 font-bold">
              ${recommendedPrice}
            </span>
          </div>
        </div>

        {/* Price Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1"
          style={{ gap: `${8 * scale}px` }}
        >
          {displayPrices.map((price) => (
            <button
              key={price}
              onClick={() => onPriceChange(price)}
              className={`rounded-lg transition-all flex items-center justify-center ${
                selectedPrice === price
                  ? "bg-black text-white border-black shadow-[inset_0_0_0_4px_white]"
                  : "bg-[#EBF5FF] text-black border-[#004787]"
              }`}
              style={{
                borderWidth: `${selectedPrice === price?1:3 * scale}px`,
                fontSize: `${28 * scale}px`,
                minHeight: `${48 * scale}px`,
              }}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Price Section */}
      <div className="bg-[#D4FFFE] flex justify-center pb-2">
        <div
          onClick={handleCustomInputClick}
          ref={customInputRef}
          className={`rounded-lg transition-all flex items-center justify-center text-black border-[#004787] bg-[#EBF5FF] cursor-pointer`}
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
        onConfirm={onPriceChange}
        anchorEl={customInputRef.current}
        placeholder={"Other Custom Price"}
        heading={"Custome Price"}
        bgColor={'bg-[#D4FFFE]'}
      />
    </div>
  );
};
