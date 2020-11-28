/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Element1.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This is the bare-minimum that is required to describe a single node element.
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
class Element1 {
    constructor(id, type, properties) {
        /* Node 1 id */
        this.n1 = -1;
        /* The type of component */
        this.type = -1;
        /* The unique identifier of the component */
        this.id = -1;
        /* The number of inputs or outputs of the device */
        this.port_size = 1;
        /* The rotation of the component  */
        this.rotation = 0;
        /* The flip of the component */
        this.flip = 0;
        /* The instrinsic properties of the component */
        this.properties = null;
        /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
      inprecise nature. */
        this.FUDGE_FACTOR = 0.98;
        /* Node 1 id */
        this.n1 = -1;
        /* The type of component */
        this.type = type;
        /* The unique identifier of the component */
        this.id = id;
        /* The number of inputs or outputs of the device */
        this.port_size = 1;
        /* The rotation of the component  */
        this.rotation = 0;
        /* The flip of the component */
        this.flip = 0;
        /* The instrinsic properties of the component */
        this.properties = properties;
        /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
        inprecise nature. */
        this.FUDGE_FACTOR = 0.98;
    }
    /* Set the properties of the component */
    set_properties(properties) {
        this.properties = properties;
    }
    /* Get the properties of the component */
    get_properties() {
        return this.properties;
    }
    /* Set the rotation of the component */
    set_rotation(rotation) {
        this.rotation = rotation;
    }
    /* Get the rotation of the component */
    get_rotation() {
        return this.rotation;
    }
    /* Sets the flip of the component */
    set_flip(flip) {
        this.flip = flip;
    }
    /* Get the flip of hte component */
    get_flip() {
        return this.flip;
    }
    /* Get the component port size */
    get_port_size() {
        return this.port_size;
    }
    /* Set the id of attached node 1 */
    set_node_1(n1) {
        this.n1 = n1;
    }
    /* Get the id of attached node 1 */
    get_node_1() {
        return this.n1;
    }
    /* Set multiple nodes */
    set_nodes(n1) {
        this.n1 = n1;
    }
    /* Get multiple nodes */
    get_nodes() {
        return Array(this.n1);
    }
    /* A quick check to see if the element is consistent, elements will have
    -1 as their reference when they are not anchored. */
    consistent() {
        return this.n1 > -1;
    }
    /* General algorithm to map the spacial location to nodes */
    map_node1(x1, y1) {
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
        let h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
        let x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
        let y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
        let n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            this.n1 = n1;
        }
    }
    /* Generates a unique id from a "row" and "col" */
    to_index(sqrt, ...i) {
        return i[1] * sqrt + i[0];
    }
    /* Helper function to keep the elements within the grid and on the intersections of it. */
    snap_to_grid(x1, y1) {
        /* Limit the x and y values to fit within the bounds of the grid. */
        x1 = global.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
        y1 = global.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let x_1 = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) /
            workspace.bounds.get_width()) *
            sqrt);
        let y_1 = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) /
            workspace.bounds.get_height()) *
            sqrt);
        let n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            return Array(nodes[n1].location.x, nodes[n1].location.y);
        }
        return Array(x1, y1);
    }
    round(value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
}
