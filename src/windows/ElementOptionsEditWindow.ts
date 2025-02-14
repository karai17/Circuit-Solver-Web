'use strict';
class ElementOptionsEditWindow {
	private readonly TITLE_HEIGHT_RATIO: number;
	private readonly BUTTON_WIDTH_RATIO: number;
	private readonly BUTTON_HEIGHT_RATIO: number;
	private readonly PADDING: number;
	private line_paint: Paint;
	private point_paint: Paint;
	private text_paint: Paint;
	private hover_paint: Paint;
	private bounds_paint: Paint;
	private width: number;
	private height: number;
	private bounds: RectF;
	private title_bounds: Button;
	private okay_button: Button;
	private cancel_button: Button;
	private exit_button: Button;
	private input_button: Button;
	private select_paint: Paint;
	public option_index: number;
	private cursor_position: number;
	private select_all: boolean;
	private offset_x: number;
	private offset_y: number;
	private window_anchored: boolean;
	private anchor_x: number;
	private anchor_y: number;
	private first_touch_x: number;
	private first_touch_y: number;
	private measured_text: number;
	private initial_cursor_down: number;
	private select_start: number;
	private select_end: number;
	private select_width: number;
	private select_offset_x: number;
	private mouse_down_flag: boolean;
	private ascending_flag: boolean;
	private text: string;
	private adj_text: string;
	private cached_measured_text: number;
	private min: number;
	private max: number;
	private width_mul_0p3636: number;
	private height_mul_0p3636: number;

