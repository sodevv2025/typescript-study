# Day 2: 객체 타입, interface vs type

## 객체 타입이란?

JavaScript에서 객체는 가장 많이 쓰는 자료구조다:
```javascript
const user = {
  name: "홍길동",
  age: 25
};
```

TypeScript에서는 이 객체의 **구조(어떤 속성이 있고, 각 속성의 타입은 뭔지)**를 정의할 수 있다.

---

## 객체 타입 정의하는 3가지 방법

### 1. 인라인 타입

변수 선언할 때 바로 타입 정의:
```typescript
const user: { name: string; age: number } = {
  name: "김개발",
  age: 25
};
```

간단하지만 재사용이 안 돼서 여러 곳에서 같은 구조를 쓸 때 불편하다.

---

### 2. interface

객체의 구조를 이름 붙여서 정의:
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "김개발",
  age: 25
};
```

---

### 3. type (타입 별칭)

`type` 키워드로 정의:
```typescript
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "김개발",
  age: 25
};
```

---

## interface vs type 차이

| 구분 | interface | type |
|------|-----------|------|
| 용도 | 객체 구조 정의 | 모든 타입에 별칭 붙이기 |
| 확장 | `extends`로 확장 | `&`(intersection)로 확장 |
| 중복 선언 | 가능 (자동 병합) | 불가능 (에러) |
| 유니온 타입 | 불가능 | 가능 |

### 확장 예시
```typescript
// interface 확장
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// type 확장
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};
```

### 중복 선언 (Declaration Merging)
```typescript
// interface - 자동 병합됨
interface User {
  name: string;
}

interface User {
  age: number;
}
// 결과: User는 { name: string; age: number }

// type - 에러!
type User = { name: string };
type User = { age: number };  // Error: Duplicate identifier
```

### 유니온 타입
```typescript
// type만 가능
type Status = "pending" | "success" | "error";
type ID = string | number;

// interface로는 불가능
```

---

## 언제 뭘 쓰나?

실무에서는 이렇게 많이 쓴다:

- **interface**: 객체 구조 정의할 때 (API 응답, props 등)
- **type**: 유니온 타입, 복잡한 타입 조합할 때

회사 컨벤션 따라가면 되고, 둘 다 알아두면 좋다.

---

## 옵셔널 속성 (?)

있어도 되고 없어도 되는 속성:
```typescript
interface User {
  name: string;
  age: number;
  email?: string;  // 옵셔널
}

const user1: User = { name: "김개발", age: 25 };  // OK
const user2: User = { name: "홍길동", age: 30, email: "hong@test.com" };  // OK
```

---

## readonly 속성

수정 불가능한 속성:
```typescript
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "김개발" };
user.name = "홍길동";  // OK
user.id = 2;           // Error! readonly라서 수정 불가
```

---

## Q&A 정리

### Q1. 인라인 타입은 언제 쓰나?
한 번만 쓰는 간단한 객체일 때. 재사용할 거면 interface나 type으로 분리하는 게 좋다.

### Q2. interface와 type 중 뭘 써야 하나?
- 객체 구조 정의: interface
- 유니온 타입, 복잡한 조합: type
- 회사 컨벤션 따라가면 됨

### Q3. 옵셔널(?)은 언제 쓰나?
필수가 아닌 속성에 사용. API 응답에서 있을 수도 없을 수도 있는 필드에 많이 쓴다.

### Q4. readonly는 언제 쓰나?
절대 변경되면 안 되는 값. ID, 생성일시 같은 필드에 사용한다.

### Q5. extends와 &의 차이는?
- `extends`: interface 확장용
- `&`: type 확장용 (intersection)
- 결과는 비슷하지만 문법이 다름