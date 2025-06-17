import { Toast } from 'primereact/toast';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BasicInfoService } from '../../services/Partner/BasicInfo/BasicInfoService';
import { Logout } from '../../utils/AccountUtils';
import sessionStorageContext from '../context/LocalStorageContext';

const LocalStorageProvider: React.FC<any> = ({ children }) => {
  const { partnerid, type } = useParams();
  const [partnerLegalName, setPartnerLegalName] = useState("");
  const [dbaName, setDbaName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [role, setRole] = useState("");
  const [Isfacilitator, setIsFacilitator] = useState(false);
  const toast = useRef<Toast>(null);
  useEffect(() => {


  }, []);

  const updateLogoSrc = (newLogoSrc: any) => {
    setLogoSrc(newLogoSrc);
  };

  const updateLegalName = (newlegalName: any) => {
    setPartnerLegalName(newlegalName);
  }

  const updateDbaName = (newDbaName: any) => {
    setDbaName(newDbaName);
  }

  const updateRole = (newRole: any) => {
    setRole(newRole);
  }

  const updateFacilitator = (newFacilitator: any) => {
    setIsFacilitator(newFacilitator);
  }

  return (
    <sessionStorageContext.Provider value={{ logoSrc, updateLogoSrc, partnerLegalName, updateLegalName, dbaName, updateDbaName, role, updateRole, Isfacilitator, updateFacilitator }}>
      {children}
    </sessionStorageContext.Provider>
  );
}

export default LocalStorageProvider;
