# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Frontend Application Documentation

## CSS Styling Guidelines

### Font Sizes

When declaring font sizes for elements in the CSS files, please follow the instructions below:

1. Use `em` units whenever possible for font sizes. The `em` unit provides flexibility and responsiveness to different screen sizes and resolutions.

Example 1: Using `em`

```css
h1 {
  font-size: 2em;
}

p {
  font-size: 1.2em;
}
```

In this example, the `h1` element's font size will be twice the default size of its parent element, while the `p` element's font size will be 1.2 times the default size of its parent element.

2. If `em` units are not suitable, consider using `percentage` units for font sizes. The `percentage` unit allows for relative sizing based on the parent element's size.

Example 2: Using `percentage`

```css
.container {
  font-size: 90%;
}

.button {
  font-size: 120%;
}
```

Here, the `.container` class will have a font size that is 90% of its parent element's size, and the `.button` class will have a font size that is 120% of its parent element's size.

### Other Element Sizes

Similarly, when setting sizes for other elements such as margins, paddings, and widths, please adhere to the following guidelines:

1. Prefer using `em` units for element sizes. The `em` unit ensures responsiveness and adaptability to changes in parent element sizes.

Example 3: Using `em`

```css
.container {
  margin: 1em;
  padding: 0.5em;
  width: 30em;
}

.button {
  margin: 0.5em;
  padding: 0.2em;
  width: 10em;
}
```

In this example, the `.container` class has a margin and padding of 1em and 0.5em respectively, and a width of 30em. The `.button` class has a margin and padding of 0.5em and 0.2em respectively, and a width of 10em.

2. If `em` units are not appropriate, consider using `percentage` units for element sizes. The `percentage` unit allows for relative sizing based on the parent element's size.

Example 4: Using `percentage`

```css
.container {
  margin: 2%;
  padding: 1%;
  width: 80%;
}

.button {
  margin: 1%;
  padding: 0.5%;
  width: 20%;
}
```

In this case, the `.container` class has a margin and padding of 2% and 1% respectively, and a width of 80%. The `.button` class has a margin and padding of 1% and 0.5% respectively, and a width of 20%.

## Conclusion

By following these guidelines and using `em` and `percentage` units for font sizes and other element sizes, you can ensure a consistent and responsive design across different devices and screen sizes. These units adapt well to changes in parent element sizes, making them highly recommended for use in this frontend application.