import type { GetLayout } from '@/@types/next';
import type React from 'react';
import { Component } from './Component';

export const Container: React.FC & GetLayout = () => {
  return <Component />;
};
