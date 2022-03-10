FROM node:16.10

COPY package.json ${LAMBDA_TASK_ROOT}/
COPY yarn.lock ${LAMBDA_TASK_ROOT}/
COPY tsconfig.json ${LAMBDA_TASK_ROOT}/
COPY babel.config.js ${LAMBDA_TASK_ROOT}/
COPY .eslintignore ${LAMBDA_TASK_ROOT}/
COPY .eslintrc.js ${LAMBDA_TASK_ROOT}/
COPY jest.config.js ${LAMBDA_TASK_ROOT}/

RUN yarn

COPY __tests__ ${LAMBDA_TASK_ROOT}/__tests__/
COPY src-ts ${LAMBDA_TASK_ROOT}/src-ts/

RUN yarn jafar
