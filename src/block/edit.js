/**
 * Edit
 */
const { __ } = wp.i18n;

const {
	InspectorControls,
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

/**
 * AnimationBlock
 */
export class AnimationBlock extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			iconError: false,
			apiKeyWarning: false,
		};
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

					</PanelBody>
				</InspectorControls>

				<div>

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
	}

}
