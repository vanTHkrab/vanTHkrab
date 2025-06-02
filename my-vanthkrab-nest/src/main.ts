import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'https://my-vanthkrab.vercel.app', 'https://www.vanthkrab.com', 'https://vanthkrab.com'], // Allow specific origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
        allowedHeaders: 'Content-Type, Authorization, x-api-key', // Allow specific headers
        credentials: true, // Allow credentials
        preflightContinue: false, // Handle preflight requests automatically
        optionsSuccessStatus: 204, // Respond with 204 for successful preflight requests
    });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap().then(
    () => console.log(`Application is running on: http://localhost:${process.env.PORT ?? 8080}`)
);
