# heroku-sails

This is a simple example of getting the new [sails.js](http://sailsjs.com/)
code running on heroku using mongodb as its database. 

### Setup

Could not be easier to setup your own API server using sails.js, node, mongodb, and heroku.

Short version:  

1. Install sails globally `sudo npm install -g sails`
1. Create sails folder `sails new heroku-sails`
1. Add to git: `cd heroku-sails && git init && git add . && git commit`
1. Look at the git commit history for other changes made - there's only a few 

If you have not yet, create heroku account and install [heroku 
toolbelt](https://toolbelt.heroku.com/)

	$ heroku apps:create heroku-sails
	Creating heroku-sails... done, region is us
	http://heroku-sails.herokuapp.com/ | git@heroku.com:heroku-sails.git
	Git remote heroku added

Optionally add papertrail, lets you view logs from a browser:

	$ heroku addons:add papertrail
	Adding papertrail on heroku-sails... done, v4 (free)
	Welcome to Papertrail. Questions and ideas are welcome. Happy logging!
	Use `heroku addons:docs papertrail` to view documentation.

Deploy!

	$ git push heroku master

