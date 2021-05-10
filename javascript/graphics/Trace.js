'use strict';
class Trace {
    constructor(x_len, y_len, ratio) {
        this.trace_path = new Path();
        this.magnitude_list = [];
        this.trace = [];
        this.norm = 1;
        this.last_norm = 1;
        this.temporary_norm = 1;
        this.bounds = new RectF(0, 0, 0, 0);
        this.previous_point = new PointF(0, 0);
        this.current_point = new PointF(0, 0);
        this.mid_point = new PointF(0, 0);
        this.trim = 0;
        this.width = 0;
        this.height = 0;
        this.plot_magnitude = 0;
        this.ratio = ratio;
        this.x_axis_length = x_len;
        this.y_axis_length = y_len;
        this.trace_stroke_paint = new Paint();
        this.trace_stroke_paint.set_paint_style(paint.style.STROKE);
        this.trace_stroke_paint.set_paint_cap(paint.cap.ROUND);
        this.trace_stroke_paint.set_paint_join(paint.join.ROUND);
        this.trace_stroke_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.trace_stroke_paint.set_color(global.COLORS.TRACE_DEFAULT_COLOR);
        this.trace_stroke_paint.set_text_size(global.variables.canvas_text_size_4);
        this.trace_stroke_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.trace_stroke_paint.set_alpha(255);
        this.trace_stroke_paint.set_paint_align(paint.align.CENTER);
        this.trace_fill_paint = new Paint();
        this.trace_fill_paint.set_paint_style(paint.style.FILL);
        this.trace_fill_paint.set_paint_cap(paint.cap.ROUND);
        this.trace_fill_paint.set_paint_join(paint.join.ROUND);
        this.trace_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.trace_fill_paint.set_color(global.COLORS.TRACE_DEFAULT_COLOR);
        this.trace_fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.trace_fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.trace_fill_paint.set_alpha(255);
        this.trace_fill_paint.set_paint_align(paint.align.CENTER);
        this.abs_temp = 0;
        this.temp_div = 0;
        this.temp_const = 0;
        this.constant = 0;
        this.constant2 = 0;
    }
    set_color(color) {
        this.trace_stroke_paint.set_color(color);
        this.trace_fill_paint.set_color(color);
    }
    set_x_axis_length(len) {
        this.x_axis_length = len;
    }
    set_y_axis_length(len) {
        this.y_axis_length = len;
    }
    set_ratio(ratio) {
        this.ratio = ratio;
    }
    set_width(width) {
        this.width = width;
    }
    set_height(height) {
        this.height = height;
    }
    set_trim(trim) {
        this.trim = trim;
    }
    update_parameters(bounds, ratio, width, height, trim) {
        this.set_bounds(bounds);
        this.set_ratio(ratio);
        this.set_width(width);
        this.set_height(height);
        this.set_trim(trim);
    }
    set_bounds(rect) {
        this.bounds.left = rect.left;
        this.bounds.top = rect.top;
        this.bounds.right = rect.right;
        this.bounds.bottom = rect.bottom;
    }
    resize_trace() {
        this.trace_stroke_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.trace_stroke_paint.set_text_size(global.variables.canvas_text_size_4);
        this.trace_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.trace_fill_paint.set_text_size(global.variables.canvas_text_size_4);
        let constant = this.width / (this.x_axis_length >> 1);
        let constant2 = (this.height * this.ratio) / this.temporary_norm;
        for (var i = 0; i < this.trace.length; i++) {
            this.trace[i].x = i * constant + this.trim;
            if (this.temporary_norm > 0 && i < this.magnitude_list.length) {
                this.trace[i].y = this.magnitude_list[i].y * constant2;
            }
            else {
                this.trace[i].y = 0;
            }
        }
        this.create_path();
    }
    reset() {
        this.trace.splice(0, this.trace.length);
        this.magnitude_list.splice(0, this.magnitude_list.length);
        this.norm = 1;
        this.last_norm = 1;
        this.temporary_norm = 1;
        this.reset_path();
    }
    reset_path() {
        this.trace_path.reset();
    }
    get_value(index) {
        let ret = [];
        if (index > -1 && index < this.magnitude_list.length && index < Math.round(this.x_axis_length >> 1) - 2) {
            ret.push(global.utils.exponentiate_quickly(this.magnitude_list[index].x));
            ret.push(global.utils.exponentiate_quickly(-this.magnitude_list[index].y));
        }
        return ret;
    }
    get_value_double(index) {
        let ret = [];
        if (index > -1 && index < this.magnitude_list.length && index < Math.round(this.x_axis_length >> 1) - 2) {
            ret.push(this.magnitude_list[index].x);
            ret.push(-this.magnitude_list[index].y);
        }
        return ret;
    }
    push(value, t) {
        value *= -1;
        if (Math.abs(value) < 1e-18) {
            value = 0;
        }
        this.magnitude_list.push(new PointF(t, value));
        this.last_norm = this.norm;
        this.norm = 0;
        this.plot_magnitude = 0;
        this.abs_temp = 0;
        for (var i = 0; i < this.magnitude_list.length; i++) {
            this.abs_temp = Math.abs(this.magnitude_list[i].y);
            if (this.abs_temp > this.norm) {
                this.norm = this.abs_temp;
            }
        }
        this.norm = 2 * this.norm;
        this.temporary_norm = this.norm;
        if (this.last_norm !== 0 && this.temporary_norm !== 0) {
            this.temp_div = this.last_norm / (this.height * this.ratio);
            this.temp_const = (this.height * this.ratio) / this.temporary_norm;
            for (var i = 0; i < this.trace.length; i++) {
                this.plot_magnitude = this.trace[i].y * this.temp_div;
                this.trace[i].y = this.plot_magnitude * this.temp_const;
            }
        }
        this.constant = this.width / (this.x_axis_length >> 1);
        this.constant2 = (this.height * this.ratio) / this.temporary_norm;
        if (this.temporary_norm > 0) {
            if (global.utils.not_null(value / this.temporary_norm)) {
                this.trace.push(new PointF(this.trace.length * this.constant + this.trim, value * this.constant2));
            }
            else {
                this.trace.push(new PointF(this.trace.length * this.constant + this.trim, 0));
            }
            if (this.trace.length > this.x_axis_length >> 1) {
                this.trace.splice(0, 1);
                this.magnitude_list.splice(0, 1);
                for (var i = 0; i < this.trace.length; i++) {
                    this.trace[i].x = i * this.constant + this.trim;
                }
            }
        }
        else {
            this.trace.push(new PointF(this.trace.length * this.constant + this.trim, 0));
            if (this.trace.length > this.x_axis_length >> 1) {
                this.trace.splice(0, 1);
                this.magnitude_list.splice(0, 1);
                for (var i = 0; i < this.trace.length; i++) {
                    this.trace[i].x = i * this.constant + this.trim;
                }
            }
        }
        this.create_path();
    }
    create_path() {
        if (this.trace.length > 0) {
            let temp_height = this.height >> 1;
            this.previous_point.set_point(this.trace[0].x, this.trace[0].y + this.bounds.top + temp_height);
            this.trace_path.reset();
            for (var i = 1; i < this.trace.length; i++) {
                this.current_point.set_point(this.trace[i].x, this.trace[i].y + this.bounds.top + temp_height);
                if (i === 0) {
                    this.trace_path.move_to(this.current_point.x, this.current_point.y);
                }
                else {
                    this.mid_point.set_point((this.previous_point.x + this.current_point.x) >> 1, (this.previous_point.y + this.current_point.y) >> 1);
                    if (i === 1) {
                        this.trace_path.line_to(this.mid_point.x, this.mid_point.y);
                    }
                    else {
                        this.trace_path.quad_to(this.previous_point.x, this.previous_point.y, this.mid_point.x, this.mid_point.y);
                    }
                }
                this.previous_point.set_point(this.current_point.x, this.current_point.y);
            }
            this.trace_path.line_to(this.previous_point.x, this.previous_point.y);
        }
    }
    draw_trace(canvas, x_offset, y_offset) {
        if (this.trace.length > 0) {
            canvas.draw_path2(this.trace_path.path_2d, x_offset, y_offset, this.trace_stroke_paint);
        }
    }
    patch() {
        if (!global.utils.not_null(this.x_axis_length)) {
            this.x_axis_length = 600;
        }
        if (!global.utils.not_null(this.y_axis_length)) {
            this.y_axis_length = 100;
        }
        if (!global.utils.not_null(this.ratio)) {
            this.ratio = 0.75;
        }
    }
}
