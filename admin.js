const {kafka} = require('./client')

const init = async () => {
    const admin = kafka.admin();
    console.log('[x] Admin connecting...')
    await admin.connect();
    console.log('[x] Admin Connected Success')

    console.log('[x] Creating Topics [rider-updates]')
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2
            }
        ]
    })
    console.log('[x] Topic Created Success')
    
    await admin.disconnect();
    console.log('[x] Admin disconnected successfully')
}

init()