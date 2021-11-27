import {useEffect, useRef} from 'react';

export const useInterval = (callback: any, delay: number, off: boolean) => {

  useEffect(() => {
    function tick() {
      callback();
    }
    if (off && delay !== 0)
    {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      }
    }
  }, [delay, off, callback]);
};