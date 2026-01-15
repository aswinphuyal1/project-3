import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized (Admin)" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin" || decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized (Admin)" });
        }

        req.adminEmail = decoded.email;
        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;
//