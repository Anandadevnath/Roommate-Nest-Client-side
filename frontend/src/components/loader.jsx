import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <span className="loading loading-infinity loading-xl text-blue-500"></span>
    </div>
  );
}

export default Loader;
