FROM node:14-alpine
WORKDIR /Users/decagon/week-6-task
COPY . /Users/decagon/week-6-task
RUN yarn
CMD ["yarn", "start"]