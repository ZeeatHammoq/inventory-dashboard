import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  departmentName?: string;
  itemName?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  departmentName,
  itemName,
}) => {
  const navigate = useNavigate();
  
  const getScale = () => {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    return Math.max(0.6, Math.min(2.0, currentWidth / baseWidth));
  };

  const scale = getScale();

  const handleItemBack = () => {
    navigate("/items");
  };

  let itemImagePath = "";

  switch (itemName?.toLowerCase()) {
    case "wares":
      itemImagePath = `/images/departments/${departmentName
        ?.toLowerCase()
        .replace(/[^a-z]/g, "")}.png`;
      break;
    case "electronics":
      itemImagePath = `/images/departments/${departmentName
        ?.toLowerCase()
        .replace(/[^a-z]/g, "")}.png`;
      break;
    default:
      itemImagePath = `/images/items/${departmentName
        ?.toLowerCase()
        ?.replace(/[^a-z]/g, "")}/${itemName
        ?.toLowerCase()
        .replace(/^(men's |women's |unisex )/, "")
        .replace(/[^a-z]/g, "")}.png`;
      break;
  }

  return (
    <div 
      className="bg-[#202020] text-white flex items-center border-2 border-[#004787] rounded"
      style={{ 
        padding: `${8 * scale}px ${24 * scale}px`
      }}
    >
      {departmentName && (
        <>
          <button
            onClick={handleItemBack}
            className="flex items-center hover:bg-slate-600 rounded-lg transition-colors"
            style={{ 
              gap: `${16 * scale}px`,
              padding: `${4 * scale}px ${16 * scale}px`
            }}
          >
            <div className="flex-shrink-0">
              <img
                src={`/images/departments/${departmentName
                  .toLowerCase()
                  .replace(/[^a-z]/g, "")}.png`}
                style={{ 
                  width: `${32 * scale}px`,
                  height: `${32 * scale}px`
                }}
                alt={departmentName}
              />
            </div>
            <span 
              className="font-medium"
              style={{ fontSize: `${20 * scale}px` }}
            >
              {departmentName}
            </span>
          </button>

          {itemName && (
            <>
              <span 
                className="text-slate-300"
                style={{ 
                  margin: `0 ${24 * scale}px`,
                  fontSize: `${24 * scale}px`
                }}
              >
                ›
              </span>
              <button 
                className="flex items-center rounded-lg transition-colors"
                style={{ 
                  gap: `${16 * scale}px`,
                  padding: `${4 * scale}px ${16 * scale}px`
                }}
              >
                <div className="flex-shrink-0">
                  <img 
                    src={itemImagePath} 
                    style={{ 
                      width: `${32 * scale}px`,
                      height: `${32 * scale}px`
                    }}
                    alt={""} 
                  />
                </div>
                <span 
                  className="font-medium"
                  style={{ fontSize: `${20 * scale}px` }}
                >
                  {itemName.replace(/^(Men's |Women's |Unisex )/, "")}
                </span>
              </button>
            </>
          )}

          {itemName && (
            <div className="ml-auto">
              <div 
                className="flex items-center text-white font-medium"
                style={{ 
                  gap: `${12 * scale}px`,
                  fontSize: `${14 * scale}px`
                }}
              >
                <span className="hidden sm:inline">Color of the week</span>
                <span className="sm:hidden">Color</span>
                <div 
                  className="bg-green-500 rounded text-white font-bold"
                  style={{ 
                    padding: `${4 * scale}px ${16 * scale}px`,
                    fontSize: `${14 * scale}px`
                  }}
                >
                  Green
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};