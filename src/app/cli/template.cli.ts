import prompts, { Choice } from 'prompts';
import globby from 'globby';
import _ from 'lodash';
import minimatch from 'minimatch';
import concurrently from 'concurrently';

abstract class TemplateCli {
  private static async readTemplateDir() {
    const paths = await globby('src/templates/**/*.{html,css,js}');

    return paths;
  }

  private static async getFolders(paths: string[]) {
    const folders: string[] = [];

    const foldersSplit = paths.map((m) => {
      return m.replace('src/templates/', '').split('/');
    });

    for (let i = 0; i < foldersSplit.length; i++) {
      const path = foldersSplit[i].reduce((prev, curr) => {
        if (!curr.includes('.')) {
          return prev + '/' + curr;
        } else {
          return prev;
        }
      });
      folders.push(path);
    }

    return _.remove(_.uniq(folders), (r) => !minimatch(r, '*.{html,css,js}'));
  }

  private static async getFileTree(paths: string[], folders: string[]) {
    const folderNames: Folders[] = [];
    const fileTree: FileTree = {
      folders: folderNames
    };

    for (const folder of folders) {
      const fileNames: Files[] = [];
      const files = paths.filter((f) => f.includes(folder) == true);
      files.forEach((file) => {
        const fileName = file.substring(file.lastIndexOf('/') + 1);
        fileNames.push({
          fileName: fileName
        });
      });
      folderNames.push({
        folderName: folder,
        files: fileNames
      });
    }
    return fileTree;
  }

  public static async run() {
    const paths = await this.readTemplateDir();
    const folders = await this.getFolders(paths);
    const fileTree = await this.getFileTree(paths, folders);

    const choices: Choice[] = [];

    for (const folder of fileTree.folders) {
      const choice: Choice = {
        title: folder.folderName,
        value: folder.folderName
      };
      choices.push(choice);
    }

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Select a template to livereload',
      choices: choices,
      initial: 0
    });

    console.log(response.value);

    const folder = fileTree.folders.find((f) => f.folderName == response.value);

    const cssFile = folder?.files.find((f) => minimatch(f.fileName, '*.css'));

    const srcTemplatePath = `./src/templates`;
    const distPublicPath = `./dist/public/`;
    const sourcePath = `${srcTemplatePath}/${response.value}/`;
    const distPath = `${distPublicPath}${response.value}/`;

    const npmPostCSS = `npm run postcss -- ${sourcePath}${cssFile?.fileName} -o ${distPath}${cssFile?.fileName}`;
    const npmCopyFiles = `npm run copyfiles -- -a -u 2 ${sourcePath}*.html ${distPublicPath}`;
    const npmNodemonHTML = `npm run nodemon -- -e html -w ${sourcePath} --exec "${npmCopyFiles} & ${npmPostCSS}"`;
    const npmNodemonCSS = `npm run nodemon -- -e css -w ${srcTemplatePath}/main.css -w ${sourcePath} --exec "${npmPostCSS}"`;
    const npmRunMain = `node dist/main.js --livereload`;

    concurrently([
      npmPostCSS,
      npmCopyFiles,
      npmNodemonHTML,
      npmNodemonCSS,
      npmRunMain
    ],
    {
      prefix: 'live',
      killOthers: ['failure']
    }
    );
  }
}

interface FileTree {
  folders: Folders[];
}

interface Folders {
  folderName: string;
  files: Files[];
}

interface Files {
  fileName: string;
}

(async () => {
  await TemplateCli.run();
})();

export { TemplateCli };
