const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

const login = async(req, res) => {
    const codes = req.body;
    try {
        const compare = await Admin.findOne({
            code: codes
        }); 
        if(!compare) {
            return res.status(401).json({
                code: 401,
                message: "코드가 일치하지 않습니다.",
            });
        }
        const token = jwt.sign({
            code: Admin.code,
        }, process.env.JWT_SECRET, {
            expiresIn: "15h",
            issuer: "submit",
        });
        res.json({
            code: 200,
            message: "토큰이 발급되었습니다",
            authentication: token,
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "서버 에러",
        });
    }
};

const logout = function(req, res) {
    res.status(302).json({
        message: "로그아웃 성공"
    });
};

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(302).json({
            message: "로그인이 필요합니다."
        });
    }
};

module.exports = {
    login,
    logout,
    isLoggedIn,
};