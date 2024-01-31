import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'


function AdminPrivate() {
  const {adminInfo} = useSelector((state)=>state.adminAuth)
  return  adminInfo?<Outlet/>:<Navigate to='admin/login' replace/>
}

export default AdminPrivate







