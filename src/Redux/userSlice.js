import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    users: [],
    editingUser: null,
    searchQuery: ""
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { nom, email } = action.payload;
            const newUser = {
                id: state.users.length + 1,
                nom,
                email,
            };
            state.users.push(newUser)
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            )
        },
        updateUser: (state, action) => {
            const { id, nom, email } = action.payload;
            const user = state.users.find(u => u.id === id);
            if (user) {
                user.nom = nom;
                user.email = email
            } else {
                console.log("User not found for update:", id);
            }
        },
        setEditingUser: (state, action) => {
            state.editingUser = action.payload
        },
        searchUser: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
})

export const { addUser, removeUser, updateUser, setEditingUser, searchUser } = userSlice.actions;
export default userSlice.reducer;