import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : "7d",  
    });
    
    // Set the token as a cookie
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // Cookie expires in 7 days (in milliseconds)
        httpOnly: true,          // Prevents client-side JavaScript from accessing the cookie
        sameSite: "strict",      // Protects against CSRF attacks
        secure: process.env.NODE_ENV !=="development",  // Only send over HTTPS in production
    });
    
    return token;  
}