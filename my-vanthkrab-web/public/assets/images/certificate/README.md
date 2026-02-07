# Certificate Images

Place your certificate images in this directory.

## Supported Formats
- PNG (recommended)
- JPG/JPEG
- WebP

## Recommended Settings
- Aspect ratio: A4 (1.414:1) or Letter (1.294:1)
- Resolution: At least 1200x850px for good quality
- File size: Optimize to < 500KB for faster loading

## File Naming Convention
Use descriptive names that match your certificate entries:
- `aws-architect.png` - AWS Solutions Architect Professional
- `aws-developer.png` - AWS Developer Associate
- `gcp-architect.png` - Google Cloud Professional Cloud Architect
- `cka.png` - Certified Kubernetes Administrator
- `postgresql.png` - PostgreSQL Professional
- `nodejs.png` - Node.js Application Developer

## Using External URLs
If you want to use an external URL instead of a local file:
1. In `Certificates.tsx`, set `isUrl: true` for the certificate
2. Use the full URL in `certificateImage` field
3. The `unoptimized` prop will be used for external images

Example:
```typescript
{
  name: "Example Certificate",
  issuer: "Example Org",
  year: "2024",
  certificateImage: "https://example.com/cert.png",
  isUrl: true,
  category: "development",
}
```
