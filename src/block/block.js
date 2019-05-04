/**
 * BLOCK: animation-block
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import 'animate.css';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

import classNames from 'classnames';

import { AnimationBlock } from './edit';

/**
 * Register.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ga/block-animation-block', {
	title: __( 'Animation Block' ),
	icon: 'controls-play',
	category: 'common',
	keywords: [
		__( 'Animate' ),
		__( 'Animation' ),
	],

	attributes: {
		animationIn: {
			type: 'string',
			default: 'none',
		},
		animationDelay: {
			type: 'string',
			default: 'no-delay',
		},
		animationSpeed: {
			type: 'string',
			default: 'default-speed',
		},
		reset: {
			type: 'boolean',
			default: false,
		},
		zIndex: {
			type: 'number',
			default: 1,
		},
	},

	edit: function( props ) {
		return new AnimationBlock( props );
	},

	save: function( props ) {
		const { attributes } = props;
		const hideBefore = attributes.animationIn.includes( 'In' ); // Check if element needs to be hidden before

		return (
			<div>
				<div
					style={ { zIndex: attributes.zIndex } }
					className={
						classNames(
							'gutenberg-animate-block',
							'animated',
							hideBefore ? 'hide-before' : 'show-before',
							attributes.animationDelay,
							attributes.animationSpeed,
						)
					}
					data-in={ attributes.animationIn }
					data-reset={ attributes.reset }
					data-emergence="hidden"
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
