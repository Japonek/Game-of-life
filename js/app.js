addEventListener("DOMContentLoaded", function (event) {
    function GameOfLife(boardWidth, boardHeight, board) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];

        this.createBoard = () => {
            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height * 10 + "px";
            for (let i = 0; i < boardHeight; i++) {
                this.cells[i] = [];
                for (let j = 0; j < this.width; j++) {
                    let singleDiv = document.createElement("div");
                    this.board.appendChild(singleDiv);
                    this.cells[i].push(singleDiv);
                    singleDiv.addEventListener("click", function () {
                        (singleDiv.className === "live") ? singleDiv.classList.remove("live") : singleDiv.classList.add("live");
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
            /*
                        this.neigbours = [
                            this.cells[x - 1][y - 1],y
                            this.cells[x + 1][y + 1],y
                            this.cells[x - 1][y + 1],y
                            this.cells[x + 1][y - 1],
                            this.cells[x - 1][y],y
                            this.cells[x + 1][y],y
                            this.cells[x][y - 1],y
                            this.cells[x][y + 1]y
                        ];
                        let count = 0;
                        for (let i = 0; i < this.neigbours.length; i++) {
                            if (this.neigbours[i].className === "live") {
                                count++
                            }

                        }*/
            let count = 0;
            if (x !== 0 && this.cells[x - 1][y].className === "live") {
                count++
            }
            if (y !== 0 && this.cells[x][y - 1].className === "live") {
                count++
            }

            if (this.width - 1 > y && this.cells[x][y + 1].className === "live") {
                count++
            }
            if (this.height - 1 > x && this.cells[x + 1][y].className === "live") {
                count++
            }
            if (x !== 0 && y !== 0 && this.cells[x - 1][y - 1].className === "live") {
                count++
            }
            if (this.width - 1 > y && this.height - 1 > x && this.cells[x + 1][y + 1].className === "live") {
                count++
            }
            if (x !== 0 && this.width - 1 > y && this.cells[x - 1][y + 1].className === "live") {
                count++
            }
            if (y !== 0 && this.height - 1 > x && this.cells[x + 1][y - 1].className === "live") {
                count++
            }


            if ((this.cells[x][y].className === "" && count === 3) ||
                (this.cells[x][y].className === "live" && count === 2 || count === 3)) {
                return 1;
            } else {
                return 0;
            }

        }


        this.computeNextGeneration = () => {
            this.nextGeneration = []
            for (let i = 0; i < this.cells.length; i++) {
                this.nextGeneration[i] = []
                for (let j = 0; j < this.cells[i].length; j++) {
                    this.nextGeneration[i].push(this.computeCellNextState(i, j))
                }
            }
            this.printNextGeneration()

        }
        this.printNextGeneration = () => {
            for (let i = 0; i < this.nextGeneration.length; i++) {
                for (let j = 0; j < this.nextGeneration[i].length; j++) {
                    this.nextGeneration[i][j] ? this.cells[i][j].className = "live" : this.cells[i][j].className = ""
                }

            }
        }


    }

    let game = new GameOfLife(50, 50);

    game.createBoard();
    game.firstGlider()

    let play = document.querySelector(".play")
    let forward = document.querySelector("#forward")
    let backward = document.querySelector("#backward")
    let intervalId;
    let timer = 500;

interval=(timer)=>{
    clearInterval(intervalId)
    play.classList == "play" ? intervalId = setInterval(() => {
        game.computeNextGeneration()
    }, timer) : clearInterval(intervalId);
}

    play.addEventListener("click", function () {
       interval(timer)
        play.classList.toggle("stop");
        play.classList.toggle("play");
    })

    forward.addEventListener("click", function () {
        timer > 100 ? timer -= 100 : timer=100
        interval(timer)
    })
    backward.addEventListener("click", function () {
        timer < 1000 ? timer += 100 : timer=1000
        interval(timer)
    })


});