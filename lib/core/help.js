
const program = require('commander')

const helpOptions = () => {
    // 增加自己的options
    program.option('-c --codecli', 'a codecli option')

    program.option('-s --src <src>', 'a source folder')
    program.option('-d --dest <dest>', 'a destination folder，例如：-d /src/views，错误/src/views')

    // 自定义help
    program.on('--help', function () {
        console.log('')
        console.log('usage')
        console.log("codecli -v")
        console.log("codecli --version")
    })

}

module.exports = helpOptions