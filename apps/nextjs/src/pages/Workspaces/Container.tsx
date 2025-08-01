import { useWorkspacePageQuery } from '@/hooks/queries/app';
import type React from 'react';
import { memo } from 'react';
import { Component } from './Component';

export const Container: React.FC = memo(() => {
  const { loading } = useWorkspacePageQuery();

  return <Component loading={loading} />;
});
Container.displayName = 'Container';
