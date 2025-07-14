'use client';
import styles from "./page.module.css";
import React, { useRef,useState } from 'react'
import { useLogin } from '@/app/hooks/useLogin';
import { useRouter } from "next/navigation";
import SweetAlert from '@/app/components/Swal';

const LoginForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginMutation = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      passwordRef.current?.focus(); 
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username,password },
      {
        onSuccess:(data) => {
          router.push("/pages/homepage"); 
        },
        onError:(error: any) => {
          SweetAlert.errorAlert("Error", "Incorrect username or password");
          console.error('login failed',error.response?.data.message || error.message);
        }
      }
    )
  }


  return (
    <div className={styles.container}>
     
    </div>
  );
}

export default LoginForm;



