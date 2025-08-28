export interface Task {
  id: string;
  stage: number;
  message: string;
  completed?: boolean;
}

export const tasks: Task[] = [
  { id: 'task1', stage: 1, message: 'Fix login validation' },
  { id: 'task2', stage: 1, message: 'Update database schema' },
  { id: 'task3', stage: 1, message: 'Refactor CSS' },
  { id: 'task4', stage: 2, message: 'Implement unit tests' },
  { id: 'task5', stage: 2, message: 'Fix alt text in images' },
  { id: 'task6', stage: 2, message: 'Add input validation' },
];
