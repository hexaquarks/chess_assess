#!/usr/bin/env sh

set -e 

npm run build 

cd dist

git init
git add -A 
git commit -m "Website deployement"
git push -f https://hexaquarks.github.io/chess_assess.git main:gh-pages

cd -