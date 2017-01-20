var board = [];
var boundsBoard = [];
var outOfBounds = [];

function initBoard() {
    //Create the board
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            let tile = 
            {
                rankFile: `${i},${j}`,
                piece: null
            }
            board.push(tile);
        }
    }
    //Create the boundsBoard
    for(let i=0; i<120; i++) {
        boundsBoard.push(i);
    }

    board.map(function(tile) {
        return tile.index = posToIndex(tile.rankFile);
    });
    //Create the out of bounds areas
    for(let i=0;i<20;i++) {
        outOfBounds.push(i);
    }
    for(let i=20;i<100;i+=10) {
        outOfBounds.push(i);
    }
    for(let i=100;i<120;i++) {
        outOfBounds.push(i);
    }
    for(let i=29;i<100;i+=10) {
        outOfBounds.push(i);
    }
}

function convertToBounds(index) {
    let position = index.split(','); 
    let parsed = [];
    position.forEach(function(num) {
        let numParsed = parseInt(num);
        parsed.push(numParsed);
    });
    var boundsIndex = (parsed[1] + 21) + (parsed[0] * 10);
    return boundsIndex;
}

function WhitePawn() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves = [];
            let tile = board[this.index + 8]
                //Check for collision
                if(tile.piece === null) {
                    moves.push(tile.index);
                }else if(tile.piece != null) {
                    console.log('Cannot move forward');
                }
            return moves;
        },
        validAttack: function() {
            let moves = [];
            //Convert to boundsBoard
            let boundsIndex = convertToBounds(indexToRankFile(this.index)); 
            let boardAtk1 = this.index+7;
            let boardAtk2 = this.index+9;
            let atk1 = boundsIndex+9;
            let atk2 = boundsIndex+11;

            if(!isOffBoard(atk1)) {
                if(isTileEmpty(boardAtk1)) {
                    moves.push(boardAtk1);                    
                }else {
                    if(returnTile(boardAtk1).piece.team != this.team) {
                        moves.push(boardAtk1);
                    }
                }
            }else if(!isOffBoard(atk2)) {
                if(isTileEmpty(boardAtk2)) {
                    moves.push(boardAtk2);
                }else {
                    if(returnTile(boardAtk2).piece.team != this.team) {
                        moves.push(boardAtk2);
                    }
                }
            }
            return moves;
        }
    }
}

function BlackPawn() {
    return {
        index: null,
        img: null,
        team: 2,
        validMoves: function() {
            let moves = [];
            let tile = board[this.index - 8]
                //Check for collision
                if(tile.piece === null) {
                    moves.push(tile.index);
                }else if(tile.piece != null) {
                    console.log('Cannot move forward');
                }
            return moves;
        },
        validAttack: function() {
            let moves = [];
            //Convert to boundsBoard
            let boundsIndex = convertToBounds(indexToRankFile(this.index)); 
            let boardAtk1 = this.index-7;
            let boardAtk2 = this.index-9;
            let atk1 = boundsIndex-9;
            let atk2 = boundsIndex-11;

            if(!isOffBoard(atk1)) {
                if(isTileEmpty(boardAtk1)) {
                    moves.push(boardAtk1);                    
                }else {
                    if(returnTile(boardAtk1).piece.team != this.team) {
                        moves.push(boardAtk1);
                    }
                }
            }else if(!isOffBoard(atk2)) {
                if(isTileEmpty(boardAtk2)) {
                    moves.push(boardAtk2);
                }else {
                    if(returnTile(boardAtk2).piece.team != this.team) {
                        moves.push(boardAtk2);
                    }
                }
            }
            return moves;
        }
    }
}

function WhiteKing() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves = [];
            let boundsIndex = convertToBounds(indexToRankFile(this.index));
            let movesBounds = [boundsIndex+1, boundsIndex-1, boundsIndex+10, boundsIndex-10]
            movesBounds.forEach(function(indexB) {
                if(!isOffBoard(indexB)) {
                    let index = boundsToIndex(indexB);
                    if(isTileEmpty(index)){
                        moves.push(index);
                    }else if(!isTileEmpty(index)) {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                    }
                }
            });
            return moves;
        }
    }
}

function WhiteRook() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves =[];
            //Check to the right
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+1; !isOffBoard(boundsIndex); boundsIndex++) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                } else {break;}

            }
            //Ceck to the left
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-1; !isOffBoard(boundsIndex); boundsIndex--) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }
            //Check up
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+10; !isOffBoard(boundsIndex); boundsIndex+=10) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)) {
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }
            //Check Down
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-10; !isOffBoard(boundsIndex); boundsIndex-=10) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)) {
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }

            return moves;
        }
    }
}

function WhiteBishop() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves =[];
            //Check NE
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+11; !isOffBoard(boundsToIndex); boundsIndex+=11) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
           //Check SE
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-9; !isOffBoard(boundsToIndex); boundsIndex-=9) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            //Check SW
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-11; !isOffBoard(boundsToIndex); boundsIndex-=11) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            //Check NW
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+9; !isOffBoard(boundsToIndex); boundsIndex+=9) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            return moves;
        }
    }
}

function WhiteKnight() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves = [];
            let boundsIndex = convertToBounds(board[this.index].rankFile);
            
            let boundsMoves = [boundsIndex+21, boundsIndex+12, boundsIndex-8, boundsIndex-19, boundsIndex-21, boundsIndex-12, boundsIndex+8, boundsIndex+19]; 

            boundsMoves.forEach(function(int) {
                if(!isOffBoard(int)) {
                    let index = boundsToIndex(int);
                    if(isTileEmpty(index)) {
                        moves.push[index];
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                    }
                }
            });
            return moves;
        }
    }
}

function WhiteQueen() {
    return {
        index: null,
        img: null,
        team: 1,
        validMoves: function() {
            let moves = [];

            //Check to the right
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+1; !isOffBoard(boundsIndex); boundsIndex++) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                } else {break;}

            }
            //Ceck to the left
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-1; !isOffBoard(boundsIndex); boundsIndex--) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }
            //Check up
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+10; !isOffBoard(boundsIndex); boundsIndex+=10) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)) {
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }
            //Check Down
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-10; !isOffBoard(boundsIndex); boundsIndex-=10) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)) {
                        moves.push(index);
                    }else {
                        if(!isSameTeam(index, this.team)) {
                            moves.push(index);
                        }
                        break;
                    }
                }else {break;}
            }
            //Check NE
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+11; !isOffBoard(boundsToIndex); boundsIndex+=11) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
           //Check SE
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-9; !isOffBoard(boundsToIndex); boundsIndex-=9) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            //Check SW
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)-11; !isOffBoard(boundsToIndex); boundsIndex-=11) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            //Check NW
            for(let boundsIndex = convertToBounds(board[this.index].rankFile)+9; !isOffBoard(boundsToIndex); boundsIndex+=9) {
                if(!isOffBoard(boundsIndex)) {
                    let index = boundsToIndex(boundsIndex);
                    if(isTileEmpty(index)){
                        moves.push(index); 
                    }else {
                        if(!isSameTeam(index, this.team)) {
                           moves.push(index); 
                        }
                        break;
                    }
                }else {break;}
            }
            return moves;
    
        }
    }
}

const boolTrue = true;
const boolFalse = false;

function init() {

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


module.exports = {WhiteQueen, WhiteKnight, WhiteBishop, WhiteRook, isSameTeam, WhiteKing, boundsToIndex,BlackPawn, returnTile, isTileEmpty, WhitePawn, indexToRankFile, placePiece, posToIndex, convertToBounds, board, boundsBoard, initBoard};
