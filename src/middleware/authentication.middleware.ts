import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req['user'] = decodedToken; // Attach the decoded token to the request object for further use
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Please Enter Valid Token' });
    }
  }
}
