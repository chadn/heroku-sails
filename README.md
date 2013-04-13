# heroku-sails

This is a simple example of getting the new [sails.js](http://sailsjs.com/)
code running on heroku using mongodb as its database. 

"Sails automatically builds a RESTful JSON API for your models. And here's the thing,
it supports HTTP and WebSockets. By default, for every controller you create, 
you get the basic CRUD operations created automatically."

* http://heroku-sails.herokuapp.com/user
* https://heroku-sails.herokuapp.com/APIKEY/user
* https://heroku-sails.herokuapp.com/APIKEY/user/create?name=Chad
* https://heroku-sails.herokuapp.com/APIKEY/user/update/51605c1d9491790200000001?name=Sam

More examples at [sails.js](http://sailsjs.com/).

## Setup

Could not be easier to setup your own API server using sails.js, node, mongodb, and heroku.

Short version:  

1. Install sails globally `sudo npm install -g sails`
1. Create sails folder `sails new heroku-sails`
1. Add to git: `cd heroku-sails && git init && git add . && git commit`
1. Look at the git commit history for other changes made - there's only a few 

If you have not yet, create heroku account and install [heroku 
toolbelt](https://toolbelt.heroku.com/)

Then create a heroku app.  I created `heroku-sails` in the following example:

	$ heroku apps:create heroku-sails
	Creating heroku-sails... done, region is us
	http://heroku-sails.herokuapp.com/ | git@heroku.com:heroku-sails.git
	Git remote heroku added


Add mongo db 

	$ heroku addons:add mongolab:starter
	Adding mongolab:starter on heroku-sails... done, v3 (free)
	Welcome to MongoLab.  Your new database is ready for use.  Please consult the MongoLab Add-on Admin UI for more information and useful management tools.
	Use `heroku addons:docs mongolab:starter` to view documentation.


Optionally set the api key. If you don't, key check will be skipped and anyone can created/edit.
Note that we what you set here is what is sent in URL.  For more on this authentication,
[Read lib/authenKey.js](lib/authenKey.js)

	$ heroku config:set APPROVED_API_KEY=APIKEY
	Setting config vars and restarting heroku-sails... done
	APPROVED_API_KEY: APIKEY


Optionally add papertrail, lets you view logs from a browser:

	$ heroku addons:add papertrail
	Adding papertrail on heroku-sails... done, v4 (free)
	Welcome to Papertrail. Questions and ideas are welcome. Happy logging!
	Use `heroku addons:docs papertrail` to view documentation.

Deploy!

	$ git push heroku master

Now view your new app in your browser.

## Contact

For questions or custom work, please contact chad@chadnorwood.com


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/4931c91b33d5ace57a560b8603f28f16 "githalytics.com")](http://githalytics.com/chadn/heroku-sails)
