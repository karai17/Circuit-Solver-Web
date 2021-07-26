'use strict';
class VirtualCanvas {
    constructor(width, height, id) {
        this.surface = document.createElement('canvas');
        this.surface.width = width;
        this.surface.height = height;
        this.context = this.surface.getContext('2d', { alpha: false });
    }
    refresh_settings() {
        try {
            let temp = "absolute";
            if (this.surface.style.position !== temp) {
                this.surface.style.position = temp;
            }
            temp = "hidden";
            if (this.surface.style.visibility !== temp) {
                this.surface.style.visibility = temp;
            }
            temp = "none";
            if (this.surface.style.display !== temp) {
                this.surface.style.display = temp;
            }
            temp = "0";
            if (this.surface.style.zIndex !== "temp") {
                this.surface.style.zIndex = temp;
            }
            if (this.context.imageSmoothingEnabled) {
                this.context.imageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.mozImageSmoothingEnabled) {
                //@ts-expect-error
                this.context.mozImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.oImageSmoothingEnabled) {
                //@ts-expect-error
                this.context.oImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.webkitImageSmoothingEnabled) {
                //@ts-expect-error
                this.context.webkitImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.msImageSmoothingEnabled) {
                //@ts-expect-error
                this.context.msImageSmoothingEnabled = false;
            }
            temp = "source-over";
            if (this.context.globalCompositeOperation !== temp) {
                this.context.globalCompositeOperation = temp;
            }
            temp = "hidden";
            if (this.surface.style.backfaceVisibility !== temp) {
                this.surface.style.backfaceVisibility = temp;
            }
        }
        catch (e) { }
    }
    resize(width, height) {
        if (this.surface.width !== width) {
            this.surface.width = width;
        }
        if (this.surface.height !== height) {
            this.surface.height = height;
        }
        let temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerWidth);
        if (this.surface.style.width !== temp) {
            this.surface.style.width = temp;
        }
        temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerHeight);
        if (this.surface.style.height !== temp) {
            this.surface.style.height = temp;
        }
        this.refresh_settings();
    }
}
