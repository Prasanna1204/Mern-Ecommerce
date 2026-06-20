import jwt from "jsonwebtoken";

const token = (User)=>{
    return jwt.sign(
    {
        id: User._id,
        role: User.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "30d"
    }
)
};
export default token;
