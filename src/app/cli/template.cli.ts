import prompts from 'prompts';
import globby from 'globby';
import _ from 'lodash';

abstract class TemplateCli {
  private static async readTemplateDir() {
    const paths = await globby('src/templates/**/*.{html,css,js}');

    const folders = paths.map((m) => {
      return m.replace('src/templates/', '').split('/');
    });

    return folders;
  }

  private static async getFoldersAndFiles(templateDir: string[][]) {
    const folders: string[] = [];

    for (let i = 0; i < templateDir.length; i++) {
      const path = templateDir[i].reduce((prev, curr) => {
        if (!curr.includes('.')) {
          return prev + '/' + curr;
        } else {
          return prev;
        }
      });
      folders.push(path);
    }

    return _.remove(
      _.uniq(folders),
      (r) => !r.includes('.html') && !r.includes('.css') && !r.includes('.js')
    );
  }

  public static async run() {
    const templateDir = await this.readTemplateDir();
    const folders = await this.getFoldersAndFiles(templateDir);

    console.log(templateDir);
    console.log(folders);

    const response = await prompts({
      type: 'text',
      name: 'meaning',
      message: 'Template CLI!'
    });
    console.log(response.meaning);
  }
}

(async () => {
  await TemplateCli.run();
})();

export { TemplateCli };
