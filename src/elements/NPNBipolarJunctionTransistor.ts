/**********************************************************************
 * Project           : Circuit Solver
 * File		        : NPNBipolarJunctionTransistor.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the NPNBJT element. It will automatically generate
 *                   the stamps necessary to simulate and it will also draw the component and
 *                   handle its movement / node dependencies.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class NPNBipolarJunctionTransistor {
  public INITIALIZED = false;
  /* Create a new rectangle for the bounds of this component */
  public bounds = new RectF(0, 0, 0, 0);
  /* Inititalize the element2 class that will hold the basic data about our component */
  public elm = new Element3(-1, -1, global.NULL);

  public p1 = new PointF(0, 0);
  public p2 = new PointF(0, 0);
  public p3 = new PointF(0, 0);

  public npn_0 = new PointF(0, 0);
  public npn_1 = new PointF(0, 0);
  public npn_2 = new PointF(0, 0);
  public npn_3 = new PointF(0, 0);
  public npn_4 = new PointF(0, 0);
  public npn_5 = new PointF(0, 0);
  public npn_6 = new PointF(0, 0);
  public npn_7 = new PointF(0, 0);
  public npn_8 = new PointF(0, 0);
  /* Calculating the "true" center of an equilateral triangle, not the centroid. */
  public equilateral_center = [];
  /* The center (x-coord) of the bounds */
  public c_x = this.bounds.get_center_x();
  /* The center (y-coord) of the bounds */
  public c_y = this.bounds.get_center_y();
  /* The spacing of the nodes in the x-direction, divided by 2 */
  public x_space = global.node_space_x >> 1;
  /* The spacing of the nodes in the y-direction, divided by 2 */
  public y_space = global.node_space_y >> 1;
  /* Some points we'll be extending the leads of the resistor to. */
  public connect1_x = 0;
  public connect1_y = 0;
  public connect2_x = 0;
  public connect2_y = 0;
  /* Angle from p1 to p2 minus 90 degrees */
  public theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;

  /* Angle from p1 to p2 */
  public theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
  /* Angle from center to p2 */
  public phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
  public grid_point = [];
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint = new Paint();
  /* This paint is used for drawing the "nodes" that the component is connected to. */
  public point_paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint = new Paint();
  /* Flag to denote when the component is actually moving. */
  public is_translating = false;
  public wire_reference = [];
  /* This is to keep track of the simulation id's */
  public simulation_id = 0;
  public GAMMA = 0.12;
  public KAPPA = 0.414;
  public GMIN = 1e-9;
  public GMIN_START = 12;
  public DAMPING_SAFETY_FACTOR = 0.97;
  /* Used to limit the amount of travel for the bounds (so the graphics don't get clipped
or overlapped)*/
  public indexer = 0;
  public m_x = 0;
  public m_y = 0;
  public MULTI_SELECTED = false;
  /* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
  public LINE_BUFFER = [];
  public CIRCLE_BUFFER = [];
  public BUILD_ELEMENT = true;
  public ANGLE = 0;

  constructor(type, id, n1, n2, n3) {
    this.INITIALIZED = false;
    /* Create a new rectangle for the bounds of this component */
    this.bounds = new RectF(0, 0, 0, 0);
    /* Inititalize the element2 class that will hold the basic data about our component */
    this.elm = new Element3(id, type, global.copy(global.PROPERTY_NPN));
    /* Initialize the initial nodes that the component will be occupying */
    this.elm.set_nodes(n1, n2, n3);
    if (this.elm.consistent()) {
      /* Re-locate the bounds of the component to the center of the two points. */
      this.equilateral_center = global.equilateral_triangle_center(
        nodes[this.elm.n1].location.x,
        nodes[this.elm.n2].location.x,
        nodes[this.elm.n3].location.x,
        nodes[this.elm.n1].location.y,
        nodes[this.elm.n2].location.y,
        nodes[this.elm.n3].location.y
      );
      this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
    }
    /* Set the rotation of this component to 0. */
    this.elm.set_rotation(global.ROTATION_0);
    /* Set the flip of the component to 0, resistors should not be flippable. */
    this.elm.set_flip(global.FLIP_0);
    /* Re-map those bad boys! */
    this.release_nodes();
    let vertices = this.get_vertices();
    this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
    /* Add this components references to the nodes it's attached to currently. */
    this.capture_nodes();
    this.p1 = new PointF(0, 0);
    this.p2 = new PointF(0, 0);
    this.p3 = new PointF(0, 0);
    if (this.elm.consistent()) {
      /* Create some points to hold the node locations, this will be used for drawing components */
      this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
      this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
      this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
    }
    this.npn_0 = new PointF(0, 0);
    this.npn_1 = new PointF(0, 0);
    this.npn_2 = new PointF(0, 0);
    this.npn_3 = new PointF(0, 0);
    this.npn_4 = new PointF(0, 0);
    this.npn_5 = new PointF(0, 0);
    this.npn_6 = new PointF(0, 0);
    this.npn_7 = new PointF(0, 0);
    this.npn_8 = new PointF(0, 0);
    /* Calculating the "true" center of an equilateral triangle, not the centroid. */
    this.equilateral_center = [];
    /* The center (x-coord) of the bounds */
    this.c_x = this.bounds.get_center_x();
    /* The center (y-coord) of the bounds */
    this.c_y = this.bounds.get_center_y();
    /* The spacing of the nodes in the x-direction, divided by 2 */
    this.x_space = global.node_space_x >> 1;
    /* The spacing of the nodes in the y-direction, divided by 2 */
    this.y_space = global.node_space_y >> 1;
    /* Some points we'll be extending the leads of the resistor to. */
    this.connect1_x = 0;
    this.connect1_y = 0;
    this.connect2_x = 0;
    this.connect2_y = 0;
    if (this.elm.flip === global.FLIP_180) {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
    } else if (this.elm.flip === global.FLIP_0) {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.PI_DIV_2;
    } else {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
    }
    /* Angle from p1 to p2 */
    this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    /* Angle from center to p2 */
    this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
    this.grid_point = [];
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
    this.line_paint.set_color(global.ELEMENT_COLOR);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
    this.line_paint.set_font(global.DEFAULT_FONT);
    this.line_paint.set_alpha(255);
    this.line_paint.set_paint_align(this.line_paint.align.CENTER);
    /* This paint is used for drawing the "nodes" that the component is connected to. */
    this.point_paint = new Paint();
    this.point_paint.set_paint_style(this.point_paint.style.FILL);
    this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
    this.point_paint.set_paint_join(this.point_paint.join.MITER);
    this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
    this.point_paint.set_color(global.ELEMENT_COLOR);
    this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
    this.point_paint.set_font(global.DEFAULT_FONT);
    this.point_paint.set_alpha(255);
    this.point_paint.set_paint_align(this.point_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.text_paint = new Paint();
    this.text_paint.set_paint_style(this.text_paint.style.FILL);
    this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
    this.text_paint.set_paint_join(this.text_paint.join.MITER);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
    this.text_paint.set_color(global.ELEMENT_COLOR);
    this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
    this.text_paint.set_font(global.DEFAULT_FONT);
    this.text_paint.set_alpha(255);
    this.text_paint.set_paint_align(this.text_paint.align.CENTER);
    /* Flag to denote when the component is actually moving. */
    this.is_translating = false;
    this.build_element();
    this.wire_reference = [];
    /* This is to keep track of the simulation id's */
    this.simulation_id = 0;
    this.GAMMA = 0.12;
    this.KAPPA = 0.414;
    this.GMIN = 1e-9;
    this.GMIN_START = 12;
    this.DAMPING_SAFETY_FACTOR = 0.97;
    /* Used to limit the amount of travel for the bounds (so the graphics don't get clipped
  or overlapped)*/
    this.indexer = 0;
    this.m_x = 0;
    this.m_y = 0;
    this.INITIALIZED = true;
    this.MULTI_SELECTED = false;
    /* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
    this.LINE_BUFFER = [];
    this.CIRCLE_BUFFER = [];
    this.BUILD_ELEMENT = true;
    this.ANGLE = 0;
  }
  refresh_bounds() {
    if (this.elm.consistent()) {
      this.p1 = new PointF(0, 0);
      this.p2 = new PointF(0, 0);
      this.p3 = new PointF(0, 0);
      /* Create some points to hold the node locations, this will be used for drawing components */
      this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
      this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
      this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
      /* Re-locate the bounds of the component to the center of the two points. */
      this.equilateral_center = global.equilateral_triangle_center(
        nodes[this.elm.n1].location.x,
        nodes[this.elm.n2].location.x,
        nodes[this.elm.n3].location.x,
        nodes[this.elm.n1].location.y,
        nodes[this.elm.n2].location.y,
        nodes[this.elm.n3].location.y
      );
      this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
    }
  }
  push_reference(ref) {
    this.wire_reference.push(ref);
  }
  stamp() {
    if (this.elm.consistent()) {
      let b = global.copy(this.elm.n3);
      let c = global.copy(this.elm.n1);
      let e = global.copy(this.elm.n2);
      /* Collector-Emitter Gain w/ respect to Vbc */
      engine_functions.stamp_across_nodes(c, b, 1.0 / this.elm.properties['g_ce']);
      engine_functions.stamp_across_nodes(b, e, 1.0 / this.elm.properties['g_ce']);
      engine_functions.stamp_across_nodes(c, e, -1.0 / this.elm.properties['g_ce']);
      engine_functions.stamp_node(b, -1.0 / this.elm.properties['g_ce']);
      /* Emitter-Collector Gain w/ respect to Vbc */
      engine_functions.stamp_across_nodes(e, b, 1.0 / this.elm.properties['g_ec']);
      engine_functions.stamp_across_nodes(b, c, 1.0 / this.elm.properties['g_ec']);
      engine_functions.stamp_across_nodes(e, c, -1.0 / this.elm.properties['g_ec']);
      engine_functions.stamp_node(b, -1.0 / this.elm.properties['g_ec']);
      /* Collector resistance stamp */
      engine_functions.stamp_resistor(c, b, 1.0 / this.elm.properties['g_cc']);
      /* Emitter resistance stamp */
      engine_functions.stamp_resistor(e, b, 1.0 / this.elm.properties['g_ee']);
      /* Collector-base Equivalent Current */
      engine_functions.stamp_current(b, c, this.elm.properties['I_c']);
      /* Emitter-base Equivalent Current */
      engine_functions.stamp_current(b, e, this.elm.properties['I_e']);
    }
  }
  calculate_vcrit() {
    return (
      this.elm.properties['Emission Coefficient'] *
      global.vt *
      Math.log((this.elm.properties['Emission Coefficient'] * global.vt) / (1.41421 * this.elm.properties['Saturation Current']))
    );
  }
  is_converged() {
    if (this.get_npnbjt_error() < global.settings.TOLERANCE) {
      return true;
    } else {
      return false;
    }
  }
  reset_npn() {
    this.elm.properties['Vbe'] = 0;
    this.elm.properties['Vbc'] = 0;
    this.elm.properties['Last Vbe'] = this.calculate_vcrit();
    this.elm.properties['Last Io'] = global.settings.TOLERANCE * 2;
    this.update();
  }
  get_npnbjt_error() {
    return Math.abs(this.elm.properties['Vbe'] - this.elm.properties['Last Vbe']);
  }
  /* General function to handle any processing required by the component */
  update() {
    if (global.FLAG_SIMULATING && simulation_manager.SOLUTIONS_READY) {
      if (this.elm.consistent()) {
        /* Save the last voltages and currents */
        this.elm.properties['Last Vbe'] = this.elm.properties['Vbe'];
        this.elm.properties['Last Io'] = this.elm.properties['I_e'] - this.elm.properties['I_c'];
        /* Derive Vbe safely. */
        let next_vbe = engine_functions.get_voltage(this.elm.n3, this.elm.n2);
        let vcrit = this.calculate_vcrit();
        let vbe = 0;
        if (next_vbe > this.DAMPING_SAFETY_FACTOR * vcrit) {
          vbe = global.log_damping(next_vbe, this.elm.properties['Vbe'], this.GAMMA, this.KAPPA);
        } else if (next_vbe < -this.DAMPING_SAFETY_FACTOR * vcrit) {
          vbe = global.log_damping(next_vbe, this.elm.properties['Vbe'], this.GAMMA, this.KAPPA);
        } else {
          vbe = next_vbe;
        }
        vbe = global.limit(vbe, -vcrit, vcrit);
        /* Limit the extreme ranges. */
        this.elm.properties['Vbe'] = vbe;
        /* Derive Vbc safely. */
        let next_vbc = engine_functions.get_voltage(this.elm.n3, this.elm.n1);
        let vbc = 0;
        if (next_vbc > this.DAMPING_SAFETY_FACTOR * vcrit) {
          vbc = global.log_damping(next_vbc, this.elm.properties['Vbc'], this.GAMMA, this.KAPPA);
        } else if (next_vbc < -this.DAMPING_SAFETY_FACTOR * vcrit) {
          vbc = global.log_damping(next_vbc, this.elm.properties['Vbc'], this.GAMMA, this.KAPPA);
        } else {
          vbc = next_vbc;
        }
        vbc = global.limit(vbc, -vcrit, vcrit);
        /* Limit the extreme ranges. */
        this.elm.properties['Vbc'] = vbc;
        /* Handle PN Junciton GMIN iteration. */
        this.gmin_step(this.GMIN_START, this.get_npnbjt_error());
        /* Update the npnbjt */
        let forward_alpha = this.elm.properties['Forward Beta'] / (1 + this.elm.properties['Forward Beta']);
        let reverse_alpha = this.elm.properties['Reverse Beta'] / (1 + this.elm.properties['Reverse Beta']);
        this.elm.properties['g_ee'] = (this.elm.properties['Saturation Current'] / global.vt) * Math.exp(this.elm.properties['Vbe'] / global.vt);
        this.elm.properties['g_ec'] = reverse_alpha * (this.elm.properties['Saturation Current'] / global.vt) * Math.exp(this.elm.properties['Vbc'] / global.vt);
        this.elm.properties['g_ce'] = forward_alpha * (this.elm.properties['Saturation Current'] / global.vt) * Math.exp(this.elm.properties['Vbe'] / global.vt);
        this.elm.properties['g_cc'] = (this.elm.properties['Saturation Current'] / global.vt) * Math.exp(this.elm.properties['Vbc'] / global.vt);
        this.elm.properties['i_e'] =
          -this.elm.properties['Saturation Current'] * (Math.exp(this.elm.properties['Vbe'] / global.vt) - 1) +
          reverse_alpha * this.elm.properties['Saturation Current'] * (Math.exp(this.elm.properties['Vbc'] / global.vt) - 1);
        this.elm.properties['i_c'] =
          forward_alpha * this.elm.properties['Saturation Current'] * (Math.exp(this.elm.properties['Vbe'] / global.vt) - 1) -
          this.elm.properties['Saturation Current'] * (Math.exp(this.elm.properties['Vbc'] / global.vt) - 1);
        this.elm.properties['I_e'] =
          this.elm.properties['i_e'] + this.elm.properties['g_ee'] * this.elm.properties['Vbe'] - this.elm.properties['g_ec'] * this.elm.properties['Vbc'];
        this.elm.properties['I_c'] =
          this.elm.properties['i_c'] - this.elm.properties['g_ce'] * this.elm.properties['Vbe'] + this.elm.properties['g_cc'] * this.elm.properties['Vbc'];
      }
    }
  }
  gmin_step(step, error) {
    this.GMIN = global.GMIN_DEFAULT;
    if (simulation_manager.ITERATOR > step && error > global.settings.TOLERANCE) {
      this.GMIN = Math.exp(-24.723 * (1.0 - 0.99 * (simulation_manager.ITERATOR / global.settings.ITL4)));
    }
  }
  /* Vertex handling (for rotation) */
  /* Work on this... IT's not 100%, the locations of plus and minus need to be looked at...*/
  get_vertices() {
    let vertices = [];
    let p1 = [];
    let p2 = [];
    let p3 = [];
    if (this.elm.rotation === global.ROTATION_0) {
      if (this.elm.flip === global.FLIP_0) {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
      } else if (this.elm.flip === global.FLIP_180) {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
      } else {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
      }
      vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    } else if (this.elm.rotation === global.ROTATION_90) {
      if (this.elm.flip === global.FLIP_0) {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
      } else if (this.elm.flip === global.FLIP_180) {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
      } else {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
      }
      vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    } else if (this.elm.rotation === global.ROTATION_180) {
      if (this.elm.flip === global.FLIP_0) {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
      } else if (this.elm.flip === global.FLIP_180) {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
      } else {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
      }
      vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    } else if (this.elm.rotation === global.ROTATION_270) {
      if (this.elm.flip === global.FLIP_0) {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
      } else if (this.elm.flip === global.FLIP_180) {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
      } else {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
      }
      vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    } else {
      if (this.elm.flip === global.FLIP_0) {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
      } else if (this.elm.flip === global.FLIP_180) {
        p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
        p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
        p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
      } else {
        p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
        p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
        p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
      }
      vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    }
    return vertices;
  }
  release_wires() {
    if (this.wire_reference.length > 0) {
      let id = -1;
      for (var i = this.wire_reference.length - 1; i > -1; i--) {
        id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
        if (id > -1 && id < wires.length) {
          wires[id].release_nodes();
          wires.splice(id, 1);
        }
      }
      this.wire_reference = [];
    }
  }
  /* Handle capture and release from nodes themselves... (references) */
  release_nodes() {
    if (this.elm.consistent()) {
      nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
      nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
      nodes[this.elm.n3].remove_reference(this.elm.id, this.elm.type);
      this.elm.set_nodes(-1, -1, -1);
    }
  }
  /* Push the components references to the Nodes */
  capture_nodes() {
    let vertices = this.get_vertices();
    this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
    if (this.elm.consistent() && !this.is_translating) {
      nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
      nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
      nodes[this.elm.n3].add_reference(this.elm.id, this.elm.type);
    }
  }
  /* Handling a mouse down event. */
  mouse_down() {
    if (
      global.FLAG_IDLE &&
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_ZOOM &&
      !global.FLAG_ELEMENT_OPTIONS &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_SELECT_ELEMENT &&
      !global.FLAG_SELECT_TIMESTEP &&
      !global.FLAG_SELECT_SETTINGS &&
      !global.FLAG_REMOVE_ALL &&
      !global.FLAG_MENU_OPEN_DOWN
    ) {
      if (!global.focused && !global.component_touched && !global.multi_selected) {
        if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.component_touched) {
          this.is_translating = false;
          global.focused_id = this.elm.id;
          global.focused_type = this.elm.type;
          global.focused_bounds = global.copy(this.bounds);
          global.focused = true;
          global.component_touched = true;
        } else {
          if (this.elm.consistent() && !global.component_touched && !global.FLAG_SIMULATING) {
            if (nodes[this.elm.n1].contains_xy(global.mouse_x, global.mouse_y)) {
              this.handle_wire_builder(this.elm.n1, global.ANCHOR_POINT['p1']);
              global.component_touched = true;
            } else if (nodes[this.elm.n2].contains_xy(global.mouse_x, global.mouse_y)) {
              this.handle_wire_builder(this.elm.n2, global.ANCHOR_POINT['p2']);
              global.component_touched = true;
            } else if (nodes[this.elm.n3].contains_xy(global.mouse_x, global.mouse_y)) {
              this.handle_wire_builder(this.elm.n3, global.ANCHOR_POINT['p3']);
              global.component_touched = true;
            }
          }
        }
      }
    }
  }
  /* This is to help build wires! */
  handle_wire_builder(n, anchor) {
    if (global.WIRE_BUILDER['step'] === 0) {
      global.WIRE_BUILDER['n1'] = n;
      global.WIRE_BUILDER['type1'] = this.elm.type;
      global.WIRE_BUILDER['id1'] = this.elm.id;
      global.WIRE_BUILDER['anchor_point1'] = anchor;
      global.WIRE_BUILDER['linkage1']['wire'] = global.WIRE_BUILDER['step'];
      global.WIRE_BUILDER['step']++;
    } else if (global.WIRE_BUILDER['step'] === 1) {
      global.WIRE_BUILDER['n2'] = n;
      global.WIRE_BUILDER['type2'] = this.elm.type;
      global.WIRE_BUILDER['id2'] = this.elm.id;
      global.WIRE_BUILDER['anchor_point2'] = anchor;
      global.WIRE_BUILDER['linkage2']['wire'] = global.WIRE_BUILDER['step'];
      global.WIRE_BUILDER['step']++;
    }
  }
  move_element(dx, dy) {
    wire_manager.reset_wire_builder();
    this.unanchor_wires();
    this.release_nodes();
    this.m_x = this.c_x + dx;
    this.m_y = this.c_y + dy;
    if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
      this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
    } else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
      this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
    }
    if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
      this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
    } else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
      this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
    }
    this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
    this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
    this.refactor();
    this.capture_nodes();
    this.anchor_wires();
  }
  /* Handling a mouse move event. */
  mouse_move() {
    if (global.FLAG_IDLE && !global.FLAG_SIMULATING) {
      /* Move the bounds of the element. Re-locates the center of the bounds. */
      if (global.focused) {
        if (global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
          /* Prevent the screen from moving, we are only handling one wire point at a time. */
          global.IS_DRAGGING = false;
          if (!this.is_translating) {
            if (!this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1)) {
              this.release_nodes();
              this.bounds.anchored = false;
              this.is_translating = true;
              global.component_translating = true;
              this.select();
            }
          } else {
            this.m_x = global.mouse_x;
            this.m_y = global.mouse_y;
            if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
              this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
            } else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
              this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
            }
            if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
              this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
            } else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
              this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
            }
            this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
            wire_manager.reset_wire_builder();
            this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
            this.unanchor_wires();
            this.BUILD_ELEMENT = true;
          }
        }
      }
    }
  }
  /* Handling a mouse up event. */
  mouse_up() {
    if (global.FLAG_IDLE) {
      if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
        if (this.is_translating) {
          this.is_translating = false;
          this.capture_nodes();
          this.push_history();
          this.bounds.anchored = true;
          this.anchor_wires();
        } else {
          if (!global.selected) {
            this.select();
          } else {
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
              global.selected_id = global.NULL;
              global.selected_type = global.NULL;
              global.selected_bounds = global.NULL;
              global.selected_properties = global.NULL;
              global.selected_wire_style = global.NULL;
              global.selected = false;
            } else {
              this.select();
            }
          }
        }
        global.focused_id = global.NULL;
        global.focused_type = global.NULL;
        global.focused_bounds = global.NULL;
        global.focused = false;
      }
      if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
        global.selected_bounds = global.copy(this.bounds);
      }
    }
  }
  select() {
    if (global.WIRE_BUILDER['step'] != 0) {
      wire_manager.reset_wire_builder();
    }
    global.selected_id = this.elm.id;
    global.selected_type = this.elm.type;
    global.selected_bounds = global.copy(this.bounds);
    global.selected_properties = global.copy(this.elm.properties);
    global.selected_wire_style = global.NULL;
    global.selected = true;
  }
  remove_focus() {
    if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
      global.focused_id = global.NULL;
      global.focused_type = global.NULL;
      global.focused_bounds = global.NULL;
      global.focused = false;
    }
  }
  remove_selection() {
    if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
      global.selected_id = global.NULL;
      global.selected_type = global.NULL;
      global.selected_bounds = global.NULL;
      global.selected_properties = global.NULL;
      global.selected_wire_style = global.NULL;
      global.selected = false;
    }
  }
  wire_reference_maintenance() {
    if (this.wire_reference.length > 0 && global.SIGNAL_WIRE_DELETED) {
      let id = -1;
      for (var i = this.wire_reference.length - 1; i > -1; i--) {
        id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
        if (!(id > -1 && id < wires.length)) {
          this.wire_reference.splice(i, 1);
        }
      }
    }
  }
  unanchor_wires() {
    if (this.wire_reference.length > 0) {
      let vertices = this.get_vertices();
      let id = -1;
      for (var i = this.wire_reference.length - 1; i > -1; i--) {
        id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
        if (id > -1 && id < wires.length) {
          if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
            wires[id].release_nodes();
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[0];
              wires[id].p1.y = vertices[1];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.y = vertices[1];
              wires[id].p2.x = vertices[0];
            }
          } else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
            wires[id].release_nodes();
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[2];
              wires[id].p1.y = vertices[3];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.x = vertices[2];
              wires[id].p2.y = vertices[3];
            }
          } else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p3']) {
            wires[id].release_nodes();
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[4];
              wires[id].p1.y = vertices[5];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.x = vertices[4];
              wires[id].p2.y = vertices[5];
            }
          }
        } else {
          this.wire_reference.splice(i, 1);
        }
      }
    }
  }
  anchor_wires() {
    if (this.wire_reference.length > 0) {
      let vertices = this.get_vertices();
      let id = -1;
      for (var i = this.wire_reference.length - 1; i > -1; i--) {
        id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
        if (id > -1 && id < wires.length) {
          if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[0];
              wires[id].p1.y = vertices[1];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.x = vertices[0];
              wires[id].p2.y = vertices[1];
            }
            wires[id].capture_nodes();
          } else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[2];
              wires[id].p1.y = vertices[3];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.x = vertices[2];
              wires[id].p2.y = vertices[3];
            }
            wires[id].capture_nodes();
          } else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p3']) {
            if (this.wire_reference[i]['linkage'] === 0) {
              wires[id].p1.x = vertices[4];
              wires[id].p1.y = vertices[5];
            } else if (this.wire_reference[i]['linkage'] === 1) {
              wires[id].p2.x = vertices[4];
              wires[id].p2.y = vertices[5];
            }
            wires[id].capture_nodes();
          }
        } else {
          this.wire_reference.splice(i, 1);
        }
      }
    }
  }
  set_flip(flip) {
    this.BUILD_ELEMENT = true;
    wire_manager.reset_wire_builder();
    this.unanchor_wires();
    this.push_history();
    this.release_nodes();
    this.elm.set_flip(flip);
    this.refactor();
    this.capture_nodes();
    this.anchor_wires();
  }
  /* Sets the rotation of the component */
  set_rotation(rotation) {
    this.BUILD_ELEMENT = true;
    wire_manager.reset_wire_builder();
    this.unanchor_wires();
    this.push_history();
    this.release_nodes();
    this.elm.set_rotation(rotation);
    this.refactor();
    this.capture_nodes();
    this.anchor_wires();
  }
  /* Push the changes of this object to the element observer */
  push_history() {
    if (this.INITIALIZED) {
      global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
    }
  }
  /* Generate the SVG for the component. */
  build_element() {
    let cache_0 = 2.075 * this.x_space;
    let cache_1 = 2.075 * this.y_space;
    let cache_2 = 2.0 * this.x_space;
    let cache_3 = 2.0 * this.y_space;
    let cache_4 = 3.0 * this.x_space;
    let cache_5 = 3.0 * this.y_space;
    let cache_6 = 2.1 * this.x_space;
    let cache_7 = 2.1 * this.y_space;
    let cache_8 = 0.707 * this.x_space;
    let cache_9 = 0.707 * this.y_space;
    let cache_10 = this.x_space;
    let cache_11 = this.y_space;
    if (this.BUILD_ELEMENT || global.SIGNAL_BUILD_ELEMENT) {
      /* Top segment */
      this.npn_0.x = this.p1.x + cache_10 * global.cosine(this.theta);
      this.npn_0.y = this.p1.y + cache_11 * global.sine(this.theta);
      if (this.elm.flip === global.FLIP_180) {
        this.npn_1.x = this.npn_0.x + cache_0 * global.cosine(this.theta_m90 + global.PI_DIV_12);
        this.npn_1.y = this.npn_0.y + cache_1 * global.sine(this.theta_m90 + global.PI_DIV_12);
      } else if (this.elm.flip === global.FLIP_0) {
        this.npn_1.x = this.npn_0.x + cache_0 * global.cosine(this.theta_m90 - global.PI_DIV_12);
        this.npn_1.y = this.npn_0.y + cache_1 * global.sine(this.theta_m90 - global.PI_DIV_12);
      } else {
        this.npn_1.x = this.npn_0.x + cache_0 * global.cosine(this.theta_m90 - global.PI_DIV_12);
        this.npn_1.y = this.npn_0.y + cache_1 * global.sine(this.theta_m90 - global.PI_DIV_12);
      }
      this.npn_2.x = this.p1.x + cache_10 * global.cosine(this.theta) + cache_2 * global.cosine(this.theta_m90);
      this.npn_2.y = this.p1.y + cache_11 * global.sine(this.theta) + cache_3 * global.sine(this.theta_m90);
      this.npn_3.x = this.p1.x + cache_4 * global.cosine(this.theta);
      this.npn_3.y = this.p1.y + cache_5 * global.sine(this.theta);
      if (this.elm.flip === global.FLIP_180) {
        this.npn_4.x = this.npn_3.x + cache_0 * global.cosine(this.theta_m90 - global.PI_DIV_12);
        this.npn_4.y = this.npn_3.y + cache_1 * global.sine(this.theta_m90 - global.PI_DIV_12);
      } else if (this.elm.flip === global.FLIP_0) {
        this.npn_4.x = this.npn_3.x + cache_0 * global.cosine(this.theta_m90 + global.PI_DIV_12);
        this.npn_4.y = this.npn_3.y + cache_1 * global.sine(this.theta_m90 + global.PI_DIV_12);
      } else {
        this.npn_4.x = this.npn_3.x + cache_0 * global.cosine(this.theta_m90 + global.PI_DIV_12);
        this.npn_4.y = this.npn_3.y + cache_1 * global.sine(this.theta_m90 + global.PI_DIV_12);
      }
      this.npn_5.x = this.p1.x + cache_4 * global.cosine(this.theta) + cache_2 * global.cosine(this.theta_m90);
      this.npn_5.y = this.p1.y + cache_5 * global.sine(this.theta) + cache_3 * global.sine(this.theta_m90);
      this.npn_6.x = this.p3.x - cache_6 * global.cosine(this.theta_m90);
      this.npn_6.y = this.p3.y - cache_7 * global.sine(this.theta_m90);
      /* Arrow */
      if (this.elm.flip === global.FLIP_180) {
        this.npn_7.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 - global.PI_DIV_4);
        this.npn_7.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 - global.PI_DIV_4);
        this.npn_8.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 + global.PI_DIV_12);
        this.npn_8.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 + global.PI_DIV_12);
      } else if (this.elm.flip === global.FLIP_0) {
        this.npn_7.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 + global.PI_DIV_4);
        this.npn_7.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 + global.PI_DIV_4);
        this.npn_8.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 - global.PI_DIV_12);
        this.npn_8.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 - global.PI_DIV_12);
      } else {
        this.npn_7.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 + global.PI_DIV_4);
        this.npn_7.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 + global.PI_DIV_4);
        this.npn_8.x = this.npn_3.x + cache_8 * global.cosine(this.theta_m90 - global.PI_DIV_12);
        this.npn_8.y = this.npn_3.y + cache_9 * global.sine(this.theta_m90 - global.PI_DIV_12);
      }
      this.BUILD_ELEMENT = false;
    }
  }
  /* General function to help with resizing, i.e., canvas dimension change, zooming*/
  resize() {
    if (this.BUILD_ELEMENT || global.SIGNAL_BUILD_ELEMENT) {
      if (this.bounds.anchored) {
        if (this.elm.consistent()) {
          /* Set the bounds of the element */
          this.equilateral_center = global.equilateral_triangle_center(
            nodes[this.elm.n1].location.x,
            nodes[this.elm.n2].location.x,
            nodes[this.elm.n3].location.x,
            nodes[this.elm.n1].location.y,
            nodes[this.elm.n2].location.y,
            nodes[this.elm.n3].location.y
          );
          this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
          this.refactor();
        }
        this.unanchor_wires();
        this.anchor_wires();
      } else {
        this.refactor();
      }
      /* Resize the stroke widths and the text sizes. */
      this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
      this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
      this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
      this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
      this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
    }
  }
  /* This is used to update the SVG */
  refactor() {
    /* Movement of the bounds is handled in mouse move */
    /* Re-factor the vector graphics */
    let vertices = this.get_vertices();
    this.p1.x = vertices[0];
    this.p1.y = vertices[1];
    this.p2.x = vertices[2];
    this.p2.y = vertices[3];
    this.p3.x = vertices[4];
    this.p3.y = vertices[5];
    this.x_space = global.node_space_x >> 1;
    this.y_space = global.node_space_y >> 1;
    this.c_x = this.bounds.get_center_x();
    this.c_y = this.bounds.get_center_y();
    if (this.elm.flip === global.FLIP_180) {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
    } else if (this.elm.flip === global.FLIP_0) {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.PI_DIV_2;
    } else {
      /* Angle from p1 to p2 minus 90 degrees */
      this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
    }
    /* Angle from p1 to p2 */
    this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    /* Angle from center to p2 */
    this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
    this.build_element();
  }
  increment_rotation() {
    this.elm.rotation++;
    if (this.elm.rotation > global.ROTATION_270) {
      this.elm.rotation = global.ROTATION_0;
    }
    this.set_rotation(this.elm.rotation);
  }
  increment_flip() {
    this.elm.flip++;
    if (this.elm.flip > global.FLIP_180) {
      this.elm.flip = global.FLIP_0;
    }
    this.set_flip(this.elm.flip);
  }
  recolor() {
    if (global.selected) {
      if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
        this.line_paint.set_color(global.SELECTED_COLOR);
        this.point_paint.set_color(global.SELECTED_COLOR);
        this.text_paint.set_color(global.SELECTED_COLOR);
      } else {
        this.line_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.text_paint.set_color(global.ELEMENT_COLOR);
      }
    } else {
      if (this.MULTI_SELECTED) {
        this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
        this.point_paint.set_color(global.MULTI_SELECTED_COLOR);
        this.text_paint.set_color(global.MULTI_SELECTED_COLOR);
      } else {
        this.line_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.text_paint.set_color(global.ELEMENT_COLOR);
      }
    }
  }
  is_selected_element() {
    return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
  }
  /* Draws the component */
  draw_component(canvas) {
    this.wire_reference_maintenance();
    this.recolor();
    this.resize();
    /* Help multi-select determine the maximum bounds... */
    /* Each element has a finite bounds, let's help determine a box that bounds the entire grouping of selected elements. */
    if (this.MULTI_SELECTED) {
      multi_select_manager.determine_enveloping_bounds(this.bounds);
    }
    if (
      global.PICTURE_REQUEST ||
      (this.c_x >= view_port.left - global.node_space_x &&
        this.c_x - global.node_space_x <= view_port.right &&
        this.c_y >= view_port.top + -global.node_space_y &&
        this.c_y - global.node_space_y <= view_port.bottom)
    ) {
      this.indexer = 0;
      this.CIRCLE_BUFFER = [];
      this.LINE_BUFFER = [];
      this.LINE_BUFFER[this.indexer++] = Array(this.p1.x, this.p1.y, this.npn_0.x, this.npn_0.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_0.x, this.npn_0.y, this.npn_1.x, this.npn_1.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.p2.x, this.p2.y, this.npn_3.x, this.npn_3.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_3.x, this.npn_3.y, this.npn_4.x, this.npn_4.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_1.x, this.npn_1.y, this.npn_4.x, this.npn_4.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_2.x, this.npn_2.y, this.npn_5.x, this.npn_5.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_6.x, this.npn_6.y, this.p3.x, this.p3.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_3.x, this.npn_3.y, this.npn_7.x, this.npn_7.y);
      this.LINE_BUFFER[this.indexer++] = Array(this.npn_3.x, this.npn_3.y, this.npn_8.x, this.npn_8.y);
      canvas.draw_line_buffer(this.LINE_BUFFER, this.line_paint);
      this.indexer = 0;
      this.CIRCLE_BUFFER[this.indexer++] = Array(this.p1.x, this.p1.y, global.CANVAS_STROKE_WIDTH_2_ZOOM);
      this.CIRCLE_BUFFER[this.indexer++] = Array(this.p2.x, this.p2.y, global.CANVAS_STROKE_WIDTH_2_ZOOM);
      this.CIRCLE_BUFFER[this.indexer++] = Array(this.p3.x, this.p3.y, global.CANVAS_STROKE_WIDTH_2_ZOOM);
      canvas.draw_circle_buffer(this.CIRCLE_BUFFER, this.point_paint);
      if (global.DEVELOPER_MODE) {
        canvas.draw_rect2(this.bounds, this.line_paint);
        canvas.draw_text(this.wire_reference.length, this.c_x, this.c_y - 50, this.text_paint);
      }
      if (global.WORKSPACE_ZOOM_SCALE > 1.085 || (!global.MOBILE_MODE && global.WORKSPACE_ZOOM_SCALE >= 0.99)) {
        this.ANGLE = global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        if ((this.ANGLE > 170 && this.ANGLE < 190) || (this.ANGLE > -10 && this.ANGLE < 10)) {
          canvas.rotate(this.c_x, this.c_y, -90);
          canvas.draw_text(
            global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Forward Beta'])).replace('{UNIT}', this.elm.properties['units']),
            this.c_x,
            this.bounds.top - this.bounds.get_height() * 0.15,
            this.text_paint
          );
          canvas.draw_text(
            global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', String(this.elm.id)),
            this.c_x,
            this.bounds.bottom + this.bounds.get_height() * 0.15,
            this.text_paint
          );
          canvas.restore();
        } else if ((this.ANGLE > 260 && this.ANGLE < 280) || (this.ANGLE > 80 && this.ANGLE < 100)) {
          canvas.draw_text(
            global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Forward Beta'])).replace('{UNIT}', this.elm.properties['units']),
            this.c_x,
            this.bounds.top - this.bounds.get_height() * 0.15,
            this.text_paint
          );
          canvas.draw_text(
            global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', String(this.elm.id)),
            this.c_x,
            this.bounds.bottom + this.bounds.get_height() * 0.15,
            this.text_paint
          );
        }
      }
      if (this.is_translating) {
        canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.node_space_x << 2, global.node_space_y << 2, global.move_paint);
      }
    }
  }
  /* Handles future proofing of elements! */
  patch() {
    if (!global.not_null(this.GMIN)) {
      this.GMIN = 1e-9;
    }
    if (!global.not_null(this.GMIN_START)) {
      this.GMIN_START = 12;
    }
    if (this.GMIN != 1e-9) {
      this.GMIN = 1e-9;
    }
    if (this.GMIN_START != 12) {
      this.GMIN_START = 12;
    }
    if (this.GAMMA != 0.12) {
      this.GAMMA = 0.12;
    }
    if (this.KAPPA != 0.414) {
      this.KAPPA = 0.414;
    }
    if (!global.not_null(this.LINE_BUFFER)) {
      /* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
      this.LINE_BUFFER = [];
    }
    if (!global.not_null(this.CIRCLE_BUFFER)) {
      this.CIRCLE_BUFFER = [];
    }
    if (!global.not_null(this.BUILD_ELEMENT)) {
      this.BUILD_ELEMENT = false;
    }
    if (!global.not_null(this.ANGLE)) {
      this.ANGLE = 0;
    }
    if (!global.not_null(this.indexer)) {
      this.indexer = 0;
    }
  }
  time_data() {
    /* #INSERT_GENERATE_TIME_DATA# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    let time_data = global.copy(global.TIME_DATA_TEMPLATE);
    let keys = Object.keys(this.elm.properties);
    for (var i = keys.length - 1; i > -1; i--) {
      if (typeof this.elm.properties[keys[i]] === 'number') {
        if (keys[i] === 'Frequency' || keys[i] === 'Resistance' || keys[i] === 'Capacitance' || keys[i] === 'Inductance') {
          time_data[keys[i]] = global.copy(this.elm.properties[keys[i]]);
        }
      }
    }

    return time_data;
    /* <!-- END AUTOMATICALLY GENERATED !--> */
  }
  reset() {}
}