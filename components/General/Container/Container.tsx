import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...props} />;
};

export default Container;
