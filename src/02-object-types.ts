// ===== Day 2: 객체 타입 실습 =====

// 1. 인라인 타입
const user1: { name: string; age: number } = {
  name: "홍길동",
  age: 25
};

console.log("=== 인라인 타입 ===");
console.log(user1);

// 2. interface
interface User {
  name: string;
  age: number;
}

const user2: User = {
  name: "홍길동",
  age: 30
};

console.log("=== interface ===");
console.log(user2);

// 3. type
type Product = {
  id: number;
  name: string;
  price: number;
};

const product: Product = {
  id: 1,
  name: "노트북",
  price: 1500000
};

console.log("=== type ===");
console.log(product);

// 4. 옵셔널 속성
interface Member {
  name: string;
  age: number;
  email?: string;
}

const member1: Member = { name: "철수", age: 20 };
const member2: Member = { name: "영희", age: 22, email: "young@test.com" };

console.log("=== 옵셔널 속성 ===");
console.log(member1);
console.log(member2);

// 5. readonly 속성
interface Article {
  readonly id: number;
  title: string;
  content: string;
}

const article: Article = {
  id: 1,
  title: "TypeScript 배우기",
  content: "오늘은 객체 타입을 배웠다."
};

article.title = "제목 수정";  // OK
// article.id = 2;            // Error! 주석 해제하면 에러 확인 가능

console.log("=== readonly ===");
console.log(article);

// 6. interface 확장
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "멍멍이",
  breed: "골든리트리버"
};

console.log("=== interface 확장 ===");
console.log(dog);

// 7. type 확장 (intersection)
type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
  department: string;
};

const employee: Employee = {
  name: "박사원",
  employeeId: 12345,
  department: "개발팀"
};

console.log("=== type 확장 ===");
console.log(employee);

// 8. 유니온 타입 (type만 가능)
type Status = "pending" | "success" | "error";
type ID = string | number;

const status: Status = "success";
const userId: ID = 123;
const oderId: ID = "ORD-001";

console.log("=== 유니온 타입 ===");
console.log(status, userId, oderId);