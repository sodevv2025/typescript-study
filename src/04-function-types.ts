// ===== Day 4: 함수 타입 실습 =====

// 1. 매개변수 타입 - name은 string, age는 number
function introduce(name: string, age: number) {
  console.log(`이름: ${name}, 나이: ${age}`);
}

console.log("=== 매개변수 타입 ===");
introduce("홍길동", 25);


// 2. 반환 타입 - 두 숫자를 더해서 number 반환
function add(a: number, b: number): number {
  return a + b;
}

console.log("=== 반환 타입 ===");
console.log(add(10, 20));


// 3. 옵셔널 매개변수 - email은 있어도 되고 없어도 됨
function createUser(name: string, email?: string) {
  if (email) {
    console.log(`${name} (${email})`);
  } else {
    console.log(name);
  }
}

console.log("=== 옵셔널 매개변수 ===");
createUser("카리나");
createUser("윈터", "winter@asepa.com");


// 4. 기본값 매개변수 - greeting 기본값은 "안녕하세요"
function greet(name: string, greeting: string = "안녕하세요") {
  console.log(`${greeting}, ${name}!`);
}

console.log("=== 기본값 매개변수 ===");
greet("철수");
greet("영희", "반갑습니다");


// 5. void 타입 - 반환값 없는 함수
function logMessage(message: string): void {
  console.log("[LOG]", message);
}

console.log("=== void 타입 ===");
logMessage("서버 시작됨");


// 6. 함수 타입 표현식 - (a: number, b: number) => number 타입 정의
type Calculator = (a: number, b: number) => number;

const multiply: Calculator = (a, b) => a * b;
const divide: Calculator = (a, b) => a / b;

console.log("=== 함수 타입 표현식 ===");
console.log(multiply(4, 5));
console.log(divide(20, 4));