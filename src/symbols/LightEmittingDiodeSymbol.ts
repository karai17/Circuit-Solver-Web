'use strict';
class LightEmittingDiodeSymbol {
	private readonly TAG: string;
	public index: number;
	private page: number;
	private bounds: RectF;
	private p1: PointF;
	private p2: PointF;
	private theta_m90: number;
	private theta: number;
	private led_0: PointF;
	private led_1: PointF;
	private led_2: PointF;
	private led_3: PointF;
	private led_4: PointF;
	private led_5: PointF;
	private led_6: PointF;
	private led_7: PointF;
	private led_8: PointF;
	private led_9: PointF;
	private led_10: PointF;
	private led_11: PointF;
	private c_x: number;
	private c_y: number;
	private x_space: number;
	private y_space: number;
	private connect1_x: number;
	private connect1_y: number;
	private connect2_x: number;
	private connect2_y: number;
	private line_paint: Paint;
	private point_paint: Paint;
	private text_paint: Paint;
	private text_background_paint: Paint;
	private flag_add_element: boolean;
	private draw_tag: boolean;
	private text_bounds: RectF;
	private height_ratio: number;
	private line_buffer: Array<Array<number>>;
	private circle_buffer: Array<Array<number>>;
	constructor(rect: RectF, index: number, page: number) {
		this.index = index;
		this.page = page;
		this.bounds = new RectF(0, 0, 0, 0);
		if (global.utils.not_null(rect)) {
			this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		}
		this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
		this.p2 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.led_0 = new PointF(0, 0);
		this.led_1 = new PointF(0, 0);
		this.led_2 = new PointF(0, 0);
		this.led_3 = new PointF(0, 0);
		this.led_4 = new PointF(0, 0);
		this.led_5 = new PointF(0, 0);
		this.led_6 = new PointF(0, 0);
		this.led_7 = new PointF(0, 0);
		this.led_8 = new PointF(0, 0);
		this.led_9 = new PointF(0, 0);
		this.led_10 = new PointF(0, 0);
		this.led_11 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
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
		this.TAG = language_manager.TAG_LED;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element) {
			if (
				workspace.bounds.contains_xywh(
					global.variables.mouse_x,
					global.variables.mouse_y,
					workspace.bounds.get_width() - 4.5 * global.variables.node_space_x,
					workspace.bounds.get_height() - 4.5 * global.variables.node_space_y
				) &&
				!this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)
			) {
				shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
				global.flags.flag_history_lock = true;
				engine_functions.add_led();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
				if (!this.flag_add_element) {
					this.flag_add_element = true;
					global.flags.flag_add_element = true;
					global.variables.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height) && !MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		this.update();
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
			}
			this.flag_add_element = false;
			global.flags.flag_add_element = false;
		}
	}
	build_element() {
		let delta_x: number = 0;
		let delta_y: number = 0;
		this.led_0.x = this.c_x + (this.x_space >> 1) * global.utils.cosine(this.theta) + (this.x_space >> 1) * global.utils.cosine(this.theta_m90);
		this.led_0.y = this.c_y + (this.y_space >> 1) * global.utils.sine(this.theta) + (this.y_space >> 1) * global.utils.sine(this.theta_m90);
		this.led_2.x = this.c_x - (this.x_space >> 1) * global.utils.cosine(this.theta) + (this.x_space >> 1) * global.utils.cosine(this.theta_m90);
		this.led_2.y = this.c_y - (this.y_space >> 1) * global.utils.sine(this.theta) + (this.y_space >> 1) * global.utils.sine(this.theta_m90);
		this.led_6.x = this.c_x + (this.x_space >> 1) * global.utils.cosine(this.theta) + (this.x_space >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
		this.led_6.y = this.c_y + (this.y_space >> 1) * global.utils.sine(this.theta) + (this.y_space >> 1) * global.utils.sine(Math.PI + this.theta_m90);
		this.led_4.x = this.c_x - (this.x_space >> 1) * global.utils.cosine(this.theta) + (this.x_space >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
		this.led_4.y = this.c_y - (this.y_space >> 1) * global.utils.sine(this.theta) + (this.y_space >> 1) * global.utils.sine(Math.PI + this.theta_m90);
		this.connect1_x = this.c_x - (this.x_space >> 1) * global.utils.cosine(this.theta);
		this.connect1_y = this.c_y - (this.y_space >> 1) * global.utils.sine(this.theta);
		this.connect2_x = this.c_x + (this.x_space >> 1) * global.utils.cosine(this.theta);
		this.connect2_y = this.c_y + (this.y_space >> 1) * global.utils.sine(this.theta);
		this.led_8.x = this.c_x - (this.x_space >> 1) * global.utils.cosine(this.theta) + this.x_space * 1.25 * global.utils.cosine(this.theta_m90);
		this.led_8.y = this.c_y - (this.y_space >> 1) * global.utils.sine(this.theta) + this.y_space * 1.25 * global.utils.sine(this.theta_m90);
		this.led_10.x = this.c_x + (this.x_space >> 1) * global.utils.cosine(this.theta) + this.x_space * 1.25 * global.utils.cosine(this.theta_m90);
		this.led_10.y = this.c_y + (this.y_space >> 1) * global.utils.sine(this.theta) + this.y_space * 1.25 * global.utils.sine(this.theta_m90);
		this.led_1.x = this.c_x - ((this.x_space >> 1) - (this.x_space >> 2)) * global.utils.cosine(this.theta) + this.x_space * 2.25 * global.utils.cosine(this.theta_m90);
		this.led_1.y = this.c_y - ((this.y_space >> 1) - (this.y_space >> 2)) * global.utils.sine(this.theta) + this.y_space * 2.25 * global.utils.sine(this.theta_m90);
		this.led_3.x = this.c_x + ((this.x_space >> 1) + (this.x_space >> 2)) * global.utils.cosine(this.theta) + this.x_space * 2.25 * global.utils.cosine(this.theta_m90);
		this.led_3.y = this.c_y + ((this.y_space >> 1) + (this.y_space >> 2)) * global.utils.sine(this.theta) + this.y_space * 2.25 * global.utils.sine(this.theta_m90);
		delta_x = this.led_1.x - this.led_8.x;
		delta_y = this.led_1.y - this.led_8.y;
		this.theta_m90 = global.utils.retrieve_angle_radian(delta_x, delta_y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(delta_x, delta_y);
		this.led_5.x = this.led_1.x + (this.x_space >> 1) * global.utils.cosine(this.theta - 35);
		this.led_5.y = this.led_1.y + this.y_space * 0.5 * global.utils.sine(this.theta - 35);
		this.led_7.x = this.led_1.x + (this.x_space >> 1) * global.utils.cosine(this.theta + 35);
		this.led_7.y = this.led_1.y + this.y_space * 0.5 * global.utils.sine(this.theta + 35);
		this.led_9.x = this.led_3.x + (this.x_space >> 1) * global.utils.cosine(this.theta - 35);
		this.led_9.y = this.led_3.y + this.y_space * 0.5 * global.utils.sine(this.theta - 35);
		this.led_11.x = this.led_3.x + (this.x_space >> 1) * global.utils.cosine(this.theta + 35);
		this.led_11.y = this.led_3.y + this.y_space * 0.5 * global.utils.sine(this.theta + 35);
	}
	resize(rect: RectF) {
		this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
		this.p2.set_point(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
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
		} else {
			this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.led_2.x, this.led_2.y, this.led_4.x, this.led_4.y);
			this.line_buffer[indexer++] = Array(this.led_6.x, this.led_6.y, this.led_0.x, this.led_0.y);
			this.line_buffer[indexer++] = Array(this.led_2.x, this.led_2.y, this.connect2_x, this.connect2_y);
			this.line_buffer[indexer++] = Array(this.led_4.x, this.led_4.y, this.connect2_x, this.connect2_y);
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
			this.line_buffer[indexer++] = Array(this.led_8.x, this.led_8.y, this.led_1.x, this.led_1.y);
			this.line_buffer[indexer++] = Array(this.led_10.x, this.led_10.y, this.led_3.x, this.led_3.y);
			this.line_buffer[indexer++] = Array(this.led_1.x, this.led_1.y, this.led_5.x, this.led_5.y);
			this.line_buffer[indexer++] = Array(this.led_1.x, this.led_1.y, this.led_7.x, this.led_7.y);
			this.line_buffer[indexer++] = Array(this.led_3.x, this.led_3.y, this.led_9.x, this.led_9.y);
			this.line_buffer[indexer++] = Array(this.led_3.x, this.led_3.y, this.led_11.x, this.led_11.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
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
