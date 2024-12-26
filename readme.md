# [Apache Kafka](https://medium.com/swlh/apache-kafka-what-is-and-how-it-works-e176ab31fcd5)
- **Apache Kafka is a distributed event streaming platform** widely used for building real-time data pipelines and applications.
- Kafka works on a **pub-sub model**, allowing decoupling of producers and consumers.
- Kafka has **High Throughput**
- **Throughput** means how many operationn we can perform per second
- Kafka relies on [**ZooKeeper**](https://www.openlogic.com/blog/using-kafka-zookeeper) (or **KRaft** in newer versions) for metadata management.
- Kafka has **admin** which has task for creating topics and partition etc, **producers** that produces data, **consumer** that consumes data.

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
- **[Offset](https://www.redpanda.com/guides/kafka-architecture-kafka-offset)**: A unique identifier for each message within a partition.
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
**[Retention Policy](https://www.redpanda.com/guides/kafka-alternatives-kafka-retention)**: Defines how long Kafka retains messages (e.g., based on time or size).

**Partitioning**: Improves scalability by dividing data across partitions.

**Replication Factor**: Ensures data availability by replicating across brokers.

**Consumer Offsets**
- rack the last consumed record.
- Stored in Kafka (committed offsets) or managed by the application.

## Partition Assignment?
In Apache Kafka, partitions in a topic are distributed among consumers within the same consumer group for load balancing. Kafka ensures that each partition is consumed by only one consumer in a group, using a process called partition assignment.

**General Rules**

In Apache Kafka, partitions in a topic are distributed among consumers within the same consumer group for load balancing. Kafka ensures that each partition is consumed by only one consumer in a group, using a process called partition assignment.
- Kafka ensures **each partition is assigned to exactly one consumer** in a group.
- If **consumers > partitions**, some consumers will remain idle (not assigned any partitions).
- If **partitions > consumers**, some consumers will handle multiple partitions. Kafka tries to distribute partitions as evenly as possible.


## [Replication Factor](https://medium.com/@_amanarora/replication-in-kafka-58b39e91b64e)
Yes, the replication factor in Kafka directly depends on the number of brokers in the cluster.

**What is the Replication Factor?**
- The replication factor defines how many copies of a partition exist across the Kafka cluster.
- For example, if a topic has 3 partitions and a replication factor of 3: Each partition will have one leader and two replicas, spread across three brokers.

### Rules for Replication Factor
**1. Cannot Exceed the Number of Brokers**
- The replication factor must be less than or equal to the total number of brokers in the cluster.
- If you set a replication factor greater than the number of brokers, Kafka will fail to create the topic.

**2. Replication Factor = Number of Brokers**
- If the replication factor equals the number of brokers, every broker will have one replica of each partition.
- This provides high fault tolerance, as the cluster can survive up to `(replication factor - 1)` broker failures.

**3. Replication Factor < Number of Brokers**
- If the replication factor is lower than the number of brokers, not all brokers will host replicas for every partition.
- This setup is less resource-intensive but offers less fault tolerance.


## [Kafka Retention](https://www.redpanda.com/guides/kafka-alternatives-kafka-retention)
Kafka retention refers to the duration and conditions under which Kafka retains messages in its topics. Kafka doesn't immediately delete messages after they are consumed. Instead, it retains them based on predefined policies, allowing multiple consumers to read messages at their own pace.

### Key Aspect of Kafka Retention
**Retention Time**
- Kafka allows you to configure how long messages are kept in a topic.
- This is defined using the configuration `log.retention.ms` (in milliseconds). For example, if set to 7 days (`604800000` ms), messages are retained for 7 days before being deleted.

**Retention Size**
- Instead of time-based retention, Kafka can also retain messages based on the total size of log segments.
- This is configured using `log.retention.bytes`. For example, if set to `10GB`, Kafka deletes older messages when the topic size exceeds 10GB.

**Retention Policies**
Kafka applies these policies independently or in combination:

- **Time-based**: Deletes messages older than the configured retention period.
- **Size-based**: Deletes the oldest log segments when the topic reaches the configured size limit.
- **Compaction**: Instead of deletion, Kafka can retain only the latest record for each key. This is useful for use cases like maintaining the current state of entities. This is controlled via the `cleanup.policy` set to `compact`.

**Per Topic Configuration**
- Retention settings can be applied globally (for all topics) or per topic. Per-topic retention is configured via the topic's properties during creation or update.

**Default Retention Settings**
- **If no specific configuration is set for a topic, Kafka uses the default values specified in the broker configurations.**

**Impact on Consumer**
- Retention policies do not affect **consumers** directly, as Kafka tracks **offsets** for each consumer group. Messages are deleted from disk only after they surpass the retention limits, regardless of whether all consumers have read them.
- In Kafka, an **offset is a unique identifier for each message within a partition of a Kafka topic**. It is a simple integer that represents the position of a message in a partition. Each partition in a Kafka topic has its own offset sequence, starting from 0 for the first message in the partition.