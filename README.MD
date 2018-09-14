# App Ecosystem

[Description Here]

## Tech Stack

1. Back-End
	* Node.js
2. Front-End
	* Angular.js 1.5
	* HTML5
	* CSS3
	* Bootstrap
3. Database
	* PostgreSQL
	* Knex.js


## Folder Structure
			.
			├── Procfile
			├── README.MD
			├── backup.dump
			├── db
			│   └── knex.js
			├── knexfile.js
			├── migrations
			│   ├── 20161108142432_app_table.js
			│   ├── 20161113140507_categories_table.js
			│   ├── 20161116113300_google_play_apps.js
			│   ├── 20161117124118_date_added_android.js
			│   ├── 20161202134842_android_categories.js
			│   └── 20161202140103_android_categories2.js
			├── package.json
			├── public
			│   ├── app.js
			│   ├── controllers
			│   │   ├── aboutController.js
			│   │   ├── appAndroidController.js
			│   │   ├── appAppleController.js
			│   │   ├── mainController.js
			│   │   └── searchController.js
			│   ├── css
			│   │   └── main.css
			│   ├── js
			│   │   ├── custom
			│   │   │   ├── image-grid.js
			│   │   │   └── zoom.js
			│   │   └── main.js
			│   ├── seeds
			│   │   └── seed.json
			│   └── views
			│       ├── main.html
			│       └── templates
			│           ├── 404.html
			│           ├── about_page.html
			│           ├── app.html
			│           ├── app_android.html
			│           ├── developerPage.html
			│           ├── landing.html
			│           ├── login.html
			│           └── search.html
			├── python-modules
			│   ├── __pycache__
			│   │   ├── file_reader.cpython-35.pyc
			│   │   ├── file_reader.cpython-36.pyc
			│   │   ├── itunes_search.cpython-35.pyc
			│   │   ├── itunes_search.cpython-36.pyc
			│   │   ├── priori_sraper.cpython-36.pyc
			│   │   ├── sqlmethods.cpython-35.pyc
			│   │   └── sqlmethods.cpython-36.pyc
			│   ├── autism_specific_csv
			│   │   ├── apple_free_autism.csv
			│   │   ├── apple_paid_autism.csv
			│   │   ├── asd.csv
			│   │   └── aspbergers.csv
			│   ├── file_reader.py
			│   ├── file_reader.pyc
			│   ├── geckodriver.log
			│   ├── itunes_search.py
			│   ├── itunes_search.pyc
			│   ├── main.py
			│   ├── priori_sraper.py
			│   ├── priori_sraper.pyc
			│   ├── sqlmethods.py
			│   └── sqlmethods.pyc
			├── request_methods
			│   ├── androidIDsV1.txt
			│   ├── dbMethods.js
			│   ├── googlePlayApi.js
			│   ├── itunesApi.js
			│   └── main.js
			├── routes
			│   └── apiRoutes.js
			└── server.js