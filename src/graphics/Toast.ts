'use strict';
class Toast {
	private readonly HEIGHT_FACTOR: number;
	private readonly MAX_ITERATIONS: number;
	private readonly TOAST_FPS: number;
	private height_ratio: number;
	private line_paint: Paint;
	private fill_paint: Paint;
	private text_paint: Paint;
	private text: string;
	private timer: number;
	public draw_text: boolean;
	private bounds: RectF;
	private toast_request_draw: boolean;
	private last_text: string;
	private text_measure_div2: number;
	constructor() {
		if (MOBILE_MODE) {
			this.height_ratio = 0.85;
			this.HEIGHT_FACTOR = 0.7;
		} else {
			this.height_ratio = 0.9;
			this.HEIGHT_FACTOR = 0.5;
		}
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(paint.style.STROKE);
		this.line_paint.set_paint_cap(paint.cap.ROUND);
		this.line_paint.set_paint_join(paint.join.ROUND);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.ROUND);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
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
			this.text_paint.set_text_size(global.variables.canvas_text_size_5 * 1.25);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(paint.align.CENTER);
		this.text = '';
		this.timer = 0;
		this.MAX_ITERATIONS = 2;
		this.TOAST_FPS = FPS;
		this.draw_text = false;
		this.bounds = new RectF(0, 0, 0, 0);
		this.toast_request_draw = false;
		this.last_text = '-';
		this.text_measure_div2 = -1;
	}
	update(): void {
		if (this.draw_text) {
			this.timer++;
			if (this.timer >= this.TOAST_FPS * this.MAX_ITERATIONS) {
				this.reset();
			}
		}
	} reset(): void {
		this.text = '';
		this.last_text = '-';
		this.timer = 0;
		this.draw_text = false;
		this.toast_request_draw = true;
	}
	set_text(str: string): void {
		this.text = language_manager.TEXT_PADDING + str + language_manager.TEXT_PADDING;
		this.last_text = '-';
	}
	show(color: string): void {
		this.fill_paint.set_color(color);
		this.timer = 0;
		this.draw_text = true;
	}
	resize_toast(): void {
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5 * 1.25);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.last_text = this.text;
		this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
	}
	draw_toast(canvas: GraphicsEngine): void {
		if (this.draw_text) {
			if (this.last_text !== this.text) {
				this.last_text = this.text;
				this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
			}
			this.bounds.left = view_port.center_x - this.text_measure_div2;
			this.bounds.top = view_port.top + view_port.view_height * this.height_ratio;
			this.bounds.right = view_port.center_x + this.text_measure_div2;
			this.bounds.bottom = view_port.top + view_port.view_height * (this.height_ratio + (1.0 - this.height_ratio) * this.HEIGHT_FACTOR);
			canvas.draw_circle(this.bounds.left, this.bounds.get_center_y(), this.bounds.get_height() * 0.5, this.fill_paint);
			canvas.draw_circle(this.bounds.right, this.bounds.get_center_y(), this.bounds.get_height() * 0.5, this.fill_paint);
			canvas.draw_rect2(this.bounds, this.fill_paint);
			canvas.draw_text(this.text, this.bounds.get_center_x(), this.bounds.get_center_y(), this.text_paint);
			this.update();
		}
		if (this.toast_request_draw) {
			this.toast_request_draw = false;
		}
	}
}
