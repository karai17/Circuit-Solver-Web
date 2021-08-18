'use strict';
class MenuBar {
    constructor() {
        let temp_stroke_width = 0.7 * global.variables.canvas_stroke_width_3;
        this.MAX_ICONS = 8;
        if (MOBILE_MODE) {
            this.height_ratio = 0.15;
            temp_stroke_width = 0.85 * global.variables.canvas_stroke_width_3;
        }
        else {
            this.height_ratio = 0.1;
        }
        this.save_x1 = '0.63,0.63,0.775,0.5,0.215,0.375,0.375';
        this.save_y1 = '0.1,0.4,0.4,0.7,0.4,0.4,0.1';
        this.save_x2 = '0.15,0.25,0.25,0.775,0.775,0.875,0.875,0.15';
        this.save_y2 = '0.7,0.7,0.8,0.8,0.7,0.7,0.9,0.9';
        this.go_x = '0.1,0.1,0.9';
        this.go_y = '0.1,0.9,0.5';
        this.undo_x = '0.9,0.7,0.1,0.7,0.9,0.325';
        this.undo_y = '0.1,0.1,0.5,0.9,0.9,0.5';
        this.redo_x = '0.1,0.325,0.9,0.325,0.1,0.7';
        this.redo_y = '0.1,0.1,0.5,0.9,0.9,0.5';
        this.save_image_x0 = '0.10,0.3,0.4,0.6,0.7,0.90,0.90,0.10';
        this.save_image_y0 = '0.2,0.2,0.1,0.1,0.2,0.2,0.9,0.9';
        this.bounds = new RectF(view_port.left, view_port.top, view_port.right, view_port.top + view_port.view_height * this.height_ratio);
        this.temp_bounds = new RectF(0, 0, 0, 0);
        this.menu_icons = [];
        this.REMOVE_ALL_INDEX = 0;
        this.SAVE_INDEX = 1;
        this.SAVE_IMG_INDEX = 2;
        this.UNDO_INDEX = 3;
        this.REDO_INDEX = 4;
        this.GO_INDEX = 5;
        this.ADD_INDEX = 6;
        this.UP_DOWN_INDEX = 7;
        this.escape_interrupt = false;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(temp_stroke_width);
        this.line_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(temp_stroke_width);
        this.fill_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.line_paint_alt = new Paint();
        this.line_paint_alt.set_paint_style(paint.style.STROKE);
        this.line_paint_alt.set_paint_cap(paint.cap.ROUND);
        this.line_paint_alt.set_paint_join(paint.join.ROUND);
        this.line_paint_alt.set_stroke_width(temp_stroke_width);
        this.line_paint_alt.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.line_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.line_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint_alt.set_alpha(255);
        this.line_paint_alt.set_paint_align(paint.align.CENTER);
        this.fill_paint_alt = new Paint();
        this.fill_paint_alt.set_paint_style(paint.style.FILL);
        this.fill_paint_alt.set_paint_cap(paint.cap.ROUND);
        this.fill_paint_alt.set_paint_join(paint.join.ROUND);
        this.fill_paint_alt.set_stroke_width(temp_stroke_width);
        this.fill_paint_alt.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.fill_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint_alt.set_alpha(255);
        this.fill_paint_alt.set_paint_align(paint.align.CENTER);
        this.up_down_paint = new Paint();
        this.up_down_paint.set_paint_style(paint.style.FILL);
        this.up_down_paint.set_paint_cap(paint.cap.ROUND);
        this.up_down_paint.set_paint_join(paint.join.ROUND);
        this.up_down_paint.set_stroke_width(temp_stroke_width);
        this.up_down_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.up_down_paint.set_text_size(global.variables.canvas_text_size_5);
        this.up_down_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.up_down_paint.set_alpha(255);
        this.up_down_paint.set_paint_align(paint.align.CENTER);
        this.add_paint = new Paint();
        this.add_paint.set_paint_style(paint.style.FILL);
        this.add_paint.set_paint_cap(paint.cap.ROUND);
        this.add_paint.set_paint_join(paint.join.ROUND);
        this.add_paint.set_stroke_width(temp_stroke_width);
        this.add_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.add_paint.set_text_size(global.variables.canvas_text_size_5);
        this.add_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.add_paint.set_alpha(255);
        this.add_paint_alt = new Paint();
        this.add_paint_alt.set_paint_align(paint.align.CENTER);
        this.add_paint_alt.set_paint_style(paint.style.STROKE);
        this.add_paint_alt.set_paint_cap(paint.cap.ROUND);
        this.add_paint_alt.set_paint_join(paint.join.ROUND);
        this.add_paint_alt.set_stroke_width(temp_stroke_width);
        this.add_paint_alt.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.add_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.add_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.add_paint_alt.set_alpha(255);
        this.add_paint_alt.set_paint_align(paint.align.CENTER);
        this.go_paint = new Paint();
        this.go_paint.set_paint_style(paint.style.FILL);
        this.go_paint.set_paint_cap(this.go_paint.cap.BUTT);
        this.go_paint.set_paint_join(paint.join.ROUND);
        this.go_paint.set_stroke_width(temp_stroke_width);
        this.go_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.go_paint.set_text_size(global.variables.canvas_text_size_5);
        this.go_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.go_paint.set_alpha(255);
        this.go_paint.set_paint_align(paint.align.CENTER);
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(paint.style.FILL);
        this.hover_paint.set_paint_cap(paint.cap.ROUND);
        this.hover_paint.set_paint_join(paint.join.ROUND);
        this.hover_paint.set_stroke_width(temp_stroke_width);
        this.hover_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
        this.hover_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.hover_paint.set_alpha(255);
        this.hover_paint.set_paint_align(paint.align.CENTER);
        this.undo_paint = new Paint();
        this.undo_paint.set_paint_style(paint.style.FILL);
        this.undo_paint.set_paint_cap(paint.cap.ROUND);
        this.undo_paint.set_paint_join(paint.join.ROUND);
        this.undo_paint.set_stroke_width(temp_stroke_width);
        this.undo_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.undo_paint.set_text_size(global.variables.canvas_text_size_5);
        this.undo_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.undo_paint.set_alpha(255);
        this.undo_paint.set_paint_align(paint.align.CENTER);
        this.redo_paint = new Paint();
        this.redo_paint.set_paint_style(paint.style.FILL);
        this.redo_paint.set_paint_cap(paint.cap.ROUND);
        this.redo_paint.set_paint_join(paint.join.ROUND);
        this.redo_paint.set_stroke_width(temp_stroke_width);
        this.redo_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.redo_paint.set_text_size(global.variables.canvas_text_size_5);
        this.redo_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.redo_paint.set_alpha(255);
        this.redo_paint.set_paint_align(paint.align.CENTER);
        this.remove_all_paint = new Paint();
        this.remove_all_paint.set_paint_style(paint.style.STROKE);
        this.remove_all_paint.set_paint_cap(paint.cap.ROUND);
        this.remove_all_paint.set_paint_join(paint.join.ROUND);
        this.remove_all_paint.set_stroke_width(temp_stroke_width);
        this.remove_all_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.remove_all_paint.set_text_size(global.variables.canvas_text_size_5);
        this.remove_all_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.remove_all_paint.set_alpha(255);
        this.remove_all_paint.set_paint_align(paint.align.CENTER);
        this.settings_paint = new Paint();
        this.settings_paint.set_paint_style(paint.style.STROKE);
        this.settings_paint.set_paint_cap(paint.cap.ROUND);
        this.settings_paint.set_paint_join(paint.join.ROUND);
        this.settings_paint.set_stroke_width(temp_stroke_width);
        this.settings_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.settings_paint.set_text_size(global.variables.canvas_text_size_5);
        this.settings_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.settings_paint.set_alpha(255);
        this.settings_paint.set_paint_align(paint.align.CENTER);
        this.zoom_paint = new Paint();
        this.zoom_paint.set_paint_style(paint.style.STROKE);
        this.zoom_paint.set_paint_cap(paint.cap.ROUND);
        this.zoom_paint.set_paint_join(paint.join.ROUND);
        this.zoom_paint.set_stroke_width(temp_stroke_width);
        this.zoom_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.zoom_paint.set_text_size(global.variables.canvas_text_size_5);
        this.zoom_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.zoom_paint.set_alpha(255);
        this.zoom_paint.set_paint_align(paint.align.CENTER);
        this.save_circuit_paint = new Paint();
        this.save_circuit_paint.set_paint_style(paint.style.FILL);
        this.save_circuit_paint.set_paint_cap(paint.cap.ROUND);
        this.save_circuit_paint.set_paint_join(paint.join.ROUND);
        this.save_circuit_paint.set_stroke_width(temp_stroke_width);
        this.save_circuit_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.save_circuit_paint.set_text_size(global.variables.canvas_text_size_5);
        this.save_circuit_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.save_circuit_paint.set_alpha(255);
        this.save_circuit_paint.set_paint_align(paint.align.CENTER);
        this.save_image_fill_paint = new Paint();
        this.save_image_fill_paint.set_paint_style(paint.style.FILL);
        this.save_image_fill_paint.set_paint_cap(paint.cap.ROUND);
        this.save_image_fill_paint.set_paint_join(paint.join.ROUND);
        this.save_image_fill_paint.set_stroke_width(temp_stroke_width);
        this.save_image_fill_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        this.save_image_fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.save_image_fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.save_image_fill_paint.set_alpha(255);
        this.save_image_fill_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(temp_stroke_width);
        this.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        this.save_ckt_path1 = new Path();
        this.save_ckt_path2 = new Path();
        this.go_path = new Path();
        this.undo_path = new Path();
        this.redo_path = new Path();
        this.save_img_path = new Path();
        this.graph_button = new RectF(0, 0, 0, 0);
        this.settings_button = new RectF(0, 0, 0, 0);
        this.sine_wave = new SineWave(0, 0, 0, 0, 1);
        this.sine_wave.sine_wave_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.sine_wave.resize(global.CONSTANTS.SINE_WAVE_STYLE_1);
        this.base_width = this.bounds.get_width() / this.MAX_ICONS;
        this.load_icons();
        this.element_window = new ElementWindow(this.bounds.left, this.bounds.bottom + (global.variables.canvas_stroke_width_4 >> 1), this.bounds.right, this.bounds.bottom + this.bounds.get_height() - (global.variables.canvas_stroke_width_4 >> 1));
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.line_buffer = [];
        this.pad_w = 0;
        this.pad_h = 0;
        this.width_rshift_3 = 0;
        this.width_rshift_2 = 0;
        this.indexer = 0;
        this.width_mul_0p64 = 0;
        this.height_mul_0p64 = 0;
        this.cached_value = 0;
        this.height_rshift_3 = 0;
    }
    load_icons() {
        this.menu_icons.splice(0, this.menu_icons.length);
        let height = 0;
        for (var i = 0; i < this.MAX_ICONS; i++) {
            this.temp_bounds.left = this.bounds.left + i * ((this.bounds.right - this.bounds.left) / this.MAX_ICONS);
            this.temp_bounds.top = this.bounds.top + global.variables.canvas_stroke_width_4;
            this.temp_bounds.right = this.bounds.left + ((i + 1) * (this.bounds.right - this.bounds.left)) / this.MAX_ICONS;
            this.temp_bounds.bottom = this.bounds.bottom - global.variables.canvas_stroke_width_4;
            height = this.temp_bounds.get_height();
            this.temp_bounds.set_center2(this.temp_bounds.get_center_x(), this.temp_bounds.get_center_y(), height, height);
            this.menu_icons.push(new RectF(this.temp_bounds.left, this.temp_bounds.top, this.temp_bounds.right, this.temp_bounds.bottom));
        }
        this.graph_button.set_bounds(this.menu_icons[this.REMOVE_ALL_INDEX].left, this.menu_icons[this.REMOVE_ALL_INDEX].bottom + 2 * global.variables.canvas_stroke_width_4, this.menu_icons[this.REMOVE_ALL_INDEX].right, this.menu_icons[this.REMOVE_ALL_INDEX].bottom + 3 * global.variables.canvas_stroke_width_4 + this.menu_icons[this.REMOVE_ALL_INDEX].get_height() - global.variables.canvas_stroke_width_4);
        this.settings_button.set_bounds(this.menu_icons[this.REMOVE_ALL_INDEX].left, view_port.bottom - 2.5 * this.menu_icons[this.REMOVE_ALL_INDEX].get_height(), this.menu_icons[this.REMOVE_ALL_INDEX].right, view_port.bottom - 1.5 * this.menu_icons[this.REMOVE_ALL_INDEX].get_height());
        this.sine_wave.set_points(this.graph_button.left + this.graph_button.get_width() * 0.275, this.graph_button.bottom - this.graph_button.get_height() * 0.275, this.graph_button.right - this.graph_button.get_width() * 0.275, this.graph_button.get_center_y() - this.graph_button.get_height() * 0.2);
        this.sine_wave.amplitude = this.graph_button.get_height() * 0.2125;
        this.load_svg();
    }
    load_svg() {
        let holder_x = [];
        let holder_y = [];
        let points = [];
        holder_x = this.save_x1.split(',');
        holder_y = this.save_y1.split(',');
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.SAVE_INDEX].left + this.menu_icons[this.SAVE_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.SAVE_INDEX].top + this.menu_icons[this.SAVE_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.save_ckt_path1.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.save_ckt_path1.move_to(points[i].x, points[i].y);
            }
            else {
                this.save_ckt_path1.line_to(points[i].x, points[i].y);
            }
        }
        this.save_ckt_path1.close();
        holder_x = this.save_x2.split(',');
        holder_y = this.save_y2.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.SAVE_INDEX].left + this.menu_icons[this.SAVE_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.SAVE_INDEX].top + this.menu_icons[this.SAVE_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.save_ckt_path2.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.save_ckt_path2.move_to(points[i].x, points[i].y);
            }
            else {
                this.save_ckt_path2.line_to(points[i].x, points[i].y);
            }
        }
        this.save_ckt_path2.close();
        holder_x = this.go_x.split(',');
        holder_y = this.go_y.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.GO_INDEX].left + this.menu_icons[this.GO_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.GO_INDEX].top + this.menu_icons[this.GO_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.go_path.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.go_path.move_to(points[i].x, points[i].y);
            }
            else {
                this.go_path.line_to(points[i].x, points[i].y);
            }
        }
        this.go_path.close();
        holder_x = this.undo_x.split(',');
        holder_y = this.undo_y.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.UNDO_INDEX].left + this.menu_icons[this.UNDO_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.UNDO_INDEX].top + this.menu_icons[this.UNDO_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.undo_path.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.undo_path.move_to(points[i].x, points[i].y);
            }
            else {
                this.undo_path.line_to(points[i].x, points[i].y);
            }
        }
        this.undo_path.close();
        holder_x = this.redo_x.split(',');
        holder_y = this.redo_y.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.REDO_INDEX].left + this.menu_icons[this.REDO_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.REDO_INDEX].top + this.menu_icons[this.REDO_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.redo_path.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.redo_path.move_to(points[i].x, points[i].y);
            }
            else {
                this.redo_path.line_to(points[i].x, points[i].y);
            }
        }
        this.redo_path.close();
        holder_x = this.save_image_x0.split(',');
        holder_y = this.save_image_y0.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(this.menu_icons[this.SAVE_IMG_INDEX].left + this.menu_icons[this.SAVE_IMG_INDEX].get_width() * parseFloat(holder_x[i]), this.menu_icons[this.SAVE_IMG_INDEX].top + this.menu_icons[this.SAVE_IMG_INDEX].get_height() * parseFloat(holder_y[i])));
        }
        this.save_img_path.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.save_img_path.move_to(points[i].x, points[i].y);
            }
            else {
                this.save_img_path.line_to(points[i].x, points[i].y);
            }
        }
        this.save_img_path.close();
    }
    resize_menu_bar() {
        let temp_stroke_width = 0.7 * global.variables.canvas_stroke_width_3;
        if (MOBILE_MODE) {
            temp_stroke_width = 0.85 * global.variables.canvas_stroke_width_3;
        }
        this.bounds.set_bounds(view_port.left, view_port.top, view_port.right, view_port.top + view_port.view_height * this.height_ratio);
        this.base_width = this.bounds.get_width() / this.MAX_ICONS;
        this.load_icons();
        this.line_paint.set_stroke_width(temp_stroke_width);
        this.line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.line_paint_alt.set_stroke_width(temp_stroke_width);
        this.line_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint.set_stroke_width(temp_stroke_width);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint_alt.set_stroke_width(temp_stroke_width);
        this.fill_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.add_paint.set_stroke_width(temp_stroke_width);
        this.add_paint.set_text_size(global.variables.canvas_text_size_5);
        this.add_paint_alt.set_stroke_width(temp_stroke_width);
        this.add_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.up_down_paint.set_stroke_width(temp_stroke_width);
        this.up_down_paint.set_text_size(global.variables.canvas_text_size_5);
        this.go_paint.set_stroke_width(temp_stroke_width);
        this.go_paint.set_text_size(global.variables.canvas_text_size_5);
        this.hover_paint.set_stroke_width(temp_stroke_width);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
        this.undo_paint.set_stroke_width(temp_stroke_width);
        this.undo_paint.set_text_size(global.variables.canvas_text_size_5);
        this.redo_paint.set_stroke_width(temp_stroke_width);
        this.redo_paint.set_text_size(global.variables.canvas_text_size_5);
        this.text_paint.set_stroke_width(temp_stroke_width);
        this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        this.remove_all_paint.set_stroke_width(temp_stroke_width);
        this.remove_all_paint.set_text_size(global.variables.canvas_text_size_5);
        this.settings_paint.set_stroke_width(temp_stroke_width);
        this.settings_paint.set_text_size(global.variables.canvas_text_size_5);
        this.zoom_paint.set_stroke_width(temp_stroke_width);
        this.zoom_paint.set_text_size(global.variables.canvas_text_size_5);
        this.save_circuit_paint.set_stroke_width(temp_stroke_width);
        this.save_circuit_paint.set_text_size(global.variables.canvas_text_size_5);
        this.save_image_fill_paint.set_stroke_width(temp_stroke_width);
        this.save_image_fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.element_window.resize_window(this.bounds.left, this.bounds.bottom + (global.variables.canvas_stroke_width_4 >> 1), this.bounds.right, this.bounds.bottom + this.bounds.get_height() - (global.variables.canvas_stroke_width_4 >> 1));
        this.sine_wave.resize(global.CONSTANTS.SINE_WAVE_STYLE_1);
        this.sine_wave.sine_wave_paint.set_stroke_width(temp_stroke_width);
    }
    update() {
        if (global.flags.flag_menu_element_toolbox) {
            this.element_window.update();
        }
    }
    mouse_wheel() {
        if (!global.variables.focused && !global.flags.flag_add_element) {
            this.element_window.mouse_wheel();
        }
    }
    mouse_down() {
        if (!global.variables.focused) {
            this.element_window.mouse_down();
            if (global.flags.flag_menu_open) {
                if (this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                    global.variables.component_touched = true;
                }
            }
            else {
                if (this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], false) || this.contains(this.menu_icons[this.UP_DOWN_INDEX], true)) {
                    global.variables.component_touched = true;
                }
            }
            if (this.contains(this.graph_button, false) || this.contains(this.settings_button, false)) {
                global.variables.component_touched = true;
            }
            this.first_touch_x = global.variables.mouse_x;
            this.first_touch_y = global.variables.mouse_y;
        }
    }
    mouse_move() {
        if (!global.variables.focused) {
            this.element_window.mouse_move();
        }
    }
    mouse_up() {
        if (!global.variables.is_right_click && !this.escape_interrupt) {
            if (!global.variables.mouse_keyboard_lock && !multi_select_manager.ctrl_pressed && global.variables.component_touched) {
                this.cached_value = this.base_width;
                if (this.contains(this.menu_icons[this.UP_DOWN_INDEX], true) &&
                    this.menu_icons[this.UP_DOWN_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_zoom &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_remove_all &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options) {
                        if (global.flags.flag_menu_open) {
                            this.handle_menu_open_flag(!global.flags.flag_menu_open);
                            global.variables.component_touched = true;
                        }
                        else {
                            if (this.contains(this.menu_icons[this.UP_DOWN_INDEX], false)) {
                                this.handle_menu_open_flag(!global.flags.flag_menu_open);
                                global.variables.component_touched = true;
                            }
                        }
                    }
                }
                else if (((this.contains(this.menu_icons[this.ADD_INDEX], true) &&
                    this.menu_icons[this.ADD_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) ||
                    (!this.contains(this.element_window.bounds, false) && global.flags.flag_menu_element_toolbox)) &&
                    !global.flags.flag_graph &&
                    !global.flags.flag_add_element) {
                    if (!global.flags.flag_zoom &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_remove_all &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_add_element &&
                        !global.flags.flag_simulating) {
                        if (global.flags.flag_menu_open) {
                            if (this.contains(this.menu_icons[this.ADD_INDEX], true)) {
                                this.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
                                global.variables.component_touched = true;
                            }
                            else {
                                if (global.flags.flag_menu_element_toolbox && !global.flags.flag_add_element && !this.element_window.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                                    this.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
                                    global.variables.component_touched = true;
                                }
                            }
                        }
                    }
                }
                else if (this.contains(this.graph_button, false) ||
                    (!this.contains(graph_window.bounds, false) &&
                        ((!this.contains(this.menu_icons[this.GO_INDEX], true) && global.flags.flag_graph) || (this.contains(this.menu_icons[this.GO_INDEX], true) && !global.flags.flag_menu_open)))) {
                    if (this.contains(this.graph_button, false) && this.graph_button.contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                        if (!global.flags.flag_save_image &&
                            !global.flags.flag_save_circuit &&
                            !global.flags.flag_zoom &&
                            !global.flags.flag_element_options &&
                            !global.flags.flag_element_options_edit &&
                            !global.flags.flag_select_element &&
                            !global.flags.flag_select_timestep &&
                            !global.flags.flag_select_settings &&
                            !global.flags.flag_remove_all &&
                            !global.flags.flag_menu_element_toolbox) {
                            this.handle_graph_flag(!global.flags.flag_graph);
                            global.variables.component_touched = true;
                        }
                    }
                    else {
                        if (global.flags.flag_graph) {
                            if (!global.flags.flag_save_image &&
                                !global.flags.flag_save_circuit &&
                                !global.flags.flag_zoom &&
                                !global.flags.flag_element_options &&
                                !global.flags.flag_element_options_edit &&
                                !global.flags.flag_select_element &&
                                !global.flags.flag_select_timestep &&
                                !global.flags.flag_select_settings &&
                                !global.flags.flag_remove_all &&
                                !global.flags.flag_menu_element_toolbox &&
                                !graph_window.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                                this.handle_graph_flag(!global.flags.flag_graph);
                                global.variables.component_touched = true;
                            }
                        }
                    }
                }
                else if (this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], true)) {
                    if (!global.flags.flag_menu_open) {
                        if (this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], false) &&
                            this.menu_icons[this.REMOVE_ALL_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                            if (!global.flags.flag_save_image &&
                                !global.flags.flag_save_circuit &&
                                !global.flags.flag_element_options &&
                                !global.flags.flag_element_options_edit &&
                                !global.flags.flag_graph &&
                                !global.flags.flag_select_element &&
                                !global.flags.flag_select_timestep &&
                                !global.flags.flag_select_settings &&
                                !global.flags.flag_remove_all &&
                                !global.flags.flag_menu_open &&
                                !global.flags.flag_zoom) {
                                this.handle_zoom_flag(!global.flags.flag_zoom);
                                global.variables.component_touched = true;
                            }
                        }
                    }
                    else {
                        if (!global.flags.flag_simulating &&
                            !global.flags.flag_save_image &&
                            !global.flags.flag_save_circuit &&
                            !global.flags.flag_zoom &&
                            !global.flags.flag_element_options &&
                            !global.flags.flag_element_options_edit &&
                            !global.flags.flag_graph &&
                            !global.flags.flag_select_element &&
                            !global.flags.flag_select_timestep &&
                            !global.flags.flag_select_settings &&
                            !global.flags.flag_remove_all &&
                            global.flags.flag_menu_open &&
                            !global.flags.flag_menu_element_toolbox &&
                            this.menu_icons[this.REMOVE_ALL_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                            this.handle_remove_all_flag(!global.flags.flag_remove_all);
                            global.variables.component_touched = true;
                        }
                    }
                }
                else if (this.contains(this.settings_button, false) && this.settings_button.contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_simulating &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all) {
                        this.handle_select_settings_flag(!global.flags.flag_select_settings);
                        global.variables.component_touched = true;
                    }
                }
                else if (this.contains(this.menu_icons[this.SAVE_INDEX], true) &&
                    this.menu_icons[this.SAVE_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all &&
                        global.flags.flag_menu_open &&
                        !global.flags.flag_menu_element_toolbox) {
                        this.handle_save_circuit_flag(!global.flags.flag_save_circuit);
                        global.variables.component_touched = true;
                    }
                }
                else if (this.contains(this.menu_icons[this.SAVE_IMG_INDEX], true) &&
                    this.menu_icons[this.SAVE_IMG_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all &&
                        global.flags.flag_menu_open &&
                        !global.flags.flag_menu_element_toolbox) {
                        this.handle_save_image_flag(!global.flags.flag_save_image);
                        global.variables.component_touched = true;
                    }
                }
                else if (this.contains(this.menu_icons[this.UNDO_INDEX], true) &&
                    this.menu_icons[this.UNDO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_simulating &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all &&
                        global.flags.flag_menu_open &&
                        !global.flags.flag_menu_element_toolbox) {
                        this.handle_undo_flag();
                        global.variables.component_touched = true;
                    }
                }
                else if (this.contains(this.menu_icons[this.REDO_INDEX], true) &&
                    this.menu_icons[this.REDO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_simulating &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all &&
                        global.flags.flag_menu_open &&
                        !global.flags.flag_menu_element_toolbox) {
                        this.handle_redo_flag();
                        global.variables.component_touched = true;
                    }
                }
                else if (this.contains(this.menu_icons[this.GO_INDEX], true) &&
                    this.menu_icons[this.GO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.cached_value, this.bounds.get_height())) {
                    if (!global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_remove_all &&
                        global.flags.flag_menu_open &&
                        !global.flags.flag_menu_element_toolbox) {
                        this.handle_simulation_flag(!global.flags.flag_simulating);
                        global.variables.component_touched = true;
                    }
                }
                this.element_window.mouse_up();
            }
            else if (!global.variables.mouse_keyboard_lock && !multi_select_manager.ctrl_pressed) {
                if ((this.contains(this.menu_icons[this.ADD_INDEX], true) || (!this.contains(this.element_window.bounds, false) && global.flags.flag_menu_element_toolbox)) &&
                    !global.flags.flag_graph &&
                    !global.flags.flag_add_element) {
                    if (!global.flags.flag_zoom &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_element &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_remove_all &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_add_element &&
                        !global.flags.flag_simulating) {
                        if (global.flags.flag_menu_open) {
                            if (this.contains(this.menu_icons[this.ADD_INDEX], true)) {
                                this.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
                                global.variables.component_touched = true;
                            }
                            else {
                                if (global.flags.flag_menu_element_toolbox && !global.flags.flag_add_element) {
                                    this.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
                                    global.variables.component_touched = true;
                                }
                            }
                        }
                    }
                }
                this.element_window.mouse_up();
            }
        }
        if (this.escape_interrupt) {
            this.escape_interrupt = false;
        }
    }
    handle_element_options_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_element_options = ON;
        if (ON) {
            element_options_window.title_bounds.text = global.variables.selected_properties['tag'] + global.variables.selected_id;
        }
    }
    handle_element_options_edit_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        if (ON) {
            element_options_edit_window.reset_cursor();
        }
        engine_functions.rebuild_all_elements();
        global.flags.flag_element_options_edit = ON;
    }
    handle_undo_flag() {
        global.variables.mouse_keyboard_lock = true;
        history_manager.undo();
    }
    handle_redo_flag() {
        global.variables.mouse_keyboard_lock = true;
        history_manager.redo();
    }
    handle_menu_open_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_menu_open = ON;
        if (!ON) {
            global.flags.flag_menu_element_toolbox = ON;
        }
    }
    handle_menu_open_down_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_menu_element_toolbox = ON;
    }
    handle_save_image_flag(ON) {
        if (ON) {
            save_image_window.input_button.text = global.variables.user_file.title;
            save_image_window.reset_cursor();
        }
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_save_image = ON;
    }
    handle_save_circuit_flag(ON) {
        if (ON) {
            save_circuit_window.input_button.text = global.variables.user_file.title;
            save_circuit_window.reset_cursor();
        }
        else {
            global.utils.push_history();
        }
        bottom_menu.resize_bottom_menu();
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_save_circuit = ON;
    }
    handle_select_settings_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_select_settings = ON;
    }
    handle_simulation_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_simulating = ON;
        if (ON) {
            simulation_manager.setup();
        }
        else {
            simulation_manager.terminate();
        }
    }
    handle_graph_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_graph = ON;
    }
    handle_remove_all_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        confirm_window.reset_tab();
        global.flags.flag_remove_all = ON;
    }
    handle_zoom_flag(ON) {
        global.variables.mouse_keyboard_lock = true;
        global.flags.flag_zoom = ON;
    }
    key_down(key_event) {
        if (global.flags.flag_menu_open) {
            if (!global.flags.flag_zoom &&
                !global.flags.flag_save_image &&
                !global.flags.flag_save_circuit &&
                !global.flags.flag_select_element &&
                !global.flags.flag_select_settings &&
                !global.flags.flag_select_timestep &&
                !global.flags.flag_remove_all &&
                !global.flags.flag_element_options_edit &&
                !global.flags.flag_element_options &&
                !global.flags.flag_add_element &&
                !global.flags.flag_simulating) {
                if (global.flags.flag_menu_open) {
                    if (global.flags.flag_menu_element_toolbox && !global.flags.flag_add_element) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
                            this.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
                            global.variables.component_touched = true;
                        }
                    }
                }
            }
        }
    }
    contains(rect, adjust) {
        if (!adjust) {
            return rect.contains_xy(global.variables.mouse_x, global.variables.mouse_y);
        }
        else {
            return rect.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.base_width, this.bounds.get_height());
        }
    }
    recolor() {
        if (global.flags.flag_simulating) {
            this.go_paint.set_color(global.COLORS.MENU_ICON_ACTIVE_COLOR);
        }
        else {
            if (!global.flags.flag_menu_element_toolbox) {
                this.go_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
            }
            else {
                this.go_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        if (global.flags.flag_graph) {
            this.sine_wave.sine_wave_paint.set_color(global.COLORS.MENU_ICON_ACTIVE_COLOR);
        }
        else {
            this.sine_wave.sine_wave_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        }
        if (history_manager.history_index > 0) {
            if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
                this.undo_paint.set_color(global.COLORS.MENU_ICON_ACTIVE_COLOR);
            }
            else {
                this.undo_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        else {
            if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
                this.undo_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
            }
            else {
                this.undo_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        if (history_manager.history_index < history_manager.history.length - 1) {
            if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
                this.redo_paint.set_color(global.COLORS.MENU_ICON_ACTIVE_COLOR);
            }
            else {
                this.redo_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        else {
            if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
                this.redo_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
            }
            else {
                this.redo_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        if (global.flags.flag_menu_element_toolbox) {
            if (!global.flags.flag_simulating && !global.flags.flag_graph) {
                this.add_paint.set_color(global.COLORS.MENU_ICON_ACTIVE_COLOR);
            }
            else {
                this.add_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        else {
            if (!global.flags.flag_simulating && !global.flags.flag_graph) {
                this.add_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
            }
            else {
                this.add_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        if (global.flags.flag_menu_open) {
            if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
                this.remove_all_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
            }
            else {
                this.remove_all_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            }
        }
        if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
            this.settings_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        }
        else {
            this.settings_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
        }
        if (!global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
            this.zoom_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        }
        else {
            this.zoom_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
        }
        if (!global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
            this.save_circuit_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        }
        else {
            this.save_circuit_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
        }
        if (!global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
            this.save_image_fill_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
        }
        else {
            this.save_image_fill_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
        }
    }
    draw_menu_bar(canvas) {
        if (!global.flags.flag_add_element) {
            this.recolor();
            if (global.flags.flag_menu_open) {
                if (global.flags.flag_menu_element_toolbox) {
                    if (!MOBILE_MODE) {
                        canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
                    }
                }
                canvas.draw_rect2(this.bounds, this.fill_paint);
                if (!global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_remove_all &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_zoom &&
                    !multi_select_manager.ctrl_pressed_started &&
                    !MOBILE_MODE) {
                    this.cached_value = this.base_width;
                    for (var i = 0; i < this.menu_icons.length; i++) {
                        if (this.menu_icons[i].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.cached_value, this.bounds.get_height())) {
                            canvas.draw_rect3(this.menu_icons[i].get_center_x(), this.menu_icons[i].get_center_y(), this.cached_value, this.bounds.get_height(), this.hover_paint);
                        }
                    }
                }
                this.width_mul_0p64 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.64;
                this.height_mul_0p64 = this.menu_icons[this.REMOVE_ALL_INDEX].get_height() * 0.64;
                canvas.draw_arc3(this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x(), this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y(), 0.45 * this.menu_icons[this.REMOVE_ALL_INDEX].get_width(), -25, 290, this.remove_all_paint);
                this.indexer = 0;
                this.line_buffer = [];
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.REMOVE_ALL_INDEX].left + this.width_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].top + this.height_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].right - this.width_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].bottom - this.height_mul_0p64);
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.REMOVE_ALL_INDEX].right - this.width_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].top + this.height_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].left + this.width_mul_0p64, this.menu_icons[this.REMOVE_ALL_INDEX].bottom - this.height_mul_0p64);
                canvas.draw_line_buffer(this.line_buffer, this.remove_all_paint);
                this.indexer = 0;
                this.line_buffer = [];
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('X', this.menu_icons[this.REMOVE_ALL_INDEX].left, this.menu_icons[this.REMOVE_ALL_INDEX].top, this.text_paint);
                }
                canvas.draw_path(this.save_ckt_path1.path_2d, this.save_circuit_paint);
                canvas.draw_path(this.save_ckt_path2.path_2d, this.save_circuit_paint);
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('S', this.menu_icons[this.SAVE_INDEX].left, this.menu_icons[this.SAVE_INDEX].top, this.text_paint);
                }
                canvas.draw_path(this.save_img_path.path_2d, this.save_image_fill_paint);
                canvas.draw_circle(this.menu_icons[this.SAVE_IMG_INDEX].get_center_x(), this.menu_icons[this.SAVE_IMG_INDEX].get_center_y(), this.menu_icons[this.SAVE_IMG_INDEX].get_width() >> 3, this.fill_paint_alt);
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('I', this.menu_icons[this.SAVE_IMG_INDEX].left, this.menu_icons[this.SAVE_IMG_INDEX].top, this.text_paint);
                }
                this.width_rshift_3 = this.menu_icons[this.ADD_INDEX].get_width() >> 3;
                this.height_rshift_3 = this.menu_icons[this.ADD_INDEX].get_height() >> 3;
                canvas.draw_rect3(this.menu_icons[this.ADD_INDEX].get_center_x(), this.menu_icons[this.ADD_INDEX].get_center_y(), this.menu_icons[this.ADD_INDEX].get_width() * 0.85, this.menu_icons[this.ADD_INDEX].get_height() * 0.85, this.add_paint);
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.ADD_INDEX].get_center_x() - this.width_rshift_3, this.menu_icons[this.ADD_INDEX].get_center_y(), this.menu_icons[this.ADD_INDEX].get_center_x() + this.width_rshift_3, this.menu_icons[this.ADD_INDEX].get_center_y());
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.ADD_INDEX].get_center_x(), this.menu_icons[this.ADD_INDEX].get_center_y() - this.height_rshift_3, this.menu_icons[this.ADD_INDEX].get_center_x(), this.menu_icons[this.ADD_INDEX].get_center_y() + this.height_rshift_3);
                canvas.draw_line_buffer(this.line_buffer, this.add_paint_alt);
                this.indexer = 0;
                this.line_buffer = [];
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('N', this.menu_icons[this.ADD_INDEX].left, this.menu_icons[this.ADD_INDEX].top, this.text_paint);
                }
                if (!global.flags.flag_simulating) {
                    canvas.draw_path(this.go_path.path_2d, this.go_paint);
                }
                else {
                    this.pad_w = this.menu_icons[this.GO_INDEX].get_width() * 0.333;
                    this.pad_h = this.menu_icons[this.GO_INDEX].get_height() * 0.333;
                    canvas.draw_rect(this.menu_icons[this.GO_INDEX].get_center_x() - this.pad_w, this.menu_icons[this.GO_INDEX].get_center_y() - this.pad_h, this.menu_icons[this.GO_INDEX].get_center_x() + this.pad_w, this.menu_icons[this.GO_INDEX].get_center_y() + this.pad_h, this.go_paint);
                }
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('A', this.menu_icons[this.GO_INDEX].left, this.menu_icons[this.GO_INDEX].top, this.text_paint);
                }
                canvas.draw_path(this.undo_path.path_2d, this.undo_paint);
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('Z', this.menu_icons[this.UNDO_INDEX].left, this.menu_icons[this.UNDO_INDEX].top, this.text_paint);
                }
                canvas.draw_path(this.redo_path.path_2d, this.redo_paint);
                if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                    canvas.draw_text('Y', this.menu_icons[this.REDO_INDEX].left, this.menu_icons[this.REDO_INDEX].top, this.text_paint);
                }
                canvas.draw_arrow(this.menu_icons[this.UP_DOWN_INDEX].get_center_x(), this.menu_icons[this.UP_DOWN_INDEX].get_center_y(), this.menu_icons[this.UP_DOWN_INDEX].get_width() * 0.4, true, this.up_down_paint);
            }
            else {
                this.indexer = 0;
                this.line_buffer = [];
                canvas.draw_circle3(this.menu_icons[this.REMOVE_ALL_INDEX], 1.15, this.fill_paint);
                if (this.menu_icons[this.REMOVE_ALL_INDEX].contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_simulating &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_graph &&
                    !global.flags.flag_remove_all &&
                    !multi_select_manager.ctrl_pressed_started &&
                    !MOBILE_MODE) {
                    canvas.draw_circle3(this.menu_icons[this.REMOVE_ALL_INDEX], 1.15, this.hover_paint);
                }
                canvas.draw_circle3(this.menu_icons[this.UP_DOWN_INDEX], 1.15, this.fill_paint);
                if (this.menu_icons[this.UP_DOWN_INDEX].contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_remove_all &&
                    !multi_select_manager.ctrl_pressed_started &&
                    !MOBILE_MODE) {
                    canvas.draw_circle3(this.menu_icons[this.UP_DOWN_INDEX], 1.15, this.hover_paint);
                }
                canvas.draw_arrow(this.menu_icons[this.UP_DOWN_INDEX].get_center_x(), this.menu_icons[this.UP_DOWN_INDEX].get_center_y(), this.menu_icons[this.UP_DOWN_INDEX].get_width() * 0.3, false, this.up_down_paint);
                this.pad_w = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.075;
                this.pad_h = this.menu_icons[this.REMOVE_ALL_INDEX].get_height() * 0.075;
                this.width_rshift_3 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 3;
                this.width_rshift_2 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 2;
                this.line_buffer = [];
                this.indexer = 0;
                canvas.draw_circle(this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - this.width_rshift_3, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - this.width_rshift_3, this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.2, this.zoom_paint);
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() + (this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 4), this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() + (this.menu_icons[this.REMOVE_ALL_INDEX].get_height() >> 4), this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() + this.width_rshift_2, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() + this.width_rshift_2);
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - this.width_rshift_3 - this.pad_w, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - this.width_rshift_3, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - this.width_rshift_3 + this.pad_w, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - this.width_rshift_3);
                this.line_buffer[this.indexer++] = Array(this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - this.width_rshift_3, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - this.width_rshift_3 - this.pad_h, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - this.width_rshift_3, this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - this.width_rshift_3 + this.pad_h);
                canvas.draw_line_buffer(this.line_buffer, this.zoom_paint);
            }
            if (!global.flags.flag_menu_element_toolbox) {
                this.indexer = 0;
                this.line_buffer = [];
                canvas.draw_circle3(this.graph_button, 1.15, this.fill_paint);
                if (this.graph_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_remove_all &&
                    !multi_select_manager.ctrl_pressed_started &&
                    !MOBILE_MODE) {
                    canvas.draw_circle3(this.graph_button, 1.15, this.hover_paint);
                }
                this.sine_wave.draw_sine_wave(canvas, 1);
                this.pad_w = 0.25;
                this.pad_h = 0.25;
                this.line_buffer[this.indexer++] = Array(this.graph_button.left + this.graph_button.get_width() * this.pad_w, this.graph_button.top + this.graph_button.get_height() * 1.1 * this.pad_h, this.graph_button.left + this.graph_button.get_width() * this.pad_w, this.graph_button.bottom - this.graph_button.get_height() * this.pad_h);
                this.line_buffer[this.indexer++] = Array(this.graph_button.left + this.graph_button.get_width() * this.pad_w, this.graph_button.bottom - this.graph_button.get_height() * this.pad_h, this.graph_button.right - this.graph_button.get_width() * 1.1 * this.pad_w, this.graph_button.bottom - this.graph_button.get_height() * this.pad_h);
                canvas.draw_line_buffer(this.line_buffer, this.sine_wave.sine_wave_paint);
            }
        }
        canvas.draw_circle3(this.settings_button, 1.15, this.fill_paint);
        if (this.settings_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
            !global.flags.flag_menu_element_toolbox &&
            !global.flags.flag_simulating &&
            !global.flags.flag_zoom &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_element_options &&
            !global.flags.flag_graph &&
            !global.flags.flag_remove_all &&
            !multi_select_manager.ctrl_pressed_started &&
            !MOBILE_MODE) {
            canvas.draw_circle3(this.settings_button, 1.15, this.hover_paint);
        }
        let width_cache = this.settings_button.get_width();
        let height_cache = this.settings_button.get_height();
        let padding_cache_w = width_cache * 0.25;
        let padding_cache_h = height_cache * 0.25;
        this.indexer = 0;
        this.line_buffer = [];
        this.line_buffer[this.indexer++] = Array(this.settings_button.left + padding_cache_w, this.settings_button.top + padding_cache_h, this.settings_button.right - padding_cache_w, this.settings_button.top + padding_cache_h);
        this.line_buffer[this.indexer++] = Array(this.settings_button.left + padding_cache_w, this.settings_button.get_center_y(), this.settings_button.right - padding_cache_w, this.settings_button.get_center_y());
        this.line_buffer[this.indexer++] = Array(this.settings_button.left + padding_cache_w, this.settings_button.bottom - padding_cache_h, this.settings_button.right - padding_cache_w, this.settings_button.bottom - padding_cache_h);
        canvas.draw_line_buffer(this.line_buffer, this.settings_paint);
        canvas.draw_circle(this.settings_button.left + padding_cache_w + (width_cache - (padding_cache_w << 1)) * 0.2, this.settings_button.top + padding_cache_h, padding_cache_w * 0.2, this.settings_paint);
        canvas.draw_circle(this.settings_button.left + padding_cache_w + (width_cache - (padding_cache_w << 1)) * 0.8, this.settings_button.get_center_y(), padding_cache_w * 0.2, this.settings_paint);
        canvas.draw_circle(this.settings_button.left + padding_cache_w + (width_cache - (padding_cache_w << 1)) * 0.2, this.settings_button.bottom - padding_cache_h, padding_cache_w * 0.2, this.settings_paint);
        if (!global.flags.flag_add_element) {
            this.element_window.draw_window(canvas);
        }
    }
}
