/// <reference path="references.d.ts" />
import { Address4 } from "ip-address";
export interface GCDAsyncUdpSocketDelegate {
}
export declare class UdpServer extends NSObject implements GCDAsyncUdpSocketDelegate {
    static ObjCProtocols: any[];
    onPacket: {
        (sender: Address4, packet: string): void;
    };
    onError: {
        (id: number, message: string): void;
    };
    onFinished: {
        (id: number): void;
    };
    udpSocket: any;
    start(port: number): number;
    stop(): number;
    send(address: Address4, packet: string): number;
    send(address: string, packet: string): number;
    getNativeSocket(): any;
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: any, data: any, address: any, filterContext: any): void;
    udpSocketDidCloseWithError(err: any): void;
}
export declare class TcpClient {
    onData: {
        (data: string): void;
    };
    onError: {
        (id: number, message: string): void;
    };
    onFinished: {
        (id: number): void;
    };
    start(servername: string, port: number): number;
    stop(): number;
    send(data: string): number;
}
export declare class TcpServer {
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
    start(port: number): number;
    stop(): number;
    send(client: Address4, data: string): number;
}
