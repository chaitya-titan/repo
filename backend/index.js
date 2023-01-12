const express = require('express');
const { spawn } = require('child_process');
const app = express();

const buildPath = "./build";

app.use(express.json());
app.use(express.static(
    buildPath
))

app.post('/run-exe', (req, res) => {
    const filePath = req.body.filePath;
    const args = ['arg1','arg2'];
    
    const child = spawn(filePath, args);
    
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    res.status(200).send('Running the exe file')
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
