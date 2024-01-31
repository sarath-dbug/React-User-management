import React, { useEffect, useState } from 'react'
import { useGetUserDataMutation } from '../../slices/adminApiSlice'
import { UsersTable } from '../../components/adminComponets/UsersTable'



function UserManagementScreen() {
  const [usersData, setUsersData] = useState([])
  const [refetch,setRefetch] = useState(false)

  const refetchData = ()=>{
    setRefetch(!refetch)
  }

  const [userDataFromApi, { isLoading }] = useGetUserDataMutation();


  useEffect(() => {
    
    try {

      const fetchData = async () => {
        const responseFromApiCall = await userDataFromApi();
        const usersArray = responseFromApiCall.data;
        setUsersData(usersArray);
      };
  
      fetchData();
    } catch (error) {
      toast.error(error);
      console.error("Error fetching users:", error);

    }

  }, [refetch]);
  return (
    <div>
      <UsersTable users={usersData} refetchData = {refetchData} />
    </div>
  )
}

export default UserManagementScreen







