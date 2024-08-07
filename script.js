let xp = 0;
let health = 100;
let gold = 50;
let magic = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const text= document.getElementById('text');
const xpText= document.getElementById('xpText');
const healthText= document.getElementById('healthText');
const goldText= document.getElementById('goldText');
const magicText= document.getElementById('magicText');
const monsterStats= document.getElementById('monsterStats');
const monsterName= document.getElementById('monsterName');
const monsterHealthText= document.getElementById('monsterHealth');
const imageSquare = document.getElementById('square');
const imageShop = document.getElementById('shop');
const imageCave = document.getElementById('cave');
const battleCave = document.getElementById('battlefield');
const imageSlime = document.getElementById('slime');
const imageBeast = document.getElementById('beast');
const imageSkeleton = document.getElementById('skeleton');
const imageDragon = document.getElementById('dragon');
const youDied = document.getElementById('die');
const youWin = document.getElementById('dragonsdeath');
const caveMonsters = document.querySelector('.game__monsters');
const weapons = [
    {name: 'Stick', power: 5},
    {name: 'Dagger', power: 30},
    {name: 'Claw hammer', power: 50},
    {name: 'Iron sword', power: 100},
    {name: 'War hammer', power: 150},
    {name: 'Akaviri katana', power: 200}
];
const monsters= [
    {
    name:'Slime',
    level: 2,
    health: 15
    },
    {
    name:'Horned beast',
    level: 8,
    health: 60
    },
    {
    name: 'Skeleton',
    level: 12,
    health: 100
    },
    {
    name:'Dragon',
    level: 20,
    health: 300
    }
];
const locations = [
    {
        name: 'town square',
        'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
        'button functions': [goStore, goCave, fightDragon],
        text: 'You are in town square. You see a sign that says \"Store\".'
    },
    {
        name: 'store',
        'button text': ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.'
    },
    {
        name: 'cave',
        'button text': ['Fight slime', 'Fight horned beast', 'Fight skeleton', 'Go to town square'],
        'button functions': [fightSlime, fightBeast, fightSkeleton, goTown],
        text: 'You enter the cave. You see some monsters.'
    },
    {
        name: 'fight',
        'button text': ['Attack', 'Dodge', 'Run', 'Heal'],
        'button functions': [attack, dodge, goTown, heal],
        text: 'You are fighting a monster.'
    },
    {
        name: 'kill monster',
        'button text': ['Go to town square', 'Go to town square', 'Go to town square'],
        'button functions': [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: 'lose',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You die.'
    },
    {
        name: 'win',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You defeat the dragon! YOU WIN THE GAME!'
    },
    {
        name: 'easter egg',
        'button text': ['2', '8', 'Go to town square'],
        'button functions': [pickTwo, pickEight, goTown],
        text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!'
    }
];

gotownimages();

function gotownimages(){
caveMonsters.style.display= "none";
imageShop.style.display = "none";
imageCave.style.display = "none";
battleCave.style.display = "none";
imageDragon.style.display = "none";
youDied.style.display = "none";
youWin.style.display = "none";
};


function btnRestart(){
    button1.classList.add('buttonrestart');
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
};

function btnRevert(){
    button1.classList.remove('buttonrestart');
    button2.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "none";
};

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    button4.innerText = location['button text'][3];
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    button4.onclick = location['button functions'][3];
    text.innerText = location.text;
};
function monstersAB(){
    imageSlime.classList.replace('monster1battlein', 'monster1');
    imageBeast.classList.replace('monster2battlein', 'monster2');
    imageSkeleton.classList.replace('monster3battlein', 'monster3');
};

const lugares = [imageSquare, imageShop, imageCave, imageDragon, youDied, youWin];

function transition(image){
    for(let i = 0; i <= lugares.length; i++){
        lugares[i].classList.add('hidden');
        if(lugares[i].contains(image)){
            image.classList.replace('hidden', 'visible');
            image.style.display = 'block';
        };
    };
}

function goTown(){
    gotownimages();
    btnRevert();
    monstersAB();
    update(locations[0]);
    const currentImage = imageSquare;
    transition(currentImage);
};

function goStore(){
    update(locations[1]);
    text.classList.replace('game__text', 'game__textin');
    imageShop.currentTime = 0;
    imageShop.play();
    const currentImage = imageShop;
    imageSquare.classList.replace('visible', 'hidden');
    transition(currentImage);
};

function goCave(){
    button4.style.display ='inline-block';
    text.classList.replace('game__text', 'game__textin');
    update(locations[2]);
    caveMonsters.style.display ="block";
    imageSlime.style.display = "block";
    imageSkeleton.style.display = "block";
    imageBeast.style.display = "block";
    const currentImage = imageCave;
    imageSquare.classList.replace('visible', 'hidden');
    transition(currentImage);
};

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else{
        text.innerText = "You do not have enough gold to buy healgh.";
    };
};

