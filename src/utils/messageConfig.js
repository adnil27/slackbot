import fs from 'fs';
// require the yaml module npm i yaml
import YAML from 'yaml';

export const messageConfig = YAML.parse(fs.readFileSync('./config/messageConfig.yml', 'utf8'));
