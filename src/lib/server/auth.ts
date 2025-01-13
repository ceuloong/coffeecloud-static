import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { User } from '$lib/types';

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as User & {
    iat: number;
    exp: number;
  };
} 