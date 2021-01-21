'use strict';
class VoltageControlledResistorSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public p3: PointF;
	public vcr_0: PointF;
	public vcr_1: PointF;
	public vcr_2: PointF;
	public vcr_3: PointF;
	public vcr_4: PointF;
	public vcr_6: PointF;
	public vcr_5: PointF;
	public vcr_7: PointF;
	public vcr_8: PointF;
	public vcr_9: PointF;
	public vcr_10: PointF;
	public vcr_11: PointF;
	public vcr_12: PointF;
	public vcr_13: PointF;
	public vcr_14: PointF;
	public vcr_15: PointF;
	public vcr_16: PointF;
	public c_x: number;
	public c_y: number;
	public theta_m90: number;
	public theta: number;
	public phi: number;
	public x_space: number;
	public y_space: number;
	public connect1_x: number;
	public connect1_y: number;
	public connect2_x: number;
	public connect2_y: number;
	public line_paint: Paint;
	public point_paint: Paint;
	public text_paint: Paint;
	public text_background_paint: Paint;
	public flag_add_element: boolean;
	public TAG: string;
	public draw_tag: boolean;
	public text_bounds: RectF;
	public height_ratio: number;
	public line_buffer: Array<Array<number>>;
	public circle_buffer: Array<Array<number>>;
	constructor(rect: RectF, index: number, page: number) {
		this.index = index;
		this.page = page;
		this.bounds = new RectF(0, 0, 0, 0);
		if (global.not_null(rect)) {
			this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		}
		this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
		this.p2 = new PointF(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
		this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.vcr_0 = new PointF(0, 0);
		this.vcr_1 = new PointF(0, 0);
		this.vcr_2 = new PointF(0, 0);
		this.vcr_3 = new PointF(0, 0);
		this.vcr_4 = new PointF(0, 0);
		this.vcr_6 = new PointF(0, 0);
		this.vcr_5 = new PointF(0, 0);
		this.vcr_7 = new PointF(0, 0);
		this.vcr_8 = new PointF(0, 0);
		this.vcr_9 = new PointF(0, 0);
		this.vcr_10 = new PointF(0, 0);
		this.vcr_11 = new PointF(0, 0);
		this.vcr_12 = new PointF(0, 0);
		this.vcr_13 = new PointF(0, 0);
		this.vcr_14 = new PointF(0, 0);
		this.vcr_15 = new PointF(0, 0);
		this.vcr_16 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
		this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(this.point_paint.style.FILL);
		this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
		this.point_paint.set_paint_join(this.point_paint.join.MITER);
		this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.point_paint.set_text_size(global.canvas_text_size_4);
		this.point_paint.set_font(global.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(this.point_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.text_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		this.text_background_paint = new Paint();
		this.text_background_paint.set_paint_style(this.text_background_paint.style.FILL);
		this.text_background_paint.set_paint_cap(this.text_background_paint.cap.ROUND);
		this.text_background_paint.set_paint_join(this.text_background_paint.join.MITER);
		this.text_background_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_background_paint.set_color(global.GENERAL_HOVER_COLOR);
		this.text_background_paint.set_text_size(global.canvas_text_size_4);
		this.text_background_paint.set_font(global.DEFAULT_FONT);
		this.text_background_paint.set_alpha(255);
		this.text_background_paint.set_paint_align(this.text_background_paint.align.CENTER);
		this.build_element();
		this.flag_add_element = false;
		this.TAG = language_manager.TAG_VCR;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element) {
			if (
				workspace.bounds.contains_xywh(global.mouse_x, global.mouse_y, workspace.bounds.get_width() - 4.5 * global.node_space_x, workspace.bounds.get_height() - 4.5 * global.node_space_y) &&
				!this.bounds.contains_xy(global.mouse_x, global.mouse_y)
			) {
				shortcut_manager.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
				global.signal_history_lock = true;
				engine_functions.add_vcr();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
				if (!this.flag_add_element) {
					this.flag_add_element = true;
					global.signal_add_element = true;
					global.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
			}
			this.flag_add_element = false;
			global.signal_add_element = false;
		}
	}
	build_element() {
		let cache_0: number = 0.66 * this.x_space;
		let cache_1: number = 0.66 * this.y_space;
		let cache_2: number = 0.33 * this.x_space;
		let cache_3: number = 0.33 * this.y_space;
		let cache_4: number = 0.667 * this.x_space;
		let cache_5: number = 0.667 * this.y_space;
		let cache_6: number = 0.5 * this.x_space;
		let cache_7: number = 0.5 * this.y_space;
		let cache_8: number = this.x_space;
		let cache_9: number = this.y_space;
		this.connect1_x = this.c_x - cache_8 * global.cosine(this.theta);
		this.connect1_y = this.c_y - cache_9 * global.sine(this.theta);
		this.connect2_x = this.c_x + cache_8 * global.cosine(this.theta);
		this.connect2_y = this.c_y + cache_9 * global.sine(this.theta);
		this.vcr_4.x = this.c_x - cache_0 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(this.theta_m90);
		this.vcr_4.y = this.c_y - cache_1 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(this.theta_m90);
		this.vcr_5.x = this.c_x + (cache_8 >> 1) * global.cosine(this.theta_m90);
		this.vcr_5.y = this.c_y + (cache_9 >> 1) * global.sine(this.theta_m90);
		this.vcr_6.x = this.c_x - cache_2 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(Math.PI + this.theta_m90);
		this.vcr_6.y = this.c_y - cache_3 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(Math.PI + this.theta_m90);
		this.vcr_7.x = this.c_x + cache_2 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(Math.PI + this.theta_m90);
		this.vcr_7.y = this.c_y + cache_3 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(Math.PI + this.theta_m90);
		this.vcr_8.x = this.c_x + cache_0 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(this.theta_m90);
		this.vcr_8.y = this.c_y + cache_1 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(this.theta_m90);
		this.vcr_9.x = this.c_x + cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
		this.vcr_9.y = this.c_y + cache_9 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
		this.vcr_10.x = this.c_x - cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
		this.vcr_10.y = this.c_y - cache_9 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
		this.vcr_11.x = this.c_x + cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
		this.vcr_11.y = this.c_y + cache_9 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
		this.vcr_12.x = this.c_x - cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
		this.vcr_12.y = this.c_y - cache_9 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
		this.vcr_0.x = this.connect1_x + cache_8 * global.cosine(this.theta) + cache_6 * global.cosine(this.theta_m90);
		this.vcr_0.y = this.connect1_y + cache_9 * global.sine(this.theta) + cache_7 * global.sine(this.theta_m90);
		this.vcr_13.x = this.p1.x + 1.5 * cache_8 * global.cosine(this.theta - global.PI_DIV_4);
		this.vcr_13.y = this.p1.y + 1.5 * cache_9 * global.sine(this.theta - global.PI_DIV_4);
		this.vcr_14.x = this.p3.x - 1.5 * cache_8 * global.cosine(this.theta - global.PI_DIV_4);
		this.vcr_14.y = this.p3.y - 1.5 * cache_9 * global.sine(this.theta - global.PI_DIV_4);
		this.theta = global.retrieve_angle_radian(this.vcr_14.x - this.vcr_13.x, this.vcr_14.y - this.vcr_13.y);
		this.vcr_15.x = this.vcr_14.x - 0.4 * cache_8 * global.cosine(this.theta + global.PI_DIV_6);
		this.vcr_15.y = this.vcr_14.y - 0.4 * cache_9 * global.sine(this.theta + global.PI_DIV_6);
		this.vcr_16.x = this.vcr_14.x - 0.4 * cache_8 * global.cosine(this.theta - global.PI_DIV_6);
		this.vcr_16.y = this.vcr_14.y - 0.4 * cache_9 * global.sine(this.theta - global.PI_DIV_6);
		this.theta = global.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
		this.vcr_1.x = this.p2.x + 0.8 * cache_8 * global.cosine(this.phi);
		this.vcr_1.y = this.p2.y + 0.8 * cache_9 * global.sine(this.phi);
		this.vcr_2.x = this.vcr_1.x + 0.4 * cache_8 * global.cosine(this.theta - global.PI_DIV_6);
		this.vcr_2.y = this.vcr_1.y + 0.4 * cache_9 * global.sine(this.theta - global.PI_DIV_6);
		this.vcr_3.x = this.vcr_1.x + 0.4 * cache_8 * global.cosine(this.theta + global.PI_DIV_6);
		this.vcr_3.y = this.vcr_1.y + 0.4 * cache_9 * global.sine(this.theta + global.PI_DIV_6);
		this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
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
		this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
		this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_paint.set_text_size(global.canvas_text_size_4);
	}
	recolor() {
		if (this.flag_add_element) {
			this.line_paint.set_color(global.SELECTED_COLOR);
			this.point_paint.set_color(global.SELECTED_COLOR);
			this.text_paint.set_color(global.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.connect1_x, this.connect1_y, this.vcr_4.x, this.vcr_4.y);
			this.line_buffer[indexer++] = Array(this.vcr_4.x, this.vcr_4.y, this.vcr_6.x, this.vcr_6.y);
			this.line_buffer[indexer++] = Array(this.vcr_6.x, this.vcr_6.y, this.vcr_5.x, this.vcr_5.y);
			this.line_buffer[indexer++] = Array(this.vcr_5.x, this.vcr_5.y, this.vcr_7.x, this.vcr_7.y);
			this.line_buffer[indexer++] = Array(this.vcr_7.x, this.vcr_7.y, this.vcr_8.x, this.vcr_8.y);
			this.line_buffer[indexer++] = Array(this.vcr_8.x, this.vcr_8.y, this.connect2_x, this.connect2_y);
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[indexer++] = Array(this.p3.x, this.p3.y, this.connect2_x, this.connect2_y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[indexer++] = Array(this.vcr_2.x, this.vcr_2.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[indexer++] = Array(this.vcr_3.x, this.vcr_3.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_13.x, this.vcr_13.y);
			this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_15.x, this.vcr_15.y);
			this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_16.x, this.vcr_16.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (this.draw_tag && !global.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
				canvas.draw_rect2(this.text_bounds, this.text_background_paint);
				canvas.draw_text(this.TAG, this.bounds.get_center_x(), this.text_bounds.get_center_y(), this.text_paint);
			}
		}
	}
}
