const axios = require('axios');

module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: "الرجاء إرسال الـ UID" });
    }

    try {
        // طلب البيانات من Shop2Game
        const response = await axios.post('https://shop2game.com/api/auth/get_user_info/multi', {
            "app_id": 100067,
            "login_id": uid,
            "app_server_id": 0
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (response.data && response.data.nickname) {
            res.json({
                status: "success",
                player_data: {
                    nickname: response.data.nickname,
                    uid: uid
                }
            });
        } else {
            res.json({ status: "error", message: "اللاعب غير موجود" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "فشل الاتصال بـ Shop2Game" });
    }
};
        
