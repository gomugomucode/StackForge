export interface DevTool {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Formatter' | 'Converter' | 'Analyzer' | 'Generator';
  icon: string;
}

export const devTools: DevTool[] = [
  { id: 'json-1', slug: 'json-formatter', title: 'JSON Formatter', description: 'Clean, beautify and validate your JSON data instantly.', category: 'Formatter', icon: 'Braces' },
  { id: 'regex-1', slug: 'regex-tester', title: 'Regex Tester', description: 'Test and debug your regular expressions in real-time.', category: 'Analyzer', icon: 'Search' },
  { id: 'jwt-1', slug: 'jwt-decoder', title: 'JWT Decoder', description: 'Decode JSON Web Tokens to inspect their payload.', category: 'Analyzer', icon: 'Lock' },
  { id: 'b64-1', slug: 'base64-tool', title: 'Base64 Converter', description: 'Encode and decode Base64 strings effortlessly.', category: 'Converter', icon: 'ArrowLeftRight' },
  { id: 'md-1', slug: 'markdown-preview', title: 'Markdown Preview', description: 'Real-time preview for your markdown documents.', category: 'Generator', icon: 'FileText' },
  { id: 'cp-1', slug: 'color-picker', title: 'Color Picker', description: 'Select and convert colors between HEX, RGB, and HSL.', category: 'Generator', icon: 'Palette' },
  { id: 'ts-1', slug: 'timestamp-converter', title: 'Timestamp Converter', description: 'Convert Epoch timestamps to human-readable dates.', category: 'Converter', icon: 'Clock' },
]
