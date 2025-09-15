import React from "react";
import { useNavigate } from "react-router-dom";
// import { useInventoryStore } from "../stores/inventoryStore";

interface BreadcrumbProps {
  departmentName?: string;
  itemName?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  departmentName,
  itemName,
}) => {
  const navigate = useNavigate();

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
    <div className="bg-[#202020] text-white px-6 py-2 rounded-lg mb-6 flex items-center border-2 border-[#004787]">
      {departmentName && (
        <>
          <button
            onClick={handleItemBack}
            className="flex items-center space-x-4 hover:bg-slate-600 px-4 py-1 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <img
                src={`/images/departments/${departmentName
                  .toLowerCase()
                  .replace(/[^a-z]/g, "")}.png`}
                className="h-8 w-8"
                alt={departmentName}
              />
            </div>
            <span className="font-medium text-xl">{departmentName}</span>
          </button>

          {itemName && (
            <>
              <span className="mx-6 text-slate-300 text-2xl">›</span>
              <button
                // onClick={handleItemBack}
                className="flex items-center space-x-4  px-4 py-1 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">
                  <img src={itemImagePath} className="h-8 w-8" alt={""} />
                </div>
                <span className="font-medium text-xl">
                  {itemName.replace(/^(Men's |Women's |Unisex )/, "")}
                </span>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
