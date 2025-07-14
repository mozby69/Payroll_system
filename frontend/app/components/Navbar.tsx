'use client';

import Link from "next/link";
import styles from '@/public/css/navbar.module.css';
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { logout } from "../services/UserAuthentication";
import { useRouter } from "next/navigation";
import RegisterModal from "../ui/UserModals/RegisterModal";
import ModalKim from "./ModalKim";

interface NavMenuProps {
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}

export const Navbar = ({ activeItem, setActiveItem }: NavMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("User");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Simulate dynamic user fetching
    const storedName = localStorage.getItem("username");
    if (storedName) setUserName(storedName);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    const response = confirm("Are you sure you want to logout?");
    if (response) {
      const result = await logout();
      if (result) {
        router.push("/login");
      }
    }
  };

  const handleCloseModal = () => {
    setRegisterModal(false);
  };

  return (
    <nav className={`${styles.main_navbar}`}>
      <div className={styles.nav_container}>
        <div className={styles.nav_col}>
          <div
            className={styles.logo_container}
            onClick={(e) => {
              e.stopPropagation();
              setActiveItem("homepage");
            }}
          >
            <Link href="/homepage">
              <Image
                className="ImgGen"
                src="/images/NavbarLogo.svg"
                alt="jgc"
                width={160}
                height={55}
                priority
              />
            </Link>
          </div>
          <ul className={styles.nav_list}>
            <li className="fs-400 fw-semibold txt-color-txt-clr-light-neutral" onClick={(e) => {
              e.stopPropagation();
              setActiveItem("main-payroll");
            }}>
              <Link href="/main-payroll">Payroll</Link>
            </li>
            <li className="fs-400 fw-semibold txt-color-txt-clr-light-neutral" onClick={(e) => {
              e.stopPropagation();
              setActiveItem("import-page");
            }}>
              <Link href="/import-page">Import Data</Link>
            </li>
            <li className="fs-400 fw-semibold txt-color-txt-clr-light-neutral" onClick={(e) => {
              e.stopPropagation();
              setActiveItem("employee-masterlist");
            }}>
              <Link href="/employee-masterlist">Employee List</Link>
            </li>
            <li className="fs-400 fw-semibold txt-color-txt-clr-light-neutral" onClick={(e) => {
              e.stopPropagation();
              setActiveItem("attendance");
            }}>
              <Link href="#">Attendance</Link>
            </li>
          </ul>
        </div>

        <div className={styles.nav_col}>
          <div className={styles.user_container}>
            <Image
              className="ImgGen"
              src="/images/UserProfile.svg"
              alt="user"
              width={30}
              height={20}
            />
            <div className={styles.dropdown_parent}>
              <button
                className={`fs-400 fw-semibold txt-color-txt-clr-light-neutral ${styles.dropdown_button}`}
                onClick={toggleDropdown}
              >
                {mounted ? `Hi, ${userName}▾` : ""}
              </button>
              {dropdownOpen && (
                <ul className={styles.dropdown_menu}>
                  <li onClick={() => setRegisterModal(true)}>
                    <span className={`fs-400 fw-semibold ${styles.dropdown_link}`}>
                      Register
                    </span>
                  </li>
                  <li onClick={handleLogout}>
                    <span className={`fs-400 fw-semibold ${styles.dropdown_link}`}>
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {registerModal && (
        <ModalKim isOpen={registerModal} sizeModal="small">
          <RegisterModal onClose={handleCloseModal} />
        </ModalKim>
      )}
    </nav>
  );
};
