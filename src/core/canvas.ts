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
    private backCanvas: HTMLCanvasElement;
    private backCtx: CanvasRenderingContext2D;
    private pixelRatio: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvasInit(canvas);
    }

    public reset(): void {
        this.canvas.height = this.canvas.height;
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
        this.pixelRatio = window.devicePixelRatio;
        this.offScreen();
        this.ctx = this.observe(this.canvas.getContext('2d'));
        // }
    }

    private offScreen(): void {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');

        this.backCanvas = document.createElement('canvas');
        this.backCtx = this.backCanvas.getContext('2d');
    }

    private observe(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
        console.log(this.offCtx);
        // tslint:disable
        for (const i in ctx) {
            this.hack(i, ctx);
        }
        // tslint:enable

        return this.offCtx;
    }

    private hack(key: string, ctx: CanvasRenderingContext2D): void {
        const keyType: string = typeof ctx[key];
        const valueKey: string[] = ['string', 'nubmer', 'boolean'];
        const funKey: string[] = ['function'];

        if (valueKey.indexOf(keyType) !== -1) {
            // hack value
            // tslint:disable
            Object.defineProperty(this.offCtx, key, {
                enumerable: false,
                configurable: false,
                get() {
                    return ctx[keyType];
                },
                set: function(newValue: any) {
                    console.log(newValue);
                    // this.offCtx[key] = newValue;
                    ctx[key] = newValue;
                },
            });
            // tslint:enable
        }

        if (funKey.indexOf(keyType) !== -1) {
            this.offCtx[key] = <T>(...args: T[]): void => {
                // TODO 不直接映射，修改内容，然后getImageData, putImageData
                this.backCtx[key](...args);
                this.sync(ctx);
                // ctx[key](...args);
            };
        }
    }

    private sync(ctx: CanvasRenderingContext2D): void {
        const data: ImageData = this.backCtx.getImageData(
            0,
            0,
            this.backCanvas.width * this.pixelRatio,
            this.backCanvas.height * this.pixelRatio,
        );
        console.log(data);

        ctx.putImageData(data, 0, 0);
    }
}
