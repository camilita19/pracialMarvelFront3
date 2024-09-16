import { Button, Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PersonalDataSchema } from '../schema.form'
import { ErrorMessage } from '@hookform/error-message'
import ControlledInput from '../FormInput'
import React, { type FC } from 'react'

export interface PersonalDataFormProps {
  handleNext: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
}

const PersonalDataForm: FC<PersonalDataFormProps> = ({ handleNext, setFormData, formData }: PersonalDataFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    defaultValues: {
      ...formData,
    },
    resolver: yupResolver(PersonalDataSchema),
  })

  const onSubmit = (data: any): void => {
    setFormData({ ...formData, nombre: data.nombre, apellido: data.apellido, email: data.email })
    console.log('Formulario datos personales:', data)
    handleNext()
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    void handleSubmit(onSubmit)(event)
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <form onSubmit={handleFormSubmit}>
        <ControlledInput
          required
          label="Nombre"
          control={control}
          name="nombre"
          type="text"
          error={Boolean(errors.nombre)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="nombre" errors={errors} />
        </Typography>
        <ControlledInput required label="Apellido" control={control} name="apellido" error={Boolean(errors.apellido)} />
        <Typography variant="caption" color="error">
          <ErrorMessage name="apellido" errors={errors} />
        </Typography>
        <ControlledInput required label="Email" control={control} name="email" error={Boolean(errors.email)} />
        <Typography variant="caption" color="error">
          <ErrorMessage name="email" errors={errors} />
        </Typography>
        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#ED1D24' ,'&:hover': {backgroundColor:'#C41C1C'}}}>
          Continuar
        </Button>
      </form>
    </Box>
  )
}

export default PersonalDataForm

