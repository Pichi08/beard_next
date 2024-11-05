import { RegisterUser } from "@/interfaces/registerUser"
import { RegisterUserService } from "@/services/registerUser.service"
// import Cookies from "js-cookie";


export const useRegister = () => {
    const register = async (name: string, lName: string, email: string, password: string, phone: string) => {
        const registerUserService = new RegisterUserService("https://beard-nest.vercel.app/");
        try {
            const registerUser = await registerUserService.registerUser(name, lName, email, password, phone);
            // console.log(registerUser)
            return registerUser as RegisterUser;
        } catch (err) {
            console.error("Error params register")
        }
        
    }

    return {register};
};