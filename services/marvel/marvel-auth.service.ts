import md5 from "md5";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });



export const generateAuthenticationString = () => {
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const ts = new Date().getTime();
    const hash = md5(`${ts}${publicKey}${privateKey}`)

    // console.log('Timestamp (ts):', ts);
    // console.log('Clave pública:', publicKey);
    // console.log('Clave privada:', privateKey);
    // console.log('Hash MD5 generado:', hash);
    console.log(process.env.MARVEL_API_PUBLIC_KEY,'marlvel api public');
    console.log(process.env.MARVEL_API_PRIVATE_KEY);
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`

   
}
