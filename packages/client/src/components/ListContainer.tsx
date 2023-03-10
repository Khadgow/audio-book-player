import React, { FC } from 'react'
import { Box, Button, Grid } from '@mui/material'

import { Author, Book } from '../modules/books'
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { BasicItem } from './BasicItem'
import { BookItem } from '../modules/books/components/BookItem'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

interface ListContainerProps {
  data: Author[] | Book[]
  creationRoute: string
  itemRoute: string
  isBooks?: boolean
}

export const ListContainer: FC<ListContainerProps> = ({
  data,
  creationRoute,
  itemRoute,
  isBooks,
}) => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid item={true} xs={2} sm={4} md={4} key={index}>
              <Item>
                {!isBooks ? (
                  <BasicItem {...item} itemRoute={itemRoute} />
                ) : (
                  <BookItem {...item} />
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ marginTop: '10px' }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate(creationRoute)
          }}
        >
          Создать
        </Button>
      </div>
    </>
  )
}
