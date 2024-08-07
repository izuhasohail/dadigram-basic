import connectToDatabase from "@/lib/database";
import User from "@/models/User";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  try {
    await connectToDatabase();

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Find the user and verify the email
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Update the user as verified and remove the token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect the user to the login page with a success message
    res.redirect(302, `/login?verified=true`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
}
