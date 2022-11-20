

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

// ejs编译
const compile = (templateName, data) => {
    const templatePosition = `../templates/${templateName}`
    const templatePath = path.resolve(__dirname, templatePosition)

    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data } , {}, (err, result) => {
            if(err) {
                console.error(err)
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

// 同步创建文件夹 source/components/Home
const createDirSync = (pathName) => {
    if(fs.existsSync(pathName)) {
        return true
    } else {
        // 获取这路径的父路径 判断父路径是否存在
        if(createDirSync(path.dirname(pathName))) {
            // 存在创建文件
            fs.mkdirSync(pathName)
            return true
        }
    }
}

const writeToFile = (path, content) => {
    // 判断当前路径是否存在，如果不存在，则创建新的文件
    return fs.promises.writeFile(path, content)
}

module.exports = {
    compile,
    writeToFile,
    createDirSync
}