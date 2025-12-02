# Day 4: 함수 타입

## 함수 매개변수 타입

함수의 매개변수에 타입을 지정한다:
```typescript
function greet(name: string) {
  console.log("안녕, " + name);
}

greet("홍길동");  // OK
greet(123);       // Error! string만 가능
```

### 여러 매개변수
```typescript
function add(a: number, b: number) {
  return a + b;
}

add(1, 2);       // OK
add("1", "2");   // Error!
```

---

## 함수 반환 타입

함수가 뭘 반환하는지 명시할 수 있다. `: 타입`을 매개변수 괄호 뒤에 쓴다:
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return "안녕, " + name;
}
```

### 타입 추론으로 생략 가능
```typescript
// 반환 타입 안 써도 자동 추론됨
function add(a: number, b: number) {
  return a + b;  // number로 추론
}
```

언제 명시하나?
- 복잡한 함수에서 명확하게 하고 싶을 때
- 팀 컨벤션으로 명시하기로 했을 때

---

## 옵셔널 매개변수 (?)

있어도 되고 없어도 되는 매개변수:
```typescript
function greet(name: string, age?: number) {
  if (age) {
    console.log(`${name}, ${age}살`);
  } else {
    console.log(name);
  }
}

greet("카리나");       // OK
greet("윈터", 24);   // OK
```

**주의**: 옵셔널 매개변수는 필수 매개변수 뒤에 와야 한다.
```typescript
// Error! 옵셔널이 앞에 오면 안 됨
function greet(age?: number, name: string) { }

// OK
function greet(name: string, age?: number) { }
```

---

## 기본값 매개변수

매개변수에 기본값을 줄 수 있다:
```typescript
function greet(name: string, greeting: string = "안녕") {
  console.log(`${greeting}, ${name}`);
}

greet("김개발");           // "안녕, 김개발"
greet("김개발", "반가워"); // "반가워, 김개발"
```

기본값이 있으면 타입 추론도 된다:
```typescript
// greeting은 string으로 추론됨
function greet(name: string, greeting = "안녕") {
  console.log(`${greeting}, ${name}`);
}
```

---

## void 타입

반환값이 없는 함수:
```typescript
function logMessage(message: string): void {
  console.log(message);
  // return 없음
}
```

`void`는 "아무것도 반환하지 않는다"는 의미.

---

## never 타입

절대 반환하지 않는 함수:
```typescript
// 에러를 던져서 끝나는 함수
function throwError(message: string): never {
  throw new Error(message);
}

// 무한 루프
function infiniteLoop(): never {
  while (true) { }
}
```

### void vs never 차이

- **void**: 함수가 끝나지만 반환값이 없음
- **never**: 함수가 끝나지 않음 (에러 또는 무한루프)

---

## 함수 타입 표현식

함수 자체의 타입을 정의할 수 있다:
```typescript
// 함수 타입 정의
type MathOperation = (a: number, b: number) => number;

// 함수 타입 사용
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;
```

### 콜백 함수에 활용
```typescript
type Callback = (result: string) => void;

function fetchData(callback: Callback) {
  // 데이터 가져온 후
  callback("성공!");
}

fetchData((result) => {
  console.log(result);
});
```

---

## Q&A 정리

### Q1. 반환 타입 꼭 써야 하나?
아니다. 타입 추론이 되기 때문에 생략 가능. 복잡한 함수나 팀 컨벤션에 따라 명시하면 된다.

### Q2. 옵셔널(?)과 기본값의 차이는?
- 옵셔널: 값이 없으면 `undefined`
- 기본값: 값이 없으면 지정한 기본값 사용

### Q3. void와 never 언제 쓰나?
- void: console.log만 하는 함수, 이벤트 핸들러 등
- never: 에러 던지는 함수, 무한루프 (거의 안 씀)

### Q4. 함수 타입 표현식은 언제 쓰나?
콜백 함수 타입 정의할 때, 같은 형태의 함수 여러 개 만들 때 유용하다.