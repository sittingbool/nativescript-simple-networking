"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ip_address_1 = require("ip-address");
;
var UdpServer = (function (_super) {
    __extends(UdpServer, _super);
    function UdpServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.udpSocket = null;
        return _this;
    }
    UdpServer.prototype.start = function (port) {
        this.udpSocket =
            GCDAsyncUdpSocket.alloc().initWithDelegateDelegateQueue(this, null);
        var errorRef = new interop.Reference();
        this.udpSocket.bindToPortError(port, errorRef);
        if (errorRef.value) {
            var err = errorRef.value;
            console.log(err.localizedDescription);
            return 1;
        }
        this.udpSocket.beginReceiving(errorRef);
        if (errorRef.value) {
            var err = errorRef.value;
            console.log(err.localizedDescription);
            this.stop();
            return 2;
        }
        return 0;
    };
    UdpServer.prototype.stop = function () {
        this.udpSocket.close();
        if (this.onFinished) {
            this.onFinished(0);
        }
        return 0;
    };
    UdpServer.prototype.send = function (address, packet) {
        throw "Not implemented";
    };
    UdpServer.prototype.getNativeSocket = function () {
        throw "Not implemented";
    };
    UdpServer.prototype.udpSocketDidReceiveDataFromAddressWithFilterContext = function (sock, data, address, filterContext) {
        var dataString = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding);
        var addressString = GCDAsyncUdpSocket.hostFromAddress(address);
        if (this.onPacket) {
            this.onPacket(new ip_address_1.Address4(addressString), dataString);
        }
    };
    UdpServer.prototype.udpSocketDidCloseWithError = function (err) {
        console.log("Error");
        console.log(err.localizedDescription);
        if (this.onError) {
            this.onError(1, err.localizedDescription);
        }
    };
    UdpServer.ObjCProtocols = [GCDAsyncUdpSocketDelegate];
    return UdpServer;
}(NSObject));
exports.UdpServer = UdpServer;
var TcpClient = (function () {
    function TcpClient() {
    }
    TcpClient.prototype.start = function (servername, port) {
        throw "Not implemented";
    };
    TcpClient.prototype.stop = function () {
        throw "Not implemented";
    };
    TcpClient.prototype.send = function (data) {
        throw "Not implemented";
    };
    return TcpClient;
}());
exports.TcpClient = TcpClient;
var TcpServer = (function () {
    function TcpServer() {
    }
    TcpServer.prototype.start = function (port) {
        throw "Not implemented";
    };
    TcpServer.prototype.stop = function () {
        throw "Not implemented";
    };
    TcpServer.prototype.send = function (client, data) {
        throw "Not implemented";
    };
    return TcpServer;
}());
exports.TcpServer = TcpServer;
//# sourceMappingURL=index.ios.js.map