'use strict';
class GraphWindow {
    constructor() {
        this.bounds = new RectF(0, 0, 0, 0);
        this.inner_bounds = new RectF(0, 0, 0, 0);
        this.GRAPH_X_AXIS_LENGTH = 1200;
        this.GRAPH_Y_AXIS_LENGTH = 100;
        this.RATIO = 0.75;
        this.SCOPE_0_INDEX = 0;
        this.SCOPE_1_INDEX = 1;
        this.SCOPE_2_INDEX = 2;
        this.bounds.left = view_port.left;
        this.bounds.right = view_port.right;
        this.bounds.top = menu_bar.graph_button.bottom + 2 * global.variables.canvas_stroke_width_3;
        this.bounds.bottom = view_port.bottom;
        this.width = 1;
        this.height = 1;
        this.trim = 1;
        this.padding = global.variables.canvas_stroke_width_5;
        if (MOBILE_MODE) {
            this.BUTTON_WIDTH_RATIO = 0.12;
            this.BUTTON_HEIGHT_RATIO = 0.08;
        }
        else {
            this.BUTTON_WIDTH_RATIO = 0.085;
            this.BUTTON_HEIGHT_RATIO = 0.05;
        }
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(paint.style.FILL);
        this.bounds_paint.set_paint_cap(paint.cap.ROUND);
        this.bounds_paint.set_paint_join(paint.join.ROUND);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
        this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GRAPH_AREA_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_RED_COLOR);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.LEFT);
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(paint.style.FILL);
        this.hover_paint.set_paint_cap(paint.cap.ROUND);
        this.hover_paint.set_paint_join(paint.join.ROUND);
        this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
        this.hover_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
        this.hover_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.hover_paint.set_alpha(255);
        this.hover_paint.set_paint_align(paint.align.CENTER);
        this.graph_text_a_paint = new Paint();
        this.graph_text_a_paint.set_paint_style(paint.style.FILL);
        this.graph_text_a_paint.set_paint_cap(paint.cap.ROUND);
        this.graph_text_a_paint.set_paint_join(paint.join.ROUND);
        this.graph_text_a_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_a_paint.set_color(global.COLORS.TRACE_I_COLOR);
        this.graph_text_a_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_a_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.graph_text_a_paint.set_alpha(255);
        this.graph_text_a_paint.set_paint_align(this.graph_text_a_paint.align.LEFT);
        this.graph_text_b_paint = new Paint();
        this.graph_text_b_paint.set_paint_style(paint.style.FILL);
        this.graph_text_b_paint.set_paint_cap(paint.cap.ROUND);
        this.graph_text_b_paint.set_paint_join(paint.join.ROUND);
        this.graph_text_b_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_b_paint.set_color(global.COLORS.TRACE_II_COLOR);
        this.graph_text_b_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_b_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.graph_text_b_paint.set_alpha(255);
        this.graph_text_b_paint.set_paint_align(this.graph_text_b_paint.align.LEFT);
        this.graph_text_c_paint = new Paint();
        this.graph_text_c_paint.set_paint_style(paint.style.FILL);
        this.graph_text_c_paint.set_paint_cap(paint.cap.ROUND);
        this.graph_text_c_paint.set_paint_join(paint.join.ROUND);
        this.graph_text_c_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_c_paint.set_color(global.COLORS.TRACE_III_COLOR);
        this.graph_text_c_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_c_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.graph_text_c_paint.set_alpha(255);
        this.graph_text_c_paint.set_paint_align(this.graph_text_c_paint.align.LEFT);
        this.x_axis = new Array(this.GRAPH_X_AXIS_LENGTH).fill(new PointF(0, 0));
        this.y_axis = new Array(this.GRAPH_Y_AXIS_LENGTH).fill(new PointF(0, 0));
        this.graph_trace_a = new Trace(this.GRAPH_X_AXIS_LENGTH, this.GRAPH_Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_a.set_color(global.COLORS.TRACE_I_COLOR);
        this.graph_trace_b = new Trace(this.GRAPH_X_AXIS_LENGTH, this.GRAPH_Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_b.set_color(global.COLORS.TRACE_II_COLOR);
        this.graph_trace_c = new Trace(this.GRAPH_X_AXIS_LENGTH, this.GRAPH_Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_c.set_color(global.COLORS.TRACE_III_COLOR);
        this.meter_hover_index = -1;
        this.time_axis_value = '';
        this.time_tag = '';
        this.load_axis();
        let padding = 0.0125 * this.bounds.get_width();
        if (MOBILE_MODE) {
            padding = 0.00875 * this.bounds.get_width();
        }
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.download_button = new Button(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
        this.download_button.text = 'CSV';
        this.download_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.download_button.fill_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
        this.download_button.fill_paint.set_alpha(255);
        this.download_button.draw_stroke = false;
        this.download_button.draw_fill = true;
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.line_buffer = [];
        this.cached_value = 0;
        this.cached_value_t_p_o1 = 0;
        this.temp = 0;
        this.index = 0;
    }
    load_axis() {
        this.x_axis = new Array(this.GRAPH_X_AXIS_LENGTH).fill(new PointF(0, 0));
        this.y_axis = new Array(this.GRAPH_Y_AXIS_LENGTH).fill(new PointF(0, 0));
        let left = this.bounds.left + this.padding;
        let top = this.bounds.top + 2 * this.padding;
        let right = this.bounds.right - this.padding;
        let bottom = this.bounds.bottom - this.padding;
        this.inner_bounds = new RectF(left, top, right, bottom);
        this.trim = (this.bounds.get_width() - this.inner_bounds.get_width()) * 0.5;
        this.width = this.inner_bounds.get_width();
        this.height = this.inner_bounds.get_height();
        this.graph_trace_a.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        this.graph_trace_b.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        this.graph_trace_c.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        for (var i = 0; i < this.GRAPH_X_AXIS_LENGTH >> 1; i++) {
            this.x_axis[i] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, top);
            this.x_axis[i + (this.x_axis.length >> 1)] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, bottom);
            if (i < this.y_axis.length * 0.5) {
                this.y_axis[i] = new PointF(left, top + (this.height / (this.y_axis.length * 0.5)) * i);
                this.y_axis[i + this.y_axis.length * 0.5] = new PointF(right, top + (this.height / (this.y_axis.length * 0.5)) * i);
            }
        }
    }
    resize_window() {
        this.padding = global.variables.canvas_stroke_width_5;
        this.bounds.left = view_port.left;
        this.bounds.right = view_port.right;
        this.bounds.top = menu_bar.graph_button.bottom + 2 * global.variables.canvas_stroke_width_3;
        this.bounds.bottom = view_port.bottom;
        this.load_axis();
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_a_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_a_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_b_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_b_paint.set_text_size(global.variables.canvas_text_size_4);
        this.graph_text_c_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.graph_text_c_paint.set_text_size(global.variables.canvas_text_size_4);
        this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
        this.graph_trace_a.resize_trace();
        this.graph_trace_b.resize_trace();
        this.graph_trace_c.resize_trace();
        let padding = 0.0125 * this.bounds.get_width();
        if (MOBILE_MODE) {
            padding = 0.00875 * this.bounds.get_width();
        }
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.download_button.set_bounds(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
        this.download_button.resize_paint();
    }
    reset_trace(index) {
        if (index === 0) {
            this.graph_trace_a.reset();
        }
        else if (index === 1) {
            this.graph_trace_b.reset();
        }
        else if (index === 2) {
            this.graph_trace_c.reset();
        }
    }
    reset() {
        this.graph_trace_a.reset();
        this.graph_trace_b.reset();
        this.graph_trace_c.reset();
    }
    push_trace_a(value, t) {
        this.graph_trace_a.push(value, t);
    }
    push_trace_b(value, t) {
        this.graph_trace_b.push(value, t);
    }
    push_trace_c(value, t) {
        this.graph_trace_c.push(value, t);
    }
    mouse_down() {
        if (global.flags.flag_graph) {
            this.first_touch_x = global.variables.mouse_x;
            this.first_touch_y = global.variables.mouse_y;
            if (this.download_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                this.generate_csv();
            }
        }
    }
    generate_csv() {
        let str = '';
        let temp_str = '';
        let time_stamp = '';
        str += 'time, trace_a, trace_b, trace_c\n';
        let max = Math.max(Math.max(this.graph_trace_a.trace.length, this.graph_trace_b.trace.length), this.graph_trace_c.trace.length);
        let updated_time = false;
        for (var i = 0; i < max; i++) {
            time_stamp = '0, ';
            updated_time = false;
            temp_str = '';
            if (i < this.graph_trace_a.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_a.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_a.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            if (i < this.graph_trace_b.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_b.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_b.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            if (i < this.graph_trace_c.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_c.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_c.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            temp_str = temp_str.substring(0, temp_str.length - 2);
            temp_str += '\n';
            str += time_stamp + temp_str;
        }
        if (!MOBILE_MODE) {
            engine_functions.save_file(global.variables.user_file.title + '_csv.txt', str);
        }
        else {
            window.JsInterface.javascript_native_hook('push-csv', global.variables.user_file.title + '_csv.txt', str);
        }
    }
    mouse_move() {
        if (global.flags.flag_graph) {
            this.mouse_hover();
        }
    }
    mouse_up() { }
    mouse_hover() {
        if (this.inner_bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
            this.meter_hover_index = Math.round(((global.variables.mouse_x - this.inner_bounds.left) / (this.inner_bounds.get_width() / this.GRAPH_X_AXIS_LENGTH)) * 0.5);
        }
        else {
            this.meter_hover_index = -1;
        }
    }
    key_down(key_event) {
        if (global.flags.flag_graph) {
            if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
                menu_bar.handle_graph_flag(!global.flags.flag_graph);
                global.variables.component_touched = true;
            }
        }
    }
    draw_window(canvas) {
        if (global.flags.flag_graph) {
            canvas.draw_rect2(this.bounds, this.fill_paint);
            canvas.draw_rect2(this.inner_bounds, this.line_paint);
            this.cached_value = this.x_axis.length >> 1;
            this.cached_value_t_p_o1 = (global.CONSTANTS.ZERO_PT_FIVE + this.cached_value * 0.1) >> global.CONSTANTS.ZERO;
            this.temp = 0;
            this.index = 0;
            for (var i = 0; i < this.cached_value; i += this.cached_value_t_p_o1) {
                this.temp = i + this.cached_value;
                this.line_buffer[this.index++] = Array(this.x_axis[this.temp].x, this.x_axis[this.temp].y, this.x_axis[this.temp].x, this.x_axis[this.temp].y - this.inner_bounds.get_width() * 0.01);
            }
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            if (scope_manager.entry.length > 0) {
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_0_INDEX), this.bounds.get_center_x() - 1.25 * global.variables.canvas_text_size_base * (3.5 * this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_0_INDEX))), this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_a_paint);
                if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_a.trace.length) {
                    if (this.graph_trace_a.get_value(this.meter_hover_index)[1] !== '') {
                        canvas.draw_text(this.graph_trace_a.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_0_INDEX), this.inner_bounds.left, this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_a_paint);
                    }
                    else {
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_0_INDEX), this.inner_bounds.left, this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_a_paint);
                    }
                    this.time_axis_value = this.graph_trace_a.get_value(this.meter_hover_index)[0];
                    if (MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left + this.graph_trace_a.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left + this.graph_trace_a.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            if (scope_manager.entry.length > 1) {
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_1_INDEX), this.bounds.get_center_x(), this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_b_paint);
                if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_b.trace.length) {
                    if (this.graph_trace_b.get_value(this.meter_hover_index)[1] !== '') {
                        canvas.draw_text(this.graph_trace_b.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_1_INDEX), this.inner_bounds.left + view_port.view_width * 0.1, this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_b_paint);
                    }
                    else {
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_1_INDEX), this.inner_bounds.left + view_port.view_width * 0.1, this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_b_paint);
                    }
                    this.time_axis_value = this.graph_trace_b.get_value(this.meter_hover_index)[0];
                    if (MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left + this.graph_trace_b.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left + this.graph_trace_b.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            if (scope_manager.entry.length > 2) {
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_2_INDEX), this.bounds.get_center_x() + 1.25 * global.variables.canvas_text_size_base * (3.5 * this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_2_INDEX))), this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_c_paint);
                if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_c.trace.length) {
                    if (this.graph_trace_c.get_value(this.meter_hover_index)[1] !== '') {
                        canvas.draw_text(this.graph_trace_c.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_2_INDEX), this.inner_bounds.left + view_port.view_width * 0.2, this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_c_paint);
                    }
                    else {
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_2_INDEX), this.inner_bounds.left + view_port.view_width * 0.2, this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_c_paint);
                    }
                    this.time_axis_value = this.graph_trace_c.get_value(this.meter_hover_index)[0];
                    if (MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left + this.graph_trace_c.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left + this.graph_trace_c.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            if (scope_manager.entry.length > 0) {
                if (this.meter_hover_index > -1 &&
                    (this.meter_hover_index < this.graph_trace_a.trace.length || this.meter_hover_index < this.graph_trace_b.trace.length || this.meter_hover_index < this.graph_trace_c.trace.length)) {
                    canvas.draw_text(this.time_axis_value + 's', this.inner_bounds.right -
                        this.text_paint.measure_text(global.utils.exponentiate_quickly(simulation_manager.time_step) + 's/step   ') -
                        this.text_paint.measure_text(this.time_axis_value + 's') * 0.5 -
                        view_port.view_width * 0.1, this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.text_paint);
                }
            }
            if (this.graph_trace_a.magnitude_list.length > 0) {
                for (var i = Math.round(this.GRAPH_X_AXIS_LENGTH * 0.1); i < Math.round(this.GRAPH_X_AXIS_LENGTH >> 1); i += Math.round(this.GRAPH_X_AXIS_LENGTH * 0.1)) {
                    if (i < this.graph_trace_a.magnitude_list.length) {
                        this.time_tag = global.utils.exponentiate_quickly(this.graph_trace_a.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left + this.graph_trace_a.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.variables.canvas_stroke_width_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.graph_trace_a.magnitude_list.length === 0 && this.graph_trace_b.magnitude_list.length > 0) {
                for (var i = (this.GRAPH_X_AXIS_LENGTH >> 1) * 0.1; i < this.GRAPH_X_AXIS_LENGTH >> 1; i += (this.GRAPH_X_AXIS_LENGTH >> 1) * 0.1) {
                    if (i < this.graph_trace_b.magnitude_list.length) {
                        this.time_tag = global.utils.exponentiate_quickly(this.graph_trace_b.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left + this.graph_trace_b.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.variables.canvas_stroke_width_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.graph_trace_a.magnitude_list.length === 0 && this.graph_trace_b.magnitude_list.length === 0 && this.graph_trace_c.magnitude_list.length > 0) {
                for (var i = (this.GRAPH_X_AXIS_LENGTH >> 1) * 0.1; i < this.GRAPH_X_AXIS_LENGTH >> 1; i += (this.GRAPH_X_AXIS_LENGTH >> 1) * 0.1) {
                    if (i < this.graph_trace_c.magnitude_list.length) {
                        this.time_tag = global.utils.exponentiate_quickly(this.graph_trace_c.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left + this.graph_trace_c.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.variables.canvas_stroke_width_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            canvas.draw_text(global.utils.exponentiate_quickly(simulation_manager.time_step) + 's/step', this.inner_bounds.right - this.text_paint.measure_text(global.utils.exponentiate_quickly(simulation_manager.time_step) + 's/step   '), this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1), this.text_paint);
            if (this.download_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && !MOBILE_MODE) {
                this.download_button.fill_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
                this.download_button.draw_button(canvas);
                this.download_button.fill_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
            }
            else {
                this.download_button.draw_button(canvas);
            }
            this.graph_trace_a.draw_trace(canvas, view_port.left, 0);
            this.graph_trace_b.draw_trace(canvas, view_port.left, 0);
            this.graph_trace_c.draw_trace(canvas, view_port.left, 0);
        }
    }
}
