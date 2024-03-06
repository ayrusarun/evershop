import React, { useEffect } from 'react';
import { helix } from 'ldrs';
import { useAppState } from '@components/common/context/app';
import './Loader.scss';

export default function Loader() {
  const { fetching } = useAppState();
  
  useEffect(() => {
    helix.register();
  }, []);

  return (
    <div className="loader-container" style={{ display: fetching ? 'flex' : 'none' }}>
      <l-helix size="60" speed="2.5" color="#7d0049"></l-helix>
    </div>
  );
}
