'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NodeGenerator = module.exports = function NodeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.currentYear = (new Date()).getFullYear();
  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(NodeGenerator, yeoman.generators.NamedBase);

NodeGenerator.prototype.welcome = function welcome() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(
    this.yeoman +
    '\nThe name of your project shouldn\'t contain "node" or "js" and' +
    '\nshould be a unique ID not already in use at search.npmjs.org.');
  }
};

NodeGenerator.prototype.askForUseVagrant = function askForUseVagrant() {
  var cb = this.async();

  console.log("this.useVagrant = ");
  console.log(this.useVagrant)
  console.log("this.options['useVagrant'] = ");
  console.log(this.options['useVagrant'])

  this.prompt([{
    name: 'useVagrant',
    message: 'Would you like to generate a Vagrantfile?',
    default: 'Y/n'
  }], function (props) {
    this.useVagrant = props.useVagrant;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForName = function askForName() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return this.name != "" },
    name: 'name',
    message: 'Module Name',
    default: path.basename(process.cwd())
  }], function (props) {
    this.slugname = this._.slugify(props.name);
    this.safeSlugname = this.slugname.replace(
      /-([a-z])/g,
      function (g) { return g[1].toUpperCase(); }
    );
    this.name = props.name;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForDescription = function askForDescription() {
  var cb = this.async();

  this.prompt([{
    name: 'description',
    message: 'Description',
    default: 'The best module ever.'
  }], function (props) {
    this.description = props.description;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForHomepage = function askForHomepage() {
  var cb = this.async();

  this.prompt([{
    name: 'homepage',
    message: 'Homepage'
  }], function (props) {
    if (!props.homepage) {
      props.homepage = this.repoUrl;
    }

    this.homepage = props.homepage;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForLicense = function askForLicense() {
  var cb = this.async();

  this.prompt([{
    name: 'license',
    message: 'License',
    default: 'MIT'
  }], function (props) {
    this.license = props.license;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForGithubUsername = function askForGithubUsername() {
  var cb = this.async();

  this.prompt([{
    name: 'githubUsername',
    message: 'GitHub username'
  }], function (props) {
    if(!props.githubUsername){
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
    } else {
      this.repoUrl = 'user/repo';
    }
    this.githubUsername = props.githubUsername;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForAuthorName = function askForAuthorName() {
  var cb = this.async();

  this.prompt([{
    name: 'authorName',
    message: 'Author\'s Name'
  }], function (props) {
    this.authorName = props.authorName;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForAuthorEmail = function askForAuthorEmail() {
  var cb = this.async();

  this.prompt([{
    name: 'authorEmail',
    message: 'Author\'s Email'
  }], function (props) {
    this.authorEmail = props.authorEmail;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForAuthorUrl = function askForAuthorUrl() {
  var cb = this.async();

  this.prompt([{
    name: 'authorUrl',
    message: 'Author\'s Homepage'
  }], function (props) {
    this.authorEmail = props.authorEmail;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForUsePassport = function askForUsePassport() {
  var cb = this.async();

  this.prompt([{
    name: 'usePassport',
    message: 'Would you like to use passport for 3rd party authentication?',
    default: 'Y/n'
  }], function (props) {
    this.usePassport = props.usePassport;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForFacebookClientId = function askForFacebookClientId() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'facebookClientId',
    message: 'Facebook Key'
  }], function (props) {
    this.askForFacebookClientId = props.askForFacebookClientId;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForFacebookClientSecret = function askForFacebookClientSecret() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'facebookClientSecret',
    message: 'Facebook Secret'
  }], function (props) {
    this.askForFacebookClientSecret = props.askForFacebookClientSecret;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForTwitterConsumerKey = function askForTwitterConsumerKey() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'twitterConsumerKey',
    message: 'Twitter Key'
  }], function (props) {
    this.twitterConsumerKey = props.twitterConsumerKey;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForTwitterConsumerSecret = function askForTwitterConsumerSecret() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'twitterConsumerSecret',
    message: 'Twitter Secret'
  }], function (props) {
    this.twitterConsumerSecret = props.twitterConsumerSecret;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForGoogleClientId = function askForGoogleClientId() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'googleClientId',
    message: 'Google Key'
  }], function (props) {
    this.googleClientId = props.googleClientId;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForGoogleClientSecret = function askForGoogleClientSecret() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'googleClientSecret',
    message: 'Google Secret'
  }], function (props) {
    this.googleClientSecret = props.googleClientSecret;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForGithubClientId = function askForGithubClientId() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'githubClientId',
    message: 'Github Key'
  }], function (props) {
    this.githubClientId = props.githubClientId;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForGithubClientSecret = function askForGithubClientSecret() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'githubClientSecret',
    message: 'Github Secret'
  }], function (props) {
    this.githubClientSecret = props.githubClientSecret;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForLinkedInKey = function askForLinkedInKey() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'linkedInKey',
    message: 'LinkedIn Key'
  }], function (props) {
    this.linkedInKey = props.linkedInKey;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForLinkedInSecret = function askForLinkedInSecret() {
  var cb = this.async();

  this.prompt([{
    when: function(props) { return (/y/i).test(props.usePassport); },
    name: 'linkedInSecret',
    message: 'LinkedIn Secret'
  }], function (props) {
    this.linkedInSecret = props.linkedInSecret;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/server.js', 'server.js');
  if(/y/i.test(this.props.usePassport) === true){
    this.template('lib/.env.js', '.env');
  }
};

// Tests?
// NodeGenerator.prototype.test = function test() {
//   this.mkdir('test');
//   this.template('test/server_test.js', 'test/server_test.js');
// };

NodeGenerator.prototype.examples = function examples() {
  if(/y/i.test(this.props.usePassport) === true){
    this.template('examples/passport_example.js', 'public/app/passport_example.html');
  }
};

NodeGenerator.prototype.config = function config() {
  if(/y/i.test(this.props.usePassport) === true){
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
  if(/y/i.test(this.props.useVagrant) === true){
    this.template('vagrant/vagrantfile.js', 'Vagrantfile');
    this.template('vagrant/cheffile.js', 'Cheffile');
  }
};