module.exports = {
  parser:  'babel-eslint',
  extends: 'airbnb',
  rules:   {
    'react-native/no-unused-styles':          2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles':          2,
    'react-native/no-color-literals':         2,
    'react-native/no-raw-text':               2,
    'array-bracket-spacing':                  [ 'error', 'always' ],
    'arrow-parens':                           [ 'error', 'always' ],
    'comma-dangle':                           [ 'error', 'never' ],
    'dot-location':                           [ 'error', 'property' ],
    'newline-per-chained-call':               [ 'error', { ignoreChainWithDepth: 4 } ],
    'no-bitwise':                             [ 'error', { int32Hint: true } ],
    'no-console':                             'off',
    'no-continue':                            'off',
    'no-mixed-operators':                     [ 'error', { allowSamePrecedence: true } ],
    'no-multiple-empty-lines':                [ 'error', { max: 1 } ],
    'no-param-reassign':                      [ 'error', { props: false } ],
    'no-plusplus':                            'off',
    'no-prototype-builtins':                  0,
    'no-underscore-dangle':                   'off',
    'object-curly-spacing':                   [ 'error', 'always' ],
    'object-curly-newline':                   [ 'error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern:    { multiline: true, consistent: true }
    } ],
    'prefer-destructuring':        'off',
    'space-before-function-paren': [ 'error', 'never' ],

    'react/default-props-match-prop-types': [ 'error', { allowRequiredDefaults: true } ],
    'react/forbid-prop-types':              [ 'warn', { forbid: [ 'any', 'array' ] } ],
    'react/jsx-closing-bracket-location':   [ 'error', 'after-props' ],
    'react/jsx-first-prop-new-line':        [ 'error', 'never' ],
    'react/jsx-one-expression-per-line':    'off',
    'react/destructuring-assignment':       'off',
    'react/jsx-max-props-per-line':         'off',
    'react/jsx-no-bind':                    [ 'error', { ignoreRefs: true } ],
    'react/prop-types':                     [ 'error', { ignore: [ 'children' ] } ],

    'jsx-a11y/anchor-is-valid':              'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/href-no-hash':                 'off',
    'jsx-a11y/label-has-for':                [ 'error', {
      required: { some: [ 'nesting', 'id' ] }
    } ],

    'import/extensions':                 [ 'error', 'never', { json: 'always' } ],
    'import/no-extraneous-dependencies': [ 'error', {
      devDependencies: [ './test/**/*.js', './test/**/*.jsx' ]
    } ],
    'import/order': 0,

    'no-multi-spaces': [ 'error', {
      exceptions:        { AssignmentExpression: true, VariableDeclarator: true },
      ignoreEOLComments: true
    } ],
    'key-spacing': [ 'error', {
      beforeColon: false,
      afterColon:  true,
      align:       'value'
    } ],
    'one-var-declaration-per-line': [ 'error', 'initializations' ],
    'one-var':                      [ 'error', { uninitialized: 'always', initialized: 'never' } ],
    'no-restricted-syntax':         [ 'error',
      'LabeledStatement',
      'ForInStatement',
      'WithStatement',
      'error'
    ],
    'react/sort-comp': [ 'warn', {
      order: [
        'static-methods',
        'lifecycle',
        '/^on[A-Z].+$/',
        'everything-else',
        'rendering'
      ],
      groups: {
        lifecycle: [
          'displayName',
          'propTypes',
          'defaultProps',
          'getDefaultProps',
          'contextTypes',
          'childContextTypes',
          'getChildContext',
          'mixins',
          'statics',
          'constructor',
          'getInitialState',
          'state',
          '/^(shouldC|c)omponent.+$/'
        ],
        rendering: [
          '/^render[A-Z].+$/',
          'getNode',
          'render'
        ]
      }
    } ]
  },
  settings: {
    'import/ignore':   [ 'node_modules' ],
    'import/resolver': {
      node: {
        extensions: [ '.js', '.jsx' ]
      }
    }
  },
  globals: {
    CLIENT_LANG: true,
    pdfjsViewer: true,
    pdfjsLib:    true,
    expect:      true,
    assert:      true,
    sinon:       true,
    __DEV__:     true
  },
  env: {
    browser: true,
    mocha:   true
  },
  plugins: [
    'react-native'
  ]
};
