/**
 * @desc etnry
 */

// tslint:disable no-any no-safe-any
// tslint:disable-next-line
declare interface HTMLCanvasElement {
    transferControlToOffscreen: any;
}

export default (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    if ((<any>window).OffscreenCanvas) {
        const offscreen: any = canvas.transferControlToOffscreen();
        if ((<any>window).Worker) {
            const worker: Worker = new Worker('./main/worker.js');
            worker.postMessage({ canvas: offscreen }, [offscreen]);
        } else {
            return offscreen;
        }
    }
};
