import React from 'react';

const InfoCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between">
      <div>
        <h3 className="font-bold mb-2">{title}</h3>
        {children}
      </div>
      <div className="text-gray-600 text-4xl">
        <i className={`uil uil-${icon}`}></i>
      </div>
    </div>
  );
};

export default InfoCard;
