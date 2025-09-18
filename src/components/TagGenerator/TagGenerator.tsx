import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryStore } from "../../stores/inventoryStore";
import { useAuthStore } from "../../stores/authStore";
import { ArrowLeft, LogOut } from "lucide-react";
import { AttributeToggle } from "./AttributeToggle";
import QuantitySelector from "./QuantitySelector";
import { PriceSelector } from "./PriceSelector";
import { SizeSelector } from "./SizeSelector";
import { TagPreview } from "./TagPreview";
import { Breadcrumb } from "../Breadcrumb";

export const TagGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { selectedItem, selectedDepartment, reset } = useInventoryStore();
  const { logout } = useAuthStore();

  const [showAttributes, setShowAttributes] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [qualityLevel, setQualityLevel] = useState<"Good" | "Better" | "Best">(
    "Best"
  );

  if (!selectedDepartment || !selectedItem) {
    reset();
    navigate("/department");
    return null;
  }

  const handleDepartmentBack = () => {
    reset();
    navigate("/departments");
  };

  const handleItemBack = () => {
    navigate("/items");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePrintTag = () => {
    // Print functionality remains the same
    const printWindow = window.open("", "_blank");
    const tagContent = document.getElementById("printable-tag");

    if (printWindow && tagContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Tag</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .tag-print {
              max-width: 400px;
              margin: 0 auto;
              border: 2px solid #333;
              border-radius: 8px;
              overflow: hidden;
              background: white;
            }
            .tag-header {
              background-color: #22c55e;
              padding: 8px 16px;
              border-bottom: 1px solid #d1d5db;
            }
            .tag-title {
              font-size: 14px;
              font-weight: bold;
              color: white;
              margin: 0;
              text-align: center;
            }
            .tag-details {
              padding: 16px;
              text-align: center;
            }
            .item-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .item-quality {
              font-size: 14px;
              margin-bottom: 8px;
            }
            .item-details {
              font-size: 12px;
              margin-bottom: 16px;
            }
            .price {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 16px;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .tag-print { max-width: none; }
            }
          </style>
        </head>
        <body>
          ${tagContent.innerHTML}
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-br from-slate-600 to-slate-800 p-3 sm:p-6 lg:p-8 flex flex-col">
      {/* Top Navigation */}
      <div className="bg-white rounded-lg shadow-lg mb-2 sm:mb-3 lg:mb-4 overflow-hidden py-2 px-2">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleDepartmentBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-4 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg"
          >
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            Department
          </button>
          <button
            onClick={handleItemBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-4 py-1 lg:px-8 lg:py-2 font-medium transition-colors text-sm lg:text-lg"
          >
            Item Description
          </button>
          <div className="bg-[#0C76D0] text-white px-4 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Tag
          </div>
          <div className="bg-[#0C76D0] flex items-center justify-center px-4 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg ml-1">
            <AttributeToggle
              showAttributes={showAttributes}
              onToggle={setShowAttributes}
            />
          </div>
          <div className="flex-1"></div>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 rounded text-white px-4 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Current Step Indicator */}
          <div className="bg-[#0C76D0] text-white px-4 py-3 text-center font-medium text-sm">
            Step 3: Print Tag
          </div>

          {/* Progress Steps */}
          <div className="flex bg-gray-100">
            <button
              onClick={handleDepartmentBack}
              className="flex-1 bg-[#939393] hover:bg-gray-400 text-gray-600 hover:text-gray-700 text-center py-2 text-xs font-medium transition-colors"
            >
              Department
            </button>
            <button
              onClick={handleItemBack}
              className="flex-1 bg-[#939393] hover:bg-gray-400 text-gray-600 hover:text-gray-700 text-center py-2 text-xs font-medium transition-colors"
            >
              Item Description
            </button>
            <div className="flex-1 bg-[#0C76D0] text-white text-center py-2 text-xs font-medium">
              Tag
            </div>
          </div>

          <div className="bg-[#0C76D0] flex items-center justify-center px-4 py-1 font-medium text-sm my-2 mx-auto w-fitz ">
            <AttributeToggle
              showAttributes={showAttributes}
              onToggle={setShowAttributes}
            />
          </div>

          {/* Mobile Controls */}
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
            <button
              onClick={handleItemBack}
              className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mb-1">
        <Breadcrumb
          departmentName={selectedDepartment}
          itemName={selectedItem.itemDescription}
        />
      </div>

      {/* Main Content */}

      <div className="flex flex-row gap-1 grow">
        {showAttributes ? (
          <div className="grow-[3]  flex gap-1 ">
            <div className="grow h-full">
              <QuantitySelector
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            </div>
            <div className="grow-[3] bg-blue h-full ">
              <div className="h-5/6  flex gap-1">
                <div className="grow-[2]  h-full">
                  <PriceSelector
                    prices={selectedItem.price || []}
                    recommendedPrice={selectedItem.currentPrice}
                    selectedPrice={selectedPrice}
                    onPriceChange={setSelectedPrice}
                  />
                </div>
                <div className="grow h-full">
                  <SizeSelector
                    sizes={selectedItem.size || []}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />
                </div>
              </div>
              <div className="flex gap-2 h-1/6 p-2">
                <button
                  onClick={() => setQualityLevel("Good")}
                  className={`flex-1 py-3 rounded font-bold ${
                    qualityLevel === "Good"
                      ? "bg-[#FFA947] text-black opacity-60"
                      : "bg-[#FFA947] text-black"
                  }`}
                >
                  Good
                </button>
                <button
                  onClick={() => setQualityLevel("Better")}
                  className={`flex-1 py-3 rounded font-bold ${
                    qualityLevel === "Better"
                      ? "bg-[#FBFF00] text-black opacity-60"
                      : "bg-[#FBFF00] text-black"
                  }`}
                >
                  Better
                </button>
                <button
                  onClick={() => setQualityLevel("Best")}
                  className={`flex-1 py-3 rounded font-bold ${
                    qualityLevel === "Best"
                      ? "bg-[#00FF22] text-black opacity-60"
                      : "bg-[#00FF22] text-black"
                  }`}
                >
                  Best
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="grow bg-[#595555] -mt-1 ">
          <TagPreview
            department={selectedDepartment}
            itemDescription={selectedItem.itemDescription}
            quantity={selectedQuantity}
            size={selectedSize}
            price={selectedPrice || selectedItem.currentPrice}
            qualityLevel={qualityLevel}
            onPrint={handlePrintTag}
          />
        </div>
      </div>

      {/* Hidden printable tag content */}
      <div id="printable-tag" style={{ display: "none" }}>
        <div className="tag-print">
          <div className="tag-header">
            <h2 className="tag-title">GOODWILL</h2>
          </div>
          <div className="tag-details">
            <div className="item-name">
              {selectedDepartment} -{" "}
              {selectedItem.itemDescription.replace(
                /^(Men's |Women's |Unisex )/,
                ""
              )}
            </div>
            <div className="item-quality">{qualityLevel}</div>
            {selectedQuantity && selectedSize && (
              <div className="item-details">
                Qty: {selectedQuantity} Size: {selectedSize}
              </div>
            )}
            <div className="price">
              ${selectedPrice || selectedItem.currentPrice}
            </div>
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto",
                backgroundColor: "#000",
              }}
            >
              {/* QR Code placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
