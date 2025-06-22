import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ScoopSocials - Mobile Demo</title>
        <meta name="description" content="ScoopSocials - Building trust in digital connections through community-driven social verification" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#00BCD4" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ScoopSocials - Mobile Demo" />
        <meta property="og:description" content="Building trust in digital connections through community-driven social verification" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="ScoopSocials - Mobile Demo" />
        <meta property="twitter:description" content="Building trust in digital connections through community-driven social verification" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="mobile-viewport mobile-frame bg-white flex flex-col relative">
          {/* Mobile Status Bar */}
          <div className="bg-white px-4 py-2 flex justify-between items-center text-xs font-semibold flex-shrink-0">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* App Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-hide">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        
        {/* Desktop Info Panel */}
        <div className="ml-8 max-w-md hidden lg:block">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📱 ScoopSocials Mobile</h1>
          <p className="text-gray-600 mb-6">Experience the complete mobile login and onboarding flow. This responsive demo works on all devices.</p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Test the Flow:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Try both "Create Account" and "Sign In"</li>
              <li>• Use verification code: <strong>123456</strong></li>
              <li>• Select Free, Professional, or Venue account</li>
              <li>• Complete the full onboarding flow</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Features Implemented:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• ✅ Phone verification system</li>
              <li>• ✅ Three-tier account structure</li>
              <li>• ✅ Contact import flow</li>
              <li>• ✅ Mobile-first responsive design</li>
              <li>• ✅ Complete authentication flow</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}