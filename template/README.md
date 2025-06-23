# CanoeJS Project Template

Este es un template optimizado para CanoeJS que incluye modos de build para desarrollo y producción, soporte para múltiples package managers, y una landing page moderna.

## 🚀 Características

- **Modos de Build**: Desarrollo y producción con configuraciones optimizadas
- **Package Managers**: Soporte automático para npm, yarn, bun y pnpm
- **Hot Reload**: Recarga automática en modo desarrollo
- **Optimizaciones**: Minificación, tree shaking y análisis de bundle
- **Landing Page**: Página de inicio moderna con documentación
- **SEO Optimizado**: Meta tags y estructura para mejor indexación
- **Performance Monitoring**: Monitoreo de rendimiento en desarrollo

## 📦 Package Managers Soportados

El proyecto detecta automáticamente tu package manager preferido:

- **npm**: `npm run dev`, `npm run build`
- **yarn**: `yarn dev`, `yarn build`
- **bun**: `bun run dev`, `bun run build`
- **pnpm**: `pnpm dev`, `pnpm build`

## 🔨 Modos de Build

### Desarrollo (`npm run dev`)
```bash
npm run dev
```
- ✅ Hot reload habilitado
- ✅ Source maps inline
- ✅ Logging de debug activo
- ✅ Monitoreo de performance
- ✅ Recarga automática en cambios

### Producción (`npm run build`)
```bash
npm run build
```
- ✅ Código minificado
- ✅ Source maps externos
- ✅ Tree shaking optimizado
- ✅ Análisis de bundle
- ✅ Error boundaries
- ✅ Listo para deployment

## 📋 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot reload |
| `npm run build` | Construye para producción |
| `npm run build:dev` | Construye para desarrollo |
| `npm run build:prod` | Construye para producción |
| `npm run build:watch` | Modo watch para desarrollo |
| `npm run serve` | Sirve archivos estáticos |
| `npm run serve:dev` | Sirve con modo desarrollo |
| `npm run preview` | Construye y sirve producción |
| `npm run clean` | Limpia archivos de build |
| `npm run analyze` | Analiza el bundle de producción |
| `npm run deploy` | Prepara para deployment |
| `npm run info` | Muestra información del proyecto |

## 🏗️ Estructura del Proyecto

```
template/
├── src/
│   ├── index.ts          # Punto de entrada principal
│   ├── docs.ts           # Página de documentación
│   └── config/
│       └── build.ts      # Configuración de build
├── public/
│   ├── index.html        # HTML principal
│   ├── styles.css        # Estilos globales
│   └── dist/             # Archivos de build (generado)
├── build.config.js       # Configuración de esbuild
├── package.json          # Dependencias y scripts
└── README.md            # Este archivo
```

## ⚙️ Configuración de Build

### Desarrollo
- **Source Maps**: Inline para debugging
- **Minificación**: Deshabilitada
- **Watch Mode**: Habilitado
- **Debug**: Habilitado
- **Logging**: Habilitado

### Producción
- **Source Maps**: Externos para debugging
- **Minificación**: Habilitada
- **Tree Shaking**: Optimizado
- **Bundle Analysis**: Incluido
- **Error Boundaries**: Habilitados

## 🎯 Características de Performance

- **Virtual Scrolling**: Para listas grandes
- **Lazy Loading**: Carga diferida de componentes
- **Memoización**: Cache de cálculos costosos
- **Event Delegation**: Manejo eficiente de eventos
- **Batch Updates**: Actualizaciones en lote
- **Render Caching**: Cache de renders

## 🌐 Servidores de Desarrollo

### Con serve (recomendado)
```bash
npm run serve:dev
```

### Con otros servidores
```bash
# Python
python -m http.server 3000

# PHP
php -S localhost:3000

# Node.js
npx http-server -p 3000
```

## 📊 Análisis de Bundle

Para analizar el tamaño del bundle de producción:

```bash
npm run analyze
```

Esto generará un reporte detallado del bundle incluyendo:
- Tamaño de cada módulo
- Dependencias
- Optimizaciones aplicadas
- Sugerencias de mejora

## 🚀 Deployment

### Preparación
```bash
npm run build
```

### Servidores Estáticos
- **Netlify**: Arrastra la carpeta `public` al dashboard
- **Vercel**: Conecta tu repositorio
- **GitHub Pages**: Usa la carpeta `public`
- **Firebase Hosting**: `firebase deploy`

### Configuración de Servidor
```bash
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Apache (.htaccess)
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🔧 Personalización

### Variables de Entorno
```bash
# Desarrollo
NODE_ENV=development

# Producción
NODE_ENV=production
```

### Configuración de Build
Edita `build.config.js` para personalizar:
- Targets de navegador
- Optimizaciones específicas
- Plugins adicionales
- Configuración de esbuild

### Estilos
- `public/styles.css`: Estilos globales
- Componentes: Estilos inline en cada widget

## 🐛 Debugging

### Modo Desarrollo
- Console logs habilitados
- Source maps inline
- Performance monitoring
- Error boundaries deshabilitados

### Herramientas de Desarrollo
- Chrome DevTools
- React DevTools (compatible)
- Performance Profiler
- Network Tab

## 📈 Monitoreo de Performance

En modo desarrollo, el framework registra:
- Tiempo de renderizado
- Tiempo de carga
- Uso de memoria
- Optimizaciones aplicadas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- 📖 [Documentación](https://github.com/jotalevi/CanoeJs)
- 🐛 [Issues](https://github.com/jotalevi/CanoeJs/issues)
- 💬 [Discussions](https://github.com/jotalevi/CanoeJs/discussions)

---

**CanoeJS** - Ultra Fast & Lightweight UI Framework ⚡ 