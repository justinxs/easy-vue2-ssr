module.exports = {
    root: true,
    "parser": "vue-eslint-parser",
    "parserOptions": {
        parser: '@babel/eslint-parser',
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    globals: {
        "define": "readonly",
        "ActiveXobject": "readonly"
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    "rules": {
        // 函数声明和类声明结尾不需分号
        // no-extra-semi

        // 防止正则/^[(多字节unicode)emoji]$/u.test(emoji) === false
        "no-misleading-character-class": 0,

        // vue template 属性单行与多行
        "vue/max-attributes-per-line": [2, {
            "singleline": 10,
            "multiline": 1
        }],
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline":"off",
        "vue/name-property-casing": ["error", "PascalCase"],
        'accessor-pairs': 2,
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        'block-spacing': [2, 'always'],
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        'camelcase': [0, {
            'properties': 'always'
        }],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        'curly': [2, 'multi-line'],
        'dot-location': [2, 'property'],
        // 非空文件结尾需多出一行
        'eol-last': 0,
        // 只允许全等操作符
        'eqeqeq': [0, 'allow-null'],

        'generator-star-spacing': [2, {
            'before': true,
            'after': true
        }],

        // 回调函数中有error参数需要处理
        'handle-callback-err': [2, '^(err|error)$'],

        // 代码缩进<2, 4, 'tab'>
        'indent': [2, 4, {
            'SwitchCase': 1
        }],

        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        // 关键字前后需要空格 while ()  if ()
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false
        }],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-console': 'off',
        'no-class-assign': 2,
        // 条件中使用赋值表达式提示 if (a = 1)
        'no-cond-assign': 0,

        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
        }],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,

        // 不能有多个空格 a =    1
        'no-multi-spaces': [2, {
            "ignoreEOLComments": true
        }],

        'no-multi-str': 2,
        // 允许最大空行数
        'no-multiple-empty-lines': [2, {
            'max': 1
        }],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        // 函数返回表达式提示 return a = b + 1
        'no-return-assign': [0, 'except-parens'],

        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        // 行结尾不允许加空白字节（空格或注释）
        'no-trailing-spaces': 0,
        // 未声明的全局变量提示
        'no-undef': [2, {
            "typeof": false
        }],
        // 变量初始化赋值 undefined 没意义
        'no-undef-init': 2,

        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [2, {
            'defaultAssignment': false
        }],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        // 声明的变量后续未使用
        'no-unused-vars': [2, {
            'vars': 'all',
            'args': 'none'
        }],
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        // 声明变量连写 var a, b
        'one-var': [0, {
            'initialized': 'never'
        }],

        'operator-linebreak': [2, 'after', {
        'overrides': {
            '?': 'before',
            ':': 'before'
        }
        }],
        'padded-blocks': [2, 'never'],
        // 字符串使用单引号还是双引号或反引号
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],

        // 语句结尾分号
        'semi': [2, 'always'],

        'semi-spacing': [2, {
            'before': false,
            'after': true
        }],
        'space-before-blocks': [2, 'always'],
        // function<这里是否需要空格>()
        'space-before-function-paren': [2, 'never'],

        'space-in-parens': [2, 'never'],
        // 操作符左右两边需要空格 a + b
        'space-infix-ops': 2,

        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],

        // 注释需要一个空格
        'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }],

        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        'yoda': [2, 'never'],
        // 变量初始化后不会被修改的使用const声明
        'prefer-const': 0,

        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': [2, 'always', {
            objectsInObjects: false
        }],
        'array-bracket-spacing': [2, 'never']
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "commonjs": true
    }
}
  