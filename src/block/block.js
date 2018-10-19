/**
 * BLOCK: animation-block
 *
 * Registering a basic block with Gutenberg.
 *
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
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ga/block-animation-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Animation Block' ), // Block title.
	icon: 'controls-play',
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
