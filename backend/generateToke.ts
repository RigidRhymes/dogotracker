import jwt from 'jsonwebtoken';
import 'dotenv/config';

const token = jwt.sign(
    {
        userId: 'test-user',
        email: 'test@example.com'
    },
    process.env.JWT_SECRET as string,
    {expiresIn: '1h'}
);

console.log('Generated JWT:', token)