docker build -t nextjs-app .
docker run -d --name satudata-nextjs -p 3000:3000 nextjs-app