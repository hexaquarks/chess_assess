import { timeToMinutes, checkBerserk } from './Treatment.js';
import { fetchDataForDatabase } from './Fetch.js';

const pgnParser = require('pgn-parser');

let validPlayers = new Set();


const generateBracket = async (playerName, eloBracket, gameMode) => {
    console.log("IN")
    // if(validPlayers >= 20) return; 

    const fetchProps = {
        userName: playerName,
        gameMode: gameMode
    }
    
    const playerData = await fetchDataForDatabase(fetchProps);  
    let currPlayerGames = []; // the current user's valid games (need 25)
    let nextPlayerNames = []; // opponents of current user to check in next reccursion 
    let gameCounter = 0;      // number of valid games for this user

    //loop over player's at most 100 games
    for (var i = 0; i < playerData.length; i++) {
        
        if (checkIfGameValid(playerData[i].players.black.rating,
            playerData[i].players.white.rating,
            eloBracket)) {

            nextPlayerNames.push(
                playerData[i].players.black.user.name === playerName 
                    ? playerData[i].players.black.user.name
                    : playerData[i].players.white.user.name 
            )
            const [result] = pgnParser.parse(playerData[i].pgn)

            if (!checkBerserk(result)) {
                currPlayerGames.push(result);
                console.log("added a game :" , result)
            }
            gameCounter++;
        }
        if(gameCounter > 25){
            //enough games, go to next player 
            const newPlayerObject = {
                name: playerName ,
                gameList: currPlayerGames
            };
            if(!validPlayers.has(newPlayerObject)) {
                validPlayers.add(newPlayerObject);
                console.log("added a player : " , newPlayerObject)
            }

            // reccursion here
            for(var j = 0; j < nextPlayerNames.length ;j++){
                if(validPlayers.size < 20) {
                    generateBracket(nextPlayerNames[j], eloBracket)
                }
            }
            
        } 
    }
    console.log(
        Array.from(validPlayers.values()), validPlayers.size
      )
}

const checkIfGameValid = (r1, r2, elo) => {
    //ri = rating of player i
    return (r1 >= elo[0] && r1 <= elo[1]) && (r2 >= elo[0] && r2 <= elo[1])
}

export default generateBracket;