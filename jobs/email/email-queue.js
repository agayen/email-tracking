const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const connection = new Redis('rediss://default:AVNS_Sm725ayD3bDoRUqHwis@redis-abhijit-abhijitgayen428-80df.a.aivencloud.com:20008');
// Our job queue
// const emailsQueue = new Queue('email', { connection });

// const sendNewEmail = async (order) => {
//     emailsQueue.count().then((count)=> {console.log(count);});

//     // const name = 'jobName';
//     // const jobs = await emailsQueue.addBulk([
//     //     { name, data: { paint: 'car' } },
//     //     { name, data: { paint: 'house' } },
//     //     { name, data: { paint: 'boat' } },
//     // ]);
// };


const emailsQueue = new Worker('myqueue', async (job)=>{
    console.log(job);
}, { connection });

const sendNewEmail = () => {

};

module.exports = {
    emailsQueue,
    sendNewEmail,
};