/**
 * Created by junxie on 18/5/27.
 */
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                },
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    '@ant-prefix': 'bbb324-component'
                                },
                                paths: [path.resolve(__dirname, 'node_modules')],
                                javascriptEnabele: true
                            }
                        }
                    }
                ],
            },
         
        ]
    }
};
