import type React from 'react';
import type { GetLayout } from 'src/@types/next';
import { Component } from './Component';

export const Container: React.FC & GetLayout = () => {
  return <Component />;
};
