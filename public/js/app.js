const boolTrue = true;
const boolFalse = false;
const imgDimensions = 60;

function init() {

    //Cache images
    var wPImage = new Image(imgDimensions,imgDimensions);
        wPImage.src = '../chessPieces/wP.png';

    var wKImage = new Image(imgDimensions,imgDimensions);
        wKImage.src = '../chessPieces/wK.png';

    var wRImage = new Image(imgDimensions,imgDimensions);
        wRImage.src = '../chessPieces/wR.png';

    var wKnImage = new Image(imgDimensions,imgDimensions);
        wKnImage.src = '../chessPieces/wN.png';

    var wBImage = new Image(imgDimensions,imgDimensions);
        wBImage.src = '../chessPieces/wB.png';

    var wQImage = new Image(imgDimensions,imgDimensions);
        wQImage.src = '../chessPieces/wQ.png';

    var bPImage = new Image(imgDimensions,imgDimensions);
        bPImage.src = '../chessPieces/bP.png';

    var bKImage = new Image(imgDimensions,imgDimensions);
        bKImage.src = '../chessPieces/bK.png';

    var bRImage = new Image(imgDimensions,imgDimensions);
        bRImage.src = '../chessPieces/bR.png';

    var bKnImage = new Image(imgDimensions,imgDimensions);
        bKnImage.src = '../chessPieces/bN.png';

    var bBImage = new Image(imgDimensions,imgDimensions);
        bBImage.src = '../chessPieces/bB.png';

    var bBImage = new Image(imgDimensions,imgDimensions);
        bBImage.src = '../chessPieces/bB.png';

    var bQImage = new Image(imgDimensions,imgDimensions);
        bQImage.src = '../chessPieces/bQ.png';

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
            piece.index = newPos;
        }
    });
    draw();
}

   var tileElement = document.getElementsByTagNme("div"); 
function draw() {
   console.log(tileElement.length);

    console.log('Drawing');
    board.forEach(function(tile) {
        if(tile.piece != null) {
            
        }
    });
}

draw();


module.exports = {movePiece, WhiteQueen, WhiteKnight, WhiteBishop, WhiteRook, isSameTeam, WhiteKing, boundsToIndex,BlackPawn, returnTile, isTileEmpty, WhitePawn, indexToRankFile, placePiece, posToIndex, convertToBounds, board, boundsBoard, initBoard};
