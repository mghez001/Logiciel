const COMMANDS = { "0X123": "moveForward", "0X789": "moveBackward", "0XABC": "stop"};

export function parse(stream) {
  return stream.split(" ").map((code) => {
    const command = COMMANDS[code];
    if (!command) throw new Error(`Commande inconnue : ${code}`);
    return command;
  });
}