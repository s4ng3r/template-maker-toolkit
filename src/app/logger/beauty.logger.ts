import { format } from 'date-fns';

class BeautyLogger {
  private timestamp!: string;
  private className: string;
  private classColor = '\x1b[33m';
  private infoColor = '\x1b[32m';
  private warnColor = '\x1b[33m';
  private traceColor = '\x1b[36m';
  private debugColor = '\x1b[35m';
  private errorColor = '\x1b[31m';
  private white = '\x1b[37m';

  constructor(className: string) {
    this.className = className;
  }

  info(str: string) {
    this.log(str, this.infoColor, '[INFO] ');
  }

  debug(str: string) {
    this.log(str, this.debugColor, '[DEBUG]');
  }

  trace(str: string) {
    this.log(str, this.traceColor, '[TRACE]');
  }

  warn(str: string) {
    this.log(str, this.warnColor, '[WARN] ');
  }

  error(str: string) {
    this.log(str, this.errorColor, '[ERROR]');
  }

  private log(str: string, color: string, type: string) {
    this.timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss ');
    console.log(
      `${color}[TemplateMaker] ${process.pid} ${type} - ${this.white}${this.timestamp} ${this.classColor}[${this.className}] ${color}${str}`
    );
  }
}

export { BeautyLogger };
