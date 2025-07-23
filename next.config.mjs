/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  turbopack: {},                       // ✅ Turbopack (Next 15+)
  typescript: { ignoreBuildErrors: true },
})
