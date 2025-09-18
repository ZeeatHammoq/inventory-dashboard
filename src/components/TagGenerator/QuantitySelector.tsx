interface QuantitySelectorProps {
  selectedQuantity: string;
  setSelectedQuantity: any;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  selectedQuantity,
  setSelectedQuantity,
}) => {
  const handleQuantityChange = (value: string) => {
    if (value === "AC") {
      // Clear all digits
      setSelectedQuantity("");
    } else if (value === "C") {
      // Clear last entered digit
      setSelectedQuantity((prev: string) => prev.slice(0, -1));
    } else {
      // Add number to selected quantity
      if (selectedQuantity.length < 6)
        setSelectedQuantity((prev: string) => prev + value);
    }
  };

  return (
    <div className="w-full h-full rounded-lg flex flex-col shadow-lg">
      {/* Header */}
      <div className="bg-[#595555] rounded-t-lg flex items-center justify-between p-3">
        <h3 className="text-white  text-lg">Quantity</h3>
        <div className="flex items-center">
          <span className="text-black text-sm  bg-[#BEBEBE] px-2 py-1 rounded-tl rounded-bl">
            Selected:
          </span>
          <div className="bg-white px-4 py-1 rounded-tr rounded-br border border-gray-300 w-20 h-7 text-center flex items-center justify-center">
            <span className="text-black text-sm">{selectedQuantity || ""}</span>
          </div>
        </div>
      </div>

      {/* Main container with light yellow background */}
      <div className="bg-[#fffacd] p-4 flex-1 flex flex-col rounded-b-lg">
        {/* Selected quantity display - large yellow box with blue border */}
        <div className="bg-[#fffacd] border-4 border-[#004787] rounded-lg p-4 mb-4 h-14 flex items-center justify-center">
          <span className="text-black text-2xl ">{selectedQuantity || ""}</span>
        </div>

        {/* Button grid container - takes remaining space */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Row 1: Empty space, AC, C */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div></div>
            <button
              onClick={() => handleQuantityChange("AC")}
              className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
            >
              AC
            </button>
            <button
              onClick={() => handleQuantityChange("C")}
              className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
            >
              C
            </button>
          </div>

          {/* Row 2: 1, 2, 3 */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {["1", "2", "3"].map((num) => (
              <button
                key={num}
                onClick={() => handleQuantityChange(num)}
                className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Row 3: 4, 5, 6 */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {["4", "5", "6"].map((num) => (
              <button
                key={num}
                onClick={() => handleQuantityChange(num)}
                className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Row 4: 7, 8, 9 */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {["7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handleQuantityChange(num)}
                className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Row 5: Empty, 0, Empty */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div></div>
            <button
              onClick={() => handleQuantityChange("0")}
              className="rounded-lg border-4 border-[#004787] bg-[#e6f3ff]  text-lg text-black hover:bg-[#d1e9ff] transition-colors flex items-center justify-center"
            >
              0
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;
