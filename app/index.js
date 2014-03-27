'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NodeGenerator = module.exports = function NodeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(NodeGenerator, yeoman.generators.NamedBase);

NodeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(
    this.yeoman +
    '\nThe name of your project shouldn\'t contain "node" or "js" and' +
    '\nshould be a unique ID not already in use at search.npmjs.org.');

  var prompts = [{
    name: 'name',
    message: 'Module Name',
    default: path.basename(process.cwd())
  }, {
    name: 'description',
    message: 'Description',
    default: 'The best module ever.'
  }, {
    name: 'homepage',
    message: 'Homepage'
  }, {
    name: 'license',
    message: 'License',
    default: 'MIT'
  }, {
    name: 'githubUsername',
    message: 'GitHub username'
  }, {
    name: 'authorName',
    message: 'Author\'s Name'
  }, {
    name: 'authorEmail',
    message: 'Author\'s Email'
  }, {
    name: 'authorUrl',
    message: 'Author\'s Homepage'
  }, {
    name: 'use_vagrant',
    message: 'Would you like to generate a Vagrantfile?',
    default: 'Y/n'
  }, {
    name: 'use_passport',
    message: 'Would you like to use passport for 3rd party authentication?',
    default: 'Y/n'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'facebook_client_id',
    message: 'Facebook Key'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'facebook_client_secret',
    message: 'Facebook Secret'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'twitter_consumer_key',
    message: 'Twitter Key'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'twitter_consumer_secret',
    message: 'Twitter Secret'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'google_client_id',
    message: 'Google Key'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'google_client_id',
    message: 'Google Secret'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'github_client_id',
    message: 'Github Key'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'github_client_id',
    message: 'Github Secret'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'linkedin_key',
    message: 'LinkedIn Key'
  }, {
    when: function(props) { return (/y/i).test(props.use_passport); },
    name: 'linkedin_secret',
    message: 'LinkedIn Secret'
  },
  ];

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (props) {
    this.slugname = this._.slugify(props.name);
    this.safeSlugname = this.slugname.replace(
      /-([a-z])/g,
      function (g) { return g[1].toUpperCase(); }
    );

    if(!props.githubUsername){
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
    } else {
      this.repoUrl = 'user/repo';
    }

    if (!props.homepage) {
      props.homepage = this.repoUrl;
    }

    console.log(props)

    this.props = props;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/server.js', 'server.js');
  if(/y/i.test(this.props.use_passport) === true){
    this.template('lib/.env.js', '.env');
  }
};

// Tests?
// NodeGenerator.prototype.test = function test() {
//   this.mkdir('test');
//   this.template('test/server_test.js', 'test/server_test.js');
// };

NodeGenerator.prototype.examples = function examples() {
  if(/y/i.test(this.props.use_passport) === true){
    this.template('examples/passport_example.js', 'public/app/passport_example.html');
  }
};


NodeGenerator.prototype.config = function config() {
  if(/y/i.test(this.props.use_passport) === true){
    this.mkdir('config');
    this.template('config/passport.js', 'config/passport.js');
    this.template('config/routes.js', 'config/routes.js');
  }
}

NodeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
};

NodeGenerator.prototype.vagrant = function vagrant() {
  if(/y/i.test(this.props.use_vagrant) === true){
    this.template('vagrant/vagrantfile.js', 'Vagrantfile');
    this.template('vagrant/cheffile.js', 'Cheffile');
  }
};