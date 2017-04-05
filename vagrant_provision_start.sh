#!/usr/bin/env bash

user=${1:-vagrant}

echo "Installing Docker and other tools"

apt-get install apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo 'deb https://apt.dockerproject.org/repo debian-jessie main' > /etc/apt/sources.list.d/docker.list

apt-get install -y apt-transport-https && apt-get update && apt-get install -y docker-engine curl pixz supervisor openjdk-7-jre


echo "Installing Docker Compose"

curl -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose

usermod -a -G docker ${user}


echo "Installing nodejs"

mkdir /usr/local/nodejs
cd /usr/local/nodejs
curl https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-x64.tar.xz | xz -dc - | tar xv
mv node-v6.10.0-linux-x64/* .
ln -s /usr/local/nodejs/bin/node /usr/local/bin/node
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/npm

cd /var/www/vexposition
sudo -u ${user} sed 's/QUEUE_DRIVER=sync/QUEUE_DRIVER=database/' .env.dev > .env
chmod -R gu+rw ./bootstrap/cache ./storage/framework/{,cache,sessions,views} ./storage/logs

cd /var/www/vexposition


echo "Add Deamon for Laravel Queue..."

echo "[program:laravel-queue]
process_name=%(program_name)s_%(process_num)02d
command=bash /var/www/vexposition/laravel_run_queue.sh
chown=${user}:${user}
numprocs=2
autostart=true
autorestart=true
stderr_logfile=/var/log/laraqueue.err.log
stdout_logfile=/var/log/laraqueue.out.log" > /etc/supervisor/conf.d/laravel-queue.conf
chmod +x /etc/supervisor/conf.d/laravel-queue.conf


echo "NPM install packages"

sudo -u ${user} npm install
sudo -u ${user} node_modules/.bin/webdriver-manager update

echo "Build Frontend"

sudo -u ${user} npm run dev


echo "Start docker compose"

cd /var/www/vexposition/docker
docker-compose up -d
