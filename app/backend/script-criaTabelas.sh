env $(cat .env) npx sequelize db:create
env $(cat .env) npx sequelize db:migrate
env $(cat .env) npx sequelize db:seed:all
