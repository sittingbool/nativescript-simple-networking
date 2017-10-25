/// <reference path="references.d.ts" />
import {Address4} from "ip-address";

declare const GCDAsyncUdpSocket: any;
declare const GCDAsyncUdpSocketDelegate:any;
declare const GCDAsyncSocketDelegate :any ;
declare const dispatch_get_main_queue: any;

export interface GCDAsyncUdpSocketDelegate {};

export class UdpServer extends NSObject implements GCDAsyncUdpSocketDelegate {
    public static ObjCProtocols = [GCDAsyncUdpSocketDelegate];
    public onPacket: {(sender: Address4, packet: string): void;};
    public onError: {(id: number, message: string): void;};
    public onFinished: {(id: number): void;};

    public udpSocket: any = null;

    public start(port: number): number {

        this.udpSocket =
            GCDAsyncUdpSocket.alloc().initWithDelegateDelegateQueue(this, null);

        let errorRef = new interop.Reference();

        this.udpSocket.bindToPortError(port, errorRef);

        if ( errorRef.value ) {
            let err: any = errorRef.value;
            console.log(err.localizedDescription);
            return 1;
        }

        this.udpSocket.beginReceiving(errorRef);

        if ( errorRef.value ) {
            let err: any = errorRef.value;
            console.log(err.localizedDescription);
            this.stop();
            return 2;
        }

        return 0;
    }

    public stop(): number {
        this.udpSocket.close();
        if ( this.onFinished ) {
            this.onFinished(0);
        }
        return 0;
    }

    public send(address: Address4, packet: string): number;
    public send(address: string, packet: string): number;
    public send(address: any, packet: string): number {
        throw "Not implemented";
    }

    public getNativeSocket(): any {
        throw "Not implemented";
    }
    
    //------------------------------------------------------------------------------------------------------
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock, data, address, filterContext): void
    //------------------------------------------------------------------------------------------------------
    {
        let dataString: any = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding);
        let addressString = GCDAsyncUdpSocket.hostFromAddress(address);

        if ( this.onPacket ) {
            this.onPacket(new Address4(addressString), <string>dataString)
        }


    }

    //------------------------------------------------------------------------------------------------------
    udpSocketDidCloseWithError(err)
    //------------------------------------------------------------------------------------------------------
    {
        console.log("Error");
        console.log(err.localizedDescription);
        if (this.onError) {
            this.onError(1, err.localizedDescription);
        }
    }
}

export class TcpClient {
    public onData: {(data: string): void;};
    public onError: {(id: number, message: string): void;};
    public onFinished: {(id: number): void;};

    public start(servername: string, port: number): number {
        throw "Not implemented";    }

    public stop(): number {
        throw "Not implemented";
    }

    public send(data: string): number {
        throw "Not implemented";
    }
}

export class TcpServer {
    public onClient: {(client: Address4): void;};
    public onData: {(client: Address4, data: string): void;};
    public onError: {(id: number, client: Address4, message: string): void;};
    public onFinished: {(id: number): void;};

    public start(port: number): number {
        throw "Not implemented";
    }

    public stop(): number {
        throw "Not implemented";
    }

    public send(client: Address4, data: string): number {
        throw "Not implemented";
    }
}

