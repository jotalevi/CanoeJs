import { 
  Canoe, 
  Router, 
  PerformanceManager,
  Col, 
  Row, 
  H, 
  Button, 
  VirtualList, 
  LazyWidget, 
  Spinner,
  memo,
  EventLinker
} from "canoejs";

// Configurar optimizaciones de rendimiento
PerformanceManager.setConfig({
  enableVirtualScrolling: true,
  enableLazyLoading: true,
  enableMemoization: true,
  enableEventDelegation: true,
  enableBatchUpdates: true,
  enableRenderCaching: true,
  maxCacheSize: 1000,
  cacheTTL: 5 * 60 * 1000,
  debounceDelay: 16,
  throttleDelay: 100
});

// Widget con memoización
const MemoizedHeader = () => {
  return memo("header", () => new H({ 
    size: 1, 
    text: "CanoeJS - Ultra Fast & Lightweight" 
  }));
};

// Lista virtual para 10,000 elementos
const LargeList = () => {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `Description for item ${i}`,
    data: `Data ${i}`
  }));

  return new VirtualList({
    items,
    itemHeight: 80,
    containerHeight: 400,
    renderItem: (item) => new Col({
      css: {
        padding: "10px",
        border: "1px solid #eee",
        margin: "5px 0",
        borderRadius: "4px"
      },
      children: [
        new H({ size: 4, text: item.title }),
        new H({ size: 6, text: item.description }),
        new H({ size: 6, text: item.data })
      ]
    })
  });
};

// Widget con carga diferida
const HeavyComponent = () => {
  return new LazyWidget({
    loader: () => new Promise(resolve => {
      // Simular carga pesada
      setTimeout(() => {
        resolve(new Col({
          children: [
            new H({ size: 2, text: "Componente Pesado Cargado" }),
            new H({ size: 4, text: "Este componente se cargó de manera diferida" })
          ]
        }));
      }, 2000);
    }),
    placeholder: new Spinner({})
  });
};

// Página principal optimizada
const HomePage = () => {
  let counter = 0;

  const handleClick = () => {
    // Usar batch updates para múltiples cambios de estado
    Canoe.batchUpdate([
      () => Canoe.setState({ counter: ++counter }),
      () => Canoe.setState({ timestamp: Date.now() }),
      () => Canoe.setState({ clicks: (Canoe.getState().clicks || 0) + 1 })
    ]);
  };

  return new Col({
    css: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    children: [
      MemoizedHeader(),
      
      new Row({
        css: { margin: "20px 0" },
        children: [
          new Button({
            text: "Incrementar (Batch Update)",
            callbacks: { click: handleClick }
          }),
          new H({ size: 4, text: `Contador: ${counter}` })
        ]
      }),

      new H({ size: 2, text: "Lista Virtual (10,000 elementos)" }),
      LargeList(),

      new H({ size: 2, text: "Componente con Lazy Loading" }),
      HeavyComponent(),

      new H({ size: 2, text: "Eventos Delegados" }),
      new Row({
        children: [
          new Button({ text: "Botón 1", classes: ["btn-delegated"] }),
          new Button({ text: "Botón 2", classes: ["btn-delegated"] }),
          new Button({ text: "Botón 3", classes: ["btn-delegated"] })
        ]
      })
    ]
  });
};

// Configurar rutas
Router.addRoute("/", HomePage, "CanoeJS - Home");

// Configurar eventos delegados
EventLinker.addDelegatedEvent(".btn-delegated", "click", (e) => {
  console.log("Botón delegado clickeado:", e.target);
});

// Configurar monitoreo de rendimiento
Canoe.onLoad(() => {
  console.log("🚀 CanoeJS cargado con optimizaciones");
});

Canoe.preBuild(() => {
  PerformanceManager.measureTime("preBuild", () => {
    window['timeStart'] = performance.now();
  });
});

Canoe.postBuild(() => {
  PerformanceManager.measureTime("postBuild", () => {
    if (Canoe.debug) {
      const avgTime = PerformanceManager.getAverageTime("postBuild");
      console.log(`⚡ Tiempo promedio de renderizado: ${avgTime.toFixed(2)}ms`);
    }
  });
});

// Inicializar la aplicación
const context = {
  counter: 0,
  clicks: 0,
  timestamp: Date.now()
};

Canoe.buildApp("root", context, Router.render).render(); 