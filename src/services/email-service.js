const sender = require('../config/emailConfig');
const cron = require('node-cron');
const TicketReposiory = require('../repository/ticket-repository')
const repo = new TicketReposiory();
const sendBasicEmail = async (mailFrom ,mailTo, mailSubject , mailBody) =>{
    try {
        const response = await sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject: mailSubject,
            text : mailBody
        })
        console.log(response);
    } catch (error) {
        console.log(error);
        }
}

const fetchPendingEmail = async (timestamp) =>{
    try {
        
        const response = repo.get({status : "PENDING"});
        return response;
        
    } catch (error) {
        console.log(error);
    }
}                                           

const updateTickets = async (ticketId,data)=>{
try {
    const response = await repo.update(ticketId,data);
    return response;
} catch (error) {
    console.log(error);
}
}

const createNotification = async (data) => {
    try {
       const response = await repo.create(data);
       return response;
    } catch (error) {
        console.log(error);
    }

}

const subscribeEvents = async (payload) =>{
    let service = payload.service
    let data = payload.data;
    switch(service){
        case 'CREATE_TICKET':
         await createNotification(data);
         break;
         case 'SEND_BASIC_EMAIL': 
         await sendBasicEmail(data);
         break;
        default : 
        console.log('No valid envent received');
        break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTickets,
    subscribeEvents
}