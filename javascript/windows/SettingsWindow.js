'use strict';
class SettingsWindow {
    constructor() {
        this.TITLE_HEIGHT_RATIO = 0.1;
        this.BUTTON_WIDTH_RATIO = 0.3;
        this.BUTTON_HEIGHT_RATIO = 0.1;
        if (global.MOBILE_MODE === false) {
            this.PADDING = 0.0175;
        }
        else {
            this.PADDING = 0.0125;
        }
        this.ATTRIBUTE_SIZE = 6;
        if (global.MOBILE_MODE === false) {
            this.ATTRIBUTE_SHOW_SIZE = 4;
        }
        else {
            this.ATTRIBUTE_SHOW_SIZE = 2;
        }
        this.ATTRIBUTE_SELECT = ['1', '2', '3', '4', '5', '6'];
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.fill_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.fill_paint.set_text_size(global.canvas_text_size_4);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(130);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.text_paint.set_color(global.GENERAL_YELLOW_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.LEFT);
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
        this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
        this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
        this.hover_paint.set_stroke_width(0.6 * global.canvas_stroke_width_3);
        this.hover_paint.set_color(global.GENERAL_HOVER_COLOR);
        this.hover_paint.set_text_size(global.canvas_text_size_5);
        this.hover_paint.set_font(global.DEFAULT_FONT);
        this.hover_paint.set_alpha(255);
        this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
        this.shorcut_text_paint = new Paint();
        this.shorcut_text_paint.set_paint_style(this.shorcut_text_paint.style.FILL);
        this.shorcut_text_paint.set_paint_cap(this.shorcut_text_paint.cap.ROUND);
        this.shorcut_text_paint.set_paint_join(this.shorcut_text_paint.join.MITER);
        this.shorcut_text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.shorcut_text_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.shorcut_text_paint.set_text_size(global.canvas_text_size_4);
        this.shorcut_text_paint.set_font(global.DEFAULT_FONT);
        this.shorcut_text_paint.set_alpha(255);
        this.shorcut_text_paint.set_paint_align(this.shorcut_text_paint.align.CENTER);
        this.value_paint = new Paint();
        this.value_paint.set_paint_style(this.value_paint.style.FILL);
        this.value_paint.set_paint_cap(this.value_paint.cap.ROUND);
        this.value_paint.set_paint_join(this.value_paint.join.MITER);
        this.value_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.value_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.value_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.value_paint.set_text_size(global.canvas_text_size_4);
        }
        this.value_paint.set_font(global.DEFAULT_FONT);
        this.value_paint.set_alpha(255);
        this.value_paint.set_paint_align(this.value_paint.align.RIGHT);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.GENERAL_FILL_COLOR);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.2;
            this.height = view_port.view_height * 0.4;
        }
        else {
            this.width = view_port.view_width * 0.15;
            this.height = view_port.view_height * 0.3;
        }
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
        this.title_bounds.text = '';
        this.title_bounds.text_paint.set_paint_align(this.title_bounds.text_paint.align.LEFT);
        this.title_bounds.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.title_bounds.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.title_bounds.fill_paint.set_alpha(130);
        this.title_bounds.draw_stroke = false;
        this.title_bounds.draw_fill = true;
        this.title_bounds.draw_text = false;
        let padding = this.PADDING * this.bounds.get_width();
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.okay_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
        this.okay_button.text = '';
        this.okay_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.okay_button.fill_paint.set_alpha(130);
        this.okay_button.draw_stroke = false;
        this.okay_button.draw_fill = true;
        this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
        this.exit_button.draw_stroke = true;
        this.exit_button.draw_fill = false;
        this.exit_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.attributes = [];
        this.attribute_height = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
        for (var i = 0; i < this.ATTRIBUTE_SIZE; i++) {
            this.attributes.push(new RectF(this.title_bounds.left + padding, this.title_bounds.bottom + padding * 1.5 + i * this.attribute_height, this.title_bounds.right - padding, this.title_bounds.bottom + padding + (i + 1) * this.attribute_height - 1.25 * padding));
        }
        this.offset_x = 0;
        this.offset_y = 0;
        this.window_anchored = true;
        this.anchor_x = 0;
        this.anchor_y = 0;
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.toggle_switch_button = new ToggleSwitch(view_port.left, view_port.top, view_port.left + 200, view_port.top + 100);
        this.toggle_switch_button.draw_fill = false;
        this.toggle_switch_button.draw_stroke = false;
        this.toggle_switch_button.draw_text = true;
        this.toggle_switch_button.line_paint.set_color(global.GENERAL_BOUNDS_COLOR);
    }
    mouse_down() {
        if (global.flag_select_settings) {
            if (this.title_bounds.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                !this.exit_button.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y)) {
                this.anchor_x = global.mouse_x - this.offset_x;
                this.anchor_y = global.mouse_y - this.offset_y;
                this.window_anchored = false;
            }
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
        }
    }
    mouse_move() {
        if (global.flag_select_settings) {
            if (!this.window_anchored) {
                this.offset_x = global.mouse_x - this.anchor_x;
                this.offset_y = global.mouse_y - this.anchor_y;
                if (this.bounds.right + this.offset_x >= view_port.right) {
                    this.offset_x = view_port.right - this.bounds.right;
                }
                if (this.bounds.left + this.offset_x <= view_port.left) {
                    this.offset_x = view_port.left - this.bounds.left;
                }
                if (this.bounds.top + this.offset_y <= view_port.top) {
                    this.offset_y = view_port.top - this.bounds.top;
                }
                if (this.bounds.bottom + this.offset_y >= view_port.bottom) {
                    this.offset_y = view_port.bottom - this.bounds.bottom;
                }
            }
        }
    }
    mouse_up() {
        if (global.flag_select_settings) {
            if (!global.mouse_keyboard_lock) {
                if (this.window_anchored) {
                    if (!this.bounds.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                        !this.bounds.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                        menu_bar.handle_select_settings_flag(!global.flag_select_settings);
                        global.component_touched = true;
                    }
                    else if (this.okay_button.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                        this.okay_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                        menu_bar.handle_select_settings_flag(!global.flag_select_settings);
                        global.component_touched = true;
                    }
                    else if (this.exit_button.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                        this.exit_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                        menu_bar.handle_select_settings_flag(!global.flag_select_settings);
                        global.component_touched = true;
                    }
                    else {
                        if (this.null_index_check(this.attributes, global.SYSTEM_OPTION_LANGUAGE) &&
                            this.attributes[global.SYSTEM_OPTION_LANGUAGE].contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                            this.attributes[global.SYSTEM_OPTION_LANGUAGE].contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                            this.on_attribute_clicked(global.SYSTEM_OPTION_LANGUAGE);
                        }
                        else if (this.null_index_check(this.attributes, global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) &&
                            this.attributes[global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP].contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                            this.attributes[global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP].contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                            this.on_attribute_clicked(global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP);
                        }
                        else if (this.null_index_check(this.attributes, global.SYSTEM_OPTION_SHORTCUT_HINTS) &&
                            this.attributes[global.SYSTEM_OPTION_SHORTCUT_HINTS].contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                            this.attributes[global.SYSTEM_OPTION_SHORTCUT_HINTS].contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                            this.on_attribute_clicked(global.SYSTEM_OPTION_SHORTCUT_HINTS);
                        }
                        else if (this.null_index_check(this.attributes, global.SYSTEM_OPTION_STRETCH_WINDOW) &&
                            this.attributes[global.SYSTEM_OPTION_STRETCH_WINDOW].contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) &&
                            this.attributes[global.SYSTEM_OPTION_STRETCH_WINDOW].contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
                            this.on_attribute_clicked(global.SYSTEM_OPTION_STRETCH_WINDOW);
                        }
                    }
                }
                else {
                    this.anchor_x = global.mouse_x - this.offset_x;
                    this.anchor_y = global.mouse_y - this.offset_y;
                }
                this.window_anchored = true;
            }
        }
    }
    null_index_check(param, index) {
        return global.not_null(param[index]);
    }
    on_attribute_clicked(index) {
        if (index < this.ATTRIBUTE_SHOW_SIZE) {
            if (index === global.SYSTEM_OPTION_LANGUAGE) {
                if (global.SYSTEM_OPTION_LANGUAGE < this.ATTRIBUTE_SHOW_SIZE) {
                    global.language_index++;
                    if (global.language_index >= global.language_index_counter) {
                        global.language_index = 0;
                    }
                    global.system_options['values'][global.SYSTEM_OPTION_LANGUAGE] = global.LANGUAGES[global.language_index];
                }
                global.component_touched = true;
            }
            else if (index === global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) {
                if (global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP < this.ATTRIBUTE_SHOW_SIZE) {
                    if (global.system_options['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] === global.OFF) {
                        global.system_options['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] = global.ON;
                    }
                    else {
                        global.system_options['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] = global.OFF;
                    }
                }
                global.component_touched = true;
            }
            else if (index === global.SYSTEM_OPTION_SHORTCUT_HINTS) {
                if (global.SYSTEM_OPTION_SHORTCUT_HINTS < this.ATTRIBUTE_SHOW_SIZE) {
                    if (global.system_options['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.OFF) {
                        global.system_options['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] = global.ON;
                    }
                    else {
                        global.system_options['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] = global.OFF;
                    }
                }
                global.component_touched = true;
            }
            else if (index === global.SYSTEM_OPTION_STRETCH_WINDOW) {
                if (global.SYSTEM_OPTION_STRETCH_WINDOW < this.ATTRIBUTE_SHOW_SIZE) {
                    if (global.system_options['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] === global.OFF) {
                        global.system_options['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] = global.ON;
                        view_port.apply_spread_factor = true;
                        global.force_resize_event = true;
                    }
                    else {
                        global.system_options['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] = global.OFF;
                        view_port.apply_spread_factor = false;
                        global.force_resize_event = true;
                    }
                }
                global.component_touched = true;
            }
        }
        bottom_menu.resize_bottom_menu();
    }
    key_down(key_event) {
        if (global.flag_select_settings) {
            if (key_event['event'].code === global.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODE_ESCAPE) {
                menu_bar.handle_select_settings_flag(!global.flag_select_settings);
                global.component_touched = true;
            }
            if (!global.mouse_keyboard_lock) {
                for (var i = 0; i < this.ATTRIBUTE_SELECT.length; i++) {
                    if (global.decode_key(key_event) === this.ATTRIBUTE_SELECT[i]) {
                        this.on_attribute_clicked(i);
                        global.component_touched = true;
                        global.mouse_keyboard_lock = true;
                        break;
                    }
                }
            }
        }
    }
    resize_window() {
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.2;
            this.height = view_port.view_height * 0.4;
        }
        else {
            this.width = view_port.view_width * 0.15;
            this.height = view_port.view_height * 0.3;
        }
        this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
        this.title_bounds.resize_paint();
        let padding = this.PADDING * this.bounds.get_width();
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.okay_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
        this.okay_button.resize_paint();
        this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
        this.exit_button.resize_paint();
        this.attribute_height = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
        for (var i = 0; i < this.ATTRIBUTE_SIZE; i++) {
            this.attributes[i].set_bounds(this.title_bounds.left + padding, this.title_bounds.bottom + padding * 1.5 + i * this.attribute_height, this.title_bounds.right - padding, this.title_bounds.bottom + padding + (i + 1) * this.attribute_height - 1.25 * padding);
        }
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        this.value_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.value_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.value_paint.set_text_size(global.canvas_text_size_4);
        }
        this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.shorcut_text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.shorcut_text_paint.set_text_size(global.canvas_text_size_4);
        this.hover_paint.set_stroke_width(0.6 * global.canvas_stroke_width_3);
        this.hover_paint.set_text_size(global.canvas_text_size_5);
        if (global.not_null(this.toggle_switch_button)) {
            this.toggle_switch_button.resize_toggle_switch();
            this.toggle_switch_button.resize_paint();
        }
    }
    draw_window(canvas) {
        if (global.flag_select_settings) {
            if (!global.MOBILE_MODE) {
                canvas.draw_color2(global.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            this.title_bounds.text = language_manager.SYSTEM_SETTINGS[global.LANGUAGES[global.language_index]];
            this.okay_button.text = language_manager.OKAY[global.LANGUAGES[global.language_index]];
            canvas.draw_rect(this.bounds.left + this.offset_x, this.bounds.top + this.offset_y, this.bounds.right + this.offset_x, this.bounds.bottom + this.offset_y, this.bounds_paint);
            this.title_bounds.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
            this.title_bounds.draw_button_text(canvas, this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.offset_x, this.title_bounds.get_center_y() + this.offset_y);
            if (this.okay_button.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) && this.window_anchored && !global.MOBILE_MODE) {
                this.okay_button.fill_paint.set_color(global.GENERAL_HOVER_COLOR);
                this.okay_button.fill_paint.set_alpha(255);
            }
            else {
                this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
                this.okay_button.fill_paint.set_alpha(130);
            }
            this.okay_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
            for (var i = 0; i < this.ATTRIBUTE_SHOW_SIZE; i++) {
                if (global.not_null(global.system_options)) {
                    if (i < global.system_options['options'].length && global.not_null(this.attributes[i])) {
                        if (this.attributes[i].contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) && this.window_anchored && !global.MOBILE_MODE) {
                            canvas.draw_rect(this.attributes[i].left + this.offset_x, this.attributes[i].top + this.offset_y, this.attributes[i].right + this.offset_x, this.attributes[i].bottom + this.offset_y, this.hover_paint);
                        }
                        else {
                            canvas.draw_rect(this.attributes[i].left + this.offset_x, this.attributes[i].top + this.offset_y, this.attributes[i].right + this.offset_x, this.attributes[i].bottom + this.offset_y, this.fill_paint);
                        }
                        if (i === global.SYSTEM_OPTION_LANGUAGE) {
                            canvas.draw_text(language_manager.LANGUAGE[global.LANGUAGES[global.language_index]] + ':=', this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.offset_x, this.attributes[i].get_center_y() + this.offset_y, this.text_paint);
                        }
                        else if (i === global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) {
                            canvas.draw_text(language_manager.AUTOMATIC_TIMESTEP[global.LANGUAGES[global.language_index]] + ':=', this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.offset_x, this.attributes[i].get_center_y() + this.offset_y, this.text_paint);
                        }
                        else if (i === global.SYSTEM_OPTION_SHORTCUT_HINTS) {
                            canvas.draw_text(language_manager.SHORTCUT_HINTS[global.LANGUAGES[global.language_index]] + ':=', this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.offset_x, this.attributes[i].get_center_y() + this.offset_y, this.text_paint);
                        }
                        else if (i === global.SYSTEM_OPTION_STRETCH_WINDOW) {
                            canvas.draw_text(language_manager.STRETCH_WINDOW[global.LANGUAGES[global.language_index]] + ':=', this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.offset_x, this.attributes[i].get_center_y() + this.offset_y, this.text_paint);
                        }
                        else {
                            canvas.draw_text(global.system_options['options'][i] + ':=', this.attributes[i].left + this.PADDING * this.bounds.get_width(), this.attributes[i].get_center_y() + this.offset_y, this.text_paint);
                        }
                        if (global.system_options['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
                            canvas.draw_text(i + 1 + '', this.attributes[i].left + this.offset_x, this.attributes[i].top + this.offset_y, this.shorcut_text_paint);
                        }
                        if (global.system_options['values'][i] === global.ON || global.system_options['values'][i] === global.OFF) {
                            let padding = this.attributes[i].get_height() * 0.1;
                            this.toggle_switch_button.state = global.system_options['values'][i];
                            this.toggle_switch_button.left = this.attributes[i].right - this.attributes[i].get_width() * 0.3;
                            this.toggle_switch_button.right = this.attributes[i].right - this.PADDING * this.bounds.get_width();
                            this.toggle_switch_button.top = this.attributes[i].top + padding;
                            this.toggle_switch_button.bottom = this.attributes[i].bottom - padding;
                            if (global.system_options['values'][i] === global.ON) {
                                this.toggle_switch_button.toggle_paint.set_color(global.GENERAL_CYAN_COLOR);
                            }
                            else if (global.system_options['values'][i] === global.OFF) {
                                this.toggle_switch_button.toggle_paint.set_color(global.GENERAL_BOUNDS_COLOR);
                            }
                            if (global.not_null(this.toggle_switch_button)) {
                                this.toggle_switch_button.draw_toggle_switch_dxdy(canvas, this.offset_x, this.offset_y);
                            }
                        }
                        else {
                            canvas.draw_text(global.system_options['values'][i], this.attributes[i].right - this.PADDING * this.bounds.get_width() + this.offset_x, this.attributes[i].get_center_y() + this.offset_y, this.value_paint);
                        }
                    }
                }
            }
            if (this.exit_button.contains_xy(global.mouse_x - this.offset_x, global.mouse_y - this.offset_y) && this.window_anchored && !global.MOBILE_MODE) {
                canvas.draw_rect(this.exit_button.left + this.offset_x, this.exit_button.top + this.offset_y, this.exit_button.right + this.offset_x, this.exit_button.bottom + this.offset_y, this.hover_paint);
            }
            let width_mul_0p3636 = this.exit_button.get_width() * 0.3636;
            let height_mul_0p3636 = this.exit_button.get_height() * 0.3636;
            canvas.draw_line(this.exit_button.left + width_mul_0p3636 + this.offset_x, this.exit_button.top + height_mul_0p3636 + this.offset_y, this.exit_button.right - width_mul_0p3636 + this.offset_x, this.exit_button.bottom - height_mul_0p3636 + this.offset_y, this.line_paint);
            canvas.draw_line(this.exit_button.right - width_mul_0p3636 + this.offset_x, this.exit_button.top + height_mul_0p3636 + this.offset_y, this.exit_button.left + width_mul_0p3636 + this.offset_x, this.exit_button.bottom - height_mul_0p3636 + this.offset_y, this.line_paint);
        }
    }
}
