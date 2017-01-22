//Board rendering
function draw() {
    //Clear the board
    $.each($('.tile'), function() {
        $(this).find('img').remove();
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
    if(board[elemIndex].piece) {
        console.log('piece is here');
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















//Test Pieces

initBoard();
placePiece(new WhitePawn, '0,0');
placePiece(new WhiteQueen, '3,4');

draw();
