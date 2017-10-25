
import { Address4 } from "ip-address";
export declare class UdpServer {
    private server;
    onPacket: {
        (sender: Address4, packet: string): void;
    };
    onError: {
        (id: number, message: string): void;
    };
    onFinished: {
        (id: number): void;
    };
    constructor();
    start(port: number): number;
    stop(): number;
    send(address: Address4, packet: string): number;
    send(address: string, packet: string): number;
    getNativeSocket(): any;
}
export declare class TcpClient {
    private client;
    onData: {
        (data: string): void;
    };
    onError: {
        (id: number, message: string): void;
    };
    onFinished: {
        (id: number): void;
    };
    constructor();
    start(servername: string, port: number): number;
    stop(): number;
    send(data: string): number;
}
export declare class TcpServer {
    private server;
    onClient: {
        (client: Address4): void;
    };
    onData: {
        (client: Address4, data: string): void;
    };
    onError: {
        (id: number, client: Address4, message: string): void;
    };
    onFinished: {
        (id: number): void;
    };
    constructor(maxClients: number);
    start(port: number): number;
    stop(): number;
    send(client: Address4, data: string): number;
}