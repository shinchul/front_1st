
//ci/cd 명령어
//yarn workspace chapter2 run test:e

// export const 구독 = fn => {
//   fn();
// }

//기존 의존성 구조들을 모두 broker 에서 처리한다.

// function createObserverState() {
//    const observerState = {
//     state : {name: 'xxx'},
//     listeners: [],
//     subscribe: (listener) => observerSate.listeners.push(listener),
//       setState: (state) => {
//         observerState.state = state
//         observerState.listeners.forEach(listeners => listener[state])
//       }
//    }
// }
let currentCallback=null


export const 구독 = fn => {
  currentCallback = fn;

  fn();
  currentCallback = null;
  //Object.defineProperty()
  
}

export const 발행기관 = obj => {
  Object.defineProperties(
    obj,
    Object.keys(obj).reduce((array, key) => {
      let value = obj[key];
      const observers = new Set();
      array[key] = {
        get() {
          if (currentCallback) observers.add(currentCallback);
          
          return value;
        },
        set(val) {
          value = val;
          observers.forEach((fn) => fn());
        },
      };

      return array;
    }, {})
  );

  return obj;
}


//초특급 힌트
//
/*
let currentCallback = null;
const fn = (callback) => {
  currentCallback = callback;
  callback();
}

let a =10;
const state = {};
Object.defineProperty(state, a, {
  get() {
    console.log(currentCallback);
    return a; 
  }
})

fn(()=> console.log('state.a = ${state.a}'))
*/