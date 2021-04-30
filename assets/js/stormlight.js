
var radiantName = window.prompt ("What order of the Knights Radiant do you belong to?");
var radiantHealth = 100;
var radiantAttack = 10;
var radiantSpheres = 10;

var enemyNames = ["Rabonial", "Rayse", "Sadaes"];
var enemyHealth = 50;
var enemyAttack = 12;


/* GAME FUNCTIONS */
//window.alert("Would you like to destroy some evil today?");

// fight function
var fight = function(enemyName) {
    // repeat and execute while enemy is alive
    while(radiantHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

        // If player skips, confirm and stop loop    
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure your Order wants to leave the battle?");
            
            // if yes, leave fight
            if (confirmSkip) {
                window.alert("The " + radiantName + "'s have decided to skip the battle.");
                //subtract spheres from radiantMoney for skipping
                radiantSpheres = radiantSpheres - 10;
                console.log("radiantSpheres", radiantSpheres);
                break;
            }
        }

        // Remove enemy health; subtract radiantAttack from enemyHealth and log
        enemyHealth = enemyHealth - radiantAttack;
        console.log(
            radiantName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has been defeated.");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " Voidlight remaining.");
        }
        
        // Remove player health; subtract enemyAttack from radiantHealth and log
        radiantHealth = radiantHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + radiantName + ". " + radiantName + " now have " + radiantHealth + " Stomlight remaining."
        );
        
        // Check radiant's health
        if (radiantHealth <=0) {
            window.alert(radiantName + " has run out of Stormlight.");
            // leave while() loop if radiant ran out of Stormlight
            break;
        } else {
            window.alert("The " + radiantName + "'s still have " + radiantHealth + " Stormlight remaining.");
        }
    }
}




/* VARIABLES */


//function to start a new game
var startGame = function() {
    //reset radiant stats
    radiantHealth = 100;
    radiantAttack = 10;
    radiantSpheres = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (radiantHealth > 0) {
            //let player know what floor they are on
            window.alert("The battle for Uruthiru has begun! On floor " + ( i + 1 ) );

            //pick new enemy to fight based on index of enemyNames
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before starting a new fight
            enemyHealth = 50;

            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (radiantHealth > 0 && i < enemyNames.length -1) {
                // ask if player wants to visit Dalinar before next round
                var dalinarConfirm = window.confirm("The fighting has slowed. Would you like to recover?");

                //if yes, take them to the dalinar() function
                dalinar();
            }
        } else {
            window.alert("Your Radiants have run out of Stormlight! Go ask Dalinar to open the perpindicularity and refill your Stormlight.");
            break;
        }
    }
    // after loop ends, player is either out of health or has no more enemies to fight, so run endGame function
    endGame();
};

var endGame = function() {
    // if player is still alive, they win!
    if (radiantHealth > 0) {
        window.alert("The battle is won, you've survived! You now have a score of " + radiantSpheres + ".");
    }
    else {
        window.alert("Your Radiants ran out of Stormlight and have died.");
    }

    var playAgainConfirm = window.confirm ("Would you like to battle again?");
    if (playAgainConfirm) {
        //restart game
        startGame();
    }
    else {
        window.alert("Thank for your saving Uruthiru! Come back soon, there's always something going on.");
    }
};

var dalinar = function() {
    // ask player what they'd like to do
    var dalinarOptionPrompt = window.prompt("You have found Dalinar and Zahel. Would you like Dalinar to REFILL your Stormlight, Zahel to UPGRADE your attack skills, or LEAVE them to deal with their own problems?"
    );

    // use switch to carry out action
    switch (dalinarOptionPrompt) {
        case "refill":
        case "REFILL":
            if (radiantSpheres >= 7) {
                window.alert("Refilling Radiant's Stormlight by 30 for 7 dun spheres.");
                
                // increase health and decrease money
                radiantHealth = radiantHealth + 20;
                radiantSpheres = radiantSpheres - 7;
            } else {
                window.alert("You don't have any dun spheres to exchange!");
            }
            break;

        case "upgrade": 
        case "UPGRADE":
            if (radiantSpheres >= 7) {
                window.alert("Upgrading Radiant's attack skills by 8 for 7 dun spheres.");

                // increast attack and decrease money
                radiantAttack = radiantAttack + 6;
                radiantSpheres = radiantSpheres -7;
            } else {
                window.alert("You don't have any dun spheres to exchange!");
            }
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

/* RUN GAME */
startGame();