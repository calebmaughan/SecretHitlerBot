import { prefix, token, play5, play6, play7, play8, play9, play10 } from './config.json';
const myGuildid = "";
const mainChanId = ""
import { Client } from 'discord.js';
const client = new Client();
var players = [];
var membersInGame = [];
var gameStarted = false;
var gameOpen = false;
var playerCount = 0;
var presidentIndex = -1;
var playerLabels = ["player1", "player2", "player3", "player4", "player5", "player6", "player7", "player8", "player9", "player10"];
var secretRoles = [];
var diffPlayCounts = [play5, play6, play7, play8, play9, play10];
var fIndex = [];
var hindex = 0;
var round = 0;
var notPassedRound = 0;
var phase = "none";
var votes = [];
var votesCast = 0;
var yesv = 0;
var nov = 0;
var policydeck = ["f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "l", "l", "l", "l", "l", "l"];
var policydisc = [];
var policyhand = [];
var libp = 0;
var fasp = 0;
var libplayed = 0;
var fasplayed = 0;
var playedcards = [];
var lastpres = -1;
var lastchanc = -1;
var powers56 = ["x", "x", "search", "kill", "kill"];
var powers78 = ["x", "inves", "choose", "kill", "kill"];
var powers910 = ["inves", "inves", "choose", "kill", "kill"];
var currentpowers = [];
var powerPres = 0;
var currentPlayers = 0;
var deadPlayers = [];
var lastpower = -1;
var playernames = [];

function sendAllMessage(message){
    var guil = client.guilds.cache.find(guild => guild.id === (myGuildid));
    var chan = guil.channels.cache.find(channel => channel.id === (mainChanId));
    chan.send(message);
    for(var i = 0; i < playerCount; i++){
        chan = guil.channels.cache.find(channel => channel.name === (playerLabels[i] + "-channel"));
        chan.send(message);
    }
}

function search(){
    sendAllMessage(players[powerPres] + " gets to look at the top 3 cards.");
    var guil = client.guilds.cache.find(guild => guild.id === (myGuildid));
    var chan = guil.channels.cache.find(channel => channel.name === (playerLabels[powerPres] + "-channel"));
    var fascc = 0;
    var libcc = 0;
    for(var i = 0; i < 3; i++){
        if(policydeck[i] === 'f'){
            fascc++;
        }
        else{
            libcc++;
        }
    }
    chan.send("The next 3 cards have " + libcc + " liberal card(s) and " + fascc + " fascist card(s).");
}

function inves(){
    sendAllMessage(playernames[powerPres] + " gets to investigate another player.");
    var guil = client.guilds.cache.find(guild => guild.id === (myGuildid));
    var chan = guil.channels.cache.find(channel => channel.name === (playerLabels[powerPres] + "-channel"));
    chan.send("Choose a player to investigate by typing !investigate <username>.");
}

function choose(){
    sendAllMessage(playernames[powerPres] + " gets to choose the next president.");
    var guil = client.guilds.cache.find(guild => guild.id === (myGuildid));
    var chan = guil.channels.cache.find(channel => channel.name === (playerLabels[powerPres] + "-channel"));
    chan.send("Choose a player to become the next president by typing !choose <username>.");
}

function kill(){
    sendAllMessage(playernames[powerPres] + " gets to kill another player.");
    var guil = client.guilds.cache.find(guild => guild.id === (myGuildid));
    var chan = guil.channels.cache.find(channel => channel.name === (playerLabels[powerPres] + "-channel"));
    chan.send("Choose a player to kill by typing !kill <username>.");
}


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //main channel commands(open, join, start, end)
    if(message.channel.id === mainChanId){

        if(command === "opengame"){
            if(!gameOpen){
                message.channel.bulkDelete(99);
                message.channel.bulkDelete(99);
                message.channel.bulkDelete(99);
                message.channel.bulkDelete(99);
                message.channel.bulkDelete(99);
                for(var i = 0; i < 10; i++){
                    const chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[i] + "-channel"));
                    chan.bulkDelete(99);
                    chan.bulkDelete(99);
                    chan.bulkDelete(99);
                    chan.bulkDelete(99);
                    chan.bulkDelete(99);
                }
                playernames = [];
                presidentIndex = -1;
                gameStarted = true;
                gameOpen = true;
                playerCount = 0;
                currentPlayers = 0;
                players = [];
                membersInGame = [];
                findex = [];
                hindex = 0;
                round = 0;
                deadPlayers = [];
                votes = [];
                votesCast = 0;
                yesv = 0;
                nov = 0;
                powerPres = 0;
                currentPlayers = 0;
                deadPlayers = [];
                lastpower = -1;
                policydeck = ["f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "l", "l", "l", "l", "l", "l"];
                policydisc = [];
                policyhand = [];
                libp = 0;
                fasp = 0;
                libplayed = 0;
                fasplayed = 0;
                playedcards = [];
                lastpres = -1;
                lastchanc = -1;
                fIndex = [];
                hindex = -1;
                round = 0;
                notPassedRound = 0;
                phase = "none";
                secretRoles = [];
                message.channel.send("Game has been opened. Type !joingame <your name> to join");
                votes = [];
                console.log(votesca)
            }
            else{
                message.delete();
            }
        }

        else if(command === "joingame"){
            votesCast = 0;
            if(gameOpen && players.indexOf(message.author.username) === -1){
                if(args.length === 1 && playernames.indexOf(args[0]) === -1){
                    players.push(message.author.username);
                    playernames.push(args[0]);
                    membersInGame.push(message.member);
                    const role = message.guild.roles.cache.find(role => role.name === playerLabels[playerCount]);
                    message.member.roles.add(role);
                    message.channel.send(args[0] + " joined as " + playerLabels[playerCount]);
                    votes.push("x");
                    playerCount++;
                    currentPlayers++;
                }
                else{
                    message.channel.send("That is not a valid name.");
                }
            }
            else{
                message.channel.send("Either the game is not open or you have already joined");
            }
        }

        else if(command === "startgame"){
            if(playerCount > 4){
                if(playerCount < 7){
                    currentpowers = powers56;
                }
                else if(playerCount < 9){
                    currentpowers = powers78;
                }
                else{
                    currentpowers = powers910;
                }
                gameOpen = false;

                secretRoles = diffPlayCounts[playerCount - 5].split(/ +/);
                var currentIndex = secretRoles.length;
                var temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
            
                    // And swap it with the current element.
                    temporaryValue = secretRoles[currentIndex];
                    secretRoles[currentIndex] = secretRoles[randomIndex];
                    secretRoles[randomIndex] = temporaryValue;
                }
                for(var i = 0; i < playerCount; i++){
                    if(secretRoles[i] === "f"){
                        fIndex.push(i);
                    }
                    else if(secretRoles[i] === "h"){
                        hindex = i;
                    }
                }
                var currentIndex = policydeck.length;
                var temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
            
                    // And swap it with the current element.
                    temporaryValue = policydeck[currentIndex];
                    policydeck[currentIndex] = policydeck[randomIndex];
                    policydeck[randomIndex] = temporaryValue;
                }
                message.channel.send("The game has started, check your personal channels to see what your role is.")
                for(var i = 0; i < playerCount; i++){
                    var chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[i] + "-channel"));
                    if(secretRoles[i] === 'l'){
                        chan.send("You are a liberal this game. Try and pass liberal policies and kill Hitler");
                    }
                    else if(secretRoles[i] == 'f'){
                        chan.send("You are a fascist this game. Work with the other fascists to try and pass fascist policies and elect Hitler as chancellor after 3 fascist policies are passed.");
                        for(var j = 0; j < fIndex.length; j++){
                            if(fIndex[j] !== i){
                                chan.send(playernames[fIndex[j]] + " is also a fascist.")
                            }
                        }
                        chan.send(players[hindex] + " is Hitler");
                    }
                    else{
                        chan.send("You are Hitler this game. Try and pass fascist policies and get elected chancellor after 3 fascist policies are passed.");
                        if(playerCount < 7){
                            chan.send(playernames[fIndex[0]] + " is your fascist partner");
                        }
                    }
                }
                presidentIndex = Math.floor(Math.random() * playerCount);
                var mymess = "";
                for(var i = 0; i < playerCount; i++){
                    mymess += "Player " + (i + 1) + ": " + playernames[i] + "\n";
                }
                sendAllMessage(mymess)
                sendAllMessage(playernames[presidentIndex] + " is president for the first round.");
                chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                chan.send("Nominate a chancellor using !nominate <username>.");
                phase = "nom";
            }
            else{
                sendAllMessage("There are not enough players to start a game");
            }
        }

        else if(command === "endgame"){
            gameStarted = false;
            gameOpen = false;
            votes = [];
            votesCast = 0;
            yesv = 0;
            nov = 0;
            for(var i = 0; i < players.length; i++){
                const role = message.guild.roles.cache.find(role => role.name === playerLabels[i]);
                membersInGame[i].roles.remove(role);
            }
            message.channel.bulkDelete(99);
            message.channel.bulkDelete(99);
            message.channel.bulkDelete(99);
            message.channel.bulkDelete(99);
            message.channel.bulkDelete(99);

            for(var i = 0; i < 10; i++){
                const chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[i] + "-channel"));
                chan.bulkDelete(99);
                chan.bulkDelete(99);
                chan.bulkDelete(99);
                chan.bulkDelete(99);
                chan.bulkDelete(99);
            }

            message.channel.send("Game has ended. Type !opengame to start a new game");

            
        }

        else{
            message.delete();
        }
    }

    else{
        if(gameStarted == true){
            if(command === "nominate"){
                if(phase === "nom" && players.indexOf(message.author.username) == presidentIndex && args.length == 1){
                    if(playernames.indexOf(args[0]) != players.indexOf(message.author.username)){
                        var tempIndex = playernames.indexOf(args[0]);
                        var dead = false;
                        if(fasplayed > 3){
                            if(deadPlayers.indexOf(tempIndex) !== -1){
                                dead = true;
                            }
                        }
                        if(playernames.indexOf(args[0]) === -1 || playernames.indexOf(args[0]) === lastpres || playernames.indexOf(args[0]) === lastchanc || dead === true){
                            message.channel.send("That person is not eligible for nomination.");
                        }
                        else{
                            chancIndex = playernames.indexOf(args[0]);
                            sendAllMessage(playernames[presidentIndex] + " has nominated " + playernames[chancIndex] + " to be the Chancellor for this round");
                            sendAllMessage("Please vote using the command !vote <yes or no>.");
                            phase = "vote";
                        }
                    }
                    else{
                        message.channel.send("You cannot nominate yourself");
                    }
                }
                else{
                    message.delete();
                }
            }
            
            else if(command === "vote"){
                if(phase === "vote" && args.length == 1 && votes[players.indexOf(message.author.username)] === "x"){
                    if(args[0] === "yes"){
                        votes[players.indexOf(message.author.username)] = "y"; 
                        votesCast++;
                    }
                    else if(args[0] === "no"){
                        votes[players.indexOf(message.author.username)] = "n";
                        votesCast++;
                    }
                    message.channel.send(votesCast + " players have voted so far");
                    var mmm = "";
                    if(votesCast >= currentPlayers){
                        for(var i = 0; i < playerCount; i++){
                            var dead = false;
                            if(fasplayed > 3){
                                if(deadPlayers.indexOf(i) !== -1){
                                    dead = true;
                                }
                            }
                            if(!dead){
                                if(votes[i] === "y"){
                                    yesv++;
                                    mmm += (playernames[i] + " voted yes.\n");
                                }
                                else if(votes[i] === "n"){
                                    mmm += (playernames[i] + " voted no.\n");
                                    nov++;
                                }
                            }
                        }
                        sendAllMessage(mmm)
                        if(yesv > nov){
                            //do the policies here
                            sendAllMessage("The government has been elected successfully. A policy will be passed");
                            notPassedRound = 0;
                            lastchanc = chancIndex;
                            lastpres = presidentIndex;
                            if(fasplayed > 2 && secretRoles.indexOf("h") == chancIndex){
                                sendAllMessage("Hitler has been elected chancellor and the fascists win!");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            if(policydeck.length < 3){
                                var currentIndex = policydisc.length;
                                var temporaryValue, randomIndex;
                            
                                // While there remain elements to shuffle...
                                while (0 !== currentIndex) {
                                    // Pick a remaining element...
                                    randomIndex = Math.floor(Math.random() * currentIndex);
                                    currentIndex -= 1;
                            
                                    // And swap it with the current element.
                                    temporaryValue = policydisc[currentIndex];
                                    policydisc[currentIndex] = policydisc[randomIndex];
                                    policydisc[randomIndex] = temporaryValue;
                                }
                                policydeck = policydeck.concat(policydisc);
                                policydisc = [];
                            }
                            for(var i = 0; i < 3; i++){

                                policyhand.push(policydeck.shift());
                                if(policyhand[i] == "f"){
                                    fasp++;
                                }
                                else{
                                    libp++;
                                }
                            }
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            phase = "discp";
                            chan.send("This hand has " + libp + " liberal card(s) and " + fasp + " fascist card(s). Enter !discard <fas or lib> to discard a card.");

                        }
                        else{
                            sendAllMessage("The government was not voted into office. The new president is the next player");
                            notPassedRound++;
                            if(notPassedRound == 3){
                                sendAllMessage("The top card of the policy deck will be passed");
                                notPassedRound = 0;
                                var topcard = policydeck.shift()
                                if(topcard == "f"){
                                    fasplayed++;
                                    playedcards.push(topcard);
                                    sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                                    if(fasplayed == 6){
                                        sendAllMessage("The fascists have won by passing 6 liberal policies!");
                                        gameStarted = false;
                                        var myme = ""
                                        for(var z = 0; z < playerCount; z++){
                                            if(secretRoles[z] === "h"){
                                                myme += (playernames[z] + " was Hitler.\n");
                                            }
                                            else if(secretRoles[z] === "f"){
                                                myme += (playernames[z] + " was a fascist.\n");
                                            }
                                            else if(secretRoles[z] === "l"){
                                                myme += (playernames[z] + " was a liberal.\n");
                                            }
                                        }
                                        myme += "Enter !endgame on the main channel to end the game."
                                        sendAllMessage(myme);
                                        return;
                                    }
                                    if(fasplayed == 5){
                                        sendAllMessage("Veto powers are now in effect. The president and the chancellor can agree to discard policies instead of passing one.")
                                    }
                                }
                                else{
                                    libplayed++;
                                    playedcards.push(topcard);
                                    sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                                    if(libplayed > 4){
                                        sendAllMessage("The liberals have won by passing 5 liberal policies!");
                                        sendAllMessage("Enter !endgame on the main channel to end the game.");
                                        gameStarted = false;
                                        var myme = ""
                                        for(var z = 0; z < playerCount; z++){
                                            if(secretRoles[z] === "h"){
                                                myme += (playernames[z] + " was Hitler.\n");
                                            }
                                            else if(secretRoles[z] === "f"){
                                                myme += (playernames[z] + " was a fascist.\n");
                                            }
                                            else if(secretRoles[z] === "l"){
                                                myme += (playernames[z] + " was a liberal.\n");
                                            }
                                        }
                                        myme += "Enter !endgame on the main channel to end the game."
                                        sendAllMessage(myme);
                                        return;
                                    }
                                }

                            }
                            else{
                                sendAllMessage(notPassedRound + " government(s) have been voted down.");
                            }
                            var valid = false;
                            powerPres = presidentIndex;
                            while(!valid){
                                presidentIndex++;
                                if(presidentIndex == playerCount){
                                    presidentIndex = 0;
                                }
                                if(deadPlayers.indexOf(presidentIndex) == -1){
                                    valid = true;
                                }
                            }
                            for(var i = 0; i < playerCount; i++){
                                votes[i] = 'x';
                                votesCast = 0;
                                yesv = 0;
                                nov = 0;
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                            if(lastpower < (fasplayed - 1)){
                                console.log("powers being played");
                                lastpower = fasplayed - 1;
                                if(currentpowers[fasplayed - 1] === "inves"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    inves();
                                    phase = "inves";
                                }
                                else if(currentpowers[fasplayed - 1] === "search"){
                                    search();
                                }
                                else if(currentpowers[fasplayed - 1] === "choose"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    choose();
                                    phase = "choose";
                                }
                                else if(currentpowers[fasplayed - 1] === "kill"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    kill();
                                    phase = "kill";
                                }
                            }
                        }
                        
                    }
                }
                else if(phase === "vote" && args.length == 1 && (votes[players.indexOf(message.author.username)] === "y" || votes[players.indexOf(message.author.username)] === "n")){
                    message.channel.send(votesCast + " players have voted so far");
                }
                else{
                    message.delete();
                }
            }

            else if(command === "discard"){
                if(phase === "discp" && players.indexOf(message.author.username) == presidentIndex && args.length == 1){
                    if(args[0] == "fas" && fasp > 0){
                        fasp--;
                        var discindex = policyhand.indexOf("f");
                        policydisc.push(policyhand[discindex]);
                        policyhand.splice(discindex, 1);
                        sendAllMessage("The president has discarded a card. The chancellor will now discard a card.");
                        chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[chancIndex] + "-channel"));
                        chan.send("This hand has " + libp + " liberal card(s) and " + fasp + " fascist card(s).");
                        if(fasplayed == 5){
                            chan.send("You can try and veto the agenda by entering !veto yes, otherwise enter !veto no");
                            phase = "vetoc";
                        }
                        else{
                            chan.send("Enter !discard <fas or lib> to discard a card.")
                            phase = "discc";
                        }
                    }
                    else if(args[0] == "lib" && libp > 0){
                        libp--;
                        var discindex = policyhand.indexOf("l");
                        policydisc.push(policyhand[discindex]);
                        policyhand.splice(discindex, 1);
                        sendAllMessage("The president has discarded a card. The chancellor will now discard a card.");
                        chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[chancIndex] + "-channel"));
                        chan.send("This hand has " + libp + " liberal card(s) and " + fasp + " fascist card(s).");
                        if(fasplayed == 5){
                            chan.send("You can try and veto the agenda by entering !veto yes, otherwise enter !veto no");
                            phase = "vetoc";
                        }
                        else{
                            chan.send("Enter !discard <fas or lib> to discard a card.")
                            phase = "discc";
                        }
                    }
                    else{
                        message.channel.send("That is not a valid card to discard.");
                    }
                }
                else if(phase === "discc" && players.indexOf(message.author.username) == chancIndex && args.length == 1){
                    if(args[0] == "fas" && fasp > 0){
                        fasp--;
                        var discindex = policyhand.indexOf("f");
                        policydisc.push(policyhand[discindex]);
                        policyhand.splice(discindex, 1);
                        if(libp > 0){
                            sendAllMessage("The policy passed is liberal.");
                            libplayed++;
                            libp--;
                            sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                            if(libplayed > 4){
                                sendAllMessage("The liberals have won by passing 5 liberal policies!");
                                sendAllMessage("Enter !endgame on the main channel to end the game.");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            playedcards.push(policyhand[0]);
                            policyhand = [];
                            var valid = false;
                            powerPres = presidentIndex;
                            while(!valid){
                                presidentIndex++;
                                if(presidentIndex == playerCount){
                                    presidentIndex = 0;
                                }
                                if(deadPlayers.indexOf(presidentIndex) == -1){
                                    valid = true;
                                }
                            }
                            for(var i = 0; i < playerCount; i++){
                                votes[i] = 'x';
                                votesCast = 0;
                                yesv = 0;
                                nov = 0;
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                        }
                        else{
                            sendAllMessage("The policy passed is fascist.");
                            fasplayed++;
                            fasp--;
                            sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                            if(fasplayed == 6){
                                sendAllMessage("The fascists have won by passing 6 fascist policies!");
                                sendAllMessage("Enter !endgame on the main channel to end the game.");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            if(fasplayed == 5){
                                sendAllMessage("Veto powers are now in effect. The president and the chancellor can agree to discard policies instead of passing one.")
                            }
                            powerPres = presidentIndex;
                            playedcards.push(policyhand[0]);
                            policyhand = [];
                            var valid = false;
                            powerPres = presidentIndex;
                            while(!valid){
                                presidentIndex++;
                                if(presidentIndex == playerCount){
                                    presidentIndex = 0;
                                }
                                if(deadPlayers.indexOf(presidentIndex) == -1){
                                    valid = true;
                                }
                            }
                            for(var i = 0; i < playerCount; i++){
                                votes[i] = 'x';
                                votesCast = 0;
                                yesv = 0;
                                nov = 0;
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                            if(lastpower < (fasplayed - 1)){
                                console.log("powers being played");
                                lastpower = fasplayed - 1;
                                if(currentpowers[fasplayed - 1] === "inves"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    inves();
                                    phase = "inves";
                                }
                                else if(currentpowers[fasplayed - 1] === "search"){
                                    search();
                                }
                                else if(currentpowers[fasplayed - 1] === "choose"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    choose();
                                    phase = "choose";
                                }
                                else if(currentpowers[fasplayed - 1] === "kill"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor.");
                                    kill();
                                    phase = "kill";
                                }
                            }
                        }
                    }
                    else if(args[0] == "lib" && libp > 0){
                        libp--;
                        var discindex = policyhand.indexOf("l");
                        policydisc.push(policyhand[discindex]);
                        policyhand.splice(discindex, 1);
                        if(libp > 0){
                            sendAllMessage("The policy passed is liberal.");
                            libplayed++;
                            libp--;
                            sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                            if(libplayed > 4){
                                sendAllMessage("The liberals have won by passing 5 liberal policies!");
                                sendAllMessage("Enter !endgame on the main channel to end the game.");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            playedcards.push(policyhand[0]);
                            policyhand = [];
                            powerPres = presidentIndex;
                            var valid = false;
                            powerPres = presidentIndex;
                            while(!valid){
                                presidentIndex++;
                                if(presidentIndex == playerCount){
                                    presidentIndex = 0;
                                }
                                if(deadPlayers.indexOf(presidentIndex) == -1){
                                    valid = true;
                                }
                            }
                            for(var i = 0; i < playerCount; i++){
                                votes[i] = 'x';
                                votesCast = 0;
                                yesv = 0;
                                nov = 0;
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                        }
                        else{
                            sendAllMessage("The policy passed is fascist.");
                            fasplayed++;
                            fasp--;
                            sendAllMessage("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
                            if(fasplayed == 6){
                                sendAllMessage("The fascists have won by passing 6 fascist policies!");
                                sendAllMessage("Enter !endgame on the main channel to end the game.");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            if(fasplayed == 5){
                                sendAllMessage("Veto powers are now in effect. The president and the chancellor can agree to discard policies instead of passing one.")
                            }
                            playedcards.push(policyhand[0]);
                            policyhand = [];
                            powerPres = presidentIndex;
                            var valid = false;
                            powerPres = presidentIndex;
                            while(!valid){
                                presidentIndex++;
                                if(presidentIndex == playerCount){
                                    presidentIndex = 0;
                                }
                                if(deadPlayers.indexOf(presidentIndex) == -1){
                                    valid = true;
                                }
                            }
                            for(var i = 0; i < playerCount; i++){
                                votes[i] = 'x';
                                votesCast = 0;
                                yesv = 0;
                                nov = 0;
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                            if(lastpower < (fasplayed - 1)){
                                lastpower = fasplayed - 1;
                                console.log("powers being played");
                                
                                lastpower = fasplayed - 1;
                                if(currentpowers[fasplayed - 1] === "inves"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor");
                                    inves();
                                    phase = "inves"
                                }
                                else if(currentpowers[fasplayed - 1] === "choose"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor");
                                    choose();
                                    phase = "choose";
                                }
                                else if(currentpowers[fasplayed - 1] === "kill"){
                                    chan.send("There is a power being played, please wait to nominate your chancellor");
                                    kill();
                                    phase = "kill"
                                }
                                else if(currentpowers[fasplayed - 1] === "search"){
                                    search();
                                }
                            }
                        }
                    }
                    else{
                        message.channel.send("That is not a valid card to discard.");
                    }
                }
                else{
                    message.delete();
                }   
            }

            else if(command === "veto"){
                if(phase === "vetoc" && players.indexOf(message.author.username) == chancIndex && args.length == 1){
                    if(args[0] == "no"){
                        sendAllMessage("The chancellor has decided not to veto");
                        message.channel.send("Enter !discard <fas or lib> to discard a card.")
                        phase = "discc";
                    }
                    else if(args[0] === "yes"){
                        sendAllMessage("The chancellor has put forward the idea to veto. The president will now choose whether to veto the agenda.");
                        chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                        chan.send("Choose whether to veto the agenda by entering !veto <yes or no>.");
                        phase = "vetop";
                    }
                }
                else if(phase === "vetop" && players.indexOf(message.author.username) == presidentIndex && args.length == 1){
                    if(args[0] == "no"){
                        sendAllMessage("The president has decided not to veto.");
                        chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[chancIndex] + "-channel"));
                        chan.send("Enter !discard <fas or lib> to discard a card.");
                        phase = "discc";
                    }
                    else if(args[0] === "yes"){
                        sendAllMessage("The president has decided to veto. All cards will be discarded and the next player will become president");
                        var size = policyhand.length;
                        for(var i = 0; i < SVGPathSegLinetoHorizontalRel; i++){
                            policydisc.push(policyhand.shift());
                        }
                        policyhand = [];
                        var valid = false;
                        powerPres = presidentIndex;
                        while(!valid){
                            presidentIndex++;
                            if(presidentIndex == playerCount){
                                presidentIndex = 0;
                            }
                            if(deadPlayers.indexOf(presidentIndex) == -1){
                                valid = true;
                            }
                        }
                        for(var i = 0; i < playerCount; i++){
                            votes[i] = 'x';
                            votesCast = 0;
                            yesv = 0;
                            nov = 0;
                        }
                        fasp = 0;
                        libp = 0;
                        sendAllMessage(playernames[presidentIndex] + " is the new president");
                        chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                        chan.send("Nominate a chancellor using !nominate <username>.");
                        phase = "nom";
                    }
                }
                else{
                    message.delete();
                }
            }

            else if(command === "investigate"){
                if(phase === "inves" && players.indexOf(message.author.username) == powerPres && args.length == 1){
                    if(args[0] != message.author.username){
                        var tempIndex = playernames.indexOf(args[0]);
                        if(tempIndex !== -1){
                            var invesIndex = playernames.indexOf(args[0]);
                            var party = secretRoles[invesIndex];
                            if(party === "f" | party === "h"){
                                message.channel.send("The investigated person is Fascist.");
                            }
                            else{
                                message.channel.send("The investigated person is Liberal.");
                            }
                            sendAllMessage(args[0] + " has been investigated.");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                        }
                        else{
                            message.channel.send("That person is not eligible for investigation.");
                        }
                    }
                    else{
                        message.channel.send("You cannot investigate yourself.");
                    }
                }
                else{
                    message.delete();
                }
            }

            else if(command === "choose"){
                if(phase === "choose" && players.indexOf(message.author.username) == powerPres && args.length == 1){
                    if(args[0] != message.author.username){
                        var tempIndex = playernames.indexOf(args[0]);
                        if(tempIndex !== -1){
                            var chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Sorry, you are no longer the president.");
                            presidentIndex = playernames.indexOf(args[0]);
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                        }
                        else{
                            message.channel.send("That person is not eligible to become president.");
                        }
                    }
                    else{
                        message.channel.send("You cannot choose yourself.");
                    }
                }
                else{
                    message.delete();
                }
            }

            else if(command === "kill"){
                if(phase === "kill" && players.indexOf(message.author.username) == powerPres && args.length == 1){
                    if(args[0] != message.author.username){
                        var tempIndex = playernames.indexOf(args[0]);
                        var dead = false;
                        if(fasplayed > 4){
                            if (deadPlayers.indexOf(tempIndex) !== -1){
                                dead = true;
                            }
                        }
                        if(tempIndex !== -1 && !dead){
                            deadPlayers.push(tempIndex);
                            const role = message.guild.roles.cache.find(role => role.name === playerLabels[tempIndex]);
                            sendAllMessage(playernames[tempIndex] + " has been killed!");
                            currentPlayers--;
                            if(secretRoles[tempIndex] === "h"){
                                sendAllMessage("Hitler has been killed, the liberals win!");
                                gameStarted = false;
                                var myme = ""
                                for(var z = 0; z < playerCount; z++){
                                    if(secretRoles[z] === "h"){
                                        myme += (playernames[z] + " was Hitler.\n");
                                    }
                                    else if(secretRoles[z] === "f"){
                                        myme += (playernames[z] + " was a fascist.\n");
                                    }
                                    else if(secretRoles[z] === "l"){
                                        myme += (playernames[z] + " was a liberal.\n");
                                    }
                                }
                                myme += "Enter !endgame on the main channel to end the game."
                                sendAllMessage(myme);
                                return;
                            }
                            membersInGame[tempIndex].roles.remove(role);
                            if(tempIndex == presidentIndex){
                                var valid = false;
                                while(!valid){
                                    presidentIndex++;
                                    if(presidentIndex == playerCount){
                                        presidentIndex = 0;
                                    }
                                    if(deadPlayers.indexOf(presidentIndex) == -1){
                                        valid = true;
                                    }
                                }
                            }
                            sendAllMessage(playernames[presidentIndex] + " is the new president");
                            sendAllMessage("The president can now nominate somebody.")
                            chan = message.guild.channels.cache.find(channel => channel.name === (playerLabels[presidentIndex] + "-channel"));
                            chan.send("Nominate a chancellor using !nominate <username>.");
                            phase = "nom";
                        }
                        else{
                            message.channel.send("That person is not eligible to kill.");
                        }
                    }
                    else{
                        message.channel.send("You cannot kill yourself.");
                    }
                }
                else{
                    message.delete();
                }
            }

            else if(command === "policies"){
                message.channel.send("There have been " + libplayed + " liberal policies passed and " + fasplayed + " fascist policies passed.");
            }

            else if(command === "players"){
                var mess = ""
                for(var i = 0; i < playerCount; i++){
                    mess += "Player " + (i + 1) +": " + playernames[i] + "\n";
                }
                message.channel.send(mess);
            }

            else if(command === "role"){
                var index = players.indexOf(message.author.username);
                if(secretRoles[index] === "h"){
                    message.channel.send("You are Hitler.");
                    if(playerCount < 7){
                        message.channel.send(playernames[fIndex[0]] + " is your fascist partner");
                    }
                }
                else if(secretRoles[index] === "f"){
                    message.channel.send("You are a fascist");
                    var index = players.indexOf(message.author.username);
                    for(var j = 0; j < fIndex.length; j++){
                        if(fIndex[j] != index){
                            message.channel.send(playernames[fIndex[j]] + " is also a fascist.")
                        }
                    }
                    message.channel.send(playernames[hindex] + " is Hitler");
                }
                else if(secretRoles[index] === "l"){
                    message.channel.send("You are a liberal.");
                }
            }
        }
    }

});

client.login(token);
