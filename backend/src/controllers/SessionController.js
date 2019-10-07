const User = require('../models/User');
// index, show, store, update, destroy

module.exports = {
    async store(req, res){ //Quando uma função tem um await no meio, precisa dizer que ela é async
        const { email } = req.body;

        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};