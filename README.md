## steps to clone it
1.git clone "https://github.com/28ananya/autonomize"
## To run the frontend
1.cd frontend
2.npm install( it will install the package.json)
3. npm start( it will run the frontend)
## steps to run the backend
1. cd backend
2. npm install
3. npx sequelize-cli db:migrate( to setup the database)
4. npx ts-node src/app.ts( it will run the backend)
## backend apis
The base url is "http://localhost:3000/"
The end points defined are:
1. / (its an post api where it stores the username details, username is given as body)
2. /:username/friends (post api.it will find the friends)
3. /search ( get api. it will search based on the details)
4. /:username (delete api. it deletes from table)
5. /:username ( put api. it updates the details)
