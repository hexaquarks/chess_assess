import treatData from './Treatment.js';
import emitFetchResult from '../components/Inputs.vue';

const fetchData = async (props)  => {
  // const {userName, } = props;
  // eslint-disable-next-line no-unused-vars
  let url =  `https://lichess.org/api/games/user/${props.userName}?max=${props.max}&rated=${props.rated}${props.gameModes && seralizeGameModes2(props.gameModes)}&clocks=true&pgnInJson=true`;
  let testingUrl = `https://lichess.org/api/games/user/physicskush?max=100&rated=true&perfType=rapid&clocks=true&pgnInJson=true`;
  console.log(url);
  url.replace(/ /g,'')
  console.log(url);

  const response = await fetch(
    url,
    {
      headers: {
        Accept: "application/x-ndjson",
      },
    }
  )
    .then(readStream(onMessage))
    .then(onComplete);
  
    // const results = [];
    // for(var i = 0 ; i < arr.length ; i++){
    //   results.push(pgnParser.parse(arr[i].pgn));
    // }
    const data = treatData(arr, props);
    // emitFetchResult();

    return data;
    
}

const seralizeGameModes2 = (params) => '&perfType='.concat(params.join(","))

const serializeGameModes = (params) =>  Object.keys(params).map(
    key => key + '=' + params[key]
  ).join('&');


const readStream = (processLine) => (response) => {
  const stream = response.body.getReader();
  const matcher = /\r?\n/;
  const decoder = new TextDecoder();
  let buf = "";

  const loop = () =>
    stream.read().then(({ done, value }) => {
      if (done) {
        if (buf.length > 0) processLine(JSON.parse(buf));
      } else {
        const chunk = decoder.decode(value, {
          stream: true,
        });
        buf += chunk;

        const parts = buf.split(matcher);
        buf = parts.pop();
        for (const i of parts.filter((p) => p)) processLine(JSON.parse(i));
        return loop();
      }
    });

  return loop();
};
const arr = [];
const onMessage = (obj) => arr.push(obj);
const onComplete = () => console.log("The stream has completed");


export default fetchData;