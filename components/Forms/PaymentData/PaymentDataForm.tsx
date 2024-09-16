
import * as React from 'react'
import { Box, Typography, Button } from '@mui/material'
import ControlledInput from '../FormInput'
import { useForm } from 'react-hook-form'
import { PaymentDataSchema } from '../schema.form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'

export interface PaymentDataProps {
  handleBack: () => void;
  onSubmit: (data: any) => Promise<void>;
  formData: any;
}

export const PaymentDataForm: React.FC<PaymentDataProps> = ({ handleBack, onSubmit, formData }: PaymentDataProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ...formData,
    },
    resolver: yupResolver(PaymentDataSchema),
  })

  const onSubmitHandler = async (data: any): Promise<void> => {
    await onSubmit(data)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      await handleSubmit(onSubmitHandler)()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <form onSubmit={handleFormSubmit}>
        <ControlledInput
          required
          label="Número de tarjeta"
          control={control}
          name="numerotarjeta"
          error={Boolean(errors.numerotarjeta)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="numerotarjeta" errors={errors} />
        </Typography>
        <ControlledInput
          required
          label="Nombre como aparece en la tarjeta"
          control={control}
          name="nombretarjeta"
          error={Boolean(errors.nombretarjeta)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="nombretarjeta" errors={errors} />
        </Typography>
        <ControlledInput
          required
          label="Fecha de expiración"
          control={control}
          name="fechaexpiracion"
          error={Boolean(errors.fechaexpiracion)}
        />
        <Typography variant="caption" color="error">
          <ErrorMessage name="fechaexpiracion" errors={errors} />
        </Typography>
        <ControlledInput required label="Código de seguridad" control={control} name="cv" error={Boolean(errors.cv)} />
        <Typography variant="caption" color="error">
          <ErrorMessage name="cv" errors={errors} />
        </Typography>

        <Button variant="contained" onClick={handleBack} sx={{ marginRight: '10px', backgroundColor: '#ED1D24' ,'&:hover': {backgroundColor:'#C41C1C'}}}>
          Regresar
        </Button>
        <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#ED1D24' ,'&:hover': {backgroundColor:'#C41C1C'}}}>
          Finalizar Compra
        </Button>
      </form>
    </Box>
  )
}



