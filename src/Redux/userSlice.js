import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    users: [],
    editingUser: null
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
            }
        },
        setEditingUser: (state, action) => {
            state.editingUser = action.payload
        }
    }
})

export const { addUser, removeUser, updateUser, setEditingUser } = userSlice.actions;
export default userSlice.reducer;