
const statusCode = {
    SUCCESSCODE : 200,
    EXIST       : 304,
    ERROR       : 500, 
    LOGINFAIL   : 401
 };

const hints = {
    ERROR : {msg : '服务异常',code: statusCode.ERROR, },
    REGISTER_UNAVAILABLE: { msg: "该用户名已被占用" , code: statusCode.EXIST},
    SUCCESS({data = "", msg}) {
      return { data, msg: msg, code : statusCode.SUCCESSCODE};
    },
    LOGIN_PASSWORD_WRONG: { msg: "密码错误" ,code: statusCode.LOGINFAIL, },
    LOGIN_USER_NOT_EXIST: { msg: "用户不存在", code: statusCode.LOGINFAIL },
    CREATEFAIL: {msg: '创建失败', code: statusCode.ERROR},
    FINDFAIL({data = ""}) {
      return {data, msg: '查询失败', code: statusCode.ERROR};
    }
    // SUBSCRIBED_ALREADY: { data: "已经关注过了", msg: ERROR },
    // ADDSUB_SUCCESS: { data: "添加关注成功", msg: SUCCESS },
    // NOT_SUBSCRIBED: { data: "没有关注", msg: ERROR },
    // UNSUBSCRIBE_SUCCESS: { data: "取消关注成功", msg: SUCCESS },
    // COMMENT_SUCCESS: { data: "评论成功", msg: SUCCESS },
    // QUESTION_UNEXIST: { data: "问题不存在", msg: ERROR },
    // COMMENT_NOT_EXIST: { data: "评论不存在", msg: ERROR },
    // THUMB_ALREADY: { data: "已经点过赞了", msg: ERROR },
    // THUMB_SUCCESS: { data: "点赞成功", msg: SUCCESS }
};

module.exports = hints;
