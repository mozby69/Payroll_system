import { registgerAccuont } from "@/app/services/UserAuthentication";
import React, { useState } from "react";
import style from "@/public/css/register.module.css";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "@/app/types/schema/RegisterScehma";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/public/images/PayRollLogo.svg";
import close from "@/public/images/CloseRegisterModal.svg";
import Image from "next/image";
import SweetAlert from "@/app/components/Swal";

type RegisterFormProps = {
    onClose: () => void;
}

const RegisterModal:  React.FC<RegisterFormProps> = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
    })
 
    const onSubmit = async (data: RegisterSchemaType) => {
            setLoading(true);
            try {
                const response = await registgerAccuont(data);
                SweetAlert.successAlertFunction("Success", "Success" , reset, onClose);
            }catch (error) {
                console.log("Error: " + error);
            }finally{
                setLoading(false);
            }
    }

    return (
    <div className={style.registerModal}>
        <div className={style.registerHeader}>
            <Image src={logo} alt="Logo" width={200} height={60} />
            <button className={style.closeButton} onClick={onClose}>
                 <Image src={close} alt="Close" width={25} height={50} />
            </button>

        </div>
        <div className={style.registerContent}>
            <div className={style.registerTitle}>
                <h2>Register here!</h2>
                <p>Hi, Enter your details to create your account</p>
            </div>
        
        <form  className={style.registerForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.email}>
                    <input 
                        {...register("email")}
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Email Address"
                        className={style.inputField}
                    />
                     {errors.email && <p className={style.errorMessage}>{errors.email.message}</p>}
                </div>
                <div className={style.role}>
                <select {...register("role")} id="role"    className={style.inputField}>
                    <option value="" disabled>Choose Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <p  className={style.errorMessage}>{errors.role.message}</p>}
                </div>
           
                <div className={style.username}> 
                <input
                        {...register("username")}
                            type="text"
                            placeholder="Enter your username"
                            autoComplete="off"
                            id="username"
                            className={style.inputField}
                        />
                    {errors.username && <p  className={style.errorMessage}>{errors.username.message}</p>}
                </div>
           
        <div className={style.password}> 
            <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                id="password"
                autoComplete="new-password"
                className={!errors.password? style.inputField : style.inputFieldError}
              />
             {errors.password && <p  className={style.errorMessage}>{errors.password.message}</p>} 
            </div>
        <div className={style.button}> 
            <button
                type="submit"
                disabled={loading}
                className={style.btnSubmit}
                >
                {loading ? "Submitting..." : "Submit Registration"}
                </button>
            </div>  
        </form>
        </div>
    </div>
    )
}

export default RegisterModal; 