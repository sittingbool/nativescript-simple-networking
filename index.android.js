"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ip_address_1 = require("ip-address");
var UdpServer = (function () {
    function UdpServer() {
        var self = this;
        var listener = new cz.honzamrazek.simplenetworking.UdpListener({
            onPacket: function (sender, packet) {
                if (self.onPacket !== null)
                    self.onPacket(new ip_address_1.Address4(sender.getHostAddress()), packet);
            },
            onError: function (id, message) {
                if (self.onError !== null)
                    self.onError(id, message);
            },
            onFinished: function (id) {
                if (self.onFinished !== null)
                    self.onFinished(id);
            }
        });
        this.server = new cz.honzamrazek.simplenetworking.UdpServer(listener);
    }
    UdpServer.prototype.start = function (port) {
        return this.server.start(port);
    };
    UdpServer.prototype.stop = function () {
        return this.server.stop();
    };
    UdpServer.prototype.send = function (address, packet) {
        var name;
        if (address && typeof address == "string")
            name = address;
        else
            name = address.address;
        return this.server.send(java.net.InetAddress.getByName(name), packet);
    };
    UdpServer.prototype.getNativeSocket = function () {
        return this.server.getNativeSocket();
    };
    return UdpServer;
}());
exports.UdpServer = UdpServer;
var TcpClient = (function () {
    function TcpClient() {
        var self = this;
        var listener = new cz.honzamrazek.simplenetworking.TcpClientListener({
            onData: function (data) {
                if (self.onData !== null)
                    self.onData(data);
            },
            onError: function (id, message) {
                if (self.onError !== null)
                    self.onError(id, message);
            },
            onFinished: function (id) {
                if (self.onFinished !== null)
                    self.onFinished(id);
            }
        });
        this.client = new cz.honzamrazek.simplenetworking.TcpClient(listener);
    }
    TcpClient.prototype.start = function (servername, port) {
        return this.client.start(servername, port);
    };
    TcpClient.prototype.stop = function () {
        return this.client.stop();
    };
    TcpClient.prototype.send = function (data) {
        return this.client.send(data);
    };
    return TcpClient;
}());
exports.TcpClient = TcpClient;
var TcpServer = (function () {
    function TcpServer(maxClients) {
        var self = this;
        var listener = new cz.honzamrazek.simplenetworking.TcpServerListener({
            onClient: function (client) {
                if (self.onClient !== null)
                    self.onClient(new ip_address_1.Address4(client.getHostAddress()));
            },
            onData: function (client, data) {
                if (self.onData !== null)
                    self.onData(new ip_address_1.Address4(client.getHostAddress()), data);
            },
            onError: function (id, client, message) {
                if (self.onError !== null)
                    self.onError(id, new ip_address_1.Address4(client.getHostAddress()), message);
            },
            onFinished: function (id) {
                if (self.onFinished !== null)
                    self.onFinished(id);
            }
        });
        this.server = new cz.honzamrazek.simplenetworking.TcpServer(maxClients, listener);
    }
    TcpServer.prototype.start = function (port) {
        return this.server.start(port);
    };
    TcpServer.prototype.stop = function () {
        return this.server.stop();
    };
    TcpServer.prototype.send = function (client, data) {
        return this.server.send(java.net.InetAddress.getByName(client.address), data);
    };
    return TcpServer;
}());
exports.TcpServer = TcpServer;
//# sourceMappingURL=index.android.js.map