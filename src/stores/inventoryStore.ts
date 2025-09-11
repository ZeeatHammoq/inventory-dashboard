import { create } from 'zustand';
import type { InventoryState, InventoryItem, ApiResponse } from '../types';

export const useInventoryStore = create<InventoryState>((set,) => ({
    items: [],
    departments: [],
    selectedDepartment: null,
    selectedItem: null,
    isLoading: false,
    error: null,

    fetchInventoryData: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch('https://ai-lite-api.hammoq.com/v1/api/inventory-data');

            if (!response.ok) {
                throw new Error('Failed to fetch inventory data');
            }

            const data: ApiResponse = await response.json();

            // Parse the data (skip header row)
            const items: InventoryItem[] = data.data.values.slice(1).map(row => ({
                department: row[0],
                itemDescription: row[1],
                currentPrice: row[2],
                avgDaysToSell: row[3]
            }));

            // Extract unique departments
            const departments = [...new Set(items.map(item => item.department))];

            set({
                items,
                departments,
                isLoading: false
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch data',
                isLoading: false
            });
        }
    },

    setSelectedDepartment: (department: string) => {
        set({ selectedDepartment: department, selectedItem: null });
    },

    setSelectedItem: (item: InventoryItem) => {
        set({ selectedItem: item });
    },

    reset: () => {
        set({
            selectedDepartment: null,
            selectedItem: null,
            error: null
        });
    }
}));