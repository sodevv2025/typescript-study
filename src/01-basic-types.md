# Day 1: TypeScript 기본 타입

## 왜 TypeScript인가?

JavaScript는 **동적 타입** 언어다. 변수에 아무 값이나 넣을 수 있다:
```javascript
let value = "문자열";
value = 123;      // 가능
value = true;     // 가능
```

편해 보이지만 문제가 있다:
- 코드가 커지면 "이 변수에 뭐가 들어있지?" 헷갈림
- 런타임에 예상치 못한 에러 발생
- IDE 자동완성 지원이 약함

TypeScript는 **정적 타입**을 추가해서 이 문제를 해결한다.
컴파일 단계에서 타입 오류를 잡아주니까 실행 전에 버그를 발견할 수 있다.

---

## 기본 타입 종류

| 타입 | 설명 | 예시 |
|------|------|------|
| `string` | 문자열 | `"hello"`, `'world'` |
| `number` | 숫자 (정수, 소수 구분 없음) | `123`, `3.14` |
| `boolean` | 참/거짓 | `true`, `false` |
| `array` | 배열 | `[1, 2, 3]` |
| `null` | 값이 없음 (의도적) | `null` |
| `undefined` | 값이 정의되지 않음 | `undefined` |
| `any` | 아무 타입 (타입 검사 안 함) | 가급적 사용 금지 |
| `unknown` | 타입 모름 (any보다 안전) | - |

---

## 타입 선언 방법

변수 뒤에 `: 타입`을 붙인다:
```typescript
let 변수명: 타입 = 값;
```

### 예시
```typescript
let userName: string = "홍길동";
let age: number = 25;
let isActive: boolean = true;
```

---

## 타입 추론 (Type Inference)

TypeScript는 타입을 명시하지 않아도 값을 보고 자동으로 추론한다:
```typescript
let name = "홍길동";  // string으로 추론
let count = 100;      // number로 추론
```

그럼 언제 타입을 명시하나?
- 타입 추론이 애매할 때
- 코드 가독성을 높이고 싶을 때
- 초기값 없이 선언할 때

---

## 배열 타입

두 가지 표기법이 있다:
```typescript
// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3];
let names: string[] = ["철수", "영희"];

// 방법 2: Array<타입>
let fruits: Array<string> = ["사과", "바나나"];
```

둘 다 같은 의미. `타입[]` 방식이 더 많이 쓰인다.

---

## 튜플 (Tuple)

길이와 각 위치의 타입이 고정된 배열:
```typescript
let person: [string, number] = ["홍길동", 30];
// person[0]은 string, person[1]은 number
```

배열 vs 튜플:
- **배열**: 길이 제한 없음, 같은 타입 여러 개
- **튜플**: 길이 고정, 각 위치마다 타입 지정
```typescript
// 배열 - 몇 개든 OK
let scores: number[] = [90, 85, 100, 77];

// 튜플 - 딱 2개, [이름, 나이] 고정
let person: [string, number] = ["홍길동", 30];
```

실무 예시: React의 `useState` 반환값 `[state, setState]`가 튜플이다.

---

## null vs undefined

둘 다 "값이 없음"이지만 의미가 다르다:

- **null**: 의도적으로 비워둔 것. "값 없음"을 명시적으로 할당
- **undefined**: 값이 아직 정의되지 않은 상태
```typescript
let a;              // undefined (값을 안 넣음)
let b = null;       // null (일부러 비움)
```

---

## any vs unknown

### any
타입 검사를 완전히 끈다. JavaScript처럼 동작:
```typescript
let anything: any = "문자열";
anything = 123;   // OK
anything.foo();   // 컴파일 에러 안 남 (런타임에 터짐)
```

**가급적 사용 금지!** TypeScript 쓰는 의미가 없어진다.

### unknown
타입을 모르지만 안전하게 다루고 싶을 때:
```typescript
let value: unknown = "문자열";
// value.length;  // 에러! 바로 사용 불가

// 타입 확인 후 사용해야 함
if (typeof value === "string") {
  console.log(value.length);  // OK
}
```

외부 API 응답처럼 타입을 모를 때 `unknown` 쓰고, 타입 가드로 확인 후 사용하는 게 안전하다.

### 정리
- **any**: 타입 검사 무시. 아무 메서드나 호출 가능 (런타임에 터질 수 있음)
- **unknown**: 타입을 모름. 타입 확인 전까지 아무 것도 못 함 (안전함)

---

## Q&A 정리

### Q1. JavaScript는 동적 타입인데 TypeScript는 왜 정적 타입을 쓰나요?
변수가 많아지면 해당 변수의 타입이 헷갈리게 되어 런타임 환경에서 예상치 못한 버그가 발생할 수 있다. TypeScript를 사용하면 컴파일 단계에서 버그가 발견되어 디버깅이 편하다.

### Q2. `let age = 25;`라고 쓰면 타입을 안 썼는데 에러가 안 나는 이유?
TypeScript는 타입 추론 기능이 있어서 값을 보고 자동으로 타입을 추론한다. 그래서 타입을 명시하지 않아도 에러가 나지 않는다.

### Q3. any와 unknown의 차이는?
- **any**: 어떤 타입이든 OK. 아무 메서드나 호출 가능 (위험함)
- **unknown**: 타입을 모름. 타입 가드로 확인 후에만 사용 가능 (안전함)

### Q4. null과 undefined의 차이는?
- **null**: 의도적으로 비워둔 것
- **undefined**: 값이 아직 정의되지 않은 상태

### Q5. `number[]`와 `Array<number>`는 뭐가 다른가요?
쓰는 방식만 다르고 실질적으로 같다. 둘 다 숫자 배열을 의미한다.

### Q6. 배열과 튜플은 언제 구분해서 쓰나요?
- **배열**: 같은 타입의 값을 여러 개 담을 때 (길이 제한 없음)
- **튜플**: 각 위치마다 다른 타입이 고정되어야 할 때 (길이 고정)

### Q7. JS → TS 마이그레이션 순서?
1. `tsconfig.json` 설정
2. `.js` 파일을 `.ts`로 확장자 변경
3. 에러나는 부분에 타입 추가
4. `strict` 옵션 점진적으로 켜기