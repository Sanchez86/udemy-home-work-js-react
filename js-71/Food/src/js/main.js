"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const tab = require('./moules/tabs');
    const card = require('./moules/card');
    const forms = require('./moules/forms');
    const timer = require('./moules/timer');
    const modal = require('./moules/modal');
    const calc = require('./moules/calc');
    const slider = require('./moules/slider');
    tab();
    card();
    forms();
    timer();
    modal();
    calc();
    slider();

});