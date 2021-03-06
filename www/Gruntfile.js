module.exports = function (grunt) {
	var _ = require('underscore'),
		modules = [
			'common',
			'header',
			'carchoose',
			'comments',
			'footer'
		],
		copyImages = [];

	_.each(modules, function(module) {
		copyImages.push({
			expand: true,
			cwd: 'app/modules/'+module+'/i/',
			src: ['*.png', '*.gif', '*.jpeg', '*.jpg'],
			dest: 'app/dest/i/'
		});
	});

    //описываем конфигурацию
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        /*jshint: {     // описываем как будет проверять наш код - jsHint
          options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true,
              $: true,
              console: true
            }
          },
        },*/
        clean: ['app/dest/*'],

        concat: {  //описываем работу плагина конкатенации
            dist: {
                /*src: [
					'bower_components/angular/angular.min.js',
					'bower_components/angular-router/angular-router.min.js'
				],  // какие файлы конкатенировать
                dest: 'dest/_vendor.js'  // куда класть файл, который получиться после процесса конкатенации б*/
				files: {
					/* js */
					'app/dest/js/_vendor.js': [
                        'bower_components/jquery/dist/jquery.min.js',
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-ui-router/release/angular-ui-router.js'
					],
                    'app/dest/js/_modules.js': [
                        'app/modules/common/js/common.js',
                        'app/modules/carchoose/js/carchoose.js'
                    ],

					/* css */
					'app/dest/css/_main.css': [
						'app/modules/common/css/common.css',
						'app/modules/header/css/header.css',
						'app/modules/carchoose/css/carchoose.css',
						'app/modules/comments/css/comments.css',
                        'app/modules/footer/css/footer.css'
						/*
						'app/css/login.css'
						'app/css/reg.css'
						'app/css/button.css'
						'app/css/pager.css'
						'app/css/offer-dealer.css'
						'app/css/offer-dealer-advantages.css'
						'app/css/offer-dealer-list.css'
						'app/css/offer-dealer-continue.css'
						'app/css/offer-dealer-redactor.css'
						'app/css/photos-list.css'
						'app/css/bidding.css'
						'app/css/jscrollpane.css'
						'app/css/sertificate.css'
						'app/css/brands.css'
						*/
					],
                    'app/dest/css/_login.css': [
                        'app/modules/common/css/common.css',
                        'app/modules/header/css/header.css',
                        'app/modules/login/css/login.css',
                        'app/modules/footer/css/footer.css'
                    ]
				}
            }
        },

        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },

            build: {
                src: 'app/dest/js/_vendor.js',  // какой файл минифицировать
                dest: 'app/dest/js/_vendor.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },

        //cssmin: { //описываем работу плагина минификации и конкатенации css.
        //    with_banner: {
        //        options: {
        //            banner: '/* My minified CSS */'  //комментарий который будет в output файле.
        //        },

        //        files: {
        //            'dest/style.min.css' : ['src/css/style1.css', 'src/css/style2.css']   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
        //        }
        //    }
        //},

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint', 'concat', 'uglify', 'removelogging']  //при их изменении запускать следующие задачи
            },
            css: {
                files: ['src/css/*.css'], //следить за всеми css файлами в папке src
                tasks: ['cssmin'] //при их изменении запускать следующую задачу
            }
        },

		copy: {
			main: {
				files: copyImages
			}
		}
    });

    //подгружаем необходимые плагины
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-remove-logging');


    //регистрируем задачу
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy']); //задача по умолчанию, просто grunt
    grunt.registerTask('test', ['']); //пока пусто, но кто знает, возможно в следующих уроках мы этим воспользуемся <img src="http://loftblog.ru/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley">
};