addEventListener("DOMContentLoaded", function (event) {
    function GameOfLife(boardWidth, boardHeight, board) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.sum = boardHeight * boardWidth;
        this.cells = [];

        this.createBoard = () => {
            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height * 10 + "px";
            for (let j = 0; j < boardHeight; j++) {
                this.cells[j]=[];
                for (let i = 0; i < this.width; i++) {
                    let singleDiv = document.createElement("div");
                    this.board.appendChild(singleDiv);
                    this.cells[j].push(singleDiv);
                    singleDiv.addEventListener("click", function () {
                        (singleDiv.className == "live") ? singleDiv.classList.remove("live") : singleDiv.classList.add("live");
                    })
                }
            }
        }


    }

    let game = new GameOfLife(10, 10);
    console.log(game.cells);
    game.createBoard();

});