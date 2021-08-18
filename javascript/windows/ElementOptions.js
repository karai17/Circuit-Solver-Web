'use strict';
class ElementOptions {
    constructor() {
        let temp_stroke_width = 0.65 * global.variables.canvas_stroke_width_3;
        this.MAX_ICONS = 8;
        if (MOBILE_MODE) {
            temp_stroke_width = 0.85 * global.variables.canvas_stroke_width_3;
        }
        this.mb_x = menu_bar.menu_icons[menu_bar.UP_DOWN_INDEX].get_center_x();
        this.mb_width = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_width();
        this.mb_height = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_height();
        this.option_0 = new RectF(this.mb_x - this.mb_width * 0.5, menu_bar.bounds.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, menu_bar.bounds.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_1 = new RectF(this.mb_x - this.mb_width * 0.5, this.option_0.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_0.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_2 = new RectF(this.mb_x - this.mb_width * 0.5, this.option_1.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_1.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_3 = new RectF(this.mb_x - this.mb_width * 0.5, this.option_2.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_2.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.show_0 = false;
        this.show_1 = false;
        this.show_2 = false;
        this.show_3 = false;
        this.edit_path0 = new Path();
        this.trash_path0 = new Path();
        this.trash_path1 = new Path();
        this.flip_path0 = new Path();
        this.flip_path1 = new Path();
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(temp_stroke_width);
        this.line_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.line_paint_alt = new Paint();
        this.line_paint_alt.set_paint_style(paint.style.STROKE);
        this.line_paint_alt.set_paint_cap(paint.cap.ROUND);
        this.line_paint_alt.set_paint_join(paint.join.ROUND);
        this.line_paint_alt.set_stroke_width(temp_stroke_width);
        this.line_paint_alt.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.line_paint_alt.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint_alt.set_alpha(255);
        this.line_paint_alt.set_paint_align(paint.align.CENTER);
        this.meter_line_paint = new Paint();
        this.meter_line_paint.set_paint_style(paint.style.STROKE);
        this.meter_line_paint.set_paint_cap(paint.cap.ROUND);
        this.meter_line_paint.set_paint_join(paint.join.ROUND);
        this.meter_line_paint.set_stroke_width(temp_stroke_width);
        this.meter_line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.meter_line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.meter_line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.meter_line_paint.set_alpha(255);
        this.meter_line_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.line_paint.align.RIGHT);
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
        this.icon_paint = new Paint();
        this.icon_paint.set_paint_style(paint.style.FILL);
        this.icon_paint.set_paint_cap(paint.cap.ROUND);
        this.icon_paint.set_paint_join(paint.join.ROUND);
        this.icon_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.icon_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.icon_paint.set_text_size(global.variables.canvas_text_size_4);
        this.icon_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.icon_paint.set_alpha(255);
        this.icon_paint.set_paint_align(paint.align.CENTER);
        this.ROTATE_ICON = 0;
        this.EDIT_ICON = 1;
        this.FLIP_ICON = 2;
        this.TRASH_ICON = 3;
        this.WIRE_ICON = 4;
        this.EYE_ICON = 5;
        this.NO_ICON = -1;
        this.opts = {
            c0: this.NO_ICON,
            c1: this.NO_ICON,
            c2: this.NO_ICON,
            c3: this.NO_ICON
        };
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.cached_width = 0;
        this.cached_height = 0;
        this.width_mul_0p125 = 0;
        this.height_mul_0p125 = 0;
    }
    set_show(show_0, show_1, show_2, show_3) {
        this.show_0 = show_0;
        this.show_1 = show_1;
        this.show_2 = show_2;
        this.show_3 = show_3;
    }
    load_edit_svg(rect) {
        let holder_x = [];
        let holder_y = [];
        let edit_x0 = '0.746,0.274,0.114,0.112,0.584';
        let edit_y0 = '0.406,0.874,0.876,0.734,0.264';
        let padding = 0.1;
        let offset_x = rect.get_width() * 0.1;
        let offset_y = rect.get_height() * -0.07;
        holder_x = edit_x0.split(',');
        holder_y = edit_y0.split(',');
        let points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(rect.left + padding * rect.get_width() + rect.get_width() * (1.0 - 2 * padding) * parseFloat(holder_x[i]) + offset_x, rect.top + padding * rect.get_height() + rect.get_height() * (1.0 - 2 * padding) * parseFloat(holder_y[i]) + offset_y));
        }
        this.edit_path0.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.edit_path0.move_to(points[i].x, points[i].y);
            }
            else {
                this.edit_path0.line_to(points[i].x, points[i].y);
            }
        }
        this.edit_path0.close();
    }
    load_trash_svg(rect) {
        let holder_x = [];
        let holder_y = [];
        let trash_x0 = '0.28,0.72,0.72,0.28';
        let trash_y0 = '0.4,0.4,0.75,0.75';
        let trash_x1 = '0.28,0.45,0.45,0.55,0.55,0.72,0.72,0.28';
        let trash_y1 = '0.27,0.27,0.21,0.21,0.27,0.27,0.325,0.325';
        holder_x = trash_x0.split(',');
        holder_y = trash_y0.split(',');
        let points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
        }
        this.trash_path0.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.trash_path0.move_to(points[i].x, points[i].y);
            }
            else {
                this.trash_path0.line_to(points[i].x, points[i].y);
            }
        }
        this.trash_path0.close();
        holder_x = trash_x1.split(',');
        holder_y = trash_y1.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
        }
        this.trash_path1.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.trash_path1.move_to(points[i].x, points[i].y);
            }
            else {
                this.trash_path1.line_to(points[i].x, points[i].y);
            }
        }
        this.trash_path1.close();
    }
    load_flip_svg(rect) {
        let holder_x = [];
        let holder_y = [];
        let flip_x0 = '0.45,0.45,0.15';
        let flip_y0 = '0.2,0.7,0.7';
        let flip_x1 = '0.55,0.55,0.85';
        let flip_y1 = '0.2,0.7,0.7';
        holder_x = flip_x0.split(',');
        holder_y = flip_y0.split(',');
        let points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
        }
        this.flip_path0.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.flip_path0.move_to(points[i].x, points[i].y);
            }
            else {
                this.flip_path0.line_to(points[i].x, points[i].y);
            }
        }
        this.flip_path0.close();
        holder_x = flip_x1.split(',');
        holder_y = flip_y1.split(',');
        points = [];
        for (var i = 0; i < holder_x.length; i++) {
            points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
        }
        this.flip_path1.reset();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                this.flip_path1.move_to(points[i].x, points[i].y);
            }
            else {
                this.flip_path1.line_to(points[i].x, points[i].y);
            }
        }
        this.flip_path1.close();
    }
    resize() {
        let temp_stroke_width = 0.65 * global.variables.canvas_stroke_width_3;
        if (MOBILE_MODE) {
            temp_stroke_width = 0.85 * global.variables.canvas_stroke_width_3;
        }
        this.mb_x = menu_bar.menu_icons[menu_bar.UP_DOWN_INDEX].get_center_x();
        this.mb_width = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_width();
        this.mb_height = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_height();
        this.option_0.set_bounds(this.mb_x - this.mb_width * 0.5, menu_bar.bounds.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, menu_bar.bounds.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_1.set_bounds(this.mb_x - this.mb_width * 0.5, this.option_0.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_0.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_2.set_bounds(this.mb_x - this.mb_width * 0.5, this.option_1.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_1.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.option_3.set_bounds(this.mb_x - this.mb_width * 0.5, this.option_2.bottom + global.variables.canvas_stroke_width_3, this.mb_x + this.mb_width * 0.5, this.option_2.bottom + global.variables.canvas_stroke_width_3 + this.mb_height);
        this.line_paint.set_stroke_width(temp_stroke_width);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint_alt.set_stroke_width(temp_stroke_width);
        this.line_paint_alt.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.icon_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.icon_paint.set_text_size(global.variables.canvas_text_size_4);
        this.meter_line_paint.set_stroke_width(temp_stroke_width);
        this.meter_line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
        this.map_options();
    }
    update() {
        if (global.variables.selected) {
            switch (global.variables.selected_type) {
                /* #INSERT_GENERATE_ELEMENT_OPTIONS_UPDATE# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                case global.ELEMENT_TYPES.TYPE_RESISTOR:
                    this.handle_resistor();
                    break;
                case global.ELEMENT_TYPES.TYPE_CAPACITOR:
                    this.handle_capacitor();
                    break;
                case global.ELEMENT_TYPES.TYPE_INDUCTOR:
                    this.handle_inductor();
                    break;
                case global.ELEMENT_TYPES.TYPE_GROUND:
                    this.handle_ground();
                    break;
                case global.ELEMENT_TYPES.TYPE_DCSOURCE:
                    this.handle_dcsource();
                    break;
                case global.ELEMENT_TYPES.TYPE_DCCURRENT:
                    this.handle_dccurrent();
                    break;
                case global.ELEMENT_TYPES.TYPE_ACSOURCE:
                    this.handle_acsource();
                    break;
                case global.ELEMENT_TYPES.TYPE_ACCURRENT:
                    this.handle_accurrent();
                    break;
                case global.ELEMENT_TYPES.TYPE_SQUAREWAVE:
                    this.handle_squarewave();
                    break;
                case global.ELEMENT_TYPES.TYPE_SAW:
                    this.handle_sawwave();
                    break;
                case global.ELEMENT_TYPES.TYPE_TRI:
                    this.handle_trianglewave();
                    break;
                case global.ELEMENT_TYPES.TYPE_CONSTANT:
                    this.handle_constant();
                    break;
                case global.ELEMENT_TYPES.TYPE_WIRE:
                    this.handle_wire();
                    break;
                case global.ELEMENT_TYPES.TYPE_NET:
                    this.handle_net();
                    break;
                case global.ELEMENT_TYPES.TYPE_NOTE:
                    this.handle_note();
                    break;
                case global.ELEMENT_TYPES.TYPE_RAIL:
                    this.handle_rail();
                    break;
                case global.ELEMENT_TYPES.TYPE_VOLTMETER:
                    this.handle_voltmeter();
                    break;
                case global.ELEMENT_TYPES.TYPE_OHMMETER:
                    this.handle_ohmmeter();
                    break;
                case global.ELEMENT_TYPES.TYPE_AMMETER:
                    this.handle_ammeter();
                    break;
                case global.ELEMENT_TYPES.TYPE_WATTMETER:
                    this.handle_wattmeter();
                    break;
                case global.ELEMENT_TYPES.TYPE_FUSE:
                    this.handle_fuse();
                    break;
                case global.ELEMENT_TYPES.TYPE_SPST:
                    this.handle_spst();
                    break;
                case global.ELEMENT_TYPES.TYPE_SPDT:
                    this.handle_spdt();
                    break;
                case global.ELEMENT_TYPES.TYPE_NOT:
                    this.handle_not();
                    break;
                case global.ELEMENT_TYPES.TYPE_DIODE:
                    this.handle_diode();
                    break;
                case global.ELEMENT_TYPES.TYPE_LED:
                    this.handle_led();
                    break;
                case global.ELEMENT_TYPES.TYPE_ZENER:
                    this.handle_zener();
                    break;
                case global.ELEMENT_TYPES.TYPE_POTENTIOMETER:
                    this.handle_potentiometer();
                    break;
                case global.ELEMENT_TYPES.TYPE_AND:
                    this.handle_and();
                    break;
                case global.ELEMENT_TYPES.TYPE_OR:
                    this.handle_or();
                    break;
                case global.ELEMENT_TYPES.TYPE_NAND:
                    this.handle_nand();
                    break;
                case global.ELEMENT_TYPES.TYPE_NOR:
                    this.handle_nor();
                    break;
                case global.ELEMENT_TYPES.TYPE_XOR:
                    this.handle_xor();
                    break;
                case global.ELEMENT_TYPES.TYPE_XNOR:
                    this.handle_xnor();
                    break;
                case global.ELEMENT_TYPES.TYPE_DFF:
                    this.handle_dff();
                    break;
                case global.ELEMENT_TYPES.TYPE_VSAT:
                    this.handle_vsat();
                    break;
                case global.ELEMENT_TYPES.TYPE_ADD:
                    this.handle_adder();
                    break;
                case global.ELEMENT_TYPES.TYPE_SUB:
                    this.handle_subtractor();
                    break;
                case global.ELEMENT_TYPES.TYPE_MUL:
                    this.handle_multiplier();
                    break;
                case global.ELEMENT_TYPES.TYPE_DIV:
                    this.handle_divider();
                    break;
                case global.ELEMENT_TYPES.TYPE_GAIN:
                    this.handle_gain();
                    break;
                case global.ELEMENT_TYPES.TYPE_ABS:
                    this.handle_absval();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCSW:
                    this.handle_vcsw();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCVS:
                    this.handle_vcvs();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCCS:
                    this.handle_vccs();
                    break;
                case global.ELEMENT_TYPES.TYPE_CCCS:
                    this.handle_cccs();
                    break;
                case global.ELEMENT_TYPES.TYPE_CCVS:
                    this.handle_ccvs();
                    break;
                case global.ELEMENT_TYPES.TYPE_OPAMP:
                    this.handle_opamp();
                    break;
                case global.ELEMENT_TYPES.TYPE_NMOS:
                    this.handle_nmosfet();
                    break;
                case global.ELEMENT_TYPES.TYPE_PMOS:
                    this.handle_pmosfet();
                    break;
                case global.ELEMENT_TYPES.TYPE_NPN:
                    this.handle_npn();
                    break;
                case global.ELEMENT_TYPES.TYPE_PNP:
                    this.handle_pnp();
                    break;
                case global.ELEMENT_TYPES.TYPE_ADC:
                    this.handle_adc();
                    break;
                case global.ELEMENT_TYPES.TYPE_DAC:
                    this.handle_dac();
                    break;
                case global.ELEMENT_TYPES.TYPE_SAH:
                    this.handle_samplers();
                    break;
                case global.ELEMENT_TYPES.TYPE_PWM:
                    this.handle_pwm();
                    break;
                case global.ELEMENT_TYPES.TYPE_INTEGRATOR:
                    this.handle_integrator();
                    break;
                case global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR:
                    this.handle_differentiator();
                    break;
                case global.ELEMENT_TYPES.TYPE_LPF:
                    this.handle_lowpass();
                    break;
                case global.ELEMENT_TYPES.TYPE_HPF:
                    this.handle_highpass();
                    break;
                case global.ELEMENT_TYPES.TYPE_REL:
                    this.handle_relay();
                    break;
                case global.ELEMENT_TYPES.TYPE_PID:
                    this.handle_pid();
                    break;
                case global.ELEMENT_TYPES.TYPE_LUT:
                    this.handle_lut();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCR:
                    this.handle_vcr();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCCA:
                    this.handle_vcca();
                    break;
                case global.ELEMENT_TYPES.TYPE_VCL:
                    this.handle_vcl();
                    break;
                case global.ELEMENT_TYPES.TYPE_GRT:
                    this.handle_grt();
                    break;
                case global.ELEMENT_TYPES.TYPE_TPTZ:
                    this.handle_tptz();
                    break;
                case global.ELEMENT_TYPES.TYPE_TRAN:
                    this.handle_transformer();
                    break;
                /* <!-- END AUTOMATICALLY GENERATED !--> */
                default:
                    break;
            }
        }
        else {
            this.reset_options();
        }
    }
    mouse_down() {
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
            !global.flags.flag_graph &&
            !global.variables.is_right_click) {
            if (global.variables.selected) {
                if (this.opts['c0'] !== this.NO_ICON) {
                    if (this.option_0.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.option_0.get_width() * 1.25, this.option_0.get_height() * 1.25)) {
                        global.variables.component_touched = true;
                    }
                }
                if (this.opts['c1'] !== this.NO_ICON) {
                    if (this.option_1.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.option_1.get_width() * 1.25, this.option_1.get_height() * 1.25)) {
                        global.variables.component_touched = true;
                    }
                }
                if (this.opts['c2'] !== this.NO_ICON) {
                    if (this.option_2.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.option_2.get_width() * 1.25, this.option_2.get_height() * 1.25)) {
                        global.variables.component_touched = true;
                    }
                }
                if (this.opts['c3'] !== this.NO_ICON) {
                    if (this.option_3.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.option_3.get_width() * 1.25, this.option_3.get_height() * 1.25)) {
                        global.variables.component_touched = true;
                    }
                }
                this.first_touch_x = global.variables.mouse_x;
                this.first_touch_y = global.variables.mouse_y;
            }
        }
    }
    mouse_move() { }
    mouse_up() {
        if (!global.variables.mouse_keyboard_lock && !global.variables.is_right_click) {
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
                !global.flags.flag_graph) {
                if (global.variables.selected) {
                    if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
                        this.handle_options('c0');
                        global.flags.flag_build_element = true;
                    }
                    if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
                        this.handle_options('c1');
                        global.flags.flag_build_element = true;
                    }
                    if (this.option_2.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_2.contains_xy(this.first_touch_x, this.first_touch_y)) {
                        this.handle_options('c2');
                        global.flags.flag_build_element = true;
                    }
                    if (this.option_3.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_3.contains_xy(this.first_touch_x, this.first_touch_y)) {
                        this.handle_options('c3');
                        global.flags.flag_build_element = true;
                    }
                }
            }
        }
    }
    handle_options(key) {
        if (this.opts[key] === this.EDIT_ICON) {
            menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
        }
        else if (this.opts[key] === this.EYE_ICON) {
            this.handle_eye_option();
        }
        else if (this.opts[key] === this.TRASH_ICON && !global.flags.flag_simulating) {
            this.handle_trash_option();
        }
        else if (this.opts[key] === this.FLIP_ICON && !global.flags.flag_simulating) {
            this.handle_flip_option();
        }
        else if (this.opts[key] === this.ROTATE_ICON && !global.flags.flag_simulating) {
            this.handle_rotate_option();
        }
        else if (this.opts[key] === this.WIRE_ICON && !global.flags.flag_simulating) {
            this.handle_wire_option();
        }
        global.variables.component_touched = true;
    }
    handle_wire_option() {
        let index = -1;
        if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
            index = engine_functions.get_wire(global.variables.selected_id);
            if (index > -1 && index < wires.length) {
                wires[index].increment_style();
            }
        }
    }
    handle_flip_option() {
        let index = -1;
        /* #INSERT_GENERATE_ELEMENT_OPTIONS_FLIP# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            index = engine_functions.get_resistor(global.variables.selected_id);
            if (index > -1 && index < resistors.length) {
                resistors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            index = engine_functions.get_capacitor(global.variables.selected_id);
            if (index > -1 && index < capacitors.length) {
                capacitors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            index = engine_functions.get_inductor(global.variables.selected_id);
            if (index > -1 && index < inductors.length) {
                inductors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
            index = engine_functions.get_ground(global.variables.selected_id);
            if (index > -1 && index < grounds.length) {
                grounds[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            index = engine_functions.get_dcsource(global.variables.selected_id);
            if (index > -1 && index < dcsources.length) {
                dcsources[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            index = engine_functions.get_dccurrent(global.variables.selected_id);
            if (index > -1 && index < dccurrents.length) {
                dccurrents[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            index = engine_functions.get_acsource(global.variables.selected_id);
            if (index > -1 && index < acsources.length) {
                acsources[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            index = engine_functions.get_accurrent(global.variables.selected_id);
            if (index > -1 && index < accurrents.length) {
                accurrents[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            index = engine_functions.get_squarewave(global.variables.selected_id);
            if (index > -1 && index < squarewaves.length) {
                squarewaves[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
            index = engine_functions.get_sawwave(global.variables.selected_id);
            if (index > -1 && index < sawwaves.length) {
                sawwaves[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
            index = engine_functions.get_trianglewave(global.variables.selected_id);
            if (index > -1 && index < trianglewaves.length) {
                trianglewaves[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            index = engine_functions.get_constant(global.variables.selected_id);
            if (index > -1 && index < constants.length) {
                constants[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
            index = engine_functions.get_wire(global.variables.selected_id);
            if (index > -1 && index < wires.length) {
                wires[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
            index = engine_functions.get_net(global.variables.selected_id);
            if (index > -1 && index < nets.length) {
                nets[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
            index = engine_functions.get_note(global.variables.selected_id);
            if (index > -1 && index < notes.length) {
                notes[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
            index = engine_functions.get_rail(global.variables.selected_id);
            if (index > -1 && index < rails.length) {
                rails[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            index = engine_functions.get_voltmeter(global.variables.selected_id);
            if (index > -1 && index < voltmeters.length) {
                voltmeters[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            index = engine_functions.get_ohmmeter(global.variables.selected_id);
            if (index > -1 && index < ohmmeters.length) {
                ohmmeters[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
            index = engine_functions.get_ammeter(global.variables.selected_id);
            if (index > -1 && index < ammeters.length) {
                ammeters[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            index = engine_functions.get_wattmeter(global.variables.selected_id);
            if (index > -1 && index < wattmeters.length) {
                wattmeters[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
            index = engine_functions.get_fuse(global.variables.selected_id);
            if (index > -1 && index < fuses.length) {
                fuses[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
            index = engine_functions.get_spst(global.variables.selected_id);
            if (index > -1 && index < spsts.length) {
                spsts[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
            index = engine_functions.get_spdt(global.variables.selected_id);
            if (index > -1 && index < spdts.length) {
                spdts[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
            index = engine_functions.get_not(global.variables.selected_id);
            if (index > -1 && index < nots.length) {
                nots[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
            index = engine_functions.get_diode(global.variables.selected_id);
            if (index > -1 && index < diodes.length) {
                diodes[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
            index = engine_functions.get_led(global.variables.selected_id);
            if (index > -1 && index < leds.length) {
                leds[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
            index = engine_functions.get_zener(global.variables.selected_id);
            if (index > -1 && index < zeners.length) {
                zeners[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            index = engine_functions.get_potentiometer(global.variables.selected_id);
            if (index > -1 && index < potentiometers.length) {
                potentiometers[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
            index = engine_functions.get_and(global.variables.selected_id);
            if (index > -1 && index < ands.length) {
                ands[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
            index = engine_functions.get_or(global.variables.selected_id);
            if (index > -1 && index < ors.length) {
                ors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
            index = engine_functions.get_nand(global.variables.selected_id);
            if (index > -1 && index < nands.length) {
                nands[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
            index = engine_functions.get_nor(global.variables.selected_id);
            if (index > -1 && index < nors.length) {
                nors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
            index = engine_functions.get_xor(global.variables.selected_id);
            if (index > -1 && index < xors.length) {
                xors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
            index = engine_functions.get_xnor(global.variables.selected_id);
            if (index > -1 && index < xnors.length) {
                xnors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
            index = engine_functions.get_dff(global.variables.selected_id);
            if (index > -1 && index < dffs.length) {
                dffs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
            index = engine_functions.get_vsat(global.variables.selected_id);
            if (index > -1 && index < vsats.length) {
                vsats[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
            index = engine_functions.get_adder(global.variables.selected_id);
            if (index > -1 && index < adders.length) {
                adders[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
            index = engine_functions.get_subtractor(global.variables.selected_id);
            if (index > -1 && index < subtractors.length) {
                subtractors[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
            index = engine_functions.get_multiplier(global.variables.selected_id);
            if (index > -1 && index < multipliers.length) {
                multipliers[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
            index = engine_functions.get_divider(global.variables.selected_id);
            if (index > -1 && index < dividers.length) {
                dividers[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
            index = engine_functions.get_gain(global.variables.selected_id);
            if (index > -1 && index < gains.length) {
                gains[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
            index = engine_functions.get_absval(global.variables.selected_id);
            if (index > -1 && index < absvals.length) {
                absvals[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
            index = engine_functions.get_vcsw(global.variables.selected_id);
            if (index > -1 && index < vcsws.length) {
                vcsws[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
            index = engine_functions.get_vcvs(global.variables.selected_id);
            if (index > -1 && index < vcvss.length) {
                vcvss[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
            index = engine_functions.get_vccs(global.variables.selected_id);
            if (index > -1 && index < vccss.length) {
                vccss[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
            index = engine_functions.get_cccs(global.variables.selected_id);
            if (index > -1 && index < cccss.length) {
                cccss[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
            index = engine_functions.get_ccvs(global.variables.selected_id);
            if (index > -1 && index < ccvss.length) {
                ccvss[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
            index = engine_functions.get_opamp(global.variables.selected_id);
            if (index > -1 && index < opamps.length) {
                opamps[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
            index = engine_functions.get_nmosfet(global.variables.selected_id);
            if (index > -1 && index < nmosfets.length) {
                nmosfets[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
            index = engine_functions.get_pmosfet(global.variables.selected_id);
            if (index > -1 && index < pmosfets.length) {
                pmosfets[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
            index = engine_functions.get_npn(global.variables.selected_id);
            if (index > -1 && index < npns.length) {
                npns[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
            index = engine_functions.get_pnp(global.variables.selected_id);
            if (index > -1 && index < pnps.length) {
                pnps[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
            index = engine_functions.get_adc(global.variables.selected_id);
            if (index > -1 && index < adcs.length) {
                adcs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
            index = engine_functions.get_dac(global.variables.selected_id);
            if (index > -1 && index < dacs.length) {
                dacs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
            index = engine_functions.get_samplers(global.variables.selected_id);
            if (index > -1 && index < sandhs.length) {
                sandhs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
            index = engine_functions.get_pwm(global.variables.selected_id);
            if (index > -1 && index < pwms.length) {
                pwms[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            index = engine_functions.get_integrator(global.variables.selected_id);
            if (index > -1 && index < integrators.length) {
                integrators[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            index = engine_functions.get_differentiator(global.variables.selected_id);
            if (index > -1 && index < differentiators.length) {
                differentiators[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
            index = engine_functions.get_lowpass(global.variables.selected_id);
            if (index > -1 && index < lowpasses.length) {
                lowpasses[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
            index = engine_functions.get_highpass(global.variables.selected_id);
            if (index > -1 && index < highpasses.length) {
                highpasses[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
            index = engine_functions.get_relay(global.variables.selected_id);
            if (index > -1 && index < relays.length) {
                relays[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
            index = engine_functions.get_pid(global.variables.selected_id);
            if (index > -1 && index < pids.length) {
                pids[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
            index = engine_functions.get_lut(global.variables.selected_id);
            if (index > -1 && index < luts.length) {
                luts[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
            index = engine_functions.get_vcr(global.variables.selected_id);
            if (index > -1 && index < vcrs.length) {
                vcrs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
            index = engine_functions.get_vcca(global.variables.selected_id);
            if (index > -1 && index < vccas.length) {
                vccas[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
            index = engine_functions.get_vcl(global.variables.selected_id);
            if (index > -1 && index < vcls.length) {
                vcls[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
            index = engine_functions.get_grt(global.variables.selected_id);
            if (index > -1 && index < grts.length) {
                grts[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
            index = engine_functions.get_tptz(global.variables.selected_id);
            if (index > -1 && index < tptzs.length) {
                tptzs[index].increment_flip();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
            index = engine_functions.get_transformer(global.variables.selected_id);
            if (index > -1 && index < transformers.length) {
                transformers[index].increment_flip();
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    handle_eye_option() {
        let index = -1;
        /* #INSERT_GENERATE_ELEMENT_OPTIONS_SCOPE_ENTRY# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            index = engine_functions.get_voltmeter(global.variables.selected_id);
            if (index > -1 && index < voltmeters.length) {
                if (!scope_manager.find_entry(voltmeters[index].elm.id, voltmeters[index].elm.type)) {
                    scope_manager.push(voltmeters[index].elm.id, voltmeters[index].elm.type, voltmeters[index].elm.properties['tag']);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
                else {
                    scope_manager.remove(voltmeters[index].elm.id, voltmeters[index].elm.type);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            index = engine_functions.get_ohmmeter(global.variables.selected_id);
            if (index > -1 && index < ohmmeters.length) {
                if (!scope_manager.find_entry(ohmmeters[index].elm.id, ohmmeters[index].elm.type)) {
                    scope_manager.push(ohmmeters[index].elm.id, ohmmeters[index].elm.type, ohmmeters[index].elm.properties['tag']);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
                else {
                    scope_manager.remove(ohmmeters[index].elm.id, ohmmeters[index].elm.type);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
            index = engine_functions.get_ammeter(global.variables.selected_id);
            if (index > -1 && index < ammeters.length) {
                if (!scope_manager.find_entry(ammeters[index].elm.id, ammeters[index].elm.type)) {
                    scope_manager.push(ammeters[index].elm.id, ammeters[index].elm.type, ammeters[index].elm.properties['tag']);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
                else {
                    scope_manager.remove(ammeters[index].elm.id, ammeters[index].elm.type);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            index = engine_functions.get_wattmeter(global.variables.selected_id);
            if (index > -1 && index < wattmeters.length) {
                if (!scope_manager.find_entry(wattmeters[index].elm.id, wattmeters[index].elm.type)) {
                    scope_manager.push(wattmeters[index].elm.id, wattmeters[index].elm.type, wattmeters[index].elm.properties['tag']);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
                else {
                    scope_manager.remove(wattmeters[index].elm.id, wattmeters[index].elm.type);
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                }
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    handle_rotate_option() {
        let index = -1;
        /* #INSERT_GENERATE_ELEMENT_OPTIONS_ROTATE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            index = engine_functions.get_resistor(global.variables.selected_id);
            if (index > -1 && index < resistors.length) {
                resistors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            index = engine_functions.get_capacitor(global.variables.selected_id);
            if (index > -1 && index < capacitors.length) {
                capacitors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            index = engine_functions.get_inductor(global.variables.selected_id);
            if (index > -1 && index < inductors.length) {
                inductors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
            index = engine_functions.get_ground(global.variables.selected_id);
            if (index > -1 && index < grounds.length) {
                grounds[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            index = engine_functions.get_dcsource(global.variables.selected_id);
            if (index > -1 && index < dcsources.length) {
                dcsources[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            index = engine_functions.get_dccurrent(global.variables.selected_id);
            if (index > -1 && index < dccurrents.length) {
                dccurrents[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            index = engine_functions.get_acsource(global.variables.selected_id);
            if (index > -1 && index < acsources.length) {
                acsources[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            index = engine_functions.get_accurrent(global.variables.selected_id);
            if (index > -1 && index < accurrents.length) {
                accurrents[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            index = engine_functions.get_squarewave(global.variables.selected_id);
            if (index > -1 && index < squarewaves.length) {
                squarewaves[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
            index = engine_functions.get_sawwave(global.variables.selected_id);
            if (index > -1 && index < sawwaves.length) {
                sawwaves[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
            index = engine_functions.get_trianglewave(global.variables.selected_id);
            if (index > -1 && index < trianglewaves.length) {
                trianglewaves[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            index = engine_functions.get_constant(global.variables.selected_id);
            if (index > -1 && index < constants.length) {
                constants[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
            index = engine_functions.get_net(global.variables.selected_id);
            if (index > -1 && index < nets.length) {
                nets[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
            index = engine_functions.get_note(global.variables.selected_id);
            if (index > -1 && index < notes.length) {
                notes[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
            index = engine_functions.get_rail(global.variables.selected_id);
            if (index > -1 && index < rails.length) {
                rails[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            index = engine_functions.get_voltmeter(global.variables.selected_id);
            if (index > -1 && index < voltmeters.length) {
                voltmeters[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            index = engine_functions.get_ohmmeter(global.variables.selected_id);
            if (index > -1 && index < ohmmeters.length) {
                ohmmeters[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
            index = engine_functions.get_ammeter(global.variables.selected_id);
            if (index > -1 && index < ammeters.length) {
                ammeters[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            index = engine_functions.get_wattmeter(global.variables.selected_id);
            if (index > -1 && index < wattmeters.length) {
                wattmeters[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
            index = engine_functions.get_fuse(global.variables.selected_id);
            if (index > -1 && index < fuses.length) {
                fuses[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
            index = engine_functions.get_spst(global.variables.selected_id);
            if (index > -1 && index < spsts.length) {
                spsts[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
            index = engine_functions.get_spdt(global.variables.selected_id);
            if (index > -1 && index < spdts.length) {
                spdts[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
            index = engine_functions.get_not(global.variables.selected_id);
            if (index > -1 && index < nots.length) {
                nots[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
            index = engine_functions.get_diode(global.variables.selected_id);
            if (index > -1 && index < diodes.length) {
                diodes[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
            index = engine_functions.get_led(global.variables.selected_id);
            if (index > -1 && index < leds.length) {
                leds[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
            index = engine_functions.get_zener(global.variables.selected_id);
            if (index > -1 && index < zeners.length) {
                zeners[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            index = engine_functions.get_potentiometer(global.variables.selected_id);
            if (index > -1 && index < potentiometers.length) {
                potentiometers[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
            index = engine_functions.get_and(global.variables.selected_id);
            if (index > -1 && index < ands.length) {
                ands[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
            index = engine_functions.get_or(global.variables.selected_id);
            if (index > -1 && index < ors.length) {
                ors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
            index = engine_functions.get_nand(global.variables.selected_id);
            if (index > -1 && index < nands.length) {
                nands[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
            index = engine_functions.get_nor(global.variables.selected_id);
            if (index > -1 && index < nors.length) {
                nors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
            index = engine_functions.get_xor(global.variables.selected_id);
            if (index > -1 && index < xors.length) {
                xors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
            index = engine_functions.get_xnor(global.variables.selected_id);
            if (index > -1 && index < xnors.length) {
                xnors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
            index = engine_functions.get_dff(global.variables.selected_id);
            if (index > -1 && index < dffs.length) {
                dffs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
            index = engine_functions.get_vsat(global.variables.selected_id);
            if (index > -1 && index < vsats.length) {
                vsats[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
            index = engine_functions.get_adder(global.variables.selected_id);
            if (index > -1 && index < adders.length) {
                adders[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
            index = engine_functions.get_subtractor(global.variables.selected_id);
            if (index > -1 && index < subtractors.length) {
                subtractors[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
            index = engine_functions.get_multiplier(global.variables.selected_id);
            if (index > -1 && index < multipliers.length) {
                multipliers[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
            index = engine_functions.get_divider(global.variables.selected_id);
            if (index > -1 && index < dividers.length) {
                dividers[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
            index = engine_functions.get_gain(global.variables.selected_id);
            if (index > -1 && index < gains.length) {
                gains[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
            index = engine_functions.get_absval(global.variables.selected_id);
            if (index > -1 && index < absvals.length) {
                absvals[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
            index = engine_functions.get_vcsw(global.variables.selected_id);
            if (index > -1 && index < vcsws.length) {
                vcsws[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
            index = engine_functions.get_vcvs(global.variables.selected_id);
            if (index > -1 && index < vcvss.length) {
                vcvss[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
            index = engine_functions.get_vccs(global.variables.selected_id);
            if (index > -1 && index < vccss.length) {
                vccss[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
            index = engine_functions.get_cccs(global.variables.selected_id);
            if (index > -1 && index < cccss.length) {
                cccss[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
            index = engine_functions.get_ccvs(global.variables.selected_id);
            if (index > -1 && index < ccvss.length) {
                ccvss[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
            index = engine_functions.get_opamp(global.variables.selected_id);
            if (index > -1 && index < opamps.length) {
                opamps[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
            index = engine_functions.get_nmosfet(global.variables.selected_id);
            if (index > -1 && index < nmosfets.length) {
                nmosfets[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
            index = engine_functions.get_pmosfet(global.variables.selected_id);
            if (index > -1 && index < pmosfets.length) {
                pmosfets[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
            index = engine_functions.get_npn(global.variables.selected_id);
            if (index > -1 && index < npns.length) {
                npns[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
            index = engine_functions.get_pnp(global.variables.selected_id);
            if (index > -1 && index < pnps.length) {
                pnps[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
            index = engine_functions.get_adc(global.variables.selected_id);
            if (index > -1 && index < adcs.length) {
                adcs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
            index = engine_functions.get_dac(global.variables.selected_id);
            if (index > -1 && index < dacs.length) {
                dacs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
            index = engine_functions.get_samplers(global.variables.selected_id);
            if (index > -1 && index < sandhs.length) {
                sandhs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
            index = engine_functions.get_pwm(global.variables.selected_id);
            if (index > -1 && index < pwms.length) {
                pwms[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            index = engine_functions.get_integrator(global.variables.selected_id);
            if (index > -1 && index < integrators.length) {
                integrators[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            index = engine_functions.get_differentiator(global.variables.selected_id);
            if (index > -1 && index < differentiators.length) {
                differentiators[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
            index = engine_functions.get_lowpass(global.variables.selected_id);
            if (index > -1 && index < lowpasses.length) {
                lowpasses[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
            index = engine_functions.get_highpass(global.variables.selected_id);
            if (index > -1 && index < highpasses.length) {
                highpasses[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
            index = engine_functions.get_relay(global.variables.selected_id);
            if (index > -1 && index < relays.length) {
                relays[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
            index = engine_functions.get_pid(global.variables.selected_id);
            if (index > -1 && index < pids.length) {
                pids[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
            index = engine_functions.get_lut(global.variables.selected_id);
            if (index > -1 && index < luts.length) {
                luts[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
            index = engine_functions.get_vcr(global.variables.selected_id);
            if (index > -1 && index < vcrs.length) {
                vcrs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
            index = engine_functions.get_vcca(global.variables.selected_id);
            if (index > -1 && index < vccas.length) {
                vccas[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
            index = engine_functions.get_vcl(global.variables.selected_id);
            if (index > -1 && index < vcls.length) {
                vcls[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
            index = engine_functions.get_grt(global.variables.selected_id);
            if (index > -1 && index < grts.length) {
                grts[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
            index = engine_functions.get_tptz(global.variables.selected_id);
            if (index > -1 && index < tptzs.length) {
                tptzs[index].increment_rotation();
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
            index = engine_functions.get_transformer(global.variables.selected_id);
            if (index > -1 && index < transformers.length) {
                transformers[index].increment_rotation();
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    handle_trash_option() {
        let index = -1;
        /* #INSERT_GENERATE_ELEMENT_OPTIONS_REMOVE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            index = engine_functions.get_resistor(global.variables.selected_id);
            if (index > -1 && index < resistors.length) {
                engine_functions.remove_resistor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            index = engine_functions.get_capacitor(global.variables.selected_id);
            if (index > -1 && index < capacitors.length) {
                engine_functions.remove_capacitor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            index = engine_functions.get_inductor(global.variables.selected_id);
            if (index > -1 && index < inductors.length) {
                engine_functions.remove_inductor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
            index = engine_functions.get_ground(global.variables.selected_id);
            if (index > -1 && index < grounds.length) {
                engine_functions.remove_ground(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            index = engine_functions.get_dcsource(global.variables.selected_id);
            if (index > -1 && index < dcsources.length) {
                engine_functions.remove_dcsource(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            index = engine_functions.get_dccurrent(global.variables.selected_id);
            if (index > -1 && index < dccurrents.length) {
                engine_functions.remove_dccurrent(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            index = engine_functions.get_acsource(global.variables.selected_id);
            if (index > -1 && index < acsources.length) {
                engine_functions.remove_acsource(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            index = engine_functions.get_accurrent(global.variables.selected_id);
            if (index > -1 && index < accurrents.length) {
                engine_functions.remove_accurrent(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            index = engine_functions.get_squarewave(global.variables.selected_id);
            if (index > -1 && index < squarewaves.length) {
                engine_functions.remove_squarewave(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
            index = engine_functions.get_sawwave(global.variables.selected_id);
            if (index > -1 && index < sawwaves.length) {
                engine_functions.remove_sawwave(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
            index = engine_functions.get_trianglewave(global.variables.selected_id);
            if (index > -1 && index < trianglewaves.length) {
                engine_functions.remove_trianglewave(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            index = engine_functions.get_constant(global.variables.selected_id);
            if (index > -1 && index < constants.length) {
                engine_functions.remove_constant(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
            index = engine_functions.get_wire(global.variables.selected_id);
            if (index > -1 && index < wires.length) {
                engine_functions.remove_wire(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
            index = engine_functions.get_net(global.variables.selected_id);
            if (index > -1 && index < nets.length) {
                engine_functions.remove_net(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
            index = engine_functions.get_note(global.variables.selected_id);
            if (index > -1 && index < notes.length) {
                engine_functions.remove_note(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
            index = engine_functions.get_rail(global.variables.selected_id);
            if (index > -1 && index < rails.length) {
                engine_functions.remove_rail(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            index = engine_functions.get_voltmeter(global.variables.selected_id);
            if (index > -1 && index < voltmeters.length) {
                engine_functions.remove_voltmeter(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            index = engine_functions.get_ohmmeter(global.variables.selected_id);
            if (index > -1 && index < ohmmeters.length) {
                engine_functions.remove_ohmmeter(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
            index = engine_functions.get_ammeter(global.variables.selected_id);
            if (index > -1 && index < ammeters.length) {
                engine_functions.remove_ammeter(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            index = engine_functions.get_wattmeter(global.variables.selected_id);
            if (index > -1 && index < wattmeters.length) {
                engine_functions.remove_wattmeter(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
            index = engine_functions.get_fuse(global.variables.selected_id);
            if (index > -1 && index < fuses.length) {
                engine_functions.remove_fuse(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
            index = engine_functions.get_spst(global.variables.selected_id);
            if (index > -1 && index < spsts.length) {
                engine_functions.remove_spst(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
            index = engine_functions.get_spdt(global.variables.selected_id);
            if (index > -1 && index < spdts.length) {
                engine_functions.remove_spdt(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
            index = engine_functions.get_not(global.variables.selected_id);
            if (index > -1 && index < nots.length) {
                engine_functions.remove_not(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
            index = engine_functions.get_diode(global.variables.selected_id);
            if (index > -1 && index < diodes.length) {
                engine_functions.remove_diode(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
            index = engine_functions.get_led(global.variables.selected_id);
            if (index > -1 && index < leds.length) {
                engine_functions.remove_led(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
            index = engine_functions.get_zener(global.variables.selected_id);
            if (index > -1 && index < zeners.length) {
                engine_functions.remove_zener(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            index = engine_functions.get_potentiometer(global.variables.selected_id);
            if (index > -1 && index < potentiometers.length) {
                engine_functions.remove_potentiometer(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
            index = engine_functions.get_and(global.variables.selected_id);
            if (index > -1 && index < ands.length) {
                engine_functions.remove_and(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
            index = engine_functions.get_or(global.variables.selected_id);
            if (index > -1 && index < ors.length) {
                engine_functions.remove_or(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
            index = engine_functions.get_nand(global.variables.selected_id);
            if (index > -1 && index < nands.length) {
                engine_functions.remove_nand(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
            index = engine_functions.get_nor(global.variables.selected_id);
            if (index > -1 && index < nors.length) {
                engine_functions.remove_nor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
            index = engine_functions.get_xor(global.variables.selected_id);
            if (index > -1 && index < xors.length) {
                engine_functions.remove_xor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
            index = engine_functions.get_xnor(global.variables.selected_id);
            if (index > -1 && index < xnors.length) {
                engine_functions.remove_xnor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
            index = engine_functions.get_dff(global.variables.selected_id);
            if (index > -1 && index < dffs.length) {
                engine_functions.remove_dff(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
            index = engine_functions.get_vsat(global.variables.selected_id);
            if (index > -1 && index < vsats.length) {
                engine_functions.remove_vsat(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
            index = engine_functions.get_adder(global.variables.selected_id);
            if (index > -1 && index < adders.length) {
                engine_functions.remove_adder(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
            index = engine_functions.get_subtractor(global.variables.selected_id);
            if (index > -1 && index < subtractors.length) {
                engine_functions.remove_subtractor(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
            index = engine_functions.get_multiplier(global.variables.selected_id);
            if (index > -1 && index < multipliers.length) {
                engine_functions.remove_multiplier(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
            index = engine_functions.get_divider(global.variables.selected_id);
            if (index > -1 && index < dividers.length) {
                engine_functions.remove_divider(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
            index = engine_functions.get_gain(global.variables.selected_id);
            if (index > -1 && index < gains.length) {
                engine_functions.remove_gain(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
            index = engine_functions.get_absval(global.variables.selected_id);
            if (index > -1 && index < absvals.length) {
                engine_functions.remove_absval(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
            index = engine_functions.get_vcsw(global.variables.selected_id);
            if (index > -1 && index < vcsws.length) {
                engine_functions.remove_vcsw(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
            index = engine_functions.get_vcvs(global.variables.selected_id);
            if (index > -1 && index < vcvss.length) {
                engine_functions.remove_vcvs(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
            index = engine_functions.get_vccs(global.variables.selected_id);
            if (index > -1 && index < vccss.length) {
                engine_functions.remove_vccs(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
            index = engine_functions.get_cccs(global.variables.selected_id);
            if (index > -1 && index < cccss.length) {
                engine_functions.remove_cccs(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
            index = engine_functions.get_ccvs(global.variables.selected_id);
            if (index > -1 && index < ccvss.length) {
                engine_functions.remove_ccvs(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
            index = engine_functions.get_opamp(global.variables.selected_id);
            if (index > -1 && index < opamps.length) {
                engine_functions.remove_opamp(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
            index = engine_functions.get_nmosfet(global.variables.selected_id);
            if (index > -1 && index < nmosfets.length) {
                engine_functions.remove_nmosfet(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
            index = engine_functions.get_pmosfet(global.variables.selected_id);
            if (index > -1 && index < pmosfets.length) {
                engine_functions.remove_pmosfet(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
            index = engine_functions.get_npn(global.variables.selected_id);
            if (index > -1 && index < npns.length) {
                engine_functions.remove_npn(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
            index = engine_functions.get_pnp(global.variables.selected_id);
            if (index > -1 && index < pnps.length) {
                engine_functions.remove_pnp(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
            index = engine_functions.get_adc(global.variables.selected_id);
            if (index > -1 && index < adcs.length) {
                engine_functions.remove_adc(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
            index = engine_functions.get_dac(global.variables.selected_id);
            if (index > -1 && index < dacs.length) {
                engine_functions.remove_dac(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
            index = engine_functions.get_samplers(global.variables.selected_id);
            if (index > -1 && index < sandhs.length) {
                engine_functions.remove_samplers(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
            index = engine_functions.get_pwm(global.variables.selected_id);
            if (index > -1 && index < pwms.length) {
                engine_functions.remove_pwm(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            index = engine_functions.get_integrator(global.variables.selected_id);
            if (index > -1 && index < integrators.length) {
                engine_functions.remove_integrator(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            index = engine_functions.get_differentiator(global.variables.selected_id);
            if (index > -1 && index < differentiators.length) {
                engine_functions.remove_differentiator(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
            index = engine_functions.get_lowpass(global.variables.selected_id);
            if (index > -1 && index < lowpasses.length) {
                engine_functions.remove_lowpass(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
            index = engine_functions.get_highpass(global.variables.selected_id);
            if (index > -1 && index < highpasses.length) {
                engine_functions.remove_highpass(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
            index = engine_functions.get_relay(global.variables.selected_id);
            if (index > -1 && index < relays.length) {
                engine_functions.remove_relay(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
            index = engine_functions.get_pid(global.variables.selected_id);
            if (index > -1 && index < pids.length) {
                engine_functions.remove_pid(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
            index = engine_functions.get_lut(global.variables.selected_id);
            if (index > -1 && index < luts.length) {
                engine_functions.remove_lut(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
            index = engine_functions.get_vcr(global.variables.selected_id);
            if (index > -1 && index < vcrs.length) {
                engine_functions.remove_vcr(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
            index = engine_functions.get_vcca(global.variables.selected_id);
            if (index > -1 && index < vccas.length) {
                engine_functions.remove_vcca(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
            index = engine_functions.get_vcl(global.variables.selected_id);
            if (index > -1 && index < vcls.length) {
                engine_functions.remove_vcl(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
            index = engine_functions.get_grt(global.variables.selected_id);
            if (index > -1 && index < grts.length) {
                engine_functions.remove_grt(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
            index = engine_functions.get_tptz(global.variables.selected_id);
            if (index > -1 && index < tptzs.length) {
                engine_functions.remove_tptz(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
            index = engine_functions.get_transformer(global.variables.selected_id);
            if (index > -1 && index < transformers.length) {
                engine_functions.remove_transformer(index);
                global.variables.history['packet'].push(engine_functions.history_snapshot());
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset_options() {
        this.set_show(false, false, false, false);
        this.opts['c0'] = this.NO_ICON;
        this.opts['c1'] = this.NO_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
    }
    /* #INSERT_GENERATE_ELEMENT_OPTIONS_ICON_PATTERN# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    handle_resistor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_capacitor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_inductor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_ground() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_dcsource() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_dccurrent() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_acsource() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_accurrent() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_squarewave() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_sawwave() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_trianglewave() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_constant() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_wire() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.WIRE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_net() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_note() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_rail() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_voltmeter() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EYE_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_ohmmeter() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EYE_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_ammeter() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EYE_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_wattmeter() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EYE_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_fuse() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_spst() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_spdt() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_not() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_diode() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_led() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_zener() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_potentiometer() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_and() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_or() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_nand() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_nor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_xor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_xnor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_dff() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vsat() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_adder() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_subtractor() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.FLIP_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_multiplier() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_divider() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.FLIP_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_gain() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_absval() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vcsw() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vcvs() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vccs() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_cccs() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_ccvs() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_opamp() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.FLIP_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_nmosfet() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_pmosfet() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_npn() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_pnp() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_adc() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_dac() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_samplers() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.FLIP_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_pwm() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_integrator() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_differentiator() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_lowpass() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_highpass() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_relay() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_pid() {
        this.set_show(true, true, true, true);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.FLIP_ICON;
        this.opts['c3'] = this.TRASH_ICON;
        this.map_options();
    }
    handle_lut() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vcr() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vcca() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_vcl() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_grt() {
        this.set_show(true, true, false, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.TRASH_ICON;
        this.opts['c2'] = this.NO_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_tptz() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    handle_transformer() {
        this.set_show(true, true, true, false);
        this.opts['c0'] = this.ROTATE_ICON;
        this.opts['c1'] = this.EDIT_ICON;
        this.opts['c2'] = this.TRASH_ICON;
        this.opts['c3'] = this.NO_ICON;
        this.map_options();
    }
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    map_options() {
        switch (this.opts['c0']) {
            case this.EDIT_ICON:
                this.load_edit_svg(this.option_0);
                break;
            case this.TRASH_ICON:
                this.load_trash_svg(this.option_0);
                break;
            case this.FLIP_ICON:
                this.load_flip_svg(this.option_0);
                break;
            default:
                break;
        }
        switch (this.opts['c1']) {
            case this.EDIT_ICON:
                this.load_edit_svg(this.option_1);
                break;
            case this.TRASH_ICON:
                this.load_trash_svg(this.option_1);
                break;
            case this.FLIP_ICON:
                this.load_flip_svg(this.option_1);
                break;
            default:
                break;
        }
        switch (this.opts['c2']) {
            case this.EDIT_ICON:
                this.load_edit_svg(this.option_2);
                break;
            case this.TRASH_ICON:
                this.load_trash_svg(this.option_2);
                break;
            case this.FLIP_ICON:
                this.load_flip_svg(this.option_2);
                break;
            default:
                break;
        }
        switch (this.opts['c3']) {
            case this.EDIT_ICON:
                this.load_edit_svg(this.option_3);
                break;
            case this.TRASH_ICON:
                this.load_trash_svg(this.option_3);
                break;
            case this.FLIP_ICON:
                this.load_flip_svg(this.option_3);
                break;
            default:
                break;
        }
    }
    restore_color() {
        this.icon_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
    }
    update_color() {
        if (!global.flags.flag_simulating) {
            this.icon_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
            this.line_paint_alt.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        }
        else {
            this.icon_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
            this.line_paint_alt.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
        }
    }
    draw_options(canvas) {
        if (global.flags.flag_idle && !global.flags.flag_menu_element_toolbox && !global.flags.flag_graph) {
            if (global.variables.selected) {
                if (this.show_0) {
                    if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                        !global.flags.flag_menu_element_toolbox &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_remove_all &&
                        !MOBILE_MODE) {
                        canvas.draw_circle3(this.option_0, 1.1, this.hover_paint);
                    }
                    else {
                        canvas.draw_circle3(this.option_0, 1.1, this.fill_paint);
                    }
                    switch (this.opts['c0']) {
                        case this.ROTATE_ICON:
                            this.update_color();
                            this.draw_rotate(this.option_0, canvas);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('R', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.EDIT_ICON:
                            canvas.draw_path(this.edit_path0.path_2d, this.icon_paint);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('E', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.TRASH_ICON:
                            this.update_color();
                            canvas.draw_path(this.trash_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.trash_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('DEL', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.FLIP_ICON:
                            this.update_color();
                            canvas.draw_path(this.flip_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.flip_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('F', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.WIRE_ICON:
                            this.draw_wire_style(this.option_0, canvas);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('R', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (this.show_1) {
                    if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                        !global.flags.flag_menu_element_toolbox &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_remove_all &&
                        !MOBILE_MODE) {
                        canvas.draw_circle3(this.option_1, 1.1, this.hover_paint);
                    }
                    else {
                        canvas.draw_circle3(this.option_1, 1.1, this.fill_paint);
                    }
                    let width_mul_0p2 = this.option_1.get_width() * 0.2;
                    let height_mul_0p2 = this.option_1.get_height() * 0.2;
                    switch (this.opts['c1']) {
                        case this.ROTATE_ICON:
                            this.update_color();
                            this.draw_rotate(this.option_1, canvas);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('R', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.EDIT_ICON:
                            canvas.draw_path(this.edit_path0.path_2d, this.icon_paint);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('E', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.TRASH_ICON:
                            this.update_color();
                            canvas.draw_path(this.trash_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.trash_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('DEL', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.FLIP_ICON:
                            this.update_color();
                            canvas.draw_path(this.flip_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.flip_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('F', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.EYE_ICON:
                            if (scope_manager.find_entry(global.variables.selected_id, global.variables.selected_type)) {
                                this.meter_line_paint.set_color(global.COLORS.SELECTED_COLOR);
                            }
                            else {
                                this.meter_line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
                            }
                            canvas.draw_arc2(this.option_1.left + width_mul_0p2, this.option_1.get_center_y(), this.option_1.right - width_mul_0p2, this.option_1.get_center_y(), this.option_1.get_height() >> 1, this.meter_line_paint);
                            canvas.draw_arc2(this.option_1.left + width_mul_0p2, this.option_1.get_center_y(), this.option_1.right - width_mul_0p2, this.option_1.get_center_y(), -this.option_1.get_height() >> 1, this.meter_line_paint);
                            canvas.draw_circle(this.option_1.get_center_x(), this.option_1.get_center_y(), this.option_1.get_width() * 0.1, this.meter_line_paint);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('E', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (this.show_2) {
                    if (this.option_2.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                        !global.flags.flag_menu_element_toolbox &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_remove_all &&
                        !MOBILE_MODE) {
                        canvas.draw_circle3(this.option_2, 1.1, this.hover_paint);
                    }
                    else {
                        canvas.draw_circle3(this.option_2, 1.1, this.fill_paint);
                    }
                    switch (this.opts['c2']) {
                        case this.ROTATE_ICON:
                            this.update_color();
                            this.draw_rotate(this.option_2, canvas);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('R', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.EDIT_ICON:
                            canvas.draw_path(this.edit_path0.path_2d, this.icon_paint);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('E', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.TRASH_ICON:
                            this.update_color();
                            canvas.draw_path(this.trash_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.trash_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('DEL', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.FLIP_ICON:
                            this.update_color();
                            canvas.draw_path(this.flip_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.flip_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('F', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (this.show_3) {
                    if (this.option_3.contains_xy(global.variables.mouse_x, global.variables.mouse_y) &&
                        !global.flags.flag_menu_element_toolbox &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_save_image &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_element_options_edit &&
                        !global.flags.flag_element_options &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_remove_all &&
                        !MOBILE_MODE) {
                        canvas.draw_circle3(this.option_3, 1.1, this.hover_paint);
                    }
                    else {
                        canvas.draw_circle3(this.option_3, 1.1, this.fill_paint);
                    }
                    switch (this.opts['c3']) {
                        case this.ROTATE_ICON:
                            this.update_color();
                            this.draw_rotate(this.option_3, canvas);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('R', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.EDIT_ICON:
                            canvas.draw_path(this.edit_path0.path_2d, this.icon_paint);
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('E', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.TRASH_ICON:
                            this.update_color();
                            canvas.draw_path(this.trash_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.trash_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('DEL', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
                            }
                            break;
                        case this.FLIP_ICON:
                            this.update_color();
                            canvas.draw_path(this.flip_path0.path_2d, this.icon_paint);
                            canvas.draw_path(this.flip_path1.path_2d, this.icon_paint);
                            this.restore_color();
                            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
                                canvas.draw_text('F', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    draw_rotate(rect, canvas) {
        this.cached_width = rect.get_width() * 0.303;
        this.cached_height = rect.get_height() * 0.303;
        this.width_mul_0p125 = rect.get_width() * 0.125;
        this.height_mul_0p125 = rect.get_height() * 0.125;
        canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_width, rect.right - this.cached_width, rect.top + this.cached_width, this.line_paint_alt);
        canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_width, rect.left + this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        canvas.draw_line(rect.right - this.cached_width, rect.top + this.cached_width, rect.right - this.cached_width, rect.bottom - this.cached_height, this.line_paint_alt);
        canvas.draw_line(rect.right - this.cached_width, rect.bottom - this.cached_height, rect.right - this.cached_width - this.width_mul_0p125, rect.bottom - this.cached_height - this.height_mul_0p125, this.line_paint_alt);
        canvas.draw_line(rect.right - this.cached_width, rect.bottom - this.cached_height, rect.right - this.cached_width + this.width_mul_0p125, rect.bottom - this.cached_height - this.height_mul_0p125, this.line_paint_alt);
    }
    draw_wire_style(rect, canvas) {
        this.cached_width = rect.get_width() * 0.303;
        this.cached_height = rect.get_height() * 0.303;
        if (global.variables.selected_wire_style === global.CONSTANTS.WIRE_STYLE_0) {
            canvas.draw_circle(rect.left + this.cached_width, rect.top + this.cached_height, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_circle(rect.right - this.cached_width, rect.bottom - this.cached_width, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_height, rect.right - this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        }
        else if (global.variables.selected_wire_style === global.CONSTANTS.WIRE_STYLE_1) {
            canvas.draw_circle(rect.left + this.cached_width, rect.top + this.cached_height, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_circle(rect.right - this.cached_width, rect.bottom - this.cached_width, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_height, rect.right - this.cached_width, rect.top + this.cached_height, this.line_paint_alt);
            canvas.draw_line(rect.right - this.cached_width, rect.top + this.cached_height, rect.right - this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        }
        else if (global.variables.selected_wire_style === global.CONSTANTS.WIRE_STYLE_2) {
            canvas.draw_circle(rect.right - this.cached_width, rect.top + this.cached_height, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_circle(rect.left + this.cached_width, rect.bottom - this.cached_width, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_line(rect.right - this.cached_width, rect.top + this.cached_height, rect.right - this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.bottom - this.cached_width, rect.right - this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        }
        else if (global.variables.selected_wire_style === global.CONSTANTS.WIRE_STYLE_3) {
            canvas.draw_circle(rect.right - this.cached_width, rect.bottom - this.cached_width, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_circle(rect.left + this.cached_width, rect.top + this.cached_height, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_height, rect.left + this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.bottom - this.cached_width, rect.right - this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        }
        else if (global.variables.selected_wire_style === global.CONSTANTS.WIRE_STYLE_4) {
            canvas.draw_circle(rect.left + this.cached_width, rect.bottom - this.cached_width, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_circle(rect.right - this.cached_width, rect.top + this.cached_height, global.variables.canvas_stroke_width_1, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_height, rect.right - this.cached_width, rect.top + this.cached_height, this.line_paint_alt);
            canvas.draw_line(rect.left + this.cached_width, rect.top + this.cached_height, rect.left + this.cached_width, rect.bottom - this.cached_width, this.line_paint_alt);
        }
    }
}
