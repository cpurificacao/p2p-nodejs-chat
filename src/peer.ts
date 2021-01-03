import net, { NetConnectOpts } from "net";

export default class Peer {
  private connections = [];

  constructor(private port: number) {
    this.port = port;

    const server = net.createServer((sock) => {
      console.log("New connection detected!", sock.remotePort);
    });

    server.listen(port, () => console.log(`Listening to port ${port}...`));
  }

  public connectTo(peerAddress: string) {
    const parts = peerAddress.split(":");

    if (parts.length !== 2) {
      throw new Error("Peer address must be according host:port!");
    }

    const [host, port] = parts,
      conn: NetConnectOpts = {
        host,
        port: +port,
      };

    net.createConnection(conn, () => console.log("Connection created!"));
  }
}
