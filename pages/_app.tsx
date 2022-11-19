import '../styles/globals.css';

import { WithApollo } from '$components/ApolloClient';

function MyApp({ Component, pageProps }) {
  return (
    <WithApollo>
      <Component {...pageProps} />
    </WithApollo>
  );
}

export default MyApp;
