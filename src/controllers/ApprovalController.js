const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]; //Pesquisa se o cliente está connectado

        if(bookingUserSocket){ //Se estiver connectado
            req.io.to(bookingUserSocket).emit('booking_response', booking); //Envia a resposta para o cliente
        }

        return res.json(booking);
    }
}