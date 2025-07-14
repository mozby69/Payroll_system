"use client";

import { ReactNode } from "react";
import styles from "@/public/css/ComponentCss/Modal.module.css";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  size?: "small" | "medium" | "large" | "xlarge"; 
}

export default function Modal({isOpen,onClose,title,children,footerContent,size = "medium"}: ModalProps) {
  if (!isOpen) return null;

  const sizeClassMap = {
    small: styles.modalSmall,
    medium: styles.modalMedium,
    large: styles.modalLarge,
    xlarge: styles.modalXLarge,
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContainer} ${sizeClassMap[size]}`}>
        <div className={styles.modalHeader}>
          <h2 className={`fs-500 fw-bold txt-color-txt-clr-dark-neutral ${styles.modalTitle}`}>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.modalBody}>{children}</div>

        <div className={styles.modalFooter}>
          {footerContent}
          <button onClick={onClose} className={styles.closeFooterButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
