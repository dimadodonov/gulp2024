import 'focus-visible';
import lazyImages from './modules/lazyImages';
import main from './modules/main';
import svg4everybody from 'svg4everybody';

import documentReady from './helpers/documentReady';

documentReady(() => {
    main();
    svg4everybody();
});
