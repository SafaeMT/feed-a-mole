const gameAPI = createGame();

window.addEventListener('load', () => {
    gameAPI.start();
});

// ********** DEFINITIONS **********
function createGame() {
    // Configuration du jeu
    let isRunning = false;

    let moles = [];
    let score = 0;
    let scoreEl;

    const MAX_SCORE = 10;

    const HUNGRY_TIMER = 3000;
    const FED_TIMER = 1000;
    const SAD_TIMER = 1000;
    const LEAVING_TIMER = 500;

    return {
        start,
        reset
    };

    function start() {
        isRunning = true;
        scoreEl = document.querySelector('.score');

        moles = Array.from(document.querySelectorAll('.mole'));
        moles.forEach(mole => {
            mole.state = 'hidden';
            mole.nextStateTFrame = 1000 + Math.round(Math.random() * 10000);
            mole.isKing = false;
        });

        document.querySelector('.molehills').addEventListener('click', function (e) {
            if (e.target.classList.contains('mole')) {
                if (e.target.state == 'hungry') {
                    e.target.state = 'fed';
                    e.target.nextStateTFrame += FED_TIMER;
                    score++;

                    renderMole(e.target);
                    renderScore();

                    if (score == MAX_SCORE) {
                        endGame();
                    }
                }
            }
        });

        document.querySelector('.reset').addEventListener('click', () => {
            reset();
        });

        document.querySelector('.loader-screen').classList.add('hidden');
        document.querySelector('.main-screen').classList.remove('hidden');

        // Début du cycle du jeu
        requestAnimationFrame(handleNextFrame);
    }

    // ********** PRIVATE FUNCTIONS **********
    function handleNextFrame(tFrame) {
        if (isRunning) {
            moles.forEach(mole => {
                if (tFrame >= mole.nextStateTFrame) {
                    changeStatus(mole);
                    changeState(mole);
                    renderMole(mole);
                }
            });

            requestAnimationFrame(handleNextFrame);
        }
    }

    function changeStatus(mole) {
        if (mole.state == 'hidden') {
            mole.isKing = Math.random() < .1 ? true : false;
        }
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

    function renderMole(mole) {
        switch (mole.state) {
            case 'hidden':
                mole.src = '';
                mole.display = 'none';
                break;

            case 'hungry':
                mole.src = mole.isKing ? 'images/kingmolehungry.png' : 'images/molehungry.png';
                mole.display = 'block';
                break;

            case 'fed':
                mole.src = mole.isKing ? 'images/kingmolefed.png' : 'images/molefed.png';
                break;

            case 'sad':
                mole.src = mole.isKing ? 'images/kingmolesad.png' : 'images/molesad.png';
                break;

            case 'leaving':
                mole.src = mole.isKing ? 'images/kingmoleleaving.png' : 'images/moleleaving.png';
                break;
        }
    }

    function renderScore() {
        scoreEl.style.width = `${Math.min(100, 10 + (90 / (MAX_SCORE - 1)) * score)}%`;
    }

    function endGame() {
        isRunning = false;

        document.querySelector('.main-screen').classList.add('hidden');
        document.querySelector('.end-screen').classList.remove('hidden');
    }

    function reset() {
        score = 0;
        moles.forEach(mole => {
            mole.state = 'hidden';
            mole.nextStateTFrame = performance.now() + 1000 + Math.round(Math.random() * 10000);
        });

        requestAnimationFrame(() => {
            renderScore();
            moles.forEach(renderMole);

            document.querySelector('.end-screen').classList.add('hidden');
            document.querySelector('.main-screen').classList.remove('hidden');
        });

        isRunning = true;
        requestAnimationFrame(handleNextFrame);
    }
}