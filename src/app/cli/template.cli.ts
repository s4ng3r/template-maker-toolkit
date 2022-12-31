import prompts, { Choice } from 'prompts';
import globby from 'globby';
import _ from 'lodash';
import minimatch from 'minimatch';

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

    //console.log(JSON.stringify(fileTree));

    /*const response = await prompts({
      type: 'text',
      name: 'meaning',
      message: 'Template CLI!'
    });
    console.log(response.meaning);*/

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