function buyWeapon(){
    if(currentWeapon !== 4){
        if(currentWeapon == 5){
            text.innerText = "You already have the most powerful weapon!";
            button2.innerText = "Sell weapon for 15 gold";
            button2.onclick = sellWeapon;
            return;
        }
        if(gold > 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = ` ${weapons[currentWeapon].name}`;
            inventory.push(newWeapon);
            text.innerText = `You now have a ${newWeapon}.`;
            text.innerText += ` In your inventory you have: ${inventory}.`;
        }else{
            text.innerText = 'You do not have enough gold to buy a weapon.';
        };
    }else if(currentWeapon == 4){
        text.innerText = 'You already have the most common powerful weapon!';
        text.innerText += ' Now you can buy Akaviri katana';
        button4.innerText = 'Buy Akaviri';
        button4.addEventListener('click', buyAkaviri);
        button4.style.display ='inline-block';
        button2.innerText = 'sell weapon for 15 gold';
        button2.onclick = sellWeapon;
    };
};
function buyAkaviri(){
    if(currentWeapon == 5){
        text.innerText = "You already have the most powerful weapon!";
    }else if(currentWeapon == 4)
        if(gold >= 500){
            gold-= 500;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = ` ${weapons[currentWeapon].name}`;
            inventory.push(newWeapon);
            text.innerText = `You now have a ${newWeapon}.`;
            text.innerText += ` In your inventory you have ${inventory}.`;
            }else{
                text.innerText = 'You do not have enough money.';
            };
        };

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}.`;
        text.innerText += ` In your inventory you have ${inventory}`;
    }else{
        text.innerText = "Don't sell your only weapon";
    };
};

function fightSlime(){
    fighting = 0;
    imageSlime.classList.replace('monster1', 'monster1battlein');
    battleCave.style.display = "block";
    imageSkeleton.style.display = "none";
    imageBeast.style.display = "none";
    goFight();
};

function fightBeast(){
    fighting = 1;
    imageBeast.classList.replace('monster2', 'monster2battlein');
    battleCave.style.display = "block";
    imageBeast.style.display = "block";
    imageSlime.style.display = "none";
    imageSkeleton.style.display = "none";
    goFight();
};

function fightSkeleton(){
    fighting = 2;
    imageSkeleton.classList.replace('monster3', 'monster3battlein');
    battleCave.style.display = "block";
    imageSkeleton.style.display = "block";
    imageSlime.style.display = "none";
    imageBeast.style.display = "none";
    goFight();
};

function fightDragon(){
    fighting = 3;
    goFight();
    text.classList.replace('game__text', 'game__textin');
    imageDragon.currentTime = 0;
    imageDragon.play();
    const currentImage = imageDragon;
    imageSquare.classList.replace('visible', 'hidden');
    transition(currentImage);
};

function goFight(){
    update(locations[3]);
    monsterStats.style.display = 'block';
    monsterHealth = monsters[fighting].health + xp;
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    
};

function heal(){
    if(magic >= 10){
        magic -=10;
        magicText.innerText = magic;
        health += Math.floor(Math.random()*xp)+1;
        healthText.innerText = health;
        text.innerText = `The ${monsters[fighting].name} attacks.`;
        text.innerText += `You are healing with your spell.`;
        health -= getMonsterAttackValue(monsters[fighting].level);
        if(health <= 0 ){
            healthText.innerText = 0;
            lose();
        };
        
    }else{
        text.innerText = 'You do not have enough magic to cast the spell.';
    };
};

function attack(){
    text.innerText = `The ${monsters[fighting].name} attacks.`;
    text.innerText += `You attack it with your ${weapons[currentWeapon].name}.`;
    health -= getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() *xp) + 1;
    }else{
        text.innerText += 'You miss.';
    };
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0 ){
        lose();
    }else if(monsterHealth <= 0){
        if(fighting === 3){
            winGame();
        }else{
            defeatMonster();
        };
    };
    if(Math.random() <= .1 && inventory.length !==1){
        text.innerText += `Your ${inventory.pop()} breaks.`;
        currentWeapon--;
    };
};

function getMonsterAttackValue(level){
    const hit = (level * 5) - Math.floor(Math.random() * xp);
    return hit > 0? hit : 0;
};

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
};

function dodge(){
    text.innerText = `You dodge the attack from the ${monsters[fighting].name}`;
};

function defeatMonster(){
    magic += Math.floor(monsters[fighting].level * 6.7);
    btnRestart();
    magicText.innerText = magic;
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
};

function lose(){
    healthText.innerText = 0;
    magicText.innerText = 0;
    btnRestart();
    update(locations[5]);
    const currentImage = youDied;
    youDied.currentTime = 0;
    youDied.play();
    transition(currentImage);
};

function winGame(){
    btnRestart();
    update(locations[6]);
    const currentImage = youWin;
    youWin.currentTime = 0;
    youWin.play();
    transition(currentImage);
};

function restart(){
    btnRevert();
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['Stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
};

function easterEgg(){
    update(locations[7]);
    btnRestart();
};

function pickTwo(){
    pick(2);
};

function pickEight(){
    pick(8);
};

function pick(guess){
    const numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    };
    text.innerText = `You picked ${guess}. Here are the ramdom numbers:\n`;
    for(let i = 0; i < 10; i++){
        text.innerText += numbers[i] + "\n";
    };
    if(numbers.includes(guess)){
        text.innerText += 'Right! You win 20 gold!';
        gold +=20;
        goldText.innerText = gold;
    }else{
        text.innerText += 'Wrong! You lose 10 health!';
        health -= 10;
        healthText.innerText = health;
        if(health <=0){
            lose();
        };
    };
};
const setHeight = () => {
    const currentHeight = window.innerHeight;
    document.body.style.height = `${currentHeight}px`;
};
window.addEventListener('resize', setHeight);
setHeight();