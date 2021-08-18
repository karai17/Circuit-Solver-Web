'use strict';
class ElementWindow {
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    constructor(left, top, right, bottom) {
        this.ENABLE_MOUSE_WHEEL = true;
        this.positions = [];
        this.mouse_wheel_counter = 0;
        this.MOUSE_WHEEL_COUNTER_MAX = 1;
        this.NAVIGATE_TEXT = '...';
        this.MAX_ICONS = 8;
        this.NAVIGATE_BACK_INDEX = 0;
        this.NAVIGATE_FORWARD_INDEX = this.MAX_ICONS - 1;
        this.first_touch_x = 0;
        this.first_touch_y = 0;
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
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(2 * global.variables.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_6);
        }
        this.text_paint.set_paint_baseline(this.text_paint.baseline.ALPHABETIC);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
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
        this.bounds = new RectF(left, top, right, bottom);
        this.temp_bounds = new RectF(0, 0, 0, 0);
        this.load_positions();
        this.page_number = 0;
        this.element_index = 1;
        this.MAX_PAGE_NUMBER = 0;
        /* #INSERT_GENERATE_CREATE_ELEMENT_WINDOW_ICON# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.resistor_symbol = new ResistorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.capacitor_symbol = new CapacitorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.inductor_symbol = new InductorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.ground_symbol = new GroundSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.dcsource_symbol = new DCSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.dccurrent_symbol = new DCCurrentSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.acsource_symbol = new ACSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.accurrent_symbol = new ACCurrentSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.squarewave_symbol = new SquareWaveSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.sawwave_symbol = new SawWaveSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.trianglewave_symbol = new TriangleWaveSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.constant_symbol = new ConstantSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.net_symbol = new NetSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.note_symbol = new NoteSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.rail_symbol = new RailSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.voltmeter_symbol = new VoltMeterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.ohmmeter_symbol = new OhmMeterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.ammeter_symbol = new AmMeterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.wattmeter_symbol = new WattMeterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.fuse_symbol = new FuseSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.spst_symbol = new SinglePoleSingleThrowSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.spdt_symbol = new SinglePoleDoubleThrowSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.not_symbol = new NOTGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.diode_symbol = new DiodeSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.led_symbol = new LightEmittingDiodeSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.zener_symbol = new ZenerDiodeSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.potentiometer_symbol = new PotentiometerSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.and_symbol = new ANDGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.or_symbol = new ORGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.nand_symbol = new NANDGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.nor_symbol = new NORGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.xor_symbol = new XORGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.xnor_symbol = new XNORGateSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.dff_symbol = new DFlipFlopSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vsat_symbol = new VoltageSaturationSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.adder_symbol = new AdderSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.subtractor_symbol = new SubtractorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.multiplier_symbol = new MultiplierSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.divider_symbol = new DividerSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.gain_symbol = new GainBlockSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.absval_symbol = new AbsoluteValueSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vcsw_symbol = new VoltageControlledSwitchSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.vcvs_symbol = new VoltageControlledVoltageSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vccs_symbol = new VoltageControlledCurrentSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.cccs_symbol = new CurrentControlledCurrentSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.ccvs_symbol = new CurrentControlledVoltageSourceSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.opamp_symbol = new OperationalAmplifierSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.nmosfet_symbol = new NChannelMOSFETSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.pmosfet_symbol = new PChannelMOSFETSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.npn_symbol = new NPNBipolarJunctionTransistorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.pnp_symbol = new PNPBipolarJunctionTransistorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.adc_symbol = new ADCModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.dac_symbol = new DACModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.samplers_symbol = new SampleAndHoldSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.pwm_symbol = new PulseWidthModulatorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.integrator_symbol = new IntegratorModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.differentiator_symbol = new DifferentiatorModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.lowpass_symbol = new LowPassFilterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.highpass_symbol = new HighPassFilterSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.relay_symbol = new RelaySymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.pid_symbol = new PIDModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.lut_symbol = new LookUpTableSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vcr_symbol = new VoltageControlledResistorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vcca_symbol = new VoltageControlledCapacitorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.vcl_symbol = new VoltageControlledInductorSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.grt_symbol = new GreaterThanSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index = 1;
        this.MAX_PAGE_NUMBER++;
        this.tptz_symbol = new TPTZModuleSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        this.element_index++;
        this.transformer_symbol = new TransformerSymbol(this.positions[this.element_index], this.element_index, this.MAX_PAGE_NUMBER);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    load_positions() {
        this.positions.splice(0, this.positions.length);
        let height = 0;
        for (var i = 0; i < this.MAX_ICONS; i++) {
            this.temp_bounds.left = this.bounds.left + i * ((this.bounds.right - this.bounds.left) / this.MAX_ICONS);
            this.temp_bounds.top = this.bounds.top + global.variables.canvas_stroke_width_3;
            this.temp_bounds.right = this.bounds.left + ((i + 1) * (this.bounds.right - this.bounds.left)) / this.MAX_ICONS;
            this.temp_bounds.bottom = this.bounds.bottom - global.variables.canvas_stroke_width_3;
            height = this.temp_bounds.get_height();
            this.temp_bounds.set_center2(this.temp_bounds.get_center_x(), this.temp_bounds.get_center_y(), height, height);
            this.positions.push(new RectF(this.temp_bounds.left, this.temp_bounds.top, this.temp_bounds.right, this.temp_bounds.bottom));
        }
    }
    update() { }
    mouse_wheel() {
        if (this.ENABLE_MOUSE_WHEEL) {
            if (global.flags.flag_menu_element_toolbox) {
                if (!global.variables.mouse_keyboard_lock) {
                    this.mouse_wheel_counter++;
                    if (this.mouse_wheel_counter >= this.MOUSE_WHEEL_COUNTER_MAX) {
                        //@ts-expect-error
                        if (global.events.mouse_wheel_event.wheelDelta < 0 || global.events.mouse_wheel_event.detail > 0) {
                            if (this.page_number < this.MAX_PAGE_NUMBER) {
                                this.page_number++;
                            }
                        }
                        else {
                            if (this.page_number > 0) {
                                this.page_number--;
                            }
                        }
                        this.mouse_wheel_counter = 0;
                    }
                }
            }
        }
    }
    mouse_down() {
        if (global.flags.flag_menu_element_toolbox && !global.variables.is_right_click) {
            if (!global.variables.mouse_keyboard_lock) {
                this.first_touch_x = global.variables.mouse_x;
                this.first_touch_y = global.variables.mouse_y;
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_DOWN# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vcca_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.vcl_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_down(this.page_number, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
                if (MOBILE_MODE) {
                    if (this.positions[this.NAVIGATE_BACK_INDEX].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                        this.positions[this.NAVIGATE_BACK_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                        global.variables.component_touched = true;
                    }
                    else if (this.positions[this.NAVIGATE_FORWARD_INDEX].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                        this.positions[this.NAVIGATE_FORWARD_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                        global.variables.component_touched = true;
                    }
                }
            }
        }
    }
    mouse_move() {
        if (global.flags.flag_menu_element_toolbox && !global.variables.is_right_click) {
            if (!global.variables.mouse_keyboard_lock) {
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_MOVE# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vcca_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.vcl_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_move(this.page_number, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
    }
    mouse_up() {
        if (global.flags.flag_menu_element_toolbox && !global.variables.is_right_click) {
            if (!global.variables.mouse_keyboard_lock) {
                if (this.positions[this.NAVIGATE_BACK_INDEX].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                    this.positions[this.NAVIGATE_BACK_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                    if (this.page_number > 0) {
                        this.page_number--;
                    }
                    global.variables.component_touched = true;
                }
                else if (this.positions[this.NAVIGATE_FORWARD_INDEX].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                    this.positions[this.NAVIGATE_FORWARD_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                    if (this.page_number < this.MAX_PAGE_NUMBER) {
                        this.page_number++;
                    }
                    global.variables.component_touched = true;
                }
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_UP# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vcca_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.vcl_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_up(this.page_number, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
    }
    resize_window(left, top, right, bottom) {
        this.bounds.set_bounds(left, top, right, bottom);
        this.load_positions();
        /* #INSERT_GENERATE_ELEMENT_WINDOW_RESIZE_WINDOW# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.resistor_symbol.resize(this.positions[this.resistor_symbol.index]);
        this.capacitor_symbol.resize(this.positions[this.capacitor_symbol.index]);
        this.inductor_symbol.resize(this.positions[this.inductor_symbol.index]);
        this.ground_symbol.resize(this.positions[this.ground_symbol.index]);
        this.dcsource_symbol.resize(this.positions[this.dcsource_symbol.index]);
        this.dccurrent_symbol.resize(this.positions[this.dccurrent_symbol.index]);
        this.acsource_symbol.resize(this.positions[this.acsource_symbol.index]);
        this.accurrent_symbol.resize(this.positions[this.accurrent_symbol.index]);
        this.squarewave_symbol.resize(this.positions[this.squarewave_symbol.index]);
        this.sawwave_symbol.resize(this.positions[this.sawwave_symbol.index]);
        this.trianglewave_symbol.resize(this.positions[this.trianglewave_symbol.index]);
        this.constant_symbol.resize(this.positions[this.constant_symbol.index]);
        this.net_symbol.resize(this.positions[this.net_symbol.index]);
        this.note_symbol.resize(this.positions[this.note_symbol.index]);
        this.rail_symbol.resize(this.positions[this.rail_symbol.index]);
        this.voltmeter_symbol.resize(this.positions[this.voltmeter_symbol.index]);
        this.ohmmeter_symbol.resize(this.positions[this.ohmmeter_symbol.index]);
        this.ammeter_symbol.resize(this.positions[this.ammeter_symbol.index]);
        this.wattmeter_symbol.resize(this.positions[this.wattmeter_symbol.index]);
        this.fuse_symbol.resize(this.positions[this.fuse_symbol.index]);
        this.spst_symbol.resize(this.positions[this.spst_symbol.index]);
        this.spdt_symbol.resize(this.positions[this.spdt_symbol.index]);
        this.not_symbol.resize(this.positions[this.not_symbol.index]);
        this.diode_symbol.resize(this.positions[this.diode_symbol.index]);
        this.led_symbol.resize(this.positions[this.led_symbol.index]);
        this.zener_symbol.resize(this.positions[this.zener_symbol.index]);
        this.potentiometer_symbol.resize(this.positions[this.potentiometer_symbol.index]);
        this.and_symbol.resize(this.positions[this.and_symbol.index]);
        this.or_symbol.resize(this.positions[this.or_symbol.index]);
        this.nand_symbol.resize(this.positions[this.nand_symbol.index]);
        this.nor_symbol.resize(this.positions[this.nor_symbol.index]);
        this.xor_symbol.resize(this.positions[this.xor_symbol.index]);
        this.xnor_symbol.resize(this.positions[this.xnor_symbol.index]);
        this.dff_symbol.resize(this.positions[this.dff_symbol.index]);
        this.vsat_symbol.resize(this.positions[this.vsat_symbol.index]);
        this.adder_symbol.resize(this.positions[this.adder_symbol.index]);
        this.subtractor_symbol.resize(this.positions[this.subtractor_symbol.index]);
        this.multiplier_symbol.resize(this.positions[this.multiplier_symbol.index]);
        this.divider_symbol.resize(this.positions[this.divider_symbol.index]);
        this.gain_symbol.resize(this.positions[this.gain_symbol.index]);
        this.absval_symbol.resize(this.positions[this.absval_symbol.index]);
        this.vcsw_symbol.resize(this.positions[this.vcsw_symbol.index]);
        this.vcvs_symbol.resize(this.positions[this.vcvs_symbol.index]);
        this.vccs_symbol.resize(this.positions[this.vccs_symbol.index]);
        this.cccs_symbol.resize(this.positions[this.cccs_symbol.index]);
        this.ccvs_symbol.resize(this.positions[this.ccvs_symbol.index]);
        this.opamp_symbol.resize(this.positions[this.opamp_symbol.index]);
        this.nmosfet_symbol.resize(this.positions[this.nmosfet_symbol.index]);
        this.pmosfet_symbol.resize(this.positions[this.pmosfet_symbol.index]);
        this.npn_symbol.resize(this.positions[this.npn_symbol.index]);
        this.pnp_symbol.resize(this.positions[this.pnp_symbol.index]);
        this.adc_symbol.resize(this.positions[this.adc_symbol.index]);
        this.dac_symbol.resize(this.positions[this.dac_symbol.index]);
        this.samplers_symbol.resize(this.positions[this.samplers_symbol.index]);
        this.pwm_symbol.resize(this.positions[this.pwm_symbol.index]);
        this.integrator_symbol.resize(this.positions[this.integrator_symbol.index]);
        this.differentiator_symbol.resize(this.positions[this.differentiator_symbol.index]);
        this.lowpass_symbol.resize(this.positions[this.lowpass_symbol.index]);
        this.highpass_symbol.resize(this.positions[this.highpass_symbol.index]);
        this.relay_symbol.resize(this.positions[this.relay_symbol.index]);
        this.pid_symbol.resize(this.positions[this.pid_symbol.index]);
        this.lut_symbol.resize(this.positions[this.lut_symbol.index]);
        this.vcr_symbol.resize(this.positions[this.vcr_symbol.index]);
        this.vcca_symbol.resize(this.positions[this.vcca_symbol.index]);
        this.vcl_symbol.resize(this.positions[this.vcl_symbol.index]);
        this.grt_symbol.resize(this.positions[this.grt_symbol.index]);
        this.tptz_symbol.resize(this.positions[this.tptz_symbol.index]);
        this.transformer_symbol.resize(this.positions[this.transformer_symbol.index]);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(2 * global.variables.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_6);
        }
        this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
        this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
    }
    draw_hover(canvas) {
        for (var i = 0; i < this.positions.length; i++) {
            if (this.positions[i].contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                if (i !== this.NAVIGATE_BACK_INDEX && i !== this.NAVIGATE_FORWARD_INDEX) {
                    if (this.hover_limits(this.page_number, i, this.element_index, this.MAX_PAGE_NUMBER)) {
                        canvas.draw_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, this.hover_paint);
                    }
                }
                else {
                    if (i === this.NAVIGATE_BACK_INDEX) {
                        if (this.page_number > 0) {
                            canvas.draw_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, this.hover_paint);
                        }
                    }
                    if (i === this.NAVIGATE_FORWARD_INDEX) {
                        if (this.page_number < this.MAX_PAGE_NUMBER) {
                            canvas.draw_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, this.hover_paint);
                        }
                    }
                }
            }
        }
    }
    hover_limits(current_page, index, overflow, max_pages) {
        if (current_page <= max_pages) {
            if (current_page < max_pages) {
                return true;
            }
            else if (current_page === max_pages && index <= overflow) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    draw_window(canvas) {
        if (global.flags.flag_menu_element_toolbox) {
            canvas.draw_rect2(this.bounds, this.fill_paint);
            if (MOBILE_MODE === false) {
                this.draw_hover(canvas);
            }
            if (this.page_number > 0) {
                canvas.draw_text(this.NAVIGATE_TEXT, this.positions[this.NAVIGATE_BACK_INDEX].get_center_x(), this.positions[this.NAVIGATE_BACK_INDEX].get_center_y(), this.text_paint);
            }
            if (this.page_number < this.MAX_PAGE_NUMBER) {
                canvas.draw_text(this.NAVIGATE_TEXT, this.positions[this.NAVIGATE_FORWARD_INDEX].get_center_x(), this.positions[this.NAVIGATE_FORWARD_INDEX].get_center_y(), this.text_paint);
            }
            /* #INSERT_GENERATE_ELEMENT_WINDOW_DRAW# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            this.resistor_symbol.draw_symbol(canvas, this.page_number);
            this.capacitor_symbol.draw_symbol(canvas, this.page_number);
            this.inductor_symbol.draw_symbol(canvas, this.page_number);
            this.ground_symbol.draw_symbol(canvas, this.page_number);
            this.dcsource_symbol.draw_symbol(canvas, this.page_number);
            this.dccurrent_symbol.draw_symbol(canvas, this.page_number);
            this.acsource_symbol.draw_symbol(canvas, this.page_number);
            this.accurrent_symbol.draw_symbol(canvas, this.page_number);
            this.squarewave_symbol.draw_symbol(canvas, this.page_number);
            this.sawwave_symbol.draw_symbol(canvas, this.page_number);
            this.trianglewave_symbol.draw_symbol(canvas, this.page_number);
            this.constant_symbol.draw_symbol(canvas, this.page_number);
            this.net_symbol.draw_symbol(canvas, this.page_number);
            this.note_symbol.draw_symbol(canvas, this.page_number);
            this.rail_symbol.draw_symbol(canvas, this.page_number);
            this.voltmeter_symbol.draw_symbol(canvas, this.page_number);
            this.ohmmeter_symbol.draw_symbol(canvas, this.page_number);
            this.ammeter_symbol.draw_symbol(canvas, this.page_number);
            this.wattmeter_symbol.draw_symbol(canvas, this.page_number);
            this.fuse_symbol.draw_symbol(canvas, this.page_number);
            this.spst_symbol.draw_symbol(canvas, this.page_number);
            this.spdt_symbol.draw_symbol(canvas, this.page_number);
            this.not_symbol.draw_symbol(canvas, this.page_number);
            this.diode_symbol.draw_symbol(canvas, this.page_number);
            this.led_symbol.draw_symbol(canvas, this.page_number);
            this.zener_symbol.draw_symbol(canvas, this.page_number);
            this.potentiometer_symbol.draw_symbol(canvas, this.page_number);
            this.and_symbol.draw_symbol(canvas, this.page_number);
            this.or_symbol.draw_symbol(canvas, this.page_number);
            this.nand_symbol.draw_symbol(canvas, this.page_number);
            this.nor_symbol.draw_symbol(canvas, this.page_number);
            this.xor_symbol.draw_symbol(canvas, this.page_number);
            this.xnor_symbol.draw_symbol(canvas, this.page_number);
            this.dff_symbol.draw_symbol(canvas, this.page_number);
            this.vsat_symbol.draw_symbol(canvas, this.page_number);
            this.adder_symbol.draw_symbol(canvas, this.page_number);
            this.subtractor_symbol.draw_symbol(canvas, this.page_number);
            this.multiplier_symbol.draw_symbol(canvas, this.page_number);
            this.divider_symbol.draw_symbol(canvas, this.page_number);
            this.gain_symbol.draw_symbol(canvas, this.page_number);
            this.absval_symbol.draw_symbol(canvas, this.page_number);
            this.vcsw_symbol.draw_symbol(canvas, this.page_number);
            this.vcvs_symbol.draw_symbol(canvas, this.page_number);
            this.vccs_symbol.draw_symbol(canvas, this.page_number);
            this.cccs_symbol.draw_symbol(canvas, this.page_number);
            this.ccvs_symbol.draw_symbol(canvas, this.page_number);
            this.opamp_symbol.draw_symbol(canvas, this.page_number);
            this.nmosfet_symbol.draw_symbol(canvas, this.page_number);
            this.pmosfet_symbol.draw_symbol(canvas, this.page_number);
            this.npn_symbol.draw_symbol(canvas, this.page_number);
            this.pnp_symbol.draw_symbol(canvas, this.page_number);
            this.adc_symbol.draw_symbol(canvas, this.page_number);
            this.dac_symbol.draw_symbol(canvas, this.page_number);
            this.samplers_symbol.draw_symbol(canvas, this.page_number);
            this.pwm_symbol.draw_symbol(canvas, this.page_number);
            this.integrator_symbol.draw_symbol(canvas, this.page_number);
            this.differentiator_symbol.draw_symbol(canvas, this.page_number);
            this.lowpass_symbol.draw_symbol(canvas, this.page_number);
            this.highpass_symbol.draw_symbol(canvas, this.page_number);
            this.relay_symbol.draw_symbol(canvas, this.page_number);
            this.pid_symbol.draw_symbol(canvas, this.page_number);
            this.lut_symbol.draw_symbol(canvas, this.page_number);
            this.vcr_symbol.draw_symbol(canvas, this.page_number);
            this.vcca_symbol.draw_symbol(canvas, this.page_number);
            this.vcl_symbol.draw_symbol(canvas, this.page_number);
            this.grt_symbol.draw_symbol(canvas, this.page_number);
            this.tptz_symbol.draw_symbol(canvas, this.page_number);
            this.transformer_symbol.draw_symbol(canvas, this.page_number);
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
    }
}
