export type Player = 'X' | 'O';
export type Cell = Player | null;

// A row must contain exactly 4 cells.
export type Row = [Cell, Cell, Cell, Cell];

// The board must contain exactly 4 rows.
export type Board = [Row, Row, Row, Row];

type Position = [row: number, column: number];

const BOARD_SIZE = 4;

/*
 * Build all winning combinations once.
 * This avoids recreating them every time checkWinner() runs.
 */
const WIN_LINES: readonly Position[][] = (() => {
  const lines: Position[][] = [];

  const indexes = [0, 1, 2, 3];

  // Rows
  for (const row of indexes) {
    lines.push(
      indexes.map(column => [row, column] as Position)
    );
  }

  // Columns
  for (const column of indexes) {
    lines.push(
      indexes.map(row => [row, column] as Position)
    );
  }

  // Main diagonal
  lines.push(
    indexes.map(i => [i, i] as Position)
  );

  // Anti-diagonal
  lines.push(
    indexes.map(i => [i, BOARD_SIZE - 1 - i] as Position)
  );

  // Four corners
  lines.push([
    [0, 0],
    [0, 3],
    [3, 0],
    [3, 3],
  ]);

  // Every possible 2x2 square
  for (let row = 0; row < BOARD_SIZE - 1; row++) {
    for (let column = 0; column < BOARD_SIZE - 1; column++) {
      lines.push([
        [row, column],
        [row, column + 1],
        [row + 1, column],
        [row + 1, column + 1],
      ]);
    }
  }

  return lines;
})();

export class TicTacToe {
  private readonly board: Board;

  constructor(board: Board) {
    /*
     * Copy the board so outside code cannot accidentally
     * change the game state after creating this instance.
     */
    this.board = board.map(
      row => [...row] as Row
    ) as Board;
  }

  /*
   * Returns:
   * 'X' if X won
   * 'O' if O won
   * null if nobody has won
   */
  public checkWinner(): Player | null {
    for (const line of WIN_LINES) {
      const [firstRow, firstColumn] = line[0];

      const player = this.board[firstRow][firstColumn];

      // Empty cells cannot create a winning line.
      if (player === null) {
        continue;
      }

      const hasWon = line.every(([row, column]) => {
        return this.board[row][column] === player;
      });

      if (hasWon) {
        return player;
      }
    }

    return null;
  }

  /*
   * Returns true if at least one empty cell exists.
   */
  public anyMovesLeft(): boolean {
    return this.board.some(row =>
      row.some(cell => cell === null)
    );
  }

  /*
   * The game ends when someone wins
   * or when the board is completely full.
   */
  public isGameOver(): boolean {
    return this.checkWinner() !== null || !this.anyMovesLeft();
  }
}
