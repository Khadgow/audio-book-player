import { Navigate, Outlet } from 'react-router-dom'
import React, { useEffect } from 'react'
// import { useGetMeQuery } from 'api'
import { useAppDispatch } from 'store'
import { appActions } from 'store/appSlice'

export const AuthRoute: React.FC = () => {
  // const { data, isSuccess } = useGetMeQuery()
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     dispatch(appActions.setCurrentUser(data))
  //   }
  // }, [data, dispatch, isSuccess])
  //
  // if (isSuccess) {
  //   return <Navigate replace to="/store" />
  // }

  return <Outlet />
}
