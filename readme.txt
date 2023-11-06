The following packages are required before starting the flask server:

db-sqlite3
flask
flask_cors
pyjwt
pyjwt[crypto]

1. Start the flask server with the command "Backend/app.py populate" from the base directory. The "populate" argument is only required for the first run  if no database exists and will populate the tables with our dummy data.
2. Next, you can start the React app with "npm start --prefix ./Frontend/"
3. Now the app should be running locally on http://localhost:3000/
