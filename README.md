<<<<<<< HEAD
# Invoice Analytics – Runbook


## 1) Start DB
npm run db:up


## 2) Install
npm install


## 3) Configure env
cp .env.example .env


## 4) Migrate + Seed
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npm run seed


## 5) Run all
cd ../../
npm run dev
# API http://localhost:4000
# Web http://localhost:3000
=======
# Invoice Analytics – Runbook


## 1) Start DB
npm run db:up


## 2) Install
npm install


## 3) Configure env
cp .env.example .env


## 4) Migrate + Seed
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npm run seed


## 5) Run all
cd ../../
npm run dev
# API http://localhost:4000
# Web http://localhost:3000
>>>>>>> ee14aeb (commit)
# Vanna http://localhost:5000