<?php
/**
 * Plugin Name: Gutenberg Animate
 * Plugin URI:
 * Description: Add animation to your blocks.
 * Author: Paul Allen
 * Author URI: https://github.com/SketchBookkeeper
 * Version: 1.0.0
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
