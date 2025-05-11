// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const exporter = new PrometheusExporter({ startServer: true });

const sdk = new NodeSDK({
  traceExporter: exporter,
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

sdk.start();
