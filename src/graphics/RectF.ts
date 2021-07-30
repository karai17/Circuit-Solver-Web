'use strict';
class RectF {
	public left: number;
	public top: number;
	public right: number;
	public bottom: number;
	public anchored: Boolean;
	private temp_width: number;
	private temp_height: number;
	private last_left: number;
	private last_right: number;
	private last_top: number;
	private last_bottom: number;
	private last_center_x: number;
	private last_center_y: number;
	private last_width: number;
	private last_height: number;
	private w_last_left: number;
	private w_last_right: number;
	private w_last_top: number;
	private w_last_bottom: number;
	constructor(left: number, top: number, right: number, bottom: number) {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.anchored = true;
		this.temp_width = 0;
		this.temp_height = 0;
		this.last_left = -1;
		this.last_right = -1;
		this.last_top = -1;
		this.last_bottom = -1;
		this.last_center_x = -1;
		this.last_center_y = -1;
		this.last_width = -1;
		this.last_height = -1;
		this.w_last_left = -1;
		this.w_last_right = -1;
		this.w_last_top = -1;
		this.w_last_bottom = -1;
	}
	set_bounds(left: number, top: number, right: number, bottom: number): void {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
	}
	resize(): void {
		this.left = global.utils.remap_position(this.left, true);
		this.top = global.utils.remap_position(this.top, false);
		this.right = global.utils.remap_position(this.right, true);
		this.bottom = global.utils.remap_position(this.bottom, false);
		this.last_left = -1;
		this.last_right = -1;
		this.last_top = -1;
		this.last_bottom = -1;
		this.last_center_x = -1;
		this.last_center_y = -1;
		this.last_width = -1;
		this.last_height = -1;
		this.w_last_left = -1;
		this.w_last_right = -1;
		this.w_last_top = -1;
		this.w_last_bottom = -1;
	}
	is_near(bounds: RectF, norm_magnitude: number): boolean {
		if (global.utils.norm(this.get_center_x() - bounds.get_center_x(), this.get_center_y() - bounds.get_center_y()) <= norm_magnitude) {
			return true;
		} else {
			return false;
		}
	}
	contains_xy(x: number, y: number): boolean {
		return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
	}
	contains_xywh(x: number, y: number, w: number, h: number): boolean {
		let h_prime: number = h * 0.5;
		let w_prime: number = w * 0.5;
		return x >= this.get_center_x() - w_prime && x <= this.get_center_x() + w_prime && y >= this.get_center_y() - h_prime && y <= this.get_center_y() + h_prime;
	}
	set_center(x: number, y: number): void {
		this.temp_width = this.get_width() * 0.5;
		this.temp_height = this.get_height() * 0.5;
		this.left = x - this.temp_width;
		this.right = x + this.temp_width;
		this.top = y - this.temp_height;
		this.bottom = y + this.temp_height;
	}
	set_center2(x: number, y: number, w: number, h: number): void {
		this.temp_width = w * 0.5;
		this.temp_height = h * 0.5;
		this.left = x - this.temp_width;
		this.right = x + this.temp_width;
		this.top = y - this.temp_height;
		this.bottom = y + this.temp_height;
	}
	get_center_x(): number {
		if (this.last_left !== this.left || this.last_right !== this.right) {
			this.last_left = this.left;
			this.last_right = this.right;
			this.last_center_x = (this.right + this.left) * 0.5;
		}
		return this.last_center_x;
	}
	get_center_y(): number {
		if (this.last_top !== this.top || this.last_bottom !== this.bottom) {
			this.last_top = this.top;
			this.last_bottom = this.bottom;
			this.last_center_y = (this.top + this.bottom) * 0.5;
		}
		return this.last_center_y;
	}
	get_width(): number {
		if (this.w_last_left !== this.left || this.w_last_right !== this.right) {
			this.w_last_left = this.left;
			this.w_last_right = this.right;
			this.last_width = Math.abs(this.right - this.left);
		}
		return this.last_width;
	}
	get_height(): number {
		if (this.w_last_top !== this.top || this.w_last_bottom !== this.bottom) {
			this.w_last_top = this.top;
			this.w_last_bottom = this.bottom;
			this.last_height = Math.abs(this.bottom - this.top);
		}
		return this.last_height;
	}
}
