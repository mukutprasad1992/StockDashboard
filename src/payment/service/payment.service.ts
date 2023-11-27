import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PaymentDto } from '../payment.dto';


@Injectable()
export class PaymentService {

    async createPayment(paymentDto: PaymentDto): Promise<any> {

        const payment = await admin.firestore().collection('users').add(paymentDto);
        const paymentSnapshot = await payment.get();
        return paymentSnapshot
    }

    async findOne(paymentId: string): Promise<PaymentDto | null> {
        const paymentDoc = admin.firestore().doc(`users/${paymentId}`);
        const paymentSnapshot = await paymentDoc.get();

        if (!paymentSnapshot.exists) {
            return null; // Handle the case where the user doesn't exist
        }

        const paymentData = paymentSnapshot.data() as PaymentDto;
        return paymentData;
    }
}