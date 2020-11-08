from node:12.2

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENV REDIRECT_LOCATION "https://microp.auth.us-east-1.amazoncognito.com/login?client_id=s6f84idkj85fpnih3rg1hgma1&response_type=token&scope=email+openid+profile&redirect_uri=https://admin.microp.farm"
ENV PROFILE_SERVICE_URI https://admin.microp.farm/api/profile
ENV BASE_API_URL https://admin.microp.farm/api
ENV IGNORE_AUTH=false

CMD ["npm", "run", "start"]