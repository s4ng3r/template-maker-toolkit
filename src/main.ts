import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = new AppModule();

  await app.listen(3030, process.argv[2]);
}
//lsof -PiTCP -sTCP:LISTEN

bootstrap();
