import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import helmet from "helmet";

import { AppConfig, Environment } from "@config/app";
import { CorsConfig } from "@config/cors";
import { SwaggerConfig } from "@config/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>("app");

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  if (appConfig.env === Environment.DEVELOPMENT) {
    const { title, description, version, endpoint } =
      configService.getOrThrow<SwaggerConfig>("swagger");

    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(endpoint, app, document);
  }

  app.use(compression());
  app.use(helmet());
  app.enableCors(configService.getOrThrow<CorsConfig>("cors"));

  await app.listen(appConfig.port);
}
bootstrap();
