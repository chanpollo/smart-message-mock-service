import { Router, Request, Response } from 'express';

export const nmgwRouter = Router();

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

nmgwRouter.get('/sms', (req: Request, res: Response) => {
  res.json(users);
});
