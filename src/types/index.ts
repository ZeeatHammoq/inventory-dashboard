export interface InventoryItem {
    department: string;
    itemDescription: string;
    currentPrice: string;
    avgDaysToSell: string;
}

export interface ApiResponse {
    data: {
        range: string;
        majorDimension: string;
        values: string[][];
    };
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface InventoryState {
    items: InventoryItem[];
    departments: string[];
    selectedDepartment: string | null;
    selectedItem: InventoryItem | null;
    isLoading: boolean;
    error: string | null;
    fetchInventoryData: () => Promise<void>;
    setSelectedDepartment: (department: string) => void;
    setSelectedItem: (item: InventoryItem) => void;
    reset: () => void;
}