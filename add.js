// run regularly!
// copies y-a-v-a's solutions to here.
var fs = require('fs');

var path = '/Users/vincentb/Sites/solving-sol';
var ids = [];

fs.readdir(path, function(err, files) {
    var i = 0;

    for (; i < files.length; i++) {
        if (/[0-9]{3,}/.test(files[i])) {
            (function(i) {
                fs.readdir(path + '/' + files[i] + '/', function(err, files2) {
                    var source;
                    var newDir = __dirname + '/' + files[i];
                    var j = 0;
                    var target = newDir + '/index.html';

                    for(; j < files2.length; j++) {
                        if (/y\-a\-v\-a/.test(files2[j])) {
                            source = path + '/' + files[i] + '/' + files2[j] + '/index.html';
                            ids.push(files[i]);
                            if (!fs.existsSync(newDir)) {
                                fs.mkdirSync(newDir);
                                fs.createReadStream(source).pipe(fs.createWriteStream(target));
                            }
                        }
                    }
                    fs.writeFile(__dirname + '/solutions.json', JSON.stringify(ids, null, 4), function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }(i));
        }
    }
});