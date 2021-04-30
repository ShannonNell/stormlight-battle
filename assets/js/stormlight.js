
var radiantName = window.prompt ("What order of the Knights Radiant do you belong to?");
var radiantHealth = 100;
var radiantAttack = 10;
var radiantSpheres = 10;

var enemyNames = ["Rabonial", "Rayse", "Sadaes"];
var enemyHealth = 50;
var enemyAttack = 12;


/* GAME FUNCTIONS */

// fight function
var fight = function(enemyName) {
    window.alert("Would you like to destroy some evil today?");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");
    // if player choses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {

        // Remove enemy health; subtract radiantAttack from enemyHealth and log
        enemyHealth = enemyHealth - radiantAttack;
        console.log(
            radiantName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has been defeated.");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " Voidlight remaining.");
        }
        
        // Remove player health; subtract enemyAttack from radiantHealth and log
        radiantHealth = radiantHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + radiantName + ". " + radiantName + " now has " + radiantHealth + " health remaining."
        );
        
        // Check radiant's health
        if (radiantHealth <=0) {
            window.alert(radiantName + " has run out of Stormlight.");
        }
        else {
            window.alert(radiantName + " still has " + radiantHealth + " Stormlight left.");
        }
    // If player skips    
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm skip
        var confirmSkip = window.confirm("Are you sure your Order wants to leave the fight?");
        
        // if yes, leave fight
        if (confirmSkip) {
            window.alert("The " + radiantName + "'s have decided to skip the fight. Goodbye.");
            //subtract spheres from radiantMoney for skipping
            radiantSpheres = radiantSpheres - 2;
        }
        //if no, ask question again by running fight() again
        else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again.");
    }
}




/* VARIABLES */


/* RUN GAME */
for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}