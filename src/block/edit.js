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
	RangeControl,
	Dashicon,
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

						<RangeControl
							label={ __( 'z-index' ) }
							help="Some animations may need stacking order adjusted"
							value={ attributes.zIndex }
							onChange={ ( value ) => {
								setAttributes( { zIndex: value } );
							} }
							min={ 1 }
							max={ 999 }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="gutenberg-animation-editor-block">
					<div className="gutenberg-animation-editor-block__tab" title="Animation Block">
						<Dashicon icon="controls-play" />
						<p className="gutenberg-animation-editor-block__title">{ __( 'Select Animation Block' ) }</p>
					</div>

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
						style={ { zIndex: attributes.zIndex } }
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
