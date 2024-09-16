

export const getFaqs = async () => {
    const response = await fetch('https://marvel-comics-aplication.vercel.app/api/preguntas-frecuentes')
    const data = await response.json()
    return data
}
