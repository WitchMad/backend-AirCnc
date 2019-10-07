const Booking = require('../models/Booking');

module.exports = {
    async index(req, res){
        const { user_id } = req.headers;

        const bookings = await Booking.find({ user: user_id }).populate('spot');

        return res.json(bookings);
    }
}