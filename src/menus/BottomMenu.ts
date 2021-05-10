'use strict';
class BottomMenu {
	public readonly INITIAL_RESIZE_COUNTER_MAX: number;
	private draw_bottom_path: boolean;
	private time_step_button_width: number;
	private line_paint: Paint;
	private fill_paint: Paint;
	private text_paint: Paint;
	private bottom_path: Path;
	private file_button: Button;
	private time_step_button: Button;
	private first_touch_x: number;
	private first_touch_y: number;
	private initial_resize_counter: number;
	private reload_bottom_path: boolean;
	private padding: number;
	constructor() {
		this.draw_bottom_path = true;
		this.time_step_button_width = 1;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(paint.style.STROKE);
		this.line_paint.set_paint_cap(paint.cap.ROUND);
		this.line_paint.set_paint_join(paint.join.ROUND);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_3);
		this.line_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.ROUND);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_3);
		this.fill_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(paint.style.FILL);
		this.text_paint.set_paint_cap(paint.cap.ROUND);
		this.text_paint.set_paint_join(paint.join.ROUND);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_paint_align(this.text_paint.align.RIGHT);
		this.bottom_path = new Path();
		this.file_button = new Button(view_port.left, menu_bar.settings_button.bottom + 2 * global.variables.canvas_stroke_width_4, view_port.left + 1, view_port.bottom);
		this.file_button.text = '';
		this.file_button.draw_stroke = false;
		this.file_button.text_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
		this.file_button.fill_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.file_button.resize_paint();
		this.time_step_button = new Button(view_port.right - this.time_step_button_width, menu_bar.settings_button.bottom + 2 * global.variables.canvas_stroke_width_4, view_port.right, view_port.bottom);
		this.time_step_button.text = global.TEMPLATES.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.utils.exponentiate_quickly(simulation_manager.time_step));
		this.time_step_button.draw_stroke = false;
		this.time_step_button.text_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
		this.time_step_button.fill_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.time_step_button.resize_paint();
		this.load_bottom_path();
		this.first_touch_x = 0;
		this.first_touch_y = 0;
		this.initial_resize_counter = 0;
		this.INITIAL_RESIZE_COUNTER_MAX = global.CONSTANTS.CANVAS_REDRAW_MAX;
		this.padding = 0;
		this.reload_bottom_path = true;
	}
	bottom_menu_recolor_conditions(): boolean {
		return (
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
			!MOBILE_MODE
		);
	}
	load_bottom_path(): void {
		this.bottom_path.reset();
		this.bottom_path.move_to(view_port.left, this.file_button.top);
		this.bottom_path.line_to(this.file_button.right + global.variables.canvas_stroke_width_3, this.file_button.top);
		this.bottom_path.line_to(this.file_button.right + global.variables.canvas_stroke_width_6, view_port.bottom - global.variables.canvas_stroke_width_3);
		this.bottom_path.line_to(this.time_step_button.left - global.variables.canvas_stroke_width_6, view_port.bottom - global.variables.canvas_stroke_width_3);
		this.bottom_path.line_to(this.time_step_button.left - global.variables.canvas_stroke_width_3, this.time_step_button.top);
		this.bottom_path.line_to(view_port.right, this.time_step_button.top);
		this.bottom_path.line_to(view_port.right, view_port.bottom + 5);
		this.bottom_path.line_to(view_port.left, view_port.bottom + 5);
		this.bottom_path.close();
	}
	update(): void {}
	resize_bottom_menu(): void {
		this.initial_resize_counter = 0;
		this.reload_bottom_path = true;
		this.file_button.resize();
		this.time_step_button.resize();
		this.file_button.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.file_button.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.file_button.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.file_button.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.file_button.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.time_step_button.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.time_step_button.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.time_step_button.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.time_step_button.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.time_step_button.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.file_button.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
			this.time_step_button.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
		} else {
			this.file_button.text_paint.set_text_size(global.variables.canvas_text_size_5);
			this.time_step_button.text_paint.set_text_size(global.variables.canvas_text_size_5);
		}
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		}
	}
	mouse_down(): void {
		if (this.time_step_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			global.variables.component_touched = true;
		}
		if (this.file_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			global.variables.component_touched = true;
		}
		this.first_touch_x = global.variables.mouse_x;
		this.first_touch_y = global.variables.mouse_y;
	}
	mouse_move(): void {}
	mouse_up(): void {
		if (!global.variables.is_right_click && this.time_step_button.contains_xy(this.first_touch_x, this.first_touch_y)) {
			if (!global.variables.mouse_keyboard_lock && !multi_select_manager.ctrl_pressed && global.variables.component_touched) {
				if (
					!global.flags.flag_simulating &&
					!global.flags.flag_save_image &&
					!global.flags.flag_save_circuit &&
					!global.flags.flag_zoom &&
					!global.flags.flag_element_options &&
					!global.flags.flag_element_options_edit &&
					!global.flags.flag_graph &&
					!global.flags.flag_select_element &&
					!global.flags.flag_select_timestep &&
					!global.flags.flag_select_settings &&
					!global.flags.flag_remove_all
				) {
					if (this.time_step_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
						time_step_window.input_button.text = global.utils.exponentiate_quickly(simulation_manager.time_step);
						this.handle_timestep_flag(!global.flags.flag_select_timestep);
						global.variables.component_touched = true;
					}
				}
			}
		}
	}
	handle_file_explorer(): boolean {
		if (MOBILE_MODE) {
			global.variables.mouse_keyboard_lock = false;
			global.variables.component_touched = false;
		}
		if (!global.variables.mouse_keyboard_lock) {
			if (
				!global.flags.flag_simulating &&
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
				!global.flags.flag_menu_element_toolbox &&
				!global.variables.component_touched
			) {
				if (this.file_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
					global.variables.component_touched = true;
					return true;
				}
			}
		}
		return false;
	}
	handle_timestep_flag(ON: boolean): void {
		global.variables.mouse_keyboard_lock = true;
		if (ON) {
			time_step_window.reset_cursor();
		}
		bottom_menu.resize_bottom_menu();
		global.flags.flag_select_timestep = ON;
	}
	recolor(): void {
		if (!global.flags.flag_simulating && !global.flags.flag_graph && !global.flags.flag_menu_element_toolbox) {
			if (this.file_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.bottom_menu_recolor_conditions()) {
				this.file_button.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
			} else {
				this.file_button.text_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
			}
			if (this.time_step_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.bottom_menu_recolor_conditions()) {
				this.time_step_button.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
			} else {
				this.time_step_button.text_paint.set_color(global.COLORS.MENU_ICON_DEFAULT_COLOR);
			}
		} else {
			if (this.file_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.bottom_menu_recolor_conditions()) {
				this.file_button.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
			} else {
				this.file_button.text_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
			}
			if (this.time_step_button.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.bottom_menu_recolor_conditions()) {
				this.time_step_button.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
			} else {
				this.time_step_button.text_paint.set_color(global.COLORS.MENU_ICON_INACTIVE_COLOR);
			}
		}
	}
	draw_bottom_menu(canvas: GraphicsEngine): void {
		this.recolor();
		this.file_button.text = language_manager.FILE[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + global.variables.user_file.title;
		this.time_step_button.text = global.TEMPLATES.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.utils.exponentiate_quickly(simulation_manager.time_step));
		this.time_step_button_width = 1.25 * this.time_step_button.text_paint.measure_text(this.time_step_button.text);
		this.padding = 2 * global.variables.canvas_stroke_width_4;
		this.file_button.set_bounds(
			view_port.left,
			menu_bar.settings_button.bottom + this.padding,
			view_port.left + this.file_button.text_paint.measure_text(global.TEMPLATES.FILE_BUTTON_TEXT_TEMPLATE.replace('{TEXT}', this.file_button.text)),
			view_port.bottom
		);
		this.time_step_button.set_bounds(view_port.right - this.time_step_button_width, menu_bar.settings_button.bottom + this.padding, view_port.right, view_port.bottom);
		if (this.draw_bottom_path) {
			if (this.file_button.draw_fill) {
				this.file_button.draw_fill = false;
			}
			if (this.time_step_button.draw_fill) {
				this.time_step_button.draw_fill = false;
			}
			if (this.reload_bottom_path === true) {
				this.load_bottom_path();
				this.initial_resize_counter++;
				if (this.initial_resize_counter >= this.INITIAL_RESIZE_COUNTER_MAX) {
					this.initial_resize_counter = 0;
					this.reload_bottom_path = false;
				}
			}
			canvas.draw_path(this.bottom_path.path_2d, this.fill_paint);
		} else {
			if (!this.file_button.draw_fill) {
				this.file_button.draw_fill = true;
			}
			if (!this.time_step_button.draw_fill) {
				this.time_step_button.draw_fill = true;
			}
		}
		this.file_button.draw_button(canvas);
		this.time_step_button.draw_button(canvas);
		canvas.draw_text(global.TEMPLATES.VERSION_TAG_TEMPLATE.replace('{VERSION_TAG}', global.CONSTANTS.VERSION_TAG), view_port.right, menu_bar.settings_button.bottom, this.text_paint);
	}
}
