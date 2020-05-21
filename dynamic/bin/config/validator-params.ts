const { body, validationResult,check } = require('express-validator');

function checkParam(req,res):void{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
}

class returnCheckParam{
    constructor(){
        
    }
    
    users() {
        return [
            check('username').isLength({ min: 1 })
            .withMessage('username不能为空'),
        
            check('password').isLength({ min: 1 })
            .withMessage('password不能为空')
        ]
    }

    createDynamic() {
        return [
            check('dynamicContent').isLength({ min: 1 })
            .withMessage('dynamicContent不能为空'),

            check('Authorization').isLength({ min: 1 })
            .withMessage('Authorization不能为空')
        ]
    }
    
    checkgetDynamicListParam() {
        return [
            check('username').isLength({ min: 1 })
            .withMessage('username不能为空'),

            check('Authorization').isLength({ min: 1 })
            .withMessage('Authorization不能为空')
        ]
    }

    checkgetDynamicDetailParam() {
        return [
            check('id').isLength({ min: 1 })
            .withMessage('id不能为空'),

            check('Authorization').isLength({ min: 1 })
            .withMessage('Authorization不能为空')
        ]
    }
}

module.exports = {
    checkParam : checkParam,
    checkUsersParam : new returnCheckParam().users,
    checkCreateDynamicParam: new returnCheckParam().createDynamic,
    checkgetDynamicListParam: new returnCheckParam().checkgetDynamicListParam,
    checkgetDynamicDetailParam: new returnCheckParam().checkgetDynamicDetailParam
}