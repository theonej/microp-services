from node:12.2

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENV PROFILE_SERVICE_URI "https://admin-microp-farm-423746340.us-east-1.elb.amazonaws.com/api/profile"
ENV REDIRECT_LOCATION "https://microp.auth.us-east-1.amazoncognito.com/login?client_id=s6f84idkj85fpnih3rg1hgma1&response_type=token&scope=email+openid+profile&redirect_uri=https://admin.microp.farm"

CMD ["npm", "run", "start"]