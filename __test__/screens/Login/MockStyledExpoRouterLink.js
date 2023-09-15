// MockStyledExpoRouterLink.js
import React from 'react';

const MockStyledExpoRouterLink = ({ href, children }) => {
  const handleClick = () => {
    // Capture the navigation action here
    // You can use a state variable or some other mechanism to track the navigation.
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default MockStyledExpoRouterLink;
