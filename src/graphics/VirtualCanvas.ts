'use strict';
class VirtualCanvas {
	private readonly OPTION_ASSIGN_ID: boolean;
	private surface: HTMLCanvasElement;
	private id: number;
	public context: CanvasRenderingContext2D;
	constructor(width: number, height: number, id: number) {
		this.OPTION_ASSIGN_ID = false;
		this.surface = document.createElement('canvas');
		this.surface.width = 1;
		this.surface.height = 1;
		if (this.OPTION_ASSIGN_ID) {
			this.id = id;
			this.surface.id = 'virutal_canvas_' + this.id;
		}
		this.context = this.surface.getContext('2d', { alpha: false });
	}
	resize(width: number, height: number): void {
		this.surface.width = width;
		this.surface.height = height;
		this.surface.style.width = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerWidth));
		this.surface.style.height = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerHeight));
		try {
			this.surface.style.position = 'absolute';
			this.surface.style.visibility = 'hidden';
			this.surface.style.display = 'none';
			this.surface.style.zIndex = '0';
			this.context.imageSmoothingEnabled = false;
			//@ts-expect-error
			this.context.mozImageSmoothingEnabled = false;
			//@ts-expect-error
			this.context.oImageSmoothingEnabled = false;
			//@ts-expect-error
			this.context.webkitImageSmoothingEnabled = false;
			//@ts-expect-error
			this.context.msImageSmoothingEnabled = false;
			this.context.globalCompositeOperation = 'source-over';
			this.surface.style.backfaceVisibility = 'hidden';
		} catch (e) { }
	}
	get_surface(): HTMLCanvasElement {
		return this.surface;
	}
}
