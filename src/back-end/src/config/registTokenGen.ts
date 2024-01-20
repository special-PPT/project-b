import crypto from 'crypto';

function registTokenGen(userEmail: string) {
    const token = crypto.randomBytes(20).toString('hex');
    const expire = new Date().getTime() + 1000 * 60 * 60 * 24;
    return token;
}
// async function main(){
//     const token = registTokenGen('123123123');
//     console.log(token);
// }
// main();
export default registTokenGen;