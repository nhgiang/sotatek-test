import { Piority } from './enums';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  piority: Piority;
}
