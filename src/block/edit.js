/**
 * Edit
 */
const { __ } = wp.i18n;

const {
	InspectorControls,
	InnerBlocks,
} = wp.editor;

const {
	Component,
	Fragment,
} = wp.element;

const {
	PanelBody,
	SelectControl,
	ToggleControl,
} = wp.components;

import {
	animations,
	delays,
	speeds,
} from './options';

import classNames from 'classnames';

/**
 * AnimationBlock
 */
export class AnimationBlock extends Component {
	constructor( props ) {
		super( props );

		this.blocksWrap = React.createRef();
	}

	//
	// Render
	//
	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Animation Settings' ) }>
						<SelectControl
							label="Animation"
							value={ attributes.animationIn }
							options={ animations }
							onChange={ ( value ) => {
								setAttributes( {
									animationIn: value,
								} );
							} }
						/>

						<SelectControl
							label="Animation Delay "
							value={ attributes.animationDelay }
							options={ delays }
							onChange={ ( value ) => {
								setAttributes( {
									animationDelay: value,
								} );
							} }
						/>

						<SelectControl
							label="Animation Speed"
							value={ attributes.animationSpeed }
							options={ speeds }
							onChange={ ( value ) => {
								setAttributes( {
									animationSpeed: value,
								} );
							} }
						/>

						<ToggleControl
							label="Reset Animation"
							help="Should the animation re-run every time this block enters the viewport?"
							checked={ attributes.reset }
							onChange={ () => {
								setAttributes( {
									reset: ! attributes.reset,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="gutenberg-animation-editor-block">
					<h2 className="gutenberg-animation-editor-block__title">
						{ __( 'Animation Block' ) }
					</h2>

					<div
						ref={ this.blocksWrap }
						className={
							classNames(
								'gutenberg-animation-editor-block__inner-blocks-wrap',
								'animated',
								attributes.animationDelay,
								attributes.animationSpeed,
							)
						}
					>
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	}

	//
	// Did Update
	//
	componentDidUpdate( prevProps ) {
		const blocksWrapEl = this.blocksWrap.current;
		const { attributes } = this.props;

		// Provide user preview of the newly applied animation attribute.
		if (
			attributes.animationIn !== prevProps.attributes.animationIn ||
			attributes.animationDelay !== prevProps.attributes.animationDelay ||
			attributes.animationSpeed !== prevProps.attributes.animationSpeed
		) {
			blocksWrapEl.classList.add( attributes.animationIn );
		}

		// Remove animation classes in preparation for next preview.
		blocksWrapEl.addEventListener( 'animationend', () => {
			blocksWrapEl.classList.remove( attributes.animationIn );
		}, { once: true } );
	}
}
