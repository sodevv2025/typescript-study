# Day 1: 제네릭(Generics) 기초

## 제네릭이란?

**"타입을 변수처럼 사용하는 것"**

함수나 인터페이스를 정의할 때 타입을 고정하지 않고, 사용할 때 타입을 지정한다.

---

## 왜 필요한가?
```typescript
// ❌ 문제 1: 타입별로 함수를 따로 만들어야 함
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

// ❌ 문제 2: any를 쓰면 타입 안전성 상실
function getFirst(arr: any[]): any {
  return arr[0];
}

// ✅ 해결: 제네릭으로 타입을 "나중에" 결정
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

getFirst<number>([1, 2, 3]);     // 반환 타입: number
getFirst<string>(['a', 'b']);    // 반환 타입: string
getFirst([true, false]);         // 타입 추론: boolean
```

---

## 기본 문법

### 함수에서 제네릭
```typescript
// 일반 함수
function identity<T>(value: T): T {
  return value;
}

// 화살표 함수
const identity2 = <T>(value: T): T => value;
```

### 인터페이스에서 제네릭
```typescript
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };
```

### 타입 별칭에서 제네릭
```typescript
type Pair<T, U> = {
  first: T;
  second: U;
};

const pair: Pair<string, number> = { first: "age", second: 25 };
```

---

## 여러 타입 매개변수
```typescript
function swap<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}

swap<string, number>(['hello', 42]);  // [42, 'hello']
swap([true, 'yes']);                   // 추론: [string, boolean]
```

---

## 제약조건 (extends)

`T`가 아무 타입이나 되면 안 될 때, 제약을 건다:
```typescript
// ❌ T에 length가 있는지 모름
function getLength<T>(value: T): number {
  return value.length;  // 에러!
}

// ✅ length 속성을 가진 타입만 허용
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength('hello');     // ✅ string은 length 있음
getLength([1, 2, 3]);   // ✅ 배열도 length 있음
getLength(123);         // ❌ number는 length 없음
```

---

## 기본 타입 매개변수

타입을 지정 안 하면 기본값 사용:
```typescript
interface Container<T = string> {
  value: T;
}

const strBox: Container = { value: 'hello' };      // T = string (기본값)
const numBox: Container<number> = { value: 42 };   // T = number
```

---

## Q&A 정리

### Q1. 제네릭을 왜 쓰나요? any랑 뭐가 다른가요?

둘 다 "여러 타입을 받을 수 있다"는 점은 같지만, 결정적인 차이가 있다:

| 구분 | any | 제네릭 |
|------|-----|--------|
| 타입 검사 | 포기 | 유지 |
| 반환 타입 | any (추적 불가) | 정확한 타입 |
| 잘못된 사용 | 컴파일 통과 → 런타임 에러 | 컴파일 에러 → 미리 발견 |
```typescript
// any - 타입 정보 잃음
function getFirst(arr: any[]): any { 
  return arr[0]; 
}
const result = getFirst([1, 2, 3]);  // result는 any
result.toUpperCase();  // 컴파일 통과, 런타임에 터짐!

// 제네릭 - 타입 정보 유지
function getFirst<T>(arr: T[]): T { 
  return arr[0];
}
const result = getFirst([1, 2, 3]);  // result는 number
result.toUpperCase();  // 컴파일 에러! 미리 버그 발견
```

**결론**: any는 TypeScript 쓰는 의미를 없앤다. 제네릭은 유연함과 타입 안전성을 둘 다 챙긴다.

### Q2. `<T>`에서 T 말고 다른 이름 써도 되나요?

된다. 관례적으로 쓰는 이름들:
- `T`: Type (일반적인 타입)
- `K`: Key (객체 키)
- `V`: Value (객체 값)
- `E`: Element (배열 요소)

### Q3. 언제 제네릭을 쓰나요?

- 여러 타입에서 동작하는 함수/클래스 만들 때
- 타입 안전성을 유지하면서 재사용성 높이고 싶을 때
- 배열, 객체 등 컨테이너 타입 정의할 때