const socket = io.connect();
const findMatchBtn = document.getElementById('find-match-js');

$('#find-match-js').on('click', function(e) {
    e.preventDefault();

    socket.emit('find-match', {id: user.id});
});


