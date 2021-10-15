#!/usr/bin/env sh

set -e 

npm run build 

cd dist

git init
git add -A 
git commit -m "Website deployement"
git push -f git@github.com:hexaquarks/hexaquarks.github.io.git master

cd -