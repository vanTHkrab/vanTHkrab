import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';

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

    const logger = new Logger('Bootstrap');
    logger.log('Starting application...');
    const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    app.useLogger(logLevels);

    app.useGlobalPipes(new ValidationPipe({
        transform: true, // Automatically transform payloads to DTO instances
        whitelist: true, // Strip properties that do not have any decorators
        forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
        disableErrorMessages: false, // Enable error messages for validation errors
    }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(() => {
    const logger = new Logger('Bootstrap');
    logger.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}).catch((error) => {
    const logger = new Logger('Bootstrap');
    logger.error('Error starting application:', error);
});
