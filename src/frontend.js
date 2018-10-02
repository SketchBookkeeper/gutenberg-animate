/**
 * Frontend
 */

import emergence from 'emergence.js';

const options = {
	callback: function( element, state ) {
		if (
			state === 'visible' &&
			! element.classList.contains( element.dataset.in )
		) {
			element.classList.add( element.dataset.in );
		} else if (
			state === 'reset' &&
			element.classList.contains( element.dataset.in )
		) {
			if ( element.dataset.reset === 'true' ) {
				element.classList.remove( element.dataset.in );
			} else {
				element.classList.replace( 'hide-before', 'show-before' );
			}
		}
	},
};

emergence.init( options );
