import express, { Request, Response } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


var app = express();
app.use(express.json());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
import indexRouter from './routes/index';
import usersRouter from './routes/companys';

app.use('/api/companys', usersRouter);

// app.get('/api/companys', function (req:Request, res:Response) {
//   companys.sort((a,b)=>a.id - b.id);
//   console.log(companys);
//   res.status(200).json(companys);
// })



// catch 404 and forward to error handler
app.use(function(req:Request, res:Response,next:any) {
  next(createError(404));
});

// error handler
app.use(function(err:any,req:Request, res:Response,next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
 export default app;
