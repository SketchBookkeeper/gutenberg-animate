<?php
/**
 * Plugin Name: Animation Block
 * Plugin URI: https://wordpress.org/plugins/animation-block
 * Description: Add animation to your Gutenberg blocks.
 * Author: sketchbookkeeper
 * Author URI: https://github.com/SketchBookkeeper
 * Version: 1.0.2
 * License: GPL
 *
 * @package GA
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
