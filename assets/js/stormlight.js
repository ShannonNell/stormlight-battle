/* GAME FUNCTIONS */
//window.alert("Would you like to destroy some evil today?");

// random numeric value function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// fight function
var fight = function(enemy) {
    // repeat and execute while enemy is alive
    while(radiantInfo.stormlight > 0 && enemy.health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

        // If player skips, confirm and stop loop    
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure your Order wants to leave the battle?");
            
            // if yes, leave fight
            if (confirmSkip) {
                window.alert("The " + radiantInfo.name + "'s have decided to skip the battle.");
                //subtract spheres from radiantMoney for skipping
                radiantInfo.spheres = Math.max(0, radiantInfo.spheres - 10);
                console.log("radiantInfo.spheres", radiantInfo.spheres);
                break;
            }
        }

        // generate random damage value based on player's attack value
        var damage = randomNumber(radiantInfo.attack -3, radiantInfo.attack);

        // Remove enemy health; subtract radiantInfo.attack from enemy.health and log
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            radiantInfo.name + 
            " attacked " + 
            enemy.name + 
            ". " + 
            enemy.name + 
            " now has " + 
            enemy.health + 
            " Voidlight remaining."
        );

        // Check enemy's health
        if (enemy.health <=0) {
            window.alert(enemy.name + " has been defeated.");

            // award player money for winning
            radiantInfo.spheres = radiantInfo.spheres + 20;

            //leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " Voidlight remaining.");
        }
        
        // generate random damage for player based on enemy's attack
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // Remove player health; subtract enemy.attack from radiantInfo.stormlight and log
        radiantInfo.stormlight = Math.max(0, radiantInfo.stormlight - damage);
        console.log(
            enemy.name + 
            " attacked " + 
            radiantInfo.name + 
            ". " + 
            radiantInfo.name + 
            " now have " + 
            radiantInfo.stormlight + 
            " Stomlight remaining."
        );
        
        // Check radiant's health
        if (radiantInfo.stormlight <=0) {
            window.alert(radiantInfo.name + " has run out of Stormlight.");
            // leave while() loop if radiant ran out of Stormlight
            break;
        } else {
            window.alert("The " + radiantInfo.name + "'s still have " + radiantInfo.stormlight + " Stormlight remaining.");
        }
    }
};


//function to start a new game
var startGame = function() {
    //reset radiant stats
    radiantInfo.reset();

    // fight each enemy by looping over them and fighting one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        //check player stats
        console.log(radiantInfo);
        if (radiantInfo.stormlight > 0) {

            //let player know what floor they are on
            window.alert("The battle for Uruthiru has begun! On floor " + (i+1) );

            //pick new enemy to fight based on index of enemy.names
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting a new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (radiantInfo.stormlight > 0 && i < enemyInfo.length -1) {
                // ask if player wants to visit Dalinar before next round
                var dalinarConfirm = window.confirm("The fighting has slowed. Would you like to recover?");

                //if yes, take them to the dalinar() function
                if (dalinarConfirm) {
                    dalinar();
                }
            }
        } 
        // if player is not alive, break out of loop and let endGame function run
        else {
            window.alert("Your Radiants have run out of Stormlight! Go ask Dalinar to open the perpindicularity and refill your Stormlight.");
            break;
        }
    }
    // after loop ends, player is either out of health or has no more enemies to fight, so run endGame function
    endGame();
};

// function to end game
var endGame = function() {
    // if player is still alive, they win!
    if (radiantInfo.stormlight > 0) {
        window.alert("The battle is won, you've survived! You now have a score of " + radiantInfo.spheres + ".");
    }
    else {
        window.alert("Your Radiants ran out of Stormlight and have died.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm ("Would you like to battle again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank for your saving Uruthiru! Come back soon, there's always something going on.");
    }
};


// shop function
var dalinar = function() {
    // ask player what they'd like to do
    var dalinarOptionPrompt = window.prompt(
        "You have found Dalinar and Zahel. Would you like Dalinar to REFILL your Stormlight, Zahel to UPGRADE your attack skills, or LEAVE them to deal with their own problems?"
    );

    // use switch to carry out action
    switch (dalinarOptionPrompt) {
        case "refill":
        case "REFILL":
            radiantInfo.refillStormlight();
            break;
        case "upgrade": 
        case "UPGRADE":
            radiantInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving Dalinar and Zahel to their own problems.");

            // do nothing, so function will end
            break;
        default: 
            window.alert("You've got to choose an option, mate. Journey before destination and all that.");

            // call dalinar() again to force player to pick a valid option
            dalinar()
            break;
    }
};

// function to set name
var getRadiantName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What order of the Knights Radiant do you belong to?")
    }

    console.log("Your Radiant Order is " + name);
    return name;
};

/* END GAME FUNCTIONS */


/* VARIABLES */

// Radiant information
var radiantInfo = {
    name: getRadiantName(),
    stormlight: 100,
    attack: 10,
    spheres: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, 
    refillStormlight: function() {
        if (this.spheres >= 7) {
            window.alert("Refilling Radiant's Stormlight by 20 for 7 dun spheres.");
            this.stormlight += 20;
            this.spheres -= 7;
        }
        else {
            window.alert("You don't have any dun spheres to exchange!");
        }
    },
    upgradeAttack: function() {
        if (this.spheres >=7) {
            window.alert("Upgrading Radiant's attack skills by 6 for 7 dun spheres.");
            this.attack += 6;
            this.spheres -= 7;
        }
        else {
            window.alert("You don't have any dun spheres to exchange!");
        }
    }
};

// enemy information
var enemyInfo = [
    {
        name: "Rabonial",
        attack: randomNumber(10, 14)
    },
    {
        name: "Moash",
        attack: randomNumber(10, 14)
    },
    {
        name: "The Pursuer",
        attack: randomNumber(10, 14)
    },
];

/* END VARIABLES */

/* RUN GAME */
startGame();