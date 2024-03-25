//yarn workspace chapter2 run test:d
//setState를 실행할 경우, 1frame 후에 callback이 다시 실행된다.
//setState가 동시에 여러번 실행될 경우, 마지막 setState에 대해서만 render가 호출된다.

export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  let isBatchingUpdates = false;
  let updateQueue = [];

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
  }

  const useState = (initState) => {
    const { current, states } = stateContext;
    stateContext.current += 1;

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      if (newState === states[current]) return;
      states[current] = newState;

      //callback();
      if(!isBatchingUpdates) {
        isBatchingUpdates = true;
        requestAnimationFrame(() => {
          callback();
          isBatchingUpdates=false;
        }); 
      }
    };

    return [states[current], setState];
  };

  const useMemo = (fn, refs) => {

    const { current, memos } = memoContext;
    memoContext.current += 1;

    const memo = memos[current];

    const resetAndReturn = () => {
      const value = fn();
      memos[current] = {
        value,
        refs,
      };  
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {

      return resetAndReturn();
    }
    return memo.value;
  };

  return { useState, useMemo, resetContext };
}
