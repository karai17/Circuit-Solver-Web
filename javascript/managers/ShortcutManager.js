'use strict';
class ShortcutManager {
    constructor() {
        this.SHORTCUT_COPY = global.KEY_CODES.KEY_CODE_C;
        this.SHORTCUT_PASTE = global.KEY_CODES.KEY_CODE_V;
        this.SHORTCUT_UNDO = global.KEY_CODES.KEY_CODE_Z;
        this.SHORTCUT_ADD_ELEMENT = global.KEY_CODES.KEY_CODE_N;
        this.SHORTCUT_REDO = global.KEY_CODES.KEY_CODE_Y;
        this.SHORTCUT_SAVE_IMAGE = global.KEY_CODES.KEY_CODE_I;
        this.SHORTCUT_SAVE_CIRCUIT = global.KEY_CODES.KEY_CODE_S;
        this.SHORTCUT_ROTATE = global.KEY_CODES.KEY_CODE_R;
        this.SHORTCUT_DELETE = global.KEY_CODES.KEY_CODE_DELETE;
        this.SHORTCUT_FLIP = global.KEY_CODES.KEY_CODE_F;
        this.SHORTCUT_EDIT = global.KEY_CODES.KEY_CODE_E;
        this.SHORTCUT_REMOVE_ALL = global.KEY_CODES.KEY_CODE_X;
        this.SHORTCUT_SIMULATE = global.KEY_CODES.KEY_CODE_A;
        this.SHORTCUT_QUERY = global.KEY_CODES.KEY_CODE_Q;
        this.SHORTCUT_RESET_WINDOW = global.KEY_CODES.KEY_CODE_M;
        this.SHORTCUT_TOGGLE_SWITCH = global.KEY_CODES.KEY_CODE_SPACE;
        this.SHORTCUT_EXPORT = global.KEY_CODES.KEY_CODE_P;
        this.SHORTCUT_TAB = global.KEY_CODES.KEY_CODE_TAB;
        this.SHORTCUT_ENTER = global.KEY_CODES.KEY_CODE_ENTER;
        this.OPTION_ENABLE_ARROW_KEYS = true;
        this.multi_moved_element = false;
        this.multi_deleted_element = false;
        this.temp_history_snapshot = '';
        this.command = '';
        this.shift = false;
        this.caps = false;
    }
    listen(key_event) {
        if (!MOBILE_MODE) {
            if (!global.flags.flag_save_image &&
                !global.flags.flag_save_circuit &&
                !global.flags.flag_zoom &&
                !global.flags.flag_element_options &&
                !global.flags.flag_element_options_edit &&
                !global.flags.flag_select_element &&
                !global.flags.flag_select_timestep &&
                !global.flags.flag_select_settings &&
                !global.flags.flag_remove_all) {
                if (!global.flags.flag_graph) {
                    if (!global.flags.flag_simulating && !global.flags.flag_menu_element_toolbox) {
                        this.handle_rotate_shortcut(key_event);
                        this.handle_delete_shortcut(key_event);
                        this.handle_undo_shortcut(key_event);
                        this.handle_redo_shortcut(key_event);
                        this.handle_flip_shortcut(key_event);
                        this.handle_edit_shortcut(key_event);
                        this.handle_remove_all_shortcut(key_event);
                        this.handle_copy_shortcut(key_event);
                        this.handle_paste_shortcut(key_event);
                        this.handle_add_element_flag(key_event);
                        this.handle_escape_shortcut(key_event);
                        this.handle_select_all(key_event);
                        if (this.OPTION_ENABLE_ARROW_KEYS) {
                            this.handle_arrow_keys_multi_select(key_event);
                            this.handle_arrow_keys_select(key_event);
                        }
                    }
                    else if (!global.flags.flag_simulating) {
                        if (!global.flags.flag_add_element) {
                            this.handle_add_element_flag(key_event);
                        }
                        else {
                            this.handle_escape_shortcut(key_event);
                            this.handle_flip_shortcut(key_event);
                            this.handle_rotate_shortcut(key_event);
                        }
                    }
                    else if (global.flags.flag_simulating && !global.flags.flag_menu_element_toolbox) {
                        this.handle_edit_shortcut(key_event);
                        this.handle_toggle_switches(key_event);
                        this.handle_query_shortcut(key_event);
                    }
                    if (this.OPTION_ENABLE_ARROW_KEYS) {
                        this.handle_arrow_keys_menu_open_down(key_event);
                    }
                }
                if (!global.flags.flag_menu_element_toolbox) {
                    this.handle_simulate_shortcut(key_event);
                }
            }
            this.handle_tab_indexing(key_event);
            if (!global.flags.flag_save_image && !global.flags.flag_save_circuit && !global.flags.flag_element_options_edit && !global.flags.flag_select_timestep) {
                this.handle_reset_window_shortcut(key_event);
            }
            if (!global.flags.flag_save_image &&
                !global.flags.flag_save_circuit &&
                !global.flags.flag_zoom &&
                !global.flags.flag_element_options &&
                !global.flags.flag_element_options_edit &&
                !global.flags.flag_graph &&
                !global.flags.flag_select_element &&
                !global.flags.flag_select_timestep &&
                !global.flags.flag_select_settings &&
                !global.flags.flag_remove_all &&
                !global.flags.flag_menu_element_toolbox) {
                this.handle_save_image_flag(key_event);
                this.handle_save_circuit_flag(key_event);
                this.handle_file_export(key_event);
            }
        }
    }
    handle_tab_indexing(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_TAB && key_event['ctrl'] === false) {
            /* Quick testing for tab capability. */
            if (global.flags.flag_remove_all) {
                confirm_window.handle_tab();
            }
        }
        else if (this.command === this.SHORTCUT_ENTER && key_event['ctrl'] === false) {
            /* Quick testing for tab capability. */
            if (global.flags.flag_remove_all) {
                confirm_window.handle_enter();
            }
        }
    }
    handle_file_export(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_EXPORT && key_event['ctrl'] === true) {
            let packet = [];
            let indexer = 0;
            packet[indexer++] = global.CONSTANTS.VERSION_TAG;
            packet[indexer++] = global.CONSTANTS.VERSION_DIVIDER + '\r\n';
            /* #INSERT_GENERATE_ELEMENT_EXPORT_SHORTCUT# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            for (var i = resistors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + resistors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(resistors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(resistors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = capacitors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + capacitors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(capacitors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(capacitors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = inductors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + inductors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(inductors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(inductors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = grounds.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + grounds[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(grounds[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(grounds[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = dcsources.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + dcsources[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dcsources[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dcsources[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = dccurrents.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + dccurrents[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dccurrents[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dccurrents[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = acsources.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + acsources[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(acsources[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(acsources[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = accurrents.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + accurrents[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(accurrents[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(accurrents[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = squarewaves.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + squarewaves[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(squarewaves[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(squarewaves[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = sawwaves.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + sawwaves[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(sawwaves[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(sawwaves[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = trianglewaves.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + trianglewaves[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(trianglewaves[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(trianglewaves[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = constants.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + constants[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(constants[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(constants[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = nets.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + nets[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nets[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nets[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = notes.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + notes[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(notes[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(notes[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = rails.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + rails[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(rails[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(rails[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = voltmeters.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + voltmeters[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(voltmeters[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(voltmeters[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = ohmmeters.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + ohmmeters[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ohmmeters[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ohmmeters[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = ammeters.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + ammeters[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ammeters[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ammeters[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = wattmeters.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + wattmeters[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(wattmeters[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(wattmeters[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = fuses.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + fuses[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(fuses[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(fuses[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = spsts.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + spsts[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(spsts[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(spsts[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = spdts.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + spdts[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(spdts[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(spdts[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = nots.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + nots[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nots[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nots[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = diodes.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + diodes[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(diodes[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(diodes[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = leds.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + leds[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(leds[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(leds[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = zeners.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + zeners[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(zeners[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(zeners[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = potentiometers.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + potentiometers[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(potentiometers[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(potentiometers[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = ands.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + ands[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ands[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ands[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = ors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + ors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = nands.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + nands[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nands[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nands[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = nors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + nors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = xors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + xors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(xors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(xors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = xnors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + xnors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(xnors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(xnors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = dffs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + dffs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dffs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dffs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vsats.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vsats[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vsats[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vsats[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = adders.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + adders[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(adders[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(adders[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = subtractors.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + subtractors[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(subtractors[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(subtractors[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = multipliers.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + multipliers[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(multipliers[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(multipliers[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = dividers.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + dividers[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dividers[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dividers[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = gains.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + gains[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(gains[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(gains[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = absvals.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + absvals[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(absvals[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(absvals[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vcsws.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vcsws[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcsws[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcsws[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vcvss.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vcvss[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcvss[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcvss[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vccss.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vccss[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vccss[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vccss[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = cccss.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + cccss[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(cccss[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(cccss[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = ccvss.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + ccvss[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ccvss[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(ccvss[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = opamps.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + opamps[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(opamps[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(opamps[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = nmosfets.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + nmosfets[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nmosfets[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(nmosfets[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = pmosfets.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + pmosfets[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pmosfets[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pmosfets[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = npns.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + npns[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(npns[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(npns[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = pnps.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + pnps[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pnps[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pnps[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = adcs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + adcs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(adcs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(adcs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = dacs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + dacs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dacs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(dacs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = sandhs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + sandhs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(sandhs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(sandhs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = pwms.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + pwms[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pwms[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pwms[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = integrators.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + integrators[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(integrators[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(integrators[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = differentiators.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + differentiators[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(differentiators[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(differentiators[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = lowpasses.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + lowpasses[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(lowpasses[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(lowpasses[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = highpasses.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + highpasses[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(highpasses[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(highpasses[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = relays.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + relays[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(relays[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(relays[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = pids.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + pids[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pids[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(pids[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = luts.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + luts[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(luts[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(luts[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vcrs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vcrs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcrs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcrs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vccas.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vccas[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vccas[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vccas[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = vcls.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + vcls[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcls[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(vcls[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = grts.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + grts[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(grts[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(grts[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = tptzs.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + tptzs[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(tptzs[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(tptzs[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            for (var i = transformers.length - 1; i > -1; i--) {
                packet[indexer++] = '"ref_id":' + transformers[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(transformers[i].elm.properties);
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = JSON.stringify(transformers[i].wire_reference);
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
            for (var i = 0; i < wires.length; i++) {
                packet[indexer++] = '"ref_id":' + wires[i].elm.id;
                packet[indexer++] = global.CONSTANTS.ID_DIVIDER + '\r\n';
                packet[indexer++] = wires[i].elm.n1 + ', ' + wires[i].elm.n2;
                packet[indexer++] = global.CONSTANTS.WIRE_DIVIDER + '\r\n';
                packet[indexer++] = '<WIRE>';
                packet[indexer++] = global.CONSTANTS.PACKET_DIVIDER + '\r\n';
            }
            engine_functions.save_file(global.variables.user_file.title + '_nl.txt', packet.join(''));
            packet.splice(0, packet.length);
        }
    }
    handle_select_all(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_SIMULATE && key_event['ctrl'] === true) {
            global.variables.selected_id = global.CONSTANTS.NULL;
            global.variables.selected_type = -1;
            global.variables.selected_bounds = global.CONSTANTS.NULL;
            global.variables.selected_properties = global.CONSTANTS.NULL;
            global.variables.selected_wire_style = global.CONSTANTS.NULL;
            global.variables.selected = false;
            global.variables.multi_selected = true;
            /* #INSERT_GENERATE_MULTI_SELECT_ELEMENTS_SHORTCUT# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            for (var i = resistors.length - 1; i > -1; i--) {
                resistors[i].multi_selected = true;
            }
            for (var i = capacitors.length - 1; i > -1; i--) {
                capacitors[i].multi_selected = true;
            }
            for (var i = inductors.length - 1; i > -1; i--) {
                inductors[i].multi_selected = true;
            }
            for (var i = grounds.length - 1; i > -1; i--) {
                grounds[i].multi_selected = true;
            }
            for (var i = dcsources.length - 1; i > -1; i--) {
                dcsources[i].multi_selected = true;
            }
            for (var i = dccurrents.length - 1; i > -1; i--) {
                dccurrents[i].multi_selected = true;
            }
            for (var i = acsources.length - 1; i > -1; i--) {
                acsources[i].multi_selected = true;
            }
            for (var i = accurrents.length - 1; i > -1; i--) {
                accurrents[i].multi_selected = true;
            }
            for (var i = squarewaves.length - 1; i > -1; i--) {
                squarewaves[i].multi_selected = true;
            }
            for (var i = sawwaves.length - 1; i > -1; i--) {
                sawwaves[i].multi_selected = true;
            }
            for (var i = trianglewaves.length - 1; i > -1; i--) {
                trianglewaves[i].multi_selected = true;
            }
            for (var i = constants.length - 1; i > -1; i--) {
                constants[i].multi_selected = true;
            }
            for (var i = wires.length - 1; i > -1; i--) {
                wires[i].multi_selected = true;
            }
            for (var i = nets.length - 1; i > -1; i--) {
                nets[i].multi_selected = true;
            }
            for (var i = notes.length - 1; i > -1; i--) {
                notes[i].multi_selected = true;
            }
            for (var i = rails.length - 1; i > -1; i--) {
                rails[i].multi_selected = true;
            }
            for (var i = voltmeters.length - 1; i > -1; i--) {
                voltmeters[i].multi_selected = true;
            }
            for (var i = ohmmeters.length - 1; i > -1; i--) {
                ohmmeters[i].multi_selected = true;
            }
            for (var i = ammeters.length - 1; i > -1; i--) {
                ammeters[i].multi_selected = true;
            }
            for (var i = wattmeters.length - 1; i > -1; i--) {
                wattmeters[i].multi_selected = true;
            }
            for (var i = fuses.length - 1; i > -1; i--) {
                fuses[i].multi_selected = true;
            }
            for (var i = spsts.length - 1; i > -1; i--) {
                spsts[i].multi_selected = true;
            }
            for (var i = spdts.length - 1; i > -1; i--) {
                spdts[i].multi_selected = true;
            }
            for (var i = nots.length - 1; i > -1; i--) {
                nots[i].multi_selected = true;
            }
            for (var i = diodes.length - 1; i > -1; i--) {
                diodes[i].multi_selected = true;
            }
            for (var i = leds.length - 1; i > -1; i--) {
                leds[i].multi_selected = true;
            }
            for (var i = zeners.length - 1; i > -1; i--) {
                zeners[i].multi_selected = true;
            }
            for (var i = potentiometers.length - 1; i > -1; i--) {
                potentiometers[i].multi_selected = true;
            }
            for (var i = ands.length - 1; i > -1; i--) {
                ands[i].multi_selected = true;
            }
            for (var i = ors.length - 1; i > -1; i--) {
                ors[i].multi_selected = true;
            }
            for (var i = nands.length - 1; i > -1; i--) {
                nands[i].multi_selected = true;
            }
            for (var i = nors.length - 1; i > -1; i--) {
                nors[i].multi_selected = true;
            }
            for (var i = xors.length - 1; i > -1; i--) {
                xors[i].multi_selected = true;
            }
            for (var i = xnors.length - 1; i > -1; i--) {
                xnors[i].multi_selected = true;
            }
            for (var i = dffs.length - 1; i > -1; i--) {
                dffs[i].multi_selected = true;
            }
            for (var i = vsats.length - 1; i > -1; i--) {
                vsats[i].multi_selected = true;
            }
            for (var i = adders.length - 1; i > -1; i--) {
                adders[i].multi_selected = true;
            }
            for (var i = subtractors.length - 1; i > -1; i--) {
                subtractors[i].multi_selected = true;
            }
            for (var i = multipliers.length - 1; i > -1; i--) {
                multipliers[i].multi_selected = true;
            }
            for (var i = dividers.length - 1; i > -1; i--) {
                dividers[i].multi_selected = true;
            }
            for (var i = gains.length - 1; i > -1; i--) {
                gains[i].multi_selected = true;
            }
            for (var i = absvals.length - 1; i > -1; i--) {
                absvals[i].multi_selected = true;
            }
            for (var i = vcsws.length - 1; i > -1; i--) {
                vcsws[i].multi_selected = true;
            }
            for (var i = vcvss.length - 1; i > -1; i--) {
                vcvss[i].multi_selected = true;
            }
            for (var i = vccss.length - 1; i > -1; i--) {
                vccss[i].multi_selected = true;
            }
            for (var i = cccss.length - 1; i > -1; i--) {
                cccss[i].multi_selected = true;
            }
            for (var i = ccvss.length - 1; i > -1; i--) {
                ccvss[i].multi_selected = true;
            }
            for (var i = opamps.length - 1; i > -1; i--) {
                opamps[i].multi_selected = true;
            }
            for (var i = nmosfets.length - 1; i > -1; i--) {
                nmosfets[i].multi_selected = true;
            }
            for (var i = pmosfets.length - 1; i > -1; i--) {
                pmosfets[i].multi_selected = true;
            }
            for (var i = npns.length - 1; i > -1; i--) {
                npns[i].multi_selected = true;
            }
            for (var i = pnps.length - 1; i > -1; i--) {
                pnps[i].multi_selected = true;
            }
            for (var i = adcs.length - 1; i > -1; i--) {
                adcs[i].multi_selected = true;
            }
            for (var i = dacs.length - 1; i > -1; i--) {
                dacs[i].multi_selected = true;
            }
            for (var i = sandhs.length - 1; i > -1; i--) {
                sandhs[i].multi_selected = true;
            }
            for (var i = pwms.length - 1; i > -1; i--) {
                pwms[i].multi_selected = true;
            }
            for (var i = integrators.length - 1; i > -1; i--) {
                integrators[i].multi_selected = true;
            }
            for (var i = differentiators.length - 1; i > -1; i--) {
                differentiators[i].multi_selected = true;
            }
            for (var i = lowpasses.length - 1; i > -1; i--) {
                lowpasses[i].multi_selected = true;
            }
            for (var i = highpasses.length - 1; i > -1; i--) {
                highpasses[i].multi_selected = true;
            }
            for (var i = relays.length - 1; i > -1; i--) {
                relays[i].multi_selected = true;
            }
            for (var i = pids.length - 1; i > -1; i--) {
                pids[i].multi_selected = true;
            }
            for (var i = luts.length - 1; i > -1; i--) {
                luts[i].multi_selected = true;
            }
            for (var i = vcrs.length - 1; i > -1; i--) {
                vcrs[i].multi_selected = true;
            }
            for (var i = vccas.length - 1; i > -1; i--) {
                vccas[i].multi_selected = true;
            }
            for (var i = vcls.length - 1; i > -1; i--) {
                vcls[i].multi_selected = true;
            }
            for (var i = grts.length - 1; i > -1; i--) {
                grts[i].multi_selected = true;
            }
            for (var i = tptzs.length - 1; i > -1; i--) {
                tptzs[i].multi_selected = true;
            }
            for (var i = transformers.length - 1; i > -1; i--) {
                transformers[i].multi_selected = true;
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
    }
    handle_toggle_switches(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (key_event['event'].code === this.SHORTCUT_TOGGLE_SWITCH) {
            if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
                let index = engine_functions.get_spst(global.variables.selected_id);
                if (index > -1 && index < spsts.length) {
                    if (spsts[index].elm.properties['Switch State'] === global.CONSTANTS.ON) {
                        spsts[index].elm.properties['Switch State'] = global.CONSTANTS.OFF;
                    }
                    else if (spsts[index].elm.properties['Switch State'] === global.CONSTANTS.OFF) {
                        spsts[index].elm.properties['Switch State'] = global.CONSTANTS.ON;
                    }
                    global.variables.selected_properties['Switch State'] = spsts[index].elm.properties['Switch State'];
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                let index = engine_functions.get_spdt(global.variables.selected_id);
                if (index > -1 && index < spdts.length) {
                    if (spdts[index].elm.properties['Switch State'] === global.CONSTANTS.ON) {
                        spdts[index].elm.properties['Switch State'] = global.CONSTANTS.OFF;
                    }
                    else if (spdts[index].elm.properties['Switch State'] === global.CONSTANTS.OFF) {
                        spdts[index].elm.properties['Switch State'] = global.CONSTANTS.ON;
                    }
                    global.variables.selected_properties['Switch State'] = spdts[index].elm.properties['Switch State'];
                }
            }
        }
    }
    handle_escape_shortcut(key_event) {
        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
            if (global.flags.flag_history_lock && this.temp_history_snapshot !== '') {
                engine_functions.parse_elements(this.temp_history_snapshot);
                this.temp_history_snapshot = '';
                global.flags.flag_history_lock = false;
                if (global.flags.flag_add_element) {
                    global.flags.flag_add_element = false;
                    menu_bar.escape_interrupt = true;
                    menu_bar.mouse_move();
                }
            }
        }
    }
    handle_add_element_flag(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_ADD_ELEMENT) {
            if (!global.flags.flag_menu_open) {
                menu_bar.handle_menu_open_flag(!global.flags.flag_menu_open);
            }
            menu_bar.handle_menu_open_down_flag(!global.flags.flag_menu_element_toolbox);
        }
    }
    handle_arrow_keys_menu_open_down(key_event) {
        if (global.flags.flag_menu_element_toolbox) {
            if (!global.variables.focused) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT ||
                    key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT ||
                    key_event['event'].code === global.KEY_CODES.KEY_CODE_END ||
                    key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
                    if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                        let temp_x = global.variables.mouse_x;
                        let temp_y = global.variables.mouse_y;
                        global.variables.mouse_x = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_BACK_INDEX].get_center_x();
                        global.variables.mouse_y = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_BACK_INDEX].get_center_y();
                        menu_bar.element_window.mouse_down();
                        menu_bar.element_window.mouse_up();
                        global.variables.mouse_x = temp_x;
                        global.variables.mouse_y = temp_y;
                    }
                    else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                        let temp_x = global.variables.mouse_x;
                        let temp_y = global.variables.mouse_y;
                        global.variables.mouse_x = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_FORWARD_INDEX].get_center_x();
                        global.variables.mouse_y = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_FORWARD_INDEX].get_center_y();
                        menu_bar.element_window.mouse_down();
                        menu_bar.element_window.mouse_up();
                        global.variables.mouse_x = temp_x;
                        global.variables.mouse_y = temp_y;
                    }
                    else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_END) {
                        menu_bar.element_window.page_number = menu_bar.element_window.MAX_PAGE_NUMBER;
                    }
                    else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
                        menu_bar.element_window.page_number = 0;
                    }
                }
            }
        }
    }
    handle_arrow_keys_select(key_event) {
        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
            global.flags.flag_build_element = true;
            if (global.variables.selected) {
                /* #INSERT_GENERATE_HANDLE_SELECT_ELEMENTS_MOVE# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                    var index = engine_functions.get_resistor(global.variables.selected_id);
                    if (index > -1 && index < resistors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            resistors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            resistors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            resistors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            resistors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                    var index = engine_functions.get_capacitor(global.variables.selected_id);
                    if (index > -1 && index < capacitors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            capacitors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            capacitors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            capacitors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            capacitors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                    var index = engine_functions.get_inductor(global.variables.selected_id);
                    if (index > -1 && index < inductors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            inductors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            inductors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            inductors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            inductors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                    var index = engine_functions.get_ground(global.variables.selected_id);
                    if (index > -1 && index < grounds.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            grounds[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            grounds[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            grounds[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            grounds[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                    var index = engine_functions.get_dcsource(global.variables.selected_id);
                    if (index > -1 && index < dcsources.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            dcsources[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            dcsources[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            dcsources[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            dcsources[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                    var index = engine_functions.get_dccurrent(global.variables.selected_id);
                    if (index > -1 && index < dccurrents.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            dccurrents[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            dccurrents[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            dccurrents[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            dccurrents[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                    var index = engine_functions.get_acsource(global.variables.selected_id);
                    if (index > -1 && index < acsources.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            acsources[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            acsources[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            acsources[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            acsources[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                    var index = engine_functions.get_accurrent(global.variables.selected_id);
                    if (index > -1 && index < accurrents.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            accurrents[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            accurrents[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            accurrents[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            accurrents[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                    var index = engine_functions.get_squarewave(global.variables.selected_id);
                    if (index > -1 && index < squarewaves.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            squarewaves[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            squarewaves[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            squarewaves[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            squarewaves[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
                    var index = engine_functions.get_sawwave(global.variables.selected_id);
                    if (index > -1 && index < sawwaves.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            sawwaves[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            sawwaves[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            sawwaves[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            sawwaves[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
                    var index = engine_functions.get_trianglewave(global.variables.selected_id);
                    if (index > -1 && index < trianglewaves.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            trianglewaves[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            trianglewaves[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            trianglewaves[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            trianglewaves[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                    var index = engine_functions.get_constant(global.variables.selected_id);
                    if (index > -1 && index < constants.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            constants[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            constants[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            constants[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            constants[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
                    var index = engine_functions.get_net(global.variables.selected_id);
                    if (index > -1 && index < nets.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            nets[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            nets[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            nets[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            nets[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                    var index = engine_functions.get_note(global.variables.selected_id);
                    if (index > -1 && index < notes.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            notes[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            notes[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            notes[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            notes[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                    var index = engine_functions.get_rail(global.variables.selected_id);
                    if (index > -1 && index < rails.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            rails[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            rails[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            rails[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            rails[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                    var index = engine_functions.get_voltmeter(global.variables.selected_id);
                    if (index > -1 && index < voltmeters.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            voltmeters[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            voltmeters[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            voltmeters[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            voltmeters[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                    var index = engine_functions.get_ohmmeter(global.variables.selected_id);
                    if (index > -1 && index < ohmmeters.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            ohmmeters[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            ohmmeters[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            ohmmeters[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            ohmmeters[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                    var index = engine_functions.get_ammeter(global.variables.selected_id);
                    if (index > -1 && index < ammeters.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            ammeters[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            ammeters[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            ammeters[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            ammeters[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                    var index = engine_functions.get_wattmeter(global.variables.selected_id);
                    if (index > -1 && index < wattmeters.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            wattmeters[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            wattmeters[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            wattmeters[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            wattmeters[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                    var index = engine_functions.get_fuse(global.variables.selected_id);
                    if (index > -1 && index < fuses.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            fuses[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            fuses[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            fuses[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            fuses[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
                    var index = engine_functions.get_spst(global.variables.selected_id);
                    if (index > -1 && index < spsts.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            spsts[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            spsts[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            spsts[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            spsts[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                    var index = engine_functions.get_spdt(global.variables.selected_id);
                    if (index > -1 && index < spdts.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            spdts[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            spdts[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            spdts[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            spdts[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
                    var index = engine_functions.get_not(global.variables.selected_id);
                    if (index > -1 && index < nots.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            nots[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            nots[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            nots[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            nots[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                    var index = engine_functions.get_diode(global.variables.selected_id);
                    if (index > -1 && index < diodes.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            diodes[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            diodes[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            diodes[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            diodes[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
                    var index = engine_functions.get_led(global.variables.selected_id);
                    if (index > -1 && index < leds.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            leds[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            leds[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            leds[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            leds[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                    var index = engine_functions.get_zener(global.variables.selected_id);
                    if (index > -1 && index < zeners.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            zeners[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            zeners[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            zeners[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            zeners[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                    var index = engine_functions.get_potentiometer(global.variables.selected_id);
                    if (index > -1 && index < potentiometers.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            potentiometers[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            potentiometers[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            potentiometers[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            potentiometers[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
                    var index = engine_functions.get_and(global.variables.selected_id);
                    if (index > -1 && index < ands.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            ands[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            ands[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            ands[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            ands[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
                    var index = engine_functions.get_or(global.variables.selected_id);
                    if (index > -1 && index < ors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            ors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            ors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            ors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            ors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
                    var index = engine_functions.get_nand(global.variables.selected_id);
                    if (index > -1 && index < nands.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            nands[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            nands[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            nands[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            nands[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
                    var index = engine_functions.get_nor(global.variables.selected_id);
                    if (index > -1 && index < nors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            nors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            nors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            nors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            nors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
                    var index = engine_functions.get_xor(global.variables.selected_id);
                    if (index > -1 && index < xors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            xors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            xors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            xors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            xors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                    var index = engine_functions.get_xnor(global.variables.selected_id);
                    if (index > -1 && index < xnors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            xnors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            xnors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            xnors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            xnors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
                    var index = engine_functions.get_dff(global.variables.selected_id);
                    if (index > -1 && index < dffs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            dffs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            dffs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            dffs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            dffs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                    var index = engine_functions.get_vsat(global.variables.selected_id);
                    if (index > -1 && index < vsats.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vsats[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vsats[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vsats[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vsats[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
                    var index = engine_functions.get_adder(global.variables.selected_id);
                    if (index > -1 && index < adders.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            adders[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            adders[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            adders[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            adders[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
                    var index = engine_functions.get_subtractor(global.variables.selected_id);
                    if (index > -1 && index < subtractors.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            subtractors[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            subtractors[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            subtractors[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            subtractors[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
                    var index = engine_functions.get_multiplier(global.variables.selected_id);
                    if (index > -1 && index < multipliers.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            multipliers[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            multipliers[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            multipliers[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            multipliers[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
                    var index = engine_functions.get_divider(global.variables.selected_id);
                    if (index > -1 && index < dividers.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            dividers[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            dividers[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            dividers[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            dividers[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                    var index = engine_functions.get_gain(global.variables.selected_id);
                    if (index > -1 && index < gains.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            gains[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            gains[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            gains[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            gains[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
                    var index = engine_functions.get_absval(global.variables.selected_id);
                    if (index > -1 && index < absvals.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            absvals[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            absvals[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            absvals[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            absvals[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                    var index = engine_functions.get_vcsw(global.variables.selected_id);
                    if (index > -1 && index < vcsws.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vcsws[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vcsws[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vcsws[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vcsws[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                    var index = engine_functions.get_vcvs(global.variables.selected_id);
                    if (index > -1 && index < vcvss.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vcvss[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vcvss[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vcvss[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vcvss[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                    var index = engine_functions.get_vccs(global.variables.selected_id);
                    if (index > -1 && index < vccss.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vccss[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vccss[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vccss[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vccss[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                    var index = engine_functions.get_cccs(global.variables.selected_id);
                    if (index > -1 && index < cccss.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            cccss[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            cccss[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            cccss[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            cccss[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                    var index = engine_functions.get_ccvs(global.variables.selected_id);
                    if (index > -1 && index < ccvss.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            ccvss[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            ccvss[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            ccvss[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            ccvss[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                    var index = engine_functions.get_opamp(global.variables.selected_id);
                    if (index > -1 && index < opamps.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            opamps[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            opamps[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            opamps[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            opamps[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                    var index = engine_functions.get_nmosfet(global.variables.selected_id);
                    if (index > -1 && index < nmosfets.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            nmosfets[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            nmosfets[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            nmosfets[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            nmosfets[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                    var index = engine_functions.get_pmosfet(global.variables.selected_id);
                    if (index > -1 && index < pmosfets.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            pmosfets[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            pmosfets[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            pmosfets[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            pmosfets[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
                    var index = engine_functions.get_npn(global.variables.selected_id);
                    if (index > -1 && index < npns.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            npns[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            npns[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            npns[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            npns[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
                    var index = engine_functions.get_pnp(global.variables.selected_id);
                    if (index > -1 && index < pnps.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            pnps[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            pnps[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            pnps[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            pnps[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
                    var index = engine_functions.get_adc(global.variables.selected_id);
                    if (index > -1 && index < adcs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            adcs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            adcs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            adcs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            adcs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
                    var index = engine_functions.get_dac(global.variables.selected_id);
                    if (index > -1 && index < dacs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            dacs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            dacs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            dacs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            dacs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
                    var index = engine_functions.get_samplers(global.variables.selected_id);
                    if (index > -1 && index < sandhs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            sandhs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            sandhs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            sandhs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            sandhs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
                    var index = engine_functions.get_pwm(global.variables.selected_id);
                    if (index > -1 && index < pwms.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            pwms[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            pwms[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            pwms[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            pwms[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                    var index = engine_functions.get_integrator(global.variables.selected_id);
                    if (index > -1 && index < integrators.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            integrators[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            integrators[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            integrators[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            integrators[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                    var index = engine_functions.get_differentiator(global.variables.selected_id);
                    if (index > -1 && index < differentiators.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            differentiators[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            differentiators[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            differentiators[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            differentiators[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
                    var index = engine_functions.get_lowpass(global.variables.selected_id);
                    if (index > -1 && index < lowpasses.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            lowpasses[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            lowpasses[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            lowpasses[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            lowpasses[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
                    var index = engine_functions.get_highpass(global.variables.selected_id);
                    if (index > -1 && index < highpasses.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            highpasses[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            highpasses[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            highpasses[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            highpasses[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
                    var index = engine_functions.get_relay(global.variables.selected_id);
                    if (index > -1 && index < relays.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            relays[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            relays[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            relays[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            relays[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
                    var index = engine_functions.get_pid(global.variables.selected_id);
                    if (index > -1 && index < pids.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            pids[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            pids[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            pids[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            pids[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
                    var index = engine_functions.get_lut(global.variables.selected_id);
                    if (index > -1 && index < luts.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            luts[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            luts[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            luts[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            luts[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
                    var index = engine_functions.get_vcr(global.variables.selected_id);
                    if (index > -1 && index < vcrs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vcrs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vcrs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vcrs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vcrs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                    var index = engine_functions.get_vcca(global.variables.selected_id);
                    if (index > -1 && index < vccas.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vccas[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vccas[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vccas[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vccas[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
                    var index = engine_functions.get_vcl(global.variables.selected_id);
                    if (index > -1 && index < vcls.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            vcls[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            vcls[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            vcls[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            vcls[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
                    var index = engine_functions.get_grt(global.variables.selected_id);
                    if (index > -1 && index < grts.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            grts[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            grts[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            grts[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            grts[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                    var index = engine_functions.get_tptz(global.variables.selected_id);
                    if (index > -1 && index < tptzs.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            tptzs[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            tptzs[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            tptzs[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            tptzs[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                    var index = engine_functions.get_transformer(global.variables.selected_id);
                    if (index > -1 && index < transformers.length) {
                        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                            transformers[index].move_element(0, -global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                            transformers[index].move_element(0, global.variables.node_space_y);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                            transformers[index].move_element(-global.variables.node_space_x, 0);
                        }
                        else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                            transformers[index].move_element(global.variables.node_space_x, 0);
                        }
                    }
                }
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
    }
    /* Look at where this is called, it could be that the selected_components_bounds is reset to max when it's called <_< */
    handle_arrow_keys_multi_select(key_event) {
        if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT ||
            key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
            global.flags.flag_build_element = true;
            this.multi_moved_element = false;
            let elm_max = global.utils.element_max();
            for (var i = 0; i < elm_max; i++) {
                /* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE_CALL# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.handle_move_resistors(i, key_event);
                this.handle_move_capacitors(i, key_event);
                this.handle_move_inductors(i, key_event);
                this.handle_move_grounds(i, key_event);
                this.handle_move_dcsources(i, key_event);
                this.handle_move_dccurrents(i, key_event);
                this.handle_move_acsources(i, key_event);
                this.handle_move_accurrents(i, key_event);
                this.handle_move_squarewaves(i, key_event);
                this.handle_move_sawwaves(i, key_event);
                this.handle_move_trianglewaves(i, key_event);
                this.handle_move_constants(i, key_event);
                this.handle_move_wires(i, key_event);
                this.handle_move_nets(i, key_event);
                this.handle_move_notes(i, key_event);
                this.handle_move_rails(i, key_event);
                this.handle_move_voltmeters(i, key_event);
                this.handle_move_ohmmeters(i, key_event);
                this.handle_move_ammeters(i, key_event);
                this.handle_move_wattmeters(i, key_event);
                this.handle_move_fuses(i, key_event);
                this.handle_move_spsts(i, key_event);
                this.handle_move_spdts(i, key_event);
                this.handle_move_nots(i, key_event);
                this.handle_move_diodes(i, key_event);
                this.handle_move_leds(i, key_event);
                this.handle_move_zeners(i, key_event);
                this.handle_move_potentiometers(i, key_event);
                this.handle_move_ands(i, key_event);
                this.handle_move_ors(i, key_event);
                this.handle_move_nands(i, key_event);
                this.handle_move_nors(i, key_event);
                this.handle_move_xors(i, key_event);
                this.handle_move_xnors(i, key_event);
                this.handle_move_dffs(i, key_event);
                this.handle_move_vsats(i, key_event);
                this.handle_move_adders(i, key_event);
                this.handle_move_subtractors(i, key_event);
                this.handle_move_multipliers(i, key_event);
                this.handle_move_dividers(i, key_event);
                this.handle_move_gains(i, key_event);
                this.handle_move_absvals(i, key_event);
                this.handle_move_vcsws(i, key_event);
                this.handle_move_vcvss(i, key_event);
                this.handle_move_vccss(i, key_event);
                this.handle_move_cccss(i, key_event);
                this.handle_move_ccvss(i, key_event);
                this.handle_move_opamps(i, key_event);
                this.handle_move_nmosfets(i, key_event);
                this.handle_move_pmosfets(i, key_event);
                this.handle_move_npns(i, key_event);
                this.handle_move_pnps(i, key_event);
                this.handle_move_adcs(i, key_event);
                this.handle_move_dacs(i, key_event);
                this.handle_move_sandhs(i, key_event);
                this.handle_move_pwms(i, key_event);
                this.handle_move_integrators(i, key_event);
                this.handle_move_differentiators(i, key_event);
                this.handle_move_lowpasses(i, key_event);
                this.handle_move_highpasses(i, key_event);
                this.handle_move_relays(i, key_event);
                this.handle_move_pids(i, key_event);
                this.handle_move_luts(i, key_event);
                this.handle_move_vcrs(i, key_event);
                this.handle_move_vccas(i, key_event);
                this.handle_move_vcls(i, key_event);
                this.handle_move_grts(i, key_event);
                this.handle_move_tptzs(i, key_event);
                this.handle_move_transformers(i, key_event);
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
            if (this.multi_moved_element) {
                global.utils.push_history();
                this.multi_moved_element = false;
            }
        }
    }
    handle_delete_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (key_event['event'].code === this.SHORTCUT_DELETE) {
            if (!global.variables.multi_selected) {
                let index = -1;
                /* #INSERT_GENERATE_REMOVE_ELEMENTS_SHORTCUT# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                    index = engine_functions.get_resistor(global.variables.selected_id);
                    if (index > -1 && index < resistors.length) {
                        engine_functions.remove_resistor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                    index = engine_functions.get_capacitor(global.variables.selected_id);
                    if (index > -1 && index < capacitors.length) {
                        engine_functions.remove_capacitor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                    index = engine_functions.get_inductor(global.variables.selected_id);
                    if (index > -1 && index < inductors.length) {
                        engine_functions.remove_inductor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                    index = engine_functions.get_ground(global.variables.selected_id);
                    if (index > -1 && index < grounds.length) {
                        engine_functions.remove_ground(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                    index = engine_functions.get_dcsource(global.variables.selected_id);
                    if (index > -1 && index < dcsources.length) {
                        engine_functions.remove_dcsource(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                    index = engine_functions.get_dccurrent(global.variables.selected_id);
                    if (index > -1 && index < dccurrents.length) {
                        engine_functions.remove_dccurrent(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                    index = engine_functions.get_acsource(global.variables.selected_id);
                    if (index > -1 && index < acsources.length) {
                        engine_functions.remove_acsource(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                    index = engine_functions.get_accurrent(global.variables.selected_id);
                    if (index > -1 && index < accurrents.length) {
                        engine_functions.remove_accurrent(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                    index = engine_functions.get_squarewave(global.variables.selected_id);
                    if (index > -1 && index < squarewaves.length) {
                        engine_functions.remove_squarewave(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
                    index = engine_functions.get_sawwave(global.variables.selected_id);
                    if (index > -1 && index < sawwaves.length) {
                        engine_functions.remove_sawwave(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
                    index = engine_functions.get_trianglewave(global.variables.selected_id);
                    if (index > -1 && index < trianglewaves.length) {
                        engine_functions.remove_trianglewave(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                    index = engine_functions.get_constant(global.variables.selected_id);
                    if (index > -1 && index < constants.length) {
                        engine_functions.remove_constant(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
                    index = engine_functions.get_wire(global.variables.selected_id);
                    if (index > -1 && index < wires.length) {
                        engine_functions.remove_wire(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
                    index = engine_functions.get_net(global.variables.selected_id);
                    if (index > -1 && index < nets.length) {
                        engine_functions.remove_net(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                    index = engine_functions.get_note(global.variables.selected_id);
                    if (index > -1 && index < notes.length) {
                        engine_functions.remove_note(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                    index = engine_functions.get_rail(global.variables.selected_id);
                    if (index > -1 && index < rails.length) {
                        engine_functions.remove_rail(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                    index = engine_functions.get_voltmeter(global.variables.selected_id);
                    if (index > -1 && index < voltmeters.length) {
                        engine_functions.remove_voltmeter(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                    index = engine_functions.get_ohmmeter(global.variables.selected_id);
                    if (index > -1 && index < ohmmeters.length) {
                        engine_functions.remove_ohmmeter(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                    index = engine_functions.get_ammeter(global.variables.selected_id);
                    if (index > -1 && index < ammeters.length) {
                        engine_functions.remove_ammeter(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                    index = engine_functions.get_wattmeter(global.variables.selected_id);
                    if (index > -1 && index < wattmeters.length) {
                        engine_functions.remove_wattmeter(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                    index = engine_functions.get_fuse(global.variables.selected_id);
                    if (index > -1 && index < fuses.length) {
                        engine_functions.remove_fuse(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
                    index = engine_functions.get_spst(global.variables.selected_id);
                    if (index > -1 && index < spsts.length) {
                        engine_functions.remove_spst(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                    index = engine_functions.get_spdt(global.variables.selected_id);
                    if (index > -1 && index < spdts.length) {
                        engine_functions.remove_spdt(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
                    index = engine_functions.get_not(global.variables.selected_id);
                    if (index > -1 && index < nots.length) {
                        engine_functions.remove_not(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                    index = engine_functions.get_diode(global.variables.selected_id);
                    if (index > -1 && index < diodes.length) {
                        engine_functions.remove_diode(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
                    index = engine_functions.get_led(global.variables.selected_id);
                    if (index > -1 && index < leds.length) {
                        engine_functions.remove_led(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                    index = engine_functions.get_zener(global.variables.selected_id);
                    if (index > -1 && index < zeners.length) {
                        engine_functions.remove_zener(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                    index = engine_functions.get_potentiometer(global.variables.selected_id);
                    if (index > -1 && index < potentiometers.length) {
                        engine_functions.remove_potentiometer(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
                    index = engine_functions.get_and(global.variables.selected_id);
                    if (index > -1 && index < ands.length) {
                        engine_functions.remove_and(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
                    index = engine_functions.get_or(global.variables.selected_id);
                    if (index > -1 && index < ors.length) {
                        engine_functions.remove_or(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
                    index = engine_functions.get_nand(global.variables.selected_id);
                    if (index > -1 && index < nands.length) {
                        engine_functions.remove_nand(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
                    index = engine_functions.get_nor(global.variables.selected_id);
                    if (index > -1 && index < nors.length) {
                        engine_functions.remove_nor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
                    index = engine_functions.get_xor(global.variables.selected_id);
                    if (index > -1 && index < xors.length) {
                        engine_functions.remove_xor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                    index = engine_functions.get_xnor(global.variables.selected_id);
                    if (index > -1 && index < xnors.length) {
                        engine_functions.remove_xnor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
                    index = engine_functions.get_dff(global.variables.selected_id);
                    if (index > -1 && index < dffs.length) {
                        engine_functions.remove_dff(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                    index = engine_functions.get_vsat(global.variables.selected_id);
                    if (index > -1 && index < vsats.length) {
                        engine_functions.remove_vsat(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
                    index = engine_functions.get_adder(global.variables.selected_id);
                    if (index > -1 && index < adders.length) {
                        engine_functions.remove_adder(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
                    index = engine_functions.get_subtractor(global.variables.selected_id);
                    if (index > -1 && index < subtractors.length) {
                        engine_functions.remove_subtractor(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
                    index = engine_functions.get_multiplier(global.variables.selected_id);
                    if (index > -1 && index < multipliers.length) {
                        engine_functions.remove_multiplier(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
                    index = engine_functions.get_divider(global.variables.selected_id);
                    if (index > -1 && index < dividers.length) {
                        engine_functions.remove_divider(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                    index = engine_functions.get_gain(global.variables.selected_id);
                    if (index > -1 && index < gains.length) {
                        engine_functions.remove_gain(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
                    index = engine_functions.get_absval(global.variables.selected_id);
                    if (index > -1 && index < absvals.length) {
                        engine_functions.remove_absval(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                    index = engine_functions.get_vcsw(global.variables.selected_id);
                    if (index > -1 && index < vcsws.length) {
                        engine_functions.remove_vcsw(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                    index = engine_functions.get_vcvs(global.variables.selected_id);
                    if (index > -1 && index < vcvss.length) {
                        engine_functions.remove_vcvs(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                    index = engine_functions.get_vccs(global.variables.selected_id);
                    if (index > -1 && index < vccss.length) {
                        engine_functions.remove_vccs(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                    index = engine_functions.get_cccs(global.variables.selected_id);
                    if (index > -1 && index < cccss.length) {
                        engine_functions.remove_cccs(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                    index = engine_functions.get_ccvs(global.variables.selected_id);
                    if (index > -1 && index < ccvss.length) {
                        engine_functions.remove_ccvs(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                    index = engine_functions.get_opamp(global.variables.selected_id);
                    if (index > -1 && index < opamps.length) {
                        engine_functions.remove_opamp(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                    index = engine_functions.get_nmosfet(global.variables.selected_id);
                    if (index > -1 && index < nmosfets.length) {
                        engine_functions.remove_nmosfet(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                    index = engine_functions.get_pmosfet(global.variables.selected_id);
                    if (index > -1 && index < pmosfets.length) {
                        engine_functions.remove_pmosfet(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
                    index = engine_functions.get_npn(global.variables.selected_id);
                    if (index > -1 && index < npns.length) {
                        engine_functions.remove_npn(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
                    index = engine_functions.get_pnp(global.variables.selected_id);
                    if (index > -1 && index < pnps.length) {
                        engine_functions.remove_pnp(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
                    index = engine_functions.get_adc(global.variables.selected_id);
                    if (index > -1 && index < adcs.length) {
                        engine_functions.remove_adc(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
                    index = engine_functions.get_dac(global.variables.selected_id);
                    if (index > -1 && index < dacs.length) {
                        engine_functions.remove_dac(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
                    index = engine_functions.get_samplers(global.variables.selected_id);
                    if (index > -1 && index < sandhs.length) {
                        engine_functions.remove_samplers(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
                    index = engine_functions.get_pwm(global.variables.selected_id);
                    if (index > -1 && index < pwms.length) {
                        engine_functions.remove_pwm(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                    index = engine_functions.get_integrator(global.variables.selected_id);
                    if (index > -1 && index < integrators.length) {
                        engine_functions.remove_integrator(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                    index = engine_functions.get_differentiator(global.variables.selected_id);
                    if (index > -1 && index < differentiators.length) {
                        engine_functions.remove_differentiator(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
                    index = engine_functions.get_lowpass(global.variables.selected_id);
                    if (index > -1 && index < lowpasses.length) {
                        engine_functions.remove_lowpass(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
                    index = engine_functions.get_highpass(global.variables.selected_id);
                    if (index > -1 && index < highpasses.length) {
                        engine_functions.remove_highpass(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
                    index = engine_functions.get_relay(global.variables.selected_id);
                    if (index > -1 && index < relays.length) {
                        engine_functions.remove_relay(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
                    index = engine_functions.get_pid(global.variables.selected_id);
                    if (index > -1 && index < pids.length) {
                        engine_functions.remove_pid(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
                    index = engine_functions.get_lut(global.variables.selected_id);
                    if (index > -1 && index < luts.length) {
                        engine_functions.remove_lut(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
                    index = engine_functions.get_vcr(global.variables.selected_id);
                    if (index > -1 && index < vcrs.length) {
                        engine_functions.remove_vcr(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                    index = engine_functions.get_vcca(global.variables.selected_id);
                    if (index > -1 && index < vccas.length) {
                        engine_functions.remove_vcca(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
                    index = engine_functions.get_vcl(global.variables.selected_id);
                    if (index > -1 && index < vcls.length) {
                        engine_functions.remove_vcl(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
                    index = engine_functions.get_grt(global.variables.selected_id);
                    if (index > -1 && index < grts.length) {
                        engine_functions.remove_grt(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                    index = engine_functions.get_tptz(global.variables.selected_id);
                    if (index > -1 && index < tptzs.length) {
                        engine_functions.remove_tptz(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                    index = engine_functions.get_transformer(global.variables.selected_id);
                    if (index > -1 && index < transformers.length) {
                        engine_functions.remove_transformer(index);
                        global.variables.history['packet'].push(engine_functions.history_snapshot());
                    }
                }
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
            else {
                this.handle_remove_multi_select_elements();
            }
        }
    }
    handle_rotate_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_ROTATE) {
            global.flags.flag_build_element = true;
            let index = -1;
            /* #INSERT_GENERATE_ELEMENT_ROTATE_SHORTCUT# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                index = engine_functions.get_resistor(global.variables.selected_id);
                if (index > -1 && index < resistors.length) {
                    resistors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                index = engine_functions.get_capacitor(global.variables.selected_id);
                if (index > -1 && index < capacitors.length) {
                    capacitors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                index = engine_functions.get_inductor(global.variables.selected_id);
                if (index > -1 && index < inductors.length) {
                    inductors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                index = engine_functions.get_ground(global.variables.selected_id);
                if (index > -1 && index < grounds.length) {
                    grounds[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                index = engine_functions.get_dcsource(global.variables.selected_id);
                if (index > -1 && index < dcsources.length) {
                    dcsources[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                index = engine_functions.get_dccurrent(global.variables.selected_id);
                if (index > -1 && index < dccurrents.length) {
                    dccurrents[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                index = engine_functions.get_acsource(global.variables.selected_id);
                if (index > -1 && index < acsources.length) {
                    acsources[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                index = engine_functions.get_accurrent(global.variables.selected_id);
                if (index > -1 && index < accurrents.length) {
                    accurrents[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                index = engine_functions.get_squarewave(global.variables.selected_id);
                if (index > -1 && index < squarewaves.length) {
                    squarewaves[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
                index = engine_functions.get_sawwave(global.variables.selected_id);
                if (index > -1 && index < sawwaves.length) {
                    sawwaves[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
                index = engine_functions.get_trianglewave(global.variables.selected_id);
                if (index > -1 && index < trianglewaves.length) {
                    trianglewaves[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                index = engine_functions.get_constant(global.variables.selected_id);
                if (index > -1 && index < constants.length) {
                    constants[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
                index = engine_functions.get_wire(global.variables.selected_id);
                if (index > -1 && index < wires.length) {
                    wires[index].increment_style();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
                index = engine_functions.get_net(global.variables.selected_id);
                if (index > -1 && index < nets.length) {
                    nets[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                index = engine_functions.get_note(global.variables.selected_id);
                if (index > -1 && index < notes.length) {
                    notes[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                index = engine_functions.get_rail(global.variables.selected_id);
                if (index > -1 && index < rails.length) {
                    rails[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                index = engine_functions.get_voltmeter(global.variables.selected_id);
                if (index > -1 && index < voltmeters.length) {
                    voltmeters[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                index = engine_functions.get_ohmmeter(global.variables.selected_id);
                if (index > -1 && index < ohmmeters.length) {
                    ohmmeters[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                index = engine_functions.get_ammeter(global.variables.selected_id);
                if (index > -1 && index < ammeters.length) {
                    ammeters[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                index = engine_functions.get_wattmeter(global.variables.selected_id);
                if (index > -1 && index < wattmeters.length) {
                    wattmeters[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                index = engine_functions.get_fuse(global.variables.selected_id);
                if (index > -1 && index < fuses.length) {
                    fuses[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
                index = engine_functions.get_spst(global.variables.selected_id);
                if (index > -1 && index < spsts.length) {
                    spsts[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                index = engine_functions.get_spdt(global.variables.selected_id);
                if (index > -1 && index < spdts.length) {
                    spdts[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
                index = engine_functions.get_not(global.variables.selected_id);
                if (index > -1 && index < nots.length) {
                    nots[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                index = engine_functions.get_diode(global.variables.selected_id);
                if (index > -1 && index < diodes.length) {
                    diodes[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
                index = engine_functions.get_led(global.variables.selected_id);
                if (index > -1 && index < leds.length) {
                    leds[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                index = engine_functions.get_zener(global.variables.selected_id);
                if (index > -1 && index < zeners.length) {
                    zeners[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                index = engine_functions.get_potentiometer(global.variables.selected_id);
                if (index > -1 && index < potentiometers.length) {
                    potentiometers[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
                index = engine_functions.get_and(global.variables.selected_id);
                if (index > -1 && index < ands.length) {
                    ands[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
                index = engine_functions.get_or(global.variables.selected_id);
                if (index > -1 && index < ors.length) {
                    ors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
                index = engine_functions.get_nand(global.variables.selected_id);
                if (index > -1 && index < nands.length) {
                    nands[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
                index = engine_functions.get_nor(global.variables.selected_id);
                if (index > -1 && index < nors.length) {
                    nors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
                index = engine_functions.get_xor(global.variables.selected_id);
                if (index > -1 && index < xors.length) {
                    xors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                index = engine_functions.get_xnor(global.variables.selected_id);
                if (index > -1 && index < xnors.length) {
                    xnors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
                index = engine_functions.get_dff(global.variables.selected_id);
                if (index > -1 && index < dffs.length) {
                    dffs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                index = engine_functions.get_vsat(global.variables.selected_id);
                if (index > -1 && index < vsats.length) {
                    vsats[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
                index = engine_functions.get_adder(global.variables.selected_id);
                if (index > -1 && index < adders.length) {
                    adders[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
                index = engine_functions.get_subtractor(global.variables.selected_id);
                if (index > -1 && index < subtractors.length) {
                    subtractors[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
                index = engine_functions.get_multiplier(global.variables.selected_id);
                if (index > -1 && index < multipliers.length) {
                    multipliers[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
                index = engine_functions.get_divider(global.variables.selected_id);
                if (index > -1 && index < dividers.length) {
                    dividers[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                index = engine_functions.get_gain(global.variables.selected_id);
                if (index > -1 && index < gains.length) {
                    gains[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
                index = engine_functions.get_absval(global.variables.selected_id);
                if (index > -1 && index < absvals.length) {
                    absvals[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                index = engine_functions.get_vcsw(global.variables.selected_id);
                if (index > -1 && index < vcsws.length) {
                    vcsws[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                index = engine_functions.get_vcvs(global.variables.selected_id);
                if (index > -1 && index < vcvss.length) {
                    vcvss[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                index = engine_functions.get_vccs(global.variables.selected_id);
                if (index > -1 && index < vccss.length) {
                    vccss[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                index = engine_functions.get_cccs(global.variables.selected_id);
                if (index > -1 && index < cccss.length) {
                    cccss[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                index = engine_functions.get_ccvs(global.variables.selected_id);
                if (index > -1 && index < ccvss.length) {
                    ccvss[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                index = engine_functions.get_opamp(global.variables.selected_id);
                if (index > -1 && index < opamps.length) {
                    opamps[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                index = engine_functions.get_nmosfet(global.variables.selected_id);
                if (index > -1 && index < nmosfets.length) {
                    nmosfets[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                index = engine_functions.get_pmosfet(global.variables.selected_id);
                if (index > -1 && index < pmosfets.length) {
                    pmosfets[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
                index = engine_functions.get_npn(global.variables.selected_id);
                if (index > -1 && index < npns.length) {
                    npns[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
                index = engine_functions.get_pnp(global.variables.selected_id);
                if (index > -1 && index < pnps.length) {
                    pnps[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
                index = engine_functions.get_adc(global.variables.selected_id);
                if (index > -1 && index < adcs.length) {
                    adcs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
                index = engine_functions.get_dac(global.variables.selected_id);
                if (index > -1 && index < dacs.length) {
                    dacs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
                index = engine_functions.get_samplers(global.variables.selected_id);
                if (index > -1 && index < sandhs.length) {
                    sandhs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
                index = engine_functions.get_pwm(global.variables.selected_id);
                if (index > -1 && index < pwms.length) {
                    pwms[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                index = engine_functions.get_integrator(global.variables.selected_id);
                if (index > -1 && index < integrators.length) {
                    integrators[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                index = engine_functions.get_differentiator(global.variables.selected_id);
                if (index > -1 && index < differentiators.length) {
                    differentiators[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
                index = engine_functions.get_lowpass(global.variables.selected_id);
                if (index > -1 && index < lowpasses.length) {
                    lowpasses[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
                index = engine_functions.get_highpass(global.variables.selected_id);
                if (index > -1 && index < highpasses.length) {
                    highpasses[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
                index = engine_functions.get_relay(global.variables.selected_id);
                if (index > -1 && index < relays.length) {
                    relays[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
                index = engine_functions.get_pid(global.variables.selected_id);
                if (index > -1 && index < pids.length) {
                    pids[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
                index = engine_functions.get_lut(global.variables.selected_id);
                if (index > -1 && index < luts.length) {
                    luts[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
                index = engine_functions.get_vcr(global.variables.selected_id);
                if (index > -1 && index < vcrs.length) {
                    vcrs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                index = engine_functions.get_vcca(global.variables.selected_id);
                if (index > -1 && index < vccas.length) {
                    vccas[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
                index = engine_functions.get_vcl(global.variables.selected_id);
                if (index > -1 && index < vcls.length) {
                    vcls[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
                index = engine_functions.get_grt(global.variables.selected_id);
                if (index > -1 && index < grts.length) {
                    grts[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                index = engine_functions.get_tptz(global.variables.selected_id);
                if (index > -1 && index < tptzs.length) {
                    tptzs[index].increment_rotation();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                index = engine_functions.get_transformer(global.variables.selected_id);
                if (index > -1 && index < transformers.length) {
                    transformers[index].increment_rotation();
                }
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
    }
    handle_reset_window_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_RESET_WINDOW) {
            menu_bar.handle_element_options_flag(false);
            menu_bar.handle_element_options_edit_flag(false);
            menu_bar.handle_menu_open_flag(false);
            menu_bar.handle_menu_open_down_flag(false);
            menu_bar.handle_save_image_flag(false);
            menu_bar.handle_save_circuit_flag(false);
            menu_bar.handle_select_settings_flag(false);
            if (global.flags.flag_simulating === true) {
                menu_bar.handle_simulation_flag(false);
            }
            if (global.flags.flag_graph === true) {
                menu_bar.handle_graph_flag(false);
            }
            if (global.flags.flag_remove_all === true) {
                menu_bar.handle_remove_all_flag(false);
            }
            if (global.flags.flag_zoom === true) {
                menu_bar.handle_zoom_flag(false);
            }
            bottom_menu.handle_timestep_flag(false);
        }
    }
    handle_query_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_QUERY) {
            var text_input = document.getElementById('text_input');
            let MeterTemplate = {
                Tag: '',
                Value: -1
            };
            let solution_vector = [];
            let met_max = global.utils.meter_max();
            for (var i = 0; i < met_max; i++) {
                if (i < voltmeters.length) {
                    MeterTemplate['Tag'] = voltmeters[i].elm.properties['tag'] + voltmeters[i].elm.id;
                    MeterTemplate['Value'] = voltmeters[i].elm.properties['Voltage'];
                    solution_vector.push(global.utils.copy(MeterTemplate));
                }
                if (i < ohmmeters.length) {
                    MeterTemplate['Tag'] = ohmmeters[i].elm.properties['tag'] + ohmmeters[i].elm.id;
                    MeterTemplate['Value'] = ohmmeters[i].elm.properties['Sensed Resistance'];
                    solution_vector.push(global.utils.copy(MeterTemplate));
                }
                if (i < ammeters.length) {
                    MeterTemplate['Tag'] = ammeters[i].elm.properties['tag'] + ammeters[i].elm.id;
                    MeterTemplate['Value'] = ammeters[i].elm.properties['Current'];
                    solution_vector.push(global.utils.copy(MeterTemplate));
                }
                if (i < wattmeters.length) {
                    MeterTemplate['Tag'] = wattmeters[i].elm.properties['tag'] + wattmeters[i].elm.id;
                    MeterTemplate['Value'] = wattmeters[i].elm.properties['Wattage'];
                    solution_vector.push(global.utils.copy(MeterTemplate));
                }
            }
            //@ts-ignore
            text_input.value = JSON.stringify(solution_vector);
            //@ts-ignore
            text_input.select();
            //@ts-ignore
            text_input.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    }
    handle_undo_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_UNDO) {
            history_manager.undo();
        }
    }
    handle_redo_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_REDO) {
            history_manager.redo();
        }
    }
    handle_save_image_flag(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_SAVE_IMAGE) {
            menu_bar.handle_save_image_flag(!global.flags.flag_save_image);
        }
    }
    handle_save_circuit_flag(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_SAVE_CIRCUIT) {
            menu_bar.handle_save_circuit_flag(!global.flags.flag_save_circuit);
        }
    }
    handle_flip_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_FLIP) {
            global.flags.flag_build_element = true;
            let index = -1;
            /* #INSERT_GENERATE_ELEMENT_FLIP_SHORTCUT# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                index = engine_functions.get_resistor(global.variables.selected_id);
                if (index > -1 && index < resistors.length) {
                    resistors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                index = engine_functions.get_capacitor(global.variables.selected_id);
                if (index > -1 && index < capacitors.length) {
                    capacitors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                index = engine_functions.get_inductor(global.variables.selected_id);
                if (index > -1 && index < inductors.length) {
                    inductors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                index = engine_functions.get_ground(global.variables.selected_id);
                if (index > -1 && index < grounds.length) {
                    grounds[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                index = engine_functions.get_dcsource(global.variables.selected_id);
                if (index > -1 && index < dcsources.length) {
                    dcsources[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                index = engine_functions.get_dccurrent(global.variables.selected_id);
                if (index > -1 && index < dccurrents.length) {
                    dccurrents[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                index = engine_functions.get_acsource(global.variables.selected_id);
                if (index > -1 && index < acsources.length) {
                    acsources[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                index = engine_functions.get_accurrent(global.variables.selected_id);
                if (index > -1 && index < accurrents.length) {
                    accurrents[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                index = engine_functions.get_squarewave(global.variables.selected_id);
                if (index > -1 && index < squarewaves.length) {
                    squarewaves[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAW) {
                index = engine_functions.get_sawwave(global.variables.selected_id);
                if (index > -1 && index < sawwaves.length) {
                    sawwaves[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRI) {
                index = engine_functions.get_trianglewave(global.variables.selected_id);
                if (index > -1 && index < trianglewaves.length) {
                    trianglewaves[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                index = engine_functions.get_constant(global.variables.selected_id);
                if (index > -1 && index < constants.length) {
                    constants[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WIRE) {
                index = engine_functions.get_wire(global.variables.selected_id);
                if (index > -1 && index < wires.length) {
                    wires[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NET) {
                index = engine_functions.get_net(global.variables.selected_id);
                if (index > -1 && index < nets.length) {
                    nets[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                index = engine_functions.get_note(global.variables.selected_id);
                if (index > -1 && index < notes.length) {
                    notes[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                index = engine_functions.get_rail(global.variables.selected_id);
                if (index > -1 && index < rails.length) {
                    rails[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                index = engine_functions.get_voltmeter(global.variables.selected_id);
                if (index > -1 && index < voltmeters.length) {
                    voltmeters[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                index = engine_functions.get_ohmmeter(global.variables.selected_id);
                if (index > -1 && index < ohmmeters.length) {
                    ohmmeters[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                index = engine_functions.get_ammeter(global.variables.selected_id);
                if (index > -1 && index < ammeters.length) {
                    ammeters[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                index = engine_functions.get_wattmeter(global.variables.selected_id);
                if (index > -1 && index < wattmeters.length) {
                    wattmeters[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                index = engine_functions.get_fuse(global.variables.selected_id);
                if (index > -1 && index < fuses.length) {
                    fuses[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPST) {
                index = engine_functions.get_spst(global.variables.selected_id);
                if (index > -1 && index < spsts.length) {
                    spsts[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                index = engine_functions.get_spdt(global.variables.selected_id);
                if (index > -1 && index < spdts.length) {
                    spdts[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOT) {
                index = engine_functions.get_not(global.variables.selected_id);
                if (index > -1 && index < nots.length) {
                    nots[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                index = engine_functions.get_diode(global.variables.selected_id);
                if (index > -1 && index < diodes.length) {
                    diodes[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LED) {
                index = engine_functions.get_led(global.variables.selected_id);
                if (index > -1 && index < leds.length) {
                    leds[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                index = engine_functions.get_zener(global.variables.selected_id);
                if (index > -1 && index < zeners.length) {
                    zeners[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                index = engine_functions.get_potentiometer(global.variables.selected_id);
                if (index > -1 && index < potentiometers.length) {
                    potentiometers[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_AND) {
                index = engine_functions.get_and(global.variables.selected_id);
                if (index > -1 && index < ands.length) {
                    ands[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OR) {
                index = engine_functions.get_or(global.variables.selected_id);
                if (index > -1 && index < ors.length) {
                    ors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NAND) {
                index = engine_functions.get_nand(global.variables.selected_id);
                if (index > -1 && index < nands.length) {
                    nands[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NOR) {
                index = engine_functions.get_nor(global.variables.selected_id);
                if (index > -1 && index < nors.length) {
                    nors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XOR) {
                index = engine_functions.get_xor(global.variables.selected_id);
                if (index > -1 && index < xors.length) {
                    xors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                index = engine_functions.get_xnor(global.variables.selected_id);
                if (index > -1 && index < xnors.length) {
                    xnors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DFF) {
                index = engine_functions.get_dff(global.variables.selected_id);
                if (index > -1 && index < dffs.length) {
                    dffs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                index = engine_functions.get_vsat(global.variables.selected_id);
                if (index > -1 && index < vsats.length) {
                    vsats[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADD) {
                index = engine_functions.get_adder(global.variables.selected_id);
                if (index > -1 && index < adders.length) {
                    adders[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SUB) {
                index = engine_functions.get_subtractor(global.variables.selected_id);
                if (index > -1 && index < subtractors.length) {
                    subtractors[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_MUL) {
                index = engine_functions.get_multiplier(global.variables.selected_id);
                if (index > -1 && index < multipliers.length) {
                    multipliers[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIV) {
                index = engine_functions.get_divider(global.variables.selected_id);
                if (index > -1 && index < dividers.length) {
                    dividers[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                index = engine_functions.get_gain(global.variables.selected_id);
                if (index > -1 && index < gains.length) {
                    gains[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ABS) {
                index = engine_functions.get_absval(global.variables.selected_id);
                if (index > -1 && index < absvals.length) {
                    absvals[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                index = engine_functions.get_vcsw(global.variables.selected_id);
                if (index > -1 && index < vcsws.length) {
                    vcsws[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                index = engine_functions.get_vcvs(global.variables.selected_id);
                if (index > -1 && index < vcvss.length) {
                    vcvss[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                index = engine_functions.get_vccs(global.variables.selected_id);
                if (index > -1 && index < vccss.length) {
                    vccss[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                index = engine_functions.get_cccs(global.variables.selected_id);
                if (index > -1 && index < cccss.length) {
                    cccss[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                index = engine_functions.get_ccvs(global.variables.selected_id);
                if (index > -1 && index < ccvss.length) {
                    ccvss[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                index = engine_functions.get_opamp(global.variables.selected_id);
                if (index > -1 && index < opamps.length) {
                    opamps[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                index = engine_functions.get_nmosfet(global.variables.selected_id);
                if (index > -1 && index < nmosfets.length) {
                    nmosfets[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                index = engine_functions.get_pmosfet(global.variables.selected_id);
                if (index > -1 && index < pmosfets.length) {
                    pmosfets[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_NPN) {
                index = engine_functions.get_npn(global.variables.selected_id);
                if (index > -1 && index < npns.length) {
                    npns[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PNP) {
                index = engine_functions.get_pnp(global.variables.selected_id);
                if (index > -1 && index < pnps.length) {
                    pnps[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_ADC) {
                index = engine_functions.get_adc(global.variables.selected_id);
                if (index > -1 && index < adcs.length) {
                    adcs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DAC) {
                index = engine_functions.get_dac(global.variables.selected_id);
                if (index > -1 && index < dacs.length) {
                    dacs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_SAH) {
                index = engine_functions.get_samplers(global.variables.selected_id);
                if (index > -1 && index < sandhs.length) {
                    sandhs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PWM) {
                index = engine_functions.get_pwm(global.variables.selected_id);
                if (index > -1 && index < pwms.length) {
                    pwms[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                index = engine_functions.get_integrator(global.variables.selected_id);
                if (index > -1 && index < integrators.length) {
                    integrators[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                index = engine_functions.get_differentiator(global.variables.selected_id);
                if (index > -1 && index < differentiators.length) {
                    differentiators[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LPF) {
                index = engine_functions.get_lowpass(global.variables.selected_id);
                if (index > -1 && index < lowpasses.length) {
                    lowpasses[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_HPF) {
                index = engine_functions.get_highpass(global.variables.selected_id);
                if (index > -1 && index < highpasses.length) {
                    highpasses[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_REL) {
                index = engine_functions.get_relay(global.variables.selected_id);
                if (index > -1 && index < relays.length) {
                    relays[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_PID) {
                index = engine_functions.get_pid(global.variables.selected_id);
                if (index > -1 && index < pids.length) {
                    pids[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_LUT) {
                index = engine_functions.get_lut(global.variables.selected_id);
                if (index > -1 && index < luts.length) {
                    luts[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCR) {
                index = engine_functions.get_vcr(global.variables.selected_id);
                if (index > -1 && index < vcrs.length) {
                    vcrs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                index = engine_functions.get_vcca(global.variables.selected_id);
                if (index > -1 && index < vccas.length) {
                    vccas[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_VCL) {
                index = engine_functions.get_vcl(global.variables.selected_id);
                if (index > -1 && index < vcls.length) {
                    vcls[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_GRT) {
                index = engine_functions.get_grt(global.variables.selected_id);
                if (index > -1 && index < grts.length) {
                    grts[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                index = engine_functions.get_tptz(global.variables.selected_id);
                if (index > -1 && index < tptzs.length) {
                    tptzs[index].increment_flip();
                }
            }
            else if (global.variables.selected_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                index = engine_functions.get_transformer(global.variables.selected_id);
                if (index > -1 && index < transformers.length) {
                    transformers[index].increment_flip();
                }
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
    }
    handle_edit_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_EDIT) {
            let index = -1;
            if (global.utils.not_null(global.variables.selected_properties)) {
                if (global.utils.not_null(global.variables.selected_properties['options'])) {
                    if (element_options.opts['c1'] === element_options.EDIT_ICON ||
                        element_options.opts['c2'] === element_options.EDIT_ICON ||
                        element_options.opts['c3'] === element_options.EDIT_ICON ||
                        element_options.opts['c4'] === element_options.EDIT_ICON) {
                        menu_bar.handle_element_options_flag(!global.flags.flag_element_options);
                    }
                    if (element_options.opts['c1'] === element_options.EYE_ICON ||
                        element_options.opts['c2'] === element_options.EYE_ICON ||
                        element_options.opts['c3'] === element_options.EYE_ICON ||
                        element_options.opts['c4'] === element_options.EYE_ICON) {
                        element_options.handle_eye_option();
                    }
                }
            }
        }
    }
    handle_remove_all_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_REMOVE_ALL) {
            if (!global.flags.flag_remove_all) {
                menu_bar.handle_remove_all_flag(!global.flags.flag_remove_all);
            }
        }
    }
    handle_simulate_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_SIMULATE && key_event['ctrl'] === false) {
            menu_bar.handle_simulation_flag(!global.flags.flag_simulating);
        }
    }
    handle_copy_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_COPY && !global.flags.flag_history_lock) {
            global.variables.clipboard_data.splice(0, global.variables.clipboard_data.length);
            let clipboard_entry = {
                clipboard_flip: -1,
                clipboard_location_dx: 0,
                clipboard_location_dy: 0,
                clipboard_property: global.CONSTANTS.NULL,
                clipboard_rotation: -1,
                clipboard_type: global.variables.selected_type,
                clipboard_reference_id: -1,
                clipboard_new_reference_id: -1,
                clipboard_wire_references: global.CONSTANTS.NULL
            };
            if (!global.variables.multi_selected) {
                if (global.utils.not_null(global.variables.selected_type) && global.utils.not_null(global.variables.selected_properties) && global.utils.not_null(global.variables.selected_id)) {
                    if (global.variables.selected_type !== global.ELEMENT_TYPES.TYPE_WIRE) {
                        let index = -1;
                        /* #INSERT_GENERATE_COPY_ELEMENT# */
                        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                        if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                            index = engine_functions.get_resistor(global.variables.selected_id);
                            if (index > -1 && index < resistors.length) {
                                clipboard_entry.clipboard_rotation = resistors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = resistors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                            index = engine_functions.get_capacitor(global.variables.selected_id);
                            if (index > -1 && index < capacitors.length) {
                                clipboard_entry.clipboard_rotation = capacitors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = capacitors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                            index = engine_functions.get_inductor(global.variables.selected_id);
                            if (index > -1 && index < inductors.length) {
                                clipboard_entry.clipboard_rotation = inductors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = inductors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                            index = engine_functions.get_ground(global.variables.selected_id);
                            if (index > -1 && index < grounds.length) {
                                clipboard_entry.clipboard_rotation = grounds[index].elm.rotation;
                                clipboard_entry.clipboard_flip = grounds[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                            index = engine_functions.get_dcsource(global.variables.selected_id);
                            if (index > -1 && index < dcsources.length) {
                                clipboard_entry.clipboard_rotation = dcsources[index].elm.rotation;
                                clipboard_entry.clipboard_flip = dcsources[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                            index = engine_functions.get_dccurrent(global.variables.selected_id);
                            if (index > -1 && index < dccurrents.length) {
                                clipboard_entry.clipboard_rotation = dccurrents[index].elm.rotation;
                                clipboard_entry.clipboard_flip = dccurrents[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                            index = engine_functions.get_acsource(global.variables.selected_id);
                            if (index > -1 && index < acsources.length) {
                                clipboard_entry.clipboard_rotation = acsources[index].elm.rotation;
                                clipboard_entry.clipboard_flip = acsources[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                            index = engine_functions.get_accurrent(global.variables.selected_id);
                            if (index > -1 && index < accurrents.length) {
                                clipboard_entry.clipboard_rotation = accurrents[index].elm.rotation;
                                clipboard_entry.clipboard_flip = accurrents[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                            index = engine_functions.get_squarewave(global.variables.selected_id);
                            if (index > -1 && index < squarewaves.length) {
                                clipboard_entry.clipboard_rotation = squarewaves[index].elm.rotation;
                                clipboard_entry.clipboard_flip = squarewaves[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SAW) {
                            index = engine_functions.get_sawwave(global.variables.selected_id);
                            if (index > -1 && index < sawwaves.length) {
                                clipboard_entry.clipboard_rotation = sawwaves[index].elm.rotation;
                                clipboard_entry.clipboard_flip = sawwaves[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_TRI) {
                            index = engine_functions.get_trianglewave(global.variables.selected_id);
                            if (index > -1 && index < trianglewaves.length) {
                                clipboard_entry.clipboard_rotation = trianglewaves[index].elm.rotation;
                                clipboard_entry.clipboard_flip = trianglewaves[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                            index = engine_functions.get_constant(global.variables.selected_id);
                            if (index > -1 && index < constants.length) {
                                clipboard_entry.clipboard_rotation = constants[index].elm.rotation;
                                clipboard_entry.clipboard_flip = constants[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NET) {
                            index = engine_functions.get_net(global.variables.selected_id);
                            if (index > -1 && index < nets.length) {
                                clipboard_entry.clipboard_rotation = nets[index].elm.rotation;
                                clipboard_entry.clipboard_flip = nets[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                            index = engine_functions.get_note(global.variables.selected_id);
                            if (index > -1 && index < notes.length) {
                                clipboard_entry.clipboard_rotation = notes[index].elm.rotation;
                                clipboard_entry.clipboard_flip = notes[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                            index = engine_functions.get_rail(global.variables.selected_id);
                            if (index > -1 && index < rails.length) {
                                clipboard_entry.clipboard_rotation = rails[index].elm.rotation;
                                clipboard_entry.clipboard_flip = rails[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                            index = engine_functions.get_voltmeter(global.variables.selected_id);
                            if (index > -1 && index < voltmeters.length) {
                                clipboard_entry.clipboard_rotation = voltmeters[index].elm.rotation;
                                clipboard_entry.clipboard_flip = voltmeters[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                            index = engine_functions.get_ohmmeter(global.variables.selected_id);
                            if (index > -1 && index < ohmmeters.length) {
                                clipboard_entry.clipboard_rotation = ohmmeters[index].elm.rotation;
                                clipboard_entry.clipboard_flip = ohmmeters[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                            index = engine_functions.get_ammeter(global.variables.selected_id);
                            if (index > -1 && index < ammeters.length) {
                                clipboard_entry.clipboard_rotation = ammeters[index].elm.rotation;
                                clipboard_entry.clipboard_flip = ammeters[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                            index = engine_functions.get_wattmeter(global.variables.selected_id);
                            if (index > -1 && index < wattmeters.length) {
                                clipboard_entry.clipboard_rotation = wattmeters[index].elm.rotation;
                                clipboard_entry.clipboard_flip = wattmeters[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                            index = engine_functions.get_fuse(global.variables.selected_id);
                            if (index > -1 && index < fuses.length) {
                                clipboard_entry.clipboard_rotation = fuses[index].elm.rotation;
                                clipboard_entry.clipboard_flip = fuses[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SPST) {
                            index = engine_functions.get_spst(global.variables.selected_id);
                            if (index > -1 && index < spsts.length) {
                                clipboard_entry.clipboard_rotation = spsts[index].elm.rotation;
                                clipboard_entry.clipboard_flip = spsts[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                            index = engine_functions.get_spdt(global.variables.selected_id);
                            if (index > -1 && index < spdts.length) {
                                clipboard_entry.clipboard_rotation = spdts[index].elm.rotation;
                                clipboard_entry.clipboard_flip = spdts[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NOT) {
                            index = engine_functions.get_not(global.variables.selected_id);
                            if (index > -1 && index < nots.length) {
                                clipboard_entry.clipboard_rotation = nots[index].elm.rotation;
                                clipboard_entry.clipboard_flip = nots[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                            index = engine_functions.get_diode(global.variables.selected_id);
                            if (index > -1 && index < diodes.length) {
                                clipboard_entry.clipboard_rotation = diodes[index].elm.rotation;
                                clipboard_entry.clipboard_flip = diodes[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_LED) {
                            index = engine_functions.get_led(global.variables.selected_id);
                            if (index > -1 && index < leds.length) {
                                clipboard_entry.clipboard_rotation = leds[index].elm.rotation;
                                clipboard_entry.clipboard_flip = leds[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                            index = engine_functions.get_zener(global.variables.selected_id);
                            if (index > -1 && index < zeners.length) {
                                clipboard_entry.clipboard_rotation = zeners[index].elm.rotation;
                                clipboard_entry.clipboard_flip = zeners[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                            index = engine_functions.get_potentiometer(global.variables.selected_id);
                            if (index > -1 && index < potentiometers.length) {
                                clipboard_entry.clipboard_rotation = potentiometers[index].elm.rotation;
                                clipboard_entry.clipboard_flip = potentiometers[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_AND) {
                            index = engine_functions.get_and(global.variables.selected_id);
                            if (index > -1 && index < ands.length) {
                                clipboard_entry.clipboard_rotation = ands[index].elm.rotation;
                                clipboard_entry.clipboard_flip = ands[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_OR) {
                            index = engine_functions.get_or(global.variables.selected_id);
                            if (index > -1 && index < ors.length) {
                                clipboard_entry.clipboard_rotation = ors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = ors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NAND) {
                            index = engine_functions.get_nand(global.variables.selected_id);
                            if (index > -1 && index < nands.length) {
                                clipboard_entry.clipboard_rotation = nands[index].elm.rotation;
                                clipboard_entry.clipboard_flip = nands[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NOR) {
                            index = engine_functions.get_nor(global.variables.selected_id);
                            if (index > -1 && index < nors.length) {
                                clipboard_entry.clipboard_rotation = nors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = nors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_XOR) {
                            index = engine_functions.get_xor(global.variables.selected_id);
                            if (index > -1 && index < xors.length) {
                                clipboard_entry.clipboard_rotation = xors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = xors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                            index = engine_functions.get_xnor(global.variables.selected_id);
                            if (index > -1 && index < xnors.length) {
                                clipboard_entry.clipboard_rotation = xnors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = xnors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DFF) {
                            index = engine_functions.get_dff(global.variables.selected_id);
                            if (index > -1 && index < dffs.length) {
                                clipboard_entry.clipboard_rotation = dffs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = dffs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                            index = engine_functions.get_vsat(global.variables.selected_id);
                            if (index > -1 && index < vsats.length) {
                                clipboard_entry.clipboard_rotation = vsats[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vsats[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ADD) {
                            index = engine_functions.get_adder(global.variables.selected_id);
                            if (index > -1 && index < adders.length) {
                                clipboard_entry.clipboard_rotation = adders[index].elm.rotation;
                                clipboard_entry.clipboard_flip = adders[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SUB) {
                            index = engine_functions.get_subtractor(global.variables.selected_id);
                            if (index > -1 && index < subtractors.length) {
                                clipboard_entry.clipboard_rotation = subtractors[index].elm.rotation;
                                clipboard_entry.clipboard_flip = subtractors[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_MUL) {
                            index = engine_functions.get_multiplier(global.variables.selected_id);
                            if (index > -1 && index < multipliers.length) {
                                clipboard_entry.clipboard_rotation = multipliers[index].elm.rotation;
                                clipboard_entry.clipboard_flip = multipliers[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DIV) {
                            index = engine_functions.get_divider(global.variables.selected_id);
                            if (index > -1 && index < dividers.length) {
                                clipboard_entry.clipboard_rotation = dividers[index].elm.rotation;
                                clipboard_entry.clipboard_flip = dividers[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                            index = engine_functions.get_gain(global.variables.selected_id);
                            if (index > -1 && index < gains.length) {
                                clipboard_entry.clipboard_rotation = gains[index].elm.rotation;
                                clipboard_entry.clipboard_flip = gains[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ABS) {
                            index = engine_functions.get_absval(global.variables.selected_id);
                            if (index > -1 && index < absvals.length) {
                                clipboard_entry.clipboard_rotation = absvals[index].elm.rotation;
                                clipboard_entry.clipboard_flip = absvals[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                            index = engine_functions.get_vcsw(global.variables.selected_id);
                            if (index > -1 && index < vcsws.length) {
                                clipboard_entry.clipboard_rotation = vcsws[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vcsws[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                            index = engine_functions.get_vcvs(global.variables.selected_id);
                            if (index > -1 && index < vcvss.length) {
                                clipboard_entry.clipboard_rotation = vcvss[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vcvss[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                            index = engine_functions.get_vccs(global.variables.selected_id);
                            if (index > -1 && index < vccss.length) {
                                clipboard_entry.clipboard_rotation = vccss[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vccss[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                            index = engine_functions.get_cccs(global.variables.selected_id);
                            if (index > -1 && index < cccss.length) {
                                clipboard_entry.clipboard_rotation = cccss[index].elm.rotation;
                                clipboard_entry.clipboard_flip = cccss[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                            index = engine_functions.get_ccvs(global.variables.selected_id);
                            if (index > -1 && index < ccvss.length) {
                                clipboard_entry.clipboard_rotation = ccvss[index].elm.rotation;
                                clipboard_entry.clipboard_flip = ccvss[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                            index = engine_functions.get_opamp(global.variables.selected_id);
                            if (index > -1 && index < opamps.length) {
                                clipboard_entry.clipboard_rotation = opamps[index].elm.rotation;
                                clipboard_entry.clipboard_flip = opamps[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                            index = engine_functions.get_nmosfet(global.variables.selected_id);
                            if (index > -1 && index < nmosfets.length) {
                                clipboard_entry.clipboard_rotation = nmosfets[index].elm.rotation;
                                clipboard_entry.clipboard_flip = nmosfets[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                            index = engine_functions.get_pmosfet(global.variables.selected_id);
                            if (index > -1 && index < pmosfets.length) {
                                clipboard_entry.clipboard_rotation = pmosfets[index].elm.rotation;
                                clipboard_entry.clipboard_flip = pmosfets[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_NPN) {
                            index = engine_functions.get_npn(global.variables.selected_id);
                            if (index > -1 && index < npns.length) {
                                clipboard_entry.clipboard_rotation = npns[index].elm.rotation;
                                clipboard_entry.clipboard_flip = npns[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_PNP) {
                            index = engine_functions.get_pnp(global.variables.selected_id);
                            if (index > -1 && index < pnps.length) {
                                clipboard_entry.clipboard_rotation = pnps[index].elm.rotation;
                                clipboard_entry.clipboard_flip = pnps[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_ADC) {
                            index = engine_functions.get_adc(global.variables.selected_id);
                            if (index > -1 && index < adcs.length) {
                                clipboard_entry.clipboard_rotation = adcs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = adcs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DAC) {
                            index = engine_functions.get_dac(global.variables.selected_id);
                            if (index > -1 && index < dacs.length) {
                                clipboard_entry.clipboard_rotation = dacs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = dacs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_SAH) {
                            index = engine_functions.get_samplers(global.variables.selected_id);
                            if (index > -1 && index < sandhs.length) {
                                clipboard_entry.clipboard_rotation = sandhs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = sandhs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_PWM) {
                            index = engine_functions.get_pwm(global.variables.selected_id);
                            if (index > -1 && index < pwms.length) {
                                clipboard_entry.clipboard_rotation = pwms[index].elm.rotation;
                                clipboard_entry.clipboard_flip = pwms[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                            index = engine_functions.get_integrator(global.variables.selected_id);
                            if (index > -1 && index < integrators.length) {
                                clipboard_entry.clipboard_rotation = integrators[index].elm.rotation;
                                clipboard_entry.clipboard_flip = integrators[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                            index = engine_functions.get_differentiator(global.variables.selected_id);
                            if (index > -1 && index < differentiators.length) {
                                clipboard_entry.clipboard_rotation = differentiators[index].elm.rotation;
                                clipboard_entry.clipboard_flip = differentiators[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_LPF) {
                            index = engine_functions.get_lowpass(global.variables.selected_id);
                            if (index > -1 && index < lowpasses.length) {
                                clipboard_entry.clipboard_rotation = lowpasses[index].elm.rotation;
                                clipboard_entry.clipboard_flip = lowpasses[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_HPF) {
                            index = engine_functions.get_highpass(global.variables.selected_id);
                            if (index > -1 && index < highpasses.length) {
                                clipboard_entry.clipboard_rotation = highpasses[index].elm.rotation;
                                clipboard_entry.clipboard_flip = highpasses[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_REL) {
                            index = engine_functions.get_relay(global.variables.selected_id);
                            if (index > -1 && index < relays.length) {
                                clipboard_entry.clipboard_rotation = relays[index].elm.rotation;
                                clipboard_entry.clipboard_flip = relays[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_PID) {
                            index = engine_functions.get_pid(global.variables.selected_id);
                            if (index > -1 && index < pids.length) {
                                clipboard_entry.clipboard_rotation = pids[index].elm.rotation;
                                clipboard_entry.clipboard_flip = pids[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_LUT) {
                            index = engine_functions.get_lut(global.variables.selected_id);
                            if (index > -1 && index < luts.length) {
                                clipboard_entry.clipboard_rotation = luts[index].elm.rotation;
                                clipboard_entry.clipboard_flip = luts[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCR) {
                            index = engine_functions.get_vcr(global.variables.selected_id);
                            if (index > -1 && index < vcrs.length) {
                                clipboard_entry.clipboard_rotation = vcrs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vcrs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                            index = engine_functions.get_vcca(global.variables.selected_id);
                            if (index > -1 && index < vccas.length) {
                                clipboard_entry.clipboard_rotation = vccas[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vccas[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_VCL) {
                            index = engine_functions.get_vcl(global.variables.selected_id);
                            if (index > -1 && index < vcls.length) {
                                clipboard_entry.clipboard_rotation = vcls[index].elm.rotation;
                                clipboard_entry.clipboard_flip = vcls[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_GRT) {
                            index = engine_functions.get_grt(global.variables.selected_id);
                            if (index > -1 && index < grts.length) {
                                clipboard_entry.clipboard_rotation = grts[index].elm.rotation;
                                clipboard_entry.clipboard_flip = grts[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                            index = engine_functions.get_tptz(global.variables.selected_id);
                            if (index > -1 && index < tptzs.length) {
                                clipboard_entry.clipboard_rotation = tptzs[index].elm.rotation;
                                clipboard_entry.clipboard_flip = tptzs[index].elm.flip;
                            }
                        }
                        else if (clipboard_entry.clipboard_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                            index = engine_functions.get_transformer(global.variables.selected_id);
                            if (index > -1 && index < transformers.length) {
                                clipboard_entry.clipboard_rotation = transformers[index].elm.rotation;
                                clipboard_entry.clipboard_flip = transformers[index].elm.flip;
                            }
                        }
                        /* <!-- END AUTOMATICALLY GENERATED !--> */
                        clipboard_entry.clipboard_property = global.utils.copy(global.variables.selected_properties);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                        toast.set_text(language_manager.COPIED[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + ' {' + global.variables.selected_properties['tag'] + global.variables.selected_id + '}');
                        toast.show(global.COLORS.GENERAL_GREEN_COLOR);
                    }
                    else {
                        toast.set_text(language_manager.CANNOT_COPY_WIRE[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + '.');
                        toast.show(global.COLORS.GENERAL_RED_COLOR);
                    }
                }
            }
            else {
                global.variables.clipboard_data.splice(0, global.variables.clipboard_data.length);
                let clipboard_entry = {
                    clipboard_flip: -1,
                    clipboard_location_dx: 0,
                    clipboard_location_dy: 0,
                    clipboard_property: global.CONSTANTS.NULL,
                    clipboard_rotation: -1,
                    clipboard_type: global.variables.selected_type,
                    clipboard_reference_id: -1,
                    clipboard_new_reference_id: -1,
                    clipboard_wire_references: global.CONSTANTS.NULL
                };
                /* #INSERT_GENERATE_MULTI_COPY_ELEMENT# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                for (var i = 0; i < resistors.length; i++) {
                    if (resistors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = resistors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = resistors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = resistors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(resistors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = resistors[i].elm.rotation;
                        clipboard_entry.clipboard_type = resistors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = resistors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(resistors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < capacitors.length; i++) {
                    if (capacitors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = capacitors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = capacitors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = capacitors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(capacitors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = capacitors[i].elm.rotation;
                        clipboard_entry.clipboard_type = capacitors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = capacitors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(capacitors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < inductors.length; i++) {
                    if (inductors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = inductors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = inductors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = inductors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(inductors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = inductors[i].elm.rotation;
                        clipboard_entry.clipboard_type = inductors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = inductors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(inductors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < grounds.length; i++) {
                    if (grounds[i].multi_selected) {
                        clipboard_entry.clipboard_flip = grounds[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = grounds[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = grounds[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(grounds[i].elm.properties);
                        clipboard_entry.clipboard_rotation = grounds[i].elm.rotation;
                        clipboard_entry.clipboard_type = grounds[i].elm.type;
                        clipboard_entry.clipboard_reference_id = grounds[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(grounds[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < dcsources.length; i++) {
                    if (dcsources[i].multi_selected) {
                        clipboard_entry.clipboard_flip = dcsources[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = dcsources[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = dcsources[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(dcsources[i].elm.properties);
                        clipboard_entry.clipboard_rotation = dcsources[i].elm.rotation;
                        clipboard_entry.clipboard_type = dcsources[i].elm.type;
                        clipboard_entry.clipboard_reference_id = dcsources[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(dcsources[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < dccurrents.length; i++) {
                    if (dccurrents[i].multi_selected) {
                        clipboard_entry.clipboard_flip = dccurrents[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = dccurrents[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = dccurrents[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(dccurrents[i].elm.properties);
                        clipboard_entry.clipboard_rotation = dccurrents[i].elm.rotation;
                        clipboard_entry.clipboard_type = dccurrents[i].elm.type;
                        clipboard_entry.clipboard_reference_id = dccurrents[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(dccurrents[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < acsources.length; i++) {
                    if (acsources[i].multi_selected) {
                        clipboard_entry.clipboard_flip = acsources[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = acsources[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = acsources[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(acsources[i].elm.properties);
                        clipboard_entry.clipboard_rotation = acsources[i].elm.rotation;
                        clipboard_entry.clipboard_type = acsources[i].elm.type;
                        clipboard_entry.clipboard_reference_id = acsources[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(acsources[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < accurrents.length; i++) {
                    if (accurrents[i].multi_selected) {
                        clipboard_entry.clipboard_flip = accurrents[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = accurrents[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = accurrents[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(accurrents[i].elm.properties);
                        clipboard_entry.clipboard_rotation = accurrents[i].elm.rotation;
                        clipboard_entry.clipboard_type = accurrents[i].elm.type;
                        clipboard_entry.clipboard_reference_id = accurrents[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(accurrents[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < squarewaves.length; i++) {
                    if (squarewaves[i].multi_selected) {
                        clipboard_entry.clipboard_flip = squarewaves[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = squarewaves[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = squarewaves[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(squarewaves[i].elm.properties);
                        clipboard_entry.clipboard_rotation = squarewaves[i].elm.rotation;
                        clipboard_entry.clipboard_type = squarewaves[i].elm.type;
                        clipboard_entry.clipboard_reference_id = squarewaves[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(squarewaves[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < sawwaves.length; i++) {
                    if (sawwaves[i].multi_selected) {
                        clipboard_entry.clipboard_flip = sawwaves[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = sawwaves[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = sawwaves[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(sawwaves[i].elm.properties);
                        clipboard_entry.clipboard_rotation = sawwaves[i].elm.rotation;
                        clipboard_entry.clipboard_type = sawwaves[i].elm.type;
                        clipboard_entry.clipboard_reference_id = sawwaves[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(sawwaves[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < trianglewaves.length; i++) {
                    if (trianglewaves[i].multi_selected) {
                        clipboard_entry.clipboard_flip = trianglewaves[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = trianglewaves[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = trianglewaves[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(trianglewaves[i].elm.properties);
                        clipboard_entry.clipboard_rotation = trianglewaves[i].elm.rotation;
                        clipboard_entry.clipboard_type = trianglewaves[i].elm.type;
                        clipboard_entry.clipboard_reference_id = trianglewaves[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(trianglewaves[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < constants.length; i++) {
                    if (constants[i].multi_selected) {
                        clipboard_entry.clipboard_flip = constants[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = constants[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = constants[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(constants[i].elm.properties);
                        clipboard_entry.clipboard_rotation = constants[i].elm.rotation;
                        clipboard_entry.clipboard_type = constants[i].elm.type;
                        clipboard_entry.clipboard_reference_id = constants[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(constants[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < nets.length; i++) {
                    if (nets[i].multi_selected) {
                        clipboard_entry.clipboard_flip = nets[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = nets[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = nets[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(nets[i].elm.properties);
                        clipboard_entry.clipboard_rotation = nets[i].elm.rotation;
                        clipboard_entry.clipboard_type = nets[i].elm.type;
                        clipboard_entry.clipboard_reference_id = nets[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(nets[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].multi_selected) {
                        clipboard_entry.clipboard_flip = notes[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = notes[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = notes[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(notes[i].elm.properties);
                        clipboard_entry.clipboard_rotation = notes[i].elm.rotation;
                        clipboard_entry.clipboard_type = notes[i].elm.type;
                        clipboard_entry.clipboard_reference_id = notes[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(notes[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < rails.length; i++) {
                    if (rails[i].multi_selected) {
                        clipboard_entry.clipboard_flip = rails[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = rails[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = rails[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(rails[i].elm.properties);
                        clipboard_entry.clipboard_rotation = rails[i].elm.rotation;
                        clipboard_entry.clipboard_type = rails[i].elm.type;
                        clipboard_entry.clipboard_reference_id = rails[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(rails[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < voltmeters.length; i++) {
                    if (voltmeters[i].multi_selected) {
                        clipboard_entry.clipboard_flip = voltmeters[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = voltmeters[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = voltmeters[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(voltmeters[i].elm.properties);
                        clipboard_entry.clipboard_rotation = voltmeters[i].elm.rotation;
                        clipboard_entry.clipboard_type = voltmeters[i].elm.type;
                        clipboard_entry.clipboard_reference_id = voltmeters[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(voltmeters[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < ohmmeters.length; i++) {
                    if (ohmmeters[i].multi_selected) {
                        clipboard_entry.clipboard_flip = ohmmeters[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = ohmmeters[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = ohmmeters[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(ohmmeters[i].elm.properties);
                        clipboard_entry.clipboard_rotation = ohmmeters[i].elm.rotation;
                        clipboard_entry.clipboard_type = ohmmeters[i].elm.type;
                        clipboard_entry.clipboard_reference_id = ohmmeters[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(ohmmeters[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < ammeters.length; i++) {
                    if (ammeters[i].multi_selected) {
                        clipboard_entry.clipboard_flip = ammeters[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = ammeters[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = ammeters[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(ammeters[i].elm.properties);
                        clipboard_entry.clipboard_rotation = ammeters[i].elm.rotation;
                        clipboard_entry.clipboard_type = ammeters[i].elm.type;
                        clipboard_entry.clipboard_reference_id = ammeters[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(ammeters[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < wattmeters.length; i++) {
                    if (wattmeters[i].multi_selected) {
                        clipboard_entry.clipboard_flip = wattmeters[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = wattmeters[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = wattmeters[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(wattmeters[i].elm.properties);
                        clipboard_entry.clipboard_rotation = wattmeters[i].elm.rotation;
                        clipboard_entry.clipboard_type = wattmeters[i].elm.type;
                        clipboard_entry.clipboard_reference_id = wattmeters[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(wattmeters[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < fuses.length; i++) {
                    if (fuses[i].multi_selected) {
                        clipboard_entry.clipboard_flip = fuses[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = fuses[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = fuses[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(fuses[i].elm.properties);
                        clipboard_entry.clipboard_rotation = fuses[i].elm.rotation;
                        clipboard_entry.clipboard_type = fuses[i].elm.type;
                        clipboard_entry.clipboard_reference_id = fuses[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(fuses[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < spsts.length; i++) {
                    if (spsts[i].multi_selected) {
                        clipboard_entry.clipboard_flip = spsts[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = spsts[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = spsts[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(spsts[i].elm.properties);
                        clipboard_entry.clipboard_rotation = spsts[i].elm.rotation;
                        clipboard_entry.clipboard_type = spsts[i].elm.type;
                        clipboard_entry.clipboard_reference_id = spsts[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(spsts[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < spdts.length; i++) {
                    if (spdts[i].multi_selected) {
                        clipboard_entry.clipboard_flip = spdts[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = spdts[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = spdts[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(spdts[i].elm.properties);
                        clipboard_entry.clipboard_rotation = spdts[i].elm.rotation;
                        clipboard_entry.clipboard_type = spdts[i].elm.type;
                        clipboard_entry.clipboard_reference_id = spdts[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(spdts[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < nots.length; i++) {
                    if (nots[i].multi_selected) {
                        clipboard_entry.clipboard_flip = nots[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = nots[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = nots[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(nots[i].elm.properties);
                        clipboard_entry.clipboard_rotation = nots[i].elm.rotation;
                        clipboard_entry.clipboard_type = nots[i].elm.type;
                        clipboard_entry.clipboard_reference_id = nots[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(nots[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < diodes.length; i++) {
                    if (diodes[i].multi_selected) {
                        clipboard_entry.clipboard_flip = diodes[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = diodes[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = diodes[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(diodes[i].elm.properties);
                        clipboard_entry.clipboard_rotation = diodes[i].elm.rotation;
                        clipboard_entry.clipboard_type = diodes[i].elm.type;
                        clipboard_entry.clipboard_reference_id = diodes[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(diodes[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < leds.length; i++) {
                    if (leds[i].multi_selected) {
                        clipboard_entry.clipboard_flip = leds[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = leds[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = leds[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(leds[i].elm.properties);
                        clipboard_entry.clipboard_rotation = leds[i].elm.rotation;
                        clipboard_entry.clipboard_type = leds[i].elm.type;
                        clipboard_entry.clipboard_reference_id = leds[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(leds[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < zeners.length; i++) {
                    if (zeners[i].multi_selected) {
                        clipboard_entry.clipboard_flip = zeners[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = zeners[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = zeners[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(zeners[i].elm.properties);
                        clipboard_entry.clipboard_rotation = zeners[i].elm.rotation;
                        clipboard_entry.clipboard_type = zeners[i].elm.type;
                        clipboard_entry.clipboard_reference_id = zeners[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(zeners[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < potentiometers.length; i++) {
                    if (potentiometers[i].multi_selected) {
                        clipboard_entry.clipboard_flip = potentiometers[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = potentiometers[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = potentiometers[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(potentiometers[i].elm.properties);
                        clipboard_entry.clipboard_rotation = potentiometers[i].elm.rotation;
                        clipboard_entry.clipboard_type = potentiometers[i].elm.type;
                        clipboard_entry.clipboard_reference_id = potentiometers[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(potentiometers[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < ands.length; i++) {
                    if (ands[i].multi_selected) {
                        clipboard_entry.clipboard_flip = ands[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = ands[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = ands[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(ands[i].elm.properties);
                        clipboard_entry.clipboard_rotation = ands[i].elm.rotation;
                        clipboard_entry.clipboard_type = ands[i].elm.type;
                        clipboard_entry.clipboard_reference_id = ands[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(ands[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < ors.length; i++) {
                    if (ors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = ors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = ors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = ors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(ors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = ors[i].elm.rotation;
                        clipboard_entry.clipboard_type = ors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = ors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(ors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < nands.length; i++) {
                    if (nands[i].multi_selected) {
                        clipboard_entry.clipboard_flip = nands[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = nands[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = nands[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(nands[i].elm.properties);
                        clipboard_entry.clipboard_rotation = nands[i].elm.rotation;
                        clipboard_entry.clipboard_type = nands[i].elm.type;
                        clipboard_entry.clipboard_reference_id = nands[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(nands[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < nors.length; i++) {
                    if (nors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = nors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = nors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = nors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(nors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = nors[i].elm.rotation;
                        clipboard_entry.clipboard_type = nors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = nors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(nors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < xors.length; i++) {
                    if (xors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = xors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = xors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = xors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(xors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = xors[i].elm.rotation;
                        clipboard_entry.clipboard_type = xors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = xors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(xors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < xnors.length; i++) {
                    if (xnors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = xnors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = xnors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = xnors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(xnors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = xnors[i].elm.rotation;
                        clipboard_entry.clipboard_type = xnors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = xnors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(xnors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < dffs.length; i++) {
                    if (dffs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = dffs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = dffs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = dffs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(dffs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = dffs[i].elm.rotation;
                        clipboard_entry.clipboard_type = dffs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = dffs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(dffs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vsats.length; i++) {
                    if (vsats[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vsats[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vsats[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vsats[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vsats[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vsats[i].elm.rotation;
                        clipboard_entry.clipboard_type = vsats[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vsats[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vsats[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < adders.length; i++) {
                    if (adders[i].multi_selected) {
                        clipboard_entry.clipboard_flip = adders[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = adders[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = adders[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(adders[i].elm.properties);
                        clipboard_entry.clipboard_rotation = adders[i].elm.rotation;
                        clipboard_entry.clipboard_type = adders[i].elm.type;
                        clipboard_entry.clipboard_reference_id = adders[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(adders[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < subtractors.length; i++) {
                    if (subtractors[i].multi_selected) {
                        clipboard_entry.clipboard_flip = subtractors[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = subtractors[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = subtractors[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(subtractors[i].elm.properties);
                        clipboard_entry.clipboard_rotation = subtractors[i].elm.rotation;
                        clipboard_entry.clipboard_type = subtractors[i].elm.type;
                        clipboard_entry.clipboard_reference_id = subtractors[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(subtractors[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < multipliers.length; i++) {
                    if (multipliers[i].multi_selected) {
                        clipboard_entry.clipboard_flip = multipliers[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = multipliers[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = multipliers[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(multipliers[i].elm.properties);
                        clipboard_entry.clipboard_rotation = multipliers[i].elm.rotation;
                        clipboard_entry.clipboard_type = multipliers[i].elm.type;
                        clipboard_entry.clipboard_reference_id = multipliers[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(multipliers[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < dividers.length; i++) {
                    if (dividers[i].multi_selected) {
                        clipboard_entry.clipboard_flip = dividers[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = dividers[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = dividers[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(dividers[i].elm.properties);
                        clipboard_entry.clipboard_rotation = dividers[i].elm.rotation;
                        clipboard_entry.clipboard_type = dividers[i].elm.type;
                        clipboard_entry.clipboard_reference_id = dividers[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(dividers[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < gains.length; i++) {
                    if (gains[i].multi_selected) {
                        clipboard_entry.clipboard_flip = gains[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = gains[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = gains[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(gains[i].elm.properties);
                        clipboard_entry.clipboard_rotation = gains[i].elm.rotation;
                        clipboard_entry.clipboard_type = gains[i].elm.type;
                        clipboard_entry.clipboard_reference_id = gains[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(gains[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < absvals.length; i++) {
                    if (absvals[i].multi_selected) {
                        clipboard_entry.clipboard_flip = absvals[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = absvals[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = absvals[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(absvals[i].elm.properties);
                        clipboard_entry.clipboard_rotation = absvals[i].elm.rotation;
                        clipboard_entry.clipboard_type = absvals[i].elm.type;
                        clipboard_entry.clipboard_reference_id = absvals[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(absvals[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vcsws.length; i++) {
                    if (vcsws[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vcsws[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vcsws[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vcsws[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vcsws[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vcsws[i].elm.rotation;
                        clipboard_entry.clipboard_type = vcsws[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vcsws[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vcsws[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vcvss.length; i++) {
                    if (vcvss[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vcvss[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vcvss[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vcvss[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vcvss[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vcvss[i].elm.rotation;
                        clipboard_entry.clipboard_type = vcvss[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vcvss[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vcvss[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vccss.length; i++) {
                    if (vccss[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vccss[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vccss[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vccss[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vccss[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vccss[i].elm.rotation;
                        clipboard_entry.clipboard_type = vccss[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vccss[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vccss[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < cccss.length; i++) {
                    if (cccss[i].multi_selected) {
                        clipboard_entry.clipboard_flip = cccss[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = cccss[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = cccss[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(cccss[i].elm.properties);
                        clipboard_entry.clipboard_rotation = cccss[i].elm.rotation;
                        clipboard_entry.clipboard_type = cccss[i].elm.type;
                        clipboard_entry.clipboard_reference_id = cccss[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(cccss[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < ccvss.length; i++) {
                    if (ccvss[i].multi_selected) {
                        clipboard_entry.clipboard_flip = ccvss[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = ccvss[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = ccvss[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(ccvss[i].elm.properties);
                        clipboard_entry.clipboard_rotation = ccvss[i].elm.rotation;
                        clipboard_entry.clipboard_type = ccvss[i].elm.type;
                        clipboard_entry.clipboard_reference_id = ccvss[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(ccvss[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < opamps.length; i++) {
                    if (opamps[i].multi_selected) {
                        clipboard_entry.clipboard_flip = opamps[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = opamps[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = opamps[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(opamps[i].elm.properties);
                        clipboard_entry.clipboard_rotation = opamps[i].elm.rotation;
                        clipboard_entry.clipboard_type = opamps[i].elm.type;
                        clipboard_entry.clipboard_reference_id = opamps[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(opamps[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < nmosfets.length; i++) {
                    if (nmosfets[i].multi_selected) {
                        clipboard_entry.clipboard_flip = nmosfets[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = nmosfets[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = nmosfets[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(nmosfets[i].elm.properties);
                        clipboard_entry.clipboard_rotation = nmosfets[i].elm.rotation;
                        clipboard_entry.clipboard_type = nmosfets[i].elm.type;
                        clipboard_entry.clipboard_reference_id = nmosfets[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(nmosfets[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < pmosfets.length; i++) {
                    if (pmosfets[i].multi_selected) {
                        clipboard_entry.clipboard_flip = pmosfets[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = pmosfets[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = pmosfets[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(pmosfets[i].elm.properties);
                        clipboard_entry.clipboard_rotation = pmosfets[i].elm.rotation;
                        clipboard_entry.clipboard_type = pmosfets[i].elm.type;
                        clipboard_entry.clipboard_reference_id = pmosfets[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(pmosfets[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < npns.length; i++) {
                    if (npns[i].multi_selected) {
                        clipboard_entry.clipboard_flip = npns[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = npns[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = npns[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(npns[i].elm.properties);
                        clipboard_entry.clipboard_rotation = npns[i].elm.rotation;
                        clipboard_entry.clipboard_type = npns[i].elm.type;
                        clipboard_entry.clipboard_reference_id = npns[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(npns[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < pnps.length; i++) {
                    if (pnps[i].multi_selected) {
                        clipboard_entry.clipboard_flip = pnps[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = pnps[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = pnps[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(pnps[i].elm.properties);
                        clipboard_entry.clipboard_rotation = pnps[i].elm.rotation;
                        clipboard_entry.clipboard_type = pnps[i].elm.type;
                        clipboard_entry.clipboard_reference_id = pnps[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(pnps[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < adcs.length; i++) {
                    if (adcs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = adcs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = adcs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = adcs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(adcs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = adcs[i].elm.rotation;
                        clipboard_entry.clipboard_type = adcs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = adcs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(adcs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < dacs.length; i++) {
                    if (dacs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = dacs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = dacs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = dacs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(dacs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = dacs[i].elm.rotation;
                        clipboard_entry.clipboard_type = dacs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = dacs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(dacs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < sandhs.length; i++) {
                    if (sandhs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = sandhs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = sandhs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = sandhs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(sandhs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = sandhs[i].elm.rotation;
                        clipboard_entry.clipboard_type = sandhs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = sandhs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(sandhs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < pwms.length; i++) {
                    if (pwms[i].multi_selected) {
                        clipboard_entry.clipboard_flip = pwms[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = pwms[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = pwms[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(pwms[i].elm.properties);
                        clipboard_entry.clipboard_rotation = pwms[i].elm.rotation;
                        clipboard_entry.clipboard_type = pwms[i].elm.type;
                        clipboard_entry.clipboard_reference_id = pwms[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(pwms[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < integrators.length; i++) {
                    if (integrators[i].multi_selected) {
                        clipboard_entry.clipboard_flip = integrators[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = integrators[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = integrators[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(integrators[i].elm.properties);
                        clipboard_entry.clipboard_rotation = integrators[i].elm.rotation;
                        clipboard_entry.clipboard_type = integrators[i].elm.type;
                        clipboard_entry.clipboard_reference_id = integrators[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(integrators[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < differentiators.length; i++) {
                    if (differentiators[i].multi_selected) {
                        clipboard_entry.clipboard_flip = differentiators[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = differentiators[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = differentiators[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(differentiators[i].elm.properties);
                        clipboard_entry.clipboard_rotation = differentiators[i].elm.rotation;
                        clipboard_entry.clipboard_type = differentiators[i].elm.type;
                        clipboard_entry.clipboard_reference_id = differentiators[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(differentiators[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < lowpasses.length; i++) {
                    if (lowpasses[i].multi_selected) {
                        clipboard_entry.clipboard_flip = lowpasses[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = lowpasses[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = lowpasses[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(lowpasses[i].elm.properties);
                        clipboard_entry.clipboard_rotation = lowpasses[i].elm.rotation;
                        clipboard_entry.clipboard_type = lowpasses[i].elm.type;
                        clipboard_entry.clipboard_reference_id = lowpasses[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(lowpasses[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < highpasses.length; i++) {
                    if (highpasses[i].multi_selected) {
                        clipboard_entry.clipboard_flip = highpasses[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = highpasses[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = highpasses[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(highpasses[i].elm.properties);
                        clipboard_entry.clipboard_rotation = highpasses[i].elm.rotation;
                        clipboard_entry.clipboard_type = highpasses[i].elm.type;
                        clipboard_entry.clipboard_reference_id = highpasses[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(highpasses[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < relays.length; i++) {
                    if (relays[i].multi_selected) {
                        clipboard_entry.clipboard_flip = relays[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = relays[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = relays[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(relays[i].elm.properties);
                        clipboard_entry.clipboard_rotation = relays[i].elm.rotation;
                        clipboard_entry.clipboard_type = relays[i].elm.type;
                        clipboard_entry.clipboard_reference_id = relays[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(relays[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < pids.length; i++) {
                    if (pids[i].multi_selected) {
                        clipboard_entry.clipboard_flip = pids[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = pids[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = pids[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(pids[i].elm.properties);
                        clipboard_entry.clipboard_rotation = pids[i].elm.rotation;
                        clipboard_entry.clipboard_type = pids[i].elm.type;
                        clipboard_entry.clipboard_reference_id = pids[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(pids[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < luts.length; i++) {
                    if (luts[i].multi_selected) {
                        clipboard_entry.clipboard_flip = luts[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = luts[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = luts[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(luts[i].elm.properties);
                        clipboard_entry.clipboard_rotation = luts[i].elm.rotation;
                        clipboard_entry.clipboard_type = luts[i].elm.type;
                        clipboard_entry.clipboard_reference_id = luts[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(luts[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vcrs.length; i++) {
                    if (vcrs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vcrs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vcrs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vcrs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vcrs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vcrs[i].elm.rotation;
                        clipboard_entry.clipboard_type = vcrs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vcrs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vcrs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vccas.length; i++) {
                    if (vccas[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vccas[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vccas[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vccas[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vccas[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vccas[i].elm.rotation;
                        clipboard_entry.clipboard_type = vccas[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vccas[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vccas[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < vcls.length; i++) {
                    if (vcls[i].multi_selected) {
                        clipboard_entry.clipboard_flip = vcls[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = vcls[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = vcls[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(vcls[i].elm.properties);
                        clipboard_entry.clipboard_rotation = vcls[i].elm.rotation;
                        clipboard_entry.clipboard_type = vcls[i].elm.type;
                        clipboard_entry.clipboard_reference_id = vcls[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(vcls[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < grts.length; i++) {
                    if (grts[i].multi_selected) {
                        clipboard_entry.clipboard_flip = grts[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = grts[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = grts[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(grts[i].elm.properties);
                        clipboard_entry.clipboard_rotation = grts[i].elm.rotation;
                        clipboard_entry.clipboard_type = grts[i].elm.type;
                        clipboard_entry.clipboard_reference_id = grts[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(grts[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < tptzs.length; i++) {
                    if (tptzs[i].multi_selected) {
                        clipboard_entry.clipboard_flip = tptzs[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = tptzs[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = tptzs[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(tptzs[i].elm.properties);
                        clipboard_entry.clipboard_rotation = tptzs[i].elm.rotation;
                        clipboard_entry.clipboard_type = tptzs[i].elm.type;
                        clipboard_entry.clipboard_reference_id = tptzs[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(tptzs[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                for (var i = 0; i < transformers.length; i++) {
                    if (transformers[i].multi_selected) {
                        clipboard_entry.clipboard_flip = transformers[i].elm.flip;
                        clipboard_entry.clipboard_location_dx = transformers[i].bounds.get_center_x() - multi_select_manager.selected_components_bounds.get_center_x();
                        clipboard_entry.clipboard_location_dy = transformers[i].bounds.get_center_y() - multi_select_manager.selected_components_bounds.get_center_y();
                        clipboard_entry.clipboard_property = global.utils.copy(transformers[i].elm.properties);
                        clipboard_entry.clipboard_rotation = transformers[i].elm.rotation;
                        clipboard_entry.clipboard_type = transformers[i].elm.type;
                        clipboard_entry.clipboard_reference_id = transformers[i].elm.id;
                        clipboard_entry.clipboard_wire_references = global.utils.copy(transformers[i].wire_reference);
                        global.variables.clipboard_data.push(global.utils.copy(clipboard_entry));
                    }
                }
                /* <!-- END AUTOMATICALLY GENERATED !--> */
                toast.set_text(language_manager.COPIED_SELECTION[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
                toast.show(global.COLORS.GENERAL_GREEN_COLOR);
            }
        }
    }
    search_wire_links(wire_links, id) {
        let new_wire_ref = -1;
        for (var i = 0; i < wire_links.length; i++) {
            if (wire_links[i].old_wire_ref === id) {
                new_wire_ref = wire_links[i].new_wire_ref;
            }
        }
        return new_wire_ref;
    }
    handle_paste_shortcut(key_event) {
        this.shift = key_event['shift'];
        this.command = key_event['event'].code;
        this.caps = key_event['caps'];
        if (this.command === this.SHORTCUT_PASTE && !global.flags.flag_history_lock) {
            global.flags.flag_build_element = true;
            this.temp_history_snapshot = engine_functions.history_snapshot();
            let id = -1;
            let index = -1;
            let multi_selected = false;
            global.flags.flag_history_lock = true;
            if (global.variables.clipboard_data.length > 1) {
                multi_selected = true;
            }
            if (global.variables.selected) {
                global.variables.selected_id = global.CONSTANTS.NULL;
                global.variables.selected_type = -1;
                global.variables.selected_bounds = global.CONSTANTS.NULL;
                global.variables.selected_properties = global.CONSTANTS.NULL;
                global.variables.selected = false;
            }
            /* #INSERT_GENERATE_RESET_MULTI_SELECT_ELEMENTS# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            for (var i = resistors.length - 1; i > -1; i--) {
                resistors[i].multi_selected = false;
            }
            for (var i = capacitors.length - 1; i > -1; i--) {
                capacitors[i].multi_selected = false;
            }
            for (var i = inductors.length - 1; i > -1; i--) {
                inductors[i].multi_selected = false;
            }
            for (var i = grounds.length - 1; i > -1; i--) {
                grounds[i].multi_selected = false;
            }
            for (var i = dcsources.length - 1; i > -1; i--) {
                dcsources[i].multi_selected = false;
            }
            for (var i = dccurrents.length - 1; i > -1; i--) {
                dccurrents[i].multi_selected = false;
            }
            for (var i = acsources.length - 1; i > -1; i--) {
                acsources[i].multi_selected = false;
            }
            for (var i = accurrents.length - 1; i > -1; i--) {
                accurrents[i].multi_selected = false;
            }
            for (var i = squarewaves.length - 1; i > -1; i--) {
                squarewaves[i].multi_selected = false;
            }
            for (var i = sawwaves.length - 1; i > -1; i--) {
                sawwaves[i].multi_selected = false;
            }
            for (var i = trianglewaves.length - 1; i > -1; i--) {
                trianglewaves[i].multi_selected = false;
            }
            for (var i = constants.length - 1; i > -1; i--) {
                constants[i].multi_selected = false;
            }
            for (var i = wires.length - 1; i > -1; i--) {
                wires[i].multi_selected = false;
            }
            for (var i = nets.length - 1; i > -1; i--) {
                nets[i].multi_selected = false;
            }
            for (var i = notes.length - 1; i > -1; i--) {
                notes[i].multi_selected = false;
            }
            for (var i = rails.length - 1; i > -1; i--) {
                rails[i].multi_selected = false;
            }
            for (var i = voltmeters.length - 1; i > -1; i--) {
                voltmeters[i].multi_selected = false;
            }
            for (var i = ohmmeters.length - 1; i > -1; i--) {
                ohmmeters[i].multi_selected = false;
            }
            for (var i = ammeters.length - 1; i > -1; i--) {
                ammeters[i].multi_selected = false;
            }
            for (var i = wattmeters.length - 1; i > -1; i--) {
                wattmeters[i].multi_selected = false;
            }
            for (var i = fuses.length - 1; i > -1; i--) {
                fuses[i].multi_selected = false;
            }
            for (var i = spsts.length - 1; i > -1; i--) {
                spsts[i].multi_selected = false;
            }
            for (var i = spdts.length - 1; i > -1; i--) {
                spdts[i].multi_selected = false;
            }
            for (var i = nots.length - 1; i > -1; i--) {
                nots[i].multi_selected = false;
            }
            for (var i = diodes.length - 1; i > -1; i--) {
                diodes[i].multi_selected = false;
            }
            for (var i = leds.length - 1; i > -1; i--) {
                leds[i].multi_selected = false;
            }
            for (var i = zeners.length - 1; i > -1; i--) {
                zeners[i].multi_selected = false;
            }
            for (var i = potentiometers.length - 1; i > -1; i--) {
                potentiometers[i].multi_selected = false;
            }
            for (var i = ands.length - 1; i > -1; i--) {
                ands[i].multi_selected = false;
            }
            for (var i = ors.length - 1; i > -1; i--) {
                ors[i].multi_selected = false;
            }
            for (var i = nands.length - 1; i > -1; i--) {
                nands[i].multi_selected = false;
            }
            for (var i = nors.length - 1; i > -1; i--) {
                nors[i].multi_selected = false;
            }
            for (var i = xors.length - 1; i > -1; i--) {
                xors[i].multi_selected = false;
            }
            for (var i = xnors.length - 1; i > -1; i--) {
                xnors[i].multi_selected = false;
            }
            for (var i = dffs.length - 1; i > -1; i--) {
                dffs[i].multi_selected = false;
            }
            for (var i = vsats.length - 1; i > -1; i--) {
                vsats[i].multi_selected = false;
            }
            for (var i = adders.length - 1; i > -1; i--) {
                adders[i].multi_selected = false;
            }
            for (var i = subtractors.length - 1; i > -1; i--) {
                subtractors[i].multi_selected = false;
            }
            for (var i = multipliers.length - 1; i > -1; i--) {
                multipliers[i].multi_selected = false;
            }
            for (var i = dividers.length - 1; i > -1; i--) {
                dividers[i].multi_selected = false;
            }
            for (var i = gains.length - 1; i > -1; i--) {
                gains[i].multi_selected = false;
            }
            for (var i = absvals.length - 1; i > -1; i--) {
                absvals[i].multi_selected = false;
            }
            for (var i = vcsws.length - 1; i > -1; i--) {
                vcsws[i].multi_selected = false;
            }
            for (var i = vcvss.length - 1; i > -1; i--) {
                vcvss[i].multi_selected = false;
            }
            for (var i = vccss.length - 1; i > -1; i--) {
                vccss[i].multi_selected = false;
            }
            for (var i = cccss.length - 1; i > -1; i--) {
                cccss[i].multi_selected = false;
            }
            for (var i = ccvss.length - 1; i > -1; i--) {
                ccvss[i].multi_selected = false;
            }
            for (var i = opamps.length - 1; i > -1; i--) {
                opamps[i].multi_selected = false;
            }
            for (var i = nmosfets.length - 1; i > -1; i--) {
                nmosfets[i].multi_selected = false;
            }
            for (var i = pmosfets.length - 1; i > -1; i--) {
                pmosfets[i].multi_selected = false;
            }
            for (var i = npns.length - 1; i > -1; i--) {
                npns[i].multi_selected = false;
            }
            for (var i = pnps.length - 1; i > -1; i--) {
                pnps[i].multi_selected = false;
            }
            for (var i = adcs.length - 1; i > -1; i--) {
                adcs[i].multi_selected = false;
            }
            for (var i = dacs.length - 1; i > -1; i--) {
                dacs[i].multi_selected = false;
            }
            for (var i = sandhs.length - 1; i > -1; i--) {
                sandhs[i].multi_selected = false;
            }
            for (var i = pwms.length - 1; i > -1; i--) {
                pwms[i].multi_selected = false;
            }
            for (var i = integrators.length - 1; i > -1; i--) {
                integrators[i].multi_selected = false;
            }
            for (var i = differentiators.length - 1; i > -1; i--) {
                differentiators[i].multi_selected = false;
            }
            for (var i = lowpasses.length - 1; i > -1; i--) {
                lowpasses[i].multi_selected = false;
            }
            for (var i = highpasses.length - 1; i > -1; i--) {
                highpasses[i].multi_selected = false;
            }
            for (var i = relays.length - 1; i > -1; i--) {
                relays[i].multi_selected = false;
            }
            for (var i = pids.length - 1; i > -1; i--) {
                pids[i].multi_selected = false;
            }
            for (var i = luts.length - 1; i > -1; i--) {
                luts[i].multi_selected = false;
            }
            for (var i = vcrs.length - 1; i > -1; i--) {
                vcrs[i].multi_selected = false;
            }
            for (var i = vccas.length - 1; i > -1; i--) {
                vccas[i].multi_selected = false;
            }
            for (var i = vcls.length - 1; i > -1; i--) {
                vcls[i].multi_selected = false;
            }
            for (var i = grts.length - 1; i > -1; i--) {
                grts[i].multi_selected = false;
            }
            for (var i = tptzs.length - 1; i > -1; i--) {
                tptzs[i].multi_selected = false;
            }
            for (var i = transformers.length - 1; i > -1; i--) {
                transformers[i].multi_selected = false;
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
            let next_wire_id = -1;
            let wire_links = [];
            let wire_link = {
                old_wire_ref: -1,
                new_wire_ref: -1
            };
            if (global.variables.clipboard_data.length > 0) {
                for (var j = 0; j < global.variables.clipboard_data.length; j++) {
                    if (global.utils.not_null(global.variables.clipboard_data[j].clipboard_type) && global.utils.not_null(global.variables.clipboard_data[j].clipboard_property)) {
                        /* #INSERT_GENERATE_PASTE_ELEMENT# */
                        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                        if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                            id = engine_functions.get_resistor_assignment();
                            engine_functions.add_resistor();
                            index = engine_functions.get_resistor(id);
                            if (index > -1 && index < resistors.length) {
                                resistors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                resistors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                resistors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                resistors[index].multi_selected = multi_selected;
                                resistors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                            id = engine_functions.get_capacitor_assignment();
                            engine_functions.add_capacitor();
                            index = engine_functions.get_capacitor(id);
                            if (index > -1 && index < capacitors.length) {
                                capacitors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                capacitors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                capacitors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                capacitors[index].multi_selected = multi_selected;
                                capacitors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                            id = engine_functions.get_inductor_assignment();
                            engine_functions.add_inductor();
                            index = engine_functions.get_inductor(id);
                            if (index > -1 && index < inductors.length) {
                                inductors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                inductors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                inductors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                inductors[index].multi_selected = multi_selected;
                                inductors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                            id = engine_functions.get_ground_assignment();
                            engine_functions.add_ground();
                            index = engine_functions.get_ground(id);
                            if (index > -1 && index < grounds.length) {
                                grounds[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                grounds[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                grounds[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                grounds[index].multi_selected = multi_selected;
                                grounds[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                            id = engine_functions.get_dcsource_assignment();
                            engine_functions.add_dcsource();
                            index = engine_functions.get_dcsource(id);
                            if (index > -1 && index < dcsources.length) {
                                dcsources[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                dcsources[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                dcsources[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                dcsources[index].multi_selected = multi_selected;
                                dcsources[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                            id = engine_functions.get_dccurrent_assignment();
                            engine_functions.add_dccurrent();
                            index = engine_functions.get_dccurrent(id);
                            if (index > -1 && index < dccurrents.length) {
                                dccurrents[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                dccurrents[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                dccurrents[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                dccurrents[index].multi_selected = multi_selected;
                                dccurrents[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                            id = engine_functions.get_acsource_assignment();
                            engine_functions.add_acsource();
                            index = engine_functions.get_acsource(id);
                            if (index > -1 && index < acsources.length) {
                                acsources[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                acsources[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                acsources[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                acsources[index].multi_selected = multi_selected;
                                acsources[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                            id = engine_functions.get_accurrent_assignment();
                            engine_functions.add_accurrent();
                            index = engine_functions.get_accurrent(id);
                            if (index > -1 && index < accurrents.length) {
                                accurrents[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                accurrents[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                accurrents[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                accurrents[index].multi_selected = multi_selected;
                                accurrents[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                            id = engine_functions.get_squarewave_assignment();
                            engine_functions.add_squarewave();
                            index = engine_functions.get_squarewave(id);
                            if (index > -1 && index < squarewaves.length) {
                                squarewaves[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                squarewaves[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                squarewaves[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                squarewaves[index].multi_selected = multi_selected;
                                squarewaves[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SAW) {
                            id = engine_functions.get_sawwave_assignment();
                            engine_functions.add_sawwave();
                            index = engine_functions.get_sawwave(id);
                            if (index > -1 && index < sawwaves.length) {
                                sawwaves[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                sawwaves[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                sawwaves[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                sawwaves[index].multi_selected = multi_selected;
                                sawwaves[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TRI) {
                            id = engine_functions.get_trianglewave_assignment();
                            engine_functions.add_trianglewave();
                            index = engine_functions.get_trianglewave(id);
                            if (index > -1 && index < trianglewaves.length) {
                                trianglewaves[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                trianglewaves[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                trianglewaves[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                trianglewaves[index].multi_selected = multi_selected;
                                trianglewaves[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                            id = engine_functions.get_constant_assignment();
                            engine_functions.add_constant();
                            index = engine_functions.get_constant(id);
                            if (index > -1 && index < constants.length) {
                                constants[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                constants[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                constants[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                constants[index].multi_selected = multi_selected;
                                constants[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NET) {
                            id = engine_functions.get_net_assignment();
                            engine_functions.add_net();
                            index = engine_functions.get_net(id);
                            if (index > -1 && index < nets.length) {
                                nets[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                nets[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                nets[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                nets[index].multi_selected = multi_selected;
                                nets[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                            id = engine_functions.get_note_assignment();
                            engine_functions.add_note();
                            index = engine_functions.get_note(id);
                            if (index > -1 && index < notes.length) {
                                notes[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                notes[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                notes[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                notes[index].multi_selected = multi_selected;
                                notes[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                            id = engine_functions.get_rail_assignment();
                            engine_functions.add_rail();
                            index = engine_functions.get_rail(id);
                            if (index > -1 && index < rails.length) {
                                rails[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                rails[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                rails[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                rails[index].multi_selected = multi_selected;
                                rails[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                            id = engine_functions.get_voltmeter_assignment();
                            engine_functions.add_voltmeter();
                            index = engine_functions.get_voltmeter(id);
                            if (index > -1 && index < voltmeters.length) {
                                voltmeters[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                voltmeters[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                voltmeters[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                voltmeters[index].multi_selected = multi_selected;
                                voltmeters[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                            id = engine_functions.get_ohmmeter_assignment();
                            engine_functions.add_ohmmeter();
                            index = engine_functions.get_ohmmeter(id);
                            if (index > -1 && index < ohmmeters.length) {
                                ohmmeters[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                ohmmeters[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                ohmmeters[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                ohmmeters[index].multi_selected = multi_selected;
                                ohmmeters[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                            id = engine_functions.get_ammeter_assignment();
                            engine_functions.add_ammeter();
                            index = engine_functions.get_ammeter(id);
                            if (index > -1 && index < ammeters.length) {
                                ammeters[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                ammeters[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                ammeters[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                ammeters[index].multi_selected = multi_selected;
                                ammeters[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                            id = engine_functions.get_wattmeter_assignment();
                            engine_functions.add_wattmeter();
                            index = engine_functions.get_wattmeter(id);
                            if (index > -1 && index < wattmeters.length) {
                                wattmeters[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                wattmeters[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                wattmeters[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                wattmeters[index].multi_selected = multi_selected;
                                wattmeters[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                            id = engine_functions.get_fuse_assignment();
                            engine_functions.add_fuse();
                            index = engine_functions.get_fuse(id);
                            if (index > -1 && index < fuses.length) {
                                fuses[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                fuses[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                fuses[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                fuses[index].multi_selected = multi_selected;
                                fuses[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SPST) {
                            id = engine_functions.get_spst_assignment();
                            engine_functions.add_spst();
                            index = engine_functions.get_spst(id);
                            if (index > -1 && index < spsts.length) {
                                spsts[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                spsts[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                spsts[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                spsts[index].multi_selected = multi_selected;
                                spsts[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                            id = engine_functions.get_spdt_assignment();
                            engine_functions.add_spdt();
                            index = engine_functions.get_spdt(id);
                            if (index > -1 && index < spdts.length) {
                                spdts[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                spdts[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                spdts[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                spdts[index].multi_selected = multi_selected;
                                spdts[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOT) {
                            id = engine_functions.get_not_assignment();
                            engine_functions.add_not();
                            index = engine_functions.get_not(id);
                            if (index > -1 && index < nots.length) {
                                nots[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                nots[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                nots[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                nots[index].multi_selected = multi_selected;
                                nots[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                            id = engine_functions.get_diode_assignment();
                            engine_functions.add_diode();
                            index = engine_functions.get_diode(id);
                            if (index > -1 && index < diodes.length) {
                                diodes[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                diodes[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                diodes[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                diodes[index].multi_selected = multi_selected;
                                diodes[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LED) {
                            id = engine_functions.get_led_assignment();
                            engine_functions.add_led();
                            index = engine_functions.get_led(id);
                            if (index > -1 && index < leds.length) {
                                leds[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                leds[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                leds[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                leds[index].multi_selected = multi_selected;
                                leds[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                            id = engine_functions.get_zener_assignment();
                            engine_functions.add_zener();
                            index = engine_functions.get_zener(id);
                            if (index > -1 && index < zeners.length) {
                                zeners[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                zeners[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                zeners[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                zeners[index].multi_selected = multi_selected;
                                zeners[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                            id = engine_functions.get_potentiometer_assignment();
                            engine_functions.add_potentiometer();
                            index = engine_functions.get_potentiometer(id);
                            if (index > -1 && index < potentiometers.length) {
                                potentiometers[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                potentiometers[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                potentiometers[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                potentiometers[index].multi_selected = multi_selected;
                                potentiometers[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_AND) {
                            id = engine_functions.get_and_assignment();
                            engine_functions.add_and();
                            index = engine_functions.get_and(id);
                            if (index > -1 && index < ands.length) {
                                ands[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                ands[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                ands[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                ands[index].multi_selected = multi_selected;
                                ands[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OR) {
                            id = engine_functions.get_or_assignment();
                            engine_functions.add_or();
                            index = engine_functions.get_or(id);
                            if (index > -1 && index < ors.length) {
                                ors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                ors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                ors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                ors[index].multi_selected = multi_selected;
                                ors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NAND) {
                            id = engine_functions.get_nand_assignment();
                            engine_functions.add_nand();
                            index = engine_functions.get_nand(id);
                            if (index > -1 && index < nands.length) {
                                nands[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                nands[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                nands[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                nands[index].multi_selected = multi_selected;
                                nands[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOR) {
                            id = engine_functions.get_nor_assignment();
                            engine_functions.add_nor();
                            index = engine_functions.get_nor(id);
                            if (index > -1 && index < nors.length) {
                                nors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                nors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                nors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                nors[index].multi_selected = multi_selected;
                                nors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_XOR) {
                            id = engine_functions.get_xor_assignment();
                            engine_functions.add_xor();
                            index = engine_functions.get_xor(id);
                            if (index > -1 && index < xors.length) {
                                xors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                xors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                xors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                xors[index].multi_selected = multi_selected;
                                xors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                            id = engine_functions.get_xnor_assignment();
                            engine_functions.add_xnor();
                            index = engine_functions.get_xnor(id);
                            if (index > -1 && index < xnors.length) {
                                xnors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                xnors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                xnors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                xnors[index].multi_selected = multi_selected;
                                xnors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DFF) {
                            id = engine_functions.get_dff_assignment();
                            engine_functions.add_dff();
                            index = engine_functions.get_dff(id);
                            if (index > -1 && index < dffs.length) {
                                dffs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                dffs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                dffs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                dffs[index].multi_selected = multi_selected;
                                dffs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                            id = engine_functions.get_vsat_assignment();
                            engine_functions.add_vsat();
                            index = engine_functions.get_vsat(id);
                            if (index > -1 && index < vsats.length) {
                                vsats[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vsats[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vsats[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vsats[index].multi_selected = multi_selected;
                                vsats[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ADD) {
                            id = engine_functions.get_adder_assignment();
                            engine_functions.add_adder();
                            index = engine_functions.get_adder(id);
                            if (index > -1 && index < adders.length) {
                                adders[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                adders[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                adders[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                adders[index].multi_selected = multi_selected;
                                adders[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SUB) {
                            id = engine_functions.get_subtractor_assignment();
                            engine_functions.add_subtractor();
                            index = engine_functions.get_subtractor(id);
                            if (index > -1 && index < subtractors.length) {
                                subtractors[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                subtractors[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                subtractors[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                subtractors[index].multi_selected = multi_selected;
                                subtractors[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_MUL) {
                            id = engine_functions.get_multiplier_assignment();
                            engine_functions.add_multiplier();
                            index = engine_functions.get_multiplier(id);
                            if (index > -1 && index < multipliers.length) {
                                multipliers[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                multipliers[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                multipliers[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                multipliers[index].multi_selected = multi_selected;
                                multipliers[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIV) {
                            id = engine_functions.get_divider_assignment();
                            engine_functions.add_divider();
                            index = engine_functions.get_divider(id);
                            if (index > -1 && index < dividers.length) {
                                dividers[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                dividers[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                dividers[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                dividers[index].multi_selected = multi_selected;
                                dividers[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                            id = engine_functions.get_gain_assignment();
                            engine_functions.add_gain();
                            index = engine_functions.get_gain(id);
                            if (index > -1 && index < gains.length) {
                                gains[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                gains[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                gains[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                gains[index].multi_selected = multi_selected;
                                gains[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ABS) {
                            id = engine_functions.get_absval_assignment();
                            engine_functions.add_absval();
                            index = engine_functions.get_absval(id);
                            if (index > -1 && index < absvals.length) {
                                absvals[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                absvals[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                absvals[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                absvals[index].multi_selected = multi_selected;
                                absvals[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                            id = engine_functions.get_vcsw_assignment();
                            engine_functions.add_vcsw();
                            index = engine_functions.get_vcsw(id);
                            if (index > -1 && index < vcsws.length) {
                                vcsws[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vcsws[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vcsws[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vcsws[index].multi_selected = multi_selected;
                                vcsws[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                            id = engine_functions.get_vcvs_assignment();
                            engine_functions.add_vcvs();
                            index = engine_functions.get_vcvs(id);
                            if (index > -1 && index < vcvss.length) {
                                vcvss[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vcvss[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vcvss[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vcvss[index].multi_selected = multi_selected;
                                vcvss[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                            id = engine_functions.get_vccs_assignment();
                            engine_functions.add_vccs();
                            index = engine_functions.get_vccs(id);
                            if (index > -1 && index < vccss.length) {
                                vccss[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vccss[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vccss[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vccss[index].multi_selected = multi_selected;
                                vccss[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                            id = engine_functions.get_cccs_assignment();
                            engine_functions.add_cccs();
                            index = engine_functions.get_cccs(id);
                            if (index > -1 && index < cccss.length) {
                                cccss[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                cccss[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                cccss[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                cccss[index].multi_selected = multi_selected;
                                cccss[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                            id = engine_functions.get_ccvs_assignment();
                            engine_functions.add_ccvs();
                            index = engine_functions.get_ccvs(id);
                            if (index > -1 && index < ccvss.length) {
                                ccvss[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                ccvss[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                ccvss[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                ccvss[index].multi_selected = multi_selected;
                                ccvss[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                            id = engine_functions.get_opamp_assignment();
                            engine_functions.add_opamp();
                            index = engine_functions.get_opamp(id);
                            if (index > -1 && index < opamps.length) {
                                opamps[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                opamps[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                opamps[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                opamps[index].multi_selected = multi_selected;
                                opamps[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                            id = engine_functions.get_nmosfet_assignment();
                            engine_functions.add_nmosfet();
                            index = engine_functions.get_nmosfet(id);
                            if (index > -1 && index < nmosfets.length) {
                                nmosfets[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                nmosfets[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                nmosfets[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                nmosfets[index].multi_selected = multi_selected;
                                nmosfets[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                            id = engine_functions.get_pmosfet_assignment();
                            engine_functions.add_pmosfet();
                            index = engine_functions.get_pmosfet(id);
                            if (index > -1 && index < pmosfets.length) {
                                pmosfets[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                pmosfets[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                pmosfets[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                pmosfets[index].multi_selected = multi_selected;
                                pmosfets[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NPN) {
                            id = engine_functions.get_npn_assignment();
                            engine_functions.add_npn();
                            index = engine_functions.get_npn(id);
                            if (index > -1 && index < npns.length) {
                                npns[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                npns[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                npns[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                npns[index].multi_selected = multi_selected;
                                npns[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PNP) {
                            id = engine_functions.get_pnp_assignment();
                            engine_functions.add_pnp();
                            index = engine_functions.get_pnp(id);
                            if (index > -1 && index < pnps.length) {
                                pnps[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                pnps[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                pnps[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                pnps[index].multi_selected = multi_selected;
                                pnps[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ADC) {
                            id = engine_functions.get_adc_assignment();
                            engine_functions.add_adc();
                            index = engine_functions.get_adc(id);
                            if (index > -1 && index < adcs.length) {
                                adcs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                adcs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                adcs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                adcs[index].multi_selected = multi_selected;
                                adcs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DAC) {
                            id = engine_functions.get_dac_assignment();
                            engine_functions.add_dac();
                            index = engine_functions.get_dac(id);
                            if (index > -1 && index < dacs.length) {
                                dacs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                dacs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                dacs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                dacs[index].multi_selected = multi_selected;
                                dacs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SAH) {
                            id = engine_functions.get_samplers_assignment();
                            engine_functions.add_samplers();
                            index = engine_functions.get_samplers(id);
                            if (index > -1 && index < sandhs.length) {
                                sandhs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                sandhs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                sandhs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                sandhs[index].multi_selected = multi_selected;
                                sandhs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PWM) {
                            id = engine_functions.get_pwm_assignment();
                            engine_functions.add_pwm();
                            index = engine_functions.get_pwm(id);
                            if (index > -1 && index < pwms.length) {
                                pwms[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                pwms[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                pwms[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                pwms[index].multi_selected = multi_selected;
                                pwms[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                            id = engine_functions.get_integrator_assignment();
                            engine_functions.add_integrator();
                            index = engine_functions.get_integrator(id);
                            if (index > -1 && index < integrators.length) {
                                integrators[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                integrators[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                integrators[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                integrators[index].multi_selected = multi_selected;
                                integrators[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                            id = engine_functions.get_differentiator_assignment();
                            engine_functions.add_differentiator();
                            index = engine_functions.get_differentiator(id);
                            if (index > -1 && index < differentiators.length) {
                                differentiators[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                differentiators[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                differentiators[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                differentiators[index].multi_selected = multi_selected;
                                differentiators[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LPF) {
                            id = engine_functions.get_lowpass_assignment();
                            engine_functions.add_lowpass();
                            index = engine_functions.get_lowpass(id);
                            if (index > -1 && index < lowpasses.length) {
                                lowpasses[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                lowpasses[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                lowpasses[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                lowpasses[index].multi_selected = multi_selected;
                                lowpasses[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_HPF) {
                            id = engine_functions.get_highpass_assignment();
                            engine_functions.add_highpass();
                            index = engine_functions.get_highpass(id);
                            if (index > -1 && index < highpasses.length) {
                                highpasses[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                highpasses[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                highpasses[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                highpasses[index].multi_selected = multi_selected;
                                highpasses[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_REL) {
                            id = engine_functions.get_relay_assignment();
                            engine_functions.add_relay();
                            index = engine_functions.get_relay(id);
                            if (index > -1 && index < relays.length) {
                                relays[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                relays[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                relays[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                relays[index].multi_selected = multi_selected;
                                relays[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PID) {
                            id = engine_functions.get_pid_assignment();
                            engine_functions.add_pid();
                            index = engine_functions.get_pid(id);
                            if (index > -1 && index < pids.length) {
                                pids[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                pids[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                pids[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                pids[index].multi_selected = multi_selected;
                                pids[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LUT) {
                            id = engine_functions.get_lut_assignment();
                            engine_functions.add_lut();
                            index = engine_functions.get_lut(id);
                            if (index > -1 && index < luts.length) {
                                luts[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                luts[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                luts[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                luts[index].multi_selected = multi_selected;
                                luts[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCR) {
                            id = engine_functions.get_vcr_assignment();
                            engine_functions.add_vcr();
                            index = engine_functions.get_vcr(id);
                            if (index > -1 && index < vcrs.length) {
                                vcrs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vcrs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vcrs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vcrs[index].multi_selected = multi_selected;
                                vcrs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                            id = engine_functions.get_vcca_assignment();
                            engine_functions.add_vcca();
                            index = engine_functions.get_vcca(id);
                            if (index > -1 && index < vccas.length) {
                                vccas[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vccas[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vccas[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vccas[index].multi_selected = multi_selected;
                                vccas[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCL) {
                            id = engine_functions.get_vcl_assignment();
                            engine_functions.add_vcl();
                            index = engine_functions.get_vcl(id);
                            if (index > -1 && index < vcls.length) {
                                vcls[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                vcls[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                vcls[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                vcls[index].multi_selected = multi_selected;
                                vcls[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GRT) {
                            id = engine_functions.get_grt_assignment();
                            engine_functions.add_grt();
                            index = engine_functions.get_grt(id);
                            if (index > -1 && index < grts.length) {
                                grts[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                grts[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                grts[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                grts[index].multi_selected = multi_selected;
                                grts[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                            id = engine_functions.get_tptz_assignment();
                            engine_functions.add_tptz();
                            index = engine_functions.get_tptz(id);
                            if (index > -1 && index < tptzs.length) {
                                tptzs[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                tptzs[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                tptzs[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                tptzs[index].multi_selected = multi_selected;
                                tptzs[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                            id = engine_functions.get_transformer_assignment();
                            engine_functions.add_transformer();
                            index = engine_functions.get_transformer(id);
                            if (index > -1 && index < transformers.length) {
                                transformers[index].elm.set_properties(global.utils.copy(global.variables.clipboard_data[j].clipboard_property));
                                transformers[index].elm.set_rotation(global.variables.clipboard_data[j].clipboard_rotation);
                                transformers[index].elm.set_flip(global.variables.clipboard_data[j].clipboard_flip);
                                transformers[index].multi_selected = multi_selected;
                                transformers[index].move_element(global.variables.clipboard_data[j].clipboard_location_dx, global.variables.clipboard_data[j].clipboard_location_dy);
                                global.variables.clipboard_data[j].clipboard_new_reference_id = index;
                            }
                        }
                        /* <!-- END AUTOMATICALLY GENERATED !--> */
                    }
                }
                if (global.variables.clipboard_data.length > 1) {
                    index = -1;
                    let elm_index = -1;
                    let wire_reference = {
                        wire_id: -1,
                        anchor_point: -1,
                        linkage: -1
                    };
                    let existing_wire_id = -1;
                    for (var j = 0; j < global.variables.clipboard_data.length; j++) {
                        if (global.utils.not_null(global.variables.clipboard_data[j].clipboard_type) && global.utils.not_null(global.variables.clipboard_data[j].clipboard_property)) {
                            /* #INSERT_GENERATE_MULTI_PASTE_ELEMENT# */
                            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                            if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_RESISTOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_resistor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < resistors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    resistors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    resistors[elm_index].anchor_wires();
                                                    resistors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_resistor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < resistors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    resistors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    resistors[elm_index].anchor_wires();
                                                    resistors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_capacitor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < capacitors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    capacitors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    capacitors[elm_index].anchor_wires();
                                                    capacitors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_capacitor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < capacitors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    capacitors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    capacitors[elm_index].anchor_wires();
                                                    capacitors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_inductor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < inductors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    inductors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    inductors[elm_index].anchor_wires();
                                                    inductors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_inductor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < inductors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    inductors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    inductors[elm_index].anchor_wires();
                                                    inductors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GROUND) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_ground(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < grounds.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    grounds[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    grounds[elm_index].anchor_wires();
                                                    grounds[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_ground(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < grounds.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    grounds[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    grounds[elm_index].anchor_wires();
                                                    grounds[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_dcsource(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < dcsources.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dcsources[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dcsources[elm_index].anchor_wires();
                                                    dcsources[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_dcsource(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < dcsources.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dcsources[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dcsources[elm_index].anchor_wires();
                                                    dcsources[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_dccurrent(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < dccurrents.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dccurrents[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dccurrents[elm_index].anchor_wires();
                                                    dccurrents[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_dccurrent(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < dccurrents.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dccurrents[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dccurrents[elm_index].anchor_wires();
                                                    dccurrents[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_acsource(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < acsources.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    acsources[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    acsources[elm_index].anchor_wires();
                                                    acsources[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_acsource(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < acsources.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    acsources[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    acsources[elm_index].anchor_wires();
                                                    acsources[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_accurrent(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < accurrents.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    accurrents[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    accurrents[elm_index].anchor_wires();
                                                    accurrents[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_accurrent(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < accurrents.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    accurrents[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    accurrents[elm_index].anchor_wires();
                                                    accurrents[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_squarewave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < squarewaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    squarewaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    squarewaves[elm_index].anchor_wires();
                                                    squarewaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_squarewave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < squarewaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    squarewaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    squarewaves[elm_index].anchor_wires();
                                                    squarewaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SAW) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_sawwave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < sawwaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    sawwaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    sawwaves[elm_index].anchor_wires();
                                                    sawwaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_sawwave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < sawwaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    sawwaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    sawwaves[elm_index].anchor_wires();
                                                    sawwaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TRI) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_trianglewave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < trianglewaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    trianglewaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    trianglewaves[elm_index].anchor_wires();
                                                    trianglewaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_trianglewave(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < trianglewaves.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    trianglewaves[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    trianglewaves[elm_index].anchor_wires();
                                                    trianglewaves[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CONSTANT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_constant(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < constants.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    constants[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    constants[elm_index].anchor_wires();
                                                    constants[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_constant(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < constants.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    constants[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    constants[elm_index].anchor_wires();
                                                    constants[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NET) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_net(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < nets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nets[elm_index].anchor_wires();
                                                    nets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_net(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < nets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nets[elm_index].anchor_wires();
                                                    nets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOTE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_note(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < notes.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    notes[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    notes[elm_index].anchor_wires();
                                                    notes[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_note(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < notes.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    notes[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    notes[elm_index].anchor_wires();
                                                    notes[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_RAIL) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_rail(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < rails.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    rails[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    rails[elm_index].anchor_wires();
                                                    rails[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_rail(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < rails.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    rails[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    rails[elm_index].anchor_wires();
                                                    rails[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_voltmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < voltmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    voltmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    voltmeters[elm_index].anchor_wires();
                                                    voltmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_voltmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < voltmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    voltmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    voltmeters[elm_index].anchor_wires();
                                                    voltmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OHMMETER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_ohmmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < ohmmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ohmmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ohmmeters[elm_index].anchor_wires();
                                                    ohmmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_ohmmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < ohmmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ohmmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ohmmeters[elm_index].anchor_wires();
                                                    ohmmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_AMMETER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_ammeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < ammeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ammeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ammeters[elm_index].anchor_wires();
                                                    ammeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_ammeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < ammeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ammeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ammeters[elm_index].anchor_wires();
                                                    ammeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_WATTMETER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_wattmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < wattmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    wattmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    wattmeters[elm_index].anchor_wires();
                                                    wattmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_wattmeter(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < wattmeters.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    wattmeters[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    wattmeters[elm_index].anchor_wires();
                                                    wattmeters[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_FUSE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_fuse(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < fuses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    fuses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    fuses[elm_index].anchor_wires();
                                                    fuses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_fuse(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < fuses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    fuses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    fuses[elm_index].anchor_wires();
                                                    fuses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SPST) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_spst(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < spsts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    spsts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    spsts[elm_index].anchor_wires();
                                                    spsts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_spst(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < spsts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    spsts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    spsts[elm_index].anchor_wires();
                                                    spsts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SPDT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_spdt(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < spdts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    spdts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    spdts[elm_index].anchor_wires();
                                                    spdts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_spdt(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < spdts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    spdts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    spdts[elm_index].anchor_wires();
                                                    spdts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_not(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < nots.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nots[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nots[elm_index].anchor_wires();
                                                    nots[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_not(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < nots.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nots[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nots[elm_index].anchor_wires();
                                                    nots[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIODE) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_diode(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < diodes.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    diodes[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    diodes[elm_index].anchor_wires();
                                                    diodes[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_diode(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < diodes.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    diodes[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    diodes[elm_index].anchor_wires();
                                                    diodes[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LED) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_led(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < leds.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    leds[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    leds[elm_index].anchor_wires();
                                                    leds[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_led(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < leds.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    leds[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    leds[elm_index].anchor_wires();
                                                    leds[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ZENER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_zener(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < zeners.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    zeners[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    zeners[elm_index].anchor_wires();
                                                    zeners[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_zener(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < zeners.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    zeners[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    zeners[elm_index].anchor_wires();
                                                    zeners[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_potentiometer(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < potentiometers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    potentiometers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    potentiometers[elm_index].anchor_wires();
                                                    potentiometers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_potentiometer(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < potentiometers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    potentiometers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    potentiometers[elm_index].anchor_wires();
                                                    potentiometers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_AND) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_and(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < ands.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ands[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ands[elm_index].anchor_wires();
                                                    ands[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_and(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < ands.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ands[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ands[elm_index].anchor_wires();
                                                    ands[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_or(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < ors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ors[elm_index].anchor_wires();
                                                    ors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_or(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < ors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ors[elm_index].anchor_wires();
                                                    ors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NAND) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_nand(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < nands.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nands[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nands[elm_index].anchor_wires();
                                                    nands[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_nand(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < nands.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nands[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nands[elm_index].anchor_wires();
                                                    nands[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_nor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < nors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nors[elm_index].anchor_wires();
                                                    nors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_nor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < nors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nors[elm_index].anchor_wires();
                                                    nors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_XOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_xor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < xors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    xors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    xors[elm_index].anchor_wires();
                                                    xors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_xor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < xors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    xors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    xors[elm_index].anchor_wires();
                                                    xors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_XNOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_xnor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < xnors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    xnors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    xnors[elm_index].anchor_wires();
                                                    xnors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_xnor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < xnors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    xnors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    xnors[elm_index].anchor_wires();
                                                    xnors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DFF) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_dff(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < dffs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dffs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dffs[elm_index].anchor_wires();
                                                    dffs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_dff(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < dffs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dffs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dffs[elm_index].anchor_wires();
                                                    dffs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VSAT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vsat(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vsats.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vsats[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vsats[elm_index].anchor_wires();
                                                    vsats[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vsat(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vsats.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vsats[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vsats[elm_index].anchor_wires();
                                                    vsats[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ADD) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_adder(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < adders.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    adders[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    adders[elm_index].anchor_wires();
                                                    adders[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_adder(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < adders.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    adders[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    adders[elm_index].anchor_wires();
                                                    adders[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SUB) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_subtractor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < subtractors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    subtractors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    subtractors[elm_index].anchor_wires();
                                                    subtractors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_subtractor(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < subtractors.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    subtractors[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    subtractors[elm_index].anchor_wires();
                                                    subtractors[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_MUL) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_multiplier(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < multipliers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    multipliers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    multipliers[elm_index].anchor_wires();
                                                    multipliers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_multiplier(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < multipliers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    multipliers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    multipliers[elm_index].anchor_wires();
                                                    multipliers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIV) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_divider(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < dividers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dividers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dividers[elm_index].anchor_wires();
                                                    dividers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_divider(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < dividers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dividers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dividers[elm_index].anchor_wires();
                                                    dividers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GAIN) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_gain(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < gains.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    gains[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    gains[elm_index].anchor_wires();
                                                    gains[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_gain(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < gains.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    gains[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    gains[elm_index].anchor_wires();
                                                    gains[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ABS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_absval(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < absvals.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    absvals[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    absvals[elm_index].anchor_wires();
                                                    absvals[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_absval(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < absvals.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    absvals[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    absvals[elm_index].anchor_wires();
                                                    absvals[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCSW) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vcsw(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vcsws.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcsws[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcsws[elm_index].anchor_wires();
                                                    vcsws[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vcsw(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vcsws.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcsws[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcsws[elm_index].anchor_wires();
                                                    vcsws[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCVS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vcvs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vcvss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcvss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcvss[elm_index].anchor_wires();
                                                    vcvss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vcvs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vcvss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcvss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcvss[elm_index].anchor_wires();
                                                    vcvss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCCS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vccs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vccss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vccss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vccss[elm_index].anchor_wires();
                                                    vccss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vccs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vccss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vccss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vccss[elm_index].anchor_wires();
                                                    vccss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CCCS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_cccs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < cccss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    cccss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    cccss[elm_index].anchor_wires();
                                                    cccss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_cccs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < cccss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    cccss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    cccss[elm_index].anchor_wires();
                                                    cccss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_CCVS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_ccvs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < ccvss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ccvss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ccvss[elm_index].anchor_wires();
                                                    ccvss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_ccvs(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < ccvss.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    ccvss[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    ccvss[elm_index].anchor_wires();
                                                    ccvss[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_OPAMP) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_opamp(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < opamps.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    opamps[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    opamps[elm_index].anchor_wires();
                                                    opamps[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_opamp(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < opamps.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    opamps[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    opamps[elm_index].anchor_wires();
                                                    opamps[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NMOS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_nmosfet(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < nmosfets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nmosfets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nmosfets[elm_index].anchor_wires();
                                                    nmosfets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_nmosfet(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < nmosfets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    nmosfets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    nmosfets[elm_index].anchor_wires();
                                                    nmosfets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PMOS) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_pmosfet(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < pmosfets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pmosfets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pmosfets[elm_index].anchor_wires();
                                                    pmosfets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_pmosfet(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < pmosfets.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pmosfets[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pmosfets[elm_index].anchor_wires();
                                                    pmosfets[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_NPN) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_npn(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < npns.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    npns[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    npns[elm_index].anchor_wires();
                                                    npns[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_npn(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < npns.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    npns[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    npns[elm_index].anchor_wires();
                                                    npns[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PNP) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_pnp(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < pnps.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pnps[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pnps[elm_index].anchor_wires();
                                                    pnps[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_pnp(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < pnps.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pnps[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pnps[elm_index].anchor_wires();
                                                    pnps[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_ADC) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_adc(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < adcs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    adcs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    adcs[elm_index].anchor_wires();
                                                    adcs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_adc(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < adcs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    adcs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    adcs[elm_index].anchor_wires();
                                                    adcs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DAC) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_dac(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < dacs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dacs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dacs[elm_index].anchor_wires();
                                                    dacs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_dac(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < dacs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    dacs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    dacs[elm_index].anchor_wires();
                                                    dacs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_SAH) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_samplers(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < sandhs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    sandhs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    sandhs[elm_index].anchor_wires();
                                                    sandhs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_samplers(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < sandhs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    sandhs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    sandhs[elm_index].anchor_wires();
                                                    sandhs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PWM) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_pwm(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < pwms.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pwms[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pwms[elm_index].anchor_wires();
                                                    pwms[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_pwm(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < pwms.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pwms[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pwms[elm_index].anchor_wires();
                                                    pwms[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_integrator(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < integrators.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    integrators[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    integrators[elm_index].anchor_wires();
                                                    integrators[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_integrator(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < integrators.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    integrators[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    integrators[elm_index].anchor_wires();
                                                    integrators[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_differentiator(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < differentiators.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    differentiators[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    differentiators[elm_index].anchor_wires();
                                                    differentiators[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_differentiator(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < differentiators.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    differentiators[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    differentiators[elm_index].anchor_wires();
                                                    differentiators[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LPF) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_lowpass(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < lowpasses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    lowpasses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    lowpasses[elm_index].anchor_wires();
                                                    lowpasses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_lowpass(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < lowpasses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    lowpasses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    lowpasses[elm_index].anchor_wires();
                                                    lowpasses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_HPF) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_highpass(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < highpasses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    highpasses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    highpasses[elm_index].anchor_wires();
                                                    highpasses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_highpass(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < highpasses.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    highpasses[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    highpasses[elm_index].anchor_wires();
                                                    highpasses[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_REL) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_relay(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < relays.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    relays[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    relays[elm_index].anchor_wires();
                                                    relays[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_relay(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < relays.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    relays[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    relays[elm_index].anchor_wires();
                                                    relays[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_PID) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_pid(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < pids.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pids[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pids[elm_index].anchor_wires();
                                                    pids[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_pid(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < pids.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    pids[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    pids[elm_index].anchor_wires();
                                                    pids[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_LUT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_lut(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < luts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    luts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    luts[elm_index].anchor_wires();
                                                    luts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_lut(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < luts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    luts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    luts[elm_index].anchor_wires();
                                                    luts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCR) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vcr(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vcrs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcrs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcrs[elm_index].anchor_wires();
                                                    vcrs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vcr(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vcrs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcrs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcrs[elm_index].anchor_wires();
                                                    vcrs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCCA) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vcca(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vccas.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vccas[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vccas[elm_index].anchor_wires();
                                                    vccas[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vcca(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vccas.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vccas[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vccas[elm_index].anchor_wires();
                                                    vccas[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_VCL) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_vcl(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < vcls.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcls[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcls[elm_index].anchor_wires();
                                                    vcls[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_vcl(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < vcls.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    vcls[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    vcls[elm_index].anchor_wires();
                                                    vcls[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_GRT) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_grt(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < grts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    grts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    grts[elm_index].anchor_wires();
                                                    grts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_grt(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < grts.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    grts[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    grts[elm_index].anchor_wires();
                                                    grts[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TPTZ) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_tptz(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < tptzs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    tptzs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    tptzs[elm_index].anchor_wires();
                                                    tptzs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_tptz(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < tptzs.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    tptzs[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    tptzs[elm_index].anchor_wires();
                                                    tptzs[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            else if (global.variables.clipboard_data[j].clipboard_type === global.ELEMENT_TYPES.TYPE_TRAN) {
                                if (global.variables.clipboard_data[j].clipboard_wire_references.length > 0) {
                                    for (var k = 0; k < global.variables.clipboard_data[j].clipboard_wire_references.length; k++) {
                                        next_wire_id = this.search_wire_links(wire_links, global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                        if (next_wire_id !== -1) {
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                elm_index = engine_functions.get_transformer(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                                if (elm_index > -1 && elm_index < transformers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    transformers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    transformers[elm_index].anchor_wires();
                                                    transformers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                        else {
                                            next_wire_id = engine_functions.get_wire_assignment();
                                            wire_link.old_wire_ref = global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id;
                                            wire_link.new_wire_ref = next_wire_id;
                                            wire_links.push(global.utils.copy(wire_link));
                                            elm_index = engine_functions.get_transformer(global.variables.clipboard_data[j].clipboard_new_reference_id);
                                            wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, next_wire_id, -1, -1));
                                            wire_manager.handle_wire_references(next_wire_id);
                                            index = engine_functions.get_wire(next_wire_id);
                                            existing_wire_id = engine_functions.get_wire(global.variables.clipboard_data[j].clipboard_wire_references[k].wire_id);
                                            if (existing_wire_id > -1 && existing_wire_id < wires.length) {
                                                wires[index].set_build_element_flag();
                                                wires[index].set_wire_style(wires[existing_wire_id].elm.wire_style);
                                                wires[index].refactor();
                                                wires[index].recolor();
                                                wires[index].resize();
                                            }
                                            if (index > -1 && index < wires.length) {
                                                if (elm_index > -1 && elm_index < transformers.length) {
                                                    wire_reference.wire_id = next_wire_id;
                                                    wire_reference.anchor_point = global.variables.clipboard_data[j].clipboard_wire_references[k].anchor_point;
                                                    wire_reference.linkage = global.variables.clipboard_data[j].clipboard_wire_references[k].linkage;
                                                    transformers[elm_index].push_reference(global.utils.copy(wire_reference));
                                                    transformers[elm_index].anchor_wires();
                                                    transformers[elm_index].unanchor_wires();
                                                }
                                            }
                                            wires[index].multi_selected = true;
                                        }
                                    }
                                }
                            }
                            /* <!-- END AUTOMATICALLY GENERATED !--> */
                        }
                    }
                }
            }
            else {
                toast.set_text(language_manager.NO_CLIPBOARD_DATA[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + '.');
                toast.show(global.COLORS.GENERAL_RED_COLOR);
            }
            if (global.variables.clipboard_data.length > 1) {
                global.variables.selected_id = global.CONSTANTS.NULL;
                global.variables.selected_type = -1;
                global.variables.selected_bounds = global.CONSTANTS.NULL;
                global.variables.selected_properties = global.CONSTANTS.NULL;
                global.variables.selected_wire_style = global.CONSTANTS.NULL;
                global.variables.selected = false;
                global.variables.focused_id = global.CONSTANTS.NULL;
                global.variables.focused_type = global.CONSTANTS.NULL;
                global.variables.focused_bounds = global.CONSTANTS.NULL;
                global.variables.focused = false;
                global.flags.flag_build_element = false;
                global.variables.component_touched = true;
                global.variables.component_translating = false;
                global.variables.is_right_click = false;
                multi_select_manager.is_paste_operation = true;
                multi_select_manager.initialize_multi_drag();
            }
        }
    }
    /* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    handle_move_resistors(i, key_event) {
        if (i > -1 && i < resistors.length) {
            if (resistors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        resistors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        resistors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        resistors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        resistors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_capacitors(i, key_event) {
        if (i > -1 && i < capacitors.length) {
            if (capacitors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        capacitors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        capacitors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        capacitors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        capacitors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_inductors(i, key_event) {
        if (i > -1 && i < inductors.length) {
            if (inductors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        inductors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        inductors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        inductors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        inductors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_grounds(i, key_event) {
        if (i > -1 && i < grounds.length) {
            if (grounds[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        grounds[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        grounds[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        grounds[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        grounds[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_dcsources(i, key_event) {
        if (i > -1 && i < dcsources.length) {
            if (dcsources[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        dcsources[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        dcsources[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dcsources[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dcsources[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_dccurrents(i, key_event) {
        if (i > -1 && i < dccurrents.length) {
            if (dccurrents[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        dccurrents[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        dccurrents[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dccurrents[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dccurrents[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_acsources(i, key_event) {
        if (i > -1 && i < acsources.length) {
            if (acsources[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        acsources[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        acsources[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        acsources[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        acsources[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_accurrents(i, key_event) {
        if (i > -1 && i < accurrents.length) {
            if (accurrents[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        accurrents[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        accurrents[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        accurrents[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        accurrents[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_squarewaves(i, key_event) {
        if (i > -1 && i < squarewaves.length) {
            if (squarewaves[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        squarewaves[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        squarewaves[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        squarewaves[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        squarewaves[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_sawwaves(i, key_event) {
        if (i > -1 && i < sawwaves.length) {
            if (sawwaves[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        sawwaves[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        sawwaves[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        sawwaves[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        sawwaves[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_trianglewaves(i, key_event) {
        if (i > -1 && i < trianglewaves.length) {
            if (trianglewaves[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        trianglewaves[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        trianglewaves[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        trianglewaves[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        trianglewaves[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_constants(i, key_event) {
        if (i > -1 && i < constants.length) {
            if (constants[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        constants[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        constants[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        constants[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        constants[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_wires(i, key_event) {
        if (i > -1 && i < wires.length) {
            if (wires[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        wires[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        wires[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        wires[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        wires[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_nets(i, key_event) {
        if (i > -1 && i < nets.length) {
            if (nets[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        nets[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        nets[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nets[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nets[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_notes(i, key_event) {
        if (i > -1 && i < notes.length) {
            if (notes[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        notes[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        notes[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        notes[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        notes[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_rails(i, key_event) {
        if (i > -1 && i < rails.length) {
            if (rails[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        rails[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        rails[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        rails[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        rails[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_voltmeters(i, key_event) {
        if (i > -1 && i < voltmeters.length) {
            if (voltmeters[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        voltmeters[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        voltmeters[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        voltmeters[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        voltmeters[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_ohmmeters(i, key_event) {
        if (i > -1 && i < ohmmeters.length) {
            if (ohmmeters[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        ohmmeters[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        ohmmeters[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ohmmeters[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ohmmeters[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_ammeters(i, key_event) {
        if (i > -1 && i < ammeters.length) {
            if (ammeters[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        ammeters[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        ammeters[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ammeters[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ammeters[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_wattmeters(i, key_event) {
        if (i > -1 && i < wattmeters.length) {
            if (wattmeters[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        wattmeters[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        wattmeters[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        wattmeters[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        wattmeters[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_fuses(i, key_event) {
        if (i > -1 && i < fuses.length) {
            if (fuses[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        fuses[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        fuses[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        fuses[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        fuses[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_spsts(i, key_event) {
        if (i > -1 && i < spsts.length) {
            if (spsts[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        spsts[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        spsts[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        spsts[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        spsts[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_spdts(i, key_event) {
        if (i > -1 && i < spdts.length) {
            if (spdts[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        spdts[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        spdts[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        spdts[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        spdts[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_nots(i, key_event) {
        if (i > -1 && i < nots.length) {
            if (nots[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        nots[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        nots[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nots[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nots[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_diodes(i, key_event) {
        if (i > -1 && i < diodes.length) {
            if (diodes[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        diodes[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        diodes[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        diodes[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        diodes[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_leds(i, key_event) {
        if (i > -1 && i < leds.length) {
            if (leds[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        leds[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        leds[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        leds[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        leds[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_zeners(i, key_event) {
        if (i > -1 && i < zeners.length) {
            if (zeners[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        zeners[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        zeners[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        zeners[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        zeners[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_potentiometers(i, key_event) {
        if (i > -1 && i < potentiometers.length) {
            if (potentiometers[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        potentiometers[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        potentiometers[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        potentiometers[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        potentiometers[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_ands(i, key_event) {
        if (i > -1 && i < ands.length) {
            if (ands[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        ands[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        ands[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ands[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ands[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_ors(i, key_event) {
        if (i > -1 && i < ors.length) {
            if (ors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        ors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        ors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_nands(i, key_event) {
        if (i > -1 && i < nands.length) {
            if (nands[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        nands[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        nands[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nands[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nands[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_nors(i, key_event) {
        if (i > -1 && i < nors.length) {
            if (nors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        nors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        nors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_xors(i, key_event) {
        if (i > -1 && i < xors.length) {
            if (xors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        xors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        xors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        xors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        xors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_xnors(i, key_event) {
        if (i > -1 && i < xnors.length) {
            if (xnors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        xnors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        xnors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        xnors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        xnors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_dffs(i, key_event) {
        if (i > -1 && i < dffs.length) {
            if (dffs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        dffs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        dffs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dffs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dffs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vsats(i, key_event) {
        if (i > -1 && i < vsats.length) {
            if (vsats[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vsats[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vsats[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vsats[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vsats[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_adders(i, key_event) {
        if (i > -1 && i < adders.length) {
            if (adders[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        adders[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        adders[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        adders[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        adders[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_subtractors(i, key_event) {
        if (i > -1 && i < subtractors.length) {
            if (subtractors[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        subtractors[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        subtractors[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        subtractors[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        subtractors[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_multipliers(i, key_event) {
        if (i > -1 && i < multipliers.length) {
            if (multipliers[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        multipliers[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        multipliers[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        multipliers[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        multipliers[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_dividers(i, key_event) {
        if (i > -1 && i < dividers.length) {
            if (dividers[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        dividers[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        dividers[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dividers[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dividers[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_gains(i, key_event) {
        if (i > -1 && i < gains.length) {
            if (gains[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        gains[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        gains[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        gains[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        gains[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_absvals(i, key_event) {
        if (i > -1 && i < absvals.length) {
            if (absvals[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        absvals[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        absvals[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        absvals[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        absvals[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vcsws(i, key_event) {
        if (i > -1 && i < vcsws.length) {
            if (vcsws[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vcsws[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vcsws[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcsws[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcsws[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vcvss(i, key_event) {
        if (i > -1 && i < vcvss.length) {
            if (vcvss[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vcvss[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vcvss[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcvss[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcvss[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vccss(i, key_event) {
        if (i > -1 && i < vccss.length) {
            if (vccss[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vccss[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vccss[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vccss[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vccss[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_cccss(i, key_event) {
        if (i > -1 && i < cccss.length) {
            if (cccss[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        cccss[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        cccss[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        cccss[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        cccss[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_ccvss(i, key_event) {
        if (i > -1 && i < ccvss.length) {
            if (ccvss[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        ccvss[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        ccvss[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ccvss[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        ccvss[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_opamps(i, key_event) {
        if (i > -1 && i < opamps.length) {
            if (opamps[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        opamps[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        opamps[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        opamps[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        opamps[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_nmosfets(i, key_event) {
        if (i > -1 && i < nmosfets.length) {
            if (nmosfets[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        nmosfets[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        nmosfets[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nmosfets[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        nmosfets[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_pmosfets(i, key_event) {
        if (i > -1 && i < pmosfets.length) {
            if (pmosfets[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        pmosfets[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        pmosfets[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pmosfets[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pmosfets[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_npns(i, key_event) {
        if (i > -1 && i < npns.length) {
            if (npns[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        npns[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        npns[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        npns[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        npns[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_pnps(i, key_event) {
        if (i > -1 && i < pnps.length) {
            if (pnps[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        pnps[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        pnps[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pnps[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pnps[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_adcs(i, key_event) {
        if (i > -1 && i < adcs.length) {
            if (adcs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        adcs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        adcs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        adcs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        adcs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_dacs(i, key_event) {
        if (i > -1 && i < dacs.length) {
            if (dacs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        dacs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        dacs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dacs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        dacs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_sandhs(i, key_event) {
        if (i > -1 && i < sandhs.length) {
            if (sandhs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        sandhs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        sandhs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        sandhs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        sandhs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_pwms(i, key_event) {
        if (i > -1 && i < pwms.length) {
            if (pwms[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        pwms[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        pwms[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pwms[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pwms[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_integrators(i, key_event) {
        if (i > -1 && i < integrators.length) {
            if (integrators[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        integrators[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        integrators[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        integrators[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        integrators[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_differentiators(i, key_event) {
        if (i > -1 && i < differentiators.length) {
            if (differentiators[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        differentiators[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        differentiators[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        differentiators[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        differentiators[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_lowpasses(i, key_event) {
        if (i > -1 && i < lowpasses.length) {
            if (lowpasses[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        lowpasses[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        lowpasses[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        lowpasses[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        lowpasses[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_highpasses(i, key_event) {
        if (i > -1 && i < highpasses.length) {
            if (highpasses[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        highpasses[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        highpasses[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        highpasses[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        highpasses[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_relays(i, key_event) {
        if (i > -1 && i < relays.length) {
            if (relays[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        relays[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        relays[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        relays[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        relays[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_pids(i, key_event) {
        if (i > -1 && i < pids.length) {
            if (pids[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        pids[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        pids[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pids[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        pids[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_luts(i, key_event) {
        if (i > -1 && i < luts.length) {
            if (luts[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        luts[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        luts[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        luts[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        luts[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vcrs(i, key_event) {
        if (i > -1 && i < vcrs.length) {
            if (vcrs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vcrs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vcrs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcrs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcrs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vccas(i, key_event) {
        if (i > -1 && i < vccas.length) {
            if (vccas[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vccas[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vccas[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vccas[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vccas[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_vcls(i, key_event) {
        if (i > -1 && i < vcls.length) {
            if (vcls[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        vcls[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        vcls[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcls[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        vcls[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_grts(i, key_event) {
        if (i > -1 && i < grts.length) {
            if (grts[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        grts[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        grts[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        grts[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        grts[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_tptzs(i, key_event) {
        if (i > -1 && i < tptzs.length) {
            if (tptzs[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        tptzs[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        tptzs[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        tptzs[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        tptzs[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    handle_move_transformers(i, key_event) {
        if (i > -1 && i < transformers.length) {
            if (transformers[i].multi_selected) {
                if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_UP) {
                    if (multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        global.flags.flag_build_element = true;
                        transformers[i].move_element(0, -global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_DOWN) {
                    if (multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y) {
                        this.multi_moved_element = true;
                        transformers[i].move_element(0, global.variables.node_space_y);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT) {
                    if (multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        transformers[i].move_element(-global.variables.node_space_x, 0);
                    }
                }
                else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT) {
                    if (multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x) {
                        this.multi_moved_element = true;
                        transformers[i].move_element(global.variables.node_space_x, 0);
                    }
                }
            }
        }
    }
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    handle_remove_multi_select_elements() {
        this.multi_deleted_element = false;
        let elm_max = global.utils.element_max();
        for (var i = elm_max - 1; i > -1; i--) {
            /* #INSERT_GENERATE_HANDLE_REMOVE_MULTI_SELECT_ELEMENTS# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            if (i > -1 && i < resistors.length) {
                if (resistors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_resistor(i);
                }
            }
            if (i > -1 && i < capacitors.length) {
                if (capacitors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_capacitor(i);
                }
            }
            if (i > -1 && i < inductors.length) {
                if (inductors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_inductor(i);
                }
            }
            if (i > -1 && i < grounds.length) {
                if (grounds[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_ground(i);
                }
            }
            if (i > -1 && i < dcsources.length) {
                if (dcsources[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_dcsource(i);
                }
            }
            if (i > -1 && i < dccurrents.length) {
                if (dccurrents[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_dccurrent(i);
                }
            }
            if (i > -1 && i < acsources.length) {
                if (acsources[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_acsource(i);
                }
            }
            if (i > -1 && i < accurrents.length) {
                if (accurrents[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_accurrent(i);
                }
            }
            if (i > -1 && i < squarewaves.length) {
                if (squarewaves[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_squarewave(i);
                }
            }
            if (i > -1 && i < sawwaves.length) {
                if (sawwaves[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_sawwave(i);
                }
            }
            if (i > -1 && i < trianglewaves.length) {
                if (trianglewaves[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_trianglewave(i);
                }
            }
            if (i > -1 && i < constants.length) {
                if (constants[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_constant(i);
                }
            }
            if (i > -1 && i < wires.length) {
                if (wires[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_wire(i);
                }
            }
            if (i > -1 && i < nets.length) {
                if (nets[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_net(i);
                }
            }
            if (i > -1 && i < notes.length) {
                if (notes[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_note(i);
                }
            }
            if (i > -1 && i < rails.length) {
                if (rails[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_rail(i);
                }
            }
            if (i > -1 && i < voltmeters.length) {
                if (voltmeters[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_voltmeter(i);
                }
            }
            if (i > -1 && i < ohmmeters.length) {
                if (ohmmeters[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_ohmmeter(i);
                }
            }
            if (i > -1 && i < ammeters.length) {
                if (ammeters[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_ammeter(i);
                }
            }
            if (i > -1 && i < wattmeters.length) {
                if (wattmeters[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_wattmeter(i);
                }
            }
            if (i > -1 && i < fuses.length) {
                if (fuses[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_fuse(i);
                }
            }
            if (i > -1 && i < spsts.length) {
                if (spsts[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_spst(i);
                }
            }
            if (i > -1 && i < spdts.length) {
                if (spdts[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_spdt(i);
                }
            }
            if (i > -1 && i < nots.length) {
                if (nots[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_not(i);
                }
            }
            if (i > -1 && i < diodes.length) {
                if (diodes[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_diode(i);
                }
            }
            if (i > -1 && i < leds.length) {
                if (leds[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_led(i);
                }
            }
            if (i > -1 && i < zeners.length) {
                if (zeners[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_zener(i);
                }
            }
            if (i > -1 && i < potentiometers.length) {
                if (potentiometers[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_potentiometer(i);
                }
            }
            if (i > -1 && i < ands.length) {
                if (ands[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_and(i);
                }
            }
            if (i > -1 && i < ors.length) {
                if (ors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_or(i);
                }
            }
            if (i > -1 && i < nands.length) {
                if (nands[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_nand(i);
                }
            }
            if (i > -1 && i < nors.length) {
                if (nors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_nor(i);
                }
            }
            if (i > -1 && i < xors.length) {
                if (xors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_xor(i);
                }
            }
            if (i > -1 && i < xnors.length) {
                if (xnors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_xnor(i);
                }
            }
            if (i > -1 && i < dffs.length) {
                if (dffs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_dff(i);
                }
            }
            if (i > -1 && i < vsats.length) {
                if (vsats[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vsat(i);
                }
            }
            if (i > -1 && i < adders.length) {
                if (adders[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_adder(i);
                }
            }
            if (i > -1 && i < subtractors.length) {
                if (subtractors[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_subtractor(i);
                }
            }
            if (i > -1 && i < multipliers.length) {
                if (multipliers[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_multiplier(i);
                }
            }
            if (i > -1 && i < dividers.length) {
                if (dividers[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_divider(i);
                }
            }
            if (i > -1 && i < gains.length) {
                if (gains[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_gain(i);
                }
            }
            if (i > -1 && i < absvals.length) {
                if (absvals[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_absval(i);
                }
            }
            if (i > -1 && i < vcsws.length) {
                if (vcsws[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vcsw(i);
                }
            }
            if (i > -1 && i < vcvss.length) {
                if (vcvss[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vcvs(i);
                }
            }
            if (i > -1 && i < vccss.length) {
                if (vccss[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vccs(i);
                }
            }
            if (i > -1 && i < cccss.length) {
                if (cccss[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_cccs(i);
                }
            }
            if (i > -1 && i < ccvss.length) {
                if (ccvss[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_ccvs(i);
                }
            }
            if (i > -1 && i < opamps.length) {
                if (opamps[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_opamp(i);
                }
            }
            if (i > -1 && i < nmosfets.length) {
                if (nmosfets[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_nmosfet(i);
                }
            }
            if (i > -1 && i < pmosfets.length) {
                if (pmosfets[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_pmosfet(i);
                }
            }
            if (i > -1 && i < npns.length) {
                if (npns[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_npn(i);
                }
            }
            if (i > -1 && i < pnps.length) {
                if (pnps[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_pnp(i);
                }
            }
            if (i > -1 && i < adcs.length) {
                if (adcs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_adc(i);
                }
            }
            if (i > -1 && i < dacs.length) {
                if (dacs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_dac(i);
                }
            }
            if (i > -1 && i < sandhs.length) {
                if (sandhs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_samplers(i);
                }
            }
            if (i > -1 && i < pwms.length) {
                if (pwms[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_pwm(i);
                }
            }
            if (i > -1 && i < integrators.length) {
                if (integrators[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_integrator(i);
                }
            }
            if (i > -1 && i < differentiators.length) {
                if (differentiators[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_differentiator(i);
                }
            }
            if (i > -1 && i < lowpasses.length) {
                if (lowpasses[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_lowpass(i);
                }
            }
            if (i > -1 && i < highpasses.length) {
                if (highpasses[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_highpass(i);
                }
            }
            if (i > -1 && i < relays.length) {
                if (relays[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_relay(i);
                }
            }
            if (i > -1 && i < pids.length) {
                if (pids[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_pid(i);
                }
            }
            if (i > -1 && i < luts.length) {
                if (luts[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_lut(i);
                }
            }
            if (i > -1 && i < vcrs.length) {
                if (vcrs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vcr(i);
                }
            }
            if (i > -1 && i < vccas.length) {
                if (vccas[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vcca(i);
                }
            }
            if (i > -1 && i < vcls.length) {
                if (vcls[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_vcl(i);
                }
            }
            if (i > -1 && i < grts.length) {
                if (grts[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_grt(i);
                }
            }
            if (i > -1 && i < tptzs.length) {
                if (tptzs[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_tptz(i);
                }
            }
            if (i > -1 && i < transformers.length) {
                if (transformers[i].multi_selected) {
                    this.multi_deleted_element = true;
                    engine_functions.remove_transformer(i);
                }
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
        if (this.multi_deleted_element) {
            global.utils.push_history();
            this.multi_deleted_element = false;
        }
    }
}
