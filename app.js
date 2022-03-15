const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth*(.8);
canvas.height = window.innerHeight*(.9);
ctx.font = '50px Georgia';

//Player One Controls
const playerOneUpButton = document.querySelector('.p1up');
const playerOneDownButton = document.querySelector('.p1down');
const playerOneShootButton = document.querySelector('.p1shoot');
const playerOneForwardButton = document.querySelector('.p1forward');
//Player Two Controls 
const playerTwoUpButton = document.querySelector('.p2up');
const playerTwoDownButton = document.querySelector('.p2down');
const playerTwoShootButton = document.querySelector('.p2shoot');
const playerTwoForwardButton = document.querySelector('.p2forward');

//global varibales
let frameRate = 0;

//sounds

let projectileCollisionSound = document.createElement('audio');
projectileCollisionSound.src = './pop.ogg';
projectileCollisionSound.load();

// change this when game finishes
let gameOver = false;


let canvasPosition = canvas.getBoundingClientRect();
// player one 
const playerOneState = {
    name: 'YuYu',
    x: 15,
    y: 15,
    projectileX: 0,
    projectileY: 0,
    click: false,
    playerAngle: 0,
    fired: false
}

playerOneForwardButton.addEventListener('mousedown', () => {
    playerOneState.click = true;
    let degree = playerOneState.playerAngle
    console.log(degree)
    if(degree === 0) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y;
    }
    if(degree === 15) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y + 10;
    }
    if(degree === 30) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y + 20;
    }
    if(degree === 45) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 60) {
        playerOneState.x = playerOneState.x + 20;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 75) {
        playerOneState.x = playerOneState.x + 10;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 90) {
        playerOneState.x = playerOneState.x;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 105) {
        playerOneState.x = playerOneState.x - 10;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 120) {
        playerOneState.x = playerOneState.x - 20;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 135) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y + 30;
    }
    if(degree === 150) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y + 20;
    }
    if(degree === 165) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y + 10;
    }
    if(degree === 180 || degree === -180) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y;
    }
    if(degree === -165) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y - 10;
    }
    if(degree === -150) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y - 20;
    }
    if(degree === -135) {
        playerOneState.x = playerOneState.x - 30;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -120) {
        playerOneState.x = playerOneState.x - 20;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -105) {
        playerOneState.x = playerOneState.x - 10;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -90) {
        playerOneState.x = playerOneState.x;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -75) {
        playerOneState.x = playerOneState.x + 10;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -60) {
        playerOneState.x = playerOneState.x + 20;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -45) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y - 30;
    }
    if(degree === -30) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y - 20;
    }
    if(degree === -15) {
        playerOneState.x = playerOneState.x + 30;
        playerOneState.y = playerOneState.y - 10;
    }
    
    
    
    if(playerOneState.x <= 0) {
        playerOneState.x = 0
    }
    if(playerOneState.x >= canvas.width) {
        playerOneState.x = canvas.width
    }
    if(playerOneState.y <= 0) {
        playerOneState.y = 0
    }
    if(playerOneState.y >= canvas.height) {
        playerOneState.y = canvas.height
    }
    
        
    
})

playerOneForwardButton.addEventListener('mouseup', () => {
    playerOneState.click = false;
})

playerOneDownButton.addEventListener('click', () =>{
    if(playerOneState.playerAngle >= 180 ) {
        playerOneState.playerAngle = -165
    } else {
        playerOneState.playerAngle = playerOneState.playerAngle + 15
    }
})

playerOneUpButton.addEventListener('click', () =>{
    if(playerOneState.playerAngle <= -180 ) {
        playerOneState.playerAngle = 165
    } else {
        playerOneState.playerAngle = playerOneState.playerAngle - 15
    }
})



const playerOneFalc = new Image();
playerOneFalc.src = './Images/Falconet.png';
const playerOneFalcRight = new Image();
playerOneFalcRight.src = './Images/FalconetRight.png';

