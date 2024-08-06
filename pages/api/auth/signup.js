import connectToDatabase from "@/lib/database";
import User from "@/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { email, password } = req.body;
  
    try {
      await connectToDatabase();
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

    
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      const user = new User({
        email,
        password: hashedPassword,
        verificationToken,
      });
  
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${verificationToken}`;
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Please click the link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
      });
  
      res.status(201).json({ message: 'User created. Please check your email for verification.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }