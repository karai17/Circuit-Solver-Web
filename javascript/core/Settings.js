'use strict';
class Settings {
    constructor() {
        this.WORKSPACE_PERFECT_SQUARE = true;
        this.WORKSPACE_RATIO_Y = 0.45;
        if (this.WORKSPACE_PERFECT_SQUARE) {
            this.WORKSPACE_RATIO_X = _.clone(this.WORKSPACE_RATIO_Y);
        }
        else {
            this.WORKSPACE_RATIO_X = (view_port.view_height * this.WORKSPACE_RATIO_Y) / view_port.view_width;
        }
        this.WIRE_RESISTANCE = 1e-3;
        this.TRANSLATION_SCALE = 1.2;
        this.MAXNODES = 900;
        this.SQRT_MAXNODES = Math.round(Math.sqrt(this.MAXNODES));
        this.SQRT_MAXNODES_M1 = this.SQRT_MAXNODES - 1;
        this.INV_SQRT_MAXNODES_M_1 = 1.0 / (this.SQRT_MAXNODES - 1);
        this.INV_SQRT_MAXNODES = 1.0 / this.SQRT_MAXNODES;
        this.R_MAX = 1e9;
        this.INV_R_MAX = 1.0 / this.R_MAX;
        this.R_SHUNT = 1e12;
        this.RELTOL = 1e-3;
        this.ABSTOL = 1e-3;
        this.VNTOL = 1e-3;
        this.TOLERANCE = 1e-3;
        this.ITL4 = 96;
        this.ITL1 = 24;
        this.MAX_VOLTAGE = 500e6;
        this.MIN_VOLTAGE = 1e-15;
        this.MAX_CURRENT = 500e6;
        this.MIN_CURRENT = 1e-15;
        this.MAX_CAPACITANCE = 500e6;
        this.MIN_CAPACITANCE = 1e-15;
        this.MAX_INDUCTANCE = 500e6;
        this.MIN_INDUCTANCE = 1e-15;
        this.MAX_GAIN = 500e6;
        this.MIN_GAIN = 1e-15;
        this.MAX_FREQUENCY = 500e6;
        this.MIN_FREQUENCY = 1e-15;
        this.MAX_WAVELENGTH = 700;
        this.MIN_WAVELENGTH = 400;
        this.MAX_POTENTIOMETER_WIPER = 99.99;
        this.MIN_POTENTIOMETER_WIPER = 0.01;
        this.MAX_PHASE = 360.0;
        this.MIN_PHASE = 0;
        this.MAX_BIT_RESOLUTION = 24;
        this.MIN_BIT_RESOLUTION = 1;
        this.MAX_DUTY_CYCLE = 98;
        this.MIN_DUTY_CYCLE = 2;
        this.MAX_POSTSCALER = 500e6;
        this.MIN_POSTSCALER = 1;
        this.THERMAL_VOLTAGE = 25.6e-3;
        this.GMIN_DEFAULT = 1e-9;
    }
    patch() {
        this.WORKSPACE_PERFECT_SQUARE = true;
        this.WORKSPACE_RATIO_Y = 0.45;
        if (this.WORKSPACE_PERFECT_SQUARE) {
            this.WORKSPACE_RATIO_X = _.clone(this.WORKSPACE_RATIO_Y);
        }
        else {
            this.WORKSPACE_RATIO_X = (view_port.view_height * this.WORKSPACE_RATIO_Y) / view_port.view_width;
        }
        this.WIRE_RESISTANCE = 1e-3;
        this.TRANSLATION_SCALE = 1.2;
        this.MAXNODES = 900;
        this.SQRT_MAXNODES = Math.round(Math.sqrt(this.MAXNODES));
        this.SQRT_MAXNODES_M1 = this.SQRT_MAXNODES - 1;
        this.INV_SQRT_MAXNODES_M_1 = 1.0 / (this.SQRT_MAXNODES - 1);
        this.INV_SQRT_MAXNODES = 1.0 / this.SQRT_MAXNODES;
        this.R_MAX = 1e9;
        this.INV_R_MAX = 1.0 / this.R_MAX;
        this.R_SHUNT = 1e12;
        this.RELTOL = 1e-1;
        this.ABSTOL = 1e-1;
        this.VNTOL = 1e-1;
        this.TOLERANCE = 1e-1;
        this.ITL4 = 96;
        this.ITL1 = 24;
        this.MAX_VOLTAGE = 500e6;
        this.MIN_VOLTAGE = 1e-15;
        this.MAX_CURRENT = 500e6;
        this.MIN_CURRENT = 1e-15;
        this.MAX_CAPACITANCE = 500e6;
        this.MIN_CAPACITANCE = 1e-15;
        this.MAX_INDUCTANCE = 500e6;
        this.MIN_INDUCTANCE = 1e-15;
        this.MAX_GAIN = 500e6;
        this.MIN_GAIN = 1e-15;
        this.MAX_FREQUENCY = 500e6;
        this.MIN_FREQUENCY = 1e-15;
        this.MAX_WAVELENGTH = 700;
        this.MIN_WAVELENGTH = 400;
        this.MAX_POTENTIOMETER_WIPER = 99.99;
        this.MIN_POTENTIOMETER_WIPER = 0.01;
        this.MAX_PHASE = 360.0;
        this.MIN_PHASE = 0;
        this.MAX_BIT_RESOLUTION = 24;
        this.MIN_BIT_RESOLUTION = 1;
        this.MAX_DUTY_CYCLE = 98;
        this.MIN_DUTY_CYCLE = 2;
        this.MAX_POSTSCALER = 500e6;
        this.MIN_POSTSCALER = 1;
        this.THERMAL_VOLTAGE = 25.6e-3;
        this.GMIN_DEFAULT = 1e-9;
    }
}
