# Day 3: 유니온 타입, 리터럴 타입, 타입 추론

## 유니온 타입 (Union Type)

**"A 또는 B"**를 표현한다. `|`로 연결.

### 기본 사용
```typescript
let value: string | number;
value = "hello";  // OK
value = 123;      // OK
value = true;     // Error! string 또는 number만 가능
```

### 여러 타입 조합
```typescript
// 2개 이상도 가능
let data: string | number | boolean;
data = "텍스트";  // OK
data = 100;       // OK
data = true;      // OK

// null, undefined 허용할 때도 자주 씀
let nickname: string | null = null;
nickname = "개발자";  // OK
nickname = null;      // OK
```

### 타입 가드

유니온 타입을 쓸 때는 `typeof`로 타입을 좁혀야 안전하게 사용할 수 있다:
```typescript
function printValue(val: string | number) {
  // val.length;  // Error! number에는 length가 없음
  
  if (typeof val === "string") {
    console.log(val.length);     // OK - 여기서는 string 확정
  } else {
    console.log(val.toFixed(2)); // OK - 여기서는 number 확정
  }
}

printValue("hello");   // 문자열 길이: 5
printValue(123.456);   // 숫자: 123.46
```

왜 타입 가드가 필요한가?
- `string | number` 타입은 string일 수도, number일 수도 있음
- string에만 있는 `.length`를 바로 쓰면 에러
- `typeof`로 확인 후 사용해야 안전

---

## 리터럴 타입 (Literal Type)

특정 **값 자체**를 타입으로 쓴다. 밸리데이션 느낌!

### 일반 타입 vs 리터럴 타입
```typescript
// 일반 타입 - 아무 문자열이나 OK
let color: string = "red";
color = "blue";      // OK
color = "asdfasdf";  // OK (아무 문자열 가능)

// 리터럴 타입 - 정해진 값만 OK
let theme: "light" | "dark" = "light";
theme = "dark";      // OK
theme = "blue";      // Error! light 또는 dark만 가능
```

### 문자열 리터럴
```typescript
let direction: "left" | "right" | "up" | "down";
direction = "left";   // OK
direction = "right";  // OK
direction = "center"; // Error! 정의된 값만 가능
```

### 숫자 리터럴
```typescript
let dice: 1 | 2 | 3 | 4 | 5 | 6;
dice = 3;   // OK
dice = 7;   // Error! 1~6만 가능
```

### 리터럴 타입의 장점
```typescript
// string으로 하면 오타 못 잡음
function setSize(size: string) { }
setSize("samll");  // 오타인데 에러 안 남!

// 리터럴 타입으로 하면 오타 잡아줌
function setSize(size: "small" | "medium" | "large") { }
setSize("samll");  // Error! 오타 잡아줌
setSize("small");  // OK
```

### 실무 활용 - type으로 정의

자주 쓰는 리터럴 타입은 `type`으로 정의해두면 재사용하기 좋다:
```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ButtonSize = "small" | "medium" | "large";
type Theme = "light" | "dark";
type Status = "pending" | "success" | "error";

let method: HttpMethod = "GET";
let size: ButtonSize = "medium";
let theme: Theme = "dark";
let status: Status = "pending";
```

---

## 타입 추론 (Type Inference)

TypeScript는 타입을 직접 안 써도 값을 보고 알아서 추론해준다.

### 기본 추론
```typescript
// 타입 명시 안 해도 자동 추론
let name = "김개발";  // string으로 추론
let age = 25;         // number로 추론
let isActive = true;  // boolean으로 추론

// 그래서 이렇게 쓰면 에러
name = 123;  // Error! string인데 number 넣으려고 함
```

### 추론 덕분에 편하다
```typescript
// 추론 없으면 매번 이렇게 써야 함 (귀찮음)
let name: string = "김개발";
let age: number = 25;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];

// 추론 있으니까 이렇게만 써도 됨 (편함)
let name = "김개발";
let age = 25;
let isActive = true;
let numbers = [1, 2, 3];
```

결과는 같은데 코드가 깔끔해진다.

### let vs const 추론 차이
```typescript
let name1 = "김개발";   // string으로 추론 (넓은 타입)
const name2 = "홍길동"; // "홍길동"으로 추론 (리터럴 타입)
```

왜 다른가?
- `let`: 나중에 다른 값 넣을 수 있으니까 넓게 추론 (string)
- `const`: 변경 불가니까 정확한 값으로 추론 ("홍길동")

### 배열 추론
```typescript
const numbers = [1, 2, 3];       // number[]로 추론
const mixed = [1, "hello"];      // (string | number)[]로 추론
const names = ["철수", "영희"];  // string[]로 추론
```

### 함수 반환 타입 추론
```typescript
function add(a: number, b: number) {
  return a + b;  // 반환 타입 number로 자동 추론
}

const result = add(1, 2);  // result는 number
```

---

## as const (const assertion)

객체나 배열을 **readonly + 리터럴 타입**으로 고정한다.

### as const 없을 때
```typescript
const config = {
  theme: "dark",
  size: 100
};

// config.theme의 타입: string (넓음)
config.theme = "light";  // OK (수정 가능)
```

### as const 있을 때
```typescript
const config = {
  theme: "dark",
  size: 100
} as const;

// config.theme의 타입: "dark" (리터럴 - 정확함)
// config.theme = "light";  // Error! readonly라서 수정 불가
```

### 배열에 as const
```typescript
// as const 없이
const colors = ["red", "green", "blue"];  // string[] 타입

// as const 있으면
const colors = ["red", "green", "blue"] as const;  
// readonly ["red", "green", "blue"] 타입 - 정확한 값들로 고정
```

### as const 정리

- **readonly**: 수정 불가
- **리터럴 타입**: 정확한 값으로 타입 고정

설정 객체처럼 절대 변경되면 안 되는 값에 사용한다.

---

## Q&A 정리

### Q1. 유니온 타입은 언제 쓰나?
하나의 변수가 여러 타입을 가질 수 있을 때. API 응답이 성공/실패 다른 구조일 때도 많이 쓴다.

### Q2. 리터럴 타입의 장점은?
특정 값만 허용해서 오타 방지, IDE 자동완성 지원, 코드 가독성 향상.

### Q3. 타입 추론이 있으면 타입 안 써도 되나?
맞다. 추론 덕분에 JavaScript처럼 편하게 쓰면서도 타입 검사 받을 수 있다. 필요할 때만 타입 명시하면 된다.

### Q4. as const는 언제 쓰나?
설정 객체처럼 절대 변경되면 안 되는 값에 사용. 타입을 더 정확하게 좁힐 때 유용하다.

### Q5. 타입 가드란?
`typeof`, `instanceof` 등으로 타입을 좁히는 것. 유니온 타입에서 특정 타입의 메서드를 안전하게 쓰려면 필요하다.