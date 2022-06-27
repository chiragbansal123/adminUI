import React,{useState} from 'react'
import Users from './Users';

let changeBackground = [];
function Userlist({users,onSelectdelete,arr,updateUser,isEdit,setIsEdit,deleteSelected,setDeletedSelected}) {
    const [edit, setEdit] = useState({
        id: null,
        value: {
          name: "",
          email: "",
          role: "",
        },
      });
      // update function
      const submitUpdate = (value) => {
       
        updateUser(edit.id, value.value);
        setEdit({
          id: null,
          value: {},
        });
        setIsEdit(false);
      };
      const addBg = (id) => {

        setDeletedSelected([...deleteSelected,id]);
        console.log(deleteSelected)

        document.getElementById(`checkbox${id}`).style.backgroundColor =
          "#dc3545";
        changeBackground.push(id);
      };
      const removeBg = (id) => {

        let arr=[...deleteSelected];
        arr=arr.filter((array)=>array!==id);

        console.log('///', arr);

        setDeletedSelected([...arr]);

        document.getElementById(`checkbox${id}`).style.backgroundColor =
          "white";
        changeBackground = changeBackground.filter((e) => e !== id);
      };

      if (edit.id) {
        return <Users edit={edit} onSubmit={submitUpdate} />;
      }
    return users.map((user) => (
        <tr key={user.id} id={`checkbox${user.id}`}>
          <td>
            <input
              type="checkbox"
              onChange={() => {
                changeBackground.includes(user.id)
                  ? removeBg(user.id)
                  : addBg(user.id);
              }}
              name="checkbox"
            />
          </td>
          
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <img
              height="30rem"
              width="35rem"
              alt="edit"
              onClick={() =>
                {setEdit({
                  id: user.id,
                  value: { name: user.name, email: user.email, role: user.role },
                })
                setIsEdit(true)}
              }
              src="https://img.icons8.com/external-becris-lineal-becris/344/external-edit-mintab-for-ios-becris-lineal-becris.png"
            />{" "}
            &nbsp;&nbsp;
            <img
              onClick={() => onSelectdelete(user.id)}
              alt="delete"
              height="35rem"
              width="40rem"
              src="https://img.icons8.com/plasticine/100/undefined/filled-trash.png"
            />{" "}
          </td>
        </tr>
      ));
    }

export default Userlist