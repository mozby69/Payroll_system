import { User } from "../types/types";
import api from "./axios"; 


export const login = async (username: string, password: string) => {
    const response = await api.post("/login", { username, password });
    return response.data;
  };

  export const registgerAccuont = async (data: User) =>{
    const response = await api.post("/register", data);
    return response.data;
  }


  export const logout = async () => { 
    const response = await api.post("/logout");
    return response.data;
  };