import React from "react";

interface InfoCardProps {
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ children }: InfoCardProps) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      {children}
    </div>
  );
};

export default InfoCard;
