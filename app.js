// ********** EXECUTIVE CODE **********
const gameAPI = createGame();
gameAPI.start();

// ********** DEFINITIONS **********
function createGame() {
    // Configuration du jeu
    let run = false;
    let lastTFrame = 0;

    const HUNGRY_TIMER = 3000;
    const LEAVING_TIMER = 500;
    const HIDDEN_TIMER = 1000;

    return { start };

    function start() {
        run = true;

        document.querySelectorAll('.hungry').forEach(hungryMole => {
            hungryMole.style.display = 'block';
        });

        document.querySelectorAll('.leaving').forEach(leavingMole => {
            leavingMole.style.display = 'none';
        });

        // Début du cycle du jeu
        requestAnimationFrame(handleNextFrame);
    }

    // ********** PRIVATE FUNCTIONS **********
    function handleNextFrame(tFrame) {
        if (run) {
            if (tFrame >= lastTFrame + HUNGRY_TIMER + LEAVING_TIMER + HIDDEN_TIMER) {
                update();
                lastTFrame = tFrame;
            }

            requestAnimationFrame(handleNextFrame);
        }
    }

    function update() {
        updateHungryMole();
        updateLeavingMole();
    }

    function updateHungryMole() {
        document.querySelectorAll('.hungry').forEach(hungryMole => {
            hungryMole.style.display = 'none';

            setTimeout(() => {
                hungryMole.style.display = 'block';
            }, LEAVING_TIMER + HIDDEN_TIMER);
        });
    }

    function updateLeavingMole() {
        document.querySelectorAll('.leaving').forEach(leavingMole => {
            leavingMole.style.display = 'block';

            setTimeout(() => {
                leavingMole.style.display = 'none';
            }, LEAVING_TIMER);
        });
    }
}