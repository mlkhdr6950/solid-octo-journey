import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// Each sub-array is a column (week). Each element in that column is a day (0=Sun … 6=Sat).
// 1 = commit, 0 = blank
const pattern = [
  // M
  [1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,1,0,0,0,1,1],
  [1,0,1,0,1,0,1],
  [1,0,0,1,0,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0], // space

  // L
  [1,0,0,0,0,0,0],
  [1,0,0,0,0,0,0],
  [1,0,0,0,0,0,0],
  [1,0,0,0,0,0,0],
  [1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0], // space

  // K
  [1,0,0,0,0,0,1],
  [1,0,0,0,1,1,0],
  [1,0,1,1,0,0,0],
  [1,1,0,0,1,0,0],
  [1,0,0,0,0,1,0],
  [1,0,0,0,0,0,1],
  [0,0,0,0,0,0,0], // space

  // H
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [0,0,0,0,0,0,0], // space

  // D
  [1,1,1,1,1,1,0],
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0], // space

  // R
  [1,1,1,1,1,1,0],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,0],
  [1,0,1,0,0,0,0],
  [1,0,0,1,0,0,0],
  [1,0,0,0,1,0,0],
];

// function to make commits at given (week, day)
const commitAt = (week, day) => {
  const date = moment()
    .subtract(1, "y")
    .add(week, "w")
    .add(day, "d")
    .format();

  const data = { date };
  jsonfile.writeFile(path, data, () => {
    // 3 commits per cell for darker green
    simpleGit().add([path]).commit(`Pattern commit ${week}-${day}`, { "--date": date });
  });
};

// loop through pattern grid
const makePattern = () => {
  pattern.forEach((col, week) => {
    col.forEach((val, day) => {
      if (val === 1) {
        for (let c = 0; c < 3; c++) {
          commitAt(week, day);
        }
      }
    });
  });

  // push all at once
  simpleGit().push();
};

makePattern();
