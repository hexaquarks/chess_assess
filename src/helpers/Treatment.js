const pgnParser = require('pgn-parser');
const halfTimes = [];

export const treatData = (arr, props) => {

  const halfTimes = [];
  for (var j = 0; j < arr.length; j++) {
    const [result] = pgnParser.parse(arr[j].pgn)

    if (!checkBerserk(result)) {
      halfTimes.push(calculateTime(result, props));
    }
  }

  const data = assessAverageTime(halfTimes);
  return [halfTimes, minutesToTime(Math.round(data[0] * 100) / 100 - Math.round(data[1] * 100) / 100)]
}


const calculateTime = (result, props) => {

  let lastTime = result.moves[result.moves.length - 1].comments[0].commands[0].values[0];
  let previousLastTime = result.moves[result.moves.length - 2].comments[0].commands[0].values[0]
  let firstTime = result.moves[0].comments[0].commands[0].values[0]

  const firstTimeToMinutes = timeToMinutes(firstTime);
  const maxTime = (firstTimeToMinutes - timeToMinutes(lastTime)) +
    (firstTimeToMinutes - timeToMinutes(previousLastTime));

  // --------------
  //calculate time at midtime
  const halfTime = maxTime / 2;

  let acc = [];
  let accumulator = 0;
  for (var i = 0; i < result.moves.length; i++) {
    if (!(i === 0 || i === 1)) {
      const diff = timeToMinutes(result.moves[i - 2].comments[0].commands[0].values[0])
        - timeToMinutes(result.moves[i].comments[0].commands[0].values[0]);
      accumulator += diff;
      acc.push(Math.round(accumulator * 100) / 100);
    }
  }

  let abs = [];
  for (i = 0; i < acc.length; i++) {
    abs.push(Math.abs(acc[i] - halfTime));
  }
  const halfTimeIndex = abs.indexOf(Math.min.apply(Math, abs));

  let ternUser = halfTimeIndex % 2 === 0 ? halfTimeIndex : halfTimeIndex - 1;
  let ternOpponent = halfTimeIndex % 2 === 0 ? halfTimeIndex - 1 : halfTimeIndex;
  const userHalfTime = timeToMinutes(result.moves[ternUser].comments[0].commands[0].values[0]);
  const opponentHalfTime = timeToMinutes(result.moves[ternOpponent].comments[0].commands[0].values[0]);

  // console.log(halfTime)
  // console.log(userHalfTime)
  // console.log(opponentHalfTime)
  return [halfTime, userHalfTime, opponentHalfTime];
}

const assessAverageTime = (results) => {
  var user = 0, opponent = 0;
  for (var i = 0; i < results.length; i++) {
    user += results[i][1];
    opponent += results[i][2];
  }
  user = Number(user / results.length);
  opponent = Number(opponent / results.length);

  return [user, opponent];
}
export const checkBerserk = (result) => {
  if (typeof result.moves[0] === 'undefined'
    || typeof result.moves[1] === 'undefined') {
    return true;
  }

  let timeA = timeToMinutes(result.moves[0].comments[0].commands[0].values[0]);
  let timeB = timeToMinutes(result.moves[1].comments[0].commands[0].values[0]);
  if (Math.abs(timeA - timeB) === timeA || Math.abs(timeA - timeB) === timeB) {
    return true;
  }
  return false;
}

const timeToMinutes = (time) => {
  var arr = time.split(':');
  return (Math.round((parseFloat(arr[1]) + parseFloat(arr[2] / 60)) * 100) / 100);
}

const minutesToTime = (minutes) => {
  var sign = minutes < 0 ? "-" : "";
  var min = Math.floor(Math.abs(minutes));
  var sec = Math.floor((Math.abs(minutes) * 60) % 60);
  return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

Number.prototype.toFixedNumber = function (digits, base) {
  var pow = Math.pow(base || 10, digits);
  return Math.round(this * pow) / pow;
}
