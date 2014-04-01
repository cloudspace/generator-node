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

NodeGenerator.prototype.askForName = function askForName() {
  if(typeof(this.options['name']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return this.name != "" },
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd())
    }], function (props) {
      this.name = props.name;
      cb();
    }.bind(this));
  } else {
    this.name = this.options['name'];
  }

  this.slugname = this._.slugify(this.name);
  this.safeSlugname = this.slugname.replace(
    /-([a-z])/g,
    function (g) { return g[1].toUpperCase(); }
  );
};

NodeGenerator.prototype.askForDescription = function askForDescription() {
  if(typeof(this.options['description']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }], function (props) {
      this.description = props.description;

      cb();
    }.bind(this));
  } else {
    this.description = this.options['description'];
  }
};

NodeGenerator.prototype.askForHomepage = function askForHomepage() {
  if(typeof(this.options['homepage']) == undefined){
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
  } else {
    this.homepage = this.options['homepage'];
  }
};

NodeGenerator.prototype.askForLicense = function askForLicense() {
  if(typeof(this.options['license']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'license',
      message: 'License',
      default: 'MIT'
    }], function (props) {
      this.license = props.license;

      cb();
    }.bind(this));
  } else {
    this.license = this.options['license'];
  }
};

NodeGenerator.prototype.askForGithubUsername = function askForGithubUsername() {
  if(typeof(this.options['githubUsername']) == undefined){
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
  } else {
    this.repoUrl = 'https://github.com/' + this.options['githubUsername'] + '/' + this.slugname;
    this.githubUsername = this.options['githubUsername'];
  }
};

NodeGenerator.prototype.askForAuthorName = function askForAuthorName() {
  if(typeof(this.options['authorName']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'authorName',
      message: 'Author\'s Name'
    }], function (props) {
      this.authorName = props.authorName;

      cb();
    }.bind(this));
  } else {
    this.authorName = this.options['authorName'];
  }
};

NodeGenerator.prototype.askForAuthorEmail = function askForAuthorEmail() {
  if(typeof(this.options['authorEmail']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'authorEmail',
      message: 'Author\'s Email'
    }], function (props) {
      this.authorEmail = props.authorEmail;

      cb();
    }.bind(this));
  } else {
    this.authorEmail = this.options['authorEmail'];
  }
};

NodeGenerator.prototype.askForAuthorUrl = function askForAuthorUrl() {
  if(typeof(this.options['authorUrl']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }], function (props) {
      this.authorEmail = props.authorEmail;

      cb();
    }.bind(this));
  } else {
    this.authorUrl = this.options['authorUrl'];
  }
};

NodeGenerator.prototype.askForUseVagrant = function askForUseVagrant() {

  if(typeof(this.options['useVagrant']) == undefined){
    var cb = this.async();
    this.prompt([{
      name: 'useVagrant',
      message: 'Would you like to generate a Vagrantfile?',
      default: 'Y/n'
    }], function (props) {
      this.useVagrant = props.useVagrant;

      cb();
    }.bind(this));
  } else {
    this.useVagrant = this.options['useVagrant'];
  }
};

NodeGenerator.prototype.askForUsePassport = function askForUsePassport() {
  if(typeof(this.options['usePassport']) == undefined){
    var cb = this.async();

    this.prompt([{
      name: 'usePassport',
      message: 'Would you like to use passport for 3rd party authentication?',
      default: 'Y/n'
    }], function (props) {
      this.usePassport = props.usePassport;

      cb();
    }.bind(this));
  } else {
    this.usePassport = this.options['usePassport'];
  }
};

NodeGenerator.prototype.askForFacebookClientId = function askForFacebookClientId() {
  if(typeof(this.options['facebookClientId']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'facebookClientId',
      message: 'Facebook Key'
    }], function (props) {
      this.askForFacebookClientId = props.askForFacebookClientId;

      cb();
    }.bind(this));
  } else {
    this.facebookClientId = this.options['facebookClientId'];
  }
};

NodeGenerator.prototype.askForFacebookClientSecret = function askForFacebookClientSecret() {
  if(typeof(this.options['facebookClientSecret']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'facebookClientSecret',
      message: 'Facebook Secret'
    }], function (props) {
      this.askForFacebookClientSecret = props.askForFacebookClientSecret;

      cb();
    }.bind(this));
  } else {
    this.facebookClientSecret = this.options['facebookClientSecret'];
  }
};

NodeGenerator.prototype.askForTwitterConsumerKey = function askForTwitterConsumerKey() {
  if(typeof(this.options['twitterConsumerKey']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'twitterConsumerKey',
      message: 'Twitter Key'
    }], function (props) {
      this.twitterConsumerKey = props.twitterConsumerKey;

      cb();
    }.bind(this));
  } else {
    this.twitterConsumerKey = this.options['twitterConsumerKey'];
  }
};

NodeGenerator.prototype.askForTwitterConsumerSecret = function askForTwitterConsumerSecret() {
  if(typeof(this.options['twitterConsumerSecret']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'twitterConsumerSecret',
      message: 'Twitter Secret'
    }], function (props) {
      this.twitterConsumerSecret = props.twitterConsumerSecret;

      cb();
    }.bind(this));
  } else {
    this.twitterConsumerSecret = this.options['twitterConsumerSecret'];
  }
};

NodeGenerator.prototype.askForGoogleClientId = function askForGoogleClientId() {
  if(typeof(this.options['googleClientId']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'googleClientId',
      message: 'Google Key'
    }], function (props) {
      this.googleClientId = props.googleClientId;

      cb();
    }.bind(this));
  } else {
    this.googleClientId = this.options['googleClientId'];
  }
};

NodeGenerator.prototype.askForGoogleClientSecret = function askForGoogleClientSecret() {
  if(typeof(this.options['googleClientSecret']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'googleClientSecret',
      message: 'Google Secret'
    }], function (props) {
      this.googleClientSecret = props.googleClientSecret;

      cb();
    }.bind(this));
  } else {
    this.googleClientSecret = this.options['googleClientSecret'];
  }
};

NodeGenerator.prototype.askForGithubClientId = function askForGithubClientId() {
  if(typeof(this.options['githubClientId']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'githubClientId',
      message: 'Github Key'
    }], function (props) {
      this.githubClientId = props.githubClientId;

      cb();
    }.bind(this));
  } else {
    this.githubClientId = this.options['githubClientId'];
  }
};

NodeGenerator.prototype.askForGithubClientSecret = function askForGithubClientSecret() {
  if(typeof(this.options['githubClientSecret']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'githubClientSecret',
      message: 'Github Secret'
    }], function (props) {
      this.githubClientSecret = props.githubClientSecret;

      cb();
    }.bind(this));
  } else {
    this.githubClientSecret = this.options['githubClientSecret'];
  }
};

NodeGenerator.prototype.askForLinkedInKey = function askForLinkedInKey() {
  if(typeof(this.options['linkedInKey']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'linkedInKey',
      message: 'LinkedIn Key'
    }], function (props) {
      this.linkedInKey = props.linkedInKey;

      cb();
    }.bind(this));
  } else {
    this.linkedInKey = this.options['linkedInKey'];
  }
};

NodeGenerator.prototype.askForLinkedInSecret = function askForLinkedInSecret() {
  if(typeof(this.options['linkedInSecret']) == undefined){
    var cb = this.async();

    this.prompt([{
      when: function(props) { return (/y/i).test(props.usePassport); },
      name: 'linkedInSecret',
      message: 'LinkedIn Secret'
    }], function (props) {
      this.linkedInSecret = props.linkedInSecret;

      cb();
    }.bind(this));
  } else {
    this.linkedInSecret = this.options['linkedInSecret'];
  }
};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/server.js', 'server.js');
  if(/y/i.test(this.usePassport) === true){
    this.template('lib/_env', '.env');
  }
};

// Tests?
// NodeGenerator.prototype.test = function test() {
//   this.mkdir('test');
//   this.template('test/server_test.js', 'test/server_test.js');
// };

NodeGenerator.prototype.examples = function examples() {
  if(/y/i.test(this.usePassport) === true){
    this.template('examples/passport_example.html', 'public/app/passport_example.html');
  }
};

NodeGenerator.prototype.config = function config() {
  if(/y/i.test(this.usePassport) === true){
    this.mkdir('config');
    this.template('config/passport.js', 'config/passport.js');
    this.template('config/routes.js', 'config/routes.js');
  }
}

NodeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('_travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
};

NodeGenerator.prototype.vagrant = function vagrant() {
  if(/y/i.test(this.useVagrant) === true){
    this.template('vagrant/Vagrantfile', 'Vagrantfile');
    this.template('vagrant/Cheffile', 'Cheffile');
  }
};
