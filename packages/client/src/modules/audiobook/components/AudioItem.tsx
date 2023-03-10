import { ChangeEvent, forwardRef } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import { Input } from '@mui/material'

interface AudioItemProps {
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

export const AudioItem = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { name, onChange, onDelete, ...rest } = props
  return (
    <div
      ref={ref}
      {...rest}
      style={{
        display: 'flex',
        height: '56px',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...rest.style,
      }}
    >
      <Input value={name} onChange={onChange}></Input>
      <div>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
})
AudioItem.displayName = 'AudioItem'
