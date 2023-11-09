import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserDTO } from './user.dto';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  async registerUser(userData: UserDTO): Promise<any> {
    const { email } = userData;
    if (await this.emailExists(email)) {
      throw new NotFoundException('Email already exists');
    }
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

  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = admin.firestore().collection('users').doc(userId); // Replace 'users' with your Firestore collection name
      await userRef.delete();
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }


  async update(userId: string, updateData: Record<string, any>): Promise<Record<string, any>> {
    const userRef = admin.firestore().collection('users').doc(userId);

    try {
      await userRef.update(updateData);
      const updatedUser = (await userRef.get()).data();
      if (updatedUser) {
        return updatedUser;
      } else {
        throw new Error(`User not found after update.`);
      }
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const querySnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
    return !querySnapshot.empty;
  }

}
