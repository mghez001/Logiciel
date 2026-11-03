export function slotMachine(bet, result) {
    if (result[0] === '$' && result[1] === '$' && result[2] === '$') return bet * 20;
    if (result[0] === result[1] && result[1] === result[2]) return bet * 5;
    if (result[0] === result[1]||result[1] === result[2]) return bet * 2;
  return 0;
}