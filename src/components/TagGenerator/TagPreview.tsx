import React from "react";
import QRCode from "react-qr-code";

interface TagPreviewProps {
  department: string;
  itemDescription: string;
  quantity?: string;
  size?: string;
  price: string;
  qualityLevel: "Good" | "Better" | "Best" | "";
  onPrint: () => void;
  sku:string;
}

export const TagPreview: React.FC<TagPreviewProps> = ({
  department,
  itemDescription,
  quantity,
  size,
  price,
  qualityLevel,
  onPrint,
  sku
}) => {
  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();
  
  return (
    <div
      className="h-full flex flex-col justify-between"
      style={{ gap: `${16 * scale}px` }}
    >
      {/* Tag Preview Header */}
      <div
        className="bg-black text-center"
        style={{
          padding: `${12 * scale}px ${16 * scale}px`,
        }}
      >
        <h3
          className="text-white font-bold"
          style={{ fontSize: `${24 * scale}px` }}
        >
          Tag Preview
        </h3>
      </div>

      {/* Tag Card Container */}
      <div
        className="flex items-center justify-center"
        style={{ padding: `${16 * scale}px` }}
      >
        <div
          className="bg-white overflow-hidden shadow-lg flex flex-col"
          style={{
            width: `${300 * scale}px`,
            height: `${500 * scale}px`,
            maxWidth: "90%",
          }}
        >
          {/* Green Header */}
          <div
            className="bg-[#70C96D] text-center flex items-end justify-center w-full"
            style={{
              padding: `${8 * scale}px ${16 * scale}px`,
              height: `${60 * scale}px`,
            }}
          >
            <div
              className="text-white font-bold"
              style={{ fontSize: `${24 * scale}px` }}
            >
              GOODWILL
            </div>
          </div>

          {/* Tag Content */}
          <div
            className="text-center flex-1 relative"
            style={{ padding: `${16 * scale}px` }}
          >
            {/* Item Name */}
            <div
              className="text-black font-bold leading-tight"
              style={{
                fontSize: `${28 * scale}px`,
                marginBottom: `${4 * scale}px`,
              }}
            >
              {department} -{" "}
              {itemDescription.replace(/^(Men's |Women's |Unisex )/, "")}
            </div>

            {/* Quality Level */}
            <div
              className="text-black"
              style={{
                fontSize: `${28 * scale}px`,
                marginBottom: `${8 * scale}px`,
              }}
            >
              {qualityLevel}
            </div>

            {/* Quantity */}
            {quantity && (
              <div
                className="text-black"
                style={{
                  fontSize: `${24 * scale}px`,
                  marginBottom: `${4 * scale}px`,
                }}
              >
                <div className="flex justify-center">
                  <p className="w-24 text-left">Qty:</p>
                  <p className="w-8 text-right">{quantity}</p>
                </div>
              </div>
            )}

            {/* Size */}
            {size && (
              <div
                className="text-black"
                style={{
                  fontSize: `${24 * scale}px`,
                  marginBottom: `${4 * scale}px`,
                }}
              >
                <div className="flex justify-center">
                  <p className="w-24 text-left">Size:</p>
                  <p className="w-8 text-right">{size}</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full pb-4">
            <div className="flex justify-center flex-col items-center">
              {/* Price */}
              <div
                className="text-black"
                style={{
                  fontSize: `${52 * scale}px`,
                  marginBottom: `${8 * scale}px`,
                }}
              >
                ${price?.replace("$", "")}
              </div>

              {/* QR Code Placeholder */}
              <div
                className=" mx-auto flex flex-col gap-2 items-center justify-center"
              >
                <p style={{ fontSize: `${16 * scale}px` }}>{sku}</p>
                <QRCode
                  size={256}
                  className="bg-white"
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

      {/* Print Button */}
      <button
        onClick={onPrint}
        className="bg-[#0C76D0] hover:bg-[#0a5ea8] cursor-pointer shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95 touch-manipulation mt-auto"
        style={{
          padding: `${24 * scale}px`,
          gap: `${12 * scale}px`,
        }}
      >
        <div>
          <img
            src={`/images/print-icon.png`}
            style={{
              width: `${64 * scale}px`,
              height: `${64 * scale}px`,
            }}
            alt={"Print"}
          />
        </div>
        <span
          className="text-white font-bold"
          style={{ fontSize: `${32 * scale}px` }}
        >
          Print Tag
        </span>
      </button>
    </div>
  );
};
