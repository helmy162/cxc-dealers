// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// redux
import { store, persistor } from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from './auth/JwtContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SettingsProvider>
              <BrowserRouter>
                <ScrollToTop />
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <RecoilRoot>
                            <Router />
                          </RecoilRoot>
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </BrowserRouter>
            </SettingsProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
