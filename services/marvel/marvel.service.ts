import {generateAuthenticationString} from "dh-marvel/services/marvel/marvel-auth.service";

const MARVEL_API_URL = process.env.NEXT_PUBLIC_MARVEL_API_URL

// process.env.MARVEL_API_URL;

const fetchApi = async (endpoint: string, urlParams?: string) => {
    const authString = generateAuthenticationString();
    const url = `${MARVEL_API_URL}/${endpoint}?${authString}&${urlParams?.toString() ?? ''}`
    console.log('Generated URL:', url); 
    console.log(authString)
    const response = await fetch(url);

    
    return await response.json();
}

export const getComics = async (offset?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (offset) params.set("offset", `${offset}`);
    if (limit) params.set("limit", `${limit}`);
    return fetchApi("comics", params.toString());
}



export const getComic = async (comicId: string): Promise<any> => {
    if (isNaN(Number(comicId))) {
      throw new Error('Invalid comicId');
    }
  
    const data = await fetchApi(`comics/${comicId}`);
  
    // Mostrar el contenido completo de la respuesta
    console.log("API Response:", data);
  
    if (!data?.data?.results) {
      throw new Error('Invalid API response structure');
    }
  
    const comic = data.data.results[0] || null;
  
    if (!comic) {
      return null;
    }
  
    // Lógica de modificación de precio y stock
    if (`${comic.id}`.endsWith('0')) {
      comic.price = 48;
      comic.oldPrice = 48;
      comic.stock = 0;
    } else {
      comic.price = 72;
      comic.oldPrice = 87;
      comic.stock = 2;
    }
  
    return comic;
  };
  
  
  


export const getCharacter = async (characterId: string): Promise<any> => {
    const parsedId = Number(characterId);
    
    if (isNaN(parsedId)) {
      throw new Error('Invalid characterId');
    }
  
    const data = await fetchApi(`characters/${parsedId}`);
    return data?.data?.results?.[0] || null;
  };
  

//   export const getComic = async (comicId: number) => {

//     const data = await fetchApi(`comics/${comicId}`);
//     const results = data.data.results;
//     if (results.length > 0) {
//         const comic = results[0];
//         if (`${comic.id}`.endsWith('0')) {
//             comic.price = 48;
//             comic.oldPrice = 48;
//             comic.stock = 0;
//         } else {
//             comic.price = 72;
//             comic.oldPrice = 87;
//             comic.stock = 2;
//         }
//         return comic;
//     } else return null;
// }


// export const getCharacter = async (characterId: string) => {
//     const idAsNumber = Number(characterId); 
//     const data = await fetchApi(`characters/${characterId}`);
//     const results = data.data.results;
//     if (results.length > 0) return results[0];
//     else return null;
// }