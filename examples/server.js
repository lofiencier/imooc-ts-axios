const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath:'/__build__/',
  stats:{
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
router.get('/api/greeting',function(req,res){
  res.json({ msg:'hello axios' });
});
router.get('/get/params',function(req,res){
  const { before, log, data = [], string='' } = req.query;
  res.json({
    be:JSON.stringify(before),
    log:!log,
    data:data.join('.'),
    string:string.split('')
  });
})
router.post('/base/post',function(req,res){
  res.json(req.body)
});
router.post('/base/buffer',function(req,res){
  let msg = [];
  req.on('data',chunks=>{
    if(chunks){
      console.log('chunks',chunks);
      msg.push(chunks)
    }
  });
  req.on('end',()=>{
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  })
});
app.use(router);

const port = process.env.PORT || 3000;
module.exports = app.listen(port, function(){
  console.log(`server listening on http://localhost:${port}`);
})