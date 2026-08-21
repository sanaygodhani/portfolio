import * as THREE from 'three';

export function initOrb() {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  
  const container = canvas.parentElement;
  renderer.setSize(container.clientWidth, container.clientHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 3.5;

  const mouse = new THREE.Vector2();
  const targetMouse = new THREE.Vector2();
  
  window.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPopFactor;

    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

    float cnoise(vec3 P){
      vec3 Pi0 = floor(P); 
      vec3 Pi1 = Pi0 + vec3(1.0); 
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); 
      vec3 Pf1 = Pf0 - vec3(1.0); 
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      
      float noise = cnoise(position * 1.5 + uTime * 0.5);
      float mouseInfluence = sin(position.y * uMouse.y * 3.0 + position.x * uMouse.x * 3.0);
      
      // As uPopFactor increases, noise amplitude increases massively to tear it apart
      float currentNoiseAmt = 0.15 + (uPopFactor * 2.0);
      vec3 newPosition = position + normal * (noise * currentNoiseAmt) + normal * (mouseInfluence * 0.05);
      vPosition = newPosition;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uOpacity;
    
    vec3 colorA = vec3(0.0, 0.44, 0.89); 
    vec3 colorB = vec3(0.35, 0.78, 0.98); 
    vec3 colorC = vec3(0.8, 0.2, 0.5); 
    vec3 colorD = vec3(1.0, 0.8, 0.9); 

    void main() {
      float mix1 = sin(vPosition.x * 2.0 + uTime) * 0.5 + 0.5;
      float mix2 = cos(vPosition.y * 2.0 - uTime) * 0.5 + 0.5;
      float mix3 = sin(vPosition.z * 3.0 + uTime * 1.5) * 0.5 + 0.5;
      
      vec3 color = mix(colorA, colorB, mix1);
      color = mix(color, colorC, mix2);
      
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = dot(viewDirection, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 2.5);
      
      color = mix(color, colorD, fresnel * 0.7);
      
      float alpha = mix(0.3, 0.85, fresnel) * uOpacity;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const geometry = new THREE.SphereGeometry(1.2, 128, 128);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPopFactor: { value: 0 },
      uOpacity: { value: 1.0 }
    },
    transparent: true,
    wireframe: false,
  });

  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  let state = 'GROWING'; 
  orb.scale.set(0.1, 0.1, 0.1);

  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    
    if (state === 'GROWING') {
      orb.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.0028);
      if (orb.scale.x > 1.59) {
        state = 'DONE_GROWING';
      }
    }

    mouse.lerp(targetMouse, 0.05);
    material.uniforms.uTime.value = elapsedTime;
    material.uniforms.uMouse.value.copy(mouse);
    
    orb.rotation.y += 0.002;
    orb.rotation.z += 0.001;
    
    orb.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
    orb.position.x = mouse.x * 0.2;
    orb.position.y += mouse.y * 0.2;
    
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
