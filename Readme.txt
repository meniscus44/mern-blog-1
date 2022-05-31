(1) //cloning github branch "dev-impl"
git clone -b dev-impl https://github.com/anurag-augustin/heroku-mern-blogs.git

(2) //Changing Directory 
cd heroku-mern-blogs

(3) //installing dependencies
npm i


(4) //Staging all changes
git add *

(5) //Commit changes
git commit -m "commit message"


(6) //pushing changes to remote branch-"dev-impl"
git push origin dev-impl

(7) //pulling changes from remote branch-"dev-impl" to local branch
git pull origin dev-impl


Add in client folder package.json file before last curly brace
,"proxy":"http://localhost:5000"


Steps After cloning
1 - Add env file in heroku-mern-blogs folder
2 - Inside client folder package.json add proxy
3 - npm install client and backend both
4 - npm run start (for client)
5 - npm run dev (for backend)


Steps before pushing changes
- Remove proxy Inside client folder package.json 
