const COMMANDS = { "0X123": "moveForward", "0X789": "moveBackward", "0XABC": "stop"};

export function parse(stream) {
  return stream.split(" ").flatMap((token) => {
    const [count, code] = token.includes("*") ? token.split("*") : [1, token];
    const command = COMMANDS[code];
    if (!command) throw new Error(`Commande inconnue : ${code}`);
    if (!(Number(count) >= 1)) throw new Error(`Nombre d'occurrences invalide : ${count}`);
    return Array(Number(count)).fill(command);
  });
}