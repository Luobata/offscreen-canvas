/**
 * @desc class Canvas
 */

// tslint:disable no-any no-safe-any
// tslint:disable-next-line
// declare interface HTMLCanvasElement {
//     transferControlToOffscreen: any;
// }
// tslint:disable-next-line
declare interface CanvasRenderingContext2D {
    [key: string]: any;
}

export default class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private offCanvas: HTMLCanvasElement;
    private offCtx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvasInit(canvas);
    }

    private canvasInit(canvas: HTMLCanvasElement): void {
        // if ((<any>window).Worker) {
        //     const worker: Worker = new Worker('./main/worker.js');
        //     worker.postMessage({ canvas: offscreen }, [offscreen]);
        // } else {
        // }
        // if ((<any>window).OffscreenCanvas) {
        //     const offscreen: any = (<any>canvas).transferControlToOffscreen();
        //     this.canvas = offscreen;
        //     this.ctx = this.canvas.getContext('2d');
        // } else {
        this.canvas = canvas;
        this.offScreen();
        this.ctx = this.observe(this.canvas.getContext('2d'));
        // }
    }

    private offScreen(): void {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');
    }

    private observe(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
        console.log(ctx);
        // tslint:disable
        for (const i in ctx) {
            this.hack(i, ctx);
        }
        // tslint:enable

        return this.offCtx;
    }

    private hack(key: string, ctx: CanvasRenderingContext2D): void {
        console.log(key, typeof ctx[key]);
        const keyType: string = typeof ctx[key];
        const valueKey: string[] = ['string', 'nubmer', 'boolean'];
        const funKey: string[] = ['function'];

        if (valueKey.indexOf(keyType) !== -1) {
            // hack value
        }
    }
}