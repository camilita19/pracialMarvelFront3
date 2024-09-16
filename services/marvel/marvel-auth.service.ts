import md5 from "md5";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
require('dotenv').config();


// export const generateAuthenticationString = (): string => {
   
//     const ts = 1
 
//     return `ts=${ts}&apikey=455ba9510d4c0f835cc4d00314238421&hash=d0993fdc42e5b8274c194b21cdf674c0`
//   }

export const generateAuthenticationString = () => {
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const ts = new Date().getTime();
    const hash = md5(`${ts}${privateKey}${publicKey}`)
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`

   
}
