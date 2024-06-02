import { deleteAsync } from 'del';
import { config } from '../config.js';

const clean = () => deleteAsync(config.dest.root);

export default clean;
