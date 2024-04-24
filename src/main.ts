import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { writeFileSync } from "fs"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Ticket Server API`)
    .setDescription(`Ticket Server API description`)
    .setVersion("0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "access-token",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "booking-session-id",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "participation-token",
    )
    .build()
  SwaggerModule.setup(`/docs`, app, SwaggerModule.createDocument(app, swaggerConfig))
  writeFileSync(
    "./swagger.yaml",
    JSON.stringify(SwaggerModule.createDocument(app, swaggerConfig), null, 2),
    { encoding: "utf8" },
  )
  await app.listen(3000)
}
bootstrap()
