import '../styles/globals.css'
import 'antd/dist/antd.css';
import '../styles/sass/styles.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { SessionProvider } from 'next-auth/react'
import MainLayout from '../components/layouts/MainLayout'
import { Provider } from 'react-redux';
import store from '../store/store'

function MyApp({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
