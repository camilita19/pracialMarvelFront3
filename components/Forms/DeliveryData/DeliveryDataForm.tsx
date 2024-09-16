import { Box, Typography, Button } from '@mui/material'
import { DirectionDataSchema } from '../schema.form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import ControlledInput from '../FormInput'
import { ErrorMessage } from '@hookform/error-message'

export interface DeliveryDataProps {
  handleNext: () => void;
  handleBack: () => void;
  setFormData: (data: any) => void;
  formData: any;
}

export const DeliveryDataForm: React.FC<DeliveryDataProps> = ({
  handleNext,
  handleBack,
  formData,
  setFormData,
}: DeliveryDataProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ...formData,
    },
    resolver: yupResolver(DirectionDataSchema),
  })

  const onSubmit = async (data: any): Promise<void> => {
    setFormData({
      ...formData,
      direccion: data.direccion,
      departamento: data.departamento,
      ciudad: data.ciudad,
      provincia: data.provincia,
      codigopostal: data.codigopostal,
    })
    console.log('Formulario direccion:', data)
    handleNext()
  }

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    handleSubmit(onSubmit)().catch((error) => {
      console.error('Error en el envío del formulario:', error)
    })
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <form onSubmit={handleFormSubmit}>
        <ControlledInput
          required
          label="Dirección"
          control={control}
          name="direccion"
          error={Boolean(errors.direccion)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="direccion" errors={errors} />
        </Typography>
        <ControlledInput label="Departamento, piso, etc. (opcional)" control={control} name="departamento" />
        <ControlledInput required label="Ciudad" control={control} name="ciudad" error={Boolean(errors.ciudad)} />
        <Typography variant="caption" color="error">
          <ErrorMessage name="ciudad" errors={errors} />
        </Typography>
        <ControlledInput
          required
          label="Provincia"
          control={control}
          name="provincia"
          error={Boolean(errors.provincia)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="provincia" errors={errors} />
        </Typography>
        <ControlledInput
          required
          label="Código postal"
          control={control}
          name="codigopostal"
          error={Boolean(errors.codigopostal)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="codigopostal" errors={errors} />
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={handleBack} sx={{ marginRight: '10px', backgroundColor: '#ED1D24' ,'&:hover': {backgroundColor:'#C41C1C'}}}>
            Regresar
          </Button>
          <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#ED1D24' ,'&:hover': {backgroundColor:'#C41C1C'}}}>
            Continuar
          </Button>
        </Box>
      </form>
    </Box>
  )
}
