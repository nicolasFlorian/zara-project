const { exec } = require('child_process');
const chokidar = require('chokidar');

function imageConvert(cb){
    const command = 'find ./src/assets/images/*.jpeg -exec bash -c \'cwebp -q 30 "$1" -o "./src/assets/images/webp/$(basename "$1" .jpeg).webp"\' _ {} \\;';
    exec(command, (err, stdout, stderr) => {
        if (err){
            console.error(`exec error: ${err}`)
        } else {
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            console.log('The images were converted to webp');
            if (cb) {
                cb();
            }
        }
    });
}

imageConvert(() => {
    console.log('Conversion done!');
});

chokidar.watch('./src/assets/images/*.jpeg', { ignoreInitial: true }).on('add', () => {
    imageConvert();
})