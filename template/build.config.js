const esbuild = require('esbuild');
const path = require('path');

// Build configuration
const buildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  target: 'es2020',
  format: 'esm',
  outdir: 'public/dist',
  sourcemap: true,
  minify: false,
  watch: false,
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  loader: {
    '.ts': 'ts',
    '.js': 'js'
  },
  plugins: [],
  external: [],
  metafile: false,
  treeShaking: true,
  splitting: false,
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  entryNames: '[name]',
  publicPath: '/dist/',
  write: true,
  logLevel: 'info',
  color: true
};

// Development configuration
const devConfig = {
  ...buildConfig,
  sourcemap: 'inline',
  minify: false,
  watch: true,
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  outfile: 'public/dist/bundle.js',
  logLevel: 'info'
};

// Production configuration
const prodConfig = {
  ...buildConfig,
  sourcemap: 'external',
  minify: true,
  watch: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  outfile: 'public/dist/bundle.min.js',
  logLevel: 'warning',
  legalComments: 'none',
  treeShaking: true,
  splitting: true,
  metafile: true
};

// Build functions
async function buildDev() {
  console.log('🔨 Building for development...');
  try {
    const result = await esbuild.build(devConfig);
    console.log('✅ Development build completed');
    return result;
  } catch (error) {
    console.error('❌ Development build failed:', error);
    process.exit(1);
  }
}

async function buildProd() {
  console.log('🚀 Building for production...');
  try {
    const result = await esbuild.build(prodConfig);
    console.log('✅ Production build completed');
    
    // Generate bundle analysis if metafile exists
    if (result.metafile) {
      const analysis = await esbuild.analyzeMetafile(result.metafile);
      console.log('\n📊 Bundle Analysis:');
      console.log(analysis);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Production build failed:', error);
    process.exit(1);
  }
}

async function watchDev() {
  console.log('👀 Starting development watch mode...');
  try {
    const context = await esbuild.context(devConfig);
    await context.watch();
    console.log('✅ Development watch mode started');
  } catch (error) {
    console.error('❌ Development watch mode failed:', error);
    process.exit(1);
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'dev':
  case 'development':
    buildDev();
    break;
    
  case 'prod':
  case 'production':
    buildProd();
    break;
    
  case 'watch':
    watchDev();
    break;
    
  default:
    console.log('🔨 CanoeJS Build Tool');
    console.log('\nUsage:');
    console.log('  node build.config.js dev     # Build for development');
    console.log('  node build.config.js prod    # Build for production');
    console.log('  node build.config.js watch   # Watch mode for development');
    console.log('\nFeatures:');
    console.log('  • Environment-specific builds');
    console.log('  • Source maps (inline for dev, external for prod)');
    console.log('  • Code minification (production only)');
    console.log('  • Tree shaking and optimization');
    console.log('  • Bundle analysis (production)');
    console.log('  • Hot reload support (watch mode)');
}

module.exports = {
  buildConfig,
  devConfig,
  prodConfig,
  buildDev,
  buildProd,
  watchDev
}; 