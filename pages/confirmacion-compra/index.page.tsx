import React, { useEffect } from 'react'
import LayoutCheckout from '../../components/layouts/layout-checkout'
import { type CheckoutInput } from '../../features/checkout/checkout.types'
import BodySingle from '../../components/layouts/body/single/body-single'
import { Card, CardContent, CardHeader, Typography, Box, Grid, Divider, CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

const ConfirmaCompra: React.FC = () => {
  const [order, setOrder] = React.useState<CheckoutInput | undefined>()

  useEffect(() => {
    const item = localStorage.getItem('purchase-data')
    if (item !== null) {
      const finalData: CheckoutInput | undefined = JSON.parse(item).data
      if (typeof finalData === 'object' && finalData !== null) {
        setOrder(finalData)
      }
    }
  }, [])

  return (
    <LayoutCheckout>
      <BodySingle title="Compra Confirmada">
        <Grid container justifyContent="center" marginBottom="10px">
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CheckCircle sx={{ color: 'green', marginRight: '8px' }} />
                    ¡Disfruta de tu compra!
                  </Box>
                }
              />
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Box mb={2}>
                    <CardMedia
                      component="img"
                      sx={{ height: '200px', objectFit: 'cover' }}
                      image={`${order?.order.image}`}
                    />
                  </Box>
                  <Box mb={2}>
                    <Typography variant="h6">{order?.order.name}</Typography>
                    <Typography variant="h5">Total Pagado: ${order?.order.price}</Typography>
                  </Box>
                  <Divider />
                  <Box mt={2}>
                    <Typography variant="h6">Datos del usuario:</Typography>
                    <Typography variant="body1">Nombre: {order?.customer.name}</Typography>
                    <Typography variant="body1">Apellido: {order?.customer.lastname}</Typography>
                    <Typography variant="body1">Dirección: {order?.customer.address.address1}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </BodySingle>
    </LayoutCheckout>
  )
}

export default ConfirmaCompra
