import connectToDatabase from "@/lib/database";
import User from "@/models/User";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { token } = req.query;
  
    try {
      await connectToDatabase();
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
  
      const user = await User.findOne({ email, verificationToken: token });
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid or expired token' });
    }
  }