const board = [
    [null, "black", null, "black", null, "black", null, "black"],
    ["black", null, "black", null, "black", null, "black", null],
    [null, "black", null, "black", null, "black", null, "black"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["white", null, "white", null, "white", null, "white", null],
    [null, "white", null, "white", null, "white", null, "white"],
    ["white", null, "white", null, "white", null, "white", null]
]

let currentPlayer = "white"
let selectedPiece = null
let gameOver = false

function isInsideBoard(row, col) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        return true
    }
    return false
}

function isPlayerPiece(piece, player) {
    if (piece === null) {
        return false
    }

    if (player === "white" && piece === "white") {
        return true
    }

    if (player === "black" && piece === "black") {
        return true
    }

    if (player === "white" && piece === "white-king") {
        return true
    }

    if (player === "black" && piece === "black-king") {
        return true
    }

    return false
}

function selectPiece(row, col) {
    const piece = board[row][col]

    if (gameOver === true) {
        console.log("The game is over")
        return
    }

    if (piece === null) {
        console.log("There is no piece here")
        return
    }

    if (!isPlayerPiece(piece, currentPlayer)) {
        console.log("You cannot select this piece")
        return
    }

    selectedPiece = {
        row: row,
        col: col
    }

    console.log("Selected piece at " + row + ", " + col)
}

function getPossibleMoves(row, col) {
    const piece = board[row][col]
    const moves = []

    if (piece === null) {
        return moves
    }

    if (piece === "white" || piece === "white-king") {
        if (isInsideBoard(row - 1, col - 1)) {
            if (board[row - 1][col - 1] === null) {
                moves.push({
                    row: row - 1,
                    col: col - 1
                })
            }
        }

        if (isInsideBoard(row - 1, col + 1)) {
            if (board[row - 1][col + 1] === null) {
                moves.push({
                    row: row - 1,
                    col: col + 1
                })
            }
        }
    }

    if (piece === "black" || piece === "black-king") {
        if (isInsideBoard(row + 1, col - 1)) {
            if (board[row + 1][col - 1] === null) {
                moves.push({
                    row: row + 1,
                    col: col - 1
                })
            }
        }

        if (isInsideBoard(row + 1, col + 1)) {
            if (board[row + 1][col + 1] === null) {
                moves.push({
                    row: row + 1,
                    col: col + 1
                })
            }
        }
    }

    if (piece === "white-king" || piece === "black-king") {
        if (isInsideBoard(row + 1, col - 1)) {
            if (board[row + 1][col - 1] === null) {
                moves.push({
                    row: row + 1,
                    col: col - 1
                })
            }
        }

        if (isInsideBoard(row + 1, col + 1)) {
            if (board[row + 1][col + 1] === null) {
                moves.push({
                    row: row + 1,
                    col: col + 1
                })
            }
        }

        if (isInsideBoard(row - 1, col - 1)) {
            if (board[row - 1][col - 1] === null) {
                moves.push({
                    row: row - 1,
                    col: col - 1
                })
            }
        }

        if (isInsideBoard(row - 1, col + 1)) {
            if (board[row - 1][col + 1] === null) {
                moves.push({
                    row: row - 1,
                    col: col + 1
                })
            }
        }
    }

    return moves
}

function movePiece(targetRow, targetCol) {
    if (selectedPiece === null) {
        console.log("No piece selected")
        return
    }

    const row = selectedPiece.row
    const col = selectedPiece.col
    const moves = getPossibleMoves(row, col)

    let validMove = false

    for (let i = 0; i < moves.length; i++) {
        if (moves[i].row === targetRow && moves[i].col === targetCol) {
            validMove = true
        }
    }

    if (validMove === false) {
        console.log("Invalid move")
        return
    }

    const piece = board[row][col]

    board[targetRow][targetCol] = piece
    board[row][col] = null

    checkPromotion(targetRow, targetCol)

    selectedPiece = null

    if (currentPlayer === "white") {
        currentPlayer = "black"
    } else {
        currentPlayer = "white"
    }

    checkGameOver()
}

function checkPromotion(row, col) {
    const piece = board[row][col]

    if (piece === "white") {
        if (row === 0) {
            board[row][col] = "white-king"
            console.log("White piece became a king")
        }
    }

    if (piece === "black") {
        if (row === 7) {
            board[row][col] = "black-king"
            console.log("Black piece became a king")
        }
    }
}

function countPieces(player) {
    let count = 0

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (isPlayerPiece(board[row][col], player)) {
                count = count + 1
            }
        }
    }

    return count
}

function checkGameOver() {
    const whitePieces = countPieces("white")
    const blackPieces = countPieces("black")

    if (whitePieces === 0) {
        gameOver = true
        console.log("Black wins!")
    }

    if (blackPieces === 0) {
        gameOver = true
        console.log("White wins!")
    }
}

function restartGame() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            board[row][col] = null
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = "black"
            }
        }
    }

    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = "white"
            }
        }
    }

    currentPlayer = "white"
    selectedPiece = null
    gameOver = false

    console.log("Game restarted")
}

function getGameStatus() {
    if (gameOver === true) {
        if (countPieces("white") === 0) {
            return "Black won"
        }

        if (countPieces("black") === 0) {
            return "White won"
        }
    }

    if (currentPlayer === "white") {
        return "White's turn"
    }

    return "Black's turn"
}

console.log(getGameStatus())