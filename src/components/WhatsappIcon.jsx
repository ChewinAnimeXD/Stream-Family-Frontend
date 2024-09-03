import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../index.css';

const WhatsappIcon = () => {
  return (
    <a
      href="https://wa.me/573028649880?text="
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <FaWhatsapp className='text-white size-9'/>
    </a>
  );
};

export default WhatsappIcon;