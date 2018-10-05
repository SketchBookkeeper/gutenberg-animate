/**
 * Frontend
 */

import emergence from 'emergence.js';

const options = {
	callback: function( element, state ) {
		if ( // If element is visible
			state === 'visible' &&
			! element.classList.contains( element.dataset.in )
		) {
			element.classList.add( element.dataset.in ); // Add animation class
		} else if ( // Element is not visible
			state === 'reset' &&
			element.classList.contains( element.dataset.in )
		) {
			// Check if element needs to be reset
			if ( element.dataset.reset === 'true' ) {
				element.classList.remove( element.dataset.in );
			} else {
				element.classList.replace( 'hide-before', 'show-before' );
			}
		}
	},
};

emergence.init( options );
