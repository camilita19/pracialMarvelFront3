/* eslint-disable react/prop-types */
import type { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { type Result } from '../../types/characters.types'
import { getCharacter, getComics } from '../../services/marvel/marvel.service'
import LayoutGeneral from '../../components/layouts/layout-general'
import { Divider, Card, CardContent, CardMedia, Box } from '@mui/material'
import React from 'react'

interface CharacterProps {
  character: Result;
}

const CharacterDetail: NextPage<CharacterProps> = ({ character }: CharacterProps) => {
  return (
    <LayoutGeneral>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderRadius: '16px',
          marginTop: '70px',
          marginBottom: '15px',
          boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
          width: '60%',
          height: '70%',
        }}
      >
        <CardMedia
          component="img"
          image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
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
              {character.name}
            </Box>
          </Box>
          <Divider light sx={{ mt: 1, mb: 1 }} />
          <Box component="p" sx={{ fontSize: 14, color: 'grey.700', mb: '1.275rem' }}>
            {character.description ? character.description : 'No hay descripción'}
          </Box>
        </CardContent>
      </Card>
    </LayoutGeneral>
  )
}

export default CharacterDetail

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await getComics()
    const paths = response.data.results.map(({ id }: { id: number }) => ({
      params: { id: id.toString() },
    }))
    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error fetching comics:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
   const idParsed = params?.id as string
   const response = await getCharacter(idParsed)
    const character = response?.data?.results[0]

    if (!character) {
      return { notFound: true }
    }

    return {
      props: { character },
    }
  } catch (error) {
    console.error('Error fetching character:', error)
    return { notFound: true }
  }
}
