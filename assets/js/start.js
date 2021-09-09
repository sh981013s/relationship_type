
const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('#start');

const endPoint = 12;

function addAnswer(answerText, qIdx) {
    const a = document.querySelector('.answerBox');
    const answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadein');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener('click', function(){
        const children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].diabled = true;
            children[i].style.WebkitAnimation = 'fadeout 1s';
            children[i].style.animation = 'fadeout 1s';
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
        goNext(++qIdx);
        }, 950)
    })
}

function goNext(qIdx) {
    const q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    const status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

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
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}

startBtn.addEventListener('click', begin);

