import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from '../../pages/Login'

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user)

  if (!userToken) {
    return (
      <Login />
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute;