/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import LayoutCheckout from '../../components/layouts/layout-checkout'
import { type NextPage, type GetServerSideProps } from 'next'
import { getComic } from '../../services/marvel/marvel.service'
import BodySingle from '../../components/layouts/body/single/body-single'
import PersonalDataForm from '../../components/Forms/PersonalData/PersonalDataForm'
import { type PersonalDataFormValues } from '../../components/Forms/schema.form'
import { DeliveryDataForm } from '../../components/Forms/DeliveryData/DeliveryDataForm'
import { PaymentDataForm } from '../../components/Forms/PaymentData/PaymentDataForm'
import { type FormData } from '../../types/form.types'
import { useRouter } from 'next/router'

interface CheckoutProps {
  comic: {
    title: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    price: number;
    stock: number;
  };
}

const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago']

const StepperFormulario: NextPage<CheckoutProps> = ({ comic }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PersonalDataFormValues>({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    departamento: '',
    ciudad: '',
    provincia: '',
    codigopostal: '',
    numerotarjeta: '',
    nombretarjeta: '',
    fechaexpiracion: '',
    cv: '',
  })
  const router = useRouter()

  const handleNext = (): void => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = (): void => {
    setActiveStep((prev) => prev - 1)
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    const sentFormData = {
      customer: {
        name: formData.nombre,
        lastname: formData.apellido,
        email: formData.email,
        address: {
          address1: formData.direccion,
          address2: formData.departamento,
          city: formData.ciudad,
          state: formData.provincia,
          zipCode: formData.codigopostal,
        },
      },
      card: {
        number: data.numerotarjeta,
        cvc: data.cv,
        expDate: data.fechaexpiracion,
        nameOnCard: data.nombretarjeta,
      },
      order: {
        name: comic.title,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        price: comic.price,
      },
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sentFormData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

      const responseData = await response.json()
      localStorage.setItem('purchase-data', JSON.stringify(responseData))
      await router.push('/confirmacion-compra')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido')
    }
  }

  return (
    <LayoutCheckout>
      <BodySingle title="Checkout">
        <Card
          sx={{
            display: 'flex',
            marginTop: '20px',
            boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
            borderRadius: '12px',
         
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', borderRight: '1px solid grey', alignItems: 'center' }}>
              <Box mr={2} sx={{ minWidth: '35%', maxWidth: '35%', flexShrink: 0 }}>
                <CardMedia
                  component="img"
                  image={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                  alt={comic?.title || ''}
                  sx={{
                    borderRadius: '12px',
                    height: 350,
                    objectFit: 'cover',
                    
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {comic && (
                  <>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                      {comic.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'grey.700', marginTop: '10px' }}>
                      Total
                    </Typography>
                    <Typography variant="h4">${comic.price}</Typography>
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                flexDirection: 'column',
                marginBottom: '10px',
                
              }}
            >
              {comic && comic.stock === 0 && (
                <Typography variant="h6" color="error">
                  No tenemos stock disponible
                </Typography>
              )}
              {comic && comic.stock !== 0 && (
                <>
                  <Stepper activeStep={activeStep} sx={{ '& .MuiStepIcon-root.Mui-active': { color: '#ED1D24' },  '& .MuiStepIcon-root.Mui-completed': { color: 'black' },}}  >

                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel >{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === 0 && (
                    <PersonalDataForm formData={formData} setFormData={setFormData} handleNext={handleNext} />
                  )}
                  {activeStep === 1 && (
                    <DeliveryDataForm
                      formData={formData}
                      setFormData={setFormData}
                      handleBack={handleBack}
                      handleNext={handleNext}
                    />
                  )}
                  {activeStep === 2 && (
                    <PaymentDataForm formData={formData} handleBack={handleBack} onSubmit={onSubmit} />
                  )}
                  {error && (
                    <Snackbar
                      open
                      autoHideDuration={6000}
                      onClose={() => {
                        setError(null)
                      }}
                    >
                      <Alert severity="error">{error}</Alert>
                    </Snackbar>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </BodySingle>
    </LayoutCheckout>
  )
}

export default StepperFormulario

export const getServerSideProps: GetServerSideProps = async (context) => {

 const { id } = context.params || {}
 const comic = await getComic(id as string)

  return {
    props: {
      comic,
    },
  }
}


