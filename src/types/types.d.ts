declare type MeterTemplate_T = {
	Tag: string;
	Value: number;
};
declare type WIRE_REFERENCE_T = {
	wire_id: number;
	anchor_point: number;
	linkage: number;
};
declare type WIRE_BUILDER_T = {
	n1: number;
	id1: number;
	type1: number;
	anchor_point1: number;
	linkage1: {
		wire: number;
	};
	n2: number;
	id2: number;
	type2: number;
	anchor_point2: number;
	linkage2: {
		wire: number;
	};
	step: number;
};
declare type KEY_EVENT_T = {
	event: KeyboardEvent;
	alt: boolean;
	shift: boolean;
	ctrl: boolean;
	caps: boolean;
};
declare type HISTORY_T = {
	packet: Array<string>;
};
declare type SYSTEM_OPTIONS_T = {
	options: Array<string>;
	values: Array<string>;
};
declare type PAINT_COMMAND_T = 'MOVE' | 'LINE' | 'QUAD' | 'CURVE' | 'CLOSE';
declare type PATH_1P_T = {
	command: PAINT_COMMAND_T;
	x1: number;
	y1: number;
};
declare type PATH_2P_T = {
	command: PAINT_COMMAND_T;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};
declare type PATH_3P_T = {
	command: PAINT_COMMAND_T;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x3: number;
	y3: number;
	x4: number;
	y4: number;
};
declare type NEAREST_NEIGHBOR_T = {
	Type: number;
	Id: number;
};
declare type PATH_T = PATH_1P_T | PATH_2P_T | PATH_3P_T;
declare type KEYBOARD_EXPAND_T = {
	Id: number;
	Factor: number;
};
declare type ON_SCREEN_KEYBOARD_KEY_EVENT_T = {
	code: string;
};
declare type PAINT_METRICS_T = {
	width: number;
	ascent: number;
	descent: number;
};
declare type OPTIONS_T = {
	c0: {
		string: string;
		number: number;
	};
	c1: {
		string: string;
		number: number;
	};
	c2: {
		string: string;
		number: number;
	};
	c3: {
		string: string;
		number: number;
	};
};
declare type PAINT_METRICS_ARRAY_T = {
	text: string;
	font: string;
	'text size': number;
	metric: PAINT_METRICS_T;
};
declare type ANGLE_STRUCT_T = {
	x: number;
	y: number;
	angle: number;
};
declare type SCOPE_ENTRY_T = {
	element_id: number;
	element_type: number;
	element_tag: string;
};
declare type SYSTEM_INITIALIZATION_T = {
	step: number;
	max: number;
	completed: boolean;
};
declare type ANCHOR_POINT_T = {
	p1: number;
	p2: number;
	p3: number;
	p4: number;
};
declare type COLOR_ARRAY_T = {
	aliceblue: string;
	antiquewhite: string;
	aqua: string;
	aquamarine: string;
	azure: string;
	beige: string;
	bisque: string;
	black: string;
	blanchedalmond: string;
	blue: string;
	blueviolet: string;
	brown: string;
	burlywood: string;
	cadetblue: string;
	chartreuse: string;
	chocolate: string;
	coral: string;
	cornflowerblue: string;
	cornsilk: string;
	crimson: string;
	cyan: string;
	darkblue: string;
	darkcyan: string;
	darkgoldenrod: string;
	darkgray: string;
	darkgreen: string;
	darkkhaki: string;
	darkmagenta: string;
	darkolivegreen: string;
	darkorange: string;
	darkorchid: string;
	darkred: string;
	darksalmon: string;
	darkseagreen: string;
	darkslateblue: string;
	darkslategray: string;
	darkturquoise: string;
	darkviolet: string;
	deeppink: string;
	deepskyblue: string;
	dimgray: string;
	dodgerblue: string;
	firebrick: string;
	floralwhite: string;
	forestgreen: string;
	fuchsia: string;
	gainsboro: string;
	ghostwhite: string;
	gold: string;
	goldenrod: string;
	gray: string;
	green: string;
	greenyellow: string;
	honeydew: string;
	hotpink: string;
	indianred: string;
	indigo: string;
	ivory: string;
	khaki: string;
	lavender: string;
	lavenderblush: string;
	lawngreen: string;
	lemonchiffon: string;
	lightblue: string;
	lightcoral: string;
	lightcyan: string;
	lightgoldenrodyellow: string;
	lightgrey: string;
	lightgreen: string;
	lightpink: string;
	lightsalmon: string;
	lightseagreen: string;
	lightskyblue: string;
	lightslategray: string;
	lightsteelblue: string;
	lightyellow: string;
	lime: string;
	limegreen: string;
	linen: string;
	magenta: string;
	maroon: string;
	mediumaquamarine: string;
	mediumblue: string;
	mediumorchid: string;
	mediumpurple: string;
	mediumseagreen: string;
	mediumslateblue: string;
	mediumspringgreen: string;
	mediumturquoise: string;
	mediumvioletred: string;
	midnightblue: string;
	mintcream: string;
	mistyrose: string;
	moccasin: string;
	navajowhite: string;
	navy: string;
	oldlace: string;
	olive: string;
	olivedrab: string;
	orange: string;
	orangered: string;
	orchid: string;
	palegoldenrod: string;
	palegreen: string;
	paleturquoise: string;
	palevioletred: string;
	papayawhip: string;
	peachpuff: string;
	peru: string;
	pink: string;
	plum: string;
	powderblue: string;
	purple: string;
	rebeccapurple: string;
	red: string;
	rosybrown: string;
	royalblue: string;
	saddlebrown: string;
	salmon: string;
	sandybrown: string;
	seagreen: string;
	seashell: string;
	sienna: string;
	silver: string;
	skyblue: string;
	slateblue: string;
	slategray: string;
	snow: string;
	springgreen: string;
	steelblue: string;
	tan: string;
	teal: string;
	thistle: string;
	tomato: string;
	turquoise: string;
	violet: string;
	wheat: string;
	white: string;
	whitesmoke: string;
	yellow: string;
	yellowgreen: string;
};
declare type PROPERTY_META_DATA_T = {
	[company: string]: string;
	version: string;
	date: string;
};
declare type PROPERTY_RESISTOR_T = {
	Resistance: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Resistance: Array<number>;
	};
};
declare type PROPERTY_SPST_T = {
	'Open Resistance': number;
	'Closed Resistance': number;
	'Switch State': string;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Closed Resistance': Array<number>;
	};
};
declare type PROPERTY_NOT_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_DIODE_T = {
	'Emission Coefficient': number;
	'Saturation Current': number;
	'Equivalent Current': number;
	Voltage: number;
	'Last Voltage': number;
	'Last Current': number;
	Resistance: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Emission Coefficient': Array<number>;
		'Saturation Current': Array<number>;
	};
};
declare type PROPERTY_LED_T = {
	'Emission Coefficient': number;
	'Saturation Current': number;
	Wavelength: number;
	'Turn On Current': number;
	'Equivalent Current': number;
	Voltage: number;
	'Last Voltage': number;
	'Last Current': number;
	Resistance: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Emission Coefficient': Array<number>;
		'Saturation Current': Array<number>;
		Wavelength: Array<number>;
	};
};
declare type PROPERTY_ZENER_T = {
	'Zener Voltage': number;
	'Emission Coefficient': number;
	'Saturation Current': number;
	'Equivalent Current': number;
	Voltage: number;
	'Last Voltage': number;
	'Last Current': number;
	Resistance: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Zener Voltage': Array<number>;
		'Emission Coefficient': Array<number>;
		'Saturation Current': Array<number>;
	};
};
declare type PROPERTY_VOLTMETER_T = {
	Voltage: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_WATTMETER_T = {
	Wattage: number;
	'Test Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_AMMETER_T = {
	Current: number;
	'Test Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_OHMMETER_T = {
	'Sensed Resistance': number;
	'Test Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_WIRE_T = {
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_DCSOURCE_T = {
	Voltage: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
	};
};
declare type PROPERTY_ACSOURCE_T = {
	Voltage: number;
	Frequency: number;
	Phase: number;
	Offset: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
		Frequency: Array<number>;
		Phase: Array<number>;
		Offset: Array<number>;
	};
};
declare type PROPERTY_SQUAREWAVE_T = {
	Voltage: number;
	Frequency: number;
	Duty: number;
	Offset: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
		Frequency: Array<number>;
		Duty: Array<number>;
		Offset: Array<number>;
	};
};
declare type PROPERTY_ACCURRENT_T = {
	Current: number;
	Frequency: number;
	Phase: number;
	Offset: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Current: Array<number>;
		Frequency: Array<number>;
		Phase: Array<number>;
		Offset: Array<number>;
	};
};
declare type PROPERTY_DCCURRENT_T = {
	Current: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Current: Array<number>;
	};
};
declare type PROPERTY_CAPACITOR_T = {
	Capacitance: number;
	'Transient Resistance': number;
	'Transient Current': number;
	'Equivalent Current': number;
	'Initial Voltage': number;
	'Transient Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Capacitance: Array<number>;
		'Initial Voltage': Array<number>;
	};
};
declare type PROPERTY_INDUCTOR_T = {
	Inductance: number;
	'Transient Resistance': number;
	'Transient Current': number;
	'Equivalent Current': number;
	'Initial Current': number;
	'Transient Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Inductance: Array<number>;
		'Initial Current': Array<number>;
	};
};
declare type PROPERTY_GROUND_T = {
	tag: string;
	units: string;
};
declare type PROPERTY_NET_T = {
	Name: string;
	tag: string;
	'Show Name': string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Name: Array<number>;
	};
};
declare type PROPERTY_CONSTANT_T = {
	Voltage: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
	};
};
declare type PROPERTY_POTENTIOMETER_T = {
	Resistance: number;
	'Wiper Percentage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Resistance: Array<number>;
		'Wiper Percentage': Array<number>;
	};
};
declare type PROPERTY_AND_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_OR_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_NAND_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_NOR_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_XOR_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_XNOR_T = {
	'High Voltage': number;
	'V_1': number;
	'V_1_prime': number;
	'V_in1': number;
	'V_partial1': number;
	'V_2': number;
	'V_2_prime': number;
	'V_in2': number;
	'V_partial2': number;
	'V_out': number;
	'V_eq': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
	};
};
declare type PROPERTY_VCSW_T = {
	'High Voltage': number;
	'Closed Resistance': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
		'Closed Resistance': Array<number>;
	};
};
declare type PROPERTY_VCR_T = {
	'Low Voltage': number;
	'High Voltage': number;
	Elm0: number;
	Elm1: number;
	Elm2: number;
	Elm3: number;
	Elm4: number;
	Interpolate: string;
	'Input Voltage': number;
	'Output Resistance': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Elm0: Array<number>;
		Elm1: Array<number>;
		Elm2: Array<number>;
		Elm3: Array<number>;
		Elm4: Array<number>;
		Interpolate: Array<string>;
	};
};
declare type PROPERTY_VCVS_T = {
	Gain: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Gain: Array<number>;
	};
};
declare type PROPERTY_VCCS_T = {
	Gain: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Gain: Array<number>;
	};
};
declare type PROPERTY_CCCS_T = {
	Gain: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Gain: Array<number>;
	};
};
declare type PROPERTY_CCVS_T = {
	Gain: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Gain: Array<number>;
	};
};
declare type PROPERTY_SPDT_T = {
	'Open Resistance': number;
	'Closed Resistance': number;
	'Switch State': string;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Closed Resistance': Array<number>;
	};
};
declare type PROPERTY_OPAMP_T = {
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_VSAT_T = {
	'High Voltage': number;
	'Low Voltage': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'High Voltage': Array<number>;
		'Low Voltage': Array<number>;
	};
};
declare type PROPERTY_SAW_T = {
	Voltage: number;
	Frequency: number;
	Phase: number;
	Offset: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
		Frequency: Array<number>;
		Phase: Array<number>;
		Offset: Array<number>;
	};
};
declare type PROPERTY_TRI_T = {
	Voltage: number;
	Frequency: number;
	Phase: number;
	Offset: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
		Frequency: Array<number>;
		Phase: Array<number>;
		Offset: Array<number>;
	};
};
declare type PROPERTY_ADD_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_SUB_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_MUL_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_GRT_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_DIV_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_NMOS_T = {
	'W/L Ratio': number;
	"K'n": number;
	VTN: number;
	Lambda: number;
	Vgs: number;
	Vds: number;
	gds: number;
	gm: number;
	Io: number;
	'Mosfet Mode': number;
	'Last Vgs': number;
	'Last Io': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'W/L Ratio': Array<number>;
		"K'n": Array<number>;
		VTN: Array<number>;
		Lambda: Array<number>;
	};
};
declare type PROPERTY_PMOS_T = {
	'W/L Ratio': number;
	"K'p": number;
	VTP: number;
	Lambda: number;
	Vsg: number;
	Vsd: number;
	gsd: number;
	gm: number;
	Io: number;
	'Mosfet Mode': number;
	'Last Vsg': number;
	'Last Io': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'W/L Ratio': Array<number>;
		"K'p": Array<number>;
		VTP: Array<number>;
		Lambda: Array<number>;
	};
};
declare type PROPERTY_NPN_T = {
	'Forward Beta': number;
	'Reverse Beta': number;
	'Saturation Current': number;
	'Emission Coefficient': number;
	Vbe: number;
	Vbc: number;
	g_ee: number;
	g_ec: number;
	g_ce: number;
	g_cc: number;
	i_e: number;
	i_c: number;
	I_e: number;
	I_c: number;
	'Last Vbe': number;
	'Last Io': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Forward Beta': Array<number>;
		'Reverse Beta': Array<number>;
		'Saturation Current': Array<number>;
	};
};
declare type PROPERTY_PNP_T = {
	'Forward Beta': number;
	'Reverse Beta': number;
	'Saturation Current': number;
	'Emission Coefficient': number;
	Veb: number;
	Vcb: number;
	g_ee: number;
	g_ec: number;
	g_ce: number;
	g_cc: number;
	i_e: number;
	i_c: number;
	I_e: number;
	I_c: number;
	'Last Veb': number;
	'Last Io': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Forward Beta': Array<number>;
		'Reverse Beta': Array<number>;
		'Saturation Current': Array<number>;
	};
};
declare type PROPERTY_TRAN_T = {
	'Turns Ratio': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Turns Ratio': Array<number>;
	};
};
declare type PROPERTY_ADC_T = {
	'Bit Resolution': number;
	'Reference Voltage': number;
	LSB: number;
	'Max Bits': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Bit Resolution': Array<number>;
		'Reference Voltage': Array<number>;
	};
};
declare type PROPERTY_DAC_T = {
	'Bit Resolution': number;
	'Reference Voltage': number;
	LSB: number;
	'Max Bits': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Bit Resolution': Array<number>;
		'Reference Voltage': Array<number>;
	};
};
declare type PROPERTY_PWM_T = {
	'Max Frequency': number;
	'Min Frequency': number;
	'Max Duty': number;
	'Min Duty': number;
	Phase: number;
	Postscaler: number;
	Counter: number;
	Frequency: number;
	Duty: number;
	'High Voltage': number;
	'Low Voltage': number;
	'Input Voltage1': number;
	'Input Voltage2': number;
	A: number;
	'Saw Wave': number;
	'Output Voltage': number;
	'Last Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Max Frequency': Array<number>;
		'Min Frequency': Array<number>;
		'Max Duty': Array<number>;
		'Min Duty': Array<number>;
		Phase: Array<number>;
		Postscaler: Array<number>;
	};
};
declare type PROPERTY_INTEGRATOR_T = {
	'Initial Value': number;
	'High Voltage': number;
	'Low Voltage': number;
	'Last Value': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Initial Value': Array<number>;
		'High Voltage': Array<number>;
		'Low Voltage': Array<number>;
	};
};
declare type PROPERTY_DIFFERENTIATOR_T = {
	'Initial Value': number;
	'High Voltage': number;
	'Low Voltage': number;
	'Last Value': number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Initial Value': Array<number>;
		'High Voltage': Array<number>;
		'Low Voltage': Array<number>;
	};
};
declare type PROPERTY_GAIN_T = {
	Gain: number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Gain: Array<number>;
	};
};
declare type PROPERTY_ABS_T = {
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_LPF_T = {
	'Cutoff Frequency': number;
	'Y Out': number;
	'Y Hat': number;
	Alpha: number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Cutoff Frequency': Array<number>;
	};
};
declare type PROPERTY_HPF_T = {
	'Cutoff Frequency': number;
	'Y Out': number;
	'Y Hat': number;
	'X Hat': number;
	Alpha: number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Cutoff Frequency': Array<number>;
	};
};
declare type PROPERTY_RAIL_T = {
	Voltage: number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Voltage: Array<number>;
	};
};
declare type PROPERTY_REL_T = {
	Inductance: number;
	'Transient Resistance': number;
	'Transient Current': number;
	'Equivalent Current': number;
	'Initial Current': number;
	'Closed Resistance': number;
	'Open Resistance': number;
	'Coil Resistance': number;
	'Must Operate Voltage': number;
	'Must Release Voltage': number;
	'Transient Voltage': number;
	'Input Voltage1': number;
	Status: string;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Inductance: Array<number>;
		'Closed Resistance': Array<number>;
		'Coil Resistance': Array<number>;
		'Must Operate Voltage': Array<number>;
		'Must Release Voltage': Array<number>;
	};
};
declare type PROPERTY_PID_T = {
	Setpoint: number;
	Kp: number;
	Ki: number;
	Kd: number;
	'Min Output': number;
	'Max Output': number;
	'High Voltage': number;
	'Low Voltage': number;
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Setpoint: Array<number>;
		Kp: Array<number>;
		Ki: Array<number>;
		Kd: Array<number>;
		'Min Output': Array<number>;
		'Max Output': Array<number>;
	};
};
declare type PROPERTY_SAH_T = {
	'Input Voltage1': number;
	'Input Voltage2': number;
	'Output Voltage': number;
	'High Voltage': number;
	'Low Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_LUT_T = {
	Elm0: number;
	Elm1: number;
	Elm2: number;
	Elm3: number;
	Elm4: number;
	Interpolate: string;
	'High Voltage': number;
	'Low Voltage': number;
	'Input Voltage1': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Elm0: Array<number>;
		Elm1: Array<number>;
		Elm2: Array<number>;
		Elm3: Array<number>;
		Elm4: Array<number>;
		Interpolate: Array<string>;
	};
};
declare type PROPERTY_TPTZ_T = {
	A1: number;
	A2: number;
	B0: number;
	B1: number;
	B2: number;
	'Input Voltage': number;
	'Output Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		A1: Array<number>;
		A2: Array<number>;
		B0: Array<number>;
		B1: Array<number>;
		B2: Array<number>;
	};
};
declare type PROPERTY_NOTE_T = {
	Note: string;
	tag: string;
	'Text Style': string;
	'Show Marker': string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Note: Array<number>;
	};
};
declare type PROPERTY_FUSE_T = {
	'Current Rating': number;
	Resistance: number;
	Voltage: number;
	Broken: boolean;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		'Current Rating': Array<number>;
		Resistance: Array<number>;
	};
};
declare type PROPERTY_DFF_T = {
	'Input Voltage1': number;
	'Last Clock': number;
	Clock: number;
	Q: number;
	'!Q': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {};
};
declare type PROPERTY_VCCA_T = {
	'Low Voltage': number;
	'High Voltage': number;
	Elm0: number;
	Elm1: number;
	Elm2: number;
	Elm3: number;
	Interpolate: string;
	'Input Voltage': number;
	'Output Capacitance': number;
	'Initial Voltage': number;
	'Transient Resistance': number;
	'Transient Current': number;
	'Equivalent Current': number;
	'Transient Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Elm0: Array<number>;
		Elm1: Array<number>;
		Elm2: Array<number>;
		Elm3: Array<number>;
		'Initial Voltage': Array<number>;
		Interpolate: Array<string>;
	};
};
declare type PROPERTY_VCL_T = {
	'Low Voltage': number;
	'High Voltage': number;
	Elm0: number;
	Elm1: number;
	Elm2: number;
	Elm3: number;
	Interpolate: string;
	'Input Voltage': number;
	'Output Inductance': number;
	'Initial Current': number;
	'Transient Resistance': number;
	'Transient Current': number;
	'Equivalent Current': number;
	'Transient Voltage': number;
	tag: string;
	units: string;
	options: Array<string>;
	options_units: Array<string>;
	option_limits: {
		Elm0: Array<number>;
		Elm1: Array<number>;
		Elm2: Array<number>;
		Elm3: Array<number>;
		'Initial Current': Array<number>;
		Interpolate: Array<string>;
	};
};
declare type NET_COLOR_T = [string, number];
declare type ELEMENT_OPTIONS_T = {
	[c0: string]: number;
	c1: number;
	c2: number;
	c3: number;
};
declare type LANGUAGE_T = {
	[English: string]: string;
	Spanish: string;
	French: string;
	Italian: string;
	Dutch: string;
	Russian: string;
	German: string;
	Indonesian: string;
};
declare type ELEMENT_PROPERTY_T = PROPERTY_META_DATA_T &
	PROPERTY_RESISTOR_T &
	PROPERTY_SPST_T &
	PROPERTY_NOT_T &
	PROPERTY_DIODE_T &
	PROPERTY_LED_T &
	PROPERTY_ZENER_T &
	PROPERTY_VOLTMETER_T &
	PROPERTY_WATTMETER_T &
	PROPERTY_AMMETER_T &
	PROPERTY_OHMMETER_T &
	PROPERTY_WIRE_T &
	PROPERTY_DCSOURCE_T &
	PROPERTY_ACSOURCE_T &
	PROPERTY_SQUAREWAVE_T &
	PROPERTY_ACCURRENT_T &
	PROPERTY_DCCURRENT_T &
	PROPERTY_CAPACITOR_T &
	PROPERTY_INDUCTOR_T &
	PROPERTY_GROUND_T &
	PROPERTY_NET_T &
	PROPERTY_CONSTANT_T &
	PROPERTY_POTENTIOMETER_T &
	PROPERTY_AND_T &
	PROPERTY_OR_T &
	PROPERTY_NAND_T &
	PROPERTY_NOR_T &
	PROPERTY_XOR_T &
	PROPERTY_XNOR_T &
	PROPERTY_VCSW_T &
	PROPERTY_VCR_T &
	PROPERTY_VCVS_T &
	PROPERTY_VCCS_T &
	PROPERTY_CCCS_T &
	PROPERTY_CCVS_T &
	PROPERTY_SPDT_T &
	PROPERTY_OPAMP_T &
	PROPERTY_VSAT_T &
	PROPERTY_SAW_T &
	PROPERTY_TRI_T &
	PROPERTY_ADD_T &
	PROPERTY_SUB_T &
	PROPERTY_MUL_T &
	PROPERTY_GRT_T &
	PROPERTY_DIV_T &
	PROPERTY_NMOS_T &
	PROPERTY_PMOS_T &
	PROPERTY_NPN_T &
	PROPERTY_PNP_T &
	PROPERTY_TRAN_T &
	PROPERTY_ADC_T &
	PROPERTY_DAC_T &
	PROPERTY_PWM_T &
	PROPERTY_INTEGRATOR_T &
	PROPERTY_DIFFERENTIATOR_T &
	PROPERTY_GAIN_T &
	PROPERTY_ABS_T &
	PROPERTY_LPF_T &
	PROPERTY_HPF_T &
	PROPERTY_RAIL_T &
	PROPERTY_REL_T &
	PROPERTY_PID_T &
	PROPERTY_SAH_T &
	PROPERTY_LUT_T &
	PROPERTY_TPTZ_T &
	PROPERTY_NOTE_T &
	PROPERTY_FUSE_T &
	PROPERTY_DFF_T &
	PROPERTY_VCCA_T &
	PROPERTY_VCL_T;

declare type PROPERTY_STORAGE_T = {
	Type: number;
	Id: number;
	Property: ELEMENT_PROPERTY_T;
};
