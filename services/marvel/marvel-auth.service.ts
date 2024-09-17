import md5 from "md5";
import dotenv from 'dotenv';

// dotenv.config({ path: '.env.local' });
require('dotenv').config();


export const generateAuthenticationString = () => {
     const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
     const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
    
    const ts = new Date().getTime();
    const hash = md5(`${ts}${privateKey}${publicKey}`)

     console.log(`ts=${ts}`);
     console.log(`hash=${hash}`);
     console.log(`Generando URL con ts=${ts}, hash=${hash}`);

    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`

   
}



// const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
// const privateKey = process.env.MARVEL_API_PRIVATE_KEY;


  

