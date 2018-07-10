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
                this.cells[j] = [];
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

        this.setCellState = (x, y, state) => {
            this.cells[x][y].className = state;
        }
        this.firstGlider = () => {
            this.setCellState(0, 1, "live")
            this.setCellState(1, 2, "live")
            this.setCellState(2, 0, "live")
            this.setCellState(2, 1, "live")
            this.setCellState(2, 2, "live")
        };


        this.computeCellNextState = (x, y) => {

            this.neigbours = [
                this.cells[x - 1][y - 1],
                this.cells[x + 1][y + 1],
                this.cells[x - 1][y + 1],
                this.cells[x + 1][y - 1],
                this.cells[x - 1][y],
                this.cells[x + 1][y],
                this.cells[x][y - 1],
                this.cells[x][y + 1]
            ];
            let count = 0;
            for (let i = 0; i < this.neigbours.length; i++) {
                if (this.neigbours[i].className === "live") {
                    count++
                }

            }
            if ((this.cells[x][y].className === "" && count === 3) ||
                (this.cells[x][y].className = "live" && count === 2 || count === 3)) {
                return 1;
            } else {
                return 0;
            }

        }


        this.computeNextGeneration=()=>{
            this.nextGeneration=[]
            for(let i =0 ;i<this.cells.length;i++){
                for(let j=0;j<this.cells[i].length;j++){
                   this.nextGeneration.push (this.computeCellNextState(i,j))
                }
            }


            }


    }

    let game = new GameOfLife(10, 10);

    game.createBoard();
    console.log(game.cells);
    console.log(game.cells[1][1]);
    game.firstGlider()
    console.log(game.computeCellNextState(1,1))
game.computeNextGeneration()
    console.log(game.nextGeneration)


});