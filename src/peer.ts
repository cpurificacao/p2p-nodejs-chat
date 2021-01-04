import net, { NetConnectOpts } from "net";

export default class Peer {
  private connections: net.Socket[] = [];

  constructor(private port: number) {
    this.port = port;

    const server = net.createServer((socket) => this.onSocketConnect(socket));

    server.listen(port, () => console.log(`Listening to port ${port}...`));
  }

  public connectTo(address: string): void {
    const parts = address.split(":");

    if (parts.length !== 2) {
      throw new Error("Peer address must match host:port syntax!");
    }

    const [host, port] = parts,
      conn: NetConnectOpts = {
        host,
        port: +port,
      };

    const socket: net.Socket = net.createConnection(conn, () =>
      this.onSocketConnect(socket)
    );
  }

  private onSocketConnect(socket: net.Socket): void {
    this.connections.push(socket);

    socket.on("end", () => this.onEnd(socket));

    socket.on("data", (data) => this.onData(socket, data));
  }

  private onData(socket: net.Socket, data: Buffer | string): void {
    data = data.toString();

    console.log("Received:", data);

    socket.write(data);
  }

  private onEnd(socket: net.Socket): void {
    console.log(
      `Ended connection! (${socket.localPort} | ${socket.remotePort})`
    );
  }

  private broadcast(data: string) {
    this.connections.forEach((socket) => socket.write(data));
  }
}
