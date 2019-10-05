window.IntersectionObserver || document.write('<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>')

const showAllButton = document.querySelector('.show_all');
const judgeHide = document.querySelectorAll('.judje_hide');
const sliderBtn = document.querySelectorAll('.slider__btn');
const sliderContaiber = document.querySelector('.slider__conteiner');
const sliderViewPort = document.querySelector('.slider__view_port');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderDots = document.querySelectorAll('.slider__dots');

const judgeDetailsBtn = document.querySelectorAll('.judge_details');
const judgeModal = document.querySelector('.judge_full-modal');
const judgeModalContent = document.querySelector('.judge_full-modal_content');
const judgeModalClose = document.querySelector('.judge_full-modal_close');
const judgeCursor = document.querySelector('.judge_full-modal_cursor');
const burgerMenu = document.querySelector('.burger_menu');
const burgerBtn = document.querySelector('.burger_btn');
const closeBurgerMenu = document.querySelector('.close_burger_menu');
const alternativeCloseBurgerMenu = document.querySelector('.alternative_close_burger_menu');

const compose = (...fnc) => x => fnc.reduceRight((a, b) => b(a), x);

const ShowFunction = () => {
    judgeHide.forEach((item) => {
       item.classList.remove('judje_hide')
    });
    showAllButton.style.display = 'none';
};

let step = 0;

const transformSlider = stepIndex => {
    const { width } = sliderViewPort.getBoundingClientRect(); 
    sliderContaiber.style.transform = `translateX(-${width * stepIndex}px)`;
    sliderDots.forEach((item, index) => item.classList[index === stepIndex ? 'add' : 'remove']('slider__dots-active'));
};

const stepSlid = (direction) => {
    const maxStep = sliderItems.length;
    const nextStep = direction === 'next' ? step + 1 : step - 1;
    step = nextStep < 0 ? maxStep : nextStep > maxStep ? 0 : nextStep;
    transformSlider(step);
};

const setSliderStep = index => {
    step = index;
    transformSlider(index)
};

showAllButton.addEventListener('click', ShowFunction);

sliderBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        const { target } = e;
        const direction = target.className.includes('next') ? 'next' : 'prev';
        stepSlid(direction);
    });
});

const getDataFromJudge = (e) => {
    const { target } = e;
    const parent = target.parentNode.parentNode;
    const name = parent.querySelector('.judge_name').innerHTML;
    const fullContent = parent.querySelector('.judge_full-content') && [...parent.querySelector('.judge_full-content').children];
    const [title, text] = fullContent ? fullContent.map(item => item.innerHTML) : [null, null];
    return {
        name,
        title,
        text,
        e
    }
};

const insertDataToFullInfo = ({ name, title, text, e }) => {
   const [jName, ,jTitle, jText] = judgeModalContent.children;
    jName.innerHTML = name;
    jTitle.innerHTML = title || 'Нет данных';
    jText.innerHTML = text || 'Нет данных';
    return e
};

const setJudgeModalPosition = e => {
    const { offsetTop, offsetLeft } = e.target;
    judgeModal.style.top = `${offsetTop}px`;
    judgeCursor.style.left = `${offsetLeft + 35}px`;
};

const showJudgeModal = () => judgeModal.classList.remove('judge_full-modal_hide');

const hideJudgeModal = () => judgeModal.classList.add('judge_full-modal_hide');


const showFullJudgeInfo = compose(
  showJudgeModal,
  setJudgeModalPosition,
  insertDataToFullInfo,
  getDataFromJudge
);

const showBurgerMenuFunction = () => {
    burgerMenu.style.display = 'flex';
};

const closeBurgerMenuFunction = () => {
    burgerMenu.style.display = 'none';
};

const alternativeCloseBurgerMenuFunction = () => {
    burgerMenu.style.display = 'none';
};

judgeDetailsBtn.forEach(item => item.addEventListener('click', showFullJudgeInfo));
judgeModalClose.addEventListener('click', hideJudgeModal);
window.addEventListener('click', ({ target }) => {
    const blocedClasses =  ['judge_details', 'judge_full-modal'].map(i => target.className.includes && !target.className.includes(i) && !target.parentNode.className.includes(i));
    blocedClasses.every(i => i === true) && hideJudgeModal();
});
sliderDots.forEach((item, index) => item.addEventListener('click', () => setSliderStep(index)));

burgerBtn.addEventListener('click', showBurgerMenuFunction);
closeBurgerMenu.addEventListener('click', closeBurgerMenuFunction);
alternativeCloseBurgerMenu.addEventListener('click', alternativeCloseBurgerMenuFunction);