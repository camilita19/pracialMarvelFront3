import { Box, IconButton, TextField, type TextFieldProps } from '@mui/material'
import { useController, type Control, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { type FC } from 'react'

export type Props = {
  control: Control<FieldValues>
  name: string
  rules?: Partial<UseControllerProps<FieldValues, string>['rules']>
} & TextFieldProps;

const ControlledInput: FC<Props> = ({ control, name, rules, ...props }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  const { field } = useController({
    name,
    control,
    rules
  })

  return (
    <Box
      sx={{
        position: 'relative',
        paddingY: '5px'
      }}
    >
      <TextField
        style={{ width: '100%', margin: '5px' }}
        {...field}
        {...props}
        type={name === 'codigodeseguridad' && !showPassword ? 'password' : 'text'}
      />

      {name === 'codigodeseguridad' && (
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
          sx={{
            position: 'absolute',
            right: '10px',
            top: '17px'
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
    </Box>
  )
}

export default ControlledInput
