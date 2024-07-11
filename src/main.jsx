import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//...
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://df772285f7fa30b6b429e747ee4f300e@o4507582284103680.ingest.us.sentry.io/4507582291836928",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricAggregatorIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
