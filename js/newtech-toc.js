// New Tech - Table of Contents Data
const newtechTocData = `<a href="#1-what-is-replacing-evolving-beyond-spring-boot" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="1-what-is-replacing-evolving-beyond-spring-boot">⭐ 1. <strong>What is replacing / evolving beyond Spring Boot?</strong></a>
<a href="#1-quarkus" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-quarkus">🔥 <strong>1. Quarkus</strong></a>
<a href="#2-micronaut" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-micronaut">🔥 <strong>2. Micronaut</strong></a>
<a href="#3-helidon" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-helidon">🔥 <strong>3. Helidon</strong></a>
<a href="#4-spring-boot-spring-boot-native-spring-boot-3" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-spring-boot-spring-boot-native-spring-boot-3">🔥 <strong>4. Spring Boot ➜ Spring Boot Native / Spring Boot 3</strong></a>
<a href="#2-what-is-replacing-rpc-grpc-rest-rmi-graphql" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="2-what-is-replacing-rpc-grpc-rest-rmi-graphql">⭐ 2. <strong>What is replacing RPC? (gRPC, REST, RMI, GraphQL)</strong></a>
<a href="#1-grpc-over-http3-quic" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-grpc-over-http3-quic">🔥 <strong>1. gRPC over HTTP/3 (QUIC)</strong></a>
<a href="#2-graphql" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-graphql">🔥 <strong>2. GraphQL</strong></a>
<a href="#3-async-apis-websockets-sse-cloudstreams" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-async-apis-websockets-sse-cloudstreams">🔥 <strong>3. Async APIs (WebSockets, SSE, CloudStreams)</strong></a>
<a href="#4-cloud-native-rpc-service-mesh-based" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-cloud-native-rpc-service-mesh-based">🔥 <strong>4. Cloud-native RPC (Service Mesh-based)</strong></a>
<a href="#3-what-is-replacing-kafka" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="3-what-is-replacing-kafka">⭐ 3. <strong>What is replacing Kafka?</strong></a>
<a href="#1-apache-pulsar" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-apache-pulsar">🔥 <strong>1. Apache Pulsar</strong></a>
<a href="#2-redpanda" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-redpanda">🔥 <strong>2. Redpanda</strong></a>
<a href="#3-nats-jetstream" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-nats-jetstream">🔥 <strong>3. NATS JetStream</strong></a>
<a href="#4-aws-kinesis-google-pubsub" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-aws-kinesis-google-pubsub">🔥 <strong>4. AWS Kinesis / Google PubSub</strong></a>
<a href="#5-automq" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="5-automq">🔥 <strong>5. AutoMQ</strong></a>
<a href="#4-what-is-replacing-microservices" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="4-what-is-replacing-microservices">⭐ 4. <strong>What is replacing Microservices?</strong></a>
<a href="#1-modular-monolith" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="1-modular-monolith">🔥 <strong>1. Modular Monolith</strong></a>
<a href="#2-serverless-functions-as-a-service" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="2-serverless-functions-as-a-service">🔥 <strong>2. Serverless (Functions-as-a-Service)</strong></a>
<a href="#3-wasm-based-microservices-webassembly" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="3-wasm-based-microservices-webassembly">🔥 <strong>3. WASM-based Microservices (WebAssembly)</strong></a>
<a href="#4-service-mesh-sidecars" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="4-service-mesh-sidecars">🔥 <strong>4. Service Mesh + Sidecars</strong></a>
<a href="#5-event-driven-architecture" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="5-event-driven-architecture">🔥 <strong>5. Event-driven architecture</strong></a>
<a href="#full-summary-table" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="full-summary-table">⭐ FULL SUMMARY TABLE</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = newtechTocData;
}
