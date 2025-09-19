import React, { useEffect, useState } from "react";
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
import QRCode from "react-qr-code";

export const TagGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { selectedItem, selectedDepartment, reset } = useInventoryStore();
  const { logout } = useAuthStore();

  const [showAttributes, setShowAttributes] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [qualityLevel, setQualityLevel] = useState<
    "Good" | "Better" | "Best" | ""
  >("");
  const sku = "ahskfjhgsdjkfhjk";

  // Calculate responsive scale factor
  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();

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
            .main-container {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .tag-card {
              background-color: white;
              overflow: hidden;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              display: flex;
              flex-direction: column;
              max-width: 90%;
            }

        /* Header Styles */
            .header-section {
              background-color: #70C96D;
              text-align: center;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              width: auto;
            }

        .header-text {
            color: white;
            font-weight: bold;
        }

        /* Content Area Styles */
        .content-area {
            text-align: center;
            flex: 1;
            position: relative;
        }

        /* Item Information Styles */
        .item-name {
            color: black;
            font-weight: bold;
            line-height: 1.25;
        }

        .quality-level {
            color: black;
        }

        .quantity-section {
            color: black;
        }

        .size-section {
            color: black;
        }

        /* Flex Layout for Quantity and Size */
        .info-flex {
            display: flex;
            justify-content: center;
        }

        .info-label {
            width: 6rem; /* w-24 = 96px = 6rem */
            text-align: left;
        }

        .info-value {
            width: 2rem; /* w-8 = 32px = 2rem */
            text-align: right;
        }

        /* Bottom Section Styles */
        .bottom-section {
            width: 100%;
            padding-bottom: 1rem;
        }

        .bottom-flex {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .price-text {
            color: black;
        }

        /* QR Code Section */
        .qr-section {
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
        }

        .qr-background {
            background-color: white;
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

  useEffect(()=>{
    const showAttributeLocalValue=localStorage.getItem('showAttributes')||"false";
    setShowAttributes(showAttributeLocalValue==="true");
  },[]);

  return (
    <div
      className="h-screen bg-gradient-to-br from-slate-600 to-slate-800 flex flex-col"
      style={{
        padding: `${6 * scale}px`,
        gap: `${4 * scale}px`,
      }}
    >
      {/* Top Navigation */}
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{
          padding: `${8 * scale}px`,
          marginBottom: `${4 * scale}px`,
        }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleDepartmentBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 font-medium transition-colors flex items-center rounded-l"
            style={{
              padding: `${8 * scale}px ${32 * scale}px`,
              fontSize: `${18 * scale}px`,
              gap: `${8 * scale}px`,
            }}
          >
            <ArrowLeft
              style={{
                width: `${20 * scale}px`,
                height: `${20 * scale}px`,
              }}
            />
            Department
          </button>
          <button
            onClick={handleItemBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 font-medium transition-colors"
            style={{
              padding: `${8 * scale}px ${32 * scale}px`,
              fontSize: `${18 * scale}px`,
            }}
          >
            Item Description
          </button>
          <div
            className="bg-[#0C76D0] text-white font-medium"
            style={{
              padding: `${8 * scale}px ${32 * scale}px`,
              fontSize: `${18 * scale}px`,
            }}
          >
            Tag
          </div>
          <div
            className="bg-[#0C76D0] flex items-center justify-center font-medium rounded-r"
            style={{
              padding: `${8 * scale}px ${32 * scale}px`,
              fontSize: `${18 * scale}px`,
              marginLeft: `${4 * scale}px`,
            }}
          >
            <AttributeToggle
              showAttributes={showAttributes}
              onToggle={()=>{
                setShowAttributes(!showAttributes);
                localStorage.setItem('showAttributes',`${!showAttributes}`)
              }}
            />
          </div>
          <div className="flex-1"></div>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 rounded text-white font-medium transition-colors flex items-center"
            style={{
              padding: `${8 * scale}px ${32 * scale}px`,
              fontSize: `${18 * scale}px`,
              gap: `${8 * scale}px`,
            }}
          >
            <LogOut
              style={{
                width: `${20 * scale}px`,
                height: `${20 * scale}px`,
              }}
            />
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Current Step Indicator */}
          <div
            className="bg-[#0C76D0] text-white text-center font-medium"
            style={{
              padding: `${12 * scale}px ${16 * scale}px`,
              fontSize: `${14 * scale}px`,
            }}
          >
            Step 3: Print Tag
          </div>

          {/* Progress Steps */}
          <div className="flex bg-gray-100">
            <button
              onClick={handleDepartmentBack}
              className="flex-1 bg-[#939393] hover:bg-gray-400 text-gray-600 hover:text-gray-700 text-center font-medium transition-colors"
              style={{
                padding: `${8 * scale}px`,
                fontSize: `${12 * scale}px`,
              }}
            >
              Department
            </button>
            <button
              onClick={handleItemBack}
              className="flex-1 bg-[#939393] hover:bg-gray-400 text-gray-600 hover:text-gray-700 text-center font-medium transition-colors"
              style={{
                padding: `${8 * scale}px`,
                fontSize: `${12 * scale}px`,
              }}
            >
              Item Description
            </button>
            <div
              className="flex-1 bg-[#0C76D0] text-white text-center font-medium"
              style={{
                padding: `${8 * scale}px`,
                fontSize: `${12 * scale}px`,
              }}
            >
              Tag
            </div>
          </div>

          <div
            className="bg-[#0C76D0] flex items-center justify-center font-medium mx-auto w-fit"
            style={{
              padding: `${4 * scale}px ${16 * scale}px`,
              fontSize: `${14 * scale}px`,
              margin: `${8 * scale}px auto`,
            }}
          >
            <AttributeToggle
              showAttributes={showAttributes}
              onToggle={setShowAttributes}
            />
          </div>

          {/* Mobile Controls */}
          <div
            className="bg-gray-50 border-t flex justify-between items-center"
            style={{
              padding: `${12 * scale}px ${16 * scale}px`,
            }}
          >
            <button
              onClick={handleItemBack}
              className="bg-[#939393] hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors flex items-center"
              style={{
                padding: `${8 * scale}px ${16 * scale}px`,
                fontSize: `${14 * scale}px`,
                gap: `${8 * scale}px`,
              }}
            >
              <ArrowLeft
                style={{
                  width: `${16 * scale}px`,
                  height: `${16 * scale}px`,
                }}
              />
              Back
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors flex items-center"
              style={{
                padding: `${8 * scale}px ${16 * scale}px`,
                fontSize: `${14 * scale}px`,
                gap: `${8 * scale}px`,
              }}
            >
              <LogOut
                style={{
                  width: `${16 * scale}px`,
                  height: `${16 * scale}px`,
                }}
              />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: `${4 * scale}px` }}>
        <Breadcrumb
          departmentName={selectedDepartment}
          itemName={selectedItem.itemDescription}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col md:flex-row grow"
        style={{ gap: `${4 * scale}px` }}
      >
        {showAttributes ? (
          <div
            className="flex flex-col md:flex-row md:flex-[3]"
            style={{ gap: `${4 * scale}px` }}
          >
            <div className="md:flex-1 h-64 md:h-auto">
              <QuantitySelector
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            </div>
            <div
              className="flex flex-col md:flex-[3]"
              style={{ gap: `${4 * scale}px` }}
            >
              <div
                className="flex flex-1 h-64 md:h-5/6"
                style={{ gap: `${4 * scale}px` }}
              >
                <div className="flex-[2] h-full">
                  <PriceSelector
                    prices={selectedItem.price || []}
                    recommendedPrice={selectedItem.currentPrice}
                    selectedPrice={selectedPrice}
                    onPriceChange={setSelectedPrice}
                  />
                </div>
                <div className="flex-1 h-full">
                  <SizeSelector
                    sizes={selectedItem.size || []}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />
                </div>
              </div>
              <div
                className="flex md:h-1/6 h-16"
                style={{
                  gap: `${8 * scale}px`,
                  padding: `${8 * scale}px`,
                }}
              >
                <button
                  onClick={() => setQualityLevel("Good")}
                  className={`flex-1 rounded transition-all ${
                    qualityLevel === "Good"
                      ? "bg-[#FFA947] text-black shadow-[inset_0_0_0_4px_white]"
                      : qualityLevel === ""
                      ? "bg-[#FFA947] text-black"
                      : "bg-[#FFA947] text-black opacity-30"
                  }`}
                  style={{
                    fontSize: `${32 * scale}px`,
                    padding: `${12 * scale}px`,
                  }}
                >
                  Good
                </button>
                <button
                  onClick={() => setQualityLevel("Better")}
                  className={`flex-1 rounded font-medium transition-all ${
                    qualityLevel === "Better"
                      ? "bg-[#FBFF00] text-black shadow-[inset_0_0_0_4px_white]"
                      : qualityLevel === ""
                      ? "bg-[#FBFF00] text-black"
                      : "bg-[#FBFF00] text-black opacity-30"
                  }`}
                  style={{
                    fontSize: `${32 * scale}px`,
                    padding: `${12 * scale}px`,
                  }}
                >
                  Better
                </button>
                <button
                  onClick={() => setQualityLevel("Best")}
                  className={`flex-1 rounded font-bold transition-all ${
                    qualityLevel === "Best"
                      ? "bg-[#00FF22] text-black shadow-[inset_0_0_0_4px_white]"
                      : qualityLevel === ""
                      ? "bg-[#00FF22] text-black"
                      : "bg-[#00FF22] text-black opacity-30"
                  }`}
                  style={{
                    fontSize: `${32 * scale}px`,
                    padding: `${12 * scale}px`,
                  }}
                >
                  Best
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={`bg-[#595555] ${
            showAttributes ? "md:flex-1 h-64 md:h-auto" : "flex-1"
          }`}
          style={{ marginTop: `${-4 * scale}px` }}
        >
          <TagPreview
            department={selectedDepartment}
            itemDescription={selectedItem.itemDescription}
            quantity={showAttributes?selectedQuantity:""}
            size={showAttributes?selectedSize:""}
            price={showAttributes?selectedPrice || selectedItem.currentPrice:selectedItem.currentPrice}
            qualityLevel={showAttributes?qualityLevel:""}
            onPrint={handlePrintTag}
            sku={sku}
          />
        </div>
      </div>

      {/* Hidden printable tag content */}
      <div id="printable-tag" style={{ display: "none" }}>
        <div className="main-container" style={{ padding: `${16 * scale}px` }}>
          <div
            className="tag-card"
            style={{
              width: `${300 * scale}px`,
              height: `${500 * scale}px`,
              maxWidth: "90%",
            }}
          >
            {/* <!-- Green Header --> */}
            <div
              className="header-section"
              style={{
                padding: `${8 * scale}px ${16 * scale}px`,
                height: `${60 * scale}px`,
              }}
            >
              <div
                className="header-text"
                style={{ fontSize: `${24 * scale}px` }}
              >
                GOODWILL
              </div>
            </div>

            {/* <!-- Tag Content --> */}
            <div
              className="content-area"
              style={{ padding: `${16 * scale}px` }}
            >
              {/* <!-- Item Name --> */}
              <div
                className="item-name"
                style={{
                  fontSize: `${28 * scale}px`,
                  marginBottom: `${4 * scale}px`,
                }}
              >
                {selectedDepartment} -{" "}
                {selectedItem.itemDescription.replace(
                  /^(Men's |Women's |Unisex )/,
                  ""
                )}
              </div>

              {/* <!-- Quality Level --> */}
              <div
                className="quality-level"
                style={{
                  fontSize: `${28 * scale}px`,
                  marginBottom: `${8 * scale}px`,
                }}
              >
                {showAttributes?qualityLevel:""}
              </div>

              {/* <!-- Quantity --> */}
              {showAttributes&&selectedQuantity && (
                <div
                  className="quantity-section"
                  style={{
                    fontSize: `${24 * scale}px`,
                    marginBottom: `${4 * scale}px`,
                  }}
                >
                  <div className="info-flex">
                    <span className="info-label">Qty:</span>
                    <span className="info-value">{selectedQuantity}</span>
                  </div>
                </div>
              )}

              {/* <!-- Size --> */}
              {showAttributes&&selectedSize && (
                <div
                  className="size-section"
                  style={{
                    fontSize: `${24 * scale}px`,
                    marginBottom: `${4 * scale}px`,
                  }}
                >
                  <div className="info-flex">
                    <span className="info-label">Size:</span>
                    <span className="info-value">{selectedSize}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bottom-section">
              <div className="bottom-flex">
                {/* <!-- Price --> */}
                <div
                  className="price-text"
                  style={{
                    fontSize: `${52 * scale}px`,
                    marginBottom: `${8 * scale}px`,
                  }}
                >
                  $
                  {showAttributes?selectedPrice?.replace("$", "") ||
                    selectedItem.currentPrice?.replace("$", ""):selectedItem.currentPrice?.replace("$", "")}
                </div>

                {/* <!-- QR Code Section --> */}
                <div className="qr-section">
                  <p style={{ fontSize: `${16 * scale}px` }}>{sku}</p>
                  <QRCode
                    size={256}
                    className="qr-background"
                    style={{
                      width: `${100 * scale}px`,
                      height: `${100 * scale}px`,
                    }}
                    value={sku}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
