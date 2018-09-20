/**
 * @desc etnry
 */

import Canvas from '@/core/canvas';

export default (canvas: HTMLCanvasElement): Canvas => {
    return new Canvas(canvas);
};
