import { useGetHistoryQuery } from 'modules/history/api'
import { Loader } from 'components/Loader'
import { HistoryItem } from 'modules/history/components/HistoryItem'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

export const HistoryList = () => {
  const user = useSelector(selectCurrentUser)

  const { data, isFetching } = useGetHistoryQuery(undefined, { skip: !user })

  if (!user) {
    return <Link to="/login">Войдите чтобы сохранять историю</Link>
  }

  if (isFetching) {
    return <Loader />
  }

  if (!data) {
    return 'Нету данных'
  }

  return (
    <Box>
      <h2>История</h2>
      {data.map((history) => (
        <HistoryItem key={history.id} history={history} />
      ))}
    </Box>
  )
}
