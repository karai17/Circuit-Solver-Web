'use strict';
class Paint {
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
        this.garbage_collector_size = 20;
        this.temp_boolean = false;
        this.paint_surface = new VirtualCanvas(1, 1, -1);
        this.last_font = '';
        this.last_text_size = -1;
        this.metric = null;
        this.reset_array();
    }
    set_alpha(alpha) {
        this.alpha = alpha * 0.0039215686;
    }
    get_alpha() {
        return this.alpha;
    }
    set_font(font) {
        this.last_font = '';
        this.font = font;
    }
    get_font() {
        return this.font;
    }
    set_color(color) {
        this.color = color;
    }
    get_color() {
        return this.color;
    }
    set_stroke_width(setter) {
        this.stroke_width = setter;
    }
    get_stroke_width() {
        return this.stroke_width;
    }
    set_paint_style(setter) {
        this.paint_style = setter;
    }
    get_paint_style() {
        return this.paint_style;
    }
    set_paint_join(setter) {
        this.paint_join = setter;
    }
    get_paint_join() {
        return this.paint_join;
    }
    set_paint_baseline(setter) {
        this.text_baseline = setter;
    }
    get_paint_baseline() {
        return this.text_baseline;
    }
    set_text_size(setter) {
        this.last_text_size = -1;
        this.text_size = setter;
    }
    get_text_size() {
        return this.text_size;
    }
    set_paint_cap(setter) {
        this.paint_cap = setter;
    }
    get_paint_cap() {
        return this.paint_cap;
    }
    set_paint_align(setter) {
        this.text_align = setter;
    }
    get_paint_align() {
        return this.text_align;
    }
    measure(txt) {
        if (this.last_font !== this.font || this.last_text_size !== this.text_size) {
            this.paint_surface.context.font = this.text_size + 'px ' + this.font;
            this.last_font = this.font;
            this.last_text_size = this.text_size;
        }
        this.metric = this.paint_surface.context.measureText(txt);
        return {
            width: this.metric.width,
            ascent: this.metric.actualBoundingBoxAscent,
            descent: this.metric.actualBoundingBoxDescent
        };
    }
    measure_text(txt) {
        return this.retrieve_metrics(txt)['width'];
    }
    measure_ascent(txt) {
        return this.retrieve_metrics(txt)['ascent'];
    }
    measure_descent(txt) {
        return this.retrieve_metrics(txt)['descent'];
    }
    reset_array() {
        this.metric_array = [];
    }
    search_array(txt) {
        this.temp_boolean = false;
        this.saved_metric = global.CONSTANTS.NULL;
        for (var i = 0; i < this.metric_array.length; i++) {
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
    retrieve_metrics(txt) {
        if (this.search_array(txt)) {
            return this.saved_metric;
        }
        else {
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
    house_keeping(txt) {
        for (var i = this.metric_array.length - 1; i > -1; i--) {
            if (this.metric_array[i]['text'] === txt && this.metric_array[i]['font'] === this.font && this.metric_array[i]['text size'] !== this.text_size) {
                this.metric_array.splice(i, 1);
            }
        }
    }
    patch() {
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
            this.garbage_collector_size = 20;
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
            this.garbage_collector_size = 20;
        }
    }
}
