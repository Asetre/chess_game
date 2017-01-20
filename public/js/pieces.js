function WhitePawn() {
    return {
        index: null,
        img: wPImage,
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
