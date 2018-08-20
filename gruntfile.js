module.exports = function(grunt) {
	
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	babel: {
		options: {
			sourceMap: false,
			presets: ['es2015']
		},
		dist: {
		  files: [{
			expand: true,
        	cwd: 'src',
			src: ['src/**/*.js'],
			dest: '.js',
			ext: '.js'
		  }]
		}
	},
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      tasks: ['concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);
};
