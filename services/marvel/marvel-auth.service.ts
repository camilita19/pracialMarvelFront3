import md5 from "md5";
import dotenv from 'dotenv';

//  dotenv.config({ path: '.env.local' });
require('dotenv').config();


export const generateAuthenticationString = () => {
    
    // const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
   const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
  const privateKey ='5a1c58a8a78273c386dbd0dfe81af5aad2ee2c1c'
   

   console.log(`Private Key: ${privateKey}`);  // Verifica si es undefined aquí
   console.log(`Public Key: ${publicKey}`);
    const ts = new Date().getTime();
    const hash = md5(`${ts}${privateKey}${publicKey}`)

     console.log(`ts=${ts}`);
     console.log(`hash=${hash}`);
     console.log(`Generando URL con ts=${ts}, hash=${hash}`);
     console.log(` keys=${publicKey}, private=${privateKey}`);

    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`

   
}



// const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
// const privateKey = process.env.MARVEL_API_PRIVATE_KEY;


  

