import * as yup from 'yup'

export interface PersonalDataFormValues {
  nombre: string
  apellido: string
  email: string
  direccion: string
  departamento: string
  ciudad: string
  provincia: string
  codigopostal: string
  numerotarjeta: string
  nombretarjeta: string
  fechaexpiracion: string
  cv: string
}

export const PersonalDataSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/, 'El nombre debe contener solo letras'),

  apellido: yup
    .string()
    .required('El apellido es requerido')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/, 'El apellido debe contener solo letras'),

  email: yup.string().required('El email es requerido').email('Ingrese un formato de email válido')
})

export const DirectionDataSchema = yup.object({
  direccion: yup.string().required('La dirección es requerida'),

  ciudad: yup.string().required('La ciudad es requerida'),

  departamento: yup.string().required('El departamento es requerido'),

  codigopostal: yup
    .string()
    .required('El código postal es requerido')
    .matches(/^([0-9])*$/, 'El código postal debe contener solo números')
})

export const PaymentDataSchema = yup.object({
  numerotarjeta: yup
    .string()
    .required('El número de la tarjeta es requerido')
    .min(16, 'Ingrese los 16 dígitos de la tarjeta'),

  nombretarjeta: yup
    .string()
    .required('El nombre de la tarjeta es requerido')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/, 'El nombre de tarjeta debe contener solo letras'),

  fechaexpiracion: yup
    .string()
    .required('La fecha de expiración es requerida')
    .matches(/^([0-9])*$/, 'La fecha debe contener solo números')
    .min(4, 'Ingrese 4 números')
    .max(4, 'Ingrese 4 números'),

  cv: yup
    .string()
    .required('El código de seguridad es requerido')
    .min(3, 'Ingrese 3 números')
    .max(3, 'Ingrese 3 números')
})
