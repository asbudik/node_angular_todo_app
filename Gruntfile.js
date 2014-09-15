module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      tasks: 'coffee'
    },
    coffee: {
      compile: {
        files: {
          '../todo_app_angular_node/public/js/coffcompile.js': '../todo_app_angular_node/public/coffee/app.js.coffee' // 1:1 compile
        }
      }
    }
  });
  // Default task.
  grunt.registerTask('default', 'coffee');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

};