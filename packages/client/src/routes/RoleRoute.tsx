import { Outlet } from 'react-router-dom'
import React from 'react'
// import { Loader } from 'modules/common/components'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store'

interface RoleRouteProps {
  roles: string[]
}
export const RoleRoute: React.FC<RoleRouteProps> = ({ roles = [] }) => {
  // const user = useSelector(selectCurrentUser)
  // if (!user) {
  //   return <Loader />
  // }
  //
  // if (!roles.some((role) => !!user.roles.find(({ name }) => name === role))) {
  //   return <div>У вас нету прав</div>
  // }

  return <Outlet />
}