class PlayerOne {
    constructor() {
        this.x = 15;
        this.y = 15;
        this.radius = 30;
        this.angle = 0 * Math.PI/180;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 150;
    }
    update() {
        
        const dx = this.x - playerOneState.x;
        const dy = this.y - playerOneState.y;
        //use to show direction if mouse
        // let theta = Math.atan2(dy, dx);
        // this.angle = theta;
        if(playerOneState.playerAngle != this.angle) {
            this.angle = playerOneState.playerAngle * Math.PI/180;
        }
        
        if(playerOneState.x != this.x) {
             this.x -= dx/30;
         }
        if(playerOneState.y != this.y) {
            this.y -= dy/30;
        }

        
    }
    draw() {
        if(playerOneState.click) {
            ctx.linewidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(playerOneState.x, playerOneState.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'black'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        let xToMiddle = 0 + this.spriteWidth/4
        let yToMiddle = 0 + this.spriteHeight/4
      
        if(this.x >= playerOneState.x) {
          ctx.drawImage(playerOneFalc, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
             (0) - (xToMiddle), (0) - (yToMiddle), 
             this.spriteWidth/2, this.spriteHeight/2)
        } else {
            ctx.drawImage(playerOneFalc, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 
                (0) - (xToMiddle), (0) - (yToMiddle),
                 this.spriteWidth/2, this.spriteHeight/2)
            }
        ctx.restore();
    }
}
const player = new PlayerOne();
class PlayerOneProjectile {
    constructor (startX, startY) {
        this.x = startX;
        this.y = startY;
        this.radius = 10;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
    }
    update() {
        const dx = this.x - playerOneState.projectileX;
        const dy = this.y - playerOneState.projectileY;
        if( this.y !=  playerOneState.projectileX) {
            this.y -= dy/60;
        }
        if(this.x !=  playerOneState.projectileY) {
            this.x -= dx/60;
        } 
        const checkX = this.x - playerTwoState.x;
        const checkY = this.y - playerTwoState.y;
        const distance = Math.sqrt( checkX*checkX + checkY*checkY);
        if(distance < this.radius + player2.radius) {
            
            handleGameOver(playerOneState.name);
        }
    }
    draw() {
        if(playerOneState.click) {
            ctx.linewidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo( playerOneState.projectileX,  playerOneState.projectileY);
            ctx.stroke();
        }
        ctx.fillStyle = 'blue'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
let playerProjectile = null ;
let frameRateShotFiredPlayer = 0;

const playerOneShot = () => {
    if(!playerOneState.fired) {
        let degree = playerOneState.playerAngle 
        switch (degree) {
            case 0:
                playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y;
                break;
                case 15:
                playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y  + ((3*canvas.width)/4)*(25 * Math.PI/180);
                break;
                case 30:
                playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(50 * Math.PI/180);
                break;
                case 45:
                playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 60:
                playerOneState.projectileX = playerOneState.x +  ((3*canvas.width)/4)*(50 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 75:
                playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(25 * Math.PI/180);
                playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 90:
                playerOneState.projectileX = playerOneState.x;
                playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 105:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 120:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 135:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 150:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case 165:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
                case 180:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y;
                    break;
                case -180:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y;
                    break;
                case -165:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
                case -150:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case -135:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -120:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -105:
                    playerOneState.projectileX = playerOneState.x - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -90:
                    playerOneState.projectileX = playerOneState.x;
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -75:
                    playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -60:
                    playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -45:
                    playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -30:
                    playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case -15:
                    playerOneState.projectileX = playerOneState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerOneState.projectileY = playerOneState.y - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
            default:
                break;
        }


        playerProjectile = new PlayerOneProjectile(playerOneState.x, playerOneState.y);
        playerOneState.fired = true;
        frameRateShotFiredPlayer = frameRate;
    }

}

playerOneShootButton.addEventListener('click', () =>{
    playerOneShot();
})
window.addEventListener('keypress', (e) =>{
    e.key === 'Enter' && playerOneShot();
})

//PLAYER TWO
const playerTwoState = {
    name: 'Richard',
    x: canvas.width,
    y: canvas.height,
    projectileX: 0,
    projectileY: 0,
    click: false,
    playerAngle: 0,
    fired: false
}
playerTwoForwardButton.addEventListener('mousedown', () => {
    playerTwoState.click = true;
    let degree = playerTwoState.playerAngle
    console.log(degree)
    if(degree === 0) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y;
    }
    if(degree === 15) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y - 10;
    }
    if(degree === 30) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y - 20;
    }
    if(degree === 45) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 60) {
        playerTwoState.x = playerTwoState.x - 20;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 75) {
        playerTwoState.x = playerTwoState.x - 10;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 90) {
        playerTwoState.x = playerTwoState.x;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 105) {
        playerTwoState.x = playerTwoState.x + 10;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 120) {
        playerTwoState.x = playerTwoState.x + 20;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 135) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y - 30;
    }
    if(degree === 150) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y - 20;
    }
    if(degree === 165) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y - 10;
    }
    if(degree === 180 || degree === -180) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y;
    }
    if(degree === -165) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y + 10;
    }
    if(degree === -150) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y + 20;
    }
    if(degree === -135) {
        playerTwoState.x = playerTwoState.x + 30;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -120) {
        playerTwoState.x = playerTwoState.x + 20;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -105) {
        playerTwoState.x = playerTwoState.x + 10;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -90) {
        playerTwoState.x = playerTwoState.x;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -75) {
        playerTwoState.x = playerTwoState.x - 10;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -60) {
        playerTwoState.x = playerTwoState.x - 20;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -45) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y + 30;
    }
    if(degree === -30) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y + 20;
    }
    if(degree === -15) {
        playerTwoState.x = playerTwoState.x - 30;
        playerTwoState.y = playerTwoState.y + 10;
    }
    
    
    
    if(playerTwoState.x <= 0) {
        playerTwoState.x = 0
    }
    if(playerTwoState.x >= canvas.width) {
        playerTwoState.x = canvas.width
    }
    if(playerTwoState.y <= 0) {
        playerTwoState.y = 0
    }
    if(playerTwoState.y >= canvas.height) {
        playerTwoState.y = canvas.height
    }
    
        
    
})

