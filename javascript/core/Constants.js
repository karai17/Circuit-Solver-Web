'use strict';
class Constants {
    constructor() {
        let indexer = 0;
        this.NULL = null;
        this.NODE_HINTS = true;
        this.VERSION_TAG = '1.1.07';
        if (MOBILE_MODE) {
            this.ZOOM_MAX = 3.5;
            this.ZOOM_MIN = 1.0;
        }
        else {
            this.ZOOM_MAX = 2.0;
            this.ZOOM_MIN = 0.5;
        }
        this.ZERO_PT_FIVE = 0.5;
        this.ZERO = 0 >> 0;
        this.ZERO_BIAS = 1e-18;
        this.ZOOM_FACTOR = 1.085;
        this.DEVELOPER_MODE = false;
        this.PRODUCTION_MODE = false;
        this.ON = 'ON';
        this.OFF = 'OFF';
        this.ROTATION_0 = 0;
        this.ROTATION_90 = 1;
        this.ROTATION_180 = 2;
        this.ROTATION_270 = 3;
        this.WIRE_STYLE_0 = 0;
        this.WIRE_STYLE_1 = 1;
        this.WIRE_STYLE_2 = 2;
        this.WIRE_STYLE_3 = 3;
        this.WIRE_STYLE_4 = 4;
        this.FLIP_0 = 0;
        this.FLIP_180 = 1;
        this.SIGNAL_BUILD_COUNTER_MAX = 5;
        this.SIGNAL_WIRE_DELETED_COUNTER_MAX = 5;
        this.TEXT_STYLE_1 = 'Style1';
        this.TEXT_STYLE_2 = 'Style2';
        this.TEXT_STYLE_3 = 'Style3';
        this.TEXT_STYLE_4 = 'Style4';
        this.TEXT_STYLE_5 = 'Style5';
        this.DEFAULT_FONT = 'Arial';
        indexer = 0;
        this.SYSTEM_OPTION_LANGUAGE = indexer++;
        this.SYSTEM_OPTION_AUTOMATIC_TIMESTEP = indexer++;
        this.SYSTEM_OPTION_SHORTCUT_HINTS = indexer++;
        this.SYSTEM_OPTION_STRETCH_WINDOW = indexer++;
        this.LANGUAGES = ['English', 'Spanish', 'French', 'Italian', 'Dutch', 'Russian', 'German', 'Indonesian'];
        indexer = 0;
        this.LANGUAGE_INDEX_ENGLISH = indexer++;
        this.LANGUAGE_INDEX_SPANISH = indexer++;
        this.LANGUAGE_INDEX_FRENCH = indexer++;
        this.LANGUAGE_INDEX_ITALIAN = indexer++;
        this.LANGUAGE_INDEX_DUTCH = indexer++;
        this.LANGUAGE_INDEX_RUSSIAN = indexer++;
        this.LANGUAGE_INDEX_GERMAN = indexer++;
        this.LANGUAGE_INDEX_INDONESIAN = indexer++;
        this.PICTURE_ZOOM = this.ZOOM_MAX;
        this.PICTURE_REQUEST_MAX_TIME = 5;
        this.CANVAS_DRAW_REQUEST_COUNTER_MAX = 5;
        this.CANVAS_REDRAW_MAX = 5;
        this.PACKET_DIVIDER = '#DIVIDER#';
        this.WIRE_DIVIDER = '#WIRE#';
        this.ID_DIVIDER = '#ID#';
        this.VERSION_DIVIDER = '#VERSION#';
        this.PI_DIV_2 = Math.PI * 0.5;
        this.PI_DIV_4 = Math.PI * 0.25;
        this.PI_MUL_3_DIV_4 = Math.PI * 0.75;
        this.PI_DIV_6 = Math.PI / 6;
        this.PI_DIV_12 = Math.PI / 12;
        this.PI_DIV_180 = Math.PI / 180;
        this.NEG_PI_DIV_180 = -Math.PI / 180;
        this._180_DIV_PI = 180 / Math.PI;
        this.PI_MUL_2 = Math.PI * 2;
        this.TRIG_TABLE_Q_NUMBER = 12;
        this.TRIG_SINE_TABLE = [];
        this.TRIG_TABLE_SIZE = Math.round(Math.pow(2, this.TRIG_TABLE_Q_NUMBER));
        this.TRIG_TABLE_SCALE_CONSTANT = 2.0 / this.TRIG_TABLE_SIZE;
        this.TRIG_TABLE_INDEX_CONSTANT = (this.TRIG_TABLE_SIZE * 0.5) / Math.PI;
        this.TRIG_TABLE_MASK = this.TRIG_TABLE_SIZE - 1;
        this.TRIG_TABLE_ROUND = this.TRIG_TABLE_SIZE * 0.25;
        for (var i = 0; i < this.TRIG_TABLE_SIZE; i++) {
            this.TRIG_SINE_TABLE.push(Math.sin(i * Math.PI * this.TRIG_TABLE_SCALE_CONSTANT));
        }
        this.MAX_TEXT_LENGTH = 30;
        this.ALPHA_ARRAY = [];
        for (var i = 0; i <= 256; i++) {
            this.ALPHA_ARRAY.push(i / 256.0);
        }
        this.GARBAGE_COLLECTOR_SIZE = 16;
        this.SINE_WAVE_STYLE_0 = 0;
        this.SINE_WAVE_STYLE_1 = 1;
        this.METER_STYLE_0 = 0;
        this.METER_STYLE_1 = 1;
        this.METER_SYMBOL_VOLTAGE = 0;
        this.METER_SYMBOL_CURRENT = 1;
        this.METER_SYMBOL_RESISTANCE = 2;
        this.METER_SYMBOL_POWER = 3;
    }
}
