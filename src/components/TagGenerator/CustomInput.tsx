import React, { useState, useRef, useEffect } from "react";

interface NumericKeypadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  anchorEl: HTMLElement | null;
  placeholder?: string;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({
  isOpen,
  onClose,
  onConfirm,
  anchorEl,
  placeholder = "Enter value",
}) => {
  const [inputValue, setInputValue] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleKeyPress = (key: string) => {
    if (key === "clear") {
      setInputValue("");
    } else if (key === "backspace") {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue((prev) => prev + key);
    }
  };

  const handleDone = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue);
    }
    onClose();
  };

  if (!isOpen || !anchorEl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={popoverRef}
        className="bg-white rounded-lg shadow-xl border-2 border-gray-300 w-80"
      >
        {/* Header */}
        <div className="bg-gray-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <h3 className="text-lg font-medium">Custom Size</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-4 bg-blue-50">
          {/* Input Display */}
          <div className="mb-4">
            <input
              type="text"
              value={inputValue}
              placeholder={placeholder}
              readOnly
              className="w-full p-3 border-2 border-gray-300 rounded text-lg text-center bg-white"
            />
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded p-4 text-xl font-semibold transition-colors"
              >
                {num}
              </button>
            ))}

            {/* Bottom row */}
            <button
              onClick={() => handleKeyPress(".")}
              className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded p-4 text-xl font-semibold transition-colors"
            >
              .
            </button>
            <button
              onClick={() => handleKeyPress("0")}
              className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded p-4 text-xl font-semibold transition-colors"
            >
              0
            </button>
            <button
              onClick={() => handleKeyPress("backspace")}
              className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded p-4 text-xl font-semibold transition-colors"
            >
              ⌫
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleDone}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white p-3 rounded font-medium transition-colors"
            disabled={!inputValue.trim()}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumericKeypad;
