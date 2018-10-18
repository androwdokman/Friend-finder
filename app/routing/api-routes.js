var Friends = require('../data/friends.js');

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(Friends);

    });
    app.post('/api/friends', function(req, res) {

        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;
        for (var i = 0; i < Friends.length; i++) {
            var scoresDiff = 0;

            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(Friends[i].scores[j]) - parseInt(newFriendScores[j])));
            }


            scoresArray.push(scoresDiff);
        }


        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }


        var bff = Friends[bestMatch];
        res.json(bff);


        Friends.push(req.body);
    });
};