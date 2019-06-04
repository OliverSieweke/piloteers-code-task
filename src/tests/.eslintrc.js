module.exports = {
    "env": {
        es6: true,
        node: true,
        "jest/globals": true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "script",
        ecmaFeatures: {
            globalReturn: false,
        },
    },
    "extends": ["plugin:jest/recommended"],
    "plugins": ["jest"],
};
