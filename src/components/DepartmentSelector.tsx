import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryStore } from "../stores/inventoryStore";
import { useAuthStore } from "../stores/authStore";
import { Package, RefreshCw, LogOut } from "lucide-react";

export const DepartmentSelector: React.FC = () => {
  const navigate = useNavigate();
  const {
    departments,
    isLoading,
    error,
    fetchInventoryData,
    setSelectedDepartment,
  } = useInventoryStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    navigate("/items");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-sm sm:text-base lg:text-lg">
            Loading departments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base lg:text-lg">
            {error}
          </p>
          <button
            onClick={fetchInventoryData}
            className="bg-[#0C76D0] hover:bg-blue-700 text-white font-medium py-2 px-4 lg:py-3 lg:px-6 rounded-lg transition-colors text-sm sm:text-base lg:text-lg w-full sm:w-auto"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 p-3 sm:p-6 lg:p-8">
      {/* Navigation Header */}
      <div className="bg-white rounded-lg shadow-lg mb-2 sm:mb-3 lg:mb-4 overflow-hidden py-2 px-4">
        {/* above */}
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="bg-[#0C76D0] text-white px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Choose Department
          </div>
          <div className="bg-[#939393] text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Item Description
          </div>
          <div className="bg-[#939393] text-gray-700 px-6 py-1 lg:px-8 lg:py-2 font-medium text-sm lg:text-lg">
            Tag
          </div>
          <div className="flex-1"></div>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-1 lg:px-8 lg:py-2 font-medium transition-colors flex items-center gap-2 text-sm lg:text-lg rounded"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Current Step Indicator */}
          <div className="bg-[#0C76D0] text-white px-4 py-3 text-center font-medium text-sm">
            Step 1: Choose Department
          </div>

          {/* Progress Steps */}
          <div className="flex bg-gray-100">
            <div className="flex-1 bg-[#0C76D0] text-white text-center py-2 text-xs font-medium">
              Department
            </div>
            <div className="flex-1 bg-[#939393] text-gray-600 text-center py-2 text-xs font-medium">
              Item Description
            </div>
            <div className="flex-1 bg-[#939393] text-gray-600 text-center py-2 text-xs font-medium">
              Tag
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-gray-50 px-4 py-3 border-t">
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ml-auto text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Department Grid */}
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {departments.map((department) => (
            <button
              key={department}
              onClick={() => handleDepartmentSelect(department)}
              className="bg-[#EBF5FF] hover:bg-[#FFFFFF] border-4 border-[#004787] hover:border-[#0C76D0] rounded-lg p-3 sm:p-4 lg:p-6 transition-all duration-200 hover:shadow-lg group min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col items-center justify-center text-center touch-manipulation"
            >
              <div className="mb-2 sm:mb-3 lg:mb-4">
                <img
                  src={`/images/departments/${department
                    .toLowerCase()
                    .replace(/[^a-z]/g, "")}.png`}
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                  alt={department}
                />
              </div>
              <h3 className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base leading-tight px-1">
                {department}
              </h3>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {departments.length === 0 && (
          <div className="text-center py-12 text-white">
            <Package className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mx-auto mb-4 opacity-60" />
            <p className="text-sm sm:text-base lg:text-lg">
              No departments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
