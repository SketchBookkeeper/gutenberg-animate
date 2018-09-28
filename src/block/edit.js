/**
 * Edit
 */
const { __ } = wp.i18n;

const {
	InspectorControls,
	InnerBlocks,
	MediaUpload,
} = wp.editor;

const {
	Component,
	Fragment,
} = wp.element;

const {
	Button,
	ColorPalette,
	Dashicon,
	Notice,
	PanelBody,
	RangeControl,
	SelectControl,
	TextareaControl,
	ToggleControl,
	Spinner,
} = wp.components;

const animations = [
	{
		label: 'None',
		value: 'none',
	},
	{
		label: 'Bounce',
		value: 'bounce',
	},
	{
		label: 'Flash',
		value: 'flash',
	},
	{
		label: 'Pulse',
		value: 'pulse',
	},
	{
		label: 'Rubber Band',
		value: 'rubberBand',
	},
	{
		label: 'Shake',
		value: 'shake',
	},
	{
		label: 'Head Shake',
		value: 'headShake',
	},
	{
		label: 'Swing',
		value: 'swing',
	},
	{
		label: 'Tada',
		value: 'tada',
	},
	{
		label: 'Wobble',
		value: 'wobble',
	},
	{
		label: 'Fade In',
		value: 'fadeIn',
	},
	{
		label: 'Bounce In Left',
		value: 'bounceInLeft',
	},
];

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
							label="Animate In"
							value={ attributes.animationIn }
							options={ animations }
							onChange={ ( value ) => {
								setAttributes( {
									animationIn: value,
								} );
							} }
						/>

						<SelectControl
							label="Animate Out"
							value={ attributes.animationOut }
							options={ animations }
							onChange={ ( value ) => {
								setAttributes( {
									animationOut: value,
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
	// Did Mount
	//
	componentDidMount() {

	}

	//
	// Did Update
	//
	componentDidUpdate( prevProps ) {
		const blocksWrapEl = this.blocksWrap.current;
		const { attributes } = this.props;

		// Provide user preview of the newly applied animation.
		// Check if a new animation was applied, add it's class.
		if ( prevProps.attributes.animationIn !== attributes.animationIn ) {
			blocksWrapEl.classList.add( attributes.animationIn );
		}

		if ( prevProps.attributes.animationOut !== attributes.animationOut ) {
			blocksWrapEl.classList.add( attributes.animationOut );
		}

		// Remove animation classes in preparation for next preview.
		blocksWrapEl.addEventListener( 'animationend', () => {
			blocksWrapEl.classList.remove( attributes.animationIn );
			blocksWrapEl.classList.remove( attributes.animationOut );
		}, { once: true } );
	}
}
