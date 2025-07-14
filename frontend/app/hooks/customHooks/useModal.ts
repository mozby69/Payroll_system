"use client"
import { useState } from "react";
import { ModalKey } from '@/app/types/types';
import { modalConfigMap } from "@/app/lib/ModalRegistry";

export type ModalDataMap = {
  [K in ModalKey]: typeof modalConfigMap[K]["dataType"];
};

export const useModal = <K extends keyof ModalDataMap>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [modalKey, setModalKey] = useState<K | null>(null);
  const [rowDataList, setRowDataList] = useState<ModalDataMap[K] | null>(null);

  const openModal = (key: K, type: 'add' | 'edit' | 'view', data: ModalDataMap[K] | null = null) => {
    setModalKey(key);
    setModalType(type);
    setRowDataList(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalKey(null);
    setRowDataList(null);
  };

  return { isOpen, modalType, modalKey, rowDataList, openModal, closeModal };
};

