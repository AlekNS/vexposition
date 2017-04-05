# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.hostname = "vexposition.vm"
  config.vm.box      = "debian/jessie64"

  config.vm.network :private_network, ip: "192.168.10.112"
  config.vm.network :forwarded_port, guest: 80, host: 8080

  config.vm.synced_folder ".", "/var/www/vexposition", type: "virtualbox"
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  config.vm.provider :virtualbox do |v|
    v.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.provision :shell, :path => "vagrant_provision_start.sh", :args => ["vagrant"]
  config.vm.provision :shell, :path => "vagrant_provision_final.sh", :args => ["vagrant"]
end
