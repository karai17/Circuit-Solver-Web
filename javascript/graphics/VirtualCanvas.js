'use strict';
class VirtualCanvas {
    constructor(width, height, id) {
        this.surface = document.createElement('canvas');
        this.surface.width = width;
        this.surface.height = height;
        this.context = this.surface.getContext('2d', { alpha: false });
    }
    refresh_settings(override) {
        try {
            let temp = "absolute";
            if (this.surface.style.position !== temp || override) {
                this.surface.style.position = temp;
            }
            temp = "hidden";
            if (this.surface.style.visibility !== temp || override) {
                this.surface.style.visibility = temp;
            }
            temp = "none";
            if (this.surface.style.display !== temp || override) {
                this.surface.style.display = temp;
            }
            temp = "0";
            if (this.surface.style.zIndex !== "temp" || override) {
                this.surface.style.zIndex = temp;
            }
            if (this.context.imageSmoothingEnabled || override) {
                this.context.imageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.mozImageSmoothingEnabled || override) {
                //@ts-expect-error
                this.context.mozImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.oImageSmoothingEnabled || override) {
                //@ts-expect-error
                this.context.oImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.webkitImageSmoothingEnabled || override) {
                //@ts-expect-error
                this.context.webkitImageSmoothingEnabled = false;
            }
            //@ts-expect-error
            if (this.context.msImageSmoothingEnabled || override) {
                //@ts-expect-error
                this.context.msImageSmoothingEnabled = false;
            }
            temp = "source-over";
            if (this.context.globalCompositeOperation !== temp || override) {
                this.context.globalCompositeOperation = temp;
            }
            temp = "hidden";
            if (this.surface.style.backfaceVisibility !== temp || override) {
                this.surface.style.backfaceVisibility = temp;
            }
        }
        catch (e) { }
    }
    resize(width, height, override) {
        if (this.surface.width !== width || override) {
            this.surface.width = width;
        }
        if (this.surface.height !== height || override) {
            this.surface.height = height;
        }
        let temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerWidth);
        if (this.surface.style.width !== temp || override) {
            this.surface.style.width = temp;
        }
        temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerHeight);
        if (this.surface.style.height !== temp || override) {
            this.surface.style.height = temp;
        }
        this.refresh_settings(override);
    }
}
