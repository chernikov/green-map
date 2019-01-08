import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as proxy from 'http-proxy-middleware';
import * as domino from  "domino";
import * as fs from "fs";

import { join } from 'path';

enableProdMode();

const templateA = fs.readFileSync(join("./dist/browser", "index.html")).toString();
const win = domino.createWindow(templateA) as any;

win.Object = Object;
win.Math = Math;

global["window"] = win;
global["document"] = win.document;
global["branch"] = null;
global["object"] = win.object;

const proxyHttp = 'http://server';

export const app = express();

app.use(compression());
app.use(cors());
app.use('/api', proxy({target: proxyHttp}));
app.use('/download', proxy({target: proxyHttp}));
app.use('/ws', proxy({target: proxyHttp, ws: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', './dist/browser');

app.get('/redirect/**', (req, res) => {
  const location = req.url.substring(10);
  res.redirect(301, location);
});

app.get('*.*', express.static('./dist/browser', {
  maxAge: '1y'
}));

app.get('/*', (req, res) => {
  res.render('index', {req, res}, (err, html) => {
    if (html) {
      res.send(html);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});
    