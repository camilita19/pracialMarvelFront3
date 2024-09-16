import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InfoIcon from '@mui/icons-material/Info'
import { type Comics } from '../../types/comics.types'
import { Box, Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface ComicsCardProps {
  comics: Comics;
}

const ComicsCard: React.FC<ComicsCardProps> = ({ comics }) => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
      {comics?.data?.results?.map((comic) => (
          <Grid item xs={12} sm={6} md={3} key={comic.id}>
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {comic.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link href={`/checkout/${comic.id}`} passHref>
                  <Button variant="contained" startIcon={<ShoppingCartIcon />}sx={{ backgroundColor: 'black' ,'&:hover': {backgroundColor: '#ED1D24', borderColor: 'black',color: 'black'}}}  component="a">
                    Comprar
                  </Button>
                </Link>
                <Link href={`/comics/${comic.id}`} passHref>
                  <Button variant="outlined" startIcon={<InfoIcon />} 
                   component="a" sx={{ borderColor: '#ED1D24', color: '#ED1D24','&:hover': {borderColor: 'black',color: 'black',           
                   }, }} >
                    Ver Detalle
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ComicsCard
