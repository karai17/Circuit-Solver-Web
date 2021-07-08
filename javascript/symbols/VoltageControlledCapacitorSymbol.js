'use strict';
class VoltageControlledCapacitorSymbol {
    constructor(rect, index, page) {
        this.index = index;
        this.page = page;
        this.bounds = new RectF(0, 0, 0, 0);
        if (global.utils.not_null(rect)) {
            this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        }
        this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
        this.p2 = new PointF(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
        this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
        this.vcca_0 = new PointF(0, 0);
        this.vcca_1 = new PointF(0, 0);
        this.vcca_2 = new PointF(0, 0);
        this.vcca_3 = new PointF(0, 0);
        this.vcca_4 = new PointF(0, 0);
        this.vcca_6 = new PointF(0, 0);
        this.vcca_5 = new PointF(0, 0);
        this.vcca_7 = new PointF(0, 0);
        this.vcca_8 = new PointF(0, 0);
        this.vcca_9 = new PointF(0, 0);
        this.vcca_10 = new PointF(0, 0);
        this.vcca_11 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
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
        this.build_element();
        this.flag_add_element = false;
        this.TAG = language_manager.TAG_VCCA;
        this.draw_tag = false;
        this.text_bounds = new RectF(0, 0, 0, 0);
        this.height_ratio = 0.35;
        this.line_buffer = [];
        this.circle_buffer = [];
    }
    update() {
        if (this.flag_add_element && !global.flags.flag_history_lock && global.flags.flag_add_element && global.variables.component_touched) {
            if (workspace.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, workspace.bounds.get_width() - 4.5 * global.variables.node_space_x, workspace.bounds.get_height() - 4.5 * global.variables.node_space_y) &&
                !this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
                global.flags.flag_history_lock = true;
                engine_functions.add_vcca();
                this.flag_add_element = false;
            }
        }
    }
    mouse_down(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
                if (!this.flag_add_element && !global.flags.flag_history_lock && !global.flags.flag_add_element && !global.variables.component_touched) {
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
        if (this.page === page) {
            this.update();
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
        let cache_0 = 0.75 * this.x_space;
        let cache_1 = 0.667 * this.x_space;
        let cache_2 = 0.75 * this.y_space;
        let cache_3 = 0.667 * this.y_space;
        let cache_8 = this.x_space;
        let cache_9 = this.y_space;
        this.connect1_x = this.c_x - cache_0 * global.utils.cosine(this.theta);
        this.connect1_y = this.c_y - cache_2 * global.utils.sine(this.theta);
        this.connect2_x = this.c_x + cache_0 * global.utils.cosine(this.theta);
        this.connect2_y = this.c_y + cache_2 * global.utils.sine(this.theta);
        this.vcca_4.x = this.c_x + cache_0 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(this.theta_m90);
        this.vcca_4.y = this.c_y + cache_2 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
        this.vcca_5.x = this.c_x - cache_0 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(this.theta_m90);
        this.vcca_5.y = this.c_y - cache_2 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
        this.vcca_6.x = this.c_x + cache_0 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(Math.PI + this.theta_m90);
        this.vcca_6.y = this.c_y + cache_2 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(Math.PI + this.theta_m90);
        this.vcca_7.x = this.c_x - cache_0 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(Math.PI + this.theta_m90);
        this.vcca_7.y = this.c_y - cache_2 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(Math.PI + this.theta_m90);
        this.vcca_8.x = this.p1.x + 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
        this.vcca_8.y = this.p1.y + 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
        this.vcca_9.x = this.p3.x - 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
        this.vcca_9.y = this.p3.y - 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
        this.theta = global.utils.retrieve_angle_radian(this.vcca_9.x - this.vcca_8.x, this.vcca_9.y - this.vcca_8.y);
        this.vcca_10.x = this.vcca_9.x - 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
        this.vcca_10.y = this.vcca_9.y - 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
        this.vcca_11.x = this.vcca_9.x - 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
        this.vcca_11.y = this.vcca_9.y - 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
        this.theta = global.utils.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
        this.vcca_1.x = this.p2.x + 0.8 * cache_8 * global.utils.cosine(this.phi);
        this.vcca_1.y = this.p2.y + 0.8 * cache_9 * global.utils.sine(this.phi);
        this.vcca_2.x = this.vcca_1.x + 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
        this.vcca_2.y = this.vcca_1.y + 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
        this.vcca_3.x = this.vcca_1.x + 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
        this.vcca_3.y = this.vcca_1.y + 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
    }
    resize(rect) {
        this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
        this.p2.set_point(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
        this.p3.set_point(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
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
        }
        else {
            this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        }
    }
    draw_symbol(canvas, page) {
        this.recolor();
        if (this.page === page) {
            let indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[indexer++] = Array(this.vcca_5.x, this.vcca_5.y, this.vcca_7.x, this.vcca_7.y);
            this.line_buffer[indexer++] = Array(this.vcca_6.x, this.vcca_6.y, this.vcca_4.x, this.vcca_4.y);
            this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[indexer++] = Array(this.connect2_x, this.connect2_y, this.p3.x, this.p3.y);
            this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.vcca_1.x, this.vcca_1.y);
            this.line_buffer[indexer++] = Array(this.vcca_2.x, this.vcca_2.y, this.vcca_1.x, this.vcca_1.y);
            this.line_buffer[indexer++] = Array(this.vcca_3.x, this.vcca_3.y, this.vcca_1.x, this.vcca_1.y);
            this.line_buffer[indexer++] = Array(this.vcca_9.x, this.vcca_9.y, this.vcca_8.x, this.vcca_8.y);
            this.line_buffer[indexer++] = Array(this.vcca_9.x, this.vcca_9.y, this.vcca_10.x, this.vcca_10.y);
            this.line_buffer[indexer++] = Array(this.vcca_9.x, this.vcca_9.y, this.vcca_11.x, this.vcca_11.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            indexer = 0;
            this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.variables.canvas_stroke_width_2);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (this.draw_tag && !global.flags.flag_add_element) {
                this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
                this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
            }
        }
    }
}
