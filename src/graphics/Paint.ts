'use strict';
class Paint {
	public style: PaintStyle;
	public align: PaintAlign;
	public cap: PaintCap;
	public join: PaintJoin;
	public baseline: PaintBaseline;
	public color: string;
	public stroke_width: number;
	public paint_style: number;
	public paint_cap: CanvasLineCap;
	public paint_join: CanvasLineJoin;
	public text_align: CanvasTextAlign;
	public text_baseline: CanvasTextBaseline;
	public text_size: number;
	public font: string;
	public alpha: number;
	private metric_array: Array<PAINT_METRICS_ARRAY_T>;
	private saved_metric: PAINT_METRICS_T;
	private garbage_collector_size: number;
	private temp_boolean: boolean;
	private paint_surface: VirtualCanvas;
	private last_font: string;
	private last_text_size: number;
	private metric: TextMetrics;

	constructor() {
		this.style = new PaintStyle();
		this.align = new PaintAlign();
		this.cap = new PaintCap();
		this.join = new PaintJoin();
		this.baseline = new PaintBaseline();
		this.color = '#000000';
		this.stroke_width = 1;
		this.paint_style = this.style.STROKE;
		this.paint_cap = this.cap.ROUND;
		this.paint_join = this.join.ROUND;
		this.text_align = this.align.CENTER;
		this.text_baseline = this.baseline.MIDDLE;
		this.text_size = 1;
		this.font = 'Arial';
		this.alpha = 1;
		this.metric_array = [];
		this.saved_metric = null;
		this.garbage_collector_size = 18;
		this.temp_boolean = false;
		this.paint_surface = new VirtualCanvas(1, 1, -1);
		this.last_font = '';
		this.last_text_size = -1;
		this.metric = null;
		this.reset_array();
	}

	set_alpha(alpha: number): void {
		this.alpha = alpha * 0.0039215686;
	}
	get_alpha(): number {
		return this.alpha;
	}
	set_font(font: string): void {
		this.last_font = '';
		this.font = font;
	}
	get_font(): string {
		return this.font;
	}
	set_color(color: string): void {
		this.color = color;
	}
	get_color(): string {
		return this.color;
	}
	set_stroke_width(setter: number): void {
		this.stroke_width = setter;
	}
	get_stroke_width(): number {
		return this.stroke_width;
	}
	set_paint_style(setter: number): void {
		this.paint_style = setter;
	}
	get_paint_style(): number {
		return this.paint_style;
	}
	set_paint_join(setter: CanvasLineJoin): void {
		this.paint_join = setter;
	}
	get_paint_join(): CanvasLineJoin {
		return this.paint_join;
	}
	set_paint_baseline(setter: CanvasTextBaseline): void {
		this.text_baseline = setter;
	}
	get_paint_baseline(): CanvasTextBaseline {
		return this.text_baseline;
	}
	set_text_size(setter: number): void {
		this.last_text_size = -1;
		this.text_size = setter;
	}
	get_text_size(): number {
		return this.text_size;
	}
	set_paint_cap(setter: CanvasLineCap): void {
		this.paint_cap = setter;
	}
	get_paint_cap(): CanvasLineCap {
		return this.paint_cap;
	}
	set_paint_align(setter: CanvasTextAlign): void {
		this.text_align = setter;
	}
	get_paint_align(): CanvasTextAlign {
		return this.text_align;
	}
	measure(txt: string): PAINT_METRICS_T {
		if (this.last_font !== this.font || this.last_text_size !== this.text_size) {
			this.paint_surface.context.font = this.text_size + "px " + this.font;
			this.last_font = this.font;
			this.last_text_size = this.text_size;
		}
		this.metric = this.paint_surface.context.measureText(txt);
		return {
			width: this.metric.width,
			ascent: this.metric.fontBoundingBoxAscent,
			descent: this.metric.fontBoundingBoxDescent
		};
	}
	measure_text(txt: string): number {
		return this.retrieve_metrics(txt)['width'];
	}
	measure_ascent(txt: string): number {
		return this.retrieve_metrics(txt)['ascent'];
	}
	measure_descent(txt: string): number {
		return this.retrieve_metrics(txt)['descent'];
	}
	reset_array(): void {
		this.metric_array = [];
	}
	search_array(txt: string): boolean {
		this.temp_boolean = false;
		this.saved_metric = global.CONSTANTS.NULL;
		for (var i: number = 0; i < this.metric_array.length; i++) {
			if (!this.temp_boolean) {
				if (this.metric_array[i]['text'] === txt && this.metric_array[i]['font'] === this.font && this.metric_array[i]['text size'] === this.text_size) {
					this.saved_metric = this.metric_array[i]['metric'];
					this.temp_boolean = true;
					break;
				}
			}
		}
		return this.temp_boolean;
	}
	retrieve_metrics(txt: string): PAINT_METRICS_T {
		if (this.search_array(txt)) {
			return this.saved_metric;
		} else {
			if (this.metric_array.length > this.garbage_collector_size) {
				this.house_keeping(txt);
			}
			this.metric_array.push({
				text: txt,
				font: this.font,
				'text size': this.text_size,
				metric: this.measure(txt)
			});
			return this.metric_array[this.metric_array.length - 1]['metric'];
		}
	}
	house_keeping(txt: string): void {
		for (var i: number = this.metric_array.length - 1; i > -1; i--) {
			if (this.metric_array[i]['text'] === txt && this.metric_array[i]['font'] === this.font && this.metric_array[i]['text size'] !== this.text_size) {
				this.metric_array.splice(i, 1);
			}
		}
	}
	patch(): void {
		if (!global.utils.not_null(this.baseline)) {
			this.baseline = new PaintBaseline();
		}
		if (!global.utils.not_null(this.metric_array)) {
			this.metric_array = [];
		}
		if (!global.utils.not_null(this.saved_metric)) {
			this.saved_metric = global.CONSTANTS.NULL;
		}
		if (!global.utils.not_null(this.garbage_collector_size)) {
			this.garbage_collector_size = 18;
		}
		if (!global.utils.not_null(this.paint_style)) {
			this.paint_style = this.style.STROKE;
		}
		if (!global.utils.not_null(this.paint_cap)) {
			this.paint_cap = this.cap.ROUND;
		}
		if (!global.utils.not_null(this.paint_join)) {
			this.paint_join = this.join.MITER;
		}
		if (!global.utils.not_null(this.text_align)) {
			this.text_align = this.align.CENTER;
		}
		if (!global.utils.not_null(this.text_baseline)) {
			this.text_baseline = this.baseline.MIDDLE;
		}
		if (this.garbage_collector_size !== 18) {
			this.garbage_collector_size = 18;
		}
	}
}
