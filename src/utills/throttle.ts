export default function throttle(func: Function, ms: number) {
  let isThrottled: boolean = false;
  let savedArgs: unknown[] = [];
  let savedThis;

  function wrapper(...args: unknown[]) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
