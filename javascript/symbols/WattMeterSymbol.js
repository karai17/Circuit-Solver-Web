'use strict';
class WattMeterSymbol {
    constructor(rect, index, page) {
        this.index = index;
        this.page = page;
        this.bounds = new RectF(0, 0, 0, 0);
        if (global.utils.not_null(rect)) {
            this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        }
        this.p1 = new PointF(this.bounds.left, this.bounds.top);
        this.p2 = new PointF(this.bounds.left, this.bounds.bottom);
        this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
        this.wattmeter_0 = new PointF(0, 0);
        this.wattmeter_1 = new PointF(0, 0);
        this.wattmeter_2 = new PointF(0, 0);
        this.wattmeter_3 = new PointF(0, 0);
        this.wattmeter_4 = new PointF(0, 0);
        this.wattmeter_5 = new PointF(0, 0);
        this.wattmeter_6 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(paint.style.FILL);
        this.point_paint.set_paint_cap(paint.cap.ROUND);
        this.point_paint.set_paint_join(paint.join.ROUND);
        this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.point_paint.set_text_size(global.variables.canvas_text_size_4);
        this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        this.text_background_paint = new Paint();
        this.text_background_paint.set_paint_style(paint.style.FILL);
        this.text_background_paint.set_paint_cap(paint.cap.ROUND);
        this.text_background_paint.set_paint_join(paint.join.ROUND);
        this.text_background_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.text_background_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
        this.text_background_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_background_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_background_paint.set_alpha(255);
        this.text_background_paint.set_paint_align(paint.align.CENTER);
        this.meter_symbol = new MeterSymbols();
        this.meter_symbol.reset(global.CONSTANTS.METER_SYMBOL_POWER, global.CONSTANTS.METER_STYLE_0);
        this.meter_symbol.set_bounds(this.bounds.left + this.bounds.get_width() * 0.4, this.bounds.top + this.bounds.get_height() * 0.4, this.bounds.right - this.bounds.get_width() * 0.4, this.bounds.bottom - this.bounds.get_height() * 0.4);
        this.meter_symbol.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.build_element();
        this.flag_add_element = false;
        this.TAG = language_manager.TAG_WATTMETER;
        this.draw_tag = false;
        this.text_bounds = new RectF(0, 0, 0, 0);
        this.height_ratio = 0.35;
        this.line_buffer = [];
        this.circle_buffer = [];
    }
    update() {
        if (this.flag_add_element) {
            if (workspace.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, workspace.bounds.get_width() - 4.5 * global.variables.node_space_x, workspace.bounds.get_height() - 4.5 * global.variables.node_space_y) &&
                !this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
                global.flags.flag_history_lock = true;
                engine_functions.add_wattmeter();
                this.flag_add_element = false;
            }
        }
    }
    mouse_down(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
                if (!this.flag_add_element && !global.flags.flag_history_lock && !global.flags.flag_add_element) {
                    this.flag_add_element = true;
                    global.flags.flag_add_element = true;
                    global.variables.component_touched = true;
                }
            }
        }
    }
    mouse_move(page, width, height) {
        if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height) && !MOBILE_MODE) {
            this.draw_tag = true;
        }
        else {
            this.draw_tag = false;
        }
        this.update();
        if (this.page === page) {
        }
    }
    mouse_up(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
            }
            this.flag_add_element = false;
            global.flags.flag_add_element = false;
        }
    }
    build_element() {
        this.wattmeter_0.x = this.p1.x + 2.0 * this.x_space * global.utils.cosine(this.theta_m90);
        this.wattmeter_0.y = this.p1.y + 2.0 * this.y_space * global.utils.sine(this.theta_m90);
        this.wattmeter_1.x = this.wattmeter_0.x + this.x_space * global.utils.cosine(this.theta);
        this.wattmeter_1.y = this.wattmeter_0.y + this.y_space * global.utils.sine(this.theta);
        this.wattmeter_2.x = this.wattmeter_1.x + 0.75 * this.x_space * global.utils.cosine(this.theta - Math.PI);
        this.wattmeter_2.y = this.wattmeter_1.y + 0.75 * this.y_space * global.utils.sine(this.theta - Math.PI);
        this.wattmeter_3.x = this.p2.x + 2.0 * this.x_space * global.utils.cosine(this.theta_m90);
        this.wattmeter_3.y = this.p2.y + 2.0 * this.y_space * global.utils.sine(this.theta_m90);
        this.wattmeter_4.x = this.wattmeter_3.x - this.x_space * global.utils.cosine(this.theta);
        this.wattmeter_4.y = this.wattmeter_3.y - this.y_space * global.utils.sine(this.theta);
        this.wattmeter_5.x = this.wattmeter_4.x + 0.75 * this.x_space * global.utils.cosine(this.theta);
        this.wattmeter_5.y = this.wattmeter_4.y + 0.75 * this.y_space * global.utils.sine(this.theta);
        this.wattmeter_6.x = this.p3.x - this.x_space * global.utils.cosine(this.theta_m90);
        this.wattmeter_6.y = this.p3.y - this.y_space * global.utils.sine(this.theta_m90);
        this.meter_symbol.set_bounds(this.bounds.left + this.bounds.get_width() * 0.4, this.bounds.top + this.bounds.get_height() * 0.4, this.bounds.right - this.bounds.get_width() * 0.4, this.bounds.bottom - this.bounds.get_height() * 0.4);
        this.meter_symbol.resize_symbol(global.CONSTANTS.METER_STYLE_1);
    }
    resize(rect) {
        this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.p1.set_point(this.bounds.left, this.bounds.top);
        this.p2.set_point(this.bounds.left, this.bounds.bottom);
        this.p3.set_point(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.build_element();
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.point_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.text_paint.set_text_size(global.variables.canvas_text_size_4);
    }
    recolor() {
        if (this.flag_add_element) {
            this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
            this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
            this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
            this.meter_symbol.set_color(global.COLORS.SELECTED_COLOR);
        }
        else {
            this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.meter_symbol.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        }
    }
    draw_symbol(canvas, page) {
        this.recolor();
        if (this.page === page) {
            let indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.wattmeter_0.x, this.wattmeter_0.y);
            this.line_buffer[indexer++] = Array(this.wattmeter_0.x, this.wattmeter_0.y, this.wattmeter_1.x, this.wattmeter_1.y);
            this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.wattmeter_3.x, this.wattmeter_3.y);
            this.line_buffer[indexer++] = Array(this.wattmeter_3.x, this.wattmeter_3.y, this.wattmeter_4.x, this.wattmeter_4.y);
            this.line_buffer[indexer++] = Array(this.wattmeter_6.x, this.wattmeter_6.y, this.p3.x, this.p3.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            indexer = 0;
            canvas.draw_circle(this.bounds.get_center_x(), this.bounds.get_center_y(), this.bounds.get_width() * 0.2631, this.line_paint);
            this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.variables.canvas_stroke_width_2);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            this.meter_symbol.draw_symbol(canvas);
            if (this.draw_tag && !global.flags.flag_add_element) {
                this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
                this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
            }
        }
    }
}
