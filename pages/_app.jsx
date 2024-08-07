// pages/_app.js
import '../styles/globals.css'; // Move this import here

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
