const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user]; //Pesquisa se o dono do spot está connectado

        if(ownerSocket){ //Se estiver connectado
            req.io.to(ownerSocket).emit('booking_request', booking); //Envia o booking para o usuario
        }

        return res.json(booking);
    }
};