import React, { useState } from 'react';
import './DebugPanel.css';

const DebugPanel = () => {
  const [logs, setLogs] = useState({
    db: [],
    api: [],
    error: []
  });

  // Add to window for global access
  window.debugLog = {
    db: (message, type = 'log', details = null) => {
      setLogs(prev => ({
        ...prev,
        db: [...prev.db, {
          timestamp: new Date().toLocaleTimeString(),
          message,
          type,
          details
        }]
      }));
    },
    api: (message, type = 'log', details = null) => {
      setLogs(prev => ({
        ...prev,
        api: [...prev.api, {
          timestamp: new Date().toLocaleTimeString(),
          message,
          type,
          details
        }]
      }));
    },
    error: (message, error = null) => {
      setLogs(prev => ({
        ...prev,
        error: [...prev.error, {
          timestamp: new Date().toLocaleTimeString(),
          message,
          error
        }]
      }));
    }
  };

  const clearLogs = () => {
    setLogs({
      db: [],
      api: [],
      error: []
    });
  };

  return (
    <div className="debug-panel">
      <div className="debug-header">
        <h3>Debug Information</h3>
        <button onClick={clearLogs}>Clear Logs</button>
      </div>
      <div className="debug-content">
        <div className="debug-section">
          <h4>MongoDB Connection</h4>
          <div id="dbStatus">
            {logs.db.map((log, index) => (
              <div key={index} className={`debug-${log.type}`}>
                {log.timestamp} - {log.message}
                {log.details && (
                  <pre>{JSON.stringify(log.details, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="debug-section">
          <h4>API Calls</h4>
          <div id="apiLogs">
            {logs.api.map((log, index) => (
              <div key={index} className={`debug-${log.type}`}>
                {log.timestamp} - {log.message}
                {log.details && (
                  <pre>{JSON.stringify(log.details, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="debug-section">
          <h4>Errors</h4>
          <div id="errorLogs">
            {logs.error.map((log, index) => (
              <div key={index} className="debug-error">
                {log.timestamp} - {log.message}
                {log.error && (
                  <div className="error-details">
                    <div>Error Name: {log.error.name}</div>
                    <div>Error Message: {log.error.message}</div>
                    {log.error.stack && (
                      <pre>Stack Trace: {log.error.stack}</pre>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel; 