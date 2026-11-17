import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();

async function initAndCommit() {
  console.log('Initializing Git repo at', dir);
  await git.init({ fs, dir });

  // List all files to add recursively, excluding ignored dirs
  const ignoredDirs = new Set(['node_modules', '.next', '.tools', '.git']);
  const ignoredFiles = new Set(['.env.local']);

  function getFiles(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (ignoredDirs.has(entry.name)) continue;
        files = files.concat(getFiles(path.join(currentDir, entry.name), path.join(relativePath, entry.name)));
      } else {
        if (ignoredFiles.has(entry.name)) continue;
        files.push(path.join(relativePath, entry.name).replace(/\\/g, '/'));
      }
    }
    return files;
  }

  const filesToAdd = getFiles(dir);
  console.log(`Found ${filesToAdd.length} files to track:`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Aavin D2C Developer',
      email: 'dev@aavinchilled.in',
    },
    message: 'feat: Initial commit for Aavin D2C beverage e-commerce platform',
  });

  console.log('Successfully committed with SHA:', sha);
}

initAndCommit().catch(console.error);
