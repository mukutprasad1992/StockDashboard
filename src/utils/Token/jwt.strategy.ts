import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore'; // Import Firestore

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });

  }

  async validate(payload: any): Promise<any> {
    const { uid } = payload;
    const firestore = new Firestore(); // Create a Firestore instance

    try {
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw new UnauthorizedException('Login first to access this endpoint.');
      }

      // You can access the user data using userDoc.data() here
      return userDoc.data();
    } catch (error) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }
  }
}
