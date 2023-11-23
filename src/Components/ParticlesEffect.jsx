import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

function ParticlesEffect() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        name: 'Snow',
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
            },
          },
          color: {
            value: '#919db3',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.2,
          },
          size: {
            value: 100,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'bottom',
            straight: false,
          },
          wobble: {
            enable: true,
            distance: 3,
            speed: 10,
          },
          zIndex: {
            value: {
              min: 0,
              max: 100,
            },
            opacityRate: 10,
            sizeRate: 10,
            velocityRate: 10,
          },
        },
        background: {
          color: '#ffffff',
        },
      }}
    />
  );
}

export default ParticlesEffect;
