const os = require("os");
/***
 * load homedir .env
 * QCLOUD_SECRET_ID,QCLOUD_SECRET_KEY,QCLOUD_CMV_PASSWORD
 */
require('dotenv').config({ path: `${os.homedir()}/.env` })