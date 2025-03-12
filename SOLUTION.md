## Initial Problems

### ERR_OSSL_EVP_UNSUPPORTED

```bash
$ yarn start

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
```

#### Solution

1) Upgrade node

```bash
$ nvm install v22.14.0
```

2) Use the legacy provider

```bash
$ export NODE_OPTIONS=--openssl-legacy-provider
$ yarn start
```

3) Or add the configuration to package.json

```json
"scripts": {
    "start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
    "build": "NODE_OPTIONS=--openssl-legacy-provider react-scripts build",
    "test": "NODE_OPTIONS=--openssl-legacy-provider react-scripts test --env=jsdom",
    "eject": "NODE_OPTIONS=--openssl-legacy-provider react-scripts eject"
},
```

### Error: [BABEL] Requires Babel "^7.16.0", but was loaded with "7.12.3"

```bash
$ yarn tsct
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
```

#### Solution

1) Downgrade caniuse

```bash
$ rm -rf node_modules
$ rm yarn.lock
$ yarn add caniuse-lite@1.0.30001632
```

2) Update package.json

```json
"resolutions": {
    "caniuse-lite": "1.0.30001632"
},
```

### The tsc compiler resturns 1418 errors

The tsc compiler resturns 1418 errors, most likely to tsc not being properly setup.

```bash
$ yarn tsc

## Outputs 1418 errors
```

#### Solution

1) Upgrade tsc depdendency

```bash
$ yarn add -D typescript@latest
```

### Could not find a declaration file for module 'react-router-dom'. 

```bash
$ yarn tsc
src/App.tsx:4:28 - error TS7016: Could not find a declaration file for module 'react-router-dom'. '/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/react-router-dom/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-router-dom` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-router-dom';`

4 import { HashRouter } from "react-router-dom";
```

#### Solution

1) Install the types

```bash
$ yarn add -D @types/react-router-dom @types/react@17.0.30
```

2) Update package.json

```json
"resolutions": {
    "@types/react": "17.0.30"
},
```

### Parsing error: Missing semicolon

```bash
$ yarn start

Failed to compile.

src/api/services/User/store.ts
  Line 37:11:  Parsing error: Missing semicolon.

  35 |                 )
  36 |             )
