import * as express from 'express';
import 'express-async-errors';
import './utils/db';
import { engine } from 'express-handlebars';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import { handleError } from "./utils/errors";
import { warriorRouter } from './routers/warrior';
import { menuRouter } from './routers/menu';
import { arenaRouter } from './routers/arena';
import { hallOfFameRouter } from './routers/hallOfFame';

const app = express();

app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', menuRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/fame', hallOfFameRouter);

app.use(handleError);

app.listen(3000, '127.0.0.1', () => {
    console.log('Server is running...');
});

