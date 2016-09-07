var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function(socket) {
    var arr = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
        // socket.emit('news', { hello: 'world1' });
    var i = 0;

    setInterval(function() {
        if (i <= arr.length - 1) {
            socket.emit('news', { hello: arr[i], index: i });
            i++;
        } else {
            clearInterval();
        }


    }, 2000)


    socket.on('my other event', function(data) {
        setTimeout(function() {
            console.log(data);
        }, 5000)
    });


});