import React, { useState, useCallback, useEffect } from "react";
import './ModalWindow.css';
import Resize from "./Resize";

const ModalWindow = ({ show, onClose, children }) => {
  const isPortrait = Resize();
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
    <div className={`modal-backdrop ${show ? 'show' : ''}`}
    style={{display: isVisible}} onClick={onClose}>
      <div style={{scale: isPortrait ? '1' : '0.5'}}>
      <div className="modal-content" onClick={(e) => e.stopPropagation}>
        <button onClick={onClose} className="modal-close-button" aria-label="Close modal"></button>
        {children}
        <div style={{display: "flex", scale: isPortrait ? '1' : '1.12',
                                      marginLeft: isPortrait ? '' : '8vw'}}>
          <a href="#" target="_blank" className="social-button"> 
            <a className="social telegram"/>Telegram</a>
          <a href="#" target="_blank" className="social-button"> 
            <a className="social vk"/>vk</a>
        </div>
        </div>
      </div>
    </div>
   );

}
 
export default ModalWindow;

