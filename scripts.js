var turn = 'X'
var gameWinner = ""
var gameState= ["","","","","","","","",""]
var position = []
var p1 = "Player X"
var p2 = "Player O"
var player = ""
var counter = 0;
var gameStarted = false
const colors = ['red','orange','yellow','cyan','green','blue','violet']
var deg = 0;
var moves = []
// setInterval(function() {
//     console.log($('#frontpage').css('background-image'))
//     $('#frontpage').css('background-image',`linear-gradient(${deg}deg, hsl(280, 100%, 87%),hsl(280, 100%, 97%))`)
//     deg = (deg == 360)? 0 : deg+1;
// },10)
VanillaTilt.init();
var colorchangerVar;
function colorchangerFn() {
    colorchangerVar = setInterval(colorchanger,200)
}

function colorchanger() {
    $('#player-text').css('color',colors[counter])
    $('#player-text').css('text-shadow',`0px 0px 2px ${colors[counter]}`)
    counter = (counter == colors.length - 1)? 0: counter+1
}

function initgame() { 
    console.log("Initialised!")
    $('.board-cell').hover(
        function() { 
            if (gameState[$(this).data('id')] == '' && !$(this).hasClass('disabled')) {
                $(this).addClass('hover ' + turn)
            }
        },
        function() { 
            if (gameState[$(this).data('id')] == '' && !$(this).hasClass('disabled'))
                $(this).removeClass('hover '+ turn) 
        }
    )

    $('.board-cell').click(function() {
        gameStarted = true
        if (gameState[$(this).data('id')] == '' && !$(this).hasClass('disabled')) {
            $(this).addClass(turn)
            $(this).removeClass('hover')
            gameState[$(this).data('id')] = turn
            moves.push($(this).data('id'))
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
            gameWinner = player
            break
        }
    }
    if (gameWinner == "" && !gameState.includes(''))
        gameWinner = 'draw'
    if(gameWinner != "")
        winner(gameWinner)
    else changePlayer()
}
function changePlayer() {
    turn = (turn == 'X') ? 'O' : 'X'
    player = (turn == 'O') ? p2 : p1
    $('.board-cell').removeClass('disabled')
    $('#player-text').text(player+"'s turn")
    if (gameState.filter(el => el == '').length < 4) {
        el_to_remove = moves.shift()
        $(`[data-id=${el_to_remove}]`).removeClass('X O hover')
        $(`[data-id=${el_to_remove}]`).addClass('disabled')
        gameState[el_to_remove] = ''
    }

}
function winner(player) {
    $('.board-cell').off();
    let winnertext = `${player} wins!`
    if(player == 'draw') {
        $(`.board-cell`).css('background-color','#ffd743')
        winnertext = "It's a tie :/"
        $('#player-text').text(winnertext)
    }
    else {
        $('.board-cell').removeClass('disabled')
        for(let a in position)
            $(`[data-id=${position[a]}]`).css('background-color','lightgreen')
        $('#player-text').text(winnertext)
        colorchangerFn();
    }    
    
}

function resetboard() {
    console.log('Restarted')
    $(`.board-cell`).css('background-color','')
    $('.board-cell').removeClass('X O disabled')
    turn = 'X'
    gameWinner = ""
    gameState= ["","","","","","","","",""]
    position = []
    player = p1
    gameStarted = false
    moves = []
    clearInterval(colorchangerVar)
    $('#player-text').css('color', 'black')
    $('#player-text').css('text-shadow', 'none')
    $('#player-text').text(p1 +"'s turn")
    initgame();
}

$('#start-btn').click(assignPlayers = function() {
    p1 = $(`#p1`).val() || 'Player X'
    p2 = $(`#p2`).val() || 'Player O'
    if (gameStarted == false)
        player = p1;
    $(`#player-text`).text(`${player}'s turn`)
})


initgame();