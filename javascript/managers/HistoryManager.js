'use strict';
class HistoryManager {
    constructor() {
        this.history = [];
        this.history_index = -1;
    }
    watch() {
        if (global.HISTORY_MANAGER['packet'].length > 0) {
            this.push(global.HISTORY_MANAGER['packet'][0]);
            global.HISTORY_MANAGER['packet'].splice(0, 1);
        }
    }
    push(packet) {
        if (!global.signal_add_element && !global.signal_history_lock) {
            if (this.history.length > 0) {
                let last_history_index = this.history.length - 1;
                if (this.history[last_history_index] !== packet) {
                    if (this.history_index > -1) {
                        this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                    }
                    this.history.push(packet);
                    this.history_index = this.history.length - 1;
                }
            }
            else {
                if (this.history_index > -1) {
                    this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                }
                this.history.push(packet);
                this.history_index = this.history.length - 1;
            }
        }
    }
    undo() {
        if (this.history_index > 0) {
            this.history_index--;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    }
    redo() {
        if (this.history_index < this.history.length - 1) {
            this.history_index++;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    }
    clear() {
        this.history.splice(0, this.history.length);
    }
}
