addEventListener("DOMContentLoaded", function (event) {
    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;

    }

    var game=new GameOfLife(10,10)
    console.log(game)

});