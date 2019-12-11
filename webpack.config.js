const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const __dir = path.resolve(__dirname,'examples');
module.exports={
  mode:'development',
  entry:fs.readdirSync(__dir).reduce((entries, dir)=>{
    const fullDir = path.join(__dir,dir);
    const entry = path.join(fullDir,'app.ts');
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
      console.log('entry',entry);
      entries[dir] = ['webpack-hot-middleware/client',entry];
    }
    return entries;
  }, {}),
  output:{
    path: path.join(__dirname,'__build__'),
    filename:'[name].js',
    publicPath:'/__build__/',
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        enforce:'pre',
        use:[
          {
            loader:'tslint-loader'
          }
        ]
      },
      {
        test:/\.tsx?$/,
        use:[
          {
            loader:'ts-loader',
            options:{
              transpileOnly:true
            }
          }
        ]
      }
    ]
  },
  resolve:{
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}