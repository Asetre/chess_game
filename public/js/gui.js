//Board rendering
function draw() {
    //Clear the board
    $.each($('.tile'), function() {
        $(this).find('img').remove();
        $(this).removeClass('highlighted');
    });

    //Draw Images
    board.forEach(function(tile) {
        if(tile.piece) {
            let rnkFile = tile.rankFile;
            $("#chessBoard").find(".tile[data-file-Rank='" + rnkFile + "']").append(tile.piece.img);
        }
    });
}

function selectTile(tileElem) {
 
}
//Event listener for moving


//Only used for the very first click
$('.tile').on('click',function() {
    var x = this;
    firstClick.bind(x)();
});

function firstClick() {
    console.log('first');
    let elemPos = $(this).attr('data-file-Rank');
    let elemIndex = posToIndex(elemPos);
    //If there is a piece highlight possible moves and wait for second click
    if(board[elemIndex].piece) {
        //Highlight possible moves
        let moves = board[elemIndex].piece.validMoves();
        highlightMoves(moves);

    $('.tile').unbind();
    $('.tile').bind('click', secondClick(elemIndex));
    }
}

function secondClick(index) {
    return function() {
        console.log('second');
        let piece = board[index].piece; 
        let newRnkFl = $(this).attr('data-file-Rank');
        let newPos = posToIndex(newRnkFl);
        movePiece(piece, newPos); 

        $('.tile').unbind();
        $('.tile').bind('click', firstClick);
    }
}

//possible moves highlighted
function highlightMoves(moves) {
    moves.forEach(function(index) {
        let elemPos = indexToRankFile(index);
        let tile = $("#chessBoard").find(".tile[data-file-Rank='" + elemPos + "']");
        tile.addClass('highlighted');
    });
}













//Test Pieces

initBoard();
placePiece(new WhitePawn, '0,0');
placePiece(new WhiteQueen, '3,4');

draw();
