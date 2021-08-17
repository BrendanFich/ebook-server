const { env } = require('../env')
const UPLOAD_PATH =
  env === 'dev'
    ? '../../../ebookUpload/admin-upload-ebook'
    : '/root/upload/admin-upload/ebook'
module.exports = {
  CODE_SUCCESS: 0,
  CODE_ERROR: -1,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'admin_imooc_token_key',
  JWT_EXPRIRED: 60 * 60,
  UPLOAD_PATH,
  UPLOAD_URL: 'https://chenjunjian.com/admin-upload-ebook',
  MIME_TYPE_EPUB: 'application/epub+zip'
}