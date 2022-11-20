const program = require('commander')
const {
    createProjectAction,
    addComponentAction,
    addPage,
    addVue3Page,
    addVue3PageSetup,
    addStoreAction
} = require('./actions')

const createCommands = () => {
    // 1. create创建项目使用
    program
        .command('create <project> [others...]')
        .description('clone a repository into a folder')
        .action(createProjectAction)

    // 2. 创建组件模板
    program
        .command('addcpn <name>')
        .description('add vue component，例如：codecli addcpn HelloWord [-d src/components]')
        .action((name) => {
            //  取出 -d 的后面路径和命令 自动加入到program.dest属性中
            addComponentAction(name, program.dest || 'src/components')
        })

    // 3. 创建.vue pages模板
    // 3.1 创建vue2
    program
        .command('addpage <name>')
        .description('add vue page and router config，例如：codecli addpage Home [-d src/page]')
        .action((name) => {
            // 取出 -d 的后面路径和命令 自动加入到program.dest属性中
            // addPageAndRouteAction(name, program.dest || `src/views/${name.toLowerCase()}`)
            addPage(name, program.dest || `src/views/${name.toLowerCase()}`)
        })

    // 3.2 创建vue3页面
    program
        .command('add3page <name>')
        .description('add vue page，例如：codecli add3page Home [-d dest]')
        .action(name => {
            addVue3Page(name, program.dest || `src/views/${name.toLowerCase()}`)
        })

    // 3.3 创建vue3-ts页面
    program
        .command('add3page_setup <name>')
        .description('add vue page，例如：codecli add3page_setup Home [-d dest]')
        .action(name => {
            addVue3PageSetup(name, program.dest || `src/views/${name.toLowerCase()}`)
        })

    // 4. 创建store存储
    program
        .command('addstore <store>')
        .description('add vue store，例如：codecli addstore Home [-d src/store]')
        .action((name) => {
            addStoreAction(name, program.dest || `src/store/modules${name.toLowerCase()}`)
        })
} 

module.exports = createCommands