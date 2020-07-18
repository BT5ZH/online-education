const fs = require("fs");
module.exports = {
  pages: {
    index: "src/views/index/main.js",
    // console: {
    //     // 应用入口配置，相当于单页面应用的main.js，必需项
    //     entry: 'src/views/console/console.js',

    //     // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    //     template: 'public/console.html',

    //     // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    //     filename: 'console.html',

    //     // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
    //     // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: 'console page',

    //     // 包含的模块，可选项
    //     // chunks: ['console'] chunks 有问题
    // },
    console: "src/views/console/console.js",
    // 只有entry属性时，直接用字符串表示模块入口
    client: "src/views/client/client.js",
    online: "src/views/online/online.js",
  },
  css: {
    loaderOptions: {
      // sass: {
      //   prependData: fs.readFileSync('src/variables.scss', 'utf-8')
      // },
      sass: {
        prependData: `@import "~@/assets/sass/variables.scss";`,
      },
      scss: {
        prependData: `@import "~@/assets/sass/variables.scss";`,
      },
      // assetsDir: `@/assets/`
    },
  },
  // devServer:{
  //   proxy:{
  //     '/aws/*':{
  //       target:'https://67yra4mxye.execute-api.cn-northwest-1.amazonaws.com.cn/rsuser',
  //       changeOrigin:true,
  //       secure:true,
  //       pathRewrite:{
  //         '^/aws':'/aws'
  //       }
  //     }
  //   }
  // }
};
