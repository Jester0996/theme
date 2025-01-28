import React, { useState, useCallback, useEffect } from "react";
import './ModalMenu.css';

const ModalMenu = ({ show, onClose, children }) => {
   const [isVisible, setIsVisible] = useState(false);

   const hanleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
   }, [onClose]);

   useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.addEventListener('keydown', hanleKeyDown);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 800);
      document.removeEventListener('keydown', hanleKeyDown);
      return () => clearTimeout(timer);
    }
   }, [show, hanleKeyDown]);

   useEffect(() => {
    return () => {
      document.removeEventListener('keydown', hanleKeyDown);
    };
   }, [hanleKeyDown]);

   return (
    <div className={`modal-menu-backdrop ${show ? 'show' : ''}`}
    style={{display: isVisible}} onClick={onClose}>
      <div className="modal-menu-content" onClick={(e) => e.stopPropagation}>
       {children}
      </div>
    </div>
   );

}
 
export default ModalMenu;

