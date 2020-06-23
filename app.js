// ********** EXECUTIVE CODE **********
const gameAPI = createGame();
gameAPI.start();

// ********** DEFINITIONS **********
function createGame() {
    // Configuration du jeu
    let moles = [];

    const HUNGRY_TIMER = 3000;
    const FED_TIMER = 1000;
    const SAD_TIMER = 1000;
    const LEAVING_TIMER = 500;

    return { start };

    function start() {
        moles = Array.from(document.querySelectorAll('.mole'));
        moles.forEach(mole => {
            mole.state = 'hidden';
            mole.nextStateTFrame = 1000 + Math.round(Math.random() * 10000);
        });

        document.querySelector('.molehills').addEventListener('click', function (e) {
            if (e.target.classList.contains('mole')) {
                if (e.target.state == 'hungry') {
                    e.target.state = 'fed';
                    e.target.nextStateTFrame += FED_TIMER;
                    render(e.target);
                }
            }
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
        switch (mole.state) {
            case 'hidden':
                mole.state = 'hungry';
                mole.nextStateTFrame += HUNGRY_TIMER;
                break;

            case 'hungry':
                mole.state = 'sad';
                mole.nextStateTFrame += SAD_TIMER;
                break;

            case 'fed':
            case 'sad':
                mole.state = 'leaving';
                mole.nextStateTFrame += LEAVING_TIMER;
                break;

            case 'leaving':
                mole.state = 'hidden';
                mole.nextStateTFrame += 2000 + Math.round(Math.random() * 5000);
                break;
        }
    }

    function render(mole) {
        switch (mole.state) {
            case 'hidden':
                mole.src = '';
                mole.display = 'none';
                break;

            case 'hungry':
                mole.src = 'images/molehungry.png';
                mole.display = 'block';
                break;

            case 'fed':
                mole.src = 'images/molefed.png';
                break;

            case 'sad':
                mole.src = 'images/molesad.png';
                break;

            case 'leaving':
                mole.src = 'images/moleleaving.png';
                break;
        }
    }
}