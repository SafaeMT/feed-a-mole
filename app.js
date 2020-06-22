// ********** EXECUTIVE CODE **********
const gameAPI = createGame();
gameAPI.start();

// ********** DEFINITIONS **********
function createGame() {
    // Configuration du jeu
    let moles = [];

    const HUNGRY_TIMER = 3000;
    const LEAVING_TIMER = 500;

    return { start };

    function start() {
        moles = Array.from(document.querySelectorAll('.mole'));
        moles.forEach(mole => {
            mole.state = 'hidden';
            mole.nextStateTFrame = 1000 + Math.round(Math.random() * 10000);
        });

        // Début du cycle du jeu
        requestAnimationFrame(handleNextFrame);
    }

    // ********** PRIVATE FUNCTIONS **********
    function handleNextFrame(tFrame) {
        moles.forEach(mole => {
            if (tFrame >= mole.nextStateTFrame) {
                changeState(mole);
                render(mole);
            }
        });

        requestAnimationFrame(handleNextFrame);
    }

    function changeState(mole) {
        if (mole.state == 'hidden') {
            mole.state = 'hungry';
            mole.nextStateTFrame += HUNGRY_TIMER;
        } else if (mole.state == 'hungry') {
            mole.state = 'leaving';
            mole.nextStateTFrame += LEAVING_TIMER;
        } else {
            mole.state = 'hidden';
            mole.nextStateTFrame += 2000 + Math.round(Math.random() * 5000);
        }
    }

    function render(mole) {
        if (mole.state == 'hungry') {
            mole.src = 'images/molehungry.png'
            mole.display = 'block';
        } else if (mole.state == 'leaving') {
            mole.src = 'images/moleleaving.png'
        } else {
            mole.src = '';
            mole.display = 'none';
        }
    }
}