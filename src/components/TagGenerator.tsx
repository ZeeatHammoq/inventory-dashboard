import React from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryStore } from "../stores/inventoryStore";
import { useAuthStore } from "../stores/authStore";
import { ArrowLeft, LogOut } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export const TagGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { selectedItem, selectedDepartment, reset } = useInventoryStore();
  const { logout } = useAuthStore();

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
    // Create a new window for printing only the tag
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
              background-color: #f3f4f6;
              padding: 16px;
              border-bottom: 1px solid #d1d5db;
            }
            .tag-title {
              font-size: 18px;
              font-weight: bold;
              color: #111827;
              margin: 0;
              text-align: center;
            }
            .tag-details {
              padding: 16px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1px dotted #d1d5db;
            }
            .detail-row:last-child {
              margin-bottom: 0;
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #374151;
            }
            .detail-value {
              font-weight: bold;
              font-size: 16px;
            }
            .price { color: #059669; }
            .days { color: #ea580c; }
            .revenue { color: #2563eb; }
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

      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  if (!selectedItem || !selectedDepartment) {
    navigate("/departments");
    return null;
  }

  // Calculate per day revenue
  const price = parseFloat(selectedItem.currentPrice);
  const daysToSell = parseFloat(selectedItem.avgDaysToSell);
  const perDayRevenue = (price / daysToSell).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 p-3 sm:p-6 lg:p-8">
      {/* Navigation Header */}
      <div className="bg-white rounded-lg shadow-lg mb-4 sm:mb-6 lg:mb-8 overflow-hidden py-2 px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleDepartmentBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg"
          >
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            Department
          </button>
          <button
            onClick={handleItemBack}
            className="bg-[#939393] hover:bg-gray-400 text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium transition-colors text-sm lg:text-lg"
          >
            Item Description
          </button>
          <div className="bg-[#0C76D0] text-white px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
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

      {/* Breadcrumb */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <Breadcrumb
          departmentName={selectedDepartment}
          itemName={selectedItem.itemDescription}
        />
      </div>

      {/* Tag Card */}
      <div className="max-w-xl lg:max-w-4xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="bg-white rounded-lg shadow-lg flex overflow-hidden">
            {/* Left Side - Item Details */}
            <div className="flex-1 p-6 lg:p-8 bg-gray-50">
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
                {selectedDepartment} -{" "}
                {selectedItem.itemDescription.replace(
                  /^(Men's |Women's |Unisex )/,
                  ""
                )}
              </h2>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-base lg:text-lg xl:text-xl">
                    Price
                  </span>
                  <span className="text-green-600 font-bold text-lg lg:text-xl xl:text-2xl">
                    ${selectedItem.currentPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-base lg:text-lg xl:text-xl">
                    Average days to sell
                  </span>
                  <span className="text-orange-600 font-bold text-lg lg:text-xl xl:text-2xl">
                    {selectedItem.avgDaysToSell}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-base lg:text-lg xl:text-xl">
                    Per day revenue
                  </span>
                  <span className="text-blue-600 font-bold text-lg lg:text-xl xl:text-2xl">
                    ${perDayRevenue}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Print Button */}
            <div
              onClick={handlePrintTag}
              className="w-48 lg:w-64 bg-blue-100 hover:bg-blue-200 p-6 lg:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-inner active:bg-blue-300 group"
            >
              <div className="mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={`/images/print-icon.png`}
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                  alt={"Print"}
                />
              </div>
              <span className="text-blue-900 font-bold text-xl lg:text-2xl xl:text-3xl group-hover:text-blue-700 transition-colors duration-300 select-none text-center">
                Print Tag
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-4">
          {/* Item Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center leading-tight">
              {selectedDepartment} -{" "}
              {selectedItem.itemDescription.replace(
                /^(Men's |Women's |Unisex )/,
                ""
              )}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-sm">Price</span>
                <span className="text-green-600 font-bold text-lg">
                  ${selectedItem.currentPrice}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-sm">
                  Avg. days to sell
                </span>
                <span className="text-orange-600 font-bold text-lg">
                  {selectedItem.avgDaysToSell}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium text-sm">
                  Per day revenue
                </span>
                <span className="text-blue-600 font-bold text-lg">
                  ${perDayRevenue}
                </span>
              </div>
            </div>
          </div>

          {/* Print Button Card */}
          <button
            onClick={handlePrintTag}
            className="w-full bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 touch-manipulation"
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
      </div>

      {/* Hidden printable tag content */}
      <div id="printable-tag" style={{ display: "none" }}>
        <div className="tag-print">
          <div className="tag-header">
            <h2 className="tag-title">
              {selectedDepartment} -{" "}
              {selectedItem.itemDescription.replace(
                /^(Men's |Women's |Unisex )/,
                ""
              )}
            </h2>
          </div>
          <div className="tag-details">
            <div className="detail-row">
              <span className="detail-label">Price</span>
              <span className="detail-value price">
                ${selectedItem.currentPrice}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Average days to sell</span>
              <span className="detail-value days">
                {selectedItem.avgDaysToSell}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Per day revenue</span>
              <span className="detail-value revenue">${perDayRevenue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
