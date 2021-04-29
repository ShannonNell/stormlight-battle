
var radiantName = window.prompt ("What order of the Knights Radiant do you belong to?");
var radiantHealth = 100;
var radiantAttack = 10;
console.log(radiantName, radiantHealth, radiantAttack);

var enemyName = "Rabonial";
var enemyHealth = 50;
var enemyAttack = 12;


/* GAME FUNCTIONS */

// fight function
function fight() {
    window.alert("Would you like to destroy some evil today?");

    // subtract radiantAttack from enemyHealth and log
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
    
    // subtract enemyAttack from radiantHealth and log
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
}




/* VARIABLES */


/* RUN GAME */
fight();