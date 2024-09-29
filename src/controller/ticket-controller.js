
const TicketService = require('../services/email-service');


const create = async (req,res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true ,
            data : response,
            error :{},
            message: 'succefully registerd the email reminder'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'not able to register the email reminder',
            err: error,
            data : {}

        })
    }
}
module.exports = {
    create
}