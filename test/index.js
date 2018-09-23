import core from '../src/';

window.onload = () => {
    const canvas = core(document.querySelector('canvas'));
    const ctx = canvas.ctx;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, 30, 30);
};
