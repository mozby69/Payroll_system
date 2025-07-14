"use client";
import styles from '@/public/css/import.module.css'
import Image from "next/image";
import { useState,useRef } from "react";
import { useImportSQL } from '@/app/hooks/useImport';
import SweetAlert from '@/app/components/Swal';



function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const importMutation = useImportSQL();
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (file) {
        importMutation.mutate(file, {
          onSuccess: () => {
            SweetAlert.successAlert("Success", "Import data successfully!");
  
            setFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; 
            }
          },
          onError: () => {
            SweetAlert.errorAlert("Error", "Error occurred");
          },
        });
      }
    };
  

    
    return (



      <form onSubmit={handleSubmit}>

        <div className={styles.first_section}>
      
          <div className={styles.bg_img}>
            <Image src="/images/import_bg.svg" alt="jgc" fill priority sizes="350px"/>
          </div>
          <div className={styles.parent_import}>
            <input ref={fileInputRef} type="file" accept=".sql" onChange={handleFileChange}/>
            <button type="submit" disabled={importMutation.isPending}>
              {importMutation.isPending ? "Importing..." : "Import"}
            </button>
          </div>
        </div>
        
      </form>


    );
  }
  

  export default ImportPage;