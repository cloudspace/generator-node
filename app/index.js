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

NodeGenerator.prototype.prompt = function(questions, callback) {
  var generator = this;
  var answers = this._.reduce(questions, function(memo, question) {
    if (generator.options.hasOwnProperty(question.name)) {
      memo[question.name] = generator.options[question.name];
    }
    return memo;
  }, {});
  var qs = this._.reject(questions, function(question) {
    return answers.hasOwnProperty(question.name);
  });
  this._.each(questions, function(question) {
    var when = question.when;
    if (when) {
      question.when = function(props) {
        generator._.extend(props, answers);
        return when(props);
      }
    }
  });

  return yeoman.generators.NamedBase.prototype.prompt.call(this, qs, function(props) {
    generator._.extend(props, answers);
    if (callback) {
      callback(props);
    }
  });
}

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
  }];

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (props) {
    this.slugname = this._.slugify(props.name);
    this.safeSlugname = this.slugname.replace(
      /-([a-z])/g,
      function (g) { return g[1].toUpperCase(); }
    );

    if(props.githubUsername) {
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
    } else {
      this.repoUrl = 'user/repo';
    }

    if (!props.homepage) {
      props.homepage = this.repoUrl;
    }

    this.props = props;

    cb();
  }.bind(this));
};


NodeGenerator.prototype.askForUseVagrant = function askForUseVagrant() {
  var cb = this.async();
  this.prompt([{
    name: 'useVagrant',
    type: 'confirm',
    message: 'Would you like to generate a Vagrantfile?',
    default: false
  }], function (props) {
    this.useVagrant = props.useVagrant;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForUsePassport = function askForUsePassport() {
  var cb = this.async();

  this.prompt([{
    name: 'usePassport',
    type: 'confirm',
    message: 'Would you like to use passport for 3rd party authentication?',
    default: true
  }], function (props) {
    this.usePassport = props.usePassport;

    cb();
  }.bind(this));
};

NodeGenerator.prototype.askForFacebookAuth = function askForFacebookAuth() {
  var cb = this.async();
  var usePassport = this.usePassport;

  this.prompt([{
    name: 'useFacebook',
    type: 'confirm',
    message: 'Would you like to authenticate with Facebook?',
    default: true,
    when: function() { return usePassport; }
  }, {
    name: 'facebookClientId',
    message: 'Facebook Key',
    when: function(props) { return props.useFacebook; }
  }, {
    name: 'facebookClientSecret',
    message: 'Facebook Secret',
    when: function(props) { return props.useFacebook; }
  }], function (props) {
    this.useFacebook = props.useFacebook;
    this.facebookClientId = props.facebookClientId;
    this.facebookClientSecret = props.facebookClientSecret;

    cb();
  }.bind(this));
}

NodeGenerator.prototype.askForTwitterAuth = function askForTwitterAuth() {
  var cb = this.async();
  var usePassport = this.usePassport;

  this.prompt([{
    name: 'useTwitter',
    type: 'confirm',
    message: 'Would you like to authenticate with Twitter?',
    default: true,
    when: function() { return usePassport; }
  }, {
    name: 'twitterConsumerKey',
    message: 'Twitter Key',
    when: function(props) { return props.useTwitter; }
  }, {
    name: 'twitterConsumerSecret',
    message: 'Twitter Secret',
    when: function(props) { return props.useTwitter; }
  }], function (props) {
    this.useTwitter = props.useTwitter;
    this.twitterConsumerKey = props.twitterConsumerKey;
    this.twitterConsumerSecret = props.twitterConsumerSecret;

    cb();
  }.bind(this));
}

NodeGenerator.prototype.askForGoogleAuth = function askForGoogleAuth() {
  var cb = this.async();
  var usePassport = this.usePassport;

  this.prompt([{
    name: 'useGoogle',
    type: 'confirm',
    message: 'Would you like to authenticate with Google?',
    default: true,
    when: function() { return usePassport; }
  }, {
    name: 'googleClientId',
    message: 'Google Key',
    when: function(props) { return props.useGoogle; }
  }, {
    name: 'googleClientSecret',
    message: 'Google Secret',
    when: function(props) { return props.useGoogle; }
  }], function (props) {
    this.useGoogle = props.useGoogle;
    this.googleClientId = props.googleClientId;
    this.googleClientSecret = props.googleClientSecret;

    cb();
  }.bind(this));
}

NodeGenerator.prototype.askForGithubAuth = function askForGithubAuth() {
  var cb = this.async();
  var usePassport = this.usePassport;

  this.prompt([{
    name: 'useGithub',
    type: 'confirm',
    message: 'Would you like to authenticate with Github?',
    default: true,
    when: function() { return usePassport; }
  }, {
    name: 'githubClientId',
    message: 'Github Key',
    when: function(props) { return props.useGithub; }
  }, {
    name: 'githubClientSecret',
    message: 'Github Secret',
    when: function(props) { return props.useGithub; }
  }], function (props) {
    this.useGithub = props.useGithub;
    this.githubClientId = props.githubClientId;
    this.githubClientSecret = props.githubClientSecret;

    cb();
  }.bind(this));
}

NodeGenerator.prototype.askForLinkedInAuth = function askForLinkedInAuth() {
  var cb = this.async();
  var usePassport = this.usePassport;

  this.prompt([{
    name: 'useLinkedIn',
    type: 'confirm',
    message: 'Would you like to authenticate with LinkedIn?',
    default: true,
    when: function() { return usePassport; }
  }, {
    name: 'linkedInClientId',
    message: 'LinkedIn Key',
    when: function(props) { return props.useLinkedIn; }
  }, {
    name: 'linkedInClientSecret',
    message: 'LinkedIn Secret',
    when: function(props) { return props.useLinkedIn; }
  }], function (props) {
    this.useLinkedIn = props.useLinkedIn;
    this.linkedInClientId = props.linkedInClientId;
    this.linkedInClientSecret = props.linkedInClientSecret;

    cb();
  }.bind(this));
}

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/server.js', 'server.js');
  if(this.usePassport) {
    this.template('lib/_env', '.env');
  }
};

// Tests?
// NodeGenerator.prototype.test = function test() {
//   this.mkdir('test');
//   this.template('test/server_test.js', 'test/server_test.js');
// };

NodeGenerator.prototype.examples = function examples() {
  if(this.usePassport) {
    this.template('examples/passport_example.html', 'public/app/passport_example.html');
  }
};

NodeGenerator.prototype.config = function config() {
  if(this.usePassport) {
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
  if(this.useVagrant) {
    this.template('vagrant/Vagrantfile', 'Vagrantfile');
    this.template('vagrant/Cheffile', 'Cheffile');
  }
};
