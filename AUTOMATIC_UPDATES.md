# Sistema de Actualizaciones Automáticas de Widgets

## Descripción

CanoeJS ahora incluye un sistema que detecta automáticamente qué widgets usan qué partes del estado global y los actualiza automáticamente cuando esas partes cambian.

## Cómo Funciona

### 1. **Detección Automática de Dependencias**
Cuando un widget se renderiza, el sistema intercepta las llamadas a `Canoe.getState()` y detecta qué propiedades del estado se están accediendo.

### 2. **Suscripción Automática**
El widget se suscribe automáticamente a los cambios de las propiedades del estado que usa.

### 3. **Actualización Automática**
Cuando `Canoe.setState()` cambia una propiedad del estado, todos los widgets que dependen de esa propiedad se actualizan automáticamente.

## Ejemplo de Uso

### Widget que Usa Estado Global
```typescript
import { Widget, Button, Canoe } from "canoejs";

class CounterWidget extends Widget {
  render(): HTMLElement {
    // El sistema detecta automáticamente que este widget usa 'counter' del estado global
    const currentCounter = Canoe.getState().counter || 0;
    
    return new Button({
      text: `Counter: ${currentCounter}`,
      callbacks: { 
        click: () => {
          const newCounter = currentCounter + 1;
          Canoe.setState({ counter: newCounter });
        }
      }
    }).render();
  }
}
```

### Widget con Múltiples Dependencias
```typescript
class UserProfileWidget extends Widget {
  render(): HTMLElement {
    // El sistema detecta que este widget usa 'user' y 'theme' del estado global
    const state = Canoe.getState();
    const userName = state.user?.name || 'Anonymous';
    const theme = state.theme || 'light';
    
    return new Card({
      body: [
        new H({ text: `Hello, ${userName}!` }),
        new P({ text: `Current theme: ${theme}` })
      ]
    }).render();
  }
}
```

## Actualización del Estado

### Actualización Simple
```typescript
// Solo actualiza widgets que usan 'counter'
Canoe.setState({ counter: 5 });
```

### Actualización Múltiple
```typescript
// Actualiza widgets que usan 'user' y/o 'theme'
Canoe.setState({ 
  user: { name: "John", age: 25 },
  theme: "dark"
});
```

### Actualización Anidada
```typescript
// Actualiza widgets que usan 'user'
const currentState = Canoe.getState();
Canoe.setState({ 
  user: { 
    ...currentState.user, 
    age: 26 
  } 
});
```

## Métodos Disponibles

### En la Clase Widget

#### `update()`
Actualiza el widget manualmente:
```typescript
this.update();
```

#### `getStateDependencies()`
Obtiene las dependencias detectadas:
```typescript
const dependencies = this.getStateDependencies();
console.log('Widget depends on:', dependencies); // ['counter', 'user']
```

#### `subscribeToGlobalState(stateKey, callback)`
Suscripción manual a cambios de estado:
```typescript
this.subscribeToGlobalState('counter', () => {
  console.log('Counter changed!');
  this.update();
});
```

## Ejemplo Completo

```typescript
import { Canoe, Widget, Button, Card, H, P } from "canoejs";

// Widget que se actualiza automáticamente
class AutoUpdateWidget extends Widget {
  render(): HTMLElement {
    const state = Canoe.getState();
    
    return new Card({
      body: [
        new H({ text: "Auto-Update Widget" }),
        new P({ text: `Counter: ${state.counter || 0}` }),
        new P({ text: `User: ${state.user?.name || 'Anonymous'}` }),
        new Button({
          text: "Increment Counter",
          callbacks: {
            click: () => {
              const newCounter = (state.counter || 0) + 1;
              Canoe.setState({ counter: newCounter });
            }
          }
        })
      ]
    }).render();
  }
}

// Uso
const widget = new AutoUpdateWidget({});
// El widget se actualizará automáticamente cuando cambie 'counter' o 'user'
```

## Beneficios

1. **Simplicidad**: No necesitas gestionar manualmente las suscripciones
2. **Automatización**: Los widgets se actualizan automáticamente
3. **Performance**: Solo se actualizan los widgets que realmente necesitan actualizarse
4. **Mantenibilidad**: El código es más limpio y fácil de entender
5. **Flexibilidad**: Puedes usar cualquier parte del estado global

## Compatibilidad

- ✅ Funciona con todos los widgets existentes
- ✅ No requiere cambios en el código existente
- ✅ Compatible con el sistema de estado global actual
- ✅ Funciona con widgets anidados y complejos

## Debug

Para ver qué dependencias tiene un widget:
```typescript
const widget = new MyWidget({});
console.log('Dependencies:', widget.getStateDependencies());
```

Para habilitar debug general:
```typescript
Canoe.debug = true;
``` 