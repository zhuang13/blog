#!/usr/bin/env bash

cd ~/node/zhuang13.me

echo ''
echo 'pull remote branch...'
git reset --hard
git pull origin feature/isomorphic || exit
echo 'pull end!'

echo ''
echo '-----------------'
echo ''
echo 'install node_modules...'
diff package.json .package.json > /dev/null 2>&1
if [ "$?" != "0" ]; then
  echo -e "\033[1;33mpackage.json change, afresh install\033[0m"
  npm install && \cp package.json .package.json
  echo 'install end!'
else
  echo 'package.json unchanged.'
fi

echo ''
echo '-----------------'
echo ''
echo 'build...'
npm run build || exit
echo 'build end!!'

echo ''
echo '-----------------'
echo ''
echo 'move manifest.json...'
mv -f ./dist/manifest.json ./manifest.json
echo 'move static...'
rsync ./dist/ /usr/share/nginx/html/static.zhuang13.me/
echo 'move end!'

echo ''
echo '-----------------'
echo ''
echo 'start...'
npm run server || exit
echo 'start end!!'