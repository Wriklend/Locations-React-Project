import throttle from "../utills/throttle";

describe('throttle test', () => {

  it('call 5 times when throttle time sleep 101ms during 500ms', () => {
    jest.useFakeTimers();
    const funcSpy = jest.fn();
    const throttledFunc = throttle(funcSpy, 101);

    for (let index = 0; index < 100; index++) {
      throttledFunc();
      jest.advanceTimersByTime(5);
    }

    expect(funcSpy).toHaveBeenCalledTimes(5);
  });

  it('call with 0 ms', () => {
    jest.useFakeTimers();
    const funcSpy = jest.fn();
    const throttledFunc = throttle(funcSpy, 0);

    for (let index = 0; index < 100; index++) {
      throttledFunc();
      jest.advanceTimersByTime(5);
    }

    expect(funcSpy).toHaveBeenCalledTimes(101);
  });

  it('call every 1 ms', () => {
    jest.useFakeTimers();
    const funcSpy = jest.fn();
    const throttledFunc = throttle(funcSpy, 101);

    for (let index = 0; index < 100; index++) {
      throttledFunc();
      jest.advanceTimersByTime(1);
    }

    expect(funcSpy).toHaveBeenCalledTimes(1);
  });
});
