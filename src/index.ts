import Peer from "./peer";

const port = +(process.env.PORT as string);

if (!port) throw new Error("Enter a port for connection!");

console.log("PORT:", port);

const peer = new Peer(port);

process.argv.slice(2).forEach((peerAddr) => peer.connectTo(peerAddr));
