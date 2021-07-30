'use strict';
class RectF {
    constructor(left, top, right, bottom) {
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
    set_bounds(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    resize() {
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
    is_near(bounds, norm_magnitude) {
        if (global.utils.norm(this.get_center_x() - bounds.get_center_x(), this.get_center_y() - bounds.get_center_y()) <= norm_magnitude) {
            return true;
        }
        else {
            return false;
        }
    }
    contains_xy(x, y) {
        return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
    }
    contains_xywh(x, y, w, h) {
        let h_prime = h * 0.5;
        let w_prime = w * 0.5;
        return x >= this.get_center_x() - w_prime && x <= this.get_center_x() + w_prime && y >= this.get_center_y() - h_prime && y <= this.get_center_y() + h_prime;
    }
    set_center(x, y) {
        this.temp_width = this.get_width() * 0.5;
        this.temp_height = this.get_height() * 0.5;
        this.left = x - this.temp_width;
        this.right = x + this.temp_width;
        this.top = y - this.temp_height;
        this.bottom = y + this.temp_height;
    }
    set_center2(x, y, w, h) {
        this.temp_width = w * 0.5;
        this.temp_height = h * 0.5;
        this.left = x - this.temp_width;
        this.right = x + this.temp_width;
        this.top = y - this.temp_height;
        this.bottom = y + this.temp_height;
    }
    get_center_x() {
        if (this.last_left !== this.left || this.last_right !== this.right) {
            this.last_left = this.left;
            this.last_right = this.right;
            this.last_center_x = (this.right + this.left) * 0.5;
        }
        return this.last_center_x;
    }
    get_center_y() {
        if (this.last_top !== this.top || this.last_bottom !== this.bottom) {
            this.last_top = this.top;
            this.last_bottom = this.bottom;
            this.last_center_y = (this.top + this.bottom) * 0.5;
        }
        return this.last_center_y;
    }
    get_width() {
        if (this.w_last_left !== this.left || this.w_last_right !== this.right) {
            this.w_last_left = this.left;
            this.w_last_right = this.right;
            this.last_width = Math.abs(this.right - this.left);
        }
        return this.last_width;
    }
    get_height() {
        if (this.w_last_top !== this.top || this.w_last_bottom !== this.bottom) {
            this.w_last_top = this.top;
            this.w_last_bottom = this.bottom;
            this.last_height = Math.abs(this.bottom - this.top);
        }
        return this.last_height;
    }
}
