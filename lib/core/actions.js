
const path = require('path');
// promisify 将多层回调函数外包一层promise
const { promisify } = require('util')
// 当前支持promise
const downloadRepo = promisify(require('download-git-repo'))
const open = require('open')

const log = require('../utils/log')
const repoConfig = require('../config/repo-config')
const terminal = require('../utils/terminal.js');

const { ejsCompile, writeFile, mkdirSync } = require('../utils/file');

// callback -> promisify(函数) -> Promise -> async await
// 1. 创建项目 安装依赖 运行打开浏览器
const createProject = async (project) => {
    //   console.log('why helps you create your project~');
    // 1. 提示信息
    log.hint('codecli helps you create your project, please wait a moment~')

    // 1.1. clone项目
    await downloadRepo(repoConfig.vueGitRepo, project, { clone: true })

    // 1.2. 执行npm install
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    // await commandSpawn(commandCode, ['install'], { cwd: `./${project}` })
    await (commandCode, ['install'], { cwd: `./${project}` })
    console.log('开始运行...')

    // 1.3. 运行npm run serve
    terminal.spa(npm, ['run', 'serve'], { cwd: `./${project}` })

    // 1.4. 打开浏览器
    open('http://localhost:8080/')
}

handleEjsToFile = async(name, dest, template, filename) => {
    // 1. 获取模板引擎的路径
    const templatePath = path.resolve(__dirname, template)
    const cpnPath = dest.replace('router', 'views').replace('src', '@') + `/${name}.vue`
    const routePath = dest.replace('/router', '').replace('src', '')
    const result = await ejsCompile(template, { name, lowerName: name.toLowerCase(), cpnPath, routePath })

    // 2. 写入文件中
    // 首先判断文件是否存在，不存在则创建
    mkdirSync(dest)
    const targetPath = path.resolve(dest, filename)
    writeFile(targetPath, result)
}

const addComponent = async(name, dest) => {
    handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
}

const addPage = async(name, dest) => {
    handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}

const addVue3TSComponent = async(name, dest) => {
    handleEjsToFile(name, dest, '../template/component3_ts.vue.ejs', `${name}.vue`)
}

const addVue3Page = async(name, dest) => {
    addVue3TSComponent(name, dest)
    let routeDest = dest.replace('views', 'router')
    handleEjsToFile(name, routeDest, '../template/vue-router4.js.ejs', `${name}.ts`)
}

const addVue3PageSetup = async(name, dest) => {
    handleEjsToFile(name, dest, '../template/component3_ts_su.vue.ejs', `${name}.vue`)
    let routeDest = dest.replace('views', 'router')
    handleEjsToFile(name, routeDest, '../template/vue-router4.js.ejs', `${name}.ts`)
}

const addStore = async(name, dest) => {
    handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
    handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

// // 2. 创建组件模板 添加组件的action
// const addComponentAction = async(name, dest) => {
//     // 2.1. 有对应的ejs模板
//     const res = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() })
//     console.log(res)

//     // 2.2. 写入文件 router.js 编译ejs模板 res
//     console.log('打印dest：', dest)
//     const targetPath = path.resolve(dest, `${name}.vue`)
//     console.log('拼接的写文件路径：', targetPath)
//     writeToFile(targetPath, res)
// }

// // 3. 添加页面和路由
// const addPageAndRouteAction = () => async(name, dest) => {
//     // 3.1 编译模板
//     const data = { name, lowerName: name.toLowerCase() }
//     const pageRes = await compile('vue-component.ejs'. data)
//     const routeRes = await compile('vue-router.ejs', data)
//     // console.log(res)

//     const targetDest = path.resolve(dest, name.toLowerCase())

//     // 3.2 写入文件
//     if(createDirSync(targetDest)) {
//         const pagePath = path.resolve(targetDest, `${name}.vue`)
//         const routePath = path.resolve(targetDest, 'router.js')
//         writeToFile(pagePath, pageRes)
//         writeToFile(routePath, routeRes)
//     }
// }

// // 4. 添加存储 store
// const addStoreAction = async(name, dest) => {
//     const storeRes = await compile('vue-store.ejs', {})
//     const typeRes = await compile('vue-types.ejs', {})

//     const targetDest = path.resolve(dest, name.toLowerCase())
    
//     // 4.1 写入文件
//     if(createDirSync(targetDest)) {
//         const storePath = path.resolve(dest, `${name}.js`)
//         const typePath = path.resolve(dest, 'types.js')
//         writeToFile(storePath, storeRes)
//         writeToFile(typePath, typeRes)
//     }
// }

module.export = {
    createProject,
    addComponent,
    addPage,
    addVue3Page,
    addVue3PageSetup,
    addStore
}