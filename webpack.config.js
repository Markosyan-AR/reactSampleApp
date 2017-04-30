const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: "./index.ts",
        vendor: './vendor.ts',
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&minetype=image/svg+xml"
            }
        ]
    },

    plugins: [
        extractLess,
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};