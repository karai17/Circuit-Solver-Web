'use strict';
class ZoomWindow {
	private readonly PADDING: number;
	private line_paint: Paint;
	private bounds_paint: Paint;
	private fill_paint: Paint;
	private text_paint: Paint;
	private option_0_paint: Paint;
	private option_1_paint: Paint;
	private option_2_paint: Paint;
	private option_3_paint: Paint;
	private options: OPTIONS_T;
	private width: number;
	private height: number;
	private bounds: RectF;
	private option_0: RectF;
	private option_1: RectF;
	private option_2: RectF;
	private option_3: RectF;
	private first_touch_x: number;
	private first_touch_y: number;
	constructor() {
		this.PADDING = 0.025;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(paint.style.STROKE);
		this.line_paint.set_paint_cap(paint.cap.ROUND);
		this.line_paint.set_paint_join(paint.join.ROUND);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(paint.align.CENTER);
		this.bounds_paint = new Paint();
		this.bounds_paint.set_paint_style(paint.style.FILL);
		this.bounds_paint.set_paint_cap(paint.cap.ROUND);
		this.bounds_paint.set_paint_join(paint.join.ROUND);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
		this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.bounds_paint.set_alpha(255);
		this.bounds_paint.set_paint_align(paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.ROUND);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(paint.style.FILL);
		this.text_paint.set_paint_cap(paint.cap.ROUND);
		this.text_paint.set_paint_join(paint.join.ROUND);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_paint_align(paint.align.CENTER);
		this.option_0_paint = new Paint();
		this.option_0_paint.set_paint_style(paint.style.FILL);
		this.option_0_paint.set_paint_cap(paint.cap.ROUND);
		this.option_0_paint.set_paint_join(paint.join.ROUND);
		this.option_0_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.option_0_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.option_0_paint.set_text_size(global.variables.canvas_text_size_5);
		this.option_0_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.option_0_paint.set_alpha(255);
		this.option_0_paint.set_paint_align(paint.align.CENTER);
		this.option_1_paint = new Paint();
		this.option_1_paint.set_paint_style(paint.style.FILL);
		this.option_1_paint.set_paint_cap(paint.cap.ROUND);
		this.option_1_paint.set_paint_join(paint.join.ROUND);
		this.option_1_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.option_1_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.option_1_paint.set_text_size(global.variables.canvas_text_size_5);
		this.option_1_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.option_1_paint.set_alpha(255);
		this.option_1_paint.set_paint_align(paint.align.CENTER);
		this.option_2_paint = new Paint();
		this.option_2_paint.set_paint_style(paint.style.FILL);
		this.option_2_paint.set_paint_cap(paint.cap.ROUND);
		this.option_2_paint.set_paint_join(paint.join.ROUND);
		this.option_2_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.option_2_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.option_2_paint.set_text_size(global.variables.canvas_text_size_5);
		this.option_2_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.option_2_paint.set_alpha(255);
		this.option_2_paint.set_paint_align(paint.align.CENTER);
		this.option_3_paint = new Paint();
		this.option_3_paint.set_paint_style(paint.style.FILL);
		this.option_3_paint.set_paint_cap(paint.cap.ROUND);
		this.option_3_paint.set_paint_join(paint.join.ROUND);
		this.option_3_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.option_3_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.option_3_paint.set_text_size(global.variables.canvas_text_size_5);
		this.option_3_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.option_3_paint.set_alpha(255);
		this.option_3_paint.set_paint_align(paint.align.CENTER);
		if (MOBILE_MODE === true) {
			this.options = {
				c0: {
					string: '100%',
					number: 1.0
				},
				c1: {
					string: '250%',
					number: 2.5
				},
				c2: {
					string: '350%',
					number: 3.5
				},
				c3: {
					string: 'N/A',
					number: -1
				}
			};
		} else {
			this.options = {
				c0: {
					string: '50%',
					number: 0.5
				},
				c1: {
					string: '100%',
					number: 1.0
				},
				c2: {
					string: '200%',
					number: 2.0
				},
				c3: {
					string: 'N/A',
					number: -1
				}
			};
		}
		if (MOBILE_MODE) {
			this.width = view_port.view_width * 0.175;
			this.height = view_port.view_height * 0.13125;
		} else {
			this.width = view_port.view_width * 0.1;
			this.height = view_port.view_height * 0.075;
		}
		this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		let padding: number = this.PADDING * this.bounds.get_width();
		this.option_0 = new RectF(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
		this.option_1 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
		this.option_2 = new RectF(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
		this.option_3 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
		this.first_touch_x = 0;
		this.first_touch_y = 0;
	}
	mouse_down(): void {
		if (global.flags.flag_zoom && !global.variables.is_right_click) {
			this.first_touch_x = global.variables.mouse_x;
			this.first_touch_y = global.variables.mouse_y;
		}
	}
	mouse_move(): void {
		if (global.flags.flag_zoom && !global.variables.is_right_click) {
		}
	}
	mouse_up(): void {
		if (global.flags.flag_zoom && !global.variables.is_right_click) {
			if (!global.variables.mouse_keyboard_lock) {
				if (!this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && !this.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
					menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
					global.variables.component_touched = true;
				} else if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
					this.set_zoom(this.options['c0']['number']);
					menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
					global.variables.component_touched = true;
				} else if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
					this.set_zoom(this.options['c1']['number']);
					menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
					global.variables.component_touched = true;
				} else if (this.option_2.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_2.contains_xy(this.first_touch_x, this.first_touch_y)) {
					this.set_zoom(this.options['c2']['number']);
					menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
					global.variables.component_touched = true;
				} else if (this.option_3.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_3.contains_xy(this.first_touch_x, this.first_touch_y)) {
					menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
					global.variables.component_touched = true;
				}
			}
		}
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (global.flags.flag_zoom) {
			if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
				menu_bar.handle_zoom_flag(!global.flags.flag_zoom);
				global.variables.component_touched = true;
			}
		}
	}
	hover(): void {
		if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			this.option_0_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		} else {
			this.option_0_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		}
		if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			this.option_1_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		} else {
			this.option_1_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		}
		if (this.option_2.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			this.option_2_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		} else {
			this.option_2_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		}
		if (this.option_3.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
			this.option_3_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		} else {
			this.option_3_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		}
	}
	set_zoom(zoom: number): void {
		if (zoom >= global.CONSTANTS.ZOOM_MIN && zoom <= global.CONSTANTS.ZOOM_MAX) {
			global.flags.flag_build_element = true;
			global.variables.flag_build_counter = 0;
			global.variables.workspace_zoom_scale = zoom;
			global.variables.x_offset = 0;
			global.variables.y_offset = 0;
			global.variables.delta_x = workspace.bounds.left;
			global.variables.delta_y = workspace.bounds.top;
			workspace.workspace_zoom();
			let dx: number = view_port.center_x - workspace.bounds.get_center_x();
			let dy: number = view_port.center_y - workspace.bounds.get_center_y();
			workspace.workspace_translate_bounds(dx, dy);
			global.variables.delta_x += dx;
			global.variables.delta_y += dy;
		}
	}
	resize_window(): void {
		if (MOBILE_MODE) {
			this.width = view_port.view_width * 0.175;
			this.height = view_port.view_height * 0.13125;
		} else {
			this.width = view_port.view_width * 0.1;
			this.height = view_port.view_height * 0.075;
		}
		this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		let padding: number = this.PADDING * this.bounds.get_width();
		this.option_0.set_bounds(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
		this.option_1.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
		this.option_2.set_bounds(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
		this.option_3.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		}
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
	}
	draw_window(canvas: GraphicsEngine): void {
		if (global.flags.flag_zoom) {
			if (!MOBILE_MODE) {
				this.hover();
				canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
			}
			canvas.draw_rect2(this.bounds, this.bounds_paint);
			canvas.draw_rect2(this.option_0, this.option_0_paint);
			canvas.draw_text(this.options['c0']['string'], this.option_0.get_center_x(), this.option_0.get_center_y(), this.text_paint);
			canvas.draw_rect2(this.option_1, this.option_1_paint);
			canvas.draw_text(this.options['c1']['string'], this.option_1.get_center_x(), this.option_1.get_center_y(), this.text_paint);
			canvas.draw_rect2(this.option_2, this.option_2_paint);
			canvas.draw_text(this.options['c2']['string'], this.option_2.get_center_x(), this.option_2.get_center_y(), this.text_paint);
			canvas.draw_rect2(this.option_3, this.option_3_paint);
			canvas.draw_text(language_manager.EXIT[global.CONSTANTS.LANGUAGES[global.variables.language_index]], this.option_3.get_center_x(), this.option_3.get_center_y(), this.text_paint);
		}
	}
}
