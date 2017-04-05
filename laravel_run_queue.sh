#!/usr/bin/env bash

docker exec -u nginx vexposition_webapp php artisan --env=dev --timeout=240 queue:listen
