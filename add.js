// run regularly!
// copies y-a-v-a's solutions to here.
var fs = require('fs');

var path = '/Users/vincentb/Projects/solving-sol';
var ids = [];

fs.readdir(path, function (err, files) {
  for (let i = 0; i < files.length; i++) {
    let drawingNumber = files[i];

    if (/[0-9]{3,}/.test(drawingNumber)) {
      fs.readdir(`${path}/${drawingNumber}/`, function (err, files2) {
        var targetDir = __dirname + '/' + drawingNumber;

        for (let j = 0; j < files2.length; j++) {
          let sourceDir = files2[j];

          if (/y\-a\-v\-a/.test(sourceDir)) {
            ids.push(drawingNumber);

            fs.readdir(
              path + '/' + drawingNumber + '/' + sourceDir,
              function (err, files3) {
                if (!fs.existsSync(targetDir)) {
                  fs.mkdirSync(targetDir);
                }

                for (let k = 0; k < files3.length; k++) {
                  let fileName = files3[k];
                  let filePath =
                    path +
                    '/' +
                    drawingNumber +
                    '/' +
                    sourceDir +
                    `/${fileName}`;
                  let target = `${targetDir}/${fileName}`;
                  fs.createReadStream(filePath).pipe(
                    fs.createWriteStream(target),
                  );
                }
              },
            );
          }
        }
        ids = ids.sort();
        fs.writeFile(
          __dirname + '/solutions.json',
          JSON.stringify(ids, null, 4),
          function (err) {
            if (err) {
              throw err;
            }
          },
        );
      });
    }
  }
});
