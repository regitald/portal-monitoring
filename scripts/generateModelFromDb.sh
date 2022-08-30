#!/bin/bash

echo "generating models from table"
npx sequelize-auto -h 127.0.0.1 -d portal-auth -u root -x allyoucan#34T -p 3306  --dialect mysql -c /home/merdoit/Development/portal-monitoring/config/config.json -o /home/merdoit/Development/portal-monitoring/models/mysql -t users roles role_user permissions permission_role user_activities