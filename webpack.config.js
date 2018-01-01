const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = path.join(__dirname, 'dist');
const exclude = /(node_modules|bower_components)/;


module.exports = env => {
	return {
    entry: ['babel-polyfill', './src/index.js'],
		output: {
			path: dist,
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
      extensions: ['.js', '.jsx', '.css'],
			alias: {
				// Run `npm install preact-compat --save`
				'react': 'preact-compat',
				// 'react-dom': 'preact-compat'
      },
      modules: [ 'src', "node_modules"],
		},
		module: {
			rules: [
        {
          test: /\.jsx?$/,
          exclude: exclude,
          loader: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { loose: true, modules: false }],
                'stage-2'
              ],
              plugins: [
                ['transform-react-jsx', { pragma: 'h' }]
              ]
            }
          }
        },
        {
          test: /\.(css)$/,
          use: ExtractText.extract({
            fallback: 'style-loader', 
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }, 
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    require('autoprefixer')({
                      browsers: ["last 10 Chrome versions"]
                    })
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      ]
		},
		plugins: [
      new ExtractText('css/[name].[hash].css'),
			new HtmlWebpackPlugin({
        // template: './src/index.html',
        title: 'New Tab :: Malendar'
      }),
		],
		devtool: 'eval',
	};
};
