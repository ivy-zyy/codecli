
// 异步创建
const { spawn, exec } = require('child_process')

const spawnCommand = (...args) => {
    return new Promise((resole, reject) => {
        // 执行子进程
        const childProcess = spawn(...args)
        // 流中的管道将信息打印出来
        childProcess.stdout.pip(process.stdout)
        childProcess.stderr.pip(process.stderr)

        // 这里的命令执行完成后，通知结束，回到第三部继续执行 npm run serve
        childProcess.on('close', () => {
            resole()
        })
    })
}

const execCommand = (...args) => {
    return new Promise((resole, reject) => {
        exec(...args, (err, stdout, stderr) => {
            if(err) {
                reject(err)
                return
            }
            console.log(stdout.replace('\n', ''))
            resole()
        })
    })
}

module.exports = {
    spawn: spawnCommand,
    exec: execCommand
}