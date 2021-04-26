var turn = 'X'
var gameWinner = ""
var gameState= ["","","","","","","","",""]
var position = []

function initgame() { 
    console.log("Initialised!")
    $('.board-cell').hover(
        function() { 
            if (gameState[$(this).data('id')] == '') {
                // $(this).css("opacity", 0)
                // setTimeout(() => $(this).css("opacity", 1) , 300)
                $(this).addClass('hover ' + turn)
            }
        },
        function() { 
            if (gameState[$(this).data('id')] == '')
                $(this).removeClass('hover '+ turn) 
        }
    )

    $('.board-cell').click(function() {
        if (gameState[$(this).data('id')] == '') {
            $(this).addClass(turn)
            $(this).removeClass('hover')
            gameState[$(this).data('id')] = turn
            checkwin();
        }
    })
}


function checkwin() {
    let winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0; i<8; i++) {
        position = winningPositions[i]
        let a = gameState[position[0]];
        let b = gameState[position[1]];
        let c = gameState[position[2]];
        if(a=='' || b=='' || c=='')
            continue;
        if (a==b && b==c) {
            gameWinner = turn
            break
        }
    }
    if (!gameState.includes(''))
        gameWinner = 'draw'
    if(gameWinner != "")
        winner(gameWinner)
    else changePlayer()
}
function changePlayer() {
    turn = (turn == 'X')? 'O' : 'X'
    $('#player-text').text("Player " + turn +"'s turn")
}
function winner(player) {
    for(let a in position)
        $(`[data-id=${position[a]}]`).css('background-color','#ffd743')
    $('.board-cell').off();
    let winnertext= player + " wins! :)"
    if(player == 'draw') 
        winnertext = "It's a draw :/"
    $('#player-text').text(winnertext)
}

function resetboard() {
    console.log('Restarted')
    $(`.board-cell`).css('background-color','#ffa889')
    $('.board-cell').removeClass('X O')
    turn = 'X'
    gameWinner = ""
    gameState= ["","","","","","","","",""]
    $('#player-text').text("Player " + turn +"'s turn")
    initgame();
}

initgame();