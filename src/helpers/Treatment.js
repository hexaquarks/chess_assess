const pgnParser = require('pgn-parser');
const halfTimes = [];

export const treatData = (arr, props) => {
  const halfTimes = [];

  for (var j = 0; j < arr.length; ++j) {
    const [result] = pgnParser.parse(arr[j].pgn)

    if (!checkBerserk(result)) 
      halfTimes.push(calculateTime(result, props));
  }
  const data = assessAverageTime(halfTimes);
  
  return [halfTimes, minutesToTime(
    Math.round(data[0] * 100) / 100 - Math.round(data[1] * 100) / 100
  )];
}

const getTimeFromJSON = (move) => {
  return move.comments[0].commands[0].values[0]
}

const calculateTime = (result, props) => {
  const moves = result.moves;
  const firstTime = getTimeFromJSON(moves[0]);
  const lastTime = getTimeFromJSON(moves[moves.length - 1]);
  const previousLastTime = getTimeFromJSON(moves[moves.length - 2]);

  const maxTime = 2 * (timeToMinutes(firstTime)) - timeToMinutes(lastTime)
                - timeToMinutes(previousLastTime); // Not sure ? 

  // --------------
  //calculate time at midtime
  const halfTime = maxTime / 2;

  let acc = [];
  let accumulator = 0;
  for (var i = 0; i < moves.length; ++i) {
    if (i !== 0 && i !== 1) {
      const diff = timeToMinutes(getTimeFromJSON(moves[i - 2]))
        - timeToMinutes(getTimeFromJSON(moves[i]));
      accumulator += diff;
      acc.push(Math.round(accumulator * 100) / 100);
    }
  }

  let abs = [];
  for (i = 0; i < acc.length; ++i) {
    abs.push(Math.abs(acc[i] - halfTime));
  }
  const halfTimeIndex = abs.indexOf(Math.min.apply(Math, abs));

  const ternUser = halfTimeIndex % 2 === 0 ? halfTimeIndex : halfTimeIndex - 1;
  const ternOpponent = halfTimeIndex % 2 === 0 ? halfTimeIndex - 1 : halfTimeIndex;
  const userHalfTime = timeToMinutes(getTimeFromJSON(moves[ternUser]));
  const opponentHalfTime = timeToMinutes(getTimeFromJSON(moves[ternOpponent]));

  return [halfTime, userHalfTime, opponentHalfTime];
}

const assessAverageTime = (results) => {
  var userAverage = 0;
  var opponentAverage = 0;

  for (var i = 0; i < results.length; ++i) {
    userAverage += results[i][1];
    opponentAverage += results[i][2];
  }
  userAverage = Number(userAverage / results.length);
  opponentAverage = Number(opponentAverage / results.length);

  return [userAverage, opponentAverage];
}

export const checkBerserk = (result) => {
  if (typeof result.moves[0] === 'undefined'
    || typeof result.moves[1] === 'undefined') {
    return true;
  }

  let timeA = timeToMinutes(getTimeFromJSON(result.moves[0]));
  let timeB = timeToMinutes(getTimeFromJSON(result.moves[1]));
  return (Math.abs(timeA - timeB) === timeA || Math.abs(timeA - timeB) === timeB);
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
