/* eslint-disable react/prop-types */
import { Divider, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Box } from '@mui/system'
import LayoutGeneral from '../../components/layouts/layout-general'
import { type Result } from '../../types/comics.types'
import { getComic, getComics } from '../../services/marvel/marvel.service'
import Link from 'next/link'
import type { GetStaticProps, NextPage, GetStaticPaths } from 'next'
// import { type Result } from '../../features/types/comics.types'
import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface Comicprops {
  comic: Result;
}

const ComicsDetail: NextPage<Comicprops> = ({ comic }) => {
  return (
    <>
    
        <Card
          elevation={0}
          sx={{
            display: 'flex',
            padding: 2,
            borderRadius: '16px',
            marginTop: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
            width: '60%',
          }}
        >
          <CardMedia
            component="img"
            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            sx={{
              minWidth: '35%',
              maxWidth: '35%',
              flexShrink: 0,
              backgroundColor: 'grey.200',
              borderRadius: '12px',
              objectFit: 'cover',
              height: '100%',
              marginRight: '10px',
            }}
          />
          <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
            <Box mb={1}>
              <Box
                component="h3"
                sx={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  marginBottom: 0,
                  marginRight: 1.5,
                  display: 'inline-block',
                }}
              >
                {comic.title}
              </Box>
            </Box>
            <Box component="p" sx={{ fontSize: 14, color: 'grey.500', mb: '1.275rem' }}>
              {comic.description ? comic.description : 'No hay descripción'}
            </Box>
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Accordion sx={{ width: '100%' }}>
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
                  Personajes
                </AccordionSummary>
                <AccordionDetails sx={{ flexDirection: 'column' }}>
                  {comic.characters?.available === 0 ? (
                    <Typography>No hay personajes disponibles</Typography>
                  ) : (
                    <>
                      {comic.characters.items?.map((character, index: number) => (
                        <Typography key={index}>
                          <Link href={`/personajes/${character.resourceURI.split('/').pop()}`}>{character.name}</Link>
                        </Typography>
                      ))}
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  gap: '10px',
                }}
              >
                {comic.price && <Typography variant="h4">${comic.price}</Typography>}
                {comic.oldPrice && comic.oldPrice !== comic.price && (
                  <>
                    <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'darkgrey' }}>
                      ${comic.oldPrice}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'navy' }}>
                      -{Math.round(((comic.oldPrice - comic.price) / comic.oldPrice) * 100)}% 🏷️
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  width: '50%',
                }}
              >
                {comic.stock > 0 ? (
                  <Link href={`/checkout/${comic.id}`}>
                    <Button variant="contained" sx={{ backgroundColor: 'black' ,'&:hover': {backgroundColor: '#ED1D24', borderColor: 'black',color: 'black'}}} startIcon={<ShoppingCartIcon />}>
                      Comprar
                    </Button>
                  </Link>
                ) : (
                  <Button variant="contained" disabled>
                    Sin Stock
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
   
    </>
  )
}

export default ComicsDetail


export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getComics()

  const paths = response.data.results.map(({ id }: { id: number }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const idParsed = typeof params?.id === 'string' ? parseInt(params.id, 10) : null

  if (idParsed === null || isNaN(idParsed)) {
    return {
      notFound: true,
    }
  }

 const comic = await getComic(idParsed.toString())

  if (!comic) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      comic,
    },
  }
}

