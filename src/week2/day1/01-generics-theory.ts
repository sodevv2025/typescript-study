// ===================
// 제네릭 기초 실습
// ===================

// 1. 배열의 마지막 요소를 반환하는 함수
function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log('=== 1. getLast ===');
console.log(getLast([1, 2, 3]));        // 3
console.log(getLast(['a', 'b', 'c']));  // 'c'


// 2. 두 값을 객체로 묶어주는 함수
function makePair<T, U>(first: T, second: U): { first: T; second: U } {
  return { first, second };
}

console.log('\n=== 2. makePair ===');
console.log(makePair('name', 42));     // { first: 'name', second: 42 }
console.log(makePair(true, [1, 2]));   // { first: true, second: [1, 2] }


// 3. 제네릭 인터페이스 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const userResponse: ApiResponse<{ name: string; age: number }> = {
  success: true,
  data: { name: '님', age: 25 }
};

const listResponse: ApiResponse<string[]> = {
  success: true,
  data: ['item1', 'item2']
};

console.log('\n=== 3. ApiResponse ===');
console.log(userResponse);
console.log(listResponse);


// 4. 제약조건이 있는 제네릭
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

console.log('\n=== 4. findById ===');
console.log(findById(users, 1));  // { id: 1, name: 'Alice' }
console.log(findById(users, 3));  // undefined


// 5. 기본 타입 매개변수
interface Stack<T = string> {
  items: T[];
  push(item: T): void;
  pop(): T | undefined;
}

const stringStack: Stack = { 
  items: [],
  push(item) { this.items.push(item); },
  pop() { return this.items.pop(); }
};

const numberStack: Stack<number> = {
  items: [],
  push(item) { this.items.push(item); },
  pop() { return this.items.pop(); }
};

console.log('\n=== 5. Stack ===');
stringStack.push('hello');
stringStack.push('world');
console.log(stringStack.items);  // ['hello', 'world']
console.log(stringStack.pop());  // 'world'

numberStack.push(10);
numberStack.push(20);
console.log(numberStack.items);  // [10, 20]
console.log(numberStack.pop());  // 20