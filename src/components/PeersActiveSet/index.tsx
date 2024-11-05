import React from 'react';

interface BooleanDisplayProps {
  value: boolean;
}

const BooleanDisplay: React.FC<BooleanDisplayProps> = ({ value }) => {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
        value 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}
    >
      {value ? 'Yes' : 'No'}
    </span>
  );
};

export default BooleanDisplay;
