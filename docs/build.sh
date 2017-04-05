#!/usr/bin/env bash

cd $(dirname $0)/..

rm -rf docs/backend/*
php docs/phpDocumentor.phar.gz run  --template="responsive-twig" -d app -t docs/backend

rm -rf docs/frontend/*
rm -rf docs/restapi/*
npm run docs
