import React from "react";

interface TagPreviewProps {
  department: string;
  itemDescription: string;
  quantity?: string;
  size?: string;
  price: string;
  qualityLevel: "Good" | "Better" | "Best";
  onPrint: () => void;
}

export const TagPreview: React.FC<TagPreviewProps> = ({
  department,
  itemDescription,
  quantity,
  size,
  price,
  qualityLevel,
  onPrint,
}) => {
  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Tag Preview Header */}
      <div className="bg-black px-4 py-3  text-center">
        <h3 className="text-white font-bold text-lg">Tag Preview</h3>
      </div>

      {/* Tag Card */}
      <div className="bg-white  overflow-hidden shadow-lg max-w-xs flex justify-start flex-col items-center mx-auto h-4/6">
        {/* Green Header */}
        <div className="bg-[#70C96D] px-4 py-2 text-center h-1/5 w-full align-text-bottom flex flex-col-reverse">
          <div className="text-white font-bold text-2xl ">GOODWILL</div>
        </div>

        {/* Tag Content */}
        <div className="p-4 text-center">
          {/* Item Name */}
          <div className="text-black font-bold text-3xl mb-1">
            {department} -{" "}
            {itemDescription.replace(/^(Men's |Women's |Unisex )/, "")}
          </div>

          {/* Quality Level */}
          <div className="text-black text-2xl mb-2">{qualityLevel}</div>

          {quantity ? (
            <div className="text-black text-xl mb-2">Qty: {quantity}</div>
          ) : (
            ""
          )}

          {size ? (
            <div className="text-black text-xl mb-2">Size: {size}</div>
          ) : (
            ""
          )}

          {/* Price */}
          <div className="text-black  text-4xl mb-4">
            ${price?.replace("$", "")}
          </div>

          {/* QR Code Placeholder */}
          <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center">
            <div className="w-12 h-12 bg-white">
              {/* QR Code pattern simulation */}
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Crect x='0' y='0' width='4' height='4'/%3E%3Crect x='8' y='0' width='4' height='4'/%3E%3Crect x='16' y='0' width='4' height='4'/%3E%3Crect x='24' y='0' width='4' height='4'/%3E%3Crect x='32' y='0' width='4' height='4'/%3E%3Crect x='40' y='0' width='4' height='4'/%3E%3Crect x='0' y='8' width='4' height='4'/%3E%3Crect x='16' y='8' width='4' height='4'/%3E%3Crect x='32' y='8' width='4' height='4'/%3E%3Crect x='0' y='16' width='4' height='4'/%3E%3Crect x='8' y='16' width='4' height='4'/%3E%3Crect x='24' y='16' width='4' height='4'/%3E%3Crect x='40' y='16' width='4' height='4'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={onPrint}
        className="w-full bg-[#0C76D0] cursor-pointer  shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 touch-manipulation mt-auto"
      >
        <div className="mb-3">
          <img
            src={`/images/print-icon.png`}
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
            alt={"Print"}
          />
        </div>
        <span className="text-blue-900 font-bold text-lg">Print Tag</span>
      </button>
    </div>
  );
};
