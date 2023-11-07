import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserDTO } from './user.dto';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  async registerUser(userData: UserDTO): Promise<any> {
    const user = await admin.firestore().collection('users').add(userData);
    const userSnapshot = await user.get();
    return userSnapshot
  }

  async getUserById(userId: string): Promise<UserDTO | null> {
    const userDoc = admin.firestore().doc(`users/${userId}`);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      return null; // Handle the case where the user doesn't exist
    }

    const userData = userSnapshot.data() as UserDTO;
    return userData;
  }

  async findAll(): Promise<any[]> {
    const snapshot = await admin.firestore().collection('users').get();
    const data = [];

    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }



}
