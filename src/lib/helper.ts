import { Dispatch, SetStateAction } from 'react';

export function progressBarTimeOut(
  setProgressBar: Dispatch<SetStateAction<number>>,
  isSubmitted: boolean
) {
  let interval: NodeJS.Timeout;
  interval = setInterval(
    () => {
      setProgressBar((prv) => {
        if (prv < 90) return prv + 10;
        else {
          clearInterval(interval);
          return prv;
        }
      });
      if (isSubmitted) {
        setProgressBar(100);

        clearInterval(interval);
      }
    },

    500
  );
}
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
