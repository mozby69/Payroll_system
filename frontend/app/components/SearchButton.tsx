import styles from '@/public/css/ComponentCss/searchButton.module.css';
import "@/public/css/reset.css"

type Props = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  };
  
  export default function SearchButton({ searchTerm, setSearchTerm }: Props) {
    return (
      <div className={styles.search_container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.search_icon}
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <input
          type="text"
          className={`fs-400 fw-regular txt-color-txt-clr-light-neutral ${styles.search_input}`}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  }