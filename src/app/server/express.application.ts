import express, { Express, Router } from 'express';
import path from 'path';
import { BeautyLogger } from '../logger/beauty.logger';
import shrinkRay from 'shrink-ray-current';
import serveIndex from 'serve-index';
import { LivereloadApplication } from './livereload.application';

class ExpressApplication {
  private readonly logger = new BeautyLogger(ExpressApplication.name);

  private app: Express;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.app.use(shrinkRay());
    this.app.use(
      '/templates',
      express.static(path.join(__dirname, '../../public')),
      serveIndex(path.join(__dirname, '../../public'), {
        icons: true,
        view: 'details'
      })
    );

    this.app.use(this.router);
  }

  public async listen(port: number, livereload: boolean) {
    this.app.listen(port, () => {
      this.logger.info(
        `Server listening on port:${port} - livereload:${
          livereload || false
        }...`
      );
    });
    if (livereload == true) {
      LivereloadApplication.watch();
    }
  }
}

export { ExpressApplication };
