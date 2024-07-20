import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from '../service/axios';

export const useCatStore = create((set, get) => ({
    category: [],
    isLoading: true,
    fetchCategory: async () => {
        try {
            if (localStorage.getItem('token')) {
                const response = await axios.get('/get/cat');
                console.log('Fetched categories:', response.data);
                set({ category: response.data, isLoading: false });
                console.log('Updated category state:', get().category); // Correct way to log updated state
            } else {
                set({ category: [], isLoading: false });
            }
        } catch (e) {
            set({ category: [], isLoading: false });
            toast.error(e.message);
        }
    },
    addCategory: async (name) => {
        try {
          const response = await axios.post('/create/cat', { name });
          set((state) => ({
            category: [...state.category, response.data],
          }));
          toast.success('Category Added Successfully');
        } catch (e) {
          toast.error(e.response?.data?.msg || e.message);
        }
    }
}));
