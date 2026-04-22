import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// generate random date within last 90 days
const getRandomDate = () => {
  return moment()
    .subtract(random.int(0, 90), "days") // last 3 months
    .format();
};

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const date = moment()
    .subtract(random.int(0, 90), "days")
    .format();

  const data = { date, value: Math.random() };

  await jsonfile.writeFile(path, data);

  process.env.GIT_AUTHOR_DATE = date;
  process.env.GIT_COMMITTER_DATE = date;

  await git.add([path]);
  await git.commit(date);

  await new Promise(res => setTimeout(res, 500)); // delay

  await makeCommits(n - 1);
};
// number of commits
makeCommits(50);