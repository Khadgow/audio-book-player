import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser, useAppDispatch } from 'store'
import { Loader } from 'components/Loader'
import { FC, useEffect } from 'react'
import { Navbar } from 'components/Navbar'
import { AudiobookPlayer } from 'modules/audiobookPlayer'
import { useGetMeQuery } from 'modules/auth'
import { appActions } from 'store/appSlice'
import { isAxiosErrorError } from 'utils/isAxiosError'

interface RoleRouteProps {
  roles: string[]
}
export const RoleRoute: FC<RoleRouteProps> = ({ roles = [] }) => {
  const { data, error, isSuccess, isLoading } = useGetMeQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(appActions.setCurrentUser(data))
    }
  }, [data, dispatch, isSuccess])

  if (isLoading) {
    return <Loader />
  }

  if (
    !data ||
    !roles.some((role) => !!data.roles.find(({ name }) => name === role)) ||
    error
  ) {
    return <div>У вас нету прав</div>
  }

  return (
    <>
      <Navbar>
        <Outlet />
      </Navbar>
      <AudiobookPlayer />
    </>
  )
}
