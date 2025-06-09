import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { IClientOptions } from 'mqtt';
import { ConnectionStatus, MqttContextProps, OnMessageCallback } from '../types/mqtt';
import useMqttClient from '../hooks/useMqttClient';

const defaultContext: MqttContextProps = {
  status: 'disconnected',
  subscribe: () => {},
  unsubscribe: () => {},
  publish: () => {},
  connect: () => {},
  disconnect: () => {},
};

export const MqttContext = createContext<MqttContextProps>(defaultContext);

export const MqttProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [options, setOptions] = useState<IClientOptions>({
    host: 'broker.hivemq.com',
    port: 8000,
    path: '/mqtt',
    protocol: 'ws',
    clientId: 'react_native_thermal_plus_' + Math.random().toString(16).substr(2, 8),
    clean: true,
    rejectUnauthorized: false,
    reconnectPeriod: 5000,
    keepalive: 60,
  });

  const {
    status,
    subscribe: mqttSubscribe,
    disconnect,
    unsubscribe: mqttUnsubscribe,
    publish,
  } = useMqttClient(options);

  const connect = (newOptions: IClientOptions) => {
    setOptions({
      ...newOptions,
    });
  };

  const subscribe = (topic: string, onMessage: OnMessageCallback) => {
    mqttSubscribe(topic, onMessage);
  };

  const unsubscribe = (topic: string) => {
    mqttUnsubscribe(topic);
  };

  return (
    <MqttContext.Provider
      value={{
        status,
        subscribe,
        unsubscribe,
        publish,
        connect,
        disconnect,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => {
  const context = React.useContext(MqttContext);
  if (!context) {
    throw new Error('useMqtt must be used within a MqttProvider');
  }
  return context;
}; 