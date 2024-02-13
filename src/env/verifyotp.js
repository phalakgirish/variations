import { jwtDecode} from "jwt-decode";

export default function verifyotp(datatoPost){
    var otptoken  = localStorage.getItem('verifyotp');
    if(otptoken === null)
    {
        return false
    }
    else if(otptoken !== null || otptoken != '')
    {
        const decode = jwtDecode(otptoken);
        console.log(decode);

        if(decode.data.email_id == datatoPost.email_id && decode.data.otp == datatoPost.otp)
        {
            return true;
        }
        else
        {
            return false;
        }  
    }
}