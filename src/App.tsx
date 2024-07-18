import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';

const GlobalErrorHandler = ({ children }: React.PropsWithChildren) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('[GlobalError] An unexpected error occurred', error);
    if (__DEV__) {
      const err = error as Error;
      return (
        <>
          <div>Name: {err.name}</div>
          <div>Error: {err.message}</div>
          <div>Stack: {err.stack}</div>
        </>
      );
    }
    return <div>An unexpected error happened. Please restart the app.</div>;
  }
};

const App = () => (
  <GlobalErrorHandler>
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  </GlobalErrorHandler>
);

export default App;
