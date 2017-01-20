var board = [];
var boundsBoard = [];
var outOfBounds = [];
var tiles = [];

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

    //////////////////////////////////////////
    //Dom Element Creation
    /////////////////////////////////////////
    //for(let i=8;i>0;i--){
    //    for(let j=8;j>0;j--){
    //        var tileHTML = `<div id="${i}${j}" class="tile" style="border:.2px solid black; width: 80px; height: 80px;display: inline-block;"i>${i}${j}</div>`;
    //        tiles.push(tileHTML);
    //    }
    //}

    ////Append tiles to div
    //$('#chessBoard').append(tiles);
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
