<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package GA
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function gutenberg_animate_block_block_assets() {
	// Scripts
	if ( ! is_admin() ) { // Frontend only
		wp_enqueue_script(
			'gutenberg_animate_block-frontend-js', // Handle.
			plugins_url( '/dist/frontend.js', dirname( __FILE__ ) ),
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
			true // Enqueue the script in the footer.
		);
	}

	// Styles.
	wp_enqueue_style(
		'gutenberg_animate_block-style-css', // Handle.
		plugins_url( '/dist/block.css', dirname( __FILE__ ) ),
		array(),
		'1.0.1'
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'gutenberg_animate_block_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function gutenberg_animate_block_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'gutenberg_animate_block-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'gutenberg_animate_block-block-editor-css', // Handle.
		plugins_url( '/dist/block.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ),
		'1.0.1'
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenberg_animate_block_editor_assets' );
