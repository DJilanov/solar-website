module.exports = function(grunt) { // the general grunt function that is run
    
      grunt.initConfig({ // here we setup our config object with package.json and all the tasks
    
        pkg: grunt.file.readJSON('package.json'),
    
        sass: { // sass tasks
          dist: {
            options: {
              compass: true, // enable the combass lib, more on this later
              style: 'expanded' // we don't want to compress it
            },
            files: {
              'site/css/site.css': 'site/sass/site.scss' // this is our main scss file
            }
          }
        },
    
        cssmin: { // minifying css task
          dist: {
            files: {
              'site/css/site.min.css': 'site/css/site.css'
            }
          }
        },
    
        watch: { // watch task for general work
          sass: {
            files: ['site/sass/**/*.scss'],
            tasks: ['sass']
          },
          styles: {
            files: ['site/stylesheets/app.css'],
            tasks: ['cssmin']
          }
        }
      });
    
      // all the plugins that is needed for above tasks
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');
    
      // registering the default task that we're going to use along with watch
      grunt.registerTask('default', ['sass', 'cssmin']);
    };