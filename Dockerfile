# 개발 환경 설정
FROM node:20 AS development

WORKDIR /usr/src/app

# package.json과 package-lock.json을 컨테이너에 복사
COPY package*.json ./

# npm을 사용하여 패키지 설치
RUN npm install --force

# 애플리케이션의 나머지 소스 코드 복사
COPY . .

# 노드 사용자로 전환하여 루트 권한 사용 방지
USER node

# 빌드 환경 설정
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

# 프로덕션 의존성만 설치
RUN npm install --only=production

# 개발 단계에서 복사한 node_modules와 소스 코드를 빌드 단계로 복사
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

# TypeScript를 JavaScript로 컴파일
RUN npm run build

# 프로덕션 환경 설정
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# 빌드 단계에서 생성된 프로덕션 준비된 node_modules와 빌드된 파일들을 프로덕션 이미지로 복사
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# 프로덕션을 위한 환경변수 설정
ENV NODE_ENV production

# 애플리케이션 시작 명령어
CMD ["node", "dist/main.js"]
