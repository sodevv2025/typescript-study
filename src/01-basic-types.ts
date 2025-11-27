// ===== Day 1: 기본 타입 실습 =====

// 1. 기본 타입
let userName: string = "홍길동";
let age: number = 25;
let isActive: boolean = true;

console.log("=== 기본 타입 ===");
console.log(userName, age, isActive);

// 2. 배열
let numbers: number[] = [1, 2, 3];
let names: string[] = ["철수", "영희"];
let fruits: Array<string> = ["사과", "바나나"];

console.log("=== 배열 ===");
console.log(numbers, names, fruits);

// 3. 튜플
let person: [string, number] = ["홍길동", 30];

console.log("=== 튜플 ===");
console.log(person[0], person[1]);

// 4. 타입 추론
let inferredString = "자동으로 string";
let inferredNumber = 100;

console.log("=== 타입 추론 ===");
console.log(inferredString, inferredNumber);

// 5. null vs undefined
let emptyValue: null = null;
let notDefined: undefined = undefined;

console.log("=== null vs undefined ===");
console.log(emptyValue, notDefined);

// 6. any vs unknown
let anyValue: any = "문자열";
anyValue = 123;
console.log("=== any ===");
console.log(anyValue);

let unknownValue: unknown = "문자열";
if (typeof unknownValue === "string") {
  console.log("=== unknown (타입 가드 후) ===");
  console.log(unknownValue.length);
}