module.exports = function (grunt) {
  // 加载插件
  [
    'grunt-eslint',
    'runt-mocha-test',
    'grunt-exec',
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  // 配置插件
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // 注册任务 默认被执行的任务列表
  grunt.registerTask('default', ['cafemocha', 'jshint', 'exec'])
}