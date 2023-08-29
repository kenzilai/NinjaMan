const NUM_ROWS = 10
        const NUM_COLS = 25
        var world = new Array(NUM_ROWS).fill(1).map(() => new Array(NUM_COLS).fill(1));

        var worldDict = {
            0: 'blank',
            1: 'wall',
            2: 'sushi',
            3: 'onigiri'
        }

        var score = 0;
        
        var ninjaman = {
            x: 1,
            y: 1
        }

        var ghosts = {
            "bluey": {x: 1, y: NUM_ROWS-2},
            "red": {x: NUM_COLS-2, y: 1},
            "pinky": {x: NUM_COLS-2, y: NUM_ROWS-2},
            "pumpky": {x: 1, y: NUM_ROWS-2},
        }

        // Randomize world
        for(var row = 1; row < world.length-1; row++){
            for(var col = 1; col < world[row].length-1; col++){
                world[row][col] = Math.floor(Math.random() * 1.25 + 0.8) + 1;
            }
        }
        world[1][1] = 0;

        function drawWorld() {
            output = "";

            for(var row = 0; row < world.length; row++){
                output += "<div class = 'row'>"
                for(var x = 0; x < world[row].length; x++){
                    output += "<div class = '" + worldDict[world[row][x]] +"'></div>"
                }
                output += "</div>"
            }
            
            document.getElementById('world').innerHTML = output;

            document.getElementById('score').innerHTML = score.toString();
        }
        drawWorld();
        

        function drawNinjaman() {
            document.getElementById('ninjaman').style.top = ninjaman.y * 40
                + 'px'
            document.getElementById('ninjaman').style.left = ninjaman.x * 40
                + 'px'
        }
        drawNinjaman();

        function drawGhosts() {
            document.getElementById('bluey').style.top = ghosts["bluey"].y * 40 + 'px'
            document.getElementById('bluey').style.left = ghosts["bluey"].x * 40 + 'px'

            document.getElementById('red').style.top = ghosts["red"].y * 40 + 'px'
            document.getElementById('red').style.left = ghosts["red"].x * 40 + 'px'

            document.getElementById('pinky').style.top = ghosts["pinky"].y * 40 + 'px'
            document.getElementById('pinky').style.left = ghosts["pinky"].x * 40 + 'px'

            document.getElementById('pumpky').style.top = ghosts["pumpky"].y * 40 + 'px'
            document.getElementById('pumpky').style.left = ghosts["pumpky"].x * 40 + 'px'
            // TODO: draw the other ghosts
        }
        drawGhosts();

        document.onkeydown = function(e) {
            if(e.keyCode == 37) {
                if(world[ninjaman.y][ninjaman.x - 1] != 1) ninjaman.x--;
            } else if(e.keyCode == 38) {
                if(world[ninjaman.y - 1][ninjaman.x] != 1) ninjaman.y--;
            } else if(e.keyCode == 39) {
                if(world[ninjaman.y][ninjaman.x + 1] != 1) ninjaman.x++;
            } else if(e.keyCode == 40) {
                if(world[ninjaman.y + 1][ninjaman.x] != 1) ninjaman.y++;
            }

            var curPos = world[ninjaman.y][ninjaman.x]
            if (curPos == 2 || curPos == 3) {
                world[ninjaman.y][ninjaman.x] = 0;
                if(curPos == 2) {
                    score++;
                }
                else if(curPos ==3) {
                    score += 3;
                }
            }

            drawWorld()
            drawNinjaman()
            drawGhosts()
        }

        function moveAllGhosts() {
            moveGhost(ghosts["bluey"])
            moveGhost(ghosts["red"])
            moveGhost(ghosts["pinky"])
            moveGhost(ghosts["pumpky"])
            drawGhosts()
        }

        function moveGhost(ghost) {
            var randomDir = Math.floor(Math.random() * 4) // 0, 1, 2, or 3
            if(randomDir == 0 && isSpaceOpen(ghost.y - 1, ghost.x)) { // up
                ghost.y--;
            } else if(randomDir == 1 && isSpaceOpen(ghost.y + 1, ghost.x)) { // down
                ghost.y++;
            } else if(randomDir == 2 && isSpaceOpen(ghost.y, ghost.x - 1)) { // left
                ghost.x--;
            } else if(randomDir == 3 && isSpaceOpen(ghost.y, ghost.x + 1)) { // right
                ghost.x++;
            }
        }

        function isSpaceOpen(y, x) {
            return world[y][x] != 1 &&
                !(ghosts["bluey"].x == x && ghosts["bluey"].y == y) &&
                !(ghosts["red"].x == x && ghosts["red"].y == y) &&
                !(ghosts["pinky"].x == x && ghosts["pinky"].y == y) &&
                !(ghosts["pumpky"].x == x && ghosts["pumpky"].y == y)
        }

        window.setInterval(moveAllGhosts, 1000)