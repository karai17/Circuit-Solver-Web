'use strict';
class VoltageControlledInductorSymbol {
	private readonly TAG: string;
	public index: number;
	private page: number;
	private bounds: RectF;
	private p1: PointF;
	private p2: PointF;
	private p3: PointF;
	private vcl_0: PointF;
	private vcl_1: PointF;
	private vcl_2: PointF;
	private vcl_3: PointF;
	private vcl_4: PointF;
	private vcl_5: PointF;
	private vcl_6: PointF;
	private vcl_7: PointF;
	private vcl_8: PointF;
	private vcl_9: PointF;
	private vcl_10: PointF;
	private vcl_11: PointF;
	private c_x: number;
	private c_y: number;
	private theta_m90: number;
	private theta: number;
	private vcl_arc_0: Arc;
	private vcl_arc_1: Arc;
	private vcl_arc_2: Arc;
	private vcl_arc_3: Arc;
	private phi: number;
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
		this.p2 = new PointF(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
		this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.vcl_0 = new PointF(0, 0);
		this.vcl_1 = new PointF(0, 0);
		this.vcl_2 = new PointF(0, 0);
		this.vcl_3 = new PointF(0, 0);
		this.vcl_4 = new PointF(0, 0);
		this.vcl_5 = new PointF(0, 0);
		this.vcl_6 = new PointF(0, 0);
		this.vcl_7 = new PointF(0, 0);
		this.vcl_8 = new PointF(0, 0);
		this.vcl_9 = new PointF(0, 0);
		this.vcl_10 = new PointF(0, 0);
		this.vcl_11 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
		this.vcl_arc_0 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.vcl_arc_0.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.vcl_arc_0.transform_scaled = false;
		this.vcl_arc_1 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.vcl_arc_1.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.vcl_arc_1.transform_scaled = false;
		this.vcl_arc_2 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.vcl_arc_2.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.vcl_arc_2.transform_scaled = false;
		this.vcl_arc_3 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.vcl_arc_3.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.vcl_arc_3.transform_scaled = false;
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
		this.TAG = language_manager.TAG_VCL;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element && !global.flags.flag_history_lock && global.flags.flag_add_element && global.variables.component_touched) {
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
				engine_functions.add_vcl();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
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
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height) && !MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		if (this.page === page) {
			this.update();
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
		let cache_2: number = this.x_space;
		let cache_3: number = this.y_space;
		let cache_8: number = this.x_space;
		let cache_9: number = this.y_space;
		this.connect1_x = this.c_x - cache_2 * global.utils.cosine(this.theta);
		this.connect1_y = this.c_y - cache_3 * global.utils.sine(this.theta);
		this.connect2_x = this.c_x + cache_2 * global.utils.cosine(this.theta);
		this.connect2_y = this.c_y + cache_3 * global.utils.sine(this.theta);
		this.vcl_0.x = this.c_x + cache_2 * global.utils.cosine(this.theta);
		this.vcl_0.y = this.c_y + cache_3 * global.utils.sine(this.theta);
		this.vcl_1.x = this.c_x + (cache_2 >> 1) * global.utils.cosine(this.theta);
		this.vcl_1.y = this.c_y + (cache_3 >> 1) * global.utils.sine(this.theta);
		this.vcl_2.x = this.c_x + (cache_2 >> 1) * global.utils.cosine(this.theta - global.utils.to_radians(180));
		this.vcl_2.y = this.c_y + (cache_3 >> 1) * global.utils.sine(this.theta - global.utils.to_radians(180));
		this.vcl_3.x = this.c_x + cache_2 * global.utils.cosine(this.theta - global.utils.to_radians(180));
		this.vcl_3.y = this.c_y + cache_3 * global.utils.sine(this.theta - global.utils.to_radians(180));
		this.vcl_4.x = this.p1.x + 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
		this.vcl_4.y = this.p1.y + 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
		this.vcl_5.x = this.p3.x - 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
		this.vcl_5.y = this.p3.y - 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
		this.theta = global.utils.retrieve_angle_radian(this.vcl_5.x - this.vcl_4.x, this.vcl_5.y - this.vcl_4.y);
		this.vcl_6.x = this.vcl_5.x - 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
		this.vcl_6.y = this.vcl_5.y - 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
		this.vcl_7.x = this.vcl_5.x - 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
		this.vcl_7.y = this.vcl_5.y - 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
		this.theta = global.utils.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
		this.vcl_9.x = this.p2.x + 0.8 * cache_8 * global.utils.cosine(this.phi);
		this.vcl_9.y = this.p2.y + 0.8 * cache_9 * global.utils.sine(this.phi);
		this.vcl_10.x = this.vcl_9.x + 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
		this.vcl_10.y = this.vcl_9.y + 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
		this.vcl_11.x = this.vcl_9.x + 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
		this.vcl_11.y = this.vcl_9.y + 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
		this.vcl_arc_0.set_points(this.vcl_0.x, this.vcl_0.y, this.vcl_1.x, this.vcl_1.y);
		this.vcl_arc_0.amplitude = global.variables.canvas_stroke_width_5;
		this.vcl_arc_1.set_points(this.vcl_1.x, this.vcl_1.y, this.c_x, this.c_y);
		this.vcl_arc_1.amplitude = global.variables.canvas_stroke_width_5;
		this.vcl_arc_2.set_points(this.c_x, this.c_y, this.vcl_2.x, this.vcl_2.y);
		this.vcl_arc_2.amplitude = global.variables.canvas_stroke_width_5;
		this.vcl_arc_3.set_points(this.vcl_2.x, this.vcl_2.y, this.vcl_3.x, this.vcl_3.y);
		this.vcl_arc_3.amplitude = global.variables.canvas_stroke_width_5;
	}
	resize(rect: RectF) {
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
		this.vcl_arc_0.resize();
		this.vcl_arc_1.resize();
		this.vcl_arc_2.resize();
		this.vcl_arc_3.resize();
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
			this.vcl_arc_0.set_color(global.COLORS.SELECTED_COLOR);
			this.vcl_arc_1.set_color(global.COLORS.SELECTED_COLOR);
			this.vcl_arc_2.set_color(global.COLORS.SELECTED_COLOR);
			this.vcl_arc_3.set_color(global.COLORS.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.vcl_arc_0.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.vcl_arc_1.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.vcl_arc_2.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.vcl_arc_3.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.vcl_arc_0.draw_arc(canvas);
			this.vcl_arc_1.draw_arc(canvas);
			this.vcl_arc_2.draw_arc(canvas);
			this.vcl_arc_3.draw_arc(canvas);
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[indexer++] = Array(this.connect2_x, this.connect2_y, this.p3.x, this.p3.y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.vcl_9.x, this.vcl_9.y);
			this.line_buffer[indexer++] = Array(this.vcl_10.x, this.vcl_10.y, this.vcl_9.x, this.vcl_9.y);
			this.line_buffer[indexer++] = Array(this.vcl_11.x, this.vcl_11.y, this.vcl_9.x, this.vcl_9.y);
			this.line_buffer[indexer++] = Array(this.vcl_5.x, this.vcl_5.y, this.vcl_4.x, this.vcl_4.y);
			this.line_buffer[indexer++] = Array(this.vcl_5.x, this.vcl_5.y, this.vcl_6.x, this.vcl_6.y);
			this.line_buffer[indexer++] = Array(this.vcl_5.x, this.vcl_5.y, this.vcl_7.x, this.vcl_7.y);
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
