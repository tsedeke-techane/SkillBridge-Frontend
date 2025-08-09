import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
   images: {
       remotePatterns: [
          {
          protocol: 'https',
          hostname: 'skillbridge.s3.amazonaws.com',
          port: '',
          pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'miro.medium.com',
            port: '',
            pathname: '/**',
          }
       ],
   }
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);