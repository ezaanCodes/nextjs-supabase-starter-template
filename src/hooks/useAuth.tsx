import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthProvider";

const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!AuthContext){
        throw new Error ("Use Auth should be used inside authprovider")

    }

    return context
}

export default useAuth;