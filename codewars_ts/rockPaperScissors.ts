// Rules of the "Rock, Paper, Scissors" game are:

// Rock beats Scissors,
// Scissors beat Paper,
// Paper beats Rock,
// Two identical moves are a draw.
// Let's play! You will be given valid moves of two Rock, Paper, Scissors players, and have to return which player won: "Player 1 won!" for player 1, and "Player 2 won!" for player 2. In case of a draw return Draw!.

// Examples:
// "scissors",     "paper"     --> "Player 1 won!"
// "scissors",     "rock"      --> "Player 2 won!"
// "paper",        "paper"     --> "Draw!"

export function rps(p1: string, p2: string): string{
  if(p1==p2) return 'Draw!'
  
  const rules : Record <string,string> = {
    "rock":"scissors",
    "scissors":"paper",
    "paper":"rock"
  }

  return rules[p1] === p2  ? 'Player 1 won!' : 'Player 2 won!';
}