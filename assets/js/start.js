const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('#start');

function begin() {
    main.style.WebkitAnimation = 'fadeout 1s';
    main.style.animation = 'fadeout 1s';
    setTimeout(() => {
        qna.style.WebkitAnimation = 'fadein 1s';
        qna.style.animation = 'fadein 1s'
        setTimeout(() => {
            main.style.display = 'none';
            qna.style.display = 'block';
        }, 450);
    }, 450);

}

startBtn.addEventListener('click', begin);

