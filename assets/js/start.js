
const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('#start');
const result = document.querySelector('#result');

const endPoint = 12;
const select = [];

function restart() {
    location.reload();
}

const restartBtn = document.querySelector('.restart')

restartBtn.addEventListener('click', restart);

function calResult() {
    const pointArray = [
        { name: 'mouse', value: 0, key: 0},
        { name: 'cow', value: 0, key: 1},
        { name: 'tiger', value: 0, key: 2},
        { name: 'rabbit', value: 0, key: 3},
        { name: 'dragon', value: 0, key: 4},
        { name: 'snake', value: 0, key: 5},
        { name: 'horse', value: 0, key: 6},
        { name: 'sheep', value: 0, key: 7},
        { name: 'monkey', value: 0, key: 8},
        { name: 'chick', value: 0, key: 9},
        { name: 'dog', value: 0, key: 10},
        { name: 'pig', value: 0, key: 11},
    ]

    for(let i = 0; i < endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for(let j = 0; j < target.type.length; j++) {
            for(let k = 0; k < pointArray.length; k++) {
                if(target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }

    const resultArray  = pointArray.sort(function(a,b) {
        if(a.value > b.value) {
            return -1;
        }
        if(a.value < b.value) {
            return 1;
        }
        return 0;
    });

    let resultWord = resultArray[0].key;
    return resultWord;
}

function setResult() {
    let point = calResult();
    let resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    const resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');

    const imgUrl = 'assets/img/image-' + point + '.png';
    resultImg.src = imgUrl;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');

    imgDiv.appendChild(resultImg);

    let resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = 'fadeout 1s';
    qna.style.animation = 'fadeout 1s';
    setTimeout(() => {
        result.style.WebkitAnimation = 'fadein 1s';
        result.style.animation = 'fadein 1s'
        setTimeout(() => {
            qna.style.display = 'none';
            result .style.display = 'block';
        }, 450)})
    
    setResult();
    calResult();
}

function addAnswer(answerText, qIdx, idx) {
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
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
        goNext(++qIdx);
        }, 950)
    })
}

function goNext(qIdx) {
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    const q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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

