const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		vendor: "./src/js/vendors.js", // ["jquery", "bootstrap"],
		app: ["whatwg-fetch", "./src/js/main.js"]
	},
	output: {
		filename: "[name].bundle.js",
		publicPath: "/", // Required for react-router
		path: path.resolve(__dirname, "dist")
	},
	devtool: "#source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
				include: [path.resolve(__dirname, "src")]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					"file-loader?name=images/[name].[ext]",
					"image-webpack-loader"
				],
				include: [path.resolve(__dirname, "src/img")]
			},
			{
				test: /\.(woff2?|svg)$/,
				loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
			},
			{
				test: /\.(ttf|eot)$/,
				loader: "file-loader?name=fonts/[name].[ext]"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "ADI podcasts app",
			template: "./src/index.html",
			minify: {
				collapseWhitespace: true
			},
			chunks: [
				"vendor", // first
				"app" // rest
			],
			chunksSortMode: function(chunk1, chunk2) {
				var orders = ["vendor", "app"];
				var order1 = orders.indexOf(chunk1.names[0]);
				var order2 = orders.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new ExtractTextPlugin({
			filename: "css/[name].css",
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			// inject ES5 modules as global vars
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
			// Tether: "tether"
			// in case bootstrap's modules were imported individually, they must also be provided here:
			// Util: "exports-loader?Util!bootstrap/js/dist/util",
		})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		// If you want your server to be accessible externally
		host: "0.0.0.0",
		//// Open browser
		open: true,
		historyApiFallback: true,
		// If running on a virtual machine
		disableHostCheck: true
	}
};
