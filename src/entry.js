import {playerService} from './scripts/player.js'
import {backgroundService} from './scripts/background.js'
import {bombService} from './scripts/bomb.js'

const offset = window.innerHeight / 3;
const upperPos = 0;
const midPos = offset;
const lowerPos = offset * 2;
const posArray = [lowerPos, midPos, upperPos]
let currentPosValue = 1
let timeDifficulty = 1500; // in ms
let bombSpeed = 10; //in x value by frame 
let prevBombLocation;
let cloudsMovementSpeed = 0.3
let buildingsMovementSpeed  = 1
let playerSlidingAnimation = 50;
let isPlayerMoving = null;


let player;
let bombs = [];

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    antialias: false
});
//remove default chrome styling
app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

//keyboard input event listener attach to dom
document.addEventListener('keydown', onKeyDown);



const loader = new PIXI.Loader();
loader.add('dron', './sprites/bomb/dron.json')
        .add('seagull', './sprites/player/seagull.json')

loader.onComplete.add(function () {
    console.log("assets successfully loaded!")
})

loader.load(setup);
function setup(loader) {
    //set background sprites
    // const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
    // rectangle.width = 50;
    // rectangle.height = 50;
    // rectangle.tint = 0xFF0000;
    // rectangle.x = app.stage.
    // app.stage.addChild(rectangle);

    let gradient = backgroundService.getBackgroundSprite(app.screen.width, app.screen.height)
    let clouds = backgroundService.getCloudSprite(app.screen.width, app.screen.height)
    let buildings = backgroundService.getBuildingSprite(app.screen.width, app.screen.height);
    app.stage.addChild(gradient);
    app.stage.addChild(clouds);
    app.stage.addChild(buildings)
    app.ticker.maxFPS = 60;
    app.ticker.add(function (){
        
        clouds.tilePosition.x -= cloudsMovementSpeed
        buildings.tilePosition.x -= buildingsMovementSpeed

        //player lane animation slide
        if(isPlayerMoving !== null){
            
            if(isPlayerMoving === "up"){
                if(player.position.y <= posArray[currentPosValue]){
                    isPlayerMoving = null;
                    player.position.y = posArray[currentPosValue]
                }
                player.position.y -= playerSlidingAnimation;
            }
            else if(isPlayerMoving === "down"){
                if(player.position.y >= posArray[currentPosValue]){
                    isPlayerMoving = null;
                    player.position.y = posArray[currentPosValue]
                }
                player.position.y += playerSlidingAnimation;
            }
            
        }


        bombs.forEach(bomb => {
            bomb.position.x -= bombSpeed
        });

        //check if bomb has not hit player
        bombs.forEach(bomb => {
            if(bomb.x > 100 && bomb.x < 282 && posArray[currentPosValue] === bomb.y){
                //remove other bombs and leave only the one that triggered the game loss event
                bombs.forEach(removeBomb => {
                    if(removeBomb !== bomb){
                        app.stage.removeChild(removeBomb)
                    }
                });
                //stop background from moving
                cloudsMovementSpeed = 0;
                buildingsMovementSpeed = 0;
                player.stop();
                bomb.stop();
                clearInterval(bombSpawner);

                let textBackground = getButtonSprite("./sprites/misc/button.png");
                
                textBackground.on('mousedown', function () {
                    app.stage.removeChild(textBackground)
                    textBackground = getButtonSprite("./sprites/misc/pressedButton.png")
                    app.stage.addChild(textBackground)
                })
                app.stage.addChild(textBackground)
               
                console.log("Game Over!!!")
                return 
            }
        });

        //check for bombs which have gone before the x-axis and remove them to free up space
        let outOfBoundsBombs = [];
        bombs.forEach(bomb => {
            if(bomb.x < -10){
                app.stage.removeChild(bomb)
                outOfBoundsBombs.push(bomb)
            }
        });
        bombs = bombs.filter(function (bomb) {
            return !outOfBoundsBombs.includes(bomb);
        })
    })


    //set player sprite and position it to start the game
    player = playerService.setPlayerSprite(loader, player, posArray[currentPosValue])
    playerService.setPlayerSettings(player, posArray[currentPosValue]);
    app.stage.addChild(player);

    //add bomb sprite to scene
    let bombSpawner = setInterval(function() {
        let randomizeSpawnPoint = randomLaneGenerator()
        //check if prev spawn point is not the same newly generated so we dont have bombs on the same lane
        while(randomizeSpawnPoint === prevBombLocation){
            randomizeSpawnPoint = randomLaneGenerator()
        }
        let bombDrone = bombService.getBombSprite(loader)
        bombService.setBombSettings(bombDrone, posArray[randomizeSpawnPoint]);
        bombs.push(bombDrone);
        app.stage.addChild(bombDrone);
        prevBombLocation = randomizeSpawnPoint
    }, timeDifficulty);


}

function onKeyDown(key) {
    // W Key is 87
    // Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
        if(currentPosValue < 2){
            currentPosValue++;
            isPlayerMoving = "up";
        }
        // player.position.y = posArray[currentPosValue];
    }

    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        if(currentPosValue > 0){
            currentPosValue--;
            isPlayerMoving = "down";
        }
        // player.position.y = posArray[currentPosValue];
    }
}


function playerLaneMovementAnim(direction, destinationYaxisValues){
    
    
    if(direction === 'up'){
        if(player.position.y <= destinationYaxisValues){
            tickerPlayerLane.destroy();
            player.position.y = destinationYaxisValues
        }
        player.position.y -= 10;
    }
    else {
        if(player.position.y >= destinationYaxisValues){
            tickerPlayerLane.destroy()
            player.position.y = destinationYaxisValues
        }
        player.position.y += 10;
    }
    
}


function randomLaneGenerator(){
    return Math.floor(Math.random() * 3);
}

function getButtonSprite(inputTexture){
    var textBackground = PIXI.Sprite.from(inputTexture);
    textBackground.width = 700;
    textBackground.height = 250
    textBackground.x = window.innerWidth / 2 - (textBackground.width / 2)
    textBackground.y = window.innerHeight / 2 - (textBackground.height / 2)
    textBackground.interactive = true;
    textBackground.on('mouseup', function () {location.reload()})

    //attach text inside
    let text = new PIXI.Text('Restart Game', {fontFamily : 'Arial', fontSize: 36, fill : 0xcc8400, align : 'center'});
    text.scale.set(5, 5)
    text.x = textBackground.width / 2
    text.y = textBackground.height / 2
    textBackground.addChild(text)
    text.x += text.width / 3
    text.y += text.height / 2
    return textBackground;
}