교육자료 코드 저장소

## 목차

1. 자바스크립트 기본기 다지기
   1. [프로토타입과 V8엔진 히든클래스 이해하기](./packages/chapter1/src/a.js)
   2. [MicroTask 큐, MacroTask 큐, 애니메이션 등 비동기 메커니즘 이해하기](./packages/chapter1/src/b.js)

## chapt1 
# 과제 A 해결
<!-- Worker.prototype.getHealth = function () {
  return this._health;
}

Worker.prototype.work = function () {
  this._health--;
}

// Object.create을 사용했는데, setPrototypeOf를 사용해도 되고 new 키워드를 사용해도 무방합니다. (new 키워드는 불필요한 처리가 추가로 들어가게 되겠지만요)
// 프로토타입 슬롯을 갖는 객체를 prototype에 할당함으로써 체이닝을 구성할 수 있다는 점만 이해하면 됩니다.
JuniorEngineer.prototype = Object.create(Worker.prototype, {});

JuniorEngineer.prototype._super = function (health) {
  // 부모 함수를 반영하기 위해 call 함수를 이용하고 있습니다.
  // 이 로직을 이해하기 위해서는 자바스크립트 함수의 동작과 this 바인딩 개념을 알아야 합니다.
  Worker.call(this, health);
}

JuniorEngineer.prototype.getIntelligence = function () {
  return this._intelligence;
}

JuniorEngineer.prototype.work = function () {
  // 만약 메서드 명이 달랐다면 this 키워드로 체이닝을 통해 바로 접근이 가능 했겠지만
  // 메서드 명이 같아서 아래와 같이 실행해줄 수 있습니다.
  Worker.prototype.work.call(this);
  this._intelligence++;
}

JuniorEngineer.prototype.isBornGenius = function () {
  return this._isBornGenius ?? false;
}  -->

# 과제 B 해결
<!-- do() {
    const taskBundleSize = 100;
    const taskBundleCount = Math.ceil(this._tasks.length / taskBundleSize);

    // 비동기로 여러 작업을 분할한다음 순서를 보장하기 위해서
    // Promise chain을 사용합니다.
    let taskChain = Promise.resolve(0);
    for (let i = 0; i < taskBundleCount; i++) {
      taskChain = taskChain.then(next => this._do(next, next + taskBundleSize));
    }

    return taskChain;
  } -->

  # 과제 C 해결
# 히든클래스 활용
# 히든 클래스 구조가 변화하지 않도록 만들어서 내부적으로 인스턴스가 재생성되는 부하를 줄입니다.
<!-- function JuniorEngineer(health, intelligence) {
  this._super(health);
  this._intelligence = intelligence ?? 1;
  // 문제 C
  this._isBornGenius = this._intelligence > 10;
} -->

# 과제 E 해결
