import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setEditingUser, searchUser, setCurrentPage } from "../Redux/userSlice";

function UserTable() {
  const users = useSelector((state) => state.users.users);
  const searchQuery = useSelector((state) => state.users.searchQuery);
  const currentPage = useSelector((state) => state.users.currentPage);
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage);

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
    user.nom?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

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
          {currentItems.map((user) => (
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button 
          className="btn btn-secondary" 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages === 0 ? 1 : totalPages}</span>
        <button 
          className="btn btn-secondary" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default UserTable;
