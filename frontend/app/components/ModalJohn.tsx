"use client";

import { ReactNode } from "react";
import styles from "@/public/css/ComponentCss/Modal.module.css";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalTitle: string;
  children: ReactNode;
  modalSize?: "small" | "medium" | "large" | "xlarge"; 
}


export default function Modal({isOpen, closeModal, modalTitle, children,modalSize = "medium"}: ModalProps) {
  if (!isOpen) return null;

  const sizeClassMap = {
    small: styles.modalSmall,
    medium: styles.modalMedium,
    large: styles.modalLarge,
    xlarge: styles.modalXLarge,
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContainer} ${sizeClassMap[modalSize]}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <button onClick={closeModal} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.modalBody}>{children}</div>

        {/* <div className={styles.modalFooter}>
        
        </div> */}
      </div>
    </div>
  );
}
