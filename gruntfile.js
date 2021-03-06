/**
 * @author: Raja
 * @description: a gruntfile.js template setting up a basic GRUNT task runner for sass-eo
 * @requires: grunt grunt-contrib-sass grunt-contrib-watch grunt-shell load-grunt-tasks sassdoc
 */
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt); // grunt plugins loader

	// all files destination
	const backupsDestination = './backups/';

	// node-glob syntax
	const includeAllFiles = ['**/*', '.*/**/*', '**/.*', '**/.*/**/*'];

	/**
	 * ~ ALL GRUNT PLUGINS CONFIG ~
	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		/**
		 * Compile sass to css
		 */
		sass: {
			test: {
				options: {
					style: 'compressed', // output style: compact, expanded, compressed
				},
				files: [
					// scss file list
					{
						src: ['./test/main.scss'],
						dest: './test/style.css',
					},
				],
			},
		},

		/**
		 * Run shell commands
		 */
		shell: {
			sassdoc: {
				command: ['sassdoc .', 'cd sassdoc', 'xdg-open index.html'].join('&&'),
			},
		},

		/**
		 * Compress files and folders (incremental backup)
		 */
		compress: {
			main: {
				options: {
					archive: backupsDestination + 'main.tar.gz',
				},
				files: [{ src: ['./*', './.*'] }],
				filter: 'isFile',
			},
			config: {
				options: {
					archive: backupsDestination + 'config.tar.gz',
				},
				expand: true,
				cwd: './config/',
				src: includeAllFiles,
				dest: 'config',
			},
			docs: {
				options: {
					archive: backupsDestination + 'docs.tar.gz',
				},
				expand: true,
				cwd: './docs/',
				src: includeAllFiles,
				dest: 'docs',
			},
			modules: {
				options: {
					archive: backupsDestination + 'modules.tar.gz',
				},
				expand: true,
				cwd: './modules/',
				src: includeAllFiles,
				dest: 'modules',
			},
			node_modules: {
				options: {
					archive: backupsDestination + 'node_modules.tar.gz',
				},
				expand: true,
				cwd: './node_modules/',
				src: includeAllFiles,
				dest: 'node_modules',
			},
			scripts: {
				options: {
					archive: backupsDestination + 'scripts.tar.gz',
				},
				expand: true,
				cwd: './scripts/',
				src: includeAllFiles,
				dest: 'scripts',
			},
			extension: {
				options: {
					archive: backupsDestination + 'extension.tar.gz',
				},
				expand: true,
				cwd: './extension/',
				src: includeAllFiles,
				dest: 'extension',
			},
			test: {
				options: {
					archive: backupsDestination + 'test.tar.gz',
				},
				expand: true,
				cwd: './test/',
				src: includeAllFiles,
				dest: 'test',
			},
		},

		/**
		 * Run predefined tasks whenever watched file patterns are added, changed or deleted
		 */
		watch: {
			sass: {
				files: ['./test/*.scss'], // src listening
				tasks: ['sass-task'], // default task to execute
				options: { spawn: false }, // watch optimization
			},
		},
	});

	// all grunt register tasks
	grunt.registerTask('compress-all', [
		'compress:main',
		'compress:config',
		'compress:docs',
		'compress:modules',
		'compress:node_modules',
		'compress:scripts',
		'compress:extension',
		'compress:test',
	]);
	grunt.registerTask('sass-task', ['sass:test']);
	grunt.registerTask('watch-sass', ['watch:sass']);
	grunt.registerTask('sassdoc', ['shell:sassdoc']);

	// all tasks lists
	const sasseoTaskNames = ['compress-all', 'watch-sass', 'sassdoc'];
	const sasseoTaskStatus = [
		'compress: main | config | docs | extension | modules | node_modules | scripts | test',
		'auto compile sass',
		'generate & open sassdoc',
	];

	// default tasks
	grunt.registerTask('default', () => {
		console.log(
			'\nHere are the lists of plugins (tasks) you can run with grunt:'.green,
		);

		/**
		 *
		 * @param {string} taskTitle - task title (Eg: basics tasks)
		 * @param {array} taskNames - task names (Eg: basicsTaskNames)
		 * @param {array} taskStatus - task status (Eg: basicsTaskStatus)
		 * @param {string} taskTheme - colors of theme (Eg: black ,red ,green ,yellow ,blue ,magenta ,cyan ,white ,gray ,grey)
		 */
		function getTaskResume(taskTitle, taskNames, taskStatus, taskTheme) {
			switch (taskTheme) {
				case 'cyan':
					console.log(`\n${taskTitle}`.cyan.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.cyan + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'magenta':
					console.log(`\n${taskTitle}`.magenta.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.magenta + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'yellow':
					console.log(`\n${taskTitle}`.yellow.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.yellow + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'blue':
					console.log(`\n${taskTitle}`.blue.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.blue + ` -> ${taskStatus[index]}`);
					});
					break;

				default:
					null;
					break;
			}
		}

		// task resume
		getTaskResume(
			'SASS-EO tasks',
			sasseoTaskNames,
			sasseoTaskStatus,
			'magenta',
		);
	});
};
