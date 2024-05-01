const chokidar = require('chokidar');
const fs = require('fs');

const directoryToWatch = './src/icons/**';

chokidar.watch(directoryToWatch, { ignoreInitial: true }).on('add', (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

    const result = data.replace(/fill=(?:"([^"]*)"|'([^']*)'|\S+)/g, '');

    fs.writeFile(path, result, 'utf8', (err) => {
            if (err) {
                console.error(err);
            }
            console.log(`File ${path} has been modified`);
        });
    });
});