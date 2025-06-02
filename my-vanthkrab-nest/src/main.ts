import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
        allowedHeaders: 'Content-Type, Authorization, x-api-key', // Allow specific headers
        credentials: true, // Allow credentials
        preflightContinue: false, // Handle preflight requests automatically
        optionsSuccessStatus: 204, // Respond with 204 for successful preflight requests
    });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap().then(
    () => console.log(`Application is running on: http://localhost:${process.env.PORT ?? 5000}`)
);