> 37 |         )) as ResultOrErrorResponse<User>;
     |           ^
  38 |
  39 |         if (!!error) {
  40 |             return {

src/hooks/useMatchedRoute.tsx
  Line 73:42:  Parsing error: Unexpected token, expected "}"

  71 |                 <Slide
  72 |                     in={match ? true : false}
> 73 |                     direction={direction as 'left' | 'right' | 'up' | 'down'}
     |                                          ^
  74 |                     timeout={300}
  75 |                     unmountOnExit
  76 |                 >

src/pages/Root/index.tsx
  Line 31:32:  Parsing error: Missing semicolon.

  29 |   const theme = useTheme();
  30 |   console.log(user);
> 31 |   const routes = [...useRoutes] as readonly TRoute[];
     |                                ^
  32 |   const [fallbackRoute] = routes;
  33 |   const Fallback = fallbackRoute.Component;
  34 |   const { route = fallbackRoute, MatchedElement } = useMatchedRoute(

src/themes/default/index.ts
  Line 18:5:  Parsing error: Only declares and type imports are allowed inside declare module.

  16 |
  17 | declare module "@mui/material/styles" {
> 18 |     interface Theme {
     |     ^
  19 |         tokens: OsapiensThemeTokens;
  20 |     }
  21 |     interface BreakpointOverrides {

src/utils/router.ts
  Line 7:5:  Parsing error: Unexpected token

   5 |     params: unknown
   6 | ): params is PathParams => {
>  7 |     if (!(params instanceof Object)) return false;
     |     ^
   8 |
   9 |     const paramSet = new Set(Object.keys(params));
  10 |
```

#### Solution

1) Update package.json

```json
"eslintConfig": {
    "extends": [
        "react-app"
    ]
}
```

### Further TypeScript compiler errors

```bash
$ yarn tsc
yarn run v1.22.22
warning package.json: No license field
$ /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/.bin/tsc
src/api/services/User/store.ts:48:22 - error TS2551: Property 'urser' does not exist on type 'UserStore'. Did you mean 'user'?

48                 this.urser = result;
                        ~~~~~

  src/api/services/User/store.ts:16:5
    16     user: User | null = null;
           ~~~~
    'user' is declared here.

src/api/services/index.tsx:1:8 - error TS1192: Module '"/home/secci/LocalSpace/osapiens-bug-bounty-challenge/src/api/services/User/index"' has no default export.

1 import User from "./User";
         ~~~~

src/components/AppHeader/index.tsx:52:13 - error TS2322: Type 'ForwardedRef<unknown>' is not assignable to type '((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined'.
  Type 'MutableRefObject<unknown>' is not assignable to type '((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined'.
    Type 'MutableRefObject<unknown>' is not assignable to type 'RefObject<HTMLDivElement>'.
      Types of property 'current' are incompatible.
        Type 'unknown' is not assignable to type 'HTMLDivElement | null'.

52     <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
               ~~~

  node_modules/@types/react/index.d.ts:818:46
    818                     ? PropsWithoutRef<P> & { ref?: Exclude<R, string> | undefined }
                                                     ~~~
    The expected type comes from property 'ref' which is declared here on type 'IntrinsicAttributes & Omit<PaperProps, "classes" | "color" | "position"> & { classes?: Partial<AppBarClasses> | undefined; color?: OverridableStringUnion<...> | undefined; enableColorOnDark?: boolean | undefined; position?: "fixed" | ... 4 more ... | undefined; sx?: SxProps<...> | undefined; } & ... 4 more ... & { ....'

src/components/AvatarMenu/index.tsx:25:20 - error TS18048: '_' is possibly 'undefined'.

25       .map((_) => (_[0] ? _[0].toLocaleUpperCase() : _))
                      ~

src/components/AvatarMenu/index.tsx:25:27 - error TS18048: '_' is possibly 'undefined'.

25       .map((_) => (_[0] ? _[0].toLocaleUpperCase() : _))
                             ~

src/components/AvatarMenu/index.tsx:38:14 - error TS18048: 'user.firstName' is possibly 'undefined'.

38     parseInt(user?.firstName[1] ? user?.firstName[1] : "m", 36) * 7
                ~~~~~~~~~~~~~~~


Found 6 errors in 4 files.

Errors  Files
     1  src/api/services/User/store.ts:48
     1  src/api/services/index.tsx:1
     1  src/components/AppHeader/index.tsx:52
     3  src/components/AvatarMenu/index.tsx:25
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

#### Solution

1) Fix the urser TypeScript error

```typescript
// src/api/services/User/store.ts
...
46        if (result) {
47            runInAction(() => {
48 -              this.urser = result;
48 +              this.user = result;
49            });
...
```

2) Fix the type export error

```typescript
// src/api/services/User/index.tsx
...
3 - import Store from './store';
3 + import User from './store';
...
23 + /*
24 + EXPORTS
25 + */
26 + 
27 + export default User;
```

```typescript
// src/api/services/index.tsx
...
17 - export default getAllServices();
17 + export default [
18 +     User
19 + ];
```
3) Fix the AppHEader ref TypeScript error

```typescript
// src/components/AppHeader/index.tsx
...
32 - const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
32 + const AppHeader = React.forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
...
```

4) Fix the '_' is possibly 'undefined' error

```typescript
// src/components/AvatarMenu/index.tsx
...
25 -       .map((_) => (_[0] ? _[0].toLocaleUpperCase() : _))
25 +       .map((_) => (_ && _[0] ? _[0].toLocaleUpperCase() : _))
...
```

```typescript
// src/components/AvatarMenu/index.tsx
...
38 -     parseInt(user?.firstName[1] ? user?.firstName[1] : "m", 36) * 7
38 +     parseInt(user?.firstName && user?.firstName[1] ? user?.firstName[1] : "m", 36) * 7
...
```

## Challenge Proposed

### Console error: Warning: Each child in a list should have a unique "key" prop.

Hope you are able to find what is causing this error, as it is annoying.

#### Solution

The error is caused by the missing key prop in the list of routes in the Root component:

```typescript
// src/pages/Root/index.tsx
...
54   <List>
55 -     {issues.map((issue) => (
55 +     {issues.map((issue, key) => (
56 -         <ListItem>
56 +         <ListItem key={key}>
57               <Typography variant="h5" sx={{ p: 2 }}>
58                   {issue.icon}
59               </Typography>
60               <ListItemText primary={issue.title} secondary={issue.description} />
61           </ListItem>
62       ))}
63   </List>
...
```

### The word "known" should be displayed bold in the introduction text.

When implementing a solution, please ensure to not change the i18n text.

#### Solution

The solution is to wrap the translation in a `<Trans>` tag and use <1> tags in localized strings to mark the text that should be bold:

```json
// src/i18n/en.json
...
9 - "intro": "This is a demo application with some glitches and bugs, where we hope that you can finde them. 😃 Here the list of <b>known</b> issues:",
9 + "intro": "This is a demo application with some glitches and bugs, where we hope that you can finde them. 😃 Here the list of <1>known</1> issues:",
...
```

```typescript
// src/pages/Root/index.tsx
...
7 - import { useTranslation } from 'react-i18next';
7 + import { Trans, useTranslation } from 'react-i18next';
...
49 -                {t('home.intro')}
49 +                <Trans t={t} i18nKey="home.intro">
50 +                    This is a demo application with some glitches and bugs, where we hope that you can finde them.
51 +                    😃 Here the list of <b>known</b> issues:
52 +                </Trans>
...
```


### User avatar in app bar is missing, although user should be fetched on app start correctly.

On app start we load the current user object via a MobX store, but for any reason the user avatar is not displayed in the top right of the app bar. Attention: When solving this issue, you might will be confronted with a second bug.

### Optional: Countdown is broken sometimes (hard to reproduce).

Some developers mentioned that the countdown in the app header behaves strange sometimes, but unfortunately they were not able to reproduce this glitch reliably, maybe you find the root cause.

#### Solution

The countdown timer in AppHeader is causing memory leaks because the setInterval is created but never cleared:

```typescript
// src/components/AppHeader/index.tsx
...
<<<
45 - useEffect(() => {
46 -     setInterval(() => {
47 -         setCount((c) => c + 1);
48 -     }, 1000);
49 - }, []);
>>>
45 + useEffect(() => {
46 +     const timer = setInterval(() => {
47 +       setCount((c) => c + 1);
48 +     }, 1000);
49 +     
50 +     // Clean up the interval when component unmounts
51 +     return () => clearInterval(timer);
52 + }, []);
...
```

### Optional: It would be great to be able to switch the language.

Please add a language select control in the app bar to swicth the UI language between english and german.