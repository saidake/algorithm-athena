<!-----------------------------------------------------------
Author:  Craig Brown
Version: 1.0.1
Source:  https://github.com/saidake/simi-docs
------------------------------------------------------------->
# Table of Contents
[Back to Main Project README](../README.md)  
- Java
  - [1. How does `AbstractQueuedSynchronizer` function internally?](#1-how-does-abstractqueuedsynchronizer-function-internally) 
- Internet
  - [2. How to solve CORS issue?](#2-how-to-solve-cors-issue) 
- Spring Boot 
  - [3. How to ensure Kafka messages are not lost?](#3-how-to-ensure-kafka-messages-are-not-lost)
## 1. How does `AbstractQueuedSynchronizer` function internally?  
<!-- {4} -->
### References
* **Java.pdf / Java / java.base / java.util / concurrent / locks / AbstractQueuedSynchronizer**     
  1. State Management
  2. Node-based Queuing
  3. Exclusive and Shared Modes
  4. Condition Support
### Answer
AbstractQueuedSynchronizer is a utility for creating custom synchronizers in Java, using a node-based queue mechanism.

To customize lock behavior, implement `tryAcquire/tryRelease` for exclusive locks or `tryAcquireShared/tryReleaseShared` for shared locks. 
These methods define when a lock can be acquired or released.

The `state` field tracks the lock's status, and `AbstractQueuedSynchronizer` automatically manages the queue and wake-up process for waiting threads.

## 2. How to solve CORS issue?  
<!-- {3-2} -->
### References
* **Internet.pdf / Network Model / Application Layer / HTTP (Hypertext Transfer Protocol) / Cross-domain communication**
  1. Same-Origin Policy (SOP)
  2. Cross-Origin Resource Sharing (CORS)
  3. Preflight Request
* **Config.pdf / Work Environment / nginx / Core / Proxy**     
  1. Forward Proxy (Normal Proxy)
  2. Reverse Proxy
### Answer
1. Return the necessary CORS headers for all requests directly from the server.
2. Set up a reverse proxy server (e.g., Nginx) to intercept both preflight and regular requests, adding the necessary CORS headers.

## 3. How to ensure Kafka messages are not lost?
<!-- {3} -->
### References
* **DatabaseAndMiddleware.pdf / Kafka / Configuration / server.properties / Leader Election**
  1. Assigned Replicas (AR)
  2. In-Sync Replicas (ISR)
  3. Out-of-Sync Replicas (OSR)

### Answer
1. Set all broker replicas keep synchronized as OSR nodes may lack the latest messages, risking data loss if elected as the leader.  

    server.properties:
    ```properties
    unclean.leader.election.enable = false
    ```
2.  Keep meessage flush to disk synchronized.

    server.properties:
    ```properties
    # When the number of messages in a log segment reaches 10000, Kafka forces a flush to disk to persist the data.
    log.flush.interval.messages = 10000
    # Forces a flush operation after the specified time interval in milliseconds. 
    log.flush.interval.ms = 1000
    # Sets the interval in milliseconds at which Kafka checks whether a flush is needed. 
    log.flush.scheduler.interval.ms = 3000
    ```
3. In the Kafka producer, setting `acks=all` ensures that the producer waits for acknowledgments from all in-sync replicas (ISRs) of the partition before considering the message successfully sent. 

    Additionally, a **callback** function should be set for each sent message to handle success, failure, and retries. 
  The callback provides a way to receive feedback from the broker, allowing you to **log successes** or **handle any delivery failures** (e.g., network issues or broker unavailability) with appropriate actions such as retries or compensatory measures.

4. In the Kafka consumer, setting `enable.auto.commit=false` and **manually committing the message offset** ensures greater control over message processing.   
   Relying on automatic offset commits can lead to data loss if the consumer crashes before committing the latest offsets.