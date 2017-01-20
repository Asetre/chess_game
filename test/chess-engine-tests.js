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
        it('should have correct moves', function() {
            placePiece(new WhiteKing, '0,0');
            placePiece(new WhiteKing, '0,7'); 
            placePiece(new WhitePawn, '0,6');
            placePiece(new BlackPawn, '1,7');
            board[6].piece.team.should.equal(board[7].piece.team);
            board[0].piece.validMoves().should.be.a('array');
            let cor1 = [8, 1];
            let mov1 = board[0].piece.validMoves();
            mov1.length.should.equal(cor1.length);
            let cor2 = [15];
            let mov2 = board[7].piece.validMoves();
            mov2.length.should.equal(cor2.length);
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
        it('should have correct moves', function() {
            placePiece(new WhiteKnight, '0,0');            
            placePiece(new WhiteKnight, '2,6');
            placePiece(new WhitePawn, '4,5');
            placePiece(new BlackPawn, '4,7');

            let cor1 =[17,10];
            let mov1=board[0].piece.validMoves();

            mov1.length.should.be.equal(cor1.length);
            for(let i=0;i<cor1;i++) {
                mov1[i].should.be.equal(cor1[i]);
            }

            let cor2=[35,7,5,12,28];
            let mov2=board[20].piece.validMoves();

            mov2.length.should.equal(cor2.length);
            for(let i=0;i<cor2.length;i++) {
                mov2[i].should.equal(cor2[i]);
            }
        });
    });

    describe('Queen', function() {
        it('should have correct moves', function() {
            placePiece(new WhiteQueen, '0,0');
            placePiece(new WhiteQueen, '1,7');
            placePiece(new WhitePawn, '1,6');
            placePiece(new WhitePawn, '2,6');
            placePiece(new BlackPawn, '2,7');

            let cor1=[1,2,3,4,5,6,7,8,16,24,32,40,48,56,9,18,27,36,45,54,63];
            let mov1=board[0].piece.validMoves();
            mov1.length.should.equal(cor1.length);
            for(let i=0;i<cor1.length;i++) {
                mov1[i].should.equal(cor1[i]);
            }
            let cor2=[21,7,6];
            let mov2=board[14].piece.validMoves();
            mov2.length.should.equal(cor2.length);

        });
    });


});
