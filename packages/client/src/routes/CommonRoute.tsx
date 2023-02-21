import { Navigate, Outlet } from 'react-router-dom'
import React, { useEffect } from 'react'
// import { Navbar } from 'modules/common/components'
// import { isAxiosErrorError, useGetMeQuery } from 'api'
import { useAppDispatch } from 'store'
import { appActions } from 'store/appSlice'

export const CommonRoute: React.FC = () => {
  // const { data, error, isSuccess } = useGetMeQuery()
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     dispatch(appActions.setCurrentUser(data))
  //   }
  // }, [data, dispatch, isSuccess])

  // if (error) {
  //   if (isAxiosErrorError(error) && error?.response?.status === 403) {
  //     window.localStorage.removeItem('USER_TOKEN')
  //   }
  //   return <Navigate replace to="/login" />
  // }

  return <Outlet />
}
