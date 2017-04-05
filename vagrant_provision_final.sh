#!/usr/bin/env bash

user=${1:-vagrant}

cd /var/www/vexposition


echo "Composer install..."

docker exec -u user vexposition_webapp composer install

sleep 1

echo "DB Migration..."

docker exec -u user vexposition_webapp php artisan migrate --seed


echo "Restart Supervisor..."

supervisorctl reread && supervisorctl update && supervisorctl start laravel-queue:*


echo "Add Schedule for Laravel Schedule..."
echo "SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

* * * * * ${user} docker exec -u user vexposition_webapp php artisan schedule:run >/dev/null
" > /etc/cron.d/laravel_schedule


echo "Ready. Enjoy!"
