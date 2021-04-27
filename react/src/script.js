'use strict';

export default class Slider {
    constructor(width, height, count){
        this.width = width;
        this.height = height;
        this.count = count;
    }
    whoAmI() {
        console.log('width, height, count :>> ', this.width, this.height, this.count);
    }
}