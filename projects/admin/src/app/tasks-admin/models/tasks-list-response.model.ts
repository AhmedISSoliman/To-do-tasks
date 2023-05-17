import { UserList } from "./user-list.model";

export interface TasksListResponse {
  tasks: TasksListModel[];
  totalItems: number;
}

export interface TasksListModel {
  _id: string;
  title: string;
  userId: UserList;
  image: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
