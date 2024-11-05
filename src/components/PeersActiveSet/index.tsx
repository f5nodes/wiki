import React from 'react';

interface BooleanDisplayProps {
  value: boolean;
}

const BooleanDisplay: React.FC<BooleanDisplayProps> = ({ value }) => {
  const styles = {
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 500,
      backgroundColor: value ? '#ecfdf5' : '#fef2f2',
      color: value ? '#047857' : '#b91c1c',
    } as React.CSSProperties
  };

  return (
    <span style={styles.badge}>
      {value ? 'Yes' : 'No'}
    </span>
  );
};

export default BooleanDisplay;
