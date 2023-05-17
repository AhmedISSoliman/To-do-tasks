import { UserList } from './user-list.model';
export interface UserListResponse {
  users: UserList[];
  totalItems: number;
}
