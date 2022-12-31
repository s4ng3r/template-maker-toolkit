import { AppModule } from './app/app.module';
import minimist, { ParsedArgs } from 'minimist';

async function bootstrap() {
  const app = new AppModule();

  const args: ParsedArgs = minimist(process.argv.slice(2));

  await app.listen(3030, args.livereload);
}
//lsof -PiTCP -sTCP:LISTEN

bootstrap();
