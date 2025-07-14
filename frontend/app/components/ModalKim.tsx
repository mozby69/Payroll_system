import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/public/css/ModalKim.module.css";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  sizeModal?: "large" | "medium" | "small" | "xsmall" | "xlarge" | "full";
  isNested?: boolean;
}

const ModalKim: React.FC<ModalProps> = ({
  isOpen,
  sizeModal = "medium",
  children,
  isNested = false,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getSizeClass = () => {
    switch (sizeModal) {
      case "full":
        return styles.full;
      case "xlarge":
        return styles.xlarge;
      case "large":
        return styles.large;
      case "medium":
        return styles.medium;
      case "small":
        return styles.small;
      case "xsmall":
        return styles.xsmall;
      default:
        return styles.medium;
    }
  };

  const modalContent = (
    <div className={`${styles["modal-overlay"]} ${isNested ? styles["modal-nested"] : ""}`}>
      <div className={`${styles["modal-box"]} ${getSizeClass()}`}>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalKim;
