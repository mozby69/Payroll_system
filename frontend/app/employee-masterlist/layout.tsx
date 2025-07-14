"use client"
import React from "react"
import empListStyles from "@/public/css/NavComponentsCss/employeeList.module.css"
import Button from "@/app/components/buttons"
import SearchButton from "../components/SearchButton"
import { useDebounce } from "use-debounce";
import {useState} from "react";




export default function SubClientOnlyLayout({children}: {children: React.ReactNode}){
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch] = useDebounce(searchTerm, 300);
    return(
        <div>
            <div className="SubNavContainer">
                <div className={`${empListStyles.componentWrapper}`}>
                    <div className={empListStyles.payrollComp}>
                        <h1 className={`fs-600 ${empListStyles.title}`}>Employee List</h1>
                        <p className={empListStyles.description}>View all employee with roles and departments.</p>
                    </div>
                    <div className={empListStyles.content_action}>
                        <SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchButton>
                        <div className={empListStyles.action_btns}>
                          
                            <Button variant="outline">Generate Employees</Button>
                            <Button variant="primary">Update Employees</Button>
                        </div>
                    </div>
                </div>
            </div>
            <main className="main-layout">
                {children}
            </main>
        </div>
    );
}

