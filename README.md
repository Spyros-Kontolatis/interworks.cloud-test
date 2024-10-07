# interworks

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Runs the json-server

```
npx json-server db.json
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Bonus features implemented

- Responsive Design
- A more complex UI using TailwindCSS
- Sorting options (by price and name ascending and descending)
- Animations on the cart icon on the top menu when an item is added to or removed from the cart.

### General Approach

I implemented BE with a json-server which mocks response for products and cart instance. For cart instance I had to use an array for POST to work (because that is how JSON server implements POST), in a normal circumstance a cart would just be an object and would be fetched upon successful authentication of a user. I split the components in base, cart and product folders and used a store for cart.

Structure of tests folder maps exactly structure of src folder for better indexing and finding of tests.

API communication happens through a class Service which implements instances of a generic HTML class. This is a very handy structure because you can split services in multiple files and you can call services in a very concise way from anywhere within the app. There are several approaches to implementing a clean API communication in an app, I have found this to be optimal because it simultaneously is concise and it can be called from anywhere within the app without polluting (for instance from within a component or a store, depending on the use case). App assumes that json-server runs on port 3000 and FE on port 8080, if for some reason the ports need to change you should also update the configuration within /services/HTTP.ts
