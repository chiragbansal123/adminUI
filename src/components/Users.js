import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Userlist from './Userlist';
function Users({ users, loading,onDelete,updateUser,onSubmit,edit,deleteAll,deleteSelected,setDeletedSelected}) {
  const [name, setName] = useState(edit ? edit.value.name : "");
  const [email, setEmail] = useState(edit ? edit.value.email : "");
  const [role, setRole] = useState(edit ? edit.value.role : "");
  const [isEdit,setIsEdit]=useState(false);
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeRole= (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: edit.value.id,
      value: {
        name: name === "" ? edit.value.name : name,
        email: email === "" ? edit.value.name : email,
        role: role === "" ? edit.value.name : role,
      },
    });
    setName("");
    setEmail("");
    setRole("");
  };
  if (loading) {
    return <h2>Loading ...</h2>
  }
  
  return (
    <ul className='list-group mb-4 text-center'>
      {edit ? (
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    placeholder="Update user name"
                    value={name}
                    onChange={changeName}
                    name="name"
                  />
                </td>
                <td>
                  <input
                    placeholder="Update user email"
                    value={email}
                    onChange={changeEmail}
                    name="email"
                  />
                </td>
                <td>
                  <input
                    placeholder="Update role"
                    value={role}
                    onChange={changeRole}
                    name="text"
                  />
                </td>
                <td>
                  <button onClick={handleSubmit} className="user-button edit">
                    Update User
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table>
            <tbody>
              {!isEdit && <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>}
              <Userlist
                users={users}
                onSelectdelete={onDelete}
                updateUser={updateUser}
                deleteAll={deleteAll}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                deleteSelected={deleteSelected}
                setDeletedSelected={setDeletedSelected}
              />
              {!isEdit && <button
                type="button"
                onClick={deleteAll}
                className="btn btn-danger"
              >
                Delete Selected
              </button>}
            </tbody>
          </table>
        )}
      </ul>
      )
  }

export default Users;