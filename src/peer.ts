import net, { NetConnectOpts } from "net";

export default class Peer {
  private connections: net.Socket[] = [];

  constructor(private port: number) {
    this.port = port;

    const server = net.createServer((socket) => this.onConnection(socket));

    console.log("New peer created!");

    server.listen(port, () => console.log(`Listening to port ${port}...`));
  }

  public connectTo(peerAddress: string): void {
    const parts = peerAddress.split(":");

    if (parts.length !== 2) {
      throw new Error("Peer address must be according host:port!");
    }

    const [host, port] = parts,
      conn: NetConnectOpts = {
        host,
        port: +port,
      };

    const socket: net.Socket = net.createConnection(conn, () =>
      this.onConnection(socket)
    );
  }

  private onConnection(socket: net.Socket): void {
    console.log(
      "New connection detected!",
      `${socket.remotePort} | ${socket.localPort}`
    );

    this.connections.push(socket);
  }
}
