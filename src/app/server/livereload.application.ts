import livereload from 'livereload';
import path from 'path';
import { BeautyLogger } from '../logger/beauty.logger';

class LivereloadApplication {
  private static readonly logger = new BeautyLogger(LivereloadApplication.name);

  //private app: LiveReloadServer;

  constructor() {
    //this.app = livereload.createServer();
  }

  public static watch() {
    livereload
      .createServer({ port: 35729 }, () => {
        this.logger.info(`Live Server listening on port:35729...`);
      })
      .watch(path.join(__dirname, '../../public'));
  }
}

export { LivereloadApplication };
