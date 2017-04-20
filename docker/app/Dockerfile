FROM php:7.1.4-apache

MAINTAINER Alexander Sedelnikov (alexander.sedelnikov@ymail.com)

ADD ./apache2conf /etc/apache2

RUN useradd -ms /bin/bash user

RUN a2enmod rewrite && a2enmod alias && a2dissite 000-default && a2ensite webapp
RUN sed -i -r "s/Listen 80/Listen 80\nListen 8080/g" /etc/apache2/apache2.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y libxml2-dev libmcrypt-dev \
    && docker-php-ext-install opcache mbstring pdo_mysql dom xml mcrypt

RUN pecl install xdebug

ADD ./php/ /usr/local/etc/php/

WORKDIR /var/www/html
