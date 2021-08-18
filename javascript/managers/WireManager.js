'use strict';
class WireManager {
    constructor() {
        this.wire_id = -1;
        this.unique_wire = true;
    }
    watch() {
        if (global.variables.wire_builder['step'] > 0) {
            if (global.variables.wire_builder['step'] >= 2) {
                if ((global.variables.wire_builder['n1'] !== global.variables.wire_builder['n2'] &&
                    !(global.variables.wire_builder['id1'] === global.variables.wire_builder['id2'] && global.variables.wire_builder['type1'] === global.variables.wire_builder['type2'])) ||
                    this.exclude_nmosfet() ||
                    this.exclude_opamps() ||
                    this.exclude_vcvs() ||
                    this.exclude_vccs() ||
                    this.exclude_ccvs() ||
                    this.exclude_cccs() ||
                    this.exclude_pmosfet() ||
                    this.exclude_npn() ||
                    this.exclude_pnp() ||
                    this.exclude_dffs()) {
                    this.wire_id = engine_functions.get_wire_assignment();
                    this.unique_wire = true;
                    for (var i = 0; i < wires.length; i++) {
                        if ((wires[i].elm.n1 === global.variables.wire_builder['n1'] && wires[i].elm.n2 === global.variables.wire_builder['n2']) ||
                            (wires[i].elm.n2 === global.variables.wire_builder['n1'] && wires[i].elm.n1 === global.variables.wire_builder['n2'])) {
                            this.unique_wire = false;
                            break;
                        }
                    }
                    if (this.unique_wire) {
                        wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, this.wire_id, global.utils.copy(global.variables.wire_builder['n1']), global.utils.copy(global.variables.wire_builder['n2'])));
                        let index = engine_functions.get_wire(this.wire_id);
                        this.handle_wire_references(this.wire_id);
                        if (index > -1 && index < wires.length) {
                            wires[index].select();
                        }
                        global.flags.flag_wire_created = true;
                    }
                }
                else {
                    if (global.variables.wire_builder['n1'] !== global.variables.wire_builder['n2'] &&
                        global.variables.wire_builder['id1'] === global.variables.wire_builder['id2'] &&
                        global.variables.wire_builder['type1'] === global.variables.wire_builder['type2']) {
                        toast.set_text(language_manager.CONNECTION_NOT_ALLOWED[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + '.');
                        toast.show(global.COLORS.GENERAL_RED_COLOR);
                    }
                }
                this.reset_wire_builder();
            }
        }
    }
    exclude_nmosfet() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NMOS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NMOS;
    }
    exclude_pmosfet() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PMOS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PMOS;
    }
    exclude_npn() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NPN && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NPN;
    }
    exclude_pnp() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PNP && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PNP;
    }
    exclude_opamps() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OPAMP && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OPAMP;
    }
    exclude_vcvs() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCVS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCVS;
    }
    exclude_vccs() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCS;
    }
    exclude_ccvs() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCVS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCVS;
    }
    exclude_cccs() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCCS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCCS;
    }
    exclude_dffs() {
        return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DFF && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DFF;
    }
    reset_wire_builder() {
        if (global.variables.wire_builder['n1'] !== -1 || global.variables.wire_builder['n2'] !== -1) {
            global.variables.wire_builder['n1'] = -1;
            global.variables.wire_builder['id1'] = -1;
            global.variables.wire_builder['type1'] = -1;
            global.variables.wire_builder['anchor_point1'] = -1;
            global.variables.wire_builder['linkage1']['wire'] = -1;
            global.variables.wire_builder['n2'] = -1;
            global.variables.wire_builder['id2'] = -1;
            global.variables.wire_builder['type2'] = -1;
            global.variables.wire_builder['anchor_point2'] = -1;
            global.variables.wire_builder['linkage2']['wire'] = -1;
            global.variables.wire_builder['step'] = 0;
        }
    }
    handle_wire_references(wire_id) {
        /* #INSERT_GENERATE_WIRE_GENERATION# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            var index = engine_functions.get_resistor(global.variables.wire_builder['id1']);
            if (index > -1 && index < resistors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                resistors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                resistors[index].unanchor_wires();
                resistors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            var index = engine_functions.get_capacitor(global.variables.wire_builder['id1']);
            if (index > -1 && index < capacitors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                capacitors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                capacitors[index].unanchor_wires();
                capacitors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            var index = engine_functions.get_inductor(global.variables.wire_builder['id1']);
            if (index > -1 && index < inductors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                inductors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                inductors[index].unanchor_wires();
                inductors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GROUND) {
            var index = engine_functions.get_ground(global.variables.wire_builder['id1']);
            if (index > -1 && index < grounds.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                grounds[index].push_reference(global.utils.copy(global.variables.wire_reference));
                grounds[index].unanchor_wires();
                grounds[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            var index = engine_functions.get_dcsource(global.variables.wire_builder['id1']);
            if (index > -1 && index < dcsources.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                dcsources[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dcsources[index].unanchor_wires();
                dcsources[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            var index = engine_functions.get_dccurrent(global.variables.wire_builder['id1']);
            if (index > -1 && index < dccurrents.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                dccurrents[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dccurrents[index].unanchor_wires();
                dccurrents[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            var index = engine_functions.get_acsource(global.variables.wire_builder['id1']);
            if (index > -1 && index < acsources.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                acsources[index].push_reference(global.utils.copy(global.variables.wire_reference));
                acsources[index].unanchor_wires();
                acsources[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            var index = engine_functions.get_accurrent(global.variables.wire_builder['id1']);
            if (index > -1 && index < accurrents.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                accurrents[index].push_reference(global.utils.copy(global.variables.wire_reference));
                accurrents[index].unanchor_wires();
                accurrents[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            var index = engine_functions.get_squarewave(global.variables.wire_builder['id1']);
            if (index > -1 && index < squarewaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                squarewaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                squarewaves[index].unanchor_wires();
                squarewaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SAW) {
            var index = engine_functions.get_sawwave(global.variables.wire_builder['id1']);
            if (index > -1 && index < sawwaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                sawwaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                sawwaves[index].unanchor_wires();
                sawwaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TRI) {
            var index = engine_functions.get_trianglewave(global.variables.wire_builder['id1']);
            if (index > -1 && index < trianglewaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                trianglewaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                trianglewaves[index].unanchor_wires();
                trianglewaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            var index = engine_functions.get_constant(global.variables.wire_builder['id1']);
            if (index > -1 && index < constants.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                constants[index].push_reference(global.utils.copy(global.variables.wire_reference));
                constants[index].unanchor_wires();
                constants[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NET) {
            var index = engine_functions.get_net(global.variables.wire_builder['id1']);
            if (index > -1 && index < nets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                nets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nets[index].unanchor_wires();
                nets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOTE) {
            var index = engine_functions.get_note(global.variables.wire_builder['id1']);
            if (index > -1 && index < notes.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                notes[index].push_reference(global.utils.copy(global.variables.wire_reference));
                notes[index].unanchor_wires();
                notes[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_RAIL) {
            var index = engine_functions.get_rail(global.variables.wire_builder['id1']);
            if (index > -1 && index < rails.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                rails[index].push_reference(global.utils.copy(global.variables.wire_reference));
                rails[index].unanchor_wires();
                rails[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            var index = engine_functions.get_voltmeter(global.variables.wire_builder['id1']);
            if (index > -1 && index < voltmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                voltmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                voltmeters[index].unanchor_wires();
                voltmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            var index = engine_functions.get_ohmmeter(global.variables.wire_builder['id1']);
            if (index > -1 && index < ohmmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                ohmmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ohmmeters[index].unanchor_wires();
                ohmmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
            var index = engine_functions.get_ammeter(global.variables.wire_builder['id1']);
            if (index > -1 && index < ammeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                ammeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ammeters[index].unanchor_wires();
                ammeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            var index = engine_functions.get_wattmeter(global.variables.wire_builder['id1']);
            if (index > -1 && index < wattmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                wattmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                wattmeters[index].unanchor_wires();
                wattmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_FUSE) {
            var index = engine_functions.get_fuse(global.variables.wire_builder['id1']);
            if (index > -1 && index < fuses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                fuses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                fuses[index].unanchor_wires();
                fuses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SPST) {
            var index = engine_functions.get_spst(global.variables.wire_builder['id1']);
            if (index > -1 && index < spsts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                spsts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                spsts[index].unanchor_wires();
                spsts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SPDT) {
            var index = engine_functions.get_spdt(global.variables.wire_builder['id1']);
            if (index > -1 && index < spdts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                spdts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                spdts[index].unanchor_wires();
                spdts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOT) {
            var index = engine_functions.get_not(global.variables.wire_builder['id1']);
            if (index > -1 && index < nots.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                nots[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nots[index].unanchor_wires();
                nots[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIODE) {
            var index = engine_functions.get_diode(global.variables.wire_builder['id1']);
            if (index > -1 && index < diodes.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                diodes[index].push_reference(global.utils.copy(global.variables.wire_reference));
                diodes[index].unanchor_wires();
                diodes[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LED) {
            var index = engine_functions.get_led(global.variables.wire_builder['id1']);
            if (index > -1 && index < leds.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                leds[index].push_reference(global.utils.copy(global.variables.wire_reference));
                leds[index].unanchor_wires();
                leds[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ZENER) {
            var index = engine_functions.get_zener(global.variables.wire_builder['id1']);
            if (index > -1 && index < zeners.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                zeners[index].push_reference(global.utils.copy(global.variables.wire_reference));
                zeners[index].unanchor_wires();
                zeners[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            var index = engine_functions.get_potentiometer(global.variables.wire_builder['id1']);
            if (index > -1 && index < potentiometers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                potentiometers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                potentiometers[index].unanchor_wires();
                potentiometers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_AND) {
            var index = engine_functions.get_and(global.variables.wire_builder['id1']);
            if (index > -1 && index < ands.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                ands[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ands[index].unanchor_wires();
                ands[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OR) {
            var index = engine_functions.get_or(global.variables.wire_builder['id1']);
            if (index > -1 && index < ors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                ors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ors[index].unanchor_wires();
                ors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NAND) {
            var index = engine_functions.get_nand(global.variables.wire_builder['id1']);
            if (index > -1 && index < nands.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                nands[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nands[index].unanchor_wires();
                nands[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOR) {
            var index = engine_functions.get_nor(global.variables.wire_builder['id1']);
            if (index > -1 && index < nors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                nors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nors[index].unanchor_wires();
                nors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_XOR) {
            var index = engine_functions.get_xor(global.variables.wire_builder['id1']);
            if (index > -1 && index < xors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                xors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                xors[index].unanchor_wires();
                xors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_XNOR) {
            var index = engine_functions.get_xnor(global.variables.wire_builder['id1']);
            if (index > -1 && index < xnors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                xnors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                xnors[index].unanchor_wires();
                xnors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DFF) {
            var index = engine_functions.get_dff(global.variables.wire_builder['id1']);
            if (index > -1 && index < dffs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                dffs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dffs[index].unanchor_wires();
                dffs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VSAT) {
            var index = engine_functions.get_vsat(global.variables.wire_builder['id1']);
            if (index > -1 && index < vsats.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vsats[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vsats[index].unanchor_wires();
                vsats[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ADD) {
            var index = engine_functions.get_adder(global.variables.wire_builder['id1']);
            if (index > -1 && index < adders.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                adders[index].push_reference(global.utils.copy(global.variables.wire_reference));
                adders[index].unanchor_wires();
                adders[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SUB) {
            var index = engine_functions.get_subtractor(global.variables.wire_builder['id1']);
            if (index > -1 && index < subtractors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                subtractors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                subtractors[index].unanchor_wires();
                subtractors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_MUL) {
            var index = engine_functions.get_multiplier(global.variables.wire_builder['id1']);
            if (index > -1 && index < multipliers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                multipliers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                multipliers[index].unanchor_wires();
                multipliers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIV) {
            var index = engine_functions.get_divider(global.variables.wire_builder['id1']);
            if (index > -1 && index < dividers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                dividers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dividers[index].unanchor_wires();
                dividers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GAIN) {
            var index = engine_functions.get_gain(global.variables.wire_builder['id1']);
            if (index > -1 && index < gains.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                gains[index].push_reference(global.utils.copy(global.variables.wire_reference));
                gains[index].unanchor_wires();
                gains[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ABS) {
            var index = engine_functions.get_absval(global.variables.wire_builder['id1']);
            if (index > -1 && index < absvals.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                absvals[index].push_reference(global.utils.copy(global.variables.wire_reference));
                absvals[index].unanchor_wires();
                absvals[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCSW) {
            var index = engine_functions.get_vcsw(global.variables.wire_builder['id1']);
            if (index > -1 && index < vcsws.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vcsws[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcsws[index].unanchor_wires();
                vcsws[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCVS) {
            var index = engine_functions.get_vcvs(global.variables.wire_builder['id1']);
            if (index > -1 && index < vcvss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vcvss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcvss[index].unanchor_wires();
                vcvss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCS) {
            var index = engine_functions.get_vccs(global.variables.wire_builder['id1']);
            if (index > -1 && index < vccss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vccss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vccss[index].unanchor_wires();
                vccss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCCS) {
            var index = engine_functions.get_cccs(global.variables.wire_builder['id1']);
            if (index > -1 && index < cccss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                cccss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                cccss[index].unanchor_wires();
                cccss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCVS) {
            var index = engine_functions.get_ccvs(global.variables.wire_builder['id1']);
            if (index > -1 && index < ccvss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                ccvss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ccvss[index].unanchor_wires();
                ccvss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OPAMP) {
            var index = engine_functions.get_opamp(global.variables.wire_builder['id1']);
            if (index > -1 && index < opamps.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                opamps[index].push_reference(global.utils.copy(global.variables.wire_reference));
                opamps[index].unanchor_wires();
                opamps[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NMOS) {
            var index = engine_functions.get_nmosfet(global.variables.wire_builder['id1']);
            if (index > -1 && index < nmosfets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                nmosfets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nmosfets[index].unanchor_wires();
                nmosfets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PMOS) {
            var index = engine_functions.get_pmosfet(global.variables.wire_builder['id1']);
            if (index > -1 && index < pmosfets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                pmosfets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pmosfets[index].unanchor_wires();
                pmosfets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NPN) {
            var index = engine_functions.get_npn(global.variables.wire_builder['id1']);
            if (index > -1 && index < npns.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                npns[index].push_reference(global.utils.copy(global.variables.wire_reference));
                npns[index].unanchor_wires();
                npns[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PNP) {
            var index = engine_functions.get_pnp(global.variables.wire_builder['id1']);
            if (index > -1 && index < pnps.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                pnps[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pnps[index].unanchor_wires();
                pnps[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ADC) {
            var index = engine_functions.get_adc(global.variables.wire_builder['id1']);
            if (index > -1 && index < adcs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                adcs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                adcs[index].unanchor_wires();
                adcs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DAC) {
            var index = engine_functions.get_dac(global.variables.wire_builder['id1']);
            if (index > -1 && index < dacs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                dacs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dacs[index].unanchor_wires();
                dacs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SAH) {
            var index = engine_functions.get_samplers(global.variables.wire_builder['id1']);
            if (index > -1 && index < sandhs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                sandhs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                sandhs[index].unanchor_wires();
                sandhs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PWM) {
            var index = engine_functions.get_pwm(global.variables.wire_builder['id1']);
            if (index > -1 && index < pwms.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                pwms[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pwms[index].unanchor_wires();
                pwms[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            var index = engine_functions.get_integrator(global.variables.wire_builder['id1']);
            if (index > -1 && index < integrators.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                integrators[index].push_reference(global.utils.copy(global.variables.wire_reference));
                integrators[index].unanchor_wires();
                integrators[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            var index = engine_functions.get_differentiator(global.variables.wire_builder['id1']);
            if (index > -1 && index < differentiators.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                differentiators[index].push_reference(global.utils.copy(global.variables.wire_reference));
                differentiators[index].unanchor_wires();
                differentiators[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LPF) {
            var index = engine_functions.get_lowpass(global.variables.wire_builder['id1']);
            if (index > -1 && index < lowpasses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                lowpasses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                lowpasses[index].unanchor_wires();
                lowpasses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_HPF) {
            var index = engine_functions.get_highpass(global.variables.wire_builder['id1']);
            if (index > -1 && index < highpasses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                highpasses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                highpasses[index].unanchor_wires();
                highpasses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_REL) {
            var index = engine_functions.get_relay(global.variables.wire_builder['id1']);
            if (index > -1 && index < relays.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                relays[index].push_reference(global.utils.copy(global.variables.wire_reference));
                relays[index].unanchor_wires();
                relays[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PID) {
            var index = engine_functions.get_pid(global.variables.wire_builder['id1']);
            if (index > -1 && index < pids.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                pids[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pids[index].unanchor_wires();
                pids[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LUT) {
            var index = engine_functions.get_lut(global.variables.wire_builder['id1']);
            if (index > -1 && index < luts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                luts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                luts[index].unanchor_wires();
                luts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCR) {
            var index = engine_functions.get_vcr(global.variables.wire_builder['id1']);
            if (index > -1 && index < vcrs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vcrs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcrs[index].unanchor_wires();
                vcrs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCA) {
            var index = engine_functions.get_vcca(global.variables.wire_builder['id1']);
            if (index > -1 && index < vccas.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vccas[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vccas[index].unanchor_wires();
                vccas[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCL) {
            var index = engine_functions.get_vcl(global.variables.wire_builder['id1']);
            if (index > -1 && index < vcls.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                vcls[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcls[index].unanchor_wires();
                vcls[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GRT) {
            var index = engine_functions.get_grt(global.variables.wire_builder['id1']);
            if (index > -1 && index < grts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                grts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                grts[index].unanchor_wires();
                grts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TPTZ) {
            var index = engine_functions.get_tptz(global.variables.wire_builder['id1']);
            if (index > -1 && index < tptzs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                tptzs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                tptzs[index].unanchor_wires();
                tptzs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TRAN) {
            var index = engine_functions.get_transformer(global.variables.wire_builder['id1']);
            if (index > -1 && index < transformers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);
                transformers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                transformers[index].unanchor_wires();
                transformers[index].anchor_wires();
            }
        }
        if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            var index = engine_functions.get_resistor(global.variables.wire_builder['id2']);
            if (index > -1 && index < resistors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                resistors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                resistors[index].unanchor_wires();
                resistors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            var index = engine_functions.get_capacitor(global.variables.wire_builder['id2']);
            if (index > -1 && index < capacitors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                capacitors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                capacitors[index].unanchor_wires();
                capacitors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            var index = engine_functions.get_inductor(global.variables.wire_builder['id2']);
            if (index > -1 && index < inductors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                inductors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                inductors[index].unanchor_wires();
                inductors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GROUND) {
            var index = engine_functions.get_ground(global.variables.wire_builder['id2']);
            if (index > -1 && index < grounds.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                grounds[index].push_reference(global.utils.copy(global.variables.wire_reference));
                grounds[index].unanchor_wires();
                grounds[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            var index = engine_functions.get_dcsource(global.variables.wire_builder['id2']);
            if (index > -1 && index < dcsources.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                dcsources[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dcsources[index].unanchor_wires();
                dcsources[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            var index = engine_functions.get_dccurrent(global.variables.wire_builder['id2']);
            if (index > -1 && index < dccurrents.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                dccurrents[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dccurrents[index].unanchor_wires();
                dccurrents[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            var index = engine_functions.get_acsource(global.variables.wire_builder['id2']);
            if (index > -1 && index < acsources.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                acsources[index].push_reference(global.utils.copy(global.variables.wire_reference));
                acsources[index].unanchor_wires();
                acsources[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            var index = engine_functions.get_accurrent(global.variables.wire_builder['id2']);
            if (index > -1 && index < accurrents.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                accurrents[index].push_reference(global.utils.copy(global.variables.wire_reference));
                accurrents[index].unanchor_wires();
                accurrents[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            var index = engine_functions.get_squarewave(global.variables.wire_builder['id2']);
            if (index > -1 && index < squarewaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                squarewaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                squarewaves[index].unanchor_wires();
                squarewaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SAW) {
            var index = engine_functions.get_sawwave(global.variables.wire_builder['id2']);
            if (index > -1 && index < sawwaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                sawwaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                sawwaves[index].unanchor_wires();
                sawwaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TRI) {
            var index = engine_functions.get_trianglewave(global.variables.wire_builder['id2']);
            if (index > -1 && index < trianglewaves.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                trianglewaves[index].push_reference(global.utils.copy(global.variables.wire_reference));
                trianglewaves[index].unanchor_wires();
                trianglewaves[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            var index = engine_functions.get_constant(global.variables.wire_builder['id2']);
            if (index > -1 && index < constants.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                constants[index].push_reference(global.utils.copy(global.variables.wire_reference));
                constants[index].unanchor_wires();
                constants[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NET) {
            var index = engine_functions.get_net(global.variables.wire_builder['id2']);
            if (index > -1 && index < nets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                nets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nets[index].unanchor_wires();
                nets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOTE) {
            var index = engine_functions.get_note(global.variables.wire_builder['id2']);
            if (index > -1 && index < notes.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                notes[index].push_reference(global.utils.copy(global.variables.wire_reference));
                notes[index].unanchor_wires();
                notes[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_RAIL) {
            var index = engine_functions.get_rail(global.variables.wire_builder['id2']);
            if (index > -1 && index < rails.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                rails[index].push_reference(global.utils.copy(global.variables.wire_reference));
                rails[index].unanchor_wires();
                rails[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            var index = engine_functions.get_voltmeter(global.variables.wire_builder['id2']);
            if (index > -1 && index < voltmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                voltmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                voltmeters[index].unanchor_wires();
                voltmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            var index = engine_functions.get_ohmmeter(global.variables.wire_builder['id2']);
            if (index > -1 && index < ohmmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                ohmmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ohmmeters[index].unanchor_wires();
                ohmmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
            var index = engine_functions.get_ammeter(global.variables.wire_builder['id2']);
            if (index > -1 && index < ammeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                ammeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ammeters[index].unanchor_wires();
                ammeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            var index = engine_functions.get_wattmeter(global.variables.wire_builder['id2']);
            if (index > -1 && index < wattmeters.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                wattmeters[index].push_reference(global.utils.copy(global.variables.wire_reference));
                wattmeters[index].unanchor_wires();
                wattmeters[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_FUSE) {
            var index = engine_functions.get_fuse(global.variables.wire_builder['id2']);
            if (index > -1 && index < fuses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                fuses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                fuses[index].unanchor_wires();
                fuses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SPST) {
            var index = engine_functions.get_spst(global.variables.wire_builder['id2']);
            if (index > -1 && index < spsts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                spsts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                spsts[index].unanchor_wires();
                spsts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SPDT) {
            var index = engine_functions.get_spdt(global.variables.wire_builder['id2']);
            if (index > -1 && index < spdts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                spdts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                spdts[index].unanchor_wires();
                spdts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOT) {
            var index = engine_functions.get_not(global.variables.wire_builder['id2']);
            if (index > -1 && index < nots.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                nots[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nots[index].unanchor_wires();
                nots[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIODE) {
            var index = engine_functions.get_diode(global.variables.wire_builder['id2']);
            if (index > -1 && index < diodes.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                diodes[index].push_reference(global.utils.copy(global.variables.wire_reference));
                diodes[index].unanchor_wires();
                diodes[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LED) {
            var index = engine_functions.get_led(global.variables.wire_builder['id2']);
            if (index > -1 && index < leds.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                leds[index].push_reference(global.utils.copy(global.variables.wire_reference));
                leds[index].unanchor_wires();
                leds[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ZENER) {
            var index = engine_functions.get_zener(global.variables.wire_builder['id2']);
            if (index > -1 && index < zeners.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                zeners[index].push_reference(global.utils.copy(global.variables.wire_reference));
                zeners[index].unanchor_wires();
                zeners[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            var index = engine_functions.get_potentiometer(global.variables.wire_builder['id2']);
            if (index > -1 && index < potentiometers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                potentiometers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                potentiometers[index].unanchor_wires();
                potentiometers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_AND) {
            var index = engine_functions.get_and(global.variables.wire_builder['id2']);
            if (index > -1 && index < ands.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                ands[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ands[index].unanchor_wires();
                ands[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OR) {
            var index = engine_functions.get_or(global.variables.wire_builder['id2']);
            if (index > -1 && index < ors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                ors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ors[index].unanchor_wires();
                ors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NAND) {
            var index = engine_functions.get_nand(global.variables.wire_builder['id2']);
            if (index > -1 && index < nands.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                nands[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nands[index].unanchor_wires();
                nands[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOR) {
            var index = engine_functions.get_nor(global.variables.wire_builder['id2']);
            if (index > -1 && index < nors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                nors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nors[index].unanchor_wires();
                nors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_XOR) {
            var index = engine_functions.get_xor(global.variables.wire_builder['id2']);
            if (index > -1 && index < xors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                xors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                xors[index].unanchor_wires();
                xors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_XNOR) {
            var index = engine_functions.get_xnor(global.variables.wire_builder['id2']);
            if (index > -1 && index < xnors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                xnors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                xnors[index].unanchor_wires();
                xnors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DFF) {
            var index = engine_functions.get_dff(global.variables.wire_builder['id2']);
            if (index > -1 && index < dffs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                dffs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dffs[index].unanchor_wires();
                dffs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VSAT) {
            var index = engine_functions.get_vsat(global.variables.wire_builder['id2']);
            if (index > -1 && index < vsats.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vsats[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vsats[index].unanchor_wires();
                vsats[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ADD) {
            var index = engine_functions.get_adder(global.variables.wire_builder['id2']);
            if (index > -1 && index < adders.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                adders[index].push_reference(global.utils.copy(global.variables.wire_reference));
                adders[index].unanchor_wires();
                adders[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SUB) {
            var index = engine_functions.get_subtractor(global.variables.wire_builder['id2']);
            if (index > -1 && index < subtractors.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                subtractors[index].push_reference(global.utils.copy(global.variables.wire_reference));
                subtractors[index].unanchor_wires();
                subtractors[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_MUL) {
            var index = engine_functions.get_multiplier(global.variables.wire_builder['id2']);
            if (index > -1 && index < multipliers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                multipliers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                multipliers[index].unanchor_wires();
                multipliers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIV) {
            var index = engine_functions.get_divider(global.variables.wire_builder['id2']);
            if (index > -1 && index < dividers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                dividers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dividers[index].unanchor_wires();
                dividers[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GAIN) {
            var index = engine_functions.get_gain(global.variables.wire_builder['id2']);
            if (index > -1 && index < gains.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                gains[index].push_reference(global.utils.copy(global.variables.wire_reference));
                gains[index].unanchor_wires();
                gains[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ABS) {
            var index = engine_functions.get_absval(global.variables.wire_builder['id2']);
            if (index > -1 && index < absvals.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                absvals[index].push_reference(global.utils.copy(global.variables.wire_reference));
                absvals[index].unanchor_wires();
                absvals[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCSW) {
            var index = engine_functions.get_vcsw(global.variables.wire_builder['id2']);
            if (index > -1 && index < vcsws.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vcsws[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcsws[index].unanchor_wires();
                vcsws[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCVS) {
            var index = engine_functions.get_vcvs(global.variables.wire_builder['id2']);
            if (index > -1 && index < vcvss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vcvss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcvss[index].unanchor_wires();
                vcvss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCS) {
            var index = engine_functions.get_vccs(global.variables.wire_builder['id2']);
            if (index > -1 && index < vccss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vccss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vccss[index].unanchor_wires();
                vccss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCCS) {
            var index = engine_functions.get_cccs(global.variables.wire_builder['id2']);
            if (index > -1 && index < cccss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                cccss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                cccss[index].unanchor_wires();
                cccss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCVS) {
            var index = engine_functions.get_ccvs(global.variables.wire_builder['id2']);
            if (index > -1 && index < ccvss.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                ccvss[index].push_reference(global.utils.copy(global.variables.wire_reference));
                ccvss[index].unanchor_wires();
                ccvss[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OPAMP) {
            var index = engine_functions.get_opamp(global.variables.wire_builder['id2']);
            if (index > -1 && index < opamps.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                opamps[index].push_reference(global.utils.copy(global.variables.wire_reference));
                opamps[index].unanchor_wires();
                opamps[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NMOS) {
            var index = engine_functions.get_nmosfet(global.variables.wire_builder['id2']);
            if (index > -1 && index < nmosfets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                nmosfets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                nmosfets[index].unanchor_wires();
                nmosfets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PMOS) {
            var index = engine_functions.get_pmosfet(global.variables.wire_builder['id2']);
            if (index > -1 && index < pmosfets.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                pmosfets[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pmosfets[index].unanchor_wires();
                pmosfets[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NPN) {
            var index = engine_functions.get_npn(global.variables.wire_builder['id2']);
            if (index > -1 && index < npns.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                npns[index].push_reference(global.utils.copy(global.variables.wire_reference));
                npns[index].unanchor_wires();
                npns[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PNP) {
            var index = engine_functions.get_pnp(global.variables.wire_builder['id2']);
            if (index > -1 && index < pnps.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                pnps[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pnps[index].unanchor_wires();
                pnps[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ADC) {
            var index = engine_functions.get_adc(global.variables.wire_builder['id2']);
            if (index > -1 && index < adcs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                adcs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                adcs[index].unanchor_wires();
                adcs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DAC) {
            var index = engine_functions.get_dac(global.variables.wire_builder['id2']);
            if (index > -1 && index < dacs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                dacs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                dacs[index].unanchor_wires();
                dacs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SAH) {
            var index = engine_functions.get_samplers(global.variables.wire_builder['id2']);
            if (index > -1 && index < sandhs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                sandhs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                sandhs[index].unanchor_wires();
                sandhs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PWM) {
            var index = engine_functions.get_pwm(global.variables.wire_builder['id2']);
            if (index > -1 && index < pwms.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                pwms[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pwms[index].unanchor_wires();
                pwms[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            var index = engine_functions.get_integrator(global.variables.wire_builder['id2']);
            if (index > -1 && index < integrators.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                integrators[index].push_reference(global.utils.copy(global.variables.wire_reference));
                integrators[index].unanchor_wires();
                integrators[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            var index = engine_functions.get_differentiator(global.variables.wire_builder['id2']);
            if (index > -1 && index < differentiators.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                differentiators[index].push_reference(global.utils.copy(global.variables.wire_reference));
                differentiators[index].unanchor_wires();
                differentiators[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LPF) {
            var index = engine_functions.get_lowpass(global.variables.wire_builder['id2']);
            if (index > -1 && index < lowpasses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                lowpasses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                lowpasses[index].unanchor_wires();
                lowpasses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_HPF) {
            var index = engine_functions.get_highpass(global.variables.wire_builder['id2']);
            if (index > -1 && index < highpasses.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                highpasses[index].push_reference(global.utils.copy(global.variables.wire_reference));
                highpasses[index].unanchor_wires();
                highpasses[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_REL) {
            var index = engine_functions.get_relay(global.variables.wire_builder['id2']);
            if (index > -1 && index < relays.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                relays[index].push_reference(global.utils.copy(global.variables.wire_reference));
                relays[index].unanchor_wires();
                relays[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PID) {
            var index = engine_functions.get_pid(global.variables.wire_builder['id2']);
            if (index > -1 && index < pids.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                pids[index].push_reference(global.utils.copy(global.variables.wire_reference));
                pids[index].unanchor_wires();
                pids[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LUT) {
            var index = engine_functions.get_lut(global.variables.wire_builder['id2']);
            if (index > -1 && index < luts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                luts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                luts[index].unanchor_wires();
                luts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCR) {
            var index = engine_functions.get_vcr(global.variables.wire_builder['id2']);
            if (index > -1 && index < vcrs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vcrs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcrs[index].unanchor_wires();
                vcrs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCA) {
            var index = engine_functions.get_vcca(global.variables.wire_builder['id2']);
            if (index > -1 && index < vccas.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vccas[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vccas[index].unanchor_wires();
                vccas[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCL) {
            var index = engine_functions.get_vcl(global.variables.wire_builder['id2']);
            if (index > -1 && index < vcls.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                vcls[index].push_reference(global.utils.copy(global.variables.wire_reference));
                vcls[index].unanchor_wires();
                vcls[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GRT) {
            var index = engine_functions.get_grt(global.variables.wire_builder['id2']);
            if (index > -1 && index < grts.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                grts[index].push_reference(global.utils.copy(global.variables.wire_reference));
                grts[index].unanchor_wires();
                grts[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TPTZ) {
            var index = engine_functions.get_tptz(global.variables.wire_builder['id2']);
            if (index > -1 && index < tptzs.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                tptzs[index].push_reference(global.utils.copy(global.variables.wire_reference));
                tptzs[index].unanchor_wires();
                tptzs[index].anchor_wires();
            }
        }
        else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TRAN) {
            var index = engine_functions.get_transformer(global.variables.wire_builder['id2']);
            if (index > -1 && index < transformers.length) {
                global.variables.wire_reference['wire_id'] = wire_id;
                global.variables.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
                global.variables.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);
                transformers[index].push_reference(global.utils.copy(global.variables.wire_reference));
                transformers[index].unanchor_wires();
                transformers[index].anchor_wires();
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
}
