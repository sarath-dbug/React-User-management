import { Outlet,useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import AdminHeader from './components/adminComponets/AdminHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div>
      { isAdminPage ? <AdminHeader/> : <Header/> }
      <ToastContainer />
     <Container className='my2'>
      <Outlet />
     </Container>
    </div>
  )
}

export default App
