export interface UserList {
  _id: string;
  username: string;
  email: string;
  assignedTasks: number;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  password?: string;
}

