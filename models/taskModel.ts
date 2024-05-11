// export enum TaskState {
//   PENDING = "PENDING",
//   DONE = "DONE",
// }

class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  isCompleted: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    isCompleted: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.isCompleted = isCompleted;
  }
}

export default Task;
