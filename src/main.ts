import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      
    }),

  );

    
  const config = new DocumentBuilder()
  .setTitle ('PLS_PORTFOLIO API')
  .setDescription('The pls_portfolio API documentation')
  .setVersion('0.1')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'Authorization',
    in: 'header',
  }, 'JWT-auth')
  .build();
 const document = SwaggerModule.createDocument(app,config)
 SwaggerModule.setup('api',app,document)
 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