	constructor() {
		this.TITLE_HEIGHT_RATIO = 0.25;
		this.BUTTON_WIDTH_RATIO = 0.3;
		this.BUTTON_HEIGHT_RATIO = 0.25;
		if (MOBILE_MODE === false) {
			this.PADDING = 0.0175;
		} else {
			this.PADDING = 0.013125;
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
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(paint.style.FILL);
		this.point_paint.set_paint_cap(paint.cap.ROUND);
		this.point_paint.set_paint_join(paint.join.ROUND);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(paint.style.FILL);
		this.text_paint.set_paint_cap(paint.cap.ROUND);
		this.text_paint.set_paint_join(paint.join.ROUND);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
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
		this.bounds_paint = new Paint();
		this.bounds_paint.set_paint_style(paint.style.FILL);
		this.bounds_paint.set_paint_cap(paint.cap.ROUND);
		this.bounds_paint.set_paint_join(paint.join.ROUND);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
		this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.bounds_paint.set_alpha(255);
		this.bounds_paint.set_paint_align(paint.align.CENTER);
		if (MOBILE_MODE) {
			this.width = view_port.view_width * 0.2625;
			this.height = view_port.view_height * 0.125;
		} else {
			this.width = view_port.view_width * 0.25;
			this.height = view_port.view_height * 0.085;
		}
		if (MOBILE_MODE) {
			let c_y = 0.25 * view_port.view_height;
			this.bounds = new RectF(view_port.center_x - this.width, c_y - this.height, view_port.center_x + this.width, c_y + this.height);
		} else {
			this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		}
		this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.text = '';
		this.title_bounds.text_paint.set_paint_align(this.title_bounds.text_paint.align.LEFT);
		this.title_bounds.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.title_bounds.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.title_bounds.fill_paint.set_alpha(130);
		this.title_bounds.draw_stroke = false;
		this.title_bounds.draw_fill = true;
		this.title_bounds.draw_text = false;
		let padding: number = this.PADDING * this.bounds.get_width();
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.okay_button = new Button(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
		this.okay_button.text = '';
		this.okay_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.okay_button.fill_paint.set_alpha(130);
		this.okay_button.draw_stroke = false;
		this.okay_button.draw_fill = true;
		this.cancel_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.cancel_button.text = '';
		this.cancel_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.cancel_button.fill_paint.set_alpha(130);
		this.cancel_button.draw_stroke = false;
		this.cancel_button.draw_fill = true;
		this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.draw_stroke = true;
		this.exit_button.draw_fill = false;
		this.exit_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.input_button = new Button(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
		this.input_button.text = '';
		this.input_button.fill_paint.set_color(global.COLORS.GENERAL_INPUT_COLOR);
		this.input_button.line_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.input_button.draw_stroke = true;
		this.input_button.draw_fill = true;
		this.input_button.draw_cursor = false;
		this.input_button.draw_text = false;
		this.input_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.input_button.resize_paint();
		this.select_paint = new Paint();
		this.select_paint.set_paint_style(paint.style.FILL);
		this.select_paint.set_paint_cap(paint.cap.ROUND);
		this.select_paint.set_paint_join(paint.join.ROUND);
		this.select_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.select_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
		this.select_paint.set_text_size(global.variables.canvas_text_size_5);
		this.select_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.select_paint.set_alpha(64);
		this.select_paint.set_paint_align(paint.align.CENTER);
		this.option_index = -1;
		this.cursor_position = 0;
		this.select_all = false;
		this.offset_x = 0;
		this.offset_y = 0;
		this.window_anchored = true;
		this.anchor_x = 0;
		this.anchor_y = 0;
		this.first_touch_x = 0;
		this.first_touch_y = 0;
		this.measured_text = -1;
		this.initial_cursor_down = -1;
		this.select_start = -1;
		this.select_end = -1;
		this.select_width = -1;
		this.select_offset_x = -1;
		this.mouse_down_flag = false;
		this.ascending_flag = false;
		this.text = '';
		this.adj_text = '';
		this.cached_measured_text = 0;
		this.min = 0;
		this.max = 0;
		this.width_mul_0p3636 = 0;
		this.height_mul_0p3636 = 0;
	}
	set_title(text: string): void {
		this.title_bounds.text = text;
	}
	set_input_text(text: string): void {
		this.input_button.text = text;
	}
	mouse_down(): void {
		if (global.flags.flag_element_options_edit && !global.variables.is_right_click) {
			if (
				this.title_bounds.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
				!this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y)
			) {
				this.anchor_x = global.variables.mouse_x - this.offset_x;
				this.anchor_y = global.variables.mouse_y - this.offset_y;
				this.window_anchored = false;
			}
			this.first_touch_x = global.variables.mouse_x;
			this.first_touch_y = global.variables.mouse_y;

			this.initial_cursor_down = this.insert_cursor(false, false);
			this.mouse_down_flag = true;
		}
	}
	mouse_move(): void {
		if (global.flags.flag_element_options_edit && !global.variables.is_right_click) {
			if (!this.window_anchored) {
				this.offset_x = global.variables.mouse_x - this.anchor_x;
				this.offset_y = global.variables.mouse_y - this.anchor_y;
				if (this.bounds.right + this.offset_x >= view_port.right) {
					this.offset_x = view_port.right - this.bounds.right;
				}
				if (this.bounds.left + this.offset_x <= view_port.left) {
					this.offset_x = view_port.left - this.bounds.left;
				}
				if (this.bounds.top + this.offset_y <= view_port.top) {
					this.offset_y = view_port.top - this.bounds.top;
				}
				if (MOBILE_MODE) {
					if (this.bounds.bottom + this.offset_y >= on_screen_keyboard.bounds.top) {
						this.offset_y = on_screen_keyboard.bounds.top - this.bounds.bottom;
					}
				} else {
					if (this.bounds.bottom + this.offset_y >= view_port.bottom) {
						this.offset_y = view_port.bottom - this.bounds.bottom;
					}
				}
			} else {
				if (this.mouse_down_flag && this.initial_cursor_down !== -1) {
					this.insert_cursor(true, true);
				}
			}
		}
	}
	mouse_up(): void {
		if (global.flags.flag_element_options_edit && !global.variables.is_right_click) {
			if (!global.variables.mouse_keyboard_lock) {
				if (this.window_anchored) {
					this.insert_cursor(true, false);
					this.initial_cursor_down = -1;
					if (
						!this.bounds.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						!this.bounds.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						if (MOBILE_MODE) {
							if (!on_screen_keyboard.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
								menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
								menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
								global.variables.component_touched = true;
								global.variables.mouse_keyboard_lock = true;
							}
						} else {
							menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
							menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
							global.variables.component_touched = true;
							global.variables.mouse_keyboard_lock = true;
						}
					} else if (
						this.okay_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.okay_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						if (!this.push_property_update()) {
							menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
							menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						}
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else if (
						this.cancel_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.cancel_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else if (
						this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.exit_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else if (
						this.input_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.input_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						if (this.select_all) {
							if (this.select_all && !global.flags.flag_mouse_double_click_event) {
								this.select_all = false;
							}
						}
					}
				} else {
					this.anchor_x = global.variables.mouse_x - this.offset_x;
					this.anchor_y = global.variables.mouse_y - this.offset_y;
				}
				this.window_anchored = true;
				this.mouse_down_flag = false;
			}
		}
	}
	insert_cursor(is_mouse_up: boolean, is_mouse_move: boolean): number {
		let min: number = this.input_button.get_center_x() - this.measured_text * 0.5;
		let max: number = this.input_button.get_center_x() + this.measured_text * 0.5;
		let remapped_x: number = global.variables.mouse_x - this.offset_x;
		let remapped_y: number = global.variables.mouse_y - this.offset_y;
		if (remapped_x <= min) {
			remapped_x = min;
		}
		if (remapped_x >= max) {
			remapped_x = max;
		}
		let width: number = max - min;
		let char_length: number = (this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length)).length;
		let percent: number = (remapped_x - min) / width;
		let insert_at: number = Math.ceil(percent * char_length);
		if (is_mouse_up && this.input_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
			if (!is_mouse_move) {
				this.cursor_position = insert_at;
			}
			if (this.initial_cursor_down !== -1 && insert_at !== this.initial_cursor_down) {
				if (this.initial_cursor_down < insert_at) {
					this.ascending_flag = true;
				} else {
					this.ascending_flag = false;
				}
				this.select_start = Math.min(insert_at, this.initial_cursor_down);
				this.select_end = Math.max(insert_at, this.initial_cursor_down);
			} else {
				this.select_start = -1;
				this.select_end = -1;
			}
		}
		return insert_at;
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (global.flags.flag_element_options_edit) {
			if (!global.variables.mouse_keyboard_lock) {
				this.handle_keyboard(key_event);
			}
		}
	}
	key_up(key_event: KEY_EVENT_T): void {
		if (global.flags.flag_element_options_edit) {
		}
	}
	handle_keyboard(key_event: KEY_EVENT_T): void {
		if (!this.special_type(global.variables.selected_type)) {
			if (global.utils.is_valid_si_units(key_event) && key_event['event'].code !== global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
				if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
					if (!this.select_all) {
						if (this.select_start !== -1 && this.select_end !== -1) {
							this.handle_partial_select();
						}
						this.input_button.text =
							this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					} else {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
						this.input_button.text =
							this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					}
				} else {
					if (this.select_all) {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
						this.input_button.text =
							this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
				if (this.input_button.text.length > 0) {
					if (!this.select_all) {
						if (this.select_start === this.select_end) {
							this.select_start = -1;
							this.select_end = -1;
						}
						if (this.select_start !== -1 && this.select_end !== -1) {
							this.handle_partial_select();
						} else {
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position - 1) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position > 0) {
								this.cursor_position--;
							}
						}
					} else {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
				if (this.input_button.text.length > 0) {
					if (!this.select_all) {
						if (this.select_start === this.select_end) {
							this.select_start = -1;
							this.select_end = -1;
						}
						if (this.select_start !== -1 && this.select_end !== -1) {
							this.handle_partial_select();
						} else {
							if (this.cursor_position < this.input_button.text.length) {
								this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position + 1, this.input_button.text.length);
							}
						}
					} else {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
					}
				}
			} else if ((key_event['event'].code === global.KEY_CODES.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODES.KEY_CODE_NUMPAD_MINUS) && !key_event['shift']) {
				if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
					if (!this.select_all) {
						if (this.select_start !== -1 && this.select_end !== -1) {
							this.handle_partial_select();
						}
						this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					} else {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
						this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
				if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
					if (!this.select_all) {
						if (this.select_start !== -1 && this.select_end !== -1) {
							this.handle_partial_select();
						}
						this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					} else {
						this.input_button.text = '';
						this.cursor_position = 0;
						this.select_all = false;
						this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER && !key_event['ctrl']) {
				if (!this.push_property_update()) {
					menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
					menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
				if (key_event['shift'] === false) {
					this.select_start = -1;
					this.select_end = -1;
					if (this.cursor_position > 0) {
						this.cursor_position--;
						this.select_all = false;
					}
				} else {
					if (this.select_start === -1 && this.select_end === -1) {
						this.select_start = this.cursor_position - 1;
						this.select_end = this.cursor_position;
						if (this.select_start < 0) {
							this.select_start = 0;
							this.select_end = 0;
						}
						this.cursor_position = this.select_start;
						this.ascending_flag = false;
					} else {
						if (this.ascending_flag) {
							if (this.select_end > 0) {
								this.select_end--;
								this.cursor_position = this.select_end;
							}
						} else {
							if (this.select_start > 0) {
								this.select_start--;
								this.cursor_position = this.select_start;
							}
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
				if (key_event['shift'] === false) {
					this.select_start = -1;
					this.select_end = -1;
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
						this.select_all = false;
					}
				} else {
					if (this.select_start === -1 && this.select_end === -1) {
						this.select_start = this.cursor_position;
						this.select_end = this.cursor_position + 1;
						if (this.cursor_position >= this.input_button.text.length) {
							this.select_start = this.cursor_position;
							this.select_end = this.cursor_position;
						}
						this.cursor_position = this.select_end;
						this.ascending_flag = true;
					} else {
						if (this.ascending_flag) {
							if (this.select_end < this.input_button.text.length) {
								this.select_end++;
								this.cursor_position = this.select_end;
							}
						} else {
							if (this.select_start < this.input_button.text.length) {
								this.select_start++;
								this.cursor_position = this.select_start;
							}
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE && !key_event['ctrl']) {
				menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
				menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
				if (key_event['shift'] === false) {
					this.select_start = -1;
					this.select_end = -1;
					this.cursor_position = 0;
					this.select_all = false;
				} else {
					if (this.select_start === -1 && this.select_end === -1) {
						this.select_all = false;
						this.select_start = 0;
						this.select_end = this.cursor_position;
						if (this.select_start < 0) {
							this.select_start = 0;
							this.select_end = 0;
						}
						this.cursor_position = this.select_start;
						this.ascending_flag = false;
					} else {
						if (this.ascending_flag) {
							this.select_all = false;
							if (this.select_end > 0) {
								this.select_end = 0;
								this.cursor_position = this.select_end;
							}
						} else {
							this.select_all = false;
							if (this.select_start > 0) {
								this.select_start = 0;
								this.cursor_position = this.select_start;
							}
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_END && !key_event['ctrl']) {
				if (key_event['shift'] === false) {
					this.reset_cursor();
				} else {
					if (this.select_start === -1 && this.select_end === -1) {
						this.select_all = false;
						this.select_start = this.cursor_position;
						this.select_end = this.input_button.text.length;
						if (this.cursor_position >= this.input_button.text.length) {
							this.select_start = this.cursor_position;
							this.select_end = this.cursor_position;
						}
						this.cursor_position = this.select_end;
						this.ascending_flag = true;
					} else {
						if (this.ascending_flag) {
							this.select_all = false;
							if (this.select_end < this.input_button.text.length) {
								this.select_end = this.input_button.text.length;
								this.cursor_position = this.select_end;
							}
						} else {
							this.select_all = false;
							if (this.select_start < this.input_button.text.length) {
								this.select_start = this.input_button.text.length;
								this.cursor_position = this.select_start;
							}
						}
					}
				}
			} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_A && key_event['ctrl'] === true) {
				this.select_all = false;
				this.select_start = 0;
				this.ascending_flag = true;
				this.select_end = this.input_button.text.length;
				this.cursor_position = this.input_button.text.length;
			}
		} else {
			if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
				if (global.utils.is_alpha_numeric_note(key_event) && key_event['event'].code !== global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					} else {
						if (this.select_all) {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
					if (this.input_button.text.length > 0) {
						if (!this.select_all) {
							if (this.select_start === this.select_end) {
								this.select_start = -1;
								this.select_end = -1;
							}
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							} else {
								this.input_button.text = this.input_button.text.substring(0, this.cursor_position - 1) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
								if (this.cursor_position > 0) {
									this.cursor_position--;
								}
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
					if (this.input_button.text.length > 0) {
						if (!this.select_all) {
							if (this.select_start === this.select_end) {
								this.select_start = -1;
								this.select_end = -1;
							}
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							} else {
								if (this.cursor_position < this.input_button.text.length) {
									this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position + 1, this.input_button.text.length);
								}
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODES.KEY_CODE_NUMPAD_MINUS) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER && !key_event['ctrl']) {
					if (!this.push_property_update()) {
						menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						if (this.cursor_position > 0) {
							this.cursor_position--;
							this.select_all = false;
						}
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_start = this.cursor_position - 1;
							this.select_end = this.cursor_position;
							if (this.select_start < 0) {
								this.select_start = 0;
								this.select_end = 0;
							}
							this.cursor_position = this.select_start;
							this.ascending_flag = false;
						} else {
							if (this.ascending_flag) {
								if (this.select_end > 0) {
									this.select_end--;
									this.cursor_position = this.select_end;
								}
							} else {
								if (this.select_start > 0) {
									this.select_start--;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
							this.select_all = false;
						}
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_start = this.cursor_position;
							this.select_end = this.cursor_position + 1;
							if (this.cursor_position >= this.input_button.text.length) {
								this.select_start = this.cursor_position;
								this.select_end = this.cursor_position;
							}
							this.cursor_position = this.select_end;
							this.ascending_flag = true;
						} else {
							if (this.ascending_flag) {
								if (this.select_end < this.input_button.text.length) {
									this.select_end++;
									this.cursor_position = this.select_end;
								}
							} else {
								if (this.select_start < this.input_button.text.length) {
									this.select_start++;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE && !key_event['ctrl']) {
					menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
					menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						this.cursor_position = 0;
						this.select_all = false;
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_all = false;
							this.select_start = 0;
							this.select_end = this.cursor_position;
							if (this.select_start < 0) {
								this.select_start = 0;
								this.select_end = 0;
							}
							this.cursor_position = this.select_start;
							this.ascending_flag = false;
						} else {
							if (this.ascending_flag) {
								this.select_all = false;
								if (this.select_end > 0) {
									this.select_end = 0;
									this.cursor_position = this.select_end;
								}
							} else {
								this.select_all = false;
								if (this.select_start > 0) {
									this.select_start = 0;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_END && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.reset_cursor();
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_all = false;
							this.select_start = this.cursor_position;
							this.select_end = this.input_button.text.length;
							if (this.cursor_position >= this.input_button.text.length) {
								this.select_start = this.cursor_position;
								this.select_end = this.cursor_position;
							}
							this.cursor_position = this.select_end;
							this.ascending_flag = true;
						} else {
							if (this.ascending_flag) {
								this.select_all = false;
								if (this.select_end < this.input_button.text.length) {
									this.select_end = this.input_button.text.length;
									this.cursor_position = this.select_end;
								}
							} else {
								this.select_all = false;
								if (this.select_start < this.input_button.text.length) {
									this.select_start = this.input_button.text.length;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_A && key_event['ctrl'] === true) {
					this.select_all = false;
					this.select_start = 0;
					this.ascending_flag = true;
					this.select_end = this.input_button.text.length;
					this.cursor_position = this.input_button.text.length;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
				if (global.utils.is_alpha_numeric(key_event) && key_event['event'].code !== global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					} else {
						if (this.select_all) {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text =
								this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
					if (this.input_button.text.length > 0) {
						if (!this.select_all) {
							if (this.select_start === this.select_end) {
								this.select_start = -1;
								this.select_end = -1;
							}
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							} else {
								this.input_button.text = this.input_button.text.substring(0, this.cursor_position - 1) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
								if (this.cursor_position > 0) {
									this.cursor_position--;
								}
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
					if (this.input_button.text.length > 0) {
						if (!this.select_all) {
							if (this.select_start === this.select_end) {
								this.select_start = -1;
								this.select_end = -1;
							}
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							} else {
								if (this.cursor_position < this.input_button.text.length) {
									this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position + 1, this.input_button.text.length);
								}
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODES.KEY_CODE_NUMPAD_MINUS) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
					if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
						if (!this.select_all) {
							if (this.select_start !== -1 && this.select_end !== -1) {
								this.handle_partial_select();
							}
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						} else {
							this.input_button.text = '';
							this.cursor_position = 0;
							this.select_all = false;
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
							if (this.cursor_position < this.input_button.text.length) {
								this.cursor_position++;
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER && !key_event['ctrl']) {
					if (!this.push_property_update()) {
						menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						if (this.cursor_position > 0) {
							this.cursor_position--;
							this.select_all = false;
						}
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_start = this.cursor_position - 1;
							this.select_end = this.cursor_position;
							if (this.select_start < 0) {
								this.select_start = 0;
								this.select_end = 0;
							}
							this.cursor_position = this.select_start;
							this.ascending_flag = false;
						} else {
							if (this.ascending_flag) {
								if (this.select_end > 0) {
									this.select_end--;
									this.cursor_position = this.select_end;
								}
							} else {
								if (this.select_start > 0) {
									this.select_start--;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						if (this.cursor_position < this.input_button.text.length) {
							this.cursor_position++;
							this.select_all = false;
						}
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_start = this.cursor_position;
							this.select_end = this.cursor_position + 1;
							if (this.cursor_position >= this.input_button.text.length) {
								this.select_start = this.cursor_position;
								this.select_end = this.cursor_position;
							}
							this.cursor_position = this.select_end;
							this.ascending_flag = true;
						} else {
							if (this.ascending_flag) {
								if (this.select_end < this.input_button.text.length) {
									this.select_end++;
									this.cursor_position = this.select_end;
								}
							} else {
								if (this.select_start < this.input_button.text.length) {
									this.select_start++;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE && !key_event['ctrl']) {
					menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
					menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
					if (key_event['shift'] === false) {
						this.select_start = -1;
						this.select_end = -1;
						this.cursor_position = 0;
						this.select_all = false;
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_all = false;
							this.select_start = 0;
							this.select_end = this.cursor_position;
							if (this.select_start < 0) {
								this.select_start = 0;
								this.select_end = 0;
							}
							this.cursor_position = this.select_start;
							this.ascending_flag = false;
						} else {
							if (this.ascending_flag) {
								this.select_all = false;
								if (this.select_end > 0) {
									this.select_end = 0;
									this.cursor_position = this.select_end;
								}
							} else {
								this.select_all = false;
								if (this.select_start > 0) {
									this.select_start = 0;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_END && !key_event['ctrl']) {
					if (key_event['shift'] === false) {
						this.reset_cursor();
					} else {
						if (this.select_start === -1 && this.select_end === -1) {
							this.select_all = false;
							this.select_start = this.cursor_position;
							this.select_end = this.input_button.text.length;
							if (this.cursor_position >= this.input_button.text.length) {
								this.select_start = this.cursor_position;
								this.select_end = this.cursor_position;
							}
							this.cursor_position = this.select_end;
							this.ascending_flag = true;
						} else {
							if (this.ascending_flag) {
								this.select_all = false;
								if (this.select_end < this.input_button.text.length) {
									this.select_end = this.input_button.text.length;
									this.cursor_position = this.select_end;
								}
							} else {
								this.select_all = false;
								if (this.select_start < this.input_button.text.length) {
									this.select_start = this.input_button.text.length;
									this.cursor_position = this.select_start;
								}
							}
						}
					}
				} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_A && key_event['ctrl'] === true) {
					this.select_all = false;
					this.select_start = 0;
					this.ascending_flag = true;
					this.select_end = this.input_button.text.length;
					this.cursor_position = this.input_button.text.length;
				}
			}
		}
	}
	special_type(elm_type: number): boolean {
		if (elm_type === global.ELEMENT_TYPES.TYPE_NET || elm_type === global.ELEMENT_TYPES.TYPE_NOTE) {
			return true;
		}
		return false;
	}
	push_property_update(): boolean {
		let ERROR_FLAG: boolean = false;
		/* #INSERT_GENERATE_ELEMENT_UPDATE_PROPERTY# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
			var index: number = -1;
			index = engine_functions.get_resistor(global.variables.selected_id);
			if (index > -1 && index < resistors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					resistors[index].elm.properties[resistors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
			var index: number = -1;
			index = engine_functions.get_capacitor(global.variables.selected_id);
			if (index > -1 && index < capacitors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					capacitors[index].elm.properties[capacitors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
				if (capacitors[index].elm.properties['options'][this.option_index] === 'Capacitance') {
					capacitors[index].conserve_energy();
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
			var index: number = -1;
			index = engine_functions.get_inductor(global.variables.selected_id);
			if (index > -1 && index < inductors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					inductors[index].elm.properties[inductors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
				if (inductors[index].elm.properties['options'][this.option_index] === 'Inductance') {
					inductors[index].conserve_energy();
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
			var index: number = -1;
			index = engine_functions.get_ground(global.variables.selected_id);
			if (index > -1 && index < grounds.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					grounds[index].elm.properties[grounds[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
			var index: number = -1;
			index = engine_functions.get_dcsource(global.variables.selected_id);
			if (index > -1 && index < dcsources.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					dcsources[index].elm.properties[dcsources[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
			var index: number = -1;
			index = engine_functions.get_dccurrent(global.variables.selected_id);
			if (index > -1 && index < dccurrents.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					dccurrents[index].elm.properties[dccurrents[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
			var index: number = -1;
			index = engine_functions.get_acsource(global.variables.selected_id);
			if (index > -1 && index < acsources.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					acsources[index].elm.properties[acsources[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
			var index: number = -1;
			index = engine_functions.get_accurrent(global.variables.selected_id);
			if (index > -1 && index < accurrents.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					accurrents[index].elm.properties[accurrents[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
			var index: number = -1;
			index = engine_functions.get_squarewave(global.variables.selected_id);
			if (index > -1 && index < squarewaves.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					squarewaves[index].elm.properties[squarewaves[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
			var index: number = -1;
			index = engine_functions.get_sawwave(global.variables.selected_id);
			if (index > -1 && index < sawwaves.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					sawwaves[index].elm.properties[sawwaves[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
			var index: number = -1;
			index = engine_functions.get_trianglewave(global.variables.selected_id);
			if (index > -1 && index < trianglewaves.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					trianglewaves[index].elm.properties[trianglewaves[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
			var index: number = -1;
			index = engine_functions.get_constant(global.variables.selected_id);
			if (index > -1 && index < constants.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					constants[index].elm.properties[constants[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
			var index: number = -1;
			index = engine_functions.get_net(global.variables.selected_id);
			if (index > -1 && index < nets.length) {
				//@ts-expect-error
				var value: string = global.utils.copy(this.input_button.text);
				//@ts-expect-error
				global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = value;
				//@ts-expect-error
				nets[index].elm.properties[nets[index].elm.properties['options'][this.option_index]] = value;
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
			var index: number = -1;
			index = engine_functions.get_note(global.variables.selected_id);
			if (index > -1 && index < notes.length) {
				//@ts-expect-error
				var value: string = global.utils.copy(this.input_button.text);
				//@ts-expect-error
				global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = value;
				//@ts-expect-error
				notes[index].elm.properties[notes[index].elm.properties['options'][this.option_index]] = value;
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
			var index: number = -1;
			index = engine_functions.get_rail(global.variables.selected_id);
			if (index > -1 && index < rails.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					rails[index].elm.properties[rails[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
			var index: number = -1;
			index = engine_functions.get_voltmeter(global.variables.selected_id);
			if (index > -1 && index < voltmeters.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					voltmeters[index].elm.properties[voltmeters[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
			var index: number = -1;
			index = engine_functions.get_ohmmeter(global.variables.selected_id);
			if (index > -1 && index < ohmmeters.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					ohmmeters[index].elm.properties[ohmmeters[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
			var index: number = -1;
			index = engine_functions.get_ammeter(global.variables.selected_id);
			if (index > -1 && index < ammeters.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					ammeters[index].elm.properties[ammeters[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
			var index: number = -1;
			index = engine_functions.get_wattmeter(global.variables.selected_id);
			if (index > -1 && index < wattmeters.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					wattmeters[index].elm.properties[wattmeters[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
			var index: number = -1;
			index = engine_functions.get_fuse(global.variables.selected_id);
			if (index > -1 && index < fuses.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					fuses[index].elm.properties[fuses[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
			var index: number = -1;
			index = engine_functions.get_spst(global.variables.selected_id);
			if (index > -1 && index < spsts.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					spsts[index].elm.properties[spsts[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
			var index: number = -1;
			index = engine_functions.get_spdt(global.variables.selected_id);
			if (index > -1 && index < spdts.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					spdts[index].elm.properties[spdts[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
			var index: number = -1;
			index = engine_functions.get_not(global.variables.selected_id);
			if (index > -1 && index < nots.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					nots[index].elm.properties[nots[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
			var index: number = -1;
			index = engine_functions.get_diode(global.variables.selected_id);
			if (index > -1 && index < diodes.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					diodes[index].elm.properties[diodes[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
			var index: number = -1;
			index = engine_functions.get_led(global.variables.selected_id);
			if (index > -1 && index < leds.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					leds[index].elm.properties[leds[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
			var index: number = -1;
			index = engine_functions.get_zener(global.variables.selected_id);
			if (index > -1 && index < zeners.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					zeners[index].elm.properties[zeners[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
			var index: number = -1;
			index = engine_functions.get_potentiometer(global.variables.selected_id);
			if (index > -1 && index < potentiometers.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					potentiometers[index].elm.properties[potentiometers[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
			var index: number = -1;
			index = engine_functions.get_and(global.variables.selected_id);
			if (index > -1 && index < ands.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					ands[index].elm.properties[ands[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
			var index: number = -1;
			index = engine_functions.get_or(global.variables.selected_id);
			if (index > -1 && index < ors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					ors[index].elm.properties[ors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
			var index: number = -1;
			index = engine_functions.get_nand(global.variables.selected_id);
			if (index > -1 && index < nands.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					nands[index].elm.properties[nands[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
			var index: number = -1;
			index = engine_functions.get_nor(global.variables.selected_id);
			if (index > -1 && index < nors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					nors[index].elm.properties[nors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
			var index: number = -1;
			index = engine_functions.get_xor(global.variables.selected_id);
			if (index > -1 && index < xors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					xors[index].elm.properties[xors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
			var index: number = -1;
			index = engine_functions.get_xnor(global.variables.selected_id);
			if (index > -1 && index < xnors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					xnors[index].elm.properties[xnors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
			var index: number = -1;
			index = engine_functions.get_dff(global.variables.selected_id);
			if (index > -1 && index < dffs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					dffs[index].elm.properties[dffs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
			var index: number = -1;
			index = engine_functions.get_vsat(global.variables.selected_id);
			if (index > -1 && index < vsats.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vsats[index].elm.properties[vsats[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
			var index: number = -1;
			index = engine_functions.get_adder(global.variables.selected_id);
			if (index > -1 && index < adders.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					adders[index].elm.properties[adders[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
			var index: number = -1;
			index = engine_functions.get_subtractor(global.variables.selected_id);
			if (index > -1 && index < subtractors.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					subtractors[index].elm.properties[subtractors[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
			var index: number = -1;
			index = engine_functions.get_multiplier(global.variables.selected_id);
			if (index > -1 && index < multipliers.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					multipliers[index].elm.properties[multipliers[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
			var index: number = -1;
			index = engine_functions.get_divider(global.variables.selected_id);
			if (index > -1 && index < dividers.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					dividers[index].elm.properties[dividers[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
			var index: number = -1;
			index = engine_functions.get_gain(global.variables.selected_id);
			if (index > -1 && index < gains.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					gains[index].elm.properties[gains[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
			var index: number = -1;
			index = engine_functions.get_absval(global.variables.selected_id);
			if (index > -1 && index < absvals.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					absvals[index].elm.properties[absvals[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
			var index: number = -1;
			index = engine_functions.get_vcsw(global.variables.selected_id);
			if (index > -1 && index < vcsws.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vcsws[index].elm.properties[vcsws[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
			var index: number = -1;
			index = engine_functions.get_vcvs(global.variables.selected_id);
			if (index > -1 && index < vcvss.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vcvss[index].elm.properties[vcvss[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
			var index: number = -1;
			index = engine_functions.get_vccs(global.variables.selected_id);
			if (index > -1 && index < vccss.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vccss[index].elm.properties[vccss[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
			var index: number = -1;
			index = engine_functions.get_cccs(global.variables.selected_id);
			if (index > -1 && index < cccss.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					cccss[index].elm.properties[cccss[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
			var index: number = -1;
			index = engine_functions.get_ccvs(global.variables.selected_id);
			if (index > -1 && index < ccvss.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					ccvss[index].elm.properties[ccvss[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
			var index: number = -1;
			index = engine_functions.get_opamp(global.variables.selected_id);
			if (index > -1 && index < opamps.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					opamps[index].elm.properties[opamps[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
			var index: number = -1;
			index = engine_functions.get_nmosfet(global.variables.selected_id);
			if (index > -1 && index < nmosfets.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					nmosfets[index].elm.properties[nmosfets[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
			var index: number = -1;
			index = engine_functions.get_pmosfet(global.variables.selected_id);
			if (index > -1 && index < pmosfets.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					pmosfets[index].elm.properties[pmosfets[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
			var index: number = -1;
			index = engine_functions.get_npn(global.variables.selected_id);
			if (index > -1 && index < npns.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					npns[index].elm.properties[npns[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
			var index: number = -1;
			index = engine_functions.get_pnp(global.variables.selected_id);
			if (index > -1 && index < pnps.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					pnps[index].elm.properties[pnps[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
			var index: number = -1;
			index = engine_functions.get_adc(global.variables.selected_id);
			if (index > -1 && index < adcs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					adcs[index].elm.properties[adcs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
			var index: number = -1;
			index = engine_functions.get_dac(global.variables.selected_id);
			if (index > -1 && index < dacs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					dacs[index].elm.properties[dacs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
			var index: number = -1;
			index = engine_functions.get_samplers(global.variables.selected_id);
			if (index > -1 && index < sandhs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					sandhs[index].elm.properties[sandhs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
			var index: number = -1;
			index = engine_functions.get_pwm(global.variables.selected_id);
			if (index > -1 && index < pwms.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					pwms[index].elm.properties[pwms[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
			var index: number = -1;
			index = engine_functions.get_integrator(global.variables.selected_id);
			if (index > -1 && index < integrators.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					integrators[index].elm.properties[integrators[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
			var index: number = -1;
			index = engine_functions.get_differentiator(global.variables.selected_id);
			if (index > -1 && index < differentiators.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					differentiators[index].elm.properties[differentiators[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
			var index: number = -1;
			index = engine_functions.get_lowpass(global.variables.selected_id);
			if (index > -1 && index < lowpasses.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					lowpasses[index].elm.properties[lowpasses[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
			var index: number = -1;
			index = engine_functions.get_highpass(global.variables.selected_id);
			if (index > -1 && index < highpasses.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					highpasses[index].elm.properties[highpasses[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
			var index: number = -1;
			index = engine_functions.get_relay(global.variables.selected_id);
			if (index > -1 && index < relays.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					relays[index].elm.properties[relays[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
				if (relays[index].elm.properties['options'][this.option_index] === 'Inductance') {
					relays[index].conserve_energy();
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
			var index: number = -1;
			index = engine_functions.get_pid(global.variables.selected_id);
			if (index > -1 && index < pids.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					pids[index].elm.properties[pids[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
			var index: number = -1;
			index = engine_functions.get_lut(global.variables.selected_id);
			if (index > -1 && index < luts.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					luts[index].elm.properties[luts[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
			var index: number = -1;
			index = engine_functions.get_vcr(global.variables.selected_id);
			if (index > -1 && index < vcrs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vcrs[index].elm.properties[vcrs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
			var index: number = -1;
			index = engine_functions.get_vcca(global.variables.selected_id);
			if (index > -1 && index < vccas.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vccas[index].elm.properties[vccas[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
			var index: number = -1;
			index = engine_functions.get_vcl(global.variables.selected_id);
			if (index > -1 && index < vcls.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					vcls[index].elm.properties[vcls[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
			var index: number = -1;
			index = engine_functions.get_grt(global.variables.selected_id);
			if (index > -1 && index < grts.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					grts[index].elm.properties[grts[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
			var index: number = -1;
			index = engine_functions.get_tptz(global.variables.selected_id);
			if (index > -1 && index < tptzs.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					tptzs[index].elm.properties[tptzs[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
			var index: number = -1;
			index = engine_functions.get_transformer(global.variables.selected_id);
			if (index > -1 && index < transformers.length) {
				var value: number = string_operator.parse(this.input_button.text);
				if (
					Math.abs(value) === 0 ||
					(Math.abs(value) >= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]) &&
						Math.abs(value) <= Math.abs(global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]))
				) {
					global.variables.selected_properties[global.variables.selected_properties['options'][this.option_index]] = <string>(<unknown>value);
					transformers[index].elm.properties[transformers[index].elm.properties['options'][this.option_index]] = <string>(<unknown>value);
				} else {
					toast.set_text(
						'PARAM = [|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MIN]
						) +
						'|, ' +
						'|' +
						global.utils.exponentiate_quickly(
							global.variables.selected_properties['option_limits'][global.variables.selected_properties['options'][this.option_index]][global.PROPERTY.PROPERTY_LIMIT_MAX]
						) +
						'|]'
					);
					toast.show(global.COLORS.GENERAL_RED_COLOR);
					ERROR_FLAG = true;
				}
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		if (!ERROR_FLAG) {
			global.utils.push_history();
			this.option_index = -1;
		}
		return ERROR_FLAG;
	}
	handle_partial_select(): void {
		if (this.select_start !== this.select_end) {
			let min: number = Math.min(this.select_start, this.select_end);
			let max: number = Math.max(this.select_start, this.select_end);
			this.input_button.text = this.input_button.text.substring(0, min) + this.input_button.text.substring(max, this.input_button.text.length);
			if (this.cursor_position > 0) {
				this.cursor_position = Math.min(min, max);
			}
		}
		this.select_start = -1;
		this.select_end = -1;
	}
	reset_cursor(): void {
		this.cursor_position = this.input_button.text.length;
		this.select_all = false;
		this.select_start = -1;
		this.select_end = -1;
	}
	double_click(): void {
		if (global.flags.flag_mouse_double_click_event) {
			if (this.input_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y)) {
				this.select_all = !this.select_all;
				if (this.select_all) {
					this.select_start = 0;
					this.ascending_flag = true;
					this.select_end = this.input_button.text.length;
					this.cursor_position = this.input_button.text.length;
				}
			}
		}
	}
	resize_window(): void {
		if (MOBILE_MODE) {
			this.width = view_port.view_width * 0.2625;
			this.height = view_port.view_height * 0.125;
		} else {
			this.width = view_port.view_width * 0.25;
			this.height = view_port.view_height * 0.085;
		}
		if (MOBILE_MODE) {
			let c_y = 0.25 * view_port.view_height;
			this.bounds.set_bounds(view_port.center_x - this.width, c_y - this.height, view_port.center_x + this.width, c_y + this.height);
			this.offset_y = 0;
		} else {
			this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		}
		this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.resize_paint();
		let padding: number = this.PADDING * this.bounds.get_width();
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.okay_button.set_bounds(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
		this.okay_button.resize_paint();
		this.cancel_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.cancel_button.resize_paint();
		this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.resize_paint();
		this.input_button.set_bounds(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
		this.input_button.resize_paint();
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
		this.select_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.select_paint.set_text_size(global.variables.canvas_text_size_4);
		this.reset_cursor();
	}
	draw_window(canvas: GraphicsEngine): void {
		if (global.flags.flag_element_options_edit) {
			if (!MOBILE_MODE) {
				canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
			}
			if (MOBILE_MODE) {
				if (this.bounds.bottom + this.offset_y >= on_screen_keyboard.bounds.top) {
					this.offset_y = on_screen_keyboard.bounds.top - this.bounds.bottom;
				}
			}
			this.okay_button.text = language_manager.OKAY[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
			this.cancel_button.text = language_manager.CANCEL[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
			canvas.draw_rect(this.bounds.left + this.offset_x, this.bounds.top + this.offset_y, this.bounds.right + this.offset_x, this.bounds.bottom + this.offset_y, this.bounds_paint);
			this.title_bounds.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			this.title_bounds.draw_button_text(canvas, this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.offset_x, this.title_bounds.get_center_y() + this.offset_y);
			if (this.okay_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !MOBILE_MODE) {
				this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
				this.okay_button.fill_paint.set_alpha(255);
			} else {
				this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
				this.okay_button.fill_paint.set_alpha(130);
			}
			this.okay_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			if (this.cancel_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !MOBILE_MODE) {
				this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
				this.cancel_button.fill_paint.set_alpha(255);
			} else {
				this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
				this.cancel_button.fill_paint.set_alpha(130);
			}
			this.cancel_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			this.input_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			this.text = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
			canvas.draw_text(this.text, this.input_button.get_center_x() + this.offset_x, this.input_button.get_center_y() + this.offset_y, this.input_button.text_paint);
			this.measured_text = this.input_button.text_paint.measure_text(this.text);
			this.adj_text = this.input_button.text;
			if (this.select_all && this.select_start === -1 && this.select_end === -1) {
				canvas.draw_rect3(
					this.input_button.get_center_x() + this.offset_x,
					this.input_button.get_center_y() + this.offset_y,
					this.measured_text * 1.1,
					this.input_button.get_height() * 0.7,
					this.select_paint
				);
			}
			this.cached_measured_text = this.measured_text * 0.5;
			if (this.select_start !== -1 && this.select_end !== -1) {
				this.min = Math.min(this.select_start, this.select_end);
				this.max = Math.max(this.select_start, this.select_end);
				this.select_width = this.text_paint.measure_text(this.adj_text.substring(this.min, this.max));
				this.select_offset_x = this.text_paint.measure_text(this.adj_text.substring(0, this.min));
				canvas.draw_rect(
					this.input_button.get_center_x() - this.cached_measured_text + this.select_offset_x + this.offset_x,
					this.input_button.get_center_y() - this.input_button.get_height() * 0.35 + this.offset_y,
					this.input_button.get_center_x() - this.cached_measured_text + this.select_offset_x + this.offset_x + this.select_width,
					this.input_button.get_center_y() + this.input_button.get_height() * 0.35 + this.offset_y,
					this.select_paint
				);
			}
			canvas.draw_text(
				'  _',
				this.input_button.get_center_x() - this.cached_measured_text + this.input_button.text_paint.measure_text(this.adj_text.substring(0, this.cursor_position)) + this.offset_x,
				this.input_button.get_center_y() + this.offset_y,
				this.input_button.text_paint
			);
			if (this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !MOBILE_MODE) {
				canvas.draw_rect(
					this.exit_button.left + this.offset_x,
					this.exit_button.top + this.offset_y,
					this.exit_button.right + this.offset_x,
					this.exit_button.bottom + this.offset_y,
					this.hover_paint
				);
			}
			this.width_mul_0p3636 = this.exit_button.get_width() * 0.3636;
			this.height_mul_0p3636 = this.exit_button.get_height() * 0.3636;
			canvas.draw_line(
				this.exit_button.left + this.width_mul_0p3636 + this.offset_x,
				this.exit_button.top + this.height_mul_0p3636 + this.offset_y,
				this.exit_button.right - this.width_mul_0p3636 + this.offset_x,
				this.exit_button.bottom - this.height_mul_0p3636 + this.offset_y,
				this.line_paint
			);
			canvas.draw_line(
				this.exit_button.right - this.width_mul_0p3636 + this.offset_x,
				this.exit_button.top + this.height_mul_0p3636 + this.offset_y,
				this.exit_button.left + this.width_mul_0p3636 + this.offset_x,
				this.exit_button.bottom - this.height_mul_0p3636 + this.offset_y,
				this.line_paint
			);
			canvas.draw_text(
				'[' + this.input_button.text.length + ' / ' + global.CONSTANTS.MAX_TEXT_LENGTH + ']',
				this.input_button.left + this.offset_x,
				this.okay_button.get_center_y() + this.offset_y,
				this.text_paint
			);
		}
	}
}
