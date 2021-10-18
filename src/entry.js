// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    antialias: true
});
//remove default chrome styling
app.renderer.view.style.position = 'absolute';



const loader = new PIXI.Loader();
document.body.appendChild(app.view);

loader.add('tileset', './sprites/player/seagull.json').load(setup);

function setup(loader, resources) {
 const playerTexture = PIXI.Texture.from('tile000.png');
 const playerSprite = new PIXI.Sprite(playerTexture);

 playerSprite.position.set(100, 100);
 playerSprite.scale.set(2, 2);
 app.stage.addChild(playerSprite);
}