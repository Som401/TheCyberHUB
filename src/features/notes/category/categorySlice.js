import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    categories: [
        {
            name: "Pinned Notes",
            required: true,
            _id: nanoid(),
        },
        {
            name: "Other Notes",
            required: true,
            _id: nanoid(),
        },
    ],
};

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        createCategory: {
            reducer: (state, action) => {
                console.log(action.payload);
                const categoryNameExists = state.categories.find((category) => category.name === action.payload.name);
                if (categoryNameExists) {
                    toast.error("This Category Name Already Exists, Change the Name And Try Again.");
                    return;
                }
                state.categories = [...state.categories, action.payload];
            },
            prepare: (categoryName) => {
                const id = nanoid();
                return { payload: { name: categoryName, _id: id } };
            },
        },
        removeCategory: (state, action) => {
            if (action.payload.required) {
                toast.error("It is not possible to remove required category.");
                return;
            }
            state.categories = state.categories.filter((category) => category._id !== action.payload);
        },
        editCategory: (state, action) => {
            const editedCategory = action.payload;
            console.log(editedCategory);
            if (editedCategory.required) {
                toast.error("It is not possible to edit required category.");
                return;
            }
            const categoryNameExists = state.categories.find((category) => category.name === action.payload.name);
            const prevCategory = state.categories.find((category) => category._id === action.payload._id);
            if (categoryNameExists && prevCategory.name !== editedCategory.name) {
                toast.error("This Category Name Already Exists, Change the Name And Try Again.");
                return;
            }
            const indexOfEditedCategory = state.categories.findIndex((category) => category._id === editedCategory._id);
            if (indexOfEditedCategory < 0) state.categories = [...state.categories, editedCategory];
            state.categories[indexOfEditedCategory] = { ...state.categories[indexOfEditedCategory], ...editedCategory };
        },
    },
});

export const { createCategory, removeCategory, editCategory } = categorySlice.actions;
export default categorySlice.reducer;
