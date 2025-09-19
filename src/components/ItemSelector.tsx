import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryStore } from "../stores/inventoryStore";
import { useAuthStore } from "../stores/authStore";
import { Shirt, ArrowLeft, LogOut, AlertCircle } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export const ItemSelector: React.FC = () => {
  const navigate = useNavigate();
  const { items, selectedDepartment, setSelectedItem, reset } =
    useInventoryStore();
  const { logout } = useAuthStore();

  if (!selectedDepartment) {
    reset();
    navigate("/department");
  }

  const [imageErrors, setImageErrors] = useState<any>({});

  // Filter items by selected department
  const departmentItems = useMemo(() => {
    if (!selectedDepartment) return [];
    return items.filter((item) => item.department === selectedDepartment);
  }, [items, selectedDepartment]);

  if (departmentItems.length === 1) {
    setSelectedItem(departmentItems[0]);
    navigate("/tag");
  }

  const handleItemSelect = (item: (typeof items)[0]) => {
    setSelectedItem(item);
    navigate("/tag");
  };

  const handleBack = () => {
    reset();
    navigate("/departments");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!selectedDepartment) {
    navigate("/departments");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 p-3 sm:p-6 lg:p-8">
      {/* Navigation Header */}
      <div className="bg-white rounded-lg shadow-lg mb-2 sm:mb-3 lg:mb-4 overflow-hidden py-2 px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg"
          >
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            Department
          </button>
          <div className="bg-[#0C76D0] text-white px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Choose Item Description
          </div>
          <div className="bg-[#939393] text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Tag
          </div>
          <div className="flex-1"></div>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 rounded text-white px-6 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Current Step Indicator */}
          <div className="bg-[#0C76D0] text-white px-4 py-3 text-center font-medium text-sm">
            Step 2: Choose Item Description
          </div>

          {/* Progress Steps */}
          <div className="flex bg-gray-100">
            <button
              onClick={handleBack}
              className="flex-1 bg-[#939393] hover:bg-gray-400 text-gray-600 hover:text-gray-700 text-center py-2 text-xs font-medium transition-colors"
            >
              Department
            </button>
            <div className="flex-1 bg-[#0C76D0] text-white text-center py-2 text-xs font-medium">
              Item Description
            </div>
            <div className="flex-1 bg-[#939393] text-gray-600 text-center py-2 text-xs font-medium">
              Tag
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
            <button
              onClick={handleBack}
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

      {/* Department Breadcrumb */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <Breadcrumb departmentName={selectedDepartment} />
      </div>

      {/* Items Grid */}
      <div className="max-w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {departmentItems.map((item, index) => {
            const path =
              selectedDepartment.toLowerCase() === "shoes and accessories"
                ? item.itemDescription
                : item.itemDescription.replace(
                    /^(Men's |Women's |Unisex |Infant)/,
                    ""
                  );
            return (
              <button
                key={index}
                onClick={() => handleItemSelect(item)}
                className="bg-[#EBF5FF] hover:bg-[#FFFFFF] border-4 border-[#004787] hover:border-[#0C76D0] rounded-lg p-3 sm:p-4 lg:p-6 transition-all duration-200 hover:shadow-lg group min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col items-center justify-center text-center touch-manipulation"
              >
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  {!imageErrors[
                    `${selectedDepartment}-${item.itemDescription}`
                  ] ? (
                    <img
                      src={`/images/items/${selectedDepartment
                        .toLowerCase()
                        .replace(/[^a-z]/g, "")}/${path
                        .toLowerCase()
                        .replace(/[^a-z]/g, "")}.webp`}
                      className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                      alt={item.itemDescription}
                      onError={(err) => {
                        console.log(
                          "error laoding image",
                          err.currentTarget.src
                        );
                        setImageErrors((prev: any) => ({
                          ...prev,
                          [`${selectedDepartment}-${item.itemDescription}`]:
                            true,
                        }));
                      }}
                    />
                  ) : (
                    <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-red-500" />
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base leading-tight px-1">
                  {selectedDepartment.toLowerCase() === "shoes and accessories"
                    ? item.itemDescription
                    : item.itemDescription.replace(
                        /^(Men's |Women's |Unisex |Infant)/,
                        ""
                      )}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {departmentItems.length === 0 && (
          <div className="text-center py-12 text-white">
            <Shirt className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mx-auto mb-4 opacity-60" />
            <p className="text-sm sm:text-base lg:text-lg">
              No items found in this department
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
