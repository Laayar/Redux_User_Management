import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setEditingUser, searchUser } from "../Redux/userSlice";

function UserTable() {
  const users = useSelector((state) => state.users.users);
  const searchQuery = useSelector((state) => state.users.searchQuery);

  const dispatch = useDispatch();

  const handleRemoveUser = (id) => {
    console.log("handleRemoveUser clicked with ID:", id);
    dispatch(removeUser(id));
  };

  const handleUpdateUser = (user) => {
    console.log("handleUpdateUser clicked with user:", user);
    dispatch(setEditingUser(user));
  };

  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Utilisateurs</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nom Complet</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleRemoveUser(user.id)} className="btn btn-danger btn-sm">Supprimer</button>
                <button onClick={() => handleUpdateUser(user)} className="btn btn-success btn-sm ms-2">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
