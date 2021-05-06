'use strict';
class Path {
	public path_2d: Array<PATH_T>;
	private indexer: number;
	private iterator: number;
	private length: number;
	constructor() {
		this.path_2d = [];
		this.indexer = 0;
		this.length = 0;
	}
	resize() {
		let temp: PATH_T;
		this.length = this.path_2d.length;
		for (var i: number = 0; i < this.length; i++) {
			temp = this.path_2d[i];
			if (temp['command'] === 'MOVE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'LINE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'QUAD') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
				temp['x2'] = global.utils.remap_position(temp['x2'], true);
				temp['y2'] = global.utils.remap_position(temp['y2'], false);
			} else if (temp['command'] === 'CURVE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
				temp['x2'] = global.utils.remap_position(temp['x2'], true);
				temp['y2'] = global.utils.remap_position(temp['y2'], false);
				temp['x3'] = global.utils.remap_position(temp['x3'], true);
				temp['y3'] = global.utils.remap_position(temp['y3'], false);
			}

			if (this.length - 1 - i === i + 1) {
				break;
			}

			temp = this.path_2d[this.length - 1 - i];
			if (temp['command'] === 'MOVE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'LINE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'QUAD') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
				temp['x2'] = global.utils.remap_position(temp['x2'], true);
				temp['y2'] = global.utils.remap_position(temp['y2'], false);
			} else if (temp['command'] === 'CURVE') {
				temp['x1'] = global.utils.remap_position(temp['x1'], true);
				temp['y1'] = global.utils.remap_position(temp['y1'], false);
				temp['x2'] = global.utils.remap_position(temp['x2'], true);
				temp['y2'] = global.utils.remap_position(temp['y2'], false);
				temp['x3'] = global.utils.remap_position(temp['x3'], true);
				temp['y3'] = global.utils.remap_position(temp['y3'], false);
			}

			if (this.iterator == i) {
				break;
			}
		}
	}
	move_to(x: number, y: number): void {
		this.path_2d[this.indexer++] = {
			command: 'MOVE',
			x1: (global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO,
			y1: (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO
		};
	}
	curve_to(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
		this.path_2d[this.indexer++] = {
			command: 'CURVE',
			x1: (global.CONSTANTS.ZERO_PT_FIVE + x1) >> global.CONSTANTS.ZERO,
			y1: (global.CONSTANTS.ZERO_PT_FIVE + y1) >> global.CONSTANTS.ZERO,
			x2: (global.CONSTANTS.ZERO_PT_FIVE + x2) >> global.CONSTANTS.ZERO,
			y2: (global.CONSTANTS.ZERO_PT_FIVE + y2) >> global.CONSTANTS.ZERO,
			x3: (global.CONSTANTS.ZERO_PT_FIVE + x3) >> global.CONSTANTS.ZERO,
			y3: (global.CONSTANTS.ZERO_PT_FIVE + y3) >> global.CONSTANTS.ZERO
		};
	}
	quad_to(x1: number, y1: number, x2: number, y2: number): void {
		this.path_2d[this.indexer++] = {
			command: 'QUAD',
			x1: (global.CONSTANTS.ZERO_PT_FIVE + (x2 + x1) * 0.5) >> global.CONSTANTS.ZERO,
			y1: (global.CONSTANTS.ZERO_PT_FIVE + (y2 + y1) * 0.5) >> global.CONSTANTS.ZERO,
			x2: (global.CONSTANTS.ZERO_PT_FIVE + x2) >> global.CONSTANTS.ZERO,
			y2: (global.CONSTANTS.ZERO_PT_FIVE + y2) >> global.CONSTANTS.ZERO
		};
	}
	line_to(x: number, y: number): void {
		this.path_2d[this.indexer++] = {
			command: 'LINE',
			x1: (global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO,
			y1: (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO
		};
	}
	close(): void {
		this.path_2d[this.indexer++] = {
			command: 'CLOSE',
			x1: 0,
			y1: 0
		};
	}
	reset(): void {
		this.indexer = 0;
		this.path_2d = [];
	}
	get_path(): Array<PATH_T> {
		return this.path_2d;
	}
}
