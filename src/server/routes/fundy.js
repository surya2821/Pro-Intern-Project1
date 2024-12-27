import express from 'express';
import Fund from '../models/Fund.js';

const router = express.Router();

const fundy = async (req, res) => {
    try {
        const { fullName, email, phone, address, city, country } = req.body;
        const fund = new Fund({ fullName, email, phone, address, city, country });
        await fund.save();
        res.status(201).json({ message: 'Fund created successfully' });

        console.log('sucess', fullName, email, phone, address, city, country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


router.post('/', fundy);


export default router;