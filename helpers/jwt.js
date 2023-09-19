/* Load express-jwt*/
const expressJwt=require('express-jwt');

/*Define a function*/
function authJwt(){
     const secret=process.env.mySecretKey;
     const api=process.env.API_URL;
     const jwt=expressJwt.expressjwt({
         secret,
         algorithms: ['sha1', 'RS256', 'HS256'],
         isRevoked:isRevok
         
       }).unless({path:[
        /*url provides us the products list with out Authenticated*/
         /*Use Regular expression for get all details after products*/
        {url:/\/public\/uploads(.*)/ ,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/products(.*)/ ,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/categories(.*)/ ,methods:['GET','OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`
      ]});
       return jwt;
}

// async function IsRevoked(req,payload,done){
//    if(!payload.isAdmin){
//     done(null,true)
//    }
//   await done();
// }
async function isRevok(req, token) {
  if (token.payload.isAdmin===false) {
      return  true
  }  return false

}
module.exports=authJwt;

console.log('express-jwt is ready to use');