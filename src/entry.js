const offset = window.innerHeight / 3;
const upperPos = 0;
const midPos = offset;
const lowerPos = offset * 2;
const posArray = [lowerPos, midPos, upperPos]
let currentPosValue = 1

console.log(`Widow height is: ${window.innerHeight}`)

console.log(upperPos)
console.log(midPos);
console.log(lowerPos);

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


//keyboard input event listener attach to dom
document.addEventListener('keydown', onKeyDown);



const loader = new PIXI.Loader();
document.body.appendChild(app.view);

loader.add('./sprites/player/seagull.json').load(setup);

function setup(loader, resources) {
//  const playerTexture = PIXI.Texture.from('tile000.png');
//  const playerSprite = new PIXI.Sprite(playerTexture);



    let sheet = loader.resources["./sprites/player/seagull.json"];
    //pattern for images <name>_<number>.png
    const textureArr = [];
    for (let i = 0; i < 8; i++)
    {
        const texture = PIXI.Texture.from(`tile_00${i}.png`);
        textureArr.push(texture);
    }

    player = new PIXI.AnimatedSprite(textureArr);

    player.position.set(100, posArray[currentPosValue]);
    player.anchor.x = 1;
    player.scale.set(-3, 3);
    app.stage.addChild(player);
    player.play();
    player.animationSpeed = 0.15;

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