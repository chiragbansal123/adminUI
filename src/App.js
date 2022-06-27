import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';
import Users from './components/Users';
function App() {
  const [users,setUsers]=useState([]);
  const [userPerPage]=useState(10);
  const [currentPage,setCurrentPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const [deleteSelected,setDeletedSelected]=useState([]);

  useEffect(()=>{
    const fetchUsers=async()=>{
      setLoading(true);
      const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      setUsers(res.data);
      setLoading(false);
    }
    fetchUsers();
  },[])

  useEffect(()=>{
    console.log("rerendering again");
  },[users])

  //get currentPage
  const indexOfLastUser=currentPage*userPerPage;
  const indexOfFirstUser=indexOfLastUser-userPerPage;
  const currentUser=users.slice(indexOfFirstUser,indexOfLastUser);

  //Change Page
  const paginate=(pageNumber)=>{if (currentPage !== 1 && pageNumber === -1) setCurrentPage(currentPage - 1);
  else if (pageNumber === -1) setCurrentPage(currentPage);
  else if (currentPage !== 5 && pageNumber === 6)
    setCurrentPage(currentPage + 1);
  else if (pageNumber === 6) setCurrentPage(currentPage);
  else setCurrentPage(pageNumber);
  }
  //find the searchInput

  const searchInput=(searchItem)=>{
    console.log(searchItem);
    let searchResult = users.filter(
      (user) =>
        user.name.includes(searchItem) ||
        user.email.includes(searchItem) ||
        user.role.includes(searchItem)
    );
    setUsers(searchResult)
  }

  const deleteItem =(id)=>{
    let removedDeletedUsers = users.filter((user) => user.id !== id);
    setUsers(removedDeletedUsers);
  }
  const updateUser = (id, input) => {
    users.map((user) => {
      if (id === user.id) {
        user.name = input.name;
        user.email = input.email;
        user.role = input.role;
      }
    });
  };
  const deleteAll =()=>{
    console.log("<<<<>>>",deleteSelected);
    const usersToBeDeleted = new Set(deleteSelected);
    const newArr = users.filter((user) => {
      return !usersToBeDeleted.has(user.id);
    });
    setDeletedSelected([]);
    setUsers(newArr);    
  }
  return(
    <div className='App text-center'>
      <h2 className='text-center'>Admin UI</h2>
      <div className='d-flex justify-content-center'  >
      <input type="search" placeholder="Search" style={{width:"50%"}} onChange={(e) => searchInput(e.target.value)}/>
      </div>
      <Users users={currentUser} loading={loading} onDelete={deleteItem} updateUser={updateUser} deleteAll={deleteAll} deleteSelected={deleteSelected} setDeletedSelected={setDeletedSelected}/>
      <Pagination userPerPage={userPerPage} totalUsers={users.length} paginate={paginate}/>
    </div>
  )
}

export default App;