playerTwoForwardButton.addEventListener('mouseup', () => {
    playerTwoState.click = false;
})

playerTwoDownButton.addEventListener('click', () =>{
    if(playerTwoState.playerAngle >= 180 ) {
        playerTwoState.playerAngle = -165
    } else {
        playerTwoState.playerAngle = playerTwoState.playerAngle + 15
    }
    
    console.log(playerTwoState.playerAngle)
})

playerTwoUpButton.addEventListener('click', () =>{
    if(playerTwoState.playerAngle <= -180 ) {
        playerTwoState.playerAngle = 165
    } else {
        playerTwoState.playerAngle = playerTwoState.playerAngle - 15
    }
})

const playerTwoFalc = new Image();
playerTwoFalc.src = './Images/FalconetPlayerTwo.png';

class PlayerTwo {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height;
        this.radius = 30;
        this.angle = 0 * Math.PI/180;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 150;
    }
    update() {
        
        const dx = this.x - playerTwoState.x;
        const dy = this.y - playerTwoState.y;
        if(playerTwoState.playerAngle != this.angle) {
            this.angle = playerTwoState.playerAngle * Math.PI/180;
        }
        
        if(playerTwoState.x != this.x) {
             this.x -= dx/30;
         }
        if(playerTwoState.y != this.y) {
            this.y -= dy/30;
        }

        
    }
    draw() {
        if(playerTwoState.click) {
            ctx.linewidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(playerTwoState.x, playerTwoState.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'black'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        let xToMiddle = 0 + this.spriteWidth/4
        let yToMiddle = 0 + this.spriteHeight/4
        
      
        if(this.x >= playerTwoState.x) {
          ctx.drawImage(playerTwoFalc, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
             (0) - (xToMiddle), (0) - (yToMiddle), 
             this.spriteWidth/2, this.spriteHeight/2)
        } else {
            ctx.drawImage(playerTwoFalc, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 
                (0) - (xToMiddle), (0) - (yToMiddle), 
                 this.spriteWidth/2, this.spriteHeight/2)
            }
        ctx.restore();
    }
}
const player2 = new PlayerTwo()

class PlayerTwoProjectile {
    constructor (startX, startY) {
        this.x = startX;
        this.y = startY;
        this.radius = 10;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
    }
    update() {
        const dx = this.x - playerTwoState.projectileX;
        const dy = this.y - playerTwoState.projectileY;
        if( this.y !=  playerTwoState.projectileX) {
            this.y -= dy/60;
        }
        if(this.x !=  playerTwoState.projectileY) {
            this.x -= dx/60;
        } 
        //projectile collision
        if(playerOneState.fired && playerTwoState.fired) {
            const checkOnX = this.x - playerProjectile.x;
            const checkOnY = this.y - playerProjectile.y;
            const distance = Math.sqrt( checkOnX*checkOnX + checkOnY*checkOnY);
            if(distance < this.radius + playerProjectile.radius) {
                projectileCollisionSound.load();
                projectileCollisionSound.play();
                playerOneState.fired = false;
                playerTwoState.fired = false;
            }
        }
        //player collision
        const checkX = this.x - playerOneState.x;
        const checkY = this.y - playerOneState.y;
        const distance = Math.sqrt( checkX*checkX + checkY*checkY);
        if(distance < this.radius + player.radius) {
            handleGameOver(playerTwoState.name);
        }
        
        
    }
    draw() {
        if(playerTwoState.click) {
            ctx.linewidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo( playerTwoState.projectileX,  playerTwoState.projectileY);
            ctx.stroke();
        }
        ctx.fillStyle = 'red'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

let player2Projectile = null ;
let frameRateShotFired = 0;
playerTwoShootButton.addEventListener('click', () =>{
    if(!playerTwoState.fired) {
        // if(playerTwoState.playerAngle > 0) {
        //     playerTwoState.projectileX = -100
        //     playerTwoState.projectileY = -100
        // }
        // if(playerTwoState.playerAngle > 90) {
        //     playerTwoState.projectileX = 100
        //     playerTwoState.projectileY = -100
        // }
        // if(playerTwoState.playerAngle < 0) {
        //     playerTwoState.projectileX = -100
        //     playerTwoState.projectileY = 100
        // }
        // if(playerTwoState.playerAngle < 90) {
        //     playerTwoState.projectileX = 100
        //     playerTwoState.projectileY = 100
        // }
        let degree = playerTwoState.playerAngle 
        switch (degree) {
            case 0:
                playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y;
                break;
                case 15:
                playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y  - ((3*canvas.width)/4)*(25 * Math.PI/180);
                break;
                case 30:
                playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(50 * Math.PI/180);
                break;
                case 45:
                playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 60:
                playerTwoState.projectileX = playerTwoState.x -  ((3*canvas.width)/4)*(50 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 75:
                playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(25 * Math.PI/180);
                playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 90:
                playerTwoState.projectileX = playerTwoState.x;
                playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                break;
                case 105:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 120:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 135:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case 150:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case 165:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
                case 180:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y;
                    break;
                case -180:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y;
                    break;
                case -165:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
                case -150:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case -135:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -120:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -105:
                    playerTwoState.projectileX = playerTwoState.x + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -90:
                    playerTwoState.projectileX = playerTwoState.x;
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -75:
                    playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(25 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -60:
                    playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(50 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -45:
                    playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(100 * Math.PI/180);
                    break;
                case -30:
                    playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(50 * Math.PI/180);
                    break;
                case -15:
                    playerTwoState.projectileX = playerTwoState.x - ((3*canvas.width)/4)*(100 * Math.PI/180);
                    playerTwoState.projectileY = playerTwoState.y + ((3*canvas.width)/4)*(25 * Math.PI/180);
                    break;
            default:
                break;
        }

        //  playerTwoState.projectileX = playerTwoState.x + 0;
        //  playerTwoState.projectileY = playerTwoState.y + 0;
             
        player2Projectile = new PlayerTwoProjectile(playerTwoState.x, playerTwoState.y);
        playerTwoState.fired = true;
        frameRateShotFired = frameRate;
    }
})


// endGame
const handleGameOver = (winningPlayer) => {
    ctx.fillStyle = 'white';
    ctx.fillText(winningPlayer + ' WON!' , canvas.width/8, canvas.height/2);
    gameOver = true;
}


//animates the canvas through a loop
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    player2.update();
    player2.draw();

    if(playerTwoState.fired) {
        player2Projectile.update();
        player2Projectile.draw();
        if(frameRate - frameRateShotFired >= 50){
            playerTwoState.fired = false;
            player2Projectile = null;
        }
    }
    if(playerOneState.fired) {
        playerProjectile.update();
        playerProjectile.draw();
        if(frameRate - frameRateShotFiredPlayer >= 50){
            playerOneState.fired = false;
            playerProjectile = null;
        }
    }
    

    ctx.fillStyle = 'black';
    if(!gameOver) {
        requestAnimationFrame(animate);
    }
    frameRate++;
}

animate();



window.addEventListener('resize', ( ) => {
    canvasPosition = canvas.getBoundingClientRect();
})
