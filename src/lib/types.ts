export type UserStatus = 0 | 1 | 2; // 0: 未激活, 1: 已激活, 2: 已禁用
export type VerifyStatus = 'none' | 'pending' | 'verified' | 'rejected';

export interface User {
  id: number;
  email: string;
  username: string;
  status: UserStatus;
  verify_status: VerifyStatus;
  token?: string;
  // ... other fields
} 