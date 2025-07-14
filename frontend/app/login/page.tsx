"use client";

import { useState } from "react";
import { login } from "../services/UserAuthentication";
import styles from "@/public/css/login.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ResponsiveImage from "../components/ResponsiveImg";
import logo from "@/public/images/PayRollLogo.svg";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(username, password);

      router.push("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
     <div className="Container">
      <div className={`Wrapper ${styles.container}`}>
        <form className={styles.login_div} onSubmit={handleLogin}>
            <div className={styles.JgcLogo}>
           <ResponsiveImage src={logo} alt="PayrollLogo"  width={4} height={4} priority={true}/>
            </div>
          <div className={styles.header}>
            <h1 className="fs-600 fw-bold txt-color-txt-clr-light-neutral header-font">Welcome back!</h1>
            <p className="fs-400 fw-regular txt-color-txt-clr-light-neutral">Hi, Enter your details to get sign in to your account</p>
          </div>
          <div>
            <input type="text" className="fs-400 fw-regular txt-color-txt-clr-light-neutral input-style" placeholder="username"value={username} onChange={(e)=> setUsername(e.target.value)} required></input>
          </div>
          <div className={styles.password}>
            <input type="password" className="fs-400 fw-regular txt-color-txt-clr-light-neutral input-style" placeholder="password" onChange={(e)=> setPassword(e.target.value)} required></input>
          </div>
          <div>
            <button type="submit" className="fs-400 fw-bold submit-btn">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
