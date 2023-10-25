import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return windowSize;
}
