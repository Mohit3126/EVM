import cron from 'node-cron';
import {User} from "../models/user.model.js";


cron.schedule('*/5 * * * *', async () => {
    const now = new Date();


    const result = await User.deleteMany({
        isVerified: false,
        otpExpiresAt: { $lt: now },
        otpAttempts: { $gte: 3 }
    })

    if (result.deletedCount > 0) {
        console.log(`Deleted ${result.deletedCount} unverified users with expired OTPs and more than 3 attempts.`);
    } else {
        console.log('No unverified users to delete.');
    }
})