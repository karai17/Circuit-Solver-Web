'use strict';
class WireManager {
	public wire_id: number;
	public unique_wire: boolean;
	constructor() {
		this.wire_id = -1;
		this.unique_wire = true;
	}
	watch(): void {
		if (global.variables.wire_builder['step'] > 0) {
			if (global.variables.wire_builder['step'] >= 2) {
				if (
					(global.variables.wire_builder['n1'] !== global.variables.wire_builder['n2'] &&
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
					this.exclude_dffs()
				) {
					this.wire_id = engine_functions.get_wire_assignment();
					this.unique_wire = true;
					for (var i: number = 0; i < wires.length; i++) {
						if (
							(wires[i].elm.n1 === global.variables.wire_builder['n1'] && wires[i].elm.n2 === global.variables.wire_builder['n2']) ||
							(wires[i].elm.n2 === global.variables.wire_builder['n1'] && wires[i].elm.n1 === global.variables.wire_builder['n2'])
						) {
							this.unique_wire = false;
							break;
						}
					}
					if (this.unique_wire) {
						wires.push(new Wire(global.ELEMENT_TYPES.TYPE_WIRE, this.wire_id, global.utils.copy(global.variables.wire_builder['n1']), global.utils.copy(global.variables.wire_builder['n2'])));
						let index: number = engine_functions.get_wire(this.wire_id);
						this.handle_wire_references(this.wire_id);
						if (index > -1 && index < wires.length) {
							wires[index].select();
						}
						global.flags.signal_wire_created = true;
					}
				} else {
					if (
						global.variables.wire_builder['n1'] !== global.variables.wire_builder['n2'] &&
						global.variables.wire_builder['id1'] === global.variables.wire_builder['id2'] &&
						global.variables.wire_builder['type1'] === global.variables.wire_builder['type2']
					) {
						toast.set_text(language_manager.CONNECTION_NOT_ALLOWED[global.CONSTANTS.LANGUAGES[global.variables.language_index]] + '.');
						toast.show();
					}
				}
				this.reset_wire_builder();
			}
		}
	}
	exclude_nmosfet(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NMOS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NMOS;
	}
	exclude_pmosfet(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PMOS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PMOS;
	}
	exclude_npn(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NPN && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NPN;
	}
	exclude_pnp(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PNP && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PNP;
	}
	exclude_opamps(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OPAMP && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OPAMP;
	}
	exclude_vcvs(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCVS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCVS;
	}
	exclude_vccs(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCS;
	}
	exclude_ccvs(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCVS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCVS;
	}
	exclude_cccs(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCCS && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCCS;
	}
	exclude_dffs(): boolean {
		return global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DFF && global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DFF;
	}
	reset_wire_builder(): void {
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
	handle_wire_references(wire_id: number): void {
/* #INSERT_GENERATE_WIRE_GENERATION# */
/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
 if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            var index : number = engine_functions.get_resistor(global.variables.wire_builder['id1']);

            if (index < resistors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              resistors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              resistors[index].unanchor_wires();
              resistors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            var index : number = engine_functions.get_capacitor(global.variables.wire_builder['id1']);

            if (index < capacitors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              capacitors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              capacitors[index].unanchor_wires();
              capacitors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            var index : number = engine_functions.get_inductor(global.variables.wire_builder['id1']);

            if (index < inductors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              inductors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              inductors[index].unanchor_wires();
              inductors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GROUND) {
            var index : number = engine_functions.get_ground(global.variables.wire_builder['id1']);

            if (index < grounds.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              grounds[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              grounds[index].unanchor_wires();
              grounds[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            var index : number = engine_functions.get_dcsource(global.variables.wire_builder['id1']);

            if (index < dcsources.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              dcsources[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dcsources[index].unanchor_wires();
              dcsources[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            var index : number = engine_functions.get_dccurrent(global.variables.wire_builder['id1']);

            if (index < dccurrents.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              dccurrents[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dccurrents[index].unanchor_wires();
              dccurrents[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            var index : number = engine_functions.get_acsource(global.variables.wire_builder['id1']);

            if (index < acsources.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              acsources[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              acsources[index].unanchor_wires();
              acsources[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            var index : number = engine_functions.get_accurrent(global.variables.wire_builder['id1']);

            if (index < accurrents.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              accurrents[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              accurrents[index].unanchor_wires();
              accurrents[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            var index : number = engine_functions.get_squarewave(global.variables.wire_builder['id1']);

            if (index < squarewaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              squarewaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              squarewaves[index].unanchor_wires();
              squarewaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SAW) {
            var index : number = engine_functions.get_sawwave(global.variables.wire_builder['id1']);

            if (index < sawwaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              sawwaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              sawwaves[index].unanchor_wires();
              sawwaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TRI) {
            var index : number = engine_functions.get_trianglewave(global.variables.wire_builder['id1']);

            if (index < trianglewaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              trianglewaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              trianglewaves[index].unanchor_wires();
              trianglewaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            var index : number = engine_functions.get_constant(global.variables.wire_builder['id1']);

            if (index < constants.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              constants[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              constants[index].unanchor_wires();
              constants[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NET) {
            var index : number = engine_functions.get_net(global.variables.wire_builder['id1']);

            if (index < nets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              nets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nets[index].unanchor_wires();
              nets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOTE) {
            var index : number = engine_functions.get_note(global.variables.wire_builder['id1']);

            if (index < notes.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              notes[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              notes[index].unanchor_wires();
              notes[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_RAIL) {
            var index : number = engine_functions.get_rail(global.variables.wire_builder['id1']);

            if (index < rails.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              rails[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              rails[index].unanchor_wires();
              rails[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            var index : number = engine_functions.get_voltmeter(global.variables.wire_builder['id1']);

            if (index < voltmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              voltmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              voltmeters[index].unanchor_wires();
              voltmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            var index : number = engine_functions.get_ohmmeter(global.variables.wire_builder['id1']);

            if (index < ohmmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              ohmmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ohmmeters[index].unanchor_wires();
              ohmmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
            var index : number = engine_functions.get_ammeter(global.variables.wire_builder['id1']);

            if (index < ammeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              ammeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ammeters[index].unanchor_wires();
              ammeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            var index : number = engine_functions.get_wattmeter(global.variables.wire_builder['id1']);

            if (index < wattmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              wattmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              wattmeters[index].unanchor_wires();
              wattmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_FUSE) {
            var index : number = engine_functions.get_fuse(global.variables.wire_builder['id1']);

            if (index < fuses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              fuses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              fuses[index].unanchor_wires();
              fuses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SPST) {
            var index : number = engine_functions.get_spst(global.variables.wire_builder['id1']);

            if (index < spsts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              spsts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              spsts[index].unanchor_wires();
              spsts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SPDT) {
            var index : number = engine_functions.get_spdt(global.variables.wire_builder['id1']);

            if (index < spdts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              spdts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              spdts[index].unanchor_wires();
              spdts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOT) {
            var index : number = engine_functions.get_not(global.variables.wire_builder['id1']);

            if (index < nots.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              nots[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nots[index].unanchor_wires();
              nots[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIODE) {
            var index : number = engine_functions.get_diode(global.variables.wire_builder['id1']);

            if (index < diodes.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              diodes[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              diodes[index].unanchor_wires();
              diodes[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LED) {
            var index : number = engine_functions.get_led(global.variables.wire_builder['id1']);

            if (index < leds.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              leds[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              leds[index].unanchor_wires();
              leds[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ZENER) {
            var index : number = engine_functions.get_zener(global.variables.wire_builder['id1']);

            if (index < zeners.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              zeners[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              zeners[index].unanchor_wires();
              zeners[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            var index : number = engine_functions.get_potentiometer(global.variables.wire_builder['id1']);

            if (index < potentiometers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              potentiometers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              potentiometers[index].unanchor_wires();
              potentiometers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_AND) {
            var index : number = engine_functions.get_and(global.variables.wire_builder['id1']);

            if (index < ands.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              ands[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ands[index].unanchor_wires();
              ands[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OR) {
            var index : number = engine_functions.get_or(global.variables.wire_builder['id1']);

            if (index < ors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              ors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ors[index].unanchor_wires();
              ors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NAND) {
            var index : number = engine_functions.get_nand(global.variables.wire_builder['id1']);

            if (index < nands.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              nands[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nands[index].unanchor_wires();
              nands[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NOR) {
            var index : number = engine_functions.get_nor(global.variables.wire_builder['id1']);

            if (index < nors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              nors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nors[index].unanchor_wires();
              nors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_XOR) {
            var index : number = engine_functions.get_xor(global.variables.wire_builder['id1']);

            if (index < xors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              xors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              xors[index].unanchor_wires();
              xors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_XNOR) {
            var index : number = engine_functions.get_xnor(global.variables.wire_builder['id1']);

            if (index < xnors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              xnors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              xnors[index].unanchor_wires();
              xnors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DFF) {
            var index : number = engine_functions.get_dff(global.variables.wire_builder['id1']);

            if (index < dffs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              dffs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dffs[index].unanchor_wires();
              dffs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VSAT) {
            var index : number = engine_functions.get_vsat(global.variables.wire_builder['id1']);

            if (index < vsats.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vsats[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vsats[index].unanchor_wires();
              vsats[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ADD) {
            var index : number = engine_functions.get_adder(global.variables.wire_builder['id1']);

            if (index < adders.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              adders[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              adders[index].unanchor_wires();
              adders[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SUB) {
            var index : number = engine_functions.get_subtractor(global.variables.wire_builder['id1']);

            if (index < subtractors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              subtractors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              subtractors[index].unanchor_wires();
              subtractors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_MUL) {
            var index : number = engine_functions.get_multiplier(global.variables.wire_builder['id1']);

            if (index < multipliers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              multipliers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              multipliers[index].unanchor_wires();
              multipliers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIV) {
            var index : number = engine_functions.get_divider(global.variables.wire_builder['id1']);

            if (index < dividers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              dividers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dividers[index].unanchor_wires();
              dividers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GAIN) {
            var index : number = engine_functions.get_gain(global.variables.wire_builder['id1']);

            if (index < gains.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              gains[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              gains[index].unanchor_wires();
              gains[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ABS) {
            var index : number = engine_functions.get_absval(global.variables.wire_builder['id1']);

            if (index < absvals.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              absvals[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              absvals[index].unanchor_wires();
              absvals[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCSW) {
            var index : number = engine_functions.get_vcsw(global.variables.wire_builder['id1']);

            if (index < vcsws.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vcsws[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcsws[index].unanchor_wires();
              vcsws[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCVS) {
            var index : number = engine_functions.get_vcvs(global.variables.wire_builder['id1']);

            if (index < vcvss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vcvss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcvss[index].unanchor_wires();
              vcvss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCS) {
            var index : number = engine_functions.get_vccs(global.variables.wire_builder['id1']);

            if (index < vccss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vccss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vccss[index].unanchor_wires();
              vccss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCCS) {
            var index : number = engine_functions.get_cccs(global.variables.wire_builder['id1']);

            if (index < cccss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              cccss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              cccss[index].unanchor_wires();
              cccss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_CCVS) {
            var index : number = engine_functions.get_ccvs(global.variables.wire_builder['id1']);

            if (index < ccvss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              ccvss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ccvss[index].unanchor_wires();
              ccvss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_OPAMP) {
            var index : number = engine_functions.get_opamp(global.variables.wire_builder['id1']);

            if (index < opamps.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              opamps[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              opamps[index].unanchor_wires();
              opamps[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NMOS) {
            var index : number = engine_functions.get_nmosfet(global.variables.wire_builder['id1']);

            if (index < nmosfets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              nmosfets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nmosfets[index].unanchor_wires();
              nmosfets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PMOS) {
            var index : number = engine_functions.get_pmosfet(global.variables.wire_builder['id1']);

            if (index < pmosfets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              pmosfets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pmosfets[index].unanchor_wires();
              pmosfets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_NPN) {
            var index : number = engine_functions.get_npn(global.variables.wire_builder['id1']);

            if (index < npns.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              npns[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              npns[index].unanchor_wires();
              npns[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PNP) {
            var index : number = engine_functions.get_pnp(global.variables.wire_builder['id1']);

            if (index < pnps.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              pnps[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pnps[index].unanchor_wires();
              pnps[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_ADC) {
            var index : number = engine_functions.get_adc(global.variables.wire_builder['id1']);

            if (index < adcs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              adcs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              adcs[index].unanchor_wires();
              adcs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DAC) {
            var index : number = engine_functions.get_dac(global.variables.wire_builder['id1']);

            if (index < dacs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              dacs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dacs[index].unanchor_wires();
              dacs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_SAH) {
            var index : number = engine_functions.get_samplers(global.variables.wire_builder['id1']);

            if (index < sandhs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              sandhs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              sandhs[index].unanchor_wires();
              sandhs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PWM) {
            var index : number = engine_functions.get_pwm(global.variables.wire_builder['id1']);

            if (index < pwms.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              pwms[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pwms[index].unanchor_wires();
              pwms[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            var index : number = engine_functions.get_integrator(global.variables.wire_builder['id1']);

            if (index < integrators.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              integrators[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              integrators[index].unanchor_wires();
              integrators[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            var index : number = engine_functions.get_differentiator(global.variables.wire_builder['id1']);

            if (index < differentiators.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              differentiators[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              differentiators[index].unanchor_wires();
              differentiators[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LPF) {
            var index : number = engine_functions.get_lowpass(global.variables.wire_builder['id1']);

            if (index < lowpasses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              lowpasses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              lowpasses[index].unanchor_wires();
              lowpasses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_HPF) {
            var index : number = engine_functions.get_highpass(global.variables.wire_builder['id1']);

            if (index < highpasses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              highpasses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              highpasses[index].unanchor_wires();
              highpasses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_REL) {
            var index : number = engine_functions.get_relay(global.variables.wire_builder['id1']);

            if (index < relays.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              relays[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              relays[index].unanchor_wires();
              relays[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_PID) {
            var index : number = engine_functions.get_pid(global.variables.wire_builder['id1']);

            if (index < pids.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              pids[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pids[index].unanchor_wires();
              pids[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_LUT) {
            var index : number = engine_functions.get_lut(global.variables.wire_builder['id1']);

            if (index < luts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              luts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              luts[index].unanchor_wires();
              luts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCR) {
            var index : number = engine_functions.get_vcr(global.variables.wire_builder['id1']);

            if (index < vcrs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vcrs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcrs[index].unanchor_wires();
              vcrs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCCA) {
            var index : number = engine_functions.get_vcca(global.variables.wire_builder['id1']);

            if (index < vccas.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vccas[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vccas[index].unanchor_wires();
              vccas[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_VCL) {
            var index : number = engine_functions.get_vcl(global.variables.wire_builder['id1']);

            if (index < vcls.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              vcls[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcls[index].unanchor_wires();
              vcls[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_GRT) {
            var index : number = engine_functions.get_grt(global.variables.wire_builder['id1']);

            if (index < grts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              grts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              grts[index].unanchor_wires();
              grts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TPTZ) {
            var index : number = engine_functions.get_tptz(global.variables.wire_builder['id1']);

            if (index < tptzs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              tptzs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              tptzs[index].unanchor_wires();
              tptzs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type1'] === global.ELEMENT_TYPES.TYPE_TRAN) {
            var index : number = engine_functions.get_transformer(global.variables.wire_builder['id1']);

            if (index < transformers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage1']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point1']);

              transformers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              transformers[index].unanchor_wires();
              transformers[index].anchor_wires();
            }
          }
 if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_RESISTOR) {
            var index : number= engine_functions.get_resistor(global.variables.wire_builder['id2']);

            if (index < resistors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              resistors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              resistors[index].unanchor_wires();
              resistors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CAPACITOR) {
            var index : number= engine_functions.get_capacitor(global.variables.wire_builder['id2']);

            if (index < capacitors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              capacitors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              capacitors[index].unanchor_wires();
              capacitors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_INDUCTOR) {
            var index : number= engine_functions.get_inductor(global.variables.wire_builder['id2']);

            if (index < inductors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              inductors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              inductors[index].unanchor_wires();
              inductors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GROUND) {
            var index : number= engine_functions.get_ground(global.variables.wire_builder['id2']);

            if (index < grounds.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              grounds[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              grounds[index].unanchor_wires();
              grounds[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DCSOURCE) {
            var index : number= engine_functions.get_dcsource(global.variables.wire_builder['id2']);

            if (index < dcsources.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              dcsources[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dcsources[index].unanchor_wires();
              dcsources[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DCCURRENT) {
            var index : number= engine_functions.get_dccurrent(global.variables.wire_builder['id2']);

            if (index < dccurrents.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              dccurrents[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dccurrents[index].unanchor_wires();
              dccurrents[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ACSOURCE) {
            var index : number= engine_functions.get_acsource(global.variables.wire_builder['id2']);

            if (index < acsources.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              acsources[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              acsources[index].unanchor_wires();
              acsources[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ACCURRENT) {
            var index : number= engine_functions.get_accurrent(global.variables.wire_builder['id2']);

            if (index < accurrents.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              accurrents[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              accurrents[index].unanchor_wires();
              accurrents[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SQUAREWAVE) {
            var index : number= engine_functions.get_squarewave(global.variables.wire_builder['id2']);

            if (index < squarewaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              squarewaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              squarewaves[index].unanchor_wires();
              squarewaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SAW) {
            var index : number= engine_functions.get_sawwave(global.variables.wire_builder['id2']);

            if (index < sawwaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              sawwaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              sawwaves[index].unanchor_wires();
              sawwaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TRI) {
            var index : number= engine_functions.get_trianglewave(global.variables.wire_builder['id2']);

            if (index < trianglewaves.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              trianglewaves[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              trianglewaves[index].unanchor_wires();
              trianglewaves[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CONSTANT) {
            var index : number= engine_functions.get_constant(global.variables.wire_builder['id2']);

            if (index < constants.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              constants[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              constants[index].unanchor_wires();
              constants[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NET) {
            var index : number= engine_functions.get_net(global.variables.wire_builder['id2']);

            if (index < nets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              nets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nets[index].unanchor_wires();
              nets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOTE) {
            var index : number= engine_functions.get_note(global.variables.wire_builder['id2']);

            if (index < notes.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              notes[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              notes[index].unanchor_wires();
              notes[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_RAIL) {
            var index : number= engine_functions.get_rail(global.variables.wire_builder['id2']);

            if (index < rails.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              rails[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              rails[index].unanchor_wires();
              rails[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
            var index : number= engine_functions.get_voltmeter(global.variables.wire_builder['id2']);

            if (index < voltmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              voltmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              voltmeters[index].unanchor_wires();
              voltmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
            var index : number= engine_functions.get_ohmmeter(global.variables.wire_builder['id2']);

            if (index < ohmmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              ohmmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ohmmeters[index].unanchor_wires();
              ohmmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
            var index : number= engine_functions.get_ammeter(global.variables.wire_builder['id2']);

            if (index < ammeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              ammeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ammeters[index].unanchor_wires();
              ammeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
            var index : number= engine_functions.get_wattmeter(global.variables.wire_builder['id2']);

            if (index < wattmeters.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              wattmeters[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              wattmeters[index].unanchor_wires();
              wattmeters[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_FUSE) {
            var index : number= engine_functions.get_fuse(global.variables.wire_builder['id2']);

            if (index < fuses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              fuses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              fuses[index].unanchor_wires();
              fuses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SPST) {
            var index : number= engine_functions.get_spst(global.variables.wire_builder['id2']);

            if (index < spsts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              spsts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              spsts[index].unanchor_wires();
              spsts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SPDT) {
            var index : number= engine_functions.get_spdt(global.variables.wire_builder['id2']);

            if (index < spdts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              spdts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              spdts[index].unanchor_wires();
              spdts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOT) {
            var index : number= engine_functions.get_not(global.variables.wire_builder['id2']);

            if (index < nots.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              nots[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nots[index].unanchor_wires();
              nots[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIODE) {
            var index : number= engine_functions.get_diode(global.variables.wire_builder['id2']);

            if (index < diodes.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              diodes[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              diodes[index].unanchor_wires();
              diodes[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LED) {
            var index : number= engine_functions.get_led(global.variables.wire_builder['id2']);

            if (index < leds.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              leds[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              leds[index].unanchor_wires();
              leds[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ZENER) {
            var index : number= engine_functions.get_zener(global.variables.wire_builder['id2']);

            if (index < zeners.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              zeners[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              zeners[index].unanchor_wires();
              zeners[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_POTENTIOMETER) {
            var index : number= engine_functions.get_potentiometer(global.variables.wire_builder['id2']);

            if (index < potentiometers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              potentiometers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              potentiometers[index].unanchor_wires();
              potentiometers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_AND) {
            var index : number= engine_functions.get_and(global.variables.wire_builder['id2']);

            if (index < ands.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              ands[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ands[index].unanchor_wires();
              ands[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OR) {
            var index : number= engine_functions.get_or(global.variables.wire_builder['id2']);

            if (index < ors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              ors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ors[index].unanchor_wires();
              ors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NAND) {
            var index : number= engine_functions.get_nand(global.variables.wire_builder['id2']);

            if (index < nands.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              nands[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nands[index].unanchor_wires();
              nands[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NOR) {
            var index : number= engine_functions.get_nor(global.variables.wire_builder['id2']);

            if (index < nors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              nors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nors[index].unanchor_wires();
              nors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_XOR) {
            var index : number= engine_functions.get_xor(global.variables.wire_builder['id2']);

            if (index < xors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              xors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              xors[index].unanchor_wires();
              xors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_XNOR) {
            var index : number= engine_functions.get_xnor(global.variables.wire_builder['id2']);

            if (index < xnors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              xnors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              xnors[index].unanchor_wires();
              xnors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DFF) {
            var index : number= engine_functions.get_dff(global.variables.wire_builder['id2']);

            if (index < dffs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              dffs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dffs[index].unanchor_wires();
              dffs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VSAT) {
            var index : number= engine_functions.get_vsat(global.variables.wire_builder['id2']);

            if (index < vsats.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vsats[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vsats[index].unanchor_wires();
              vsats[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ADD) {
            var index : number= engine_functions.get_adder(global.variables.wire_builder['id2']);

            if (index < adders.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              adders[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              adders[index].unanchor_wires();
              adders[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SUB) {
            var index : number= engine_functions.get_subtractor(global.variables.wire_builder['id2']);

            if (index < subtractors.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              subtractors[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              subtractors[index].unanchor_wires();
              subtractors[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_MUL) {
            var index : number= engine_functions.get_multiplier(global.variables.wire_builder['id2']);

            if (index < multipliers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              multipliers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              multipliers[index].unanchor_wires();
              multipliers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIV) {
            var index : number= engine_functions.get_divider(global.variables.wire_builder['id2']);

            if (index < dividers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              dividers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dividers[index].unanchor_wires();
              dividers[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GAIN) {
            var index : number= engine_functions.get_gain(global.variables.wire_builder['id2']);

            if (index < gains.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              gains[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              gains[index].unanchor_wires();
              gains[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ABS) {
            var index : number= engine_functions.get_absval(global.variables.wire_builder['id2']);

            if (index < absvals.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              absvals[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              absvals[index].unanchor_wires();
              absvals[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCSW) {
            var index : number= engine_functions.get_vcsw(global.variables.wire_builder['id2']);

            if (index < vcsws.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vcsws[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcsws[index].unanchor_wires();
              vcsws[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCVS) {
            var index : number= engine_functions.get_vcvs(global.variables.wire_builder['id2']);

            if (index < vcvss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vcvss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcvss[index].unanchor_wires();
              vcvss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCS) {
            var index : number= engine_functions.get_vccs(global.variables.wire_builder['id2']);

            if (index < vccss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vccss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vccss[index].unanchor_wires();
              vccss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCCS) {
            var index : number= engine_functions.get_cccs(global.variables.wire_builder['id2']);

            if (index < cccss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              cccss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              cccss[index].unanchor_wires();
              cccss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_CCVS) {
            var index : number= engine_functions.get_ccvs(global.variables.wire_builder['id2']);

            if (index < ccvss.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              ccvss[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              ccvss[index].unanchor_wires();
              ccvss[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_OPAMP) {
            var index : number= engine_functions.get_opamp(global.variables.wire_builder['id2']);

            if (index < opamps.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              opamps[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              opamps[index].unanchor_wires();
              opamps[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NMOS) {
            var index : number= engine_functions.get_nmosfet(global.variables.wire_builder['id2']);

            if (index < nmosfets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              nmosfets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              nmosfets[index].unanchor_wires();
              nmosfets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PMOS) {
            var index : number= engine_functions.get_pmosfet(global.variables.wire_builder['id2']);

            if (index < pmosfets.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              pmosfets[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pmosfets[index].unanchor_wires();
              pmosfets[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_NPN) {
            var index : number= engine_functions.get_npn(global.variables.wire_builder['id2']);

            if (index < npns.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              npns[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              npns[index].unanchor_wires();
              npns[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PNP) {
            var index : number= engine_functions.get_pnp(global.variables.wire_builder['id2']);

            if (index < pnps.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              pnps[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pnps[index].unanchor_wires();
              pnps[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_ADC) {
            var index : number= engine_functions.get_adc(global.variables.wire_builder['id2']);

            if (index < adcs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              adcs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              adcs[index].unanchor_wires();
              adcs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DAC) {
            var index : number= engine_functions.get_dac(global.variables.wire_builder['id2']);

            if (index < dacs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              dacs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              dacs[index].unanchor_wires();
              dacs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_SAH) {
            var index : number= engine_functions.get_samplers(global.variables.wire_builder['id2']);

            if (index < sandhs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              sandhs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              sandhs[index].unanchor_wires();
              sandhs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PWM) {
            var index : number= engine_functions.get_pwm(global.variables.wire_builder['id2']);

            if (index < pwms.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              pwms[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pwms[index].unanchor_wires();
              pwms[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_INTEGRATOR) {
            var index : number= engine_functions.get_integrator(global.variables.wire_builder['id2']);

            if (index < integrators.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              integrators[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              integrators[index].unanchor_wires();
              integrators[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_DIFFERENTIATOR) {
            var index : number= engine_functions.get_differentiator(global.variables.wire_builder['id2']);

            if (index < differentiators.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              differentiators[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              differentiators[index].unanchor_wires();
              differentiators[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LPF) {
            var index : number= engine_functions.get_lowpass(global.variables.wire_builder['id2']);

            if (index < lowpasses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              lowpasses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              lowpasses[index].unanchor_wires();
              lowpasses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_HPF) {
            var index : number= engine_functions.get_highpass(global.variables.wire_builder['id2']);

            if (index < highpasses.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              highpasses[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              highpasses[index].unanchor_wires();
              highpasses[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_REL) {
            var index : number= engine_functions.get_relay(global.variables.wire_builder['id2']);

            if (index < relays.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              relays[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              relays[index].unanchor_wires();
              relays[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_PID) {
            var index : number= engine_functions.get_pid(global.variables.wire_builder['id2']);

            if (index < pids.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              pids[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              pids[index].unanchor_wires();
              pids[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_LUT) {
            var index : number= engine_functions.get_lut(global.variables.wire_builder['id2']);

            if (index < luts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              luts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              luts[index].unanchor_wires();
              luts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCR) {
            var index : number= engine_functions.get_vcr(global.variables.wire_builder['id2']);

            if (index < vcrs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vcrs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcrs[index].unanchor_wires();
              vcrs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCCA) {
            var index : number= engine_functions.get_vcca(global.variables.wire_builder['id2']);

            if (index < vccas.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vccas[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vccas[index].unanchor_wires();
              vccas[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_VCL) {
            var index : number= engine_functions.get_vcl(global.variables.wire_builder['id2']);

            if (index < vcls.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              vcls[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              vcls[index].unanchor_wires();
              vcls[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_GRT) {
            var index : number= engine_functions.get_grt(global.variables.wire_builder['id2']);

            if (index < grts.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              grts[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              grts[index].unanchor_wires();
              grts[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TPTZ) {
            var index : number= engine_functions.get_tptz(global.variables.wire_builder['id2']);

            if (index < tptzs.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              tptzs[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              tptzs[index].unanchor_wires();
              tptzs[index].anchor_wires();
            }
          } else if (global.variables.wire_builder['type2'] === global.ELEMENT_TYPES.TYPE_TRAN) {
            var index : number= engine_functions.get_transformer(global.variables.wire_builder['id2']);

            if (index < transformers.length) {
              global.CONSTANTS.wire_reference['wire_id'] = wire_id;
              global.CONSTANTS.wire_reference['linkage'] = global.utils.copy(global.variables.wire_builder['linkage2']['wire']);
              global.CONSTANTS.wire_reference['anchor_point'] = global.utils.copy(global.variables.wire_builder['anchor_point2']);

              transformers[index].push_reference(global.utils.copy(global.CONSTANTS.wire_reference));
              transformers[index].unanchor_wires();
              transformers[index].anchor_wires();
            }
          }
/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
}
