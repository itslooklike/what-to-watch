#

https://wtw-front.herokuapp.com
https://wtw-cms.herokuapp.com

## dev urls

- http://localhost:3000/
- http://localhost:3022/

## todo

- разобраться с `__dirname` (`turborepo`)
  - при `yarn dev` - все нормально
  - при `yarn build && yarn start` - НЕ нормально
- разобраться, почему при билде фронта, еще и билдится cms (`postinstall`?) - требует SESSION_SECRET
- убрать и обновить креды
- добиться легкого старта в дев режиме
  - в dev не работают картинки
  - генерится миграция
- обновить storybook

## develop

```sh
yarn
yarn build
yarn dev
```

## develop local env

```sh
# postgres
docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=keystone -p 5432:5432 postgres

# minio
docker run -p 9000:9000 -p 9001:9001 quay.io/minio/minio server /data --console-address ":9001"
# TODO: automatize
# - http://127.0.0.1:9001
# - login: minioadmin:minioadmin
# - create basket, make it public
# - create service account
```

## heroku

```sh
heroku create -a wtw-front
heroku create -a wtw-cms

heroku buildpacks:add -a wtw-front heroku-community/multi-procfile
heroku buildpacks:add -a wtw-front heroku/nodejs

heroku buildpacks:add -a wtw-cms heroku-community/multi-procfile
heroku buildpacks:add -a wtw-cms heroku/nodejs

echo "web: cd apps/front && yarn start" > apps/front/Procfile
echo "web: cd apps/cms && yarn start" > apps/cms/Procfile

heroku config:set -a wtw-front PROCFILE=apps/front/Procfile
heroku config:set -a wtw-cms PROCFILE=apps/cms/Procfile

heroku config:set -a wtw-front CLIENT_ENV=true
heroku config:set -a wtw-cms SERVER_ENV=true

heroku config:set -a wtw-front CMS_URL=https://wtw-cms.herokuapp.com
heroku config:set -a wtw-cms FRONT_URL=https://wtw-front.herokuapp.com

heroku config:set -a wtw-cms SESSION_SECRET='__SECRET_HERE__'

heroku config:set -a wtw-cms CLOUDINARY_NAME='__SECRET_HERE__'
heroku config:set -a wtw-cms CLOUDINARY_API_KEY='__SECRET_HERE__'
heroku config:set -a wtw-cms CLOUDINARY_SECRET='__SECRET_HERE__'

# START: caches - ???
heroku config:set USE_YARN_CACHE=false -a wtw-front
heroku config:set NODE_MODULES_CACHE=false -a wtw-front
heroku config:set YARN_PRODUCTION=false -a wtw-front

heroku config:set USE_YARN_CACHE=false -a wtw-cms
heroku config:set NODE_MODULES_CACHE=false -a wtw-cms
heroku config:set YARN_PRODUCTION=false -a wtw-cms
# END

heroku logs --tail -a wtw-cms
heroku logs --tail -a wtw-front
```

## heroku git

```sh
git remote add wtw-front https://git.heroku.com/wtw-front.git
git remote add wtw-cms https://git.heroku.com/wtw-cms.git

git push wtw-cms main
git push wtw-front main
```

##

- `db` - `postgres`
- `store` - `local` | `minio` | `cloudinary`
