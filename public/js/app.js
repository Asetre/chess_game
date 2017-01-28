const boolTrue = true;
const boolFalse = false;
var socket = io.connect();

function init() {
    //Create Board Representation
    initBoard();
}

function placePiece(pce, position) {
    let index = posToIndex(position);    
    board[index].piece = pce;
    board[index].piece.index = board[index].index;
}

function posToIndex(position) {
    let index;
    board.forEach(function(tile) {
        if(tile.rankFile === position){
            index = board.indexOf(tile);
        }
    });
    return index;
}

function indexToRankFile(index) {
    return board[index].rankFile;
}

function isOffBoard(index) {
    let bool =false;
    outOfBounds.forEach(function(int) {
        if(int === index) {
            bool = true;
        }
    });
    return bool;
}

function isTileEmpty(index) {
    let tilePiece = board[index].piece;
    return tilePiece ? boolFalse : boolTrue;
}

function returnTile(index) {
    return board[index];
}

function boundsToIndex(index) {
    let val;    
    if(index<31) {
        val = index-21;
    }else if(index<41) {
        val = index-21-2;
    }else if(index<51) {
        val = index-21-4;
    }else if(index<61) {
        val = index-21-6;
    }else if(index<71) {
        val = index-21-8;
    }else if(index<81) {
        val = index-21-10;
    }else if(index<91) {
        val = index-21-12;
    }else if(index<101) {
        val  = index-21-14;
    }
    return val;
}

function isSameTeam(index, team) {
    let tile = returnTile(index);
    return (tile.piece.team === team) ? boolTrue : boolFalse;
}

function movePiece(piece, newPos) {
    let moves = piece.validMoves();
    moves.forEach(function(int) {
        if(int === newPos) {
            board[newPos].piece = piece;
            board[piece.index].piece = null;
            piece.index = newPos;
        }
    });
    socket.emit('movedPiece', {piece: piece, newPos: newPos});
    draw();
}

socket.on('updateBoard', function(data) {

    board[data.piece.index].piece = null;
    console.log(board[data.newPos]);
    board[data.newPos].piece = data.piece;
    draw();
});


//module.exports = {movePiece, WhiteQueen, WhiteKnight, WhiteBishop, WhiteRook, isSameTeam, WhiteKing, boundsToIndex,BlackPawn, returnTile, isTileEmpty, WhitePawn, indexToRankFile, placePiece, posToIndex, convertToBounds, board, boundsBoard, initBoard};
