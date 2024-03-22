//React 공식문서 hooks 사용시 두가지 규칙 준수사항
//1. 최상위(at the Top Level)에서만 Hook을 호출해야 한다.
//2. 오직 React 함수 내에서 Hook을 호출해야 한다.

//결과 판독 명령어 >자꾸 까먹,,yarn workspace chapter2 run test:b

export function createHooks(callback) {
  // const useState = (initState) => {
  //   return [];
  // };
  // const useMemo = (fn, refs) => {
  //   return fn();
  // };
  // const resetContext = () => {

  // }

  // return { useState, useMemo, resetContext };
/*
  const resetContext = () => {
    prevStates = [];
  };

  let prevStates = [];

  const useState = (initState) => {
    let isFirstRun = true;

    const setState = (newState) => {
      const prevState = prevStates[prevStates.length - 1];
      if (newState !== prevState) {
        prevStates.push(newState);
        callback();
      }
    };
    
    let state;
    if (isFirstRun || !prevStates.length) {
      state = typeof initState === 'function' ? initState() : initState;
      prevStates.push(state);
    } else {
      state = prevStates[prevStates.length - 1];
    }

    return [state, setState];
  };

  const useMemo = (fn, deps) => {
    //useMemo의 값을 변경하고 싶으면, 의존하는 값을 수정해야 한다. 
    // -> 해결하기 위해선 useMemo 함수 내에서 의존하는 값들을 실제로 사용하여 값을 변경할 수 있도록 해야함. 의존성이 변경될 때마다 새로운 값을 반환.
    let prevDeps = [];
    let isFirstRun = true;
  
    if (isFirstRun) {
      isFirstRun = false;
      const result = fn();
      prevDeps = deps;
      return result;
    }
  
    const areDepsEqual = deps.every((dep, index) => Object.is(dep, prevDeps[index]));
  
    if (!areDepsEqual) {
      const newState = fn();
      prevDeps = deps;
      callback();
      return newState;
    }*/
    //states랑 render함수를 생각못햇음..
  let stateIndex = 0;
  const states = [];
  const memos = [];

  const useState = (initState) => {
    const currentIndex = stateIndex;
    if (states[currentIndex] === undefined) {
      states[currentIndex] = initState;
    }

    const setState = (newValue) => {
      if (states[currentIndex] === newValue) return;
      states[currentIndex] = newValue;
      render();
    };

    return [states[stateIndex++], setState];
  };

  const useMemo = (fn, deps) => {
    const currentIndex = stateIndex;
    const [lastDeps, lastValue] = memos[currentIndex] || [];

    let hasChanged = true;
    if (lastDeps) {
      hasChanged = deps.some((dep, i) => dep !== lastDeps[i]);
    }

    if (hasChanged) {
      const newValue = fn();
      memos[currentIndex] = [deps, newValue];
      return newValue;
    } else {
      return lastValue;
    }
  };

  const resetContext = () => {
    stateIndex = 0;
  };

  const render = () => {
    resetContext();
    callback();
  };

  return { useState, useMemo, resetContext };
}