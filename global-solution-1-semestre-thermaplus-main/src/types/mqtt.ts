export type ConnectionStatus = 
  | 'connected' 
  | 'disconnected' 
  | 'connecting' 
  | 'reconnecting'
  | 'subscribing'
  | 'subscribed'
  | 'error'
  | 'ended';

export type OnMessageCallback = (topic: string, message: string) => void;

export interface MqttContextProps {
  status: ConnectionStatus;
  subscribe: (topic: string, onMessage: OnMessageCallback) => void;
  unsubscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
  connect: (options: IClientOptions) => void;
  disconnect: () => void;
} 