#!/bin/bash

echo "generating models from table"
npx sequelize-auto -h 103.214.112.156 -d andon_aji_temp -u sammy -x allyoucan#34T -p 3306  --dialect mysql -c /home/merdoit/Development/portal-monitoring/config/config.json -o /home/merdoit/Development/portal-monitoring/models/mysql -t users roles permissions permission_role user_activities menu