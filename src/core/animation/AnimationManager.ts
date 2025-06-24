import { ThemeProvider } from "../theme/ThemeProvider";

export interface AnimationConfig {
  duration: number;
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier';
  delay?: number;
  fill?: 'forwards' | 'backwards' | 'both' | 'none';
}

export interface Keyframe {
  [key: string]: string | number;
}

export class AnimationManager {
  private static animations = new Map<string, Animation>();
  private static defaultConfig: AnimationConfig = {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  };

  static animate(
    element: HTMLElement,
    keyframes: Keyframe[],
    config: Partial<AnimationConfig> = {}
  ): Promise<void> {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    const animation = element.animate(keyframes, {
      duration: finalConfig.duration,
      easing: finalConfig.easing,
      delay: finalConfig.delay || 0,
      fill: finalConfig.fill
    });

    return new Promise((resolve) => {
      animation.onfinish = () => resolve();
    });
  }

  static fadeIn(element: HTMLElement, duration: number = 300): Promise<void> {
    return this.animate(element, [
      { opacity: '0' },
      { opacity: '1' }
    ], { duration });
  }

  static fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
    return this.animate(element, [
      { opacity: '1' },
      { opacity: '0' }
    ], { duration });
  }

  static slideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down', duration: number = 300): Promise<void> {
    const keyframes = [
      { transform: this.getSlideTransform(direction, true) },
      { transform: this.getSlideTransform(direction, false) }
    ];
    
    return this.animate(element, keyframes, { duration });
  }

  static slideOut(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down', duration: number = 300): Promise<void> {
    const keyframes = [
      { transform: this.getSlideTransform(direction, false) },
      { transform: this.getSlideTransform(direction, true) }
    ];
    
    return this.animate(element, keyframes, { duration });
  }

  static scaleIn(element: HTMLElement, duration: number = 300): Promise<void> {
    return this.animate(element, [
      { transform: 'scale(0)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1' }
    ], { duration, easing: 'ease-out' });
  }

  static scaleOut(element: HTMLElement, duration: number = 300): Promise<void> {
    return this.animate(element, [
      { transform: 'scale(1)', opacity: '1' },
      { transform: 'scale(0)', opacity: '0' }
    ], { duration, easing: 'ease-in' });
  }

  static bounce(element: HTMLElement, duration: number = 600): Promise<void> {
    return this.animate(element, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.1)' },
      { transform: 'scale(0.9)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ], { duration, easing: 'ease-in-out' });
  }

  static shake(element: HTMLElement, duration: number = 500): Promise<void> {
    return this.animate(element, [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ], { duration, easing: 'ease-in-out' });
  }

  static pulse(element: HTMLElement, duration: number = 1000): Promise<void> {
    return this.animate(element, [
      { opacity: '1' },
      { opacity: '0.5' },
      { opacity: '1' }
    ], { duration, easing: 'ease-in-out' });
  }

  static rotate(element: HTMLElement, degrees: number = 360, duration: number = 1000): Promise<void> {
    return this.animate(element, [
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${degrees}deg)` }
    ], { duration, easing: 'linear' });
  }

  static stagger(
    elements: HTMLElement[],
    animation: (element: HTMLElement) => Promise<void>,
    staggerDelay: number = 100
  ): Promise<void> {
    const promises = elements.map((element, index) => 
      new Promise<void>((resolve) => {
        setTimeout(async () => {
          await animation(element);
          resolve();
        }, index * staggerDelay);
      })
    );
    
    return Promise.all(promises).then(() => {});
  }

  private static getSlideTransform(direction: 'left' | 'right' | 'up' | 'down', isOut: boolean): string {
    const multiplier = isOut ? 1 : 0;
    switch (direction) {
      case 'left':
        return `translateX(${multiplier * -100}%)`;
      case 'right':
        return `translateX(${multiplier * 100}%)`;
      case 'up':
        return `translateY(${multiplier * -100}%)`;
      case 'down':
        return `translateY(${multiplier * 100}%)`;
    }
  }

  static createTransition(
    element: HTMLElement,
    property: string,
    duration: number = 300,
    easing: string = 'ease-in-out'
  ): void {
    element.style.transition = `${property} ${duration}ms ${easing}`;
  }

  static removeTransition(element: HTMLElement): void {
    element.style.transition = '';
  }

  // Predefined animation presets
  static presets = {
    modal: {
      enter: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '0', transform: 'scale(0.8)' },
        { opacity: '1', transform: 'scale(1)' }
      ], { duration: 200, easing: 'ease-out' }),
      
      exit: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '1', transform: 'scale(1)' },
        { opacity: '0', transform: 'scale(0.8)' }
      ], { duration: 200, easing: 'ease-in' })
    },

    toast: {
      enter: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '0', transform: 'translateY(-100%)' },
        { opacity: '1', transform: 'translateY(0)' }
      ], { duration: 300, easing: 'ease-out' }),
      
      exit: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '1', transform: 'translateY(0)' },
        { opacity: '0', transform: 'translateY(-100%)' }
      ], { duration: 300, easing: 'ease-in' })
    },

    listItem: {
      enter: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '0', transform: 'translateX(-20px)' },
        { opacity: '1', transform: 'translateX(0)' }
      ], { duration: 200, easing: 'ease-out' }),
      
      exit: (element: HTMLElement) => AnimationManager.animate(element, [
        { opacity: '1', transform: 'translateX(0)' },
        { opacity: '0', transform: 'translateX(20px)' }
      ], { duration: 200, easing: 'ease-in' })
    }
  };
} 