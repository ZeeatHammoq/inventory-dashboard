interface QuantitySelectorProps {
  selectedQuantity: string;
  setSelectedQuantity: any;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  selectedQuantity,
  setSelectedQuantity,
}) => {
  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();

  const handleQuantityChange = (value: string) => {
    if (value === "AC") {
      setSelectedQuantity("");
    } else if (value === "C") {
      setSelectedQuantity((prev: string) => prev.slice(0, -1));
    } else {
      if (selectedQuantity.length < 6)
        setSelectedQuantity((prev: string) => prev + value);
    }
  };

  return (
    <div className="w-full h-full rounded-lg flex flex-col shadow-lg">
      {/* Header */}
      <div 
        className="bg-[#595555] rounded-t-lg flex items-center justify-between"
        style={{ padding: `${12 * scale}px` }}
      >
        <h3 
          className="text-white font-bold"
          style={{ fontSize: `${22 * scale}px` }}
        >
          Quantity
        </h3>
        <div className="flex items-center">
          <span 
            className="text-black bg-[#BEBEBE] rounded-tl rounded-bl"
            style={{
              fontSize: `${13 * scale}px`,
              padding: `${4 * scale}px ${8 * scale}px`
            }}
          >
            Selected:
          </span>
          <div 
            className="bg-white rounded-tr rounded-br border border-gray-300 text-center flex items-center justify-center"
            style={{
              width: `${80 * scale}px`,
              height: `${28 * scale}px`,
              padding: `${4 * scale}px ${16 * scale}px`
            }}
          >
            <span 
              className="text-black"
              style={{ fontSize: `${14 * scale}px` }}
            >
              {selectedQuantity || ""}
            </span>
          </div>
        </div>
      </div>

      {/* Main container with light yellow background */}
      <div 
        className="bg-[#fffacd] flex-1 flex flex-col rounded-b-lg"
        style={{ padding: `${20 * scale}px` }}
      >
        {/* Selected quantity display - large yellow box with blue border */}
        <div 
          className="bg-[#fffacd] border-[#004787] rounded-lg flex items-center justify-center"
          style={{
            borderWidth: `${4 * scale}px`,
            padding: `${16 * scale}px`,
            marginBottom: `${16 * scale}px`,
            height: `${56 * scale}px`
          }}
        >
          <span 
            className="text-black"
            style={{ fontSize: `${28 * scale}px` }}
          >
            {selectedQuantity || ""}
          </span>
        </div>

        {/* Button grid container - takes remaining space */}
        <div 
          className="flex-1 flex flex-col"
          style={{ gap: `${16 * scale}px` }}
        >
          {/* Row 1: Empty space, AC, C */}
          <div 
            className="grid grid-cols-3 flex-1"
            style={{ gap: `${16 * scale}px` }}
          >
            <div></div>
            <button
              onClick={() => handleQuantityChange("AC")}
              className="rounded-lg border-[#004787] bg-[#e6f3ff] text-black hover:bg-[#d1e9ff] active:bg-[#252f38] transition-colors flex items-center justify-center"
              style={{
                borderWidth: `${4 * scale}px`,
                fontSize: `${22 * scale}px`
              }}
            >
              AC
            </button>
            <button
              onClick={() => handleQuantityChange("C")}
              className="rounded-lg border-[#004787] bg-[#e6f3ff] text-black hover:bg-[#d1e9ff] active:bg-[#252f38] transition-colors flex items-center justify-center"
              style={{
                borderWidth: `${4 * scale}px`,
                fontSize: `${22 * scale}px`
              }}
            >
              C
            </button>
          </div>

          {/* Number rows */}
          {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]].map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="grid grid-cols-3 flex-1"
              style={{ gap: `${16 * scale}px` }}
            >
              {row.map((num) => (
                <button
                  key={num}
                  onClick={() => handleQuantityChange(num)}
                  className="rounded-lg border-[#004787] bg-[#e6f3ff] text-black hover:bg-[#d1e9ff] active:bg-[#252f38] transition-colors flex items-center justify-center"
                  style={{
                    borderWidth: `${4 * scale}px`,
                    fontSize: `${28 * scale}px`
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          ))}

          {/* Row 5: Empty, 0, Empty */}
          <div 
            className="grid grid-cols-3 flex-1"
            style={{ gap: `${16 * scale}px` }}
          >
            <div></div>
            <button
              onClick={() => handleQuantityChange("0")}
              className="rounded-lg border-[#004787] bg-[#e6f3ff] text-black hover:bg-[#d1e9ff] active:bg-[#252f38] transition-colors flex items-center justify-center"
              style={{
                borderWidth: `${4 * scale}px`,
                fontSize: `${28 * scale}px`
              }}
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