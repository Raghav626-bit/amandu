import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

import pathModule from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathModule.dirname(__filename);
const path = pathModule.join(__dirname, "data.json");
const git = simpleGit();

const makeCommit = async (n) => {
  if (n === 0) {
    console.log("✅ All commits done!");
    await git.push();
    return;
  }

  const x = random.int(0, 54); // weeks
  const y = random.int(0, 6);  // days
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };

  await jsonfile.writeFile(path, data);
  await git.add(path);
  await git.commit(date, { "--date": date });

  console.log(`Committed for date: ${date}`);
  makeCommit(n - 1);
};

// Run with desired number of commits
makeCommit(1000);
