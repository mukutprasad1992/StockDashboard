import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { ProfileDto } from "../profile.dto";

@Injectable()
export class ProfileService {


    async uploadFile(profileDto: ProfileDto): Promise<any> {
        await admin.firestore().collection('users').doc(profileDto.userId).set({ profilePic: profileDto.profilePic }, { merge: true });
        const getUserInstance = await admin.firestore().collection('users').doc(profileDto.userId);
        return (await getUserInstance.get()).data();
    }

    async getUserById(userId: string): Promise<any> {
        const userRef = admin.firestore().collection('users');
        const querySnapshot = await userRef.where('userId', '==', userId).get();
        if (querySnapshot.empty) {
            return null; // No matching documents found
        }
        // Assuming there's only one matching document, so we retrieve the first one
        const documentData = querySnapshot.docs[0].data();
        return documentData;
    }

    async getAlldata(userId: string): Promise<any> {
        const query = admin.firestore().collection('users') // Replace with the name of your Firestore collection
            .where('userId', '==', userId);
        const querySnapshot = await query.get();
        const userData = [];
        querySnapshot.forEach((doc) => {
            userData.push(doc.data());
        });

    }

    async removeprofilePic(userId: string, fieldName: string): Promise<void> {
        const updateData: any = {};
        updateData[fieldName] = admin.firestore.FieldValue.delete();

        await admin.firestore().collection('users').doc(userId).update(updateData);
    }


}