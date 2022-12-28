FROM juanikitro/node16.18-chrome105:v1 as base

# Container config
WORKDIR /usr/src
COPY ["package.json", "package-lock.json", "./"]

# Testing
FROM base as test 
RUN npm i
ADD ["./src/", "./src/"]
COPY ["jest.config.js", "tsconfig.json", "babel.config.js", ".env", "./"]
CMD ["npm", "run", "ci:test"]

# Prod
FROM base as production
RUN npm ci --production
COPY ["dist", ".env", "./"]
CMD ["npm", "run", "docker:start"]
