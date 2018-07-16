import { BaseEntity } from '../shared/helpers/base.entity';
import { Token } from './token.model';

export interface User extends BaseEntity {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserAccount {
  user?: User;
  token?: Token;
}
