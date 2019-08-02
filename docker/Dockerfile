#Import Node base image
FROM node:12-slim

#Install Git
RUN apt-get update && \
    apt list -a git && \
    apt-get install -y --no-install-recommends git=1:2.*

#Clone SDK repo to app directory
RUN git clone https://github.com/watson-developer-cloud/node-sdk.git

#Install the SDK
RUN npm install ibm-watson

#Set working directory to node-sdk
WORKDIR /node-sdk

#Install dependencies and build to run tests.
RUN npm install && \
    npm run build

#Run tests to verify installation
CMD ["npm" , "test"]
