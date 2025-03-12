## Problems

### ERR_OSSL_EVP_UNSUPPORTED

Starting the development server...

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:471:10)
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:503:5
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:358:12
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/react-scripts/scripts/start.js:19
  throw err;
  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:417:16)
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:452:10
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/webpack/lib/NormalModule.js:323:13
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:367:11
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:233:18
    at context.callback (/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/react-scripts/node_modules/babel-loader/lib/index.js:59:103 {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.20.3
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

### Solution

1) Upgrade node

```bash
nvm install v22.14.0
```

2) Use the legacy provider

```bash
export NODE_OPTIONS=--openssl-legacy-provider
yarn start
```

### Error: [BABEL] Requires Babel "^7.16.0", but was loaded with "7.12.3"

Failed to compile.

./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js
Error: [BABEL] /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js: Requires Babel "^7.16.0", but was loaded with "7.12.3". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel. (While processing: "/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/babel-preset-react-app/dependencies.js$0$2")
    at Generator.next (<anonymous>)
    at Generator.next (<anonymous>)
    at Generator.next (<anonymous>)
    at cachedFunction.next (<anonymous>)
    at loadPluginDescriptor.next (<anonymous>)
    at loadPluginDescriptors.next (<anonymous>)
    at Generator.next (<anonymous>)
    at loadFullConfig.next (<anonymous>)

### Solution

1) Downgrade caniuse

```bash
rm -rf node_modules
rm yarn.lock
yarn add caniuse-lite@1.0.30001632
```

2) Update package.json

```json
"resolutions": {
    "caniuse-lite": "1.0.30001632"
  },
```