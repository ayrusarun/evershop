import React from 'react';
import { useAppState } from '@components/common/context/app';
import './Loader.scss';
import { Circles } from 'react-loader-spinner'

export default function Loader() {
  const { fetching } = useAppState();

  return (
    <div className="loader-container" style={{ display: fetching ? 'flex' : 'none' }}>
      <Circles
        height="80"
        width="80"
        color="#7d0049"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        />
    </div>
  );

}