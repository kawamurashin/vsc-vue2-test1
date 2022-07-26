const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  outputDir: '../express/dist/public/',
  transpileDependencies: [
    'vuetify'
  ]
})
