'use strict';
class Viewport {
    constructor(aspect_ratio, screen_width, screen_height) {
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
        this.line_paint.set_color(global.COLORS.MENU_HIGHLIGHT_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.OPTION_DRAW_BOUNDS = false;
        if (MOBILE_MODE === true || DESKTOP_MODE === true) {
            this.apply_spread_factor = true;
        }
        else {
            this.apply_spread_factor = false;
        }
        this.resize(aspect_ratio, screen_width, screen_height);
    }
    resize(aspect_ratio, screen_width, screen_height) {
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.center_x = this.screen_width >> 1;
        this.center_y = this.screen_height >> 1;
        this.aspect_ratio = aspect_ratio;
        this.view_width = Math.min(this.screen_width, this.screen_height);
        this.view_height = this.view_width / this.aspect_ratio;
        if (this.apply_spread_factor) {
            this.width_spread_factor = this.screen_width / this.view_width;
            this.height_spread_factor = this.screen_height / this.view_height;
            this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
            this.view_width *= this.spread_factor;
            this.view_height *= this.spread_factor;
        }
        this.left = this.center_x - (this.view_width >> 1);
        this.top = this.center_y - (this.view_height >> 1);
        this.right = this.center_x + (this.view_width >> 1);
        this.bottom = this.center_y + (this.view_height >> 1);
        this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        global.flags.flag_build_element = true;
        global.variables.flag_build_counter = 0;
    }
    draw_viewport(canvas) {
        if (this.OPTION_DRAW_BOUNDS) {
            canvas.draw_rect(this.left, this.top, this.right, this.bottom, this.line_paint);
        }
    }
}
