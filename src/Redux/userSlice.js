import { createSlice } from "@reduxjs/toolkit";

const loadUsersFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('users');
        if (serializedState === null) {
            return [];
        }
        const parsedState = JSON.parse(serializedState);
        return Array.isArray(parsedState) ? parsedState : [];
    } catch (err) {
        return [];
    }
};

const saveUsersToStorage = (users) => {
    try {
        const serializedState = JSON.stringify(users);
        localStorage.setItem('users', serializedState);
    } catch {
        // ignore write errors
    }
};

export const initialState = {
    users: loadUsersFromStorage(),
    editingUser: null,
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 5
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { nom, email } = action.payload;
            const newUser = {
                id: Date.now(),
                nom,
                email,
            };
            state.users.push(newUser);
            saveUsersToStorage(state.users);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
            saveUsersToStorage(state.users);
        },
        updateUser: (state, action) => {
            const { id, nom, email } = action.payload;
            const user = state.users.find(u => u.id === id);
            if (user) {
                user.nom = nom;
                user.email = email;
                saveUsersToStorage(state.users);
            } else {
                console.log("User not found for update:", id);
            }
        },
        setEditingUser: (state, action) => {
            state.editingUser = action.payload
        },
        searchUser: (state, action) => {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})

export const { addUser, removeUser, updateUser, setEditingUser, searchUser, setCurrentPage } = userSlice.actions;
export default userSlice.reducer;