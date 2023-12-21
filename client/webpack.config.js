// import webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

// import path module and workbox plugin
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const WorkboxPlugin = require('workbox-webpack-plugin');
// TODO: Add CSS loaders and babel to webpack.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
	return {
		mode: 'development',
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js',
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			// html template
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'Dreamcatcher Text Editor',
			}),
			// css extract plugin
			new MiniCssExtractPlugin(),
			// service worker manifest
			new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'src-sw.js',
			}),
			// manifest file, json format
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: 'Dreamcatcher Text Editor',
				short_name: 'D.T.E',
				description: 'Keep track of important tasks!',
				background_color: '#0F111A',
				theme_color: '#0F111A',
				start_url: './',
				publicPath: './',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
			}),
		],

		module: {
			// style and CSS loaders
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				// babel loader
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/transform-runtime',
							],
						},
					},
				},
			],
		},
	};
};
