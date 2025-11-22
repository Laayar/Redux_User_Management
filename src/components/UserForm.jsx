import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, setEditingUser, searchUser } from "../Redux/userSlice";

function UserForm() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  
  const dispatch = useDispatch();
  const editingUser = useSelector((state) => state.users.editingUser);

  useEffect(() => {
    if (editingUser) {
      setNom(editingUser.nom);
      setEmail(editingUser.email);
    } else {
      setNom("");
      setEmail("");
    }
  }, [editingUser]);

  const handleClick = () => {
    if (nom.trim().length < 3 || !email.includes("@")) {
      alert("Verifier!!!!");
      return;
    }
    
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, nom, email }));
      dispatch(setEditingUser(null));
    } else {
      dispatch(addUser({ nom, email }));
    }

    setNom("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom complet"
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleClick}>
            {editingUser ? "Update" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
