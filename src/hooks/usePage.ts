import { useLayoutEffect } from 'react';

const noop = () => {};

const MAG = 'MAG';

function usePage(className: string, title = null) {
  useLayoutEffect(() => {
    if (!className) return noop;

    document.body.classList.add(className);

    document.title = title ? `${title} - ${MAG}` : MAG;

    return () => {
      document.body.classList.remove(className);
      document.title = MAG;
    };
  }, [className]);
}

export default usePage;
