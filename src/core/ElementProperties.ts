'use strict';
class ElementProperties {
	public readonly PROPERTY_META_DATA: PROPERTY_META_DATA_T;
	/* #INSERT_SYMBOL_ELEMENT_PROPERTY_DECLARATION# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	public readonly PROPERTY_RESISTOR: PROPERTY_RESISTOR_T;
	public readonly PROPERTY_CAPACITOR: PROPERTY_CAPACITOR_T;
	public readonly PROPERTY_INDUCTOR: PROPERTY_INDUCTOR_T;
	public readonly PROPERTY_GROUND: PROPERTY_GROUND_T;
	public readonly PROPERTY_DCSOURCE: PROPERTY_DCSOURCE_T;
	public readonly PROPERTY_DCCURRENT: PROPERTY_DCCURRENT_T;
	public readonly PROPERTY_ACSOURCE: PROPERTY_ACSOURCE_T;
	public readonly PROPERTY_ACCURRENT: PROPERTY_ACCURRENT_T;
	public readonly PROPERTY_SQUAREWAVE: PROPERTY_SQUAREWAVE_T;
	public readonly PROPERTY_SAW: PROPERTY_SAW_T;
	public readonly PROPERTY_TRI: PROPERTY_TRI_T;
	public readonly PROPERTY_CONSTANT: PROPERTY_CONSTANT_T;
	public readonly PROPERTY_WIRE: PROPERTY_WIRE_T;
	public readonly PROPERTY_NET: PROPERTY_NET_T;
	public readonly PROPERTY_NOTE: PROPERTY_NOTE_T;
	public readonly PROPERTY_RAIL: PROPERTY_RAIL_T;
	public readonly PROPERTY_VOLTMETER: PROPERTY_VOLTMETER_T;
	public readonly PROPERTY_OHMMETER: PROPERTY_OHMMETER_T;
	public readonly PROPERTY_AMMETER: PROPERTY_AMMETER_T;
	public readonly PROPERTY_WATTMETER: PROPERTY_WATTMETER_T;
	public readonly PROPERTY_FUSE: PROPERTY_FUSE_T;
	public readonly PROPERTY_SPST: PROPERTY_SPST_T;
	public readonly PROPERTY_SPDT: PROPERTY_SPDT_T;
	public readonly PROPERTY_NOT: PROPERTY_NOT_T;
	public readonly PROPERTY_DIODE: PROPERTY_DIODE_T;
	public readonly PROPERTY_LED: PROPERTY_LED_T;
	public readonly PROPERTY_ZENER: PROPERTY_ZENER_T;
	public readonly PROPERTY_POTENTIOMETER: PROPERTY_POTENTIOMETER_T;
	public readonly PROPERTY_AND: PROPERTY_AND_T;
	public readonly PROPERTY_OR: PROPERTY_OR_T;
	public readonly PROPERTY_NAND: PROPERTY_NAND_T;
	public readonly PROPERTY_NOR: PROPERTY_NOR_T;
	public readonly PROPERTY_XOR: PROPERTY_XOR_T;
	public readonly PROPERTY_XNOR: PROPERTY_XNOR_T;
	public readonly PROPERTY_DFF: PROPERTY_DFF_T;
	public readonly PROPERTY_VSAT: PROPERTY_VSAT_T;
	public readonly PROPERTY_ADD: PROPERTY_ADD_T;
	public readonly PROPERTY_SUB: PROPERTY_SUB_T;
	public readonly PROPERTY_MUL: PROPERTY_MUL_T;
	public readonly PROPERTY_DIV: PROPERTY_DIV_T;
	public readonly PROPERTY_GAIN: PROPERTY_GAIN_T;
	public readonly PROPERTY_ABS: PROPERTY_ABS_T;
	public readonly PROPERTY_VCSW: PROPERTY_VCSW_T;
	public readonly PROPERTY_VCVS: PROPERTY_VCVS_T;
	public readonly PROPERTY_VCCS: PROPERTY_VCCS_T;
	public readonly PROPERTY_CCCS: PROPERTY_CCCS_T;
	public readonly PROPERTY_CCVS: PROPERTY_CCVS_T;
	public readonly PROPERTY_OPAMP: PROPERTY_OPAMP_T;
	public readonly PROPERTY_NMOS: PROPERTY_NMOS_T;
	public readonly PROPERTY_PMOS: PROPERTY_PMOS_T;
	public readonly PROPERTY_NPN: PROPERTY_NPN_T;
	public readonly PROPERTY_PNP: PROPERTY_PNP_T;
	public readonly PROPERTY_ADC: PROPERTY_ADC_T;
	public readonly PROPERTY_DAC: PROPERTY_DAC_T;
	public readonly PROPERTY_SAH: PROPERTY_SAH_T;
	public readonly PROPERTY_PWM: PROPERTY_PWM_T;
	public readonly PROPERTY_INTEGRATOR: PROPERTY_INTEGRATOR_T;
	public readonly PROPERTY_DIFFERENTIATOR: PROPERTY_DIFFERENTIATOR_T;
	public readonly PROPERTY_LPF: PROPERTY_LPF_T;
	public readonly PROPERTY_HPF: PROPERTY_HPF_T;
	public readonly PROPERTY_REL: PROPERTY_REL_T;
	public readonly PROPERTY_PID: PROPERTY_PID_T;
	public readonly PROPERTY_LUT: PROPERTY_LUT_T;
	public readonly PROPERTY_VCR: PROPERTY_VCR_T;
	public readonly PROPERTY_VCCA: PROPERTY_VCCA_T;
	public readonly PROPERTY_VCL: PROPERTY_VCL_T;
	public readonly PROPERTY_GRT: PROPERTY_GRT_T;
	public readonly PROPERTY_TPTZ: PROPERTY_TPTZ_T;
	public readonly PROPERTY_TRAN: PROPERTY_TRAN_T;
	/* <!-- END AUTOMATICALLY GENERATED !--> */
	public readonly PROPERTY_LIMIT_MIN: number;
	public readonly PROPERTY_LIMIT_MAX: number;
	constructor(CONSTANTS: Constants, settings: Settings) {
		this.PROPERTY_LIMIT_MIN = 0;
		this.PROPERTY_LIMIT_MAX = 1;
		this.PROPERTY_META_DATA = {
			company: 'phasorsystems',
			version: CONSTANTS.VERSION_TAG,
			date: ''
		};
		this.PROPERTY_RESISTOR = {
			Resistance: 1.0e3,
			tag: 'R',
			units: 'Ω',
			options: ['Resistance'],
			options_units: ['Ω'],
			option_limits: {
				Resistance: [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_SPST = {
			'Open Resistance': settings.R_MAX * 0.5,
			'Closed Resistance': settings.WIRE_RESISTANCE,
			'Switch State': CONSTANTS.OFF,
			tag: 'SPST',
			units: 'Ω',
			options: ['Closed Resistance', 'Switch State'],
			options_units: ['Ω', ''],
			option_limits: {
				'Closed Resistance': [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_NOT = {
			'High Voltage': 5,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'NOT',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DIODE = {
			'Emission Coefficient': 1,
			'Saturation Current': 1e-15,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / settings.R_MAX,
			tag: 'DIO',
			units: '',
			options: ['Emission Coefficient', 'Saturation Current'],
			options_units: ['', 'A'],
			option_limits: {
				'Emission Coefficient': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Saturation Current': [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_LED = {
			'Emission Coefficient': 3.73,
			'Saturation Current': 93.2e-12,
			Wavelength: 425,
			'Turn On Current': 20e-3,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / settings.R_MAX,
			tag: 'LED',
			units: '',
			options: ['Emission Coefficient', 'Saturation Current', 'Wavelength'],
			options_units: ['', 'A', 'nm'],
			option_limits: {
				'Emission Coefficient': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Saturation Current': [settings.MIN_CURRENT, settings.MAX_CURRENT],
				Wavelength: [settings.MIN_WAVELENGTH, settings.MAX_WAVELENGTH]
			}
		};
		this.PROPERTY_ZENER = {
			'Zener Voltage': 5.6,
			'Emission Coefficient': 1,
			'Saturation Current': 1e-15,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / settings.R_MAX,
			tag: 'ZEN',
			units: '',
			options: ['Zener Voltage', 'Emission Coefficient', 'Saturation Current'],
			options_units: ['V', '', 'A'],
			option_limits: {
				'Zener Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Emission Coefficient': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Saturation Current': [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_VOLTMETER = {
			Voltage: 0,
			tag: 'VM',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_WATTMETER = {
			Wattage: 0,
			'Test Voltage': 1e-9,
			tag: 'WM',
			units: 'W',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_AMMETER = {
			Current: 0,
			'Test Voltage': 1e-9,
			tag: 'AM',
			units: 'A',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_OHMMETER = {
			'Sensed Resistance': 0,
			'Test Voltage': 1e-9,
			tag: 'OM',
			units: 'Ω',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_WIRE = {
			tag: 'W',
			units: 'Ω',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_DCSOURCE = {
			Voltage: 12,
			tag: 'DC',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ACSOURCE = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'AC',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Frequency: [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				Phase: [settings.MIN_PHASE, settings.MAX_PHASE],
				Offset: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SQUAREWAVE = {
			Voltage: 12,
			Frequency: 60,
			Duty: 50,
			Offset: 0,
			tag: 'SQ',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Duty', 'Offset'],
			options_units: ['V', 'Hz', '%', 'V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Frequency: [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				Duty: [settings.MIN_DUTY_CYCLE, settings.MAX_DUTY_CYCLE],
				Offset: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ACCURRENT = {
			Current: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'ACC',
			units: 'A',
			options: ['Current', 'Frequency', 'Phase', 'Offset'],
			options_units: ['A', 'Hz', ' º', 'A'],
			option_limits: {
				Current: [settings.MIN_CURRENT, settings.MAX_CURRENT],
				Frequency: [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				Phase: [settings.MIN_PHASE, settings.MAX_PHASE],
				Offset: [settings.MIN_VOLTAGE, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_DCCURRENT = {
			Current: 12,
			tag: 'DCC',
			units: 'A',
			options: ['Current'],
			options_units: ['A'],
			option_limits: {
				Current: [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_CAPACITOR = {
			Capacitance: 1.0e-6,
			'Transient Resistance': settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Voltage': 0,
			'Transient Voltage': 0,
			tag: 'C',
			units: 'F',
			options: ['Capacitance', 'Initial Voltage'],
			options_units: ['F', 'V'],
			option_limits: {
				Capacitance: [settings.MIN_CAPACITANCE, settings.MAX_CAPACITANCE],
				'Initial Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_INDUCTOR = {
			Inductance: 1.0e-3,
			'Transient Resistance': settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Current': 0,
			'Transient Voltage': 0,
			tag: 'I',
			units: 'H',
			options: ['Inductance', 'Initial Current'],
			options_units: ['H', 'A'],
			option_limits: {
				Inductance: [settings.MIN_INDUCTANCE, settings.MAX_INDUCTANCE],
				'Initial Current': [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_GROUND = {
			tag: 'G',
			units: ''
		};
		this.PROPERTY_NET = {
			Name: 'Net',
			tag: 'N',
			'Show Name': CONSTANTS.ON,
			units: '',
			options: ['Name', 'Show Name'],
			options_units: ['', ''],
			option_limits: {
				Name: [-1, 1]
			}
		};
		this.PROPERTY_CONSTANT = {
			Voltage: 12,
			tag: 'CV',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_POTENTIOMETER = {
			Resistance: 1e3,
			'Wiper Percentage': 50,
			tag: 'P',
			units: 'Ω',
			options: ['Resistance', 'Wiper Percentage'],
			options_units: ['Ω', '%'],
			option_limits: {
				Resistance: [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5],
				'Wiper Percentage': [settings.MIN_POTENTIOMETER_WIPER, settings.MAX_POTENTIOMETER_WIPER]
			}
		};
		this.PROPERTY_AND = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'AND',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_OR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'OR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_NAND = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'NAND',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_NOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'NOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_XOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'XOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_XNOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'XNOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_VCSW = {
			'High Voltage': 5,
			'Closed Resistance': 1.0 / settings.R_MAX,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'VCSW',
			units: 'V',
			options: ['High Voltage', 'Closed Resistance'],
			options_units: ['V', 'Ω'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Closed Resistance': [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_VCR = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e3,
			Elm1: 1e3,
			Elm2: 1e3,
			Elm3: 1e3,
			Elm4: 1e3,
			Interpolate: CONSTANTS.ON,
			'Input Voltage': 0,
			'Output Resistance': settings.WIRE_RESISTANCE,
			tag: 'VCR',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Elm4', 'Interpolate'],
			options_units: ['Ω', 'Ω', 'Ω', 'Ω', 'Ω', ''],
			option_limits: {
				Elm0: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm1: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm2: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm3: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm4: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_VCVS = {
			Gain: 1,
			tag: 'VCVS',
			units: 'V/V',
			options: ['Gain'],
			options_units: ['V/V'],
			option_limits: {
				Gain: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_VCCS = {
			Gain: 1,
			tag: 'VCCS',
			units: 'Mho',
			options: ['Gain'],
			options_units: ['Mho'],
			option_limits: {
				Gain: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_CCCS = {
			Gain: 1,
			tag: 'CCCS',
			units: 'A/A',
			options: ['Gain'],
			options_units: ['A/A'],
			option_limits: {
				Gain: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_CCVS = {
			Gain: 1,
			tag: 'CCVS',
			units: 'Ohm',
			options: ['Gain'],
			options_units: ['Ohm'],
			option_limits: {
				Gain: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_SPDT = {
			'Open Resistance': settings.R_MAX * 0.5,
			'Closed Resistance': 1.0 / settings.R_MAX,
			'Switch State': CONSTANTS.OFF,
			tag: 'SPDT',
			units: 'Ω',
			options: ['Closed Resistance', 'Switch State'],
			options_units: ['Ω', ''],
			option_limits: {
				'Closed Resistance': [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_OPAMP = {
			tag: 'OP',
			units: '',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_VSAT = {
			'High Voltage': 12,
			'Low Voltage': -12,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'VSAT',
			units: 'V',
			options: ['High Voltage', 'Low Voltage'],
			options_units: ['V', 'V'],
			option_limits: {
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Low Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SAW = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'SAW',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Frequency: [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				Phase: [settings.MIN_PHASE, settings.MAX_PHASE],
				Offset: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_TRI = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'TRI',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Frequency: [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				Phase: [settings.MIN_PHASE, settings.MAX_PHASE],
				Offset: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ADD = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VADD',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_SUB = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VSUB',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_MUL = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VMUL',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_GRT = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VGRT',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_DIV = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VDIV',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_NMOS = {
			'W/L Ratio': 50,
			"K'n": 118e-6,
			VTN: 650e-3,
			Lambda: 1e-6,
			Vgs: 0,
			Vds: 0,
			gds: 1.0 / settings.R_MAX,
			gm: 1.0 / settings.R_MAX,
			Io: 0,
			'Mosfet Mode': 0,
			'Last Vgs': 0,
			'Last Io': 0,
			tag: 'NMOS',
			units: 'W/L',
			options: ['W/L Ratio', "K'n", 'VTN', 'Lambda'],
			options_units: ['', 'A/V^2', 'V', 'V^-1'],
			option_limits: {
				'W/L Ratio': [settings.MIN_GAIN, settings.MAX_GAIN],
				"K'n": [settings.MIN_GAIN, settings.MAX_GAIN],
				VTN: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Lambda: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_PMOS = {
			'W/L Ratio': 50,
			"K'p": -118e-6,
			VTP: -650e-3,
			Lambda: -1e-6,
			Vsg: 0,
			Vsd: 0,
			gsd: 1.0 / settings.R_MAX,
			gm: 1.0 / settings.R_MAX,
			Io: 0,
			'Mosfet Mode': 0,
			'Last Vsg': 0,
			'Last Io': 0,
			tag: 'PMOS',
			units: 'W/L',
			options: ['W/L Ratio', "K'p", 'VTP', 'Lambda'],
			options_units: ['', 'A/V^2', 'V', 'V^-1'],
			option_limits: {
				'W/L Ratio': [settings.MIN_GAIN, settings.MAX_GAIN],
				"K'p": [settings.MIN_GAIN, settings.MAX_GAIN],
				VTP: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Lambda: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_NPN = {
			'Forward Beta': 100,
			'Reverse Beta': 1,
			'Saturation Current': 1e-15,
			'Emission Coefficient': 1,
			Vbe: 0,
			Vbc: 0,
			g_ee: 1.0 / settings.R_MAX,
			g_ec: 1.0 / settings.R_MAX,
			g_ce: 1.0 / settings.R_MAX,
			g_cc: 1.0 / settings.R_MAX,
			i_e: 0,
			i_c: 0,
			I_e: 0,
			I_c: 0,
			'Last Vbe': 0,
			'Last Io': 0,
			tag: 'NPN',
			units: 'A/A',
			options: ['Forward Beta', 'Reverse Beta', 'Saturation Current'],
			options_units: ['A/A', 'A/A', 'A'],
			option_limits: {
				'Forward Beta': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Reverse Beta': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Saturation Current': [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_PNP = {
			'Forward Beta': 100,
			'Reverse Beta': 1,
			'Saturation Current': 1e-15,
			'Emission Coefficient': 1,
			Veb: 0,
			Vcb: 0,
			g_ee: 1.0 / settings.R_MAX,
			g_ec: 1.0 / settings.R_MAX,
			g_ce: 1.0 / settings.R_MAX,
			g_cc: 1.0 / settings.R_MAX,
			i_e: 0,
			i_c: 0,
			I_e: 0,
			I_c: 0,
			'Last Veb': 0,
			'Last Io': 0,
			tag: 'PNP',
			units: 'A/A',
			options: ['Forward Beta', 'Reverse Beta', 'Saturation Current'],
			options_units: ['A/A', 'A/A', 'A'],
			option_limits: {
				'Forward Beta': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Reverse Beta': [settings.MIN_GAIN, settings.MAX_GAIN],
				'Saturation Current': [settings.MIN_CURRENT, settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_TRAN = {
			'Turns Ratio': 1,
			tag: 'TRAN',
			units: 'NP/NS',
			options: ['Turns Ratio'],
			options_units: ['NP/NS'],
			option_limits: {
				'Turns Ratio': [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_ADC = {
			'Bit Resolution': 12,
			'Reference Voltage': 3.3,
			LSB: 0,
			'Max Bits': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'ADC',
			units: 'Bits',
			options: ['Bit Resolution', 'Reference Voltage'],
			options_units: ['Bits', 'V'],
			option_limits: {
				'Bit Resolution': [settings.MIN_BIT_RESOLUTION, settings.MAX_BIT_RESOLUTION],
				'Reference Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DAC = {
			'Bit Resolution': 12,
			'Reference Voltage': 3.3,
			LSB: 0,
			'Max Bits': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'DAC',
			units: 'Bits',
			options: ['Bit Resolution', 'Reference Voltage'],
			options_units: ['Bits', 'V'],
			option_limits: {
				'Bit Resolution': [settings.MIN_BIT_RESOLUTION, settings.MAX_BIT_RESOLUTION],
				'Reference Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_PWM = {
			'Max Frequency': 120,
			'Min Frequency': 60,
			'Max Duty': settings.MAX_DUTY_CYCLE,
			'Min Duty': settings.MIN_DUTY_CYCLE,
			Phase: 0,
			Postscaler: 1,
			Counter: 0,
			Frequency: 0,
			Duty: 0,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			A: 0,
			'Saw Wave': 0,
			'Output Voltage': 0,
			'Last Output Voltage': 0,
			tag: 'PWM',
			units: 'V',
			options: ['Max Frequency', 'Min Frequency', 'Max Duty', 'Min Duty', 'Phase', 'Postscaler'],
			options_units: ['Hz', 'Hz', '%', '%', ' º', ''],
			option_limits: {
				'Max Frequency': [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				'Min Frequency': [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY],
				'Max Duty': [settings.MIN_DUTY_CYCLE, settings.MAX_DUTY_CYCLE],
				'Min Duty': [settings.MIN_DUTY_CYCLE, settings.MAX_DUTY_CYCLE],
				Phase: [settings.MIN_PHASE, settings.MAX_PHASE],
				Postscaler: [settings.MIN_POSTSCALER, settings.MAX_POSTSCALER]
			}
		};
		this.PROPERTY_INTEGRATOR = {
			'Initial Value': 0,
			'High Voltage': 5,
			'Low Voltage': -5,
			'Last Value': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'INT',
			units: '',
			options: ['Initial Value', 'High Voltage', 'Low Voltage'],
			options_units: ['V', 'V', 'V'],
			option_limits: {
				'Initial Value': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Low Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DIFFERENTIATOR = {
			'Initial Value': 0,
			'High Voltage': 5,
			'Low Voltage': -5,
			'Last Value': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'DIFF',
			units: '',
			options: ['Initial Value', 'High Voltage', 'Low Voltage'],
			options_units: ['V', 'V', 'V'],
			option_limits: {
				'Initial Value': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'High Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Low Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_GAIN = {
			Gain: 1,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'GAIN',
			units: 'V',
			options: ['Gain'],
			options_units: ['V'],
			option_limits: {
				Gain: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_ABS = {
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'ABS',
			units: '',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_LPF = {
			'Cutoff Frequency': 120,
			'Y Out': 0,
			'Y Hat': 0,
			Alpha: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'LPF',
			units: 'V',
			options: ['Cutoff Frequency'],
			options_units: ['Hz'],
			option_limits: {
				'Cutoff Frequency': [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY]
			}
		};
		this.PROPERTY_HPF = {
			'Cutoff Frequency': 120,
			'Y Out': 0,
			'Y Hat': 0,
			'X Hat': 0,
			Alpha: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'HPF',
			units: 'V',
			options: ['Cutoff Frequency'],
			options_units: ['Hz'],
			option_limits: {
				'Cutoff Frequency': [settings.MIN_FREQUENCY, settings.MAX_FREQUENCY]
			}
		};
		this.PROPERTY_RAIL = {
			Voltage: 12,
			tag: 'PR',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_REL = {
			Inductance: 1.0e-3,
			Status: 'OFF',
			'Transient Resistance': settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Current': 0,
			'Closed Resistance': settings.WIRE_RESISTANCE,
			'Open Resistance': settings.R_MAX * 0.5,
			'Coil Resistance': 100,
			'Must Operate Voltage': 3.75,
			'Must Release Voltage': 250e-3,
			'Transient Voltage': 0,
			'Input Voltage1': 0,
			tag: 'RELAY',
			units: 'H',
			options: ['Inductance', 'Closed Resistance', 'Coil Resistance', 'Must Operate Voltage', 'Must Release Voltage'],
			options_units: ['H', 'Ω', 'Ω', 'V', 'V'],
			option_limits: {
				Inductance: [settings.MIN_INDUCTANCE, settings.MAX_INDUCTANCE],
				'Closed Resistance': [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5],
				'Coil Resistance': [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5],
				'Must Operate Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Must Release Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_PID = {
			Setpoint: 0,
			Kp: 1,
			Ki: 0,
			Kd: 0,
			'Min Output': 0,
			'Max Output': 1,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'PID',
			units: '',
			options: ['Setpoint', 'Kp', 'Ki', 'Kd', 'Min Output', 'Max Output'],
			options_units: ['V', '', '', '', 'V', 'V'],
			option_limits: {
				Setpoint: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Kp: [settings.MIN_GAIN, settings.MAX_GAIN],
				Ki: [settings.MIN_GAIN, settings.MAX_GAIN],
				Kd: [settings.MIN_GAIN, settings.MAX_GAIN],
				'Min Output': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Max Output': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SAH = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			'High Voltage': 1,
			'Low Voltage': 0,
			tag: 'SAH',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_LUT = {
			Elm0: 12,
			Elm1: 12,
			Elm2: 12,
			Elm3: 12,
			Elm4: 12,
			Interpolate: CONSTANTS.ON,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Output Voltage': 0,
			tag: 'LUT',
			units: '',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Elm4', 'Interpolate'],
			options_units: ['V', 'V', 'V', 'V', 'V', ''],
			option_limits: {
				Elm0: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm1: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm2: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm3: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm4: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_TPTZ = {
			A1: 0,
			A2: 0,
			B0: 1,
			B1: 0,
			B2: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'TPTZ',
			units: '',
			options: ['A1', 'A2', 'B0', 'B1', 'B2'],
			options_units: ['', '', '', '', ''],
			option_limits: {
				A1: [settings.MIN_GAIN, settings.MAX_GAIN],
				A2: [settings.MIN_GAIN, settings.MAX_GAIN],
				B0: [settings.MIN_GAIN, settings.MAX_GAIN],
				B1: [settings.MIN_GAIN, settings.MAX_GAIN],
				B2: [settings.MIN_GAIN, settings.MAX_GAIN]
			}
		};
		this.PROPERTY_NOTE = {
			Note: 'empty',
			tag: 'NOTE',
			'Text Style': CONSTANTS.TEXT_STYLE_1,
			'Show Marker': CONSTANTS.ON,
			units: '',
			options: ['Note', 'Text Style', 'Show Marker'],
			options_units: ['', '', ''],
			option_limits: {
				Note: [-1, 1]
			}
		};
		this.PROPERTY_FUSE = {
			'Current Rating': 500e-3,
			Resistance: settings.WIRE_RESISTANCE,
			Voltage: 1e-9,
			Broken: false,
			tag: 'FUS',
			units: 'A',
			options: ['Current Rating', 'Resistance'],
			options_units: ['A', 'Ω'],
			option_limits: {
				'Current Rating': [settings.MIN_CURRENT, settings.MAX_CURRENT],
				Resistance: [settings.WIRE_RESISTANCE, settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_DFF = {
			'Input Voltage1': 0,
			'Last Clock': 1,
			Clock: 0,
			Q: 0,
			'!Q': 0,
			tag: 'DFF',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_VCCA = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e-6,
			Elm1: 1e-6,
			Elm2: 1e-6,
			Elm3: 1e-6,
			Interpolate: CONSTANTS.ON,
			'Input Voltage': 0,
			'Output Capacitance': 1e-6,
			'Initial Voltage': 0,
			'Transient Resistance': settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Transient Voltage': 0,
			tag: 'VCCA',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Initial Voltage', 'Interpolate'],
			options_units: ['F', 'F', 'F', 'F', 'V', ''],
			option_limits: {
				Elm0: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm1: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm2: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm3: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Initial Voltage': [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_VCL = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e-3,
			Elm1: 1e-3,
			Elm2: 1e-3,
			Elm3: 1e-3,
			Interpolate: CONSTANTS.ON,
			'Input Voltage': 0,
			'Output Inductance': 1e-3,
			'Initial Current': 0,
			'Transient Resistance': settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Transient Voltage': 0,
			tag: 'VCL',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Initial Current', 'Interpolate'],
			options_units: ['H', 'H', 'H', 'H', 'A', ''],
			option_limits: {
				Elm0: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm1: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm2: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				Elm3: [settings.MIN_VOLTAGE, settings.MAX_VOLTAGE],
				'Initial Current': [settings.MIN_CURRENT, settings.MAX_CURRENT],
				Interpolate: ['', '']
			}
		};
	}
}
