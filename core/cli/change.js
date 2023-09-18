const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

//排除文件
const EXCLUDED_FILES = [];

async function getChangedFiles(directory) {
    const git = simpleGit(directory);

    try {
        const status = await git.status();
        return [...status.modified, ...status.not_added, ...status.created, ...status.deleted];
    } catch (error) {
        console.error(`Error in ${directory}:`, error.message);
        return [];
    }
}

async function getGitFolders(directory) {
    let results = [];
    const list = fs.readdirSync(directory);
    for (let item of list) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (fs.existsSync(path.join(fullPath, '.git'))) {
                const changedFiles = await getChangedFiles(fullPath);
                const hasImportantChanges = changedFiles.some(file => !EXCLUDED_FILES.includes(file));

                if (hasImportantChanges) {
                    results.push({
                        path: fullPath,
                        changedFiles: changedFiles.filter(file => !EXCLUDED_FILES.includes(file))
                    });
                    continue;
                }
            }
            results = results.concat(await getGitFolders(fullPath));
        }
    }
    return results;
}

async function change() {
  let list = await getGitFolders(process.cwd())
  console.log(list)
}

module.exports = change