const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_EXPIRED
} = require('../utils/constant')

class Result {
  constructor(data, msg = '操作成功', options) {
    this.data = null
    // 没有参数时，默认操作成功
    if (arguments.length === 0) {
      this.msg = '操作成功'
    // 1个参数时，将该参数视为msg
    } else if (arguments.length === 1) {
      this.msg = data
    // 2个参数以上 有额外项
    } else {
      this.data = data
      this.msg = msg
      if (options) {
        this.options = options
      } 
    }
  }
  createResult() {
    if (!this.code) {
      this.code = CODE_SUCCESS
    }
    let base = {
      code: this.code,
      msg: this.msg
    }
    if (this.data) {
      base.data = this.data
    }
    if (this.options) {
      base = {...base, ...this.options}
    }
    return base
  }
  json(res) {
    res.json(this.createResult())
  }
  success(res) {
    this.code = CODE_SUCCESS
    this.json(res)
  }
  fail(res){
    this.code = CODE_ERROR
    this.json(res)
  }
  jwtError(res){
    this.code = CODE_TOKEN_EXPIRED
    this.json(res)
  }
}

module.exports = Result