var playerOne = {
    team: 1,
    level: null,
    pieceLoadOut: {
        WhitePawn: ['1,0','1,1','1,2','1,3','1,4','1,5','1,6','1,7'],
        WhiteKing: ['0,4'],
        WhiteRook: ['0,0','0,7'],
        WhiteBishop: ['0,2','0,5'],
        WhiteKnight: ['0,1','0,6'],
        WhiteQueen: ['0,3']
    }

};

var playerTwo = {
    team: 2,
    level: null,
    pieceLoadOut: {
        BlackPawn: ['6,0','6,1','6,2','6,3','6,4','6,5','6,6','6,7'],
        BlackKing: ['7,4'],
        BlackRook: ['7,0','7,7'],
        BlackBishop: ['7,2','7,5'],
        BlackKnight: ['7,1','7,6'],
        BlackQueen: ['7,3']
    }
}

var gameOver; 
function startGame() {

    gameOver = false;
    //Load Pieces 
    loadPieces(playerOne, playerTwo);


//Start Game Loop
    var turnCounter = 0;
    while(!gameOver) {
       if(turnCounter % 2 === 0) {
            //Player One Turn
            check(Kings);
       } else {
            //Player Two Turn
            check(Kings);
       }
        turnCounter++
    }
}

function loadPieces(playerOneLoadout,playerTwoLoadout) {
    //Load White Pieces 
    for(piece in playerOneLoadout) {
        let pieceArr = playerOne.pieceLoadOut[piece];
        pieceArr.forEach(function(pos) {
            if(piece === 'WhitePawn') {
                placePiece(new WhitePawn, pos);
            }else if(piece === 'WhiteRook') {
                placePiece(new WhiteRook, pos);
            }else if(piece === 'WhiteKnight') {
                placePiece(new WhiteKnight, pos);
            }else if(piece === 'WhiteBishop') {
                placePiece(new WhiteBishop, pos);
            }else if(piece === 'WhiteQueen') {
                placePiece(new WhiteQueen, pos);
            }else if(piece === 'WhiteKing') {
                placePiece(new WhiteKing, pos);
            }
        });
    }
    //Load Black pieces
    for(piece in playerTwoLoadout) {
        let pieceArr = playerTwo.pieceLoadOut[piece];
        pieceArr.forEach(function(pos) {
            if(piece === 'BlackPawn') {
                placePiece(new BlackPawn, pos);
            }else if(piece === 'BlackRook') {
                placePiece(new BlackRook, pos);
            }else if(piece === 'BlackKnight') {
                placePiece(new BlackKnight, pos);
            }else if(piece === 'BlackBishop') {
                placePiece(new BlackBishop, pos);
            }else if(piece === 'BlackQueen') {
                placePiece(new BlackQueen, pos);
            }else if(piece === 'BlackKing') {
                placePiece(new BlackKing, pos);
            }
        });
    }
    draw();
}

function checkKings() {
    let winner;
    board.forEach(function(tile) {
        let kingsOnBoard = [];
        if(tile.piece.val === 1 || 2) {
           kingsOnBoard.push(tile.piece.val);
        }
        if(kingsOnBoard.length < 2) {
            winner = kingsOnBoard[0];
            winner = (winner === 1) ? 'playerOne' : 'playerTwo';
        }
    });
    if(winner) {
        return winner;
        gameOver = true;
    }
}

function makeMove(team) {

}

init();
loadPieces(playerOne.pieceLoadOut, playerTwo.pieceLoadOut);




