// ===== Week 1 미니 프로젝트: Todo 관리 =====

// 1. 우선순위 타입 정의 (리터럴 타입)
type Priority = "low" | "medium" | "high"

// 2. Todo interface 정의
interface Todo {
  id: number
  title: string
  completed: boolean
  priority: Priority
  dueDate?: string
}

// 3. createTodo 함수 - 새 할 일 생성해서 반환
// 매개변수: id, title, priority, dueDate(옵셔널)
// 반환: Todo
function createTodo(
  id: number,
  title: string,
  priority: Priority,
  dueDate?: string
): Todo {
  const todo: Todo = {
    id,
    title,
    completed: false,
    priority
  };
  
  if (dueDate) {
    todo.dueDate = dueDate;
  }
  
  return todo;
}

// 4. toggleComplete 함수 - completed 상태 반전해서 새 Todo 반환
// 매개변수: todo (Todo 타입)
// 반환: Todo
function toggleComplete(todo: Todo): Todo {
  return {
    ...todo,
    completed: !todo.completed
  } 
}

// 5. filterByPriority 함수 - 해당 우선순위인 Todo만 필터링
// 매개변수: todos (Todo 배열), priority (Priority 타입)
// 반환: Todo 배열
function filterByPriority(todos: Todo[], priority: Priority): Todo[] {
  return todos.filter(t => t.priority === priority)
}

// 6. printTodo 함수 - 할 일 정보 출력 (반환값 없음)
// 매개변수: todo (Todo 타입)
function printTodo(todo: Todo): void {
  console.log(todo)
}


// ===== 테스트 코드 =====
console.log("=== Todo 생성 ===");
const todo1 = createTodo(1, "TypeScript 공부", "high", "2024-12-01");
const todo2 = createTodo(2, "운동하기", "medium");
const todo3 = createTodo(3, "책 읽기", "low");

printTodo(todo1);
printTodo(todo2);
printTodo(todo3);

console.log("\n=== 완료 상태 토글 ===");
const completedTodo = toggleComplete(todo1);
printTodo(completedTodo);

console.log("\n=== 우선순위 필터링 ===");
const todos = [todo1, todo2, todo3];
const highPriorityTodos = filterByPriority(todos, "high");
console.log("높은 우선순위:", highPriorityTodos.length, "개");