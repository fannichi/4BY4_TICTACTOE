# 4BY4_TICTACTOE
exercise for take home with Simplisafe

Cases to be considered:

Create every possible winning line once:
    - 4 rows
    - 4 columns
    - 2 diagonals
    - 4 corners
    - every 2x2 square


Step Taken:

To check for a winner:
    for each winning line:
        get the first cell
        if it is X or O:
            check whether all cells in that line match it
            if yes:
                return that player

If no winning line exists:
    return null

To check if moves remain:
    look for at least one empty cell

Game is over when:
    someone won
    OR
    there are no empty cells
