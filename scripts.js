$(".board-cell").data('selected',false)
var turn = 1

function startgame() {
    if (turn === 1) {
        play('X')
    }
    else if (turn === 2) {
        play('O')
    }
    if(false) {
        
    }
}

function play(ch) {
    $('.board-cell').hover(
        function() { 
            if ($(this).data('selected') == false) {
                $(this).addClass('hover ' + ch)
                $(this).on('click', function() {
                    turn = (turn%2) + 1
                    console.log(turn)
                    $(this).removeClass('hover')
                    $(this).data('selected',true)
                })
            }
        },
        function() { 
            if ($(this).data('selected') == false)
                $(this).removeClass('hover ' + ch) 
        })
}

startgame()
