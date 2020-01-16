const players = [11, 23, 10, 1, 3, 21, 18, 20, 16, 20];
const count = 5;
const sortedP = players.sort((a, b) => a-b);

let totalT = players.length - 4;
const totalTeams = [];
let currentPos = 0;
let results = [];

while(totalT > 0){
  totalTeams.push(sortedP.slice(currentPos, currentPos + count))
  totalT--;
  currentPos++;
}

totalTeams.forEach((v, i, arr) => {
  let leader = arr[i][count-1];
  let totalEffort = 0;

  v.forEach(v => {
    totalEffort += (leader-v);
  })

  results.push({team: i, totalEffort})
})

results.sort((a, b) => a.totalEffort - b.totalEffort);
console.log(results[0].totalEffort, totalTeams[results[0].team]);
