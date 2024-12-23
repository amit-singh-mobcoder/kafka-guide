# [Apache Kafka](https://medium.com/swlh/apache-kafka-what-is-and-how-it-works-e176ab31fcd5)
- **Apache Kafka is a distributed event streaming platform** widely used for building real-time data pipelines and applications.
- Kafka works on a **pub-sub model**, allowing decoupling of producers and consumers.
- Kafka has **High Throughput**
- **Throughput** means how many operationn we can perform per second
- Kafka relies on [**ZooKeeper**](https://www.openlogic.com/blog/using-kafka-zookeeper) (or **KRaft** in newer versions) for metadata management.

What is an “**A distributed streaming platform**”? First, we need to define what is a **stream**. For that, I have a definition that made me really understand it: **Streams are just infinite data, data that never end. It just keeping arriving, and you can process it in real-time**.

And distributed? Distributed means that Kafka works in a cluster, each node in the cluster is called **Broker**. Those brokers are just servers executing a copy of apache Kafka.

So, basically, **Kafka is a set of machines working together to be able to handle and process real-time infinite data**.

## Use Cases
- **Message queuing**
- **Real-time analytics**
- **Log aggregation**
- **Event sourcing**
- **Microservices communication**

## Core Concepts
- **Producer**: Sends messages to Kafka topics.
- **Consumer**: Reads messages from Kafka topics.
- **Broker**: A Kafka server that stores data and serves client requests. - Kafka is often deployed as a cluster of brokers.
- **Topic**: A logical channel to which producers send messages and consumers read them.Topics can have multiple `partitions` for parallelism and scalability.
- **Partition**: Subdivision of a topic that stores a portion of the messages. Each partition is ordered and immutable.
- **Offset**: A unique identifier for each message within a partition.
- **Consumer Group**: A collection of consumers working together to consume data from a topic's partitions.

## Durability and Fault Tolerance
**Replication**
- Each partition can have replicas distributed across brokers.
- One replica is the leader, and others are followers.

**Leader and Followers**
- The leader handles all reads and writes.
- Followers replicate data and take over if the leader fails.

**Acknowledgments**
- Producers can configure acknowledgment settings to ensure data persistence.

## Key Configurations
**Retention Policy**: Defines how long Kafka retains messages (e.g., based on time or size).

**Partitioning**: Improves scalability by dividing data across partitions.

**Replication Factor**: Ensures data availability by replicating across brokers.

**Consumer Offsets**
- rack the last consumed record.
- Stored in Kafka (committed offsets) or managed by the application.




