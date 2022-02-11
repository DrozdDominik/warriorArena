import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import './utils/db';
import { static as eStatic, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import { handleError } from "./utils/errors";
import { warriorRouter } from './routers/warrior';
import { homeRouter } from './routers/home';
import { arenaRouter } from './routers/arena';
import { hallOfFameRouter } from './routers/hallOfFame';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));

app.use(eStatic('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/fame', hallOfFameRouter);

app.use(handleError);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running...');
});

