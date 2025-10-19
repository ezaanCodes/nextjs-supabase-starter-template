import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthProvider";

const useAuth = () =>{
    const context = useContext(AuthContext)
    // fetch(`${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/get-users`)
    if(!context){
        throw new Error ("Use Auth should be used inside authprovider")

    }

    return context
}

export default useAuth;
