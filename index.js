const express = require('express');
const axios = require('axios');
const app = express();

// المصدر الذي سنأخذ منه البيانات
const SOURCE = "https://api-like.vercel.app/api/v1";

app.get('/', (req, res) => {
    res.json({ message: "API يعمل بنجاح!", developer: "Sirfreandalesi" });
});

app.get('/ff', async (req, res) => {
    const { region, uid } = req.query;
    
    if (!uid || !region) {
        return res.json({ error: "الرجاء إدخال الـ UID والمنطقة (Region)" });
    }

    try {
        const response = await axios.get(`${SOURCE}/account?region=${region.toUpperCase()}&uid=${uid}`);
        res.json({
            status: "success",
            developer: "Sirfreandalesi",
            player_data: response.data
        });
    } catch (e) {
        res.json({ error: "السيرفر المصدر لا يستجيب حالياً، حاول لاحقاً" });
    }
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT);
                                            
