import {playerService} from './scripts/player.js'
import {backgroundService} from './scripts/background.js'
import {bombService} from './scripts/bomb.js'

const offset = window.innerHeight / 3;
const upperPos = 0;
const midPos = offset;
const lowerPos = offset * 2;
const posArray = [lowerPos, midPos, upperPos]
let currentPosValue = 1
let timeDifficulty = 2


let player;

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
loader.add('./sprites/player/seagull.json').load(setup);

function setup(loader) {
    //set background sprites
    let gradient = backgroundService.getBackgroundSprite(app.screen.width, app.screen.height)
    let clouds = backgroundService.getCloudSprite(app.screen.width, app.screen.height)
    let buildings = backgroundService.getBuildingSprite(app.screen.width, app.screen.height);
    app.stage.addChild(gradient);
    app.stage.addChild(clouds);
    app.stage.addChild(buildings)
    app.ticker.add(function (){
        clouds.tilePosition.x -= 0.3
        buildings.tilePosition.x -= 1
    })


    //set player sprite and position it to start the game
    player = playerService.setPlayerSprite(loader, player, posArray[currentPosValue])
    playerService.setPlayerSettings(player, posArray[currentPosValue]);
    app.stage.addChild(player);

    //add bomb sprite to scene
    let bombTicker = PIXI.ticker.Ticker();
    bombTicker.autoStart = false;

    bombTicker.add(function (delta) {
        app.stage.addChild(bombService.getBombSprite(posArray[Math.floor(Math.random() * 3)]));
    })
    bombTicker.maxFPS = 60;
    bombTicker.speed = bombTicker.speed / 1000;
    bombTicker.start()
}


function onKeyDown(key) {
    // W Key is 87
    // Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
        if(currentPosValue < 2){
            currentPosValue++;
        }
        player.position.y = posArray[currentPosValue];
    }

    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        if(currentPosValue > 0){
            currentPosValue--;
        }
        player.position.y = posArray[currentPosValue];
    }
}