# Import Amazon Lambda node 18 package
FROM amazon/aws-lambda-nodejs:18
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN npm run build

CMD ["dist/Lambda.handler"]

