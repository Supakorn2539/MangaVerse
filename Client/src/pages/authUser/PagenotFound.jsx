import React from 'react';

const PagenotFound = () => {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full height
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 
          style={{
            fontSize: '96px',
            color: '#ff69b4', // Pink color for sakura theme
          }}
        >
          404
        </h1>
        <h2 
          style={{
            fontSize: '24px',
            margin: '10px 0',
          }}
        >
          Oops! Page Not Found
        </h2>
        <p 
          style={{
            fontSize: '16px',
            marginBottom: '20px',
          }}
        >
          It seems the page you're looking for doesn't exist.
        </p>
        <a 
          href="/" 
          style={{
            textDecoration: 'none',
            backgroundColor: '#ff69b4', // Pink button
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff1493'} // Darker pink on hover
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff69b4'} // Revert to original color
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default PagenotFound;
