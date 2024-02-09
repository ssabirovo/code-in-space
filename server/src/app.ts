import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import error from './middlewares/error';
import {cookieParser} from "./middlewares/cookieParser";

const app = express();

// app.get('/favicon.ico', (req, res) => res.status(204));
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(helmet());


app.use(cookieParser)

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({extended: true}));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({credentials: true}));
// app.options('*', cors);

app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


export default app;

