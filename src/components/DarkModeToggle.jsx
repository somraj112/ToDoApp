import { useEffect } from 'react';

const DarkModeToggle = ({ darkMode, onToggle }) => {
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={onToggle}
      className="theme-toggle"
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        color: darkMode ? '#ffffff' : '#1a1a1a',
        transition: 'color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: darkMode ? '#2d2d2d' : '#f5f5f5',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        border: 'none',
        cursor: 'pointer',
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;