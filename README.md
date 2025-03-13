# OSapiens Bug Bounty Challenge Solutions

This document presents a comprehensive analysis of the issues encountered during the OSapiens Bug Bounty Challenge and their respective solutions. Each problem is described in detail along with the technical reasoning behind the chosen solutions.

## Initial Problems

### ERR_OSSL_EVP_UNSUPPORTED

**Problem Description:**  
When attempting to start the development server using `yarn start`, the application fails with an OpenSSL-related error. This occurs because Node.js v18+ uses OpenSSL v3, which has breaking changes compared to OpenSSL v1.1.x. The error specifically relates to the usage of legacy encryption algorithms that are no longer supported by default in newer OpenSSL versions, but are still used by some webpack dependencies.

```bash
$ yarn start

Starting the development server...

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:133:10)
    // ...existing code...
```

#### Solution

There are multiple approaches to solve this issue, each with its own trade-offs:

1) **Upgrade Node.js to a newer version**

This approach addresses potential security vulnerabilities in older Node versions and may resolve compatibility issues with modern dependencies.

```bash
$ nvm install v22.14.0
```

2) **Use the OpenSSL legacy provider via environment variable**

This is a quick solution that enables the legacy algorithms required by webpack without modifying project files. Useful for temporary fixes or local development environments.

```bash
$ export NODE_OPTIONS=--openssl-legacy-provider
$ yarn start
```

3) **Configure package.json to use legacy provider**

This approach ensures consistent behavior across all team members and environments by embedding the configuration in the project files.

```json
"scripts": {
    "start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
    "build": "NODE_OPTIONS=--openssl-legacy-provider react-scripts build",
    "test": "NODE_OPTIONS=--openssl-legacy-provider react-scripts test --env=jsdom",
    "eject": "NODE_OPTIONS=--openssl-legacy-provider react-scripts eject"
},
```

### Error: [BABEL] Requires Babel "^7.16.0", but was loaded with "7.12.3"

**Problem Description:**  
The application is encountering a version conflict in the Babel ecosystem. Specifically, some packages require Babel 7.16.0 or newer, but the project is currently using version 7.12.3. This dependency conflict causes the build process to fail as newer features or APIs are being referenced but are unavailable in the older version.

```bash
$ yarn tsct
Failed to compile.

./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js
Error: [BABEL] /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js: Requires Babel "^7.16.0", but was loaded with "7.12.3". 
// ...existing code...
```

#### Solution

The Babel version conflict appears to be related to the `caniuse-lite` database, which affects how the build system handles browser compatibility:

1) **Perform a clean reinstallation with a specific caniuse-lite version**

This approach resolves potential dependency conflicts by removing any previously installed dependencies and reinstalling with a specific, compatible version of caniuse-lite:

```bash
$ rm -rf node_modules
$ rm yarn.lock
$ yarn add caniuse-lite@1.0.30001632
```

2) **Update package.json with version resolutions**

The `resolutions` field in package.json explicitly forces Yarn to use a specific version of a dependency, regardless of what versions are requested by other packages. This ensures consistent dependency resolution across the entire dependency tree:

```json
"resolutions": {
    "caniuse-lite": "1.0.30001632"
},
```

This is particularly useful for addressing version conflicts in transitive dependencies (dependencies of dependencies) without having to update the direct dependencies.

### TypeScript Configuration Issues

**Problem Description:**  
The TypeScript compiler (`tsc`) is reporting 1418 errors, indicating significant configuration issues or type mismatches throughout the project. This high number of errors suggests fundamental setup problems with TypeScript rather than isolated code issues.

```bash
$ yarn tsc

## Outputs 1418 errors
```

#### Solution

The high number of TypeScript errors indicates an outdated TypeScript configuration. Updating to the latest version can address compatibility issues with newer language features and type definitions:

1) **Upgrade the TypeScript dependency**

```bash
$ yarn add -D typescript@latest
```

This updates the TypeScript compiler to the latest version, which typically includes improved type checking, bug fixes, and better compatibility with modern JavaScript features.

### Missing Type Declarations

**Problem Description:**  
TypeScript is reporting that it cannot find declaration files for essential modules like 'react-router-dom'. Without these type declarations, TypeScript cannot perform proper type checking, leading to potentially unsafe code and reduced IDE support.

```bash
$ yarn tsc
src/App.tsx:4:28 - error TS7016: Could not find a declaration file for module 'react-router-dom'. '/home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/react-router-dom/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-router-dom` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-router-dom';`

4 import { HashRouter } from "react-router-dom";
```

#### Solution

To resolve the missing type declarations, we need to install the appropriate TypeScript definition packages:

1) **Install required type definitions**

```bash
$ yarn add -D @types/react-router-dom @types/react@17.0.30
```

This adds the TypeScript type definitions for react-router-dom and ensures we're using a specific version of React types that are compatible with our project.

2) **Enforce consistent React type definitions**

React 18 introduced significant type changes. To avoid conflicts between different versions of React types in various dependencies, we can force a specific version using the resolutions field:

```json
"resolutions": {
    "@types/react": "17.0.30"
},
```

This approach ensures that all packages use the same React type definitions, preventing type incompatibilities that can cause cryptic errors.

### ESLint Parsing Errors

**Problem Description:**  
Multiple source files are triggering ESLint parsing errors, preventing successful compilation. These errors often occur when the ESLint configuration doesn't match the syntax used in the codebase (such as TypeScript features or newer JavaScript syntax).

```bash
$ yarn start

Failed to compile.

src/api/services/User/store.ts
  Line 37:11:  Parsing error: Missing semicolon.

  35 |                 )
  36 |             )
> 37 |         )) as ResultOrErrorResponse<User>;
     |           ^

// ...more parsing errors in other files...
```

#### Solution

The parsing errors suggest that ESLint isn't properly configured for the project's syntax. To resolve this:

1) **Update the ESLint configuration in package.json**

```json
"eslintConfig": {
    "extends": [
        "react-app"
    ]
}
```

This simplified configuration uses the preset provided by Create React App, which is designed to work with modern React applications using TypeScript. It handles JSX, TypeScript, and modern JavaScript features without requiring extensive custom configuration.

### TypeScript Compiler Errors

**Problem Description:**  
After addressing the initial configuration issues, the TypeScript compiler still reports several specific errors related to typos, improper type usage, and potential null references:

```bash
$ yarn tsc
yarn run v1.22.22
warning package.json: No license field
$ /home/secci/LocalSpace/osapiens-bug-bounty-challenge/node_modules/.bin/tsc
src/api/services/User/store.ts:48:22 - error TS2551: Property 'urser' does not exist on type 'UserStore'. Did you mean 'user'?

// ...more TypeScript errors...
```

#### Solution

These errors require specific code fixes to address individual type issues:

1) **Fix the typo in User store**

The error indicates a simple typo where 'urser' was used instead of 'user':

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

2) **Fix the export error in User service**

The module doesn't have a proper default export, causing import issues:

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

3) **Update the services index file to properly export User**

```typescript
// src/api/services/index.tsx
...
17 - export default getAllServices();
17 + export default [
18 +     User
19 + ];
```

4) **Fix the AppHeader ref TypeScript error**

Properly type the ref to match React's expectations for forwardRef:

```typescript
// src/components/AppHeader/index.tsx
...
32 - const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
32 + const AppHeader = React.forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
...
```

5) **Add null checks to prevent accessing properties of undefined**

```typescript
// src/components/AvatarMenu/index.tsx
...
25 -       .map((_) => (_[0] ? _[0].toLocaleUpperCase() : _))
25 +       .map((_) => (_ && _[0] ? _[0].toLocaleUpperCase() : _))
...
38 -     parseInt(user?.firstName[1] ? user?.firstName[1] : "m", 36) * 7
38 +     parseInt(user?.firstName && user?.firstName[1] ? user?.firstName[1] : "m", 36) * 7
...
```

## Challenge Problems

### Console error: Warning: Each child in a list should have a unique "key" prop.

**Problem Description:**  
React requires a unique "key" prop for each child in a list to efficiently track and update components during re-renders. This warning indicates that a list rendering component is missing these keys, which can cause performance issues and unexpected behavior when the list items change.

#### Solution

After analyzing the codebase, I found that the list of issues in the Root component was missing key props:

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

This fix adds a unique key based on the array index to each ListItem. While using array indices as keys isn't ideal when the list order might change, it resolves the warning and is appropriate for static lists like this one. The optimal solution would be to use a unique identifier from the issue object if available.

### The word "known" should be displayed bold in the introduction text.

**Problem Description:**  
The requirement specifies that the word "known" in the introduction text should be displayed in bold formatting, but this is not currently happening. The challenge is to implement this without directly modifying the internationalization (i18n) text content.

#### Solution

I implemented a solution that leverages the capabilities of the i18next library's `<Trans>` component, which allows for rich text formatting within localized strings:

1) **Use the Trans component to render formatted text:**

```typescript
// src/pages/Root/index.tsx
...
7 - import { useTranslation } from 'react-i18next';
7 + import { Trans, useTranslation } from 'react-i18next';
...
49 -                {t('home.intro')}
49 +                <Trans t={t} i18nKey="home.intro" components={{ b: <b /> }}>
50 +                    This is a demo application with some glitches and bugs, where we hope that you can finde them.
51 +                    😃 Here the list of <b>known</b> issues:
52 +                </Trans>
...
```

This approach maintains the separation between code and content while enabling rich text formatting. The `<Trans>` component interprets the *b* component in the translation string and applies the corresponding HTML elements from the component's children.

### User avatar in app bar is missing, although user should be fetched on app start correctly.

**Problem Description:**  
The user avatar should appear in the app bar after the application loads user data, but it's not displaying. The data is being fetched through a MobX store on application start, but the avatar component isn't rendering correctly despite the data being available.

#### Solution

After investigating, I found multiple issues affecting the user avatar display:

1) **Missing MobX observer wrapper**:
   The AppHeader component wasn't reactive to MobX state changes because it wasn't wrapped with the observer HOC:

```typescript
// src/components/AppHeader/index.tsx
128 - export default AppHeader;
128 + export default observer(AppHeader);
```

2) **Improper initial user object**:
   The initial user object was empty, causing property access errors:

```typescript
// src/api/services/User/store.ts
20 - user: User | null = null;
20 + user: User = {
21 +     firstName: '',
22 +     lastName: '',
23 +     eMail: '',
24 + };
```

3) **Direct data passing**:
   Passing the user object directly from store:

```typescript
// src/components/AppHeader/index.tsx
95 - <AppHeader user={user ?? {}} pageTitle={pageTitle} />
95 + <AppHeader user={userStore ? userStore.user : {}} pageTitle={pageTitle} />
```

These changes ensure proper reactivity to MobX state changes and handle the conditional rendering of the avatar when user data becomes available.

### Optional: Countdown is broken sometimes (hard to reproduce).

**Problem Description:**  
Developers reported intermittent issues with the countdown timer in the app header, although the problem was difficult to reproduce consistently. This suggests a potential memory leak or race condition.

#### Solution

After reviewing the code, I identified a memory leak in the countdown implementation. The setInterval was being created without a corresponding cleanup function:

```typescript
// src/components/AppHeader/index.tsx
...
45 - useEffect(() => {
46 -     setInterval(() => {
47 -         setCount((c) => c + 1);
48 -     }, 1000);
49 - }, []);
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

This fix properly manages the interval timer by:
1. Storing the timer reference in a variable
2. Returning a cleanup function that clears the interval when the component unmounts

Without this cleanup, every time the component re-renders, a new interval would be created while old ones continue running, causing multiple counters to run simultaneously. This would lead to unpredictable behavior and memory leaks over time.

### Optional: It would be great to be able to switch the language.

**Problem Description:**  
The application supports internationalization (i18n), but there's no user interface to switch between available languages. Adding language selection would enhance the user experience for international users.

#### Solution

I implemented a language selector in the app bar with English and German options:

1) **Added a language selector component to AppHeader**:
   - Added Material-UI Select component with language options
   - Implemented state tracking for the current language
   - Created a handler function to change the language when selected

```tsx
// In AppHeader component:
const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
};

// In the render function, added this to the Toolbar:
<Box sx={{ ml: 2 }}>
    <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        size="small"
        sx={{
            minWidth: '70px',
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
            '& .MuiSelect-select': {
                py: 0.5,
                px: 1,
            },
            '& svg': {
                color: theme.palette.primary.main,
            },
        }}
    >
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="de">DE</MenuItem>
    </Select>
</Box>
```

2) **Added German translations**:
   - Populated the previously empty German translation file with proper translations

The implementation leverages the existing i18n infrastructure with minimal changes. The language selector is styled to match the existing design language and located in the app bar for easy access. The change takes effect immediately upon selection, providing instant feedback to users.

