
import { jwtDecode} from "jwt-decode";
import secureLocalStorage from 'react-secure-storage';


export default function verifytoken() {

    var token = secureLocalStorage.getItem('Login');
    if(token === null)
    {
        return true;
    }
    else if(token !== null || token != '')
    {
        const decode = jwtDecode(token);

        const isTokenExpired = Date.now() >= decode.exp * 1000;

        if (isTokenExpired) 
        {
            return true;
        }
        else
        {
            return false;
        }
    } 
}
