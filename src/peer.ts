import net, { NetConnectOpts } from "net";

export default class Peer {
  private connections: net.Socket[] = [];
  private declare server: net.Server;

  constructor(private port: number) {
    this.port = port;

    this.server = net.createServer((socket) => this.onSocketConnect(socket));

    this.server.listen(port, () => console.log(`Listening to port ${port}...`));
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

  public broadcast(data: string): void {
    this.connections.forEach((socket) => socket.write(data));
  }

  private onSocketConnect(socket: net.Socket): void {
    socket.write("New connection...");

    this.connections.push(socket);

    socket.on("end", () => this.onEnd(socket));

    socket.on("data", (data) => this.onData(socket, data));

    console.clear();
  }

  private onData(socket: net.Socket, data: Buffer | string): void {
    data = data.toString();

    console.log(`(${socket.remoteAddress}:${socket.remotePort}) -> ${data}`);
  }

  private onEnd(socket: net.Socket): void {
    console.log(
      `(${socket.remoteAddress}:${socket.remotePort}) -> Ended connection...`
    );
  }
}
