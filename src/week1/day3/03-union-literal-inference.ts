// ===== Day 3: 유니온 타입, 리터럴 타입, 타입 추론 =====

// 1. 유니온 타입 - 여러 타입 허용
let value: string | number;
value = "hello";  // value = true;
value = 123;      // Error! string 또는 number만 가능

console.log("=== 유니온 타입 ===");
console.log(value);

// 2. 타입 가드 - typeof로 타입 좁히기
function printValue(val: string | number) {
  if (typeof val === "string") {
    console.log("문자열 길이:", val.length);
  } else {
    console.log("숫자:", val.toFixed(2));
  }
}

console.log("=== 타입 가드 ===");
printValue("hello");
printValue(123.456);

// 3. 리터럴 타입 - 특정 값만 허용
let direction: "left" | "right" | "up" | "down";
direction = "left";
// direction = "center";  // Error! 정의된 값만 가능

console.log("=== 리터럴 타입 ===");
console.log(direction);

// 4. type으로 리터럴 타입 정의
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

let method: HttpMethod = "GET";
// method = "PATCH";  // Error!

console.log("=== type 정의 ===");
console.log(method);

// 5. as const - 객체 고정 (readonly + 리터럴)
const config = {
  theme: "dark",
  size: "small"
} as const;
// config.theme = "light";  // Error! readonly라서 수정 불가

console.log("=== as const ===");
console.log(config.theme, config.size);