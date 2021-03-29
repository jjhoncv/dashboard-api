#!/bin/bash

#give permission for everything in the dashboard-api directory
sudo chmod -R 777 /home/ec2-user/dashboard-api

cd /home/ec2-user/dashboard-api

#mysql
mysql --host=dashboardinstance.cvv2tyxpdxye.ap-northeast-1.rds.amazonaws.com --user=admin --password=12345678 -e ./bd.sql


#navigate into our working directory where we have all our github files
cd /home/ec2-user/dashboard-api/app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install

#config dashboard-api
aws s3 sync s3://config.wdashboard.tk/dashboard.api .

#start our node app in the background
npm run build  > app.out.log 2> app.err.log < /dev/null & 