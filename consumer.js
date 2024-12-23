const { kafka } = require("./client");
const group = process.argv[2];

if (!group) {
    console.error("Error: Consumer groupId must be provided as the second argument.");
    process.exit(1);
  }

const init = async () => {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();