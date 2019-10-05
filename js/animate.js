const animate = document.querySelectorAll('.js-animate');

const addAnimatedClass = (target) => {
    const delay = target.getAttribute('data-delay');
    target.classList.add('animated');
    delay && target.classList.add(`animated-${delay}`);
};
const createObserver = target => {
    const observer = new IntersectionObserver((entry) => {
        const { isIntersecting } = entry[0];
        if (isIntersecting) {
            addAnimatedClass(target);
            observer.unobserve(target);
        }
    }, {
        threshold: 0.08
    });
    observer.observe(target);
};

animate.forEach(i => createObserver(i));