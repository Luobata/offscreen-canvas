/**
 * @desc workder
 */

onmessage = function listen(e) {
    const offCanvas = e.data.canvas;
    const ctx = offCanvas.getContext('2d');
    this.console.log(ctx);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 30, 30);

    // postMessage(workerResult);
};
