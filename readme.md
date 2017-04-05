VExposition
==============

Welcome to Simple Virtual Exposition. This is demo project.


VExposition installation (via Vagrant)
=======================================

Works in the OS console (terminal).
  
Pre-requisites
---------------
1. [Vagrant](https://www.vagrantup.com/downloads.html) and [VirtaulBox](https://www.virtualbox.org/wiki/Downloads).


Installation
-------------
1. `$ vagrant plugin install vagrant-vbguest` to install VM guest tools.
3. `$ vagrant up`
4. Wait, until it's finished. On successfully end it's displayed "Ready. Enjoy!"


Run
----
Go to the url in your browser: `http://localhost:8080/` or `http://192.168.10.112/`


Troubleshooting
----------------
Possible migration failed (`docker php artisan migration` command).
Try to run `$ vagrant ssh -c "docker exec -u user vexposition_webapp php artisan migrate --seed"` after
vagrant deployments finished.
