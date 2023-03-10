import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store'
import { Loader } from 'components/Loader'
import { FC } from 'react'

interface RoleRouteProps {
  roles: string[]
}
export const RoleRoute: FC<RoleRouteProps> = ({ roles = [] }) => {
  const user = useSelector(selectCurrentUser)
  if (!user) {
    return <Loader />
  }

  if (!roles.some((role) => !!user.roles.find(({ name }) => name === role))) {
    return <div>У вас нету прав</div>
  }

  return <Outlet />
}
