'use strict';
class ElementOptionsWindow {
	private readonly TITLE_HEIGHT_RATIO: number;
	private readonly BUTTON_WIDTH_RATIO: number;
	private readonly BUTTON_HEIGHT_RATIO: number;
	private readonly PADDING: number;
	private readonly ATTRIBUTE_SIZE: number;
	private readonly ATTRIBUTE_SELECT: Array<string>;
	private line_paint: Paint;
	private fill_paint: Paint;
	private text_paint: Paint;
	private hover_paint: Paint;
	private shorcut_text_paint: Paint;
	private value_paint: Paint;
	private bounds_paint: Paint;
	private width: number;
	private height: number;
	private bounds: RectF;
	public title_bounds: Button;
	private okay_button: Button;
	private exit_button: Button;
	private attributes: Array<RectF>;
	private attribute_height: number;
	private offset_x: number;
	private offset_y: number;
	private window_anchored: boolean;
	private anchor_x: number;
	private anchor_y: number;
	private first_touch_x: number;
	private first_touch_y: number;
	private toggle_switch_button: ToggleSwitch;
	private width_mul_0p3636: number;
	private height_mul_0p3636: number;

	constructor() {
		this.TITLE_HEIGHT_RATIO = 0.1;
		this.BUTTON_WIDTH_RATIO = 0.3;
		this.BUTTON_HEIGHT_RATIO = 0.1;
		if (MOBILE_MODE === false) {
			this.PADDING = 0.0175;
		} else {
			this.PADDING = 0.0125;
		}
		this.ATTRIBUTE_SIZE = 6;
		this.ATTRIBUTE_SELECT = ['1', '2', '3', '4', '5', '6'];
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
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.ROUND);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
		this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.fill_paint.set_alpha(130);
		this.fill_paint.set_paint_align(paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(paint.style.FILL);
		this.text_paint.set_paint_cap(paint.cap.ROUND);
		this.text_paint.set_paint_join(paint.join.ROUND);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_YELLOW_COLOR);
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
		this.shorcut_text_paint = new Paint();
		this.shorcut_text_paint.set_paint_style(paint.style.FILL);
		this.shorcut_text_paint.set_paint_cap(paint.cap.ROUND);
		this.shorcut_text_paint.set_paint_join(paint.join.ROUND);
		this.shorcut_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.shorcut_text_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
		this.shorcut_text_paint.set_text_size(global.variables.canvas_text_size_4);
		this.shorcut_text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.shorcut_text_paint.set_alpha(255);
		this.shorcut_text_paint.set_paint_align(paint.align.CENTER);
		this.value_paint = new Paint();
		this.value_paint.set_paint_style(paint.style.FILL);
		this.value_paint.set_paint_cap(paint.cap.ROUND);
		this.value_paint.set_paint_join(paint.join.ROUND);
		this.value_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.value_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		if (MOBILE_MODE) {
			this.value_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.value_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.value_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.value_paint.set_alpha(255);
		this.value_paint.set_paint_align(this.value_paint.align.RIGHT);
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
			this.width = view_port.view_width * 0.2;
			this.height = view_port.view_height * 0.4;
		} else {
			this.width = view_port.view_width * 0.15;
			this.height = view_port.view_height * 0.3;
		}
		this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.text = 'R0';
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
		this.okay_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.okay_button.text = '';
		this.okay_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.okay_button.fill_paint.set_alpha(130);
		this.okay_button.draw_stroke = false;
		this.okay_button.draw_fill = true;
		this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.draw_stroke = true;
		this.exit_button.draw_fill = false;
		this.exit_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.attributes = [];
		this.attribute_height = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
		for (var i: number = 0; i < this.ATTRIBUTE_SIZE; i++) {
			this.attributes.push(
				new RectF(
					this.title_bounds.left + padding,
					this.title_bounds.bottom + padding * 1.5 + i * this.attribute_height,
					this.title_bounds.right - padding,
					this.title_bounds.bottom + padding + (i + 1) * this.attribute_height - 1.25 * padding
				)
			);
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
		this.toggle_switch_button.line_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
		this.width_mul_0p3636 = 0;
		this.height_mul_0p3636 = 0;
	}
	mouse_down(): void {
		if (global.flags.flag_element_options) {
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
		}
	}
	mouse_move(): void {
		if (global.flags.flag_element_options) {
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
				if (this.bounds.bottom + this.offset_y >= view_port.bottom) {
					this.offset_y = view_port.bottom - this.bounds.bottom;
				}
			}
		}
	}
	mouse_up(): void {
		if (global.flags.flag_element_options) {
			if (!global.variables.mouse_keyboard_lock) {
				if (this.window_anchored) {
					if (
						!this.bounds.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						!this.bounds.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else if (
						this.okay_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.okay_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else if (
						this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.exit_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
					} else {
						for (var i: number = 0; i < this.ATTRIBUTE_SIZE; i++) {
							if (global.utils.not_null(global.variables.selected_properties)) {
								if (i < global.variables.selected_properties['options'].length) {
									if (
										this.attributes[i].contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
										this.attributes[i].contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
									) {
										this.on_attribute_clicked(i);
										break;
									}
								}
							}
						}
					}
				} else {
					this.anchor_x = global.variables.mouse_x - this.offset_x;
					this.anchor_y = global.variables.mouse_y - this.offset_y;
				}
				this.window_anchored = true;
			}
		}
	}
	on_attribute_clicked(index: number): void {
		if (index < global.variables.selected_properties['options'].length) {
			if (this.special_property(global.variables.selected_properties['options'][index])) {
				this.toggle_switch(global.variables.selected_properties['options'][index], index, global.variables.selected_properties[global.variables.selected_properties['options'][index]]);
			} else {
				element_options_edit_window.set_title(
					language_manager.SET[global.CONSTANTS.LANGUAGES[global.variables.language_index]] +
						' ' +
						global.variables.selected_properties['options'][index] +
						(global.variables.selected_properties['options_units'][index] === '' ? '' : ' [' + global.variables.selected_properties['options_units'][index] + ']')
				);
				if (!this.special_type(global.variables.selected_type)) {
					element_options_edit_window.set_input_text(global.utils.exponentiate_quickly(<any>(<string>global.variables.selected_properties[global.variables.selected_properties['options'][index]])));
				} else {
					element_options_edit_window.set_input_text(global.variables.selected_properties[global.variables.selected_properties['options'][index]]);
				}
				element_options_edit_window.option_index = index;
				menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
				menu_bar.handle_element_options_edit_flag(!global.flags.flag_element_options_edit);
			}
			global.variables.component_touched = true;
			global.variables.mouse_keyboard_lock = true;
			global.flags.flag_build_element = true;
		}
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (global.flags.flag_element_options) {
			if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
				menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
				global.variables.component_touched = true;
				global.variables.mouse_keyboard_lock = true;
			}
			if (!global.variables.mouse_keyboard_lock) {
				for (var i: number = 0; i < this.ATTRIBUTE_SELECT.length; i++) {
					if (global.utils.decode_key(key_event) === this.ATTRIBUTE_SELECT[i]) {
						this.on_attribute_clicked(i);
						global.variables.component_touched = true;
						global.variables.mouse_keyboard_lock = true;
						break;
					}
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
	special_property(property: string): boolean {
		if (property === 'Switch State' || property === 'Show Name' || property === 'Interpolate' || property === 'Show Marker' || property === 'Text Style') {
			return true;
		}
		return false;
	}
	toggle_switch(property: string, i: number, state: string): void {
		if (property === 'Switch State' || property === 'Show Name' || property === 'Interpolate' || property === 'Show Marker' || property === 'Text Style') {
			let next_state: string = '';
			if (state === global.CONSTANTS.OFF) {
				next_state = global.CONSTANTS.ON;
			} else if (state === global.CONSTANTS.ON) {
				next_state = global.CONSTANTS.OFF;
			}
			if (property === 'Text Style') {
				if (state === global.CONSTANTS.TEXT_STYLE_1) {
					next_state = global.CONSTANTS.TEXT_STYLE_2;
				} else if (state === global.CONSTANTS.TEXT_STYLE_2) {
					next_state = global.CONSTANTS.TEXT_STYLE_3;
				} else if (state === global.CONSTANTS.TEXT_STYLE_3) {
					next_state = global.CONSTANTS.TEXT_STYLE_1;
				}
			}
			if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
				let index: number = engine_functions.get_spst(global.variables.selected_id);
				if (index > -1 && index < spsts.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					spsts[index].elm.properties[spsts[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
				let index: number = engine_functions.get_spdt(global.variables.selected_id);
				if (index > -1 && index < spdts.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					spdts[index].elm.properties[spdts[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
				let index: number = engine_functions.get_net(global.variables.selected_id);
				if (index > -1 && index < nets.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					nets[index].elm.properties[nets[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
				let index: number = engine_functions.get_lut(global.variables.selected_id);
				if (index > -1 && index < luts.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					luts[index].elm.properties[luts[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
				let index: number = engine_functions.get_vcr(global.variables.selected_id);
				if (index > -1 && index < vcrs.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					vcrs[index].elm.properties[vcrs[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
				let index: number = engine_functions.get_note(global.variables.selected_id);
				if (index > -1 && index < notes.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					notes[index].elm.properties[notes[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
				let index: number = engine_functions.get_vcca(global.variables.selected_id);
				if (index > -1 && index < vccas.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					vccas[index].elm.properties[vccas[index].elm.properties['options'][i]] = next_state;
				}
			} else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
				let index: number = engine_functions.get_vcl(global.variables.selected_id);
				if (index > -1 && index < vcls.length) {
					global.variables.selected_properties[global.variables.selected_properties['options'][i]] = next_state;
					vcls[index].elm.properties[vcls[index].elm.properties['options'][i]] = next_state;
				}
			}
		}
	}
	resize_window(): void {
		if (MOBILE_MODE) {
			this.width = view_port.view_width * 0.2;
			this.height = view_port.view_height * 0.4;
		} else {
			this.width = view_port.view_width * 0.15;
			this.height = view_port.view_height * 0.3;
		}
		this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.resize_paint();
		let padding: number = this.PADDING * this.bounds.get_width();
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.okay_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.okay_button.resize_paint();
		this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.resize_paint();
		this.attribute_height = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
		for (var i: number = 0; i < this.ATTRIBUTE_SIZE; i++) {
			this.attributes[i].set_bounds(
				this.title_bounds.left + padding,
				this.title_bounds.bottom + padding * 1.5 + i * this.attribute_height,
				this.title_bounds.right - padding,
				this.title_bounds.bottom + padding + (i + 1) * this.attribute_height - 1.25 * padding
			);
		}
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.value_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.value_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.value_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
		this.shorcut_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.shorcut_text_paint.set_text_size(global.variables.canvas_text_size_4);
		this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
		if (global.utils.not_null(this.toggle_switch_button)) {
			this.toggle_switch_button.resize_toggle_switch();
			this.toggle_switch_button.resize_paint();
		}
	}
	draw_window(canvas: GraphicsEngine): void {
		if (global.flags.flag_element_options) {
			if (!MOBILE_MODE) {
				canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
			}
			this.okay_button.text = language_manager.OKAY[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
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
			if (global.utils.not_null(global.variables.selected_properties['options'])) {
				for (var i: number = 0; i < this.attributes.length; i++) {
					if (i < global.variables.selected_properties['options'].length) {
						if (this.attributes[i].contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !MOBILE_MODE) {
							canvas.draw_rect(
								this.attributes[i].left + this.offset_x,
								this.attributes[i].top + this.offset_y,
								this.attributes[i].right + this.offset_x,
								this.attributes[i].bottom + this.offset_y,
								this.hover_paint
							);
						} else {
							canvas.draw_rect(
								this.attributes[i].left + this.offset_x,
								this.attributes[i].top + this.offset_y,
								this.attributes[i].right + this.offset_x,
								this.attributes[i].bottom + this.offset_y,
								this.fill_paint
							);
						}
						canvas.draw_text(
							global.variables.selected_properties['options'][i] + ':=',
							this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.offset_x,
							this.attributes[i].get_center_y() + this.offset_y,
							this.text_paint
						);
						if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] === global.CONSTANTS.ON) {
							canvas.draw_text(i + 1 + '', this.attributes[i].left + this.offset_x, this.attributes[i].top + this.offset_y, this.shorcut_text_paint);
						}
						if (!this.special_property(global.variables.selected_properties['options'][i])) {
							if (!this.special_type(global.variables.selected_type)) {
								canvas.draw_text(
									global.utils.exponentiate_quickly(<any>(<string>global.variables.selected_properties[global.variables.selected_properties['options'][i]])) +
										global.variables.selected_properties['options_units'][i],
									this.attributes[i].right - this.PADDING * this.bounds.get_width() + this.offset_x,
									this.attributes[i].get_center_y() + this.offset_y,
									this.value_paint
								);
							} else {
								if (
									global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.ON ||
									global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.OFF
								) {
									let padding: number = this.attributes[i].get_height() * 0.1;
									this.toggle_switch_button.state = global.variables.selected_properties[global.variables.selected_properties['options'][i]];
									this.toggle_switch_button.left = this.attributes[i].right - this.attributes[i].get_width() * 0.3;
									this.toggle_switch_button.right = this.attributes[i].right - this.PADDING * this.bounds.get_width();
									this.toggle_switch_button.top = this.attributes[i].top + padding;
									this.toggle_switch_button.bottom = this.attributes[i].bottom - padding;
									if (global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.ON) {
										this.toggle_switch_button.toggle_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
									} else if (global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.OFF) {
										this.toggle_switch_button.toggle_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
									}
									if (global.utils.not_null(this.toggle_switch_button)) {
										this.toggle_switch_button.draw_toggle_switch_dxdy(canvas, this.offset_x, this.offset_y);
									}
								} else {
									canvas.draw_text(
										global.variables.selected_properties[global.variables.selected_properties['options'][i]] + global.variables.selected_properties['options_units'][i],
										this.attributes[i].right - this.PADDING * this.bounds.get_width() + this.offset_x,
										this.attributes[i].get_center_y() + this.offset_y,
										this.value_paint
									);
								}
							}
						} else {
							if (
								global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.ON ||
								global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.OFF
							) {
								let padding: number = this.attributes[i].get_height() * 0.1;
								this.toggle_switch_button.state = global.variables.selected_properties[global.variables.selected_properties['options'][i]];
								this.toggle_switch_button.left = this.attributes[i].right - this.attributes[i].get_width() * 0.3;
								this.toggle_switch_button.right = this.attributes[i].right - this.PADDING * this.bounds.get_width();
								this.toggle_switch_button.top = this.attributes[i].top + padding;
								this.toggle_switch_button.bottom = this.attributes[i].bottom - padding;
								if (global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.ON) {
									this.toggle_switch_button.toggle_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
								} else if (global.variables.selected_properties[global.variables.selected_properties['options'][i]] === global.CONSTANTS.OFF) {
									this.toggle_switch_button.toggle_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
								}
								if (global.utils.not_null(this.toggle_switch_button)) {
									this.toggle_switch_button.draw_toggle_switch_dxdy(canvas, this.offset_x, this.offset_y);
								}
							} else {
								canvas.draw_text(
									global.variables.selected_properties[global.variables.selected_properties['options'][i]] + global.variables.selected_properties['options_units'][i],
									this.attributes[i].right - this.PADDING * this.bounds.get_width() + this.offset_x,
									this.attributes[i].get_center_y() + this.offset_y,
									this.value_paint
								);
							}
						}
					}
				}
			}
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
		}
	}
}
