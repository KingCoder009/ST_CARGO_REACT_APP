import axios from "axios";
 
const Login_ABI_BASE_URL = "http://localhost:8080/st_cargo/sit/private/v1/prelogin/login";
 
class LoginService{


    getLogin(login){
        
         return axios.post(Login_ABI_BASE_URL+"/Login",login);
    }
}
export default new LoginService();
