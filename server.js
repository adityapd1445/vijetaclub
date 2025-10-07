const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/vijeta-club', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("🗄️  MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sginvoker@gmail.com',
    pass: 'uoqk uulj acia nwyu' // Your Gmail App Password
  }
});

// Signup - create new user
app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: 'User registered!' });
  } catch (error) {
    if (error.code === 11000) return res.json({ success: false, error: 'Email already exists.' });
    res.status(500).json({ success: false, error: 'Registration error.' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, error: 'User not found.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, error: 'Incorrect password.' });
    res.json({ success: true, user: { email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login error.' });
  }
});

// Send password reset email
app.post('/api/send-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }
  const resetLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`;
  try {
    await transporter.sendMail({
      from: '"Vijeta Club" <sginvoker@gmail.com>',
      to: email,
      subject: 'Password Reset Request - Vijeta Club',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ffbf69; text-align: center;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested a password reset for your Vijeta Club account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #ffbf69; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetLink}</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>Vijeta Club Team</p>
        </div>
      `
    });
    console.log(`Password reset email sent to: ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, error: 'Could not send email.' });
  }
});

// Reset password: update user's password in database
app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ success: false, error: 'Email and new password are required.' });
  }
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const result = await User.updateOne({ email }, { $set: { password: hashed } });
    if (result.matchedCount === 0) return res.json({ success: false, error: 'User not found.' });
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating password.' });
  }
});


app.listen(4000, () => {
  console.log('🚀 Server started on http://localhost:4000');
  console.log('📧 Email service ready for sginvoker@gmail.com');
  console.log('🗄️  User database with password hashing enabled');
});
