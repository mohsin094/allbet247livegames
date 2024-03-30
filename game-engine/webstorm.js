System.config({
    "paths": {
        "#root/*": "./*",
        "#/*": "src/*",
        "#components/*": "src/components/*",
        "#modules/*": "./src/modules/*.js",
        "#extensions/*": "./src/extensions/*.js",
        "#models/*": "./src/models/*.js"
    },
    "excludes": ['node_modules', 'test']
});