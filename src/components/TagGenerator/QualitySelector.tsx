import React from "react";

interface QualitySelectorProps {
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({
  selectedQuality,
  onQualityChange,
}) => {
  const qualities = [
    { label: "Good", color: "bg-orange-400", textColor: "text-black" },
    { label: "Better", color: "bg-yellow-400", textColor: "text-black" },
    { label: "Best", color: "bg-green-500", textColor: "text-white" },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {qualities.map(({ label, color, textColor }) => (
        <button
          key={label}
          onClick={() => onQualityChange(label)}
          className={`
            px-16 py-4 rounded-lg font-bold text-2xl transition-all duration-200
            ${color} ${textColor}
            ${
              selectedQuality === label
                ? "ring-4 ring-blue-500 ring-offset-2 shadow-lg transform scale-105"
                : "hover:shadow-lg hover:transform hover:scale-102"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
