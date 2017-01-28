const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
var {movePiece, WhiteQueen, WhiteKnight, WhiteBishop, WhiteRook, isSameTeam, WhiteKing, boundsToIndex, BlackPawn, returnTile, isTileEmpty, WhitePawn, indexToRankFile, placePiece, posToIndex, convertToBounds, board, boundsBoard, initBoard} = require('../public/concat');
    
describe('Chess Engine', function() {
    before(function() {
       initBoard(); 
    });
    afterEach(function() {
        board.map(function(tile) {
            return tile.piece = null;
        });
    });
    it('should create a board with 64 tile objects', function() {
        board.length.should.equal(64);
        board.forEach(function(tile) {
            tile.should.be.a('object');
            tile.should.have.keys('rankFile', 'index', 'piece');
            tile.rankFile.should.be.a('string');
            tile.index.should.be.a('number');
        });
    });

    it('should convert bounds index into boards index', function() {
        boundsToIndex(61).should.equal(32);
        boundsToIndex(22).should.equal(1);
        boundsToIndex(91).should.equal(56);
        //Add more tests
    });
    it('should check if tile is empty', function() {
        isTileEmpty(0).should.be.true;
    });


    describe('Pawn', function() {
        it('it should have correct moves', function() {
            placePiece(new WhitePawn, '0,0');
            placePiece(new BlackPawn, '1,1');
            placePiece(new BlackPawn, '0,2');

            board[0].piece.index.should.not.equal(board[9].piece.index);

            board[0].piece.index.should.equal(board[0].index);
            board[0].piece.validMoves().should.be.a('array');
            let cor1 = [8];
            let mov1 = board[0].piece.validMoves();
            mov1.length.should.equal(cor1.length);
            mov1[0].should.equal(cor1[0]);
            let cor2 = [1];
            let mov2 = board[9].piece.validMoves();
            mov2.length.should.equal(cor2.length);
            mov2[0].should.equal(cor2[0]);
            let cor3 = [9]; 
            let atk1 = board[0].piece.validAttack();
            atk1.length.should.equal(cor3.length);
            let atk2 = board[9].piece.validAttack();
            atk2.should.be.empty;
        });
    });

    describe('King', function() {
        it('should have correct moves in each corner', function() {
            placePiece(new WhiteKing, '0,0');
            placePiece(new WhiteKing, '0,7');
            placePiece(new WhiteKing, '7,0');
            placePiece(new WhiteKing, '7,7');

            board[0].piece.should.be.a('object');
            board[63].piece.should.be.a('object');
            board[7].piece.should.be.a('object');
            board[56].piece.should.be.a('object');

            let leftBottomCornerCorrectMoves = [1,8]
            let leftBottomCornerMoves = board[0].piece.validMoves();
            leftBottomCornerMoves.length.should.equal(leftBottomCornerCorrectMoves.length);
            for(i=0;i<leftBottomCornerCorrectMoves;i++){
                leftBottomCornerMoves[i].should.equal(leftBottomCornerCorrectMoves[i]);
            }
            let leftUpperCornerCorrectMoves = [57, 48];
            let leftUpperCornerMoves = board[56].piece.validMoves();
            leftUpperCornerMoves.length.should.equal(leftUpperCornerCorrectMoves.length);
            for(i=0;i<leftUpperCornerCorrectMoves.length;i++){
                leftUpperCornerMoves[i].should.equal(leftUpperCornerCorrectMoves[i]);
            }

            let rightBottomCornerCorrectMoves = [6,15];
            let rightBottomCornerMoves = board[7].piece.validMoves();
            leftBottomCornerMoves.length.should.equal(rightBottomCornerMoves.length);
            for(i=0;i<rightBottomCornerCorrectMoves.length;i++) {
                rightBottomCornerMoves[i].should.equal(rightBottomCornerCorrectMoves[i]);
            }

            let rightUpperCornerCorrectMoves = [62,55];
            let rightUpperCornerMoves = board[63].piece.validMoves();
            rightUpperCornerMoves.length.should.equal(leftUpperCornerCorrectMoves.length);
            for(i=0;i<rightUpperCornerCorrectMoves.length;i++) {
                rightUpperCornerMoves[i].should.equal(rightUpperCornerCorrectMoves[i]);
            }
        });
        it('should have correct moves without pieces around',function() {
            placePiece(new WhiteKing, '1,1');

            board[9].piece.should.be.a('object');
            let corMoves = [10,8,17,1];
            let moves = board[9].piece.validMoves();
            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect teamates', function() {
            placePiece(new WhiteKing, '0,0');
            placePiece(new WhitePawn, '1,0');

            board[0].should.be.a('object');
            board[8].should.be.a('object');
            
            let corMoves = [1];
            let moves = board[0].piece.validMoves();

            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect enemies', function() {
            placePiece(new WhiteKing, '0,0');
            placePiece(new BlackPawn, '1,0');

            let corMoves = [1,8];
            let moves = board[0].piece.validMoves();
            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });

    });

    describe('Rook', function() {
        it('should have correct moves', function() {
            placePiece(new WhiteRook, '0,0');
            placePiece(new WhiteRook, '1,1');
            placePiece(new WhitePawn, '2,1');
            placePiece(new BlackPawn, '1,4');

            let cor1=[1,2,3,4,5,6,7,8,16,24,32,40,48,56];
            let mov1=board[0].piece.validMoves();
            mov1.length.should.equal(cor1.length);
            for(let i=0;i<cor1.length;i++) {
                mov1[i].should.equal(cor1[i]);
            }

            let cor2=[10,11,12,8,1];
            let mov2=board[9].piece.validMoves();
            mov2.length.should.equal(cor2.length);

            for(let i=0;i<cor2.length;i++) {
                mov2[i].should.equal(cor2[i]);
            }

        });
    });

    describe('Bishop', function() {
        it('should have correct moves', function() {
            placePiece(new WhiteBishop, '0,0');
            placePiece(new WhiteBishop, '1,2');
            placePiece(new WhitePawn, '2,3');
            placePiece(new BlackPawn, '2,1');

            let cor1 = [9,18,27,36,45,54,63];
            let mov1 = board[0].piece.validMoves();

            mov1.length.should.equal(cor1.length);
            for(let i=0;i<cor1.length;i++) {
                mov1[i].should.equal(cor1[i]);
            }

            let cor2 = [3,1,17];
            let mov2 = board[10].piece.validMoves();

            mov2.length.should.equal(cor2.length);
            for(let i=0;i<cor2.length;i++) {
                mov2[i].should.equal(cor2[i]);
            }
        });
    });

    describe('Knight', function() {

        it('should have correct moves in each corner', function() {
            placePiece(new WhiteKnight, '0,0');
            placePiece(new WhiteKnight, '0,7');
            placePiece(new WhiteKnight, '7,0');
            placePiece(new WhiteKnight, '7,7');

            board[0].piece.should.be.a('object');
            board[63].piece.should.be.a('object');
            board[7].piece.should.be.a('object');
            board[56].piece.should.be.a('object');

            let leftBottomCornerCorrectMoves = [17,8]
            let leftBottomCornerMoves = board[0].piece.validMoves();
            leftBottomCornerMoves.length.should.equal(leftBottomCornerCorrectMoves.length);
            for(i=0;i<leftBottomCornerCorrectMoves;i++){
                leftBottomCornerMoves[i].should.equal(leftBottomCornerCorrectMoves[i]);
            }
            let leftUpperCornerCorrectMoves = [50,41];
            let leftUpperCornerMoves = board[56].piece.validMoves();
            leftUpperCornerMoves.length.should.equal(leftUpperCornerCorrectMoves.length);
            for(i=0;i<leftUpperCornerCorrectMoves.length;i++){
                leftUpperCornerMoves[i].should.equal(leftUpperCornerCorrectMoves[i]);
            }

            let rightBottomCornerCorrectMoves = [13,22];
            let rightBottomCornerMoves = board[7].piece.validMoves();
            leftBottomCornerMoves.length.should.equal(rightBottomCornerMoves.length);
            for(i=0;i<rightBottomCornerCorrectMoves.length;i++) {
                rightBottomCornerMoves[i].should.equal(rightBottomCornerCorrectMoves[i]);
            }

            let rightUpperCornerCorrectMoves = [46,53];
            let rightUpperCornerMoves = board[63].piece.validMoves();
            rightUpperCornerMoves.length.should.equal(leftUpperCornerCorrectMoves.length);
            for(i=0;i<rightUpperCornerCorrectMoves.length;i++) {
                rightUpperCornerMoves[i].should.equal(rightUpperCornerCorrectMoves[i]);
            }
        });
        it('should have correct moves without pieces around',function() {
            placePiece(new WhiteKnight, '2,2');

            board[18].piece.should.be.a('object');
            let corMoves = [35,28,12,3,1,8,24,33];
            let moves = board[18].piece.validMoves();
            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect teamates', function() {
            placePiece(new WhiteKnight, '0,0');
            placePiece(new WhitePawn, '2,1');

            board[0].should.be.a('object');
            board[17].should.be.a('object');
            
            let corMoves = [10];
            let moves = board[0].piece.validMoves();

            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect enemies', function() {
            placePiece(new WhiteKnight, '0,0');
            placePiece(new BlackPawn, '2,1');

            let corMoves = [17,10];
            let moves = board[0].piece.validMoves();
            moves.length.should.equal(corMoves.length);
            for(i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
    });

    describe('Queen', function() {
        it('should have correct moves', function() {
            placePiece(new WhiteQueen, '0,0');
            let corMoves = [1,2,3,4,5,6,7,8,16,24,32,40,48,56,9,18,27,36,45,54,63];
            let moves = board[0].piece.validMoves(); 
            
            moves.length.should.equal(corMoves.length);
            for(let i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect teamates', function() {
            placePiece(new WhiteQueen, '0,0');
            placePiece(new WhitePawn, '2,0');
            placePiece(new WhitePawn, '0,2');
            placePiece(new WhitePawn, '2,2');

            let corMoves = [1,8,9];
            let moves = board[0].piece.validMoves(); 
            
            moves.length.should.equal(corMoves.length);
            for(let i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
        it('should detect enemies', function() {
            placePiece(new WhiteQueen, '0,7');
            placePiece(new BlackPawn, '0,6');
            placePiece(new BlackPawn, '1,6');
            placePiece(new BlackPawn, '1,7');

            let corMoves = [6,15,14];
            let moves = board[7].piece.validMoves(); 
            
            moves.length.should.equal(corMoves.length);
            for(let i=0;i<corMoves.length;i++) {
                moves[i].should.equal(corMoves[i]);
            }
        });
    });


});
