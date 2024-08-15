const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = 'secret';

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    const emailResponse = emailSchema.safeParse(username)
    const passwordResponse = passwordSchema.safeParse(password)

    if(!emailResponse.success || !passwordResponse.success) return null;

    const token = jwt.sign({username}, jwtPassword)

    return token
}

function verifyJwt(token) {
    let ans = true;
    try{
        jwt.verify(token, jwtPassword)
    }
    catch(err){
        ans = false;
    }
    return ans
}

function decodeJwt(token) {
    const decoded = jwt.decode(token)

    if(decoded) return true
    else return false
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
