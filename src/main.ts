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
    .build()
  SwaggerModule.setup(`/docs`, app, SwaggerModule.createDocument(app, swaggerConfig))
  writeFileSync(
    "./swagger.json",
    JSON.stringify(SwaggerModule.createDocument(app, swaggerConfig), null, 2),
    { encoding: "utf8" },
  )
  await app.listen(3000)
}
bootstrap()
