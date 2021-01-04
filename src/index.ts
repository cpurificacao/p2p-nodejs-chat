import Peer from "./peer";

let peer: Peer;

process.argv.slice(2).forEach((argv) => {
  if (/-\w+=.+/.test(argv)) {
    const parts = argv.split("=");

    let [cmd, text] = parts;

    cmd = cmd.slice(1).toLowerCase();
    text = text.toLowerCase();

    // Commands
    if (cmd == "port") {
      const port = +(text as string);

      peer = new Peer(port);
    }

    if (cmd == "peer") {
      const address = text;

      peer.connectTo(address);
    }
  }
});

process.stdin.on("data", (data: Buffer) => {
  console.clear();

  const message = data.toString().replace(/\n/g, "");

  peer.broadcast(message);
});
