/**
 * Webpack Configuration
 *
 * Working of a Webpack can be very simple or complex. This is an intenally simple
 * build configuration.
 *
 * Webpack basics — If you are new the Webpack here's all you need to know:
 *     1. Webpack is a module bundler. It bundles different JS modules together.
 *     2. It needs and entry point and an ouput to process file(s) and bundle them.
 *     3. By default it only understands common JavaScript but you can make it
 *        understand other formats by way of adding a Webpack loader.
 *     4. In the file below you will find an entry point, an ouput, and a babel-loader
 *        that tests all .js files excluding the ones in node_modules to process the
 *        ESNext and make it compatible with older browsers i.e. it converts the
 *        ESNext (new standards of JavaScript) into old JavaScript through a loader
 *        by Babel.
 *
 * TODO: Instructions.
 *
 * @since 1.0.0
 */

const paths = require( './paths' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );

// Export configuration.
module.exports = {
	target: 'node', // @see https://github.com/motdotla/dotenv/issues/172
	entry: {
		'./dist/blocks.build': paths.pluginBlocksJs, // 'name' : 'path/file.ext'.
		'./dist/frontend': paths.pluginFrontendJs,
	},
	output: {
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true,
		// The dist folder.
		path: paths.pluginDist,
		filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
	},
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {

						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ],
				} ),
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader', // @see https://webpack.js.org/loaders/file-loader/
						options: {
							name: '../dist/images/[name].[ext]',
						},
					},
				],
			},
		],
	},
	// Add plugins.
	plugins: [
		new ExtractTextPlugin( './dist/block.css' ),
		new Dotenv(),
	],
	stats: 'minimal',
	// stats: 'errors-only',
	// Add externals.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		ga: 'ga', // Old Google Analytics.
		gtag: 'gtag', // New Google Analytics.
		jquery: 'jQuery', // import $ from 'jquery' // Use the WordPress version.
	},
};
