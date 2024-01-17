import crypto from 'crypto';

function registTokenGen(userEmail: string) {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}
// async function main(){
//     const token = await registTokenGen('123123123');
//     console.log(token);
// }
// main();
export default registTokenGen;