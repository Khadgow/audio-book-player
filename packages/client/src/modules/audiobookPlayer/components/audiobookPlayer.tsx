import { Box, Grid } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'

export const AudiobookPlayer = () => {
  return (
    <Grid
      container
      sx={{
        position: 'fixed',
        top: '90vh',
        width: '100vw',
        height: '10vh',
        zIndex: 1500,
        color: 'white',
      }}
      bgcolor="primary.main"
      alignItems="center"
    >
      <Grid item container xs={2}>
        <img
          alt="Book"
          src="https://firebasestorage.googleapis.com/v0/b/gkst-bdae3.appspot.com/o/HK.png?alt=media&token=0c5b8228-47bd-4b50-b742-82ec6d0e20d6"
          style={{
            margin: '5px',
            width: '80px',
            height: '80px',
          }}
        />
        <Box>
          <div>Book name</div>
          <div>Author</div>
          <div>Voice actor</div>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Stack alignItems="center">
          <PlayArrowIcon />
          <Slider aria-label="Volume" color="secondary" />
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" color="secondary" />
          <VolumeUp />
        </Stack>
      </Grid>
    </Grid>
  )
}
