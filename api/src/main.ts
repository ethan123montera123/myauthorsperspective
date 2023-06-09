import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("My Author's Perspective API")
    .setDescription(
      "Playground for the basic endpoints of My Author's Perspective."
    )
    .setVersion("0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.use(helmet());
  app.enableCors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Access-Control-Allow-Headers",
    ],
  });

  await app.listen(3000);
}
bootstrap();
