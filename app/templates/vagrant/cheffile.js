#!/usr/bin/env ruby
#^syntax detection

site 'http://community.opscode.com/api/v1'

cookbook 'ubuntu', git: 'https://github.com/opscode-cookbooks/ubuntu'
cookbook 'build-essential', git: 'https://github.com/opscode-cookbooks/build-essential'
cookbook 'apt', git: 'https://github.com/opscode-cookbooks/apt'
cookbook 'openssl', git: 'https://github.com/opscode-cookbooks/openssl'
cookbook 'postgresql', git: 'https://github.com/hw-cookbooks/postgresql'
cookbook 'postfix', git: 'https://github.com/opscode-cookbooks/postfix'
cookbook 'imagemagick', git: 'https://github.com/opscode-cookbooks/imagemagick'
cookbook 'nodejs', git: 'https://github.com/mdxp/nodejs-cookbook'
cookbook 'bundler', git: 'https://github.com/cloudspace/bundler-cookbook'
cookbook 'librarian-chef', git: 'https://github.com/cloudspace/librarian-chef-cookbook'
cookbook 'git', git: 'https://github.com/opscode-cookbooks/git.git'