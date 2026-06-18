import { ThreeJSModelType, ThreeJSConfig } from './types';

/**
 * Three.js module - generates client-side Three.js code
 * that gets injected into the HTML template.
 * 
 * Since Three.js runs in the browser, this module produces
 * JavaScript strings that set up scene, camera, renderer,
 * lighting, and placeholder geometry for each model type.
 */

export class ThreeJSModule {
  /**
   * Get the display name for a 3D model type
   */
  static getModelDisplayName(model: ThreeJSModelType, language: 'id' | 'en'): string {
    const names: Record<ThreeJSModelType, Record<string, string>> = {
      kopi: { id: 'Cangkir Kopi', en: 'Coffee Cup' },
      laptop: { id: 'Laptop', en: 'Laptop' },
      buku: { id: 'Buku', en: 'Book' },
      logo: { id: 'Logo 3D', en: '3D Logo' },
      abstract: { id: 'Geometri Abstrak', en: 'Abstract Geometry' },
      globe: { id: 'Bola Dunia', en: 'Globe' },
    };
    return names[model]?.[language] || model;
  }

  /**
   * Get all available model types
   */
  static getAvailableModels(): ThreeJSModelType[] {
    return ['kopi', 'laptop', 'buku', 'logo', 'abstract', 'globe'];
  }

  /**
   * Generate the Three.js placeholder mesh code for a specific model type
   */
  private static generateModelMesh(model: ThreeJSModelType): string {
    switch (model) {
      case 'kopi':
        return `
        // Coffee Cup - cylinder body + handle (torus)
        const cupGroup = new THREE.Group();

        // Cup body
        const cupBody = new THREE.CylinderGeometry(1.2, 1.0, 2, 32);
        const cupMat = new THREE.MeshPhongMaterial({ color: 0xf5f5f5, shininess: 80 });
        const cupMesh = new THREE.Mesh(cupBody, cupMat);
        cupGroup.add(cupMesh);

        // Cup rim (slightly wider at top)
        const rimGeo = new THREE.TorusGeometry(1.2, 0.08, 8, 32);
        const rimMesh = new THREE.Mesh(rimGeo, cupMat);
        rimMesh.position.y = 1;
        rimMesh.rotation.x = Math.PI / 2;
        cupGroup.add(rimMesh);

        // Handle
        const handleGeo = new THREE.TorusGeometry(0.6, 0.1, 8, 16, Math.PI);
        const handleMesh = new THREE.Mesh(handleGeo, cupMat);
        handleMesh.position.set(1.3, 0.2, 0);
        handleMesh.rotation.z = Math.PI / 2;
        cupGroup.add(handleMesh);

        // Coffee liquid inside
        const coffeeGeo = new THREE.CylinderGeometry(1.1, 0.9, 0.1, 32);
        const coffeeMat = new THREE.MeshPhongMaterial({ color: 0x3e1f00, shininess: 100 });
        const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
        coffeeMesh.position.y = 0.85;
        cupGroup.add(coffeeMesh);

        // Saucer
        const saucerGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.15, 32);
        const saucerMesh = new THREE.Mesh(saucerGeo, cupMat);
        saucerMesh.position.y = -1.1;
        cupGroup.add(saucerMesh);

        scene.add(cupGroup);
        targetMesh = cupGroup;`;

      case 'buku':
        return `
        // Book - open book with pages
        const bookGroup = new THREE.Group();
        const pageMat = new THREE.MeshPhongMaterial({ color: 0xfff8e1, shininess: 20 });
        const coverMat = new THREE.MeshPhongMaterial({ color: 0x8B4513, shininess: 40 });

        // Left cover
        const leftCoverGeo = new THREE.BoxGeometry(1.8, 0.08, 2.5);
        const leftCover = new THREE.Mesh(leftCoverGeo, coverMat);
        leftCover.position.set(-0.95, 0, 0);
        leftCover.rotation.z = -0.15;
        bookGroup.add(leftCover);

        // Right cover
        const rightCoverGeo = new THREE.BoxGeometry(1.8, 0.08, 2.5);
        const rightCover = new THREE.Mesh(rightCoverGeo, coverMat);
        rightCover.position.set(0.95, 0, 0);
        rightCover.rotation.z = 0.15;
        bookGroup.add(rightCover);

        // Spine
        const spineGeo = new THREE.BoxGeometry(0.15, 0.08, 2.5);
        const spine = new THREE.Mesh(spineGeo, coverMat);
        bookGroup.add(spine);

        // Left pages (stacked)
        for (let i = 0; i < 5; i++) {
          const pageGeo = new THREE.BoxGeometry(1.7, 0.02, 2.4);
          const page = new THREE.Mesh(pageGeo, pageMat);
          page.position.set(-0.9, 0.05 + i * 0.02, 0);
          page.rotation.z = -0.1 - i * 0.01;
          bookGroup.add(page);
        }

        // Right pages (stacked)
        for (let i = 0; i < 5; i++) {
          const pageGeo = new THREE.BoxGeometry(1.7, 0.02, 2.4);
          const page = new THREE.Mesh(pageGeo, pageMat);
          page.position.set(0.9, 0.05 + i * 0.02, 0);
          page.rotation.z = 0.1 + i * 0.01;
          bookGroup.add(page);
        }

        // Text lines on left page
        for (let i = 0; i < 6; i++) {
          const lineGeo = new THREE.BoxGeometry(1.2, 0.005, 0.06);
          const lineMat = new THREE.MeshPhongMaterial({ color: 0x666666 });
          const line = new THREE.Mesh(lineGeo, lineMat);
          line.position.set(-0.85, 0.18, -0.8 + i * 0.3);
          line.rotation.z = -0.1;
          bookGroup.add(line);
        }

        scene.add(bookGroup);
        targetMesh = bookGroup;`;

      case 'logo':
        return `
        // 3D Logo - abstract geometric shape
        const logoGroup = new THREE.Group();
        const primaryMat = new THREE.MeshPhongMaterial({ color: 0x4F46E5, shininess: 80 });
        const secondaryMat = new THREE.MeshPhongMaterial({ color: 0x7C3AED, shininess: 80 });
        const accentMat = new THREE.MeshPhongMaterial({ color: 0x10B981, shininess: 80 });

        // Central sphere
        const centerSphere = new THREE.SphereGeometry(0.8, 32, 32);
        const centerMesh = new THREE.Mesh(centerSphere, primaryMat);
        logoGroup.add(centerMesh);

        // Orbiting torus
        const orbitGeo = new THREE.TorusGeometry(1.5, 0.1, 16, 64);
        const orbit1 = new THREE.Mesh(orbitGeo, secondaryMat);
        orbit1.rotation.x = Math.PI / 4;
        logoGroup.add(orbit1);

        const orbit2 = new THREE.Mesh(orbitGeo.clone(), accentMat);
        orbit2.rotation.x = -Math.PI / 4;
        orbit2.rotation.y = Math.PI / 3;
        logoGroup.add(orbit2);

        // Small orbiting spheres
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const smallGeo = new THREE.SphereGeometry(0.15, 16, 16);
          const smallMesh = new THREE.Mesh(smallGeo, i % 2 === 0 ? secondaryMat : accentMat);
          smallMesh.position.set(
            Math.cos(angle) * 1.5,
            Math.sin(angle) * 1.5 * 0.5,
            Math.sin(angle) * 1.5 * 0.5
          );
          logoGroup.add(smallMesh);
        }

        scene.add(logoGroup);
        targetMesh = logoGroup;`;

      case 'abstract':
        return `
        // Abstract rotating geometry
        const abstractGroup = new THREE.Group();

        // Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(1.2, 0);
        const icoMat = new THREE.MeshPhongMaterial({ color: 0x4F46E5, shininess: 100, wireframe: false });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        abstractGroup.add(icoMesh);

        // Wireframe overlay
        const wireGeo = new THREE.IcosahedronGeometry(1.25, 0);
        const wireMat = new THREE.MeshPhongMaterial({ color: 0x7C3AED, wireframe: true });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        abstractGroup.add(wireMesh);

        // Orbiting octahedrons
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const octGeo = new THREE.OctahedronGeometry(0.3, 0);
          const octMat = new THREE.MeshPhongMaterial({ color: 0x10B981, shininess: 100 });
          const octMesh = new THREE.Mesh(octGeo, octMat);
          octMesh.position.set(
            Math.cos(angle) * 2,
            Math.sin(angle) * 0.8,
            Math.sin(angle) * 2
          );
          abstractGroup.add(octMesh);
        }

        // Floating particles (small spheres)
        for (let i = 0; i < 20; i++) {
          const particleGeo = new THREE.SphereGeometry(0.05, 8, 8);
          const particleMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x7C3AED, emissiveIntensity: 0.5 });
          const particle = new THREE.Mesh(particleGeo, particleMat);
          particle.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6
          );
          abstractGroup.add(particle);
        }

        scene.add(abstractGroup);
        targetMesh = abstractGroup;`;

      case 'globe':
        return `
        // Globe - sphere with latitude/longitude lines
        const globeGroup = new THREE.Group();

        // Main sphere
        const globeGeo = new THREE.SphereGeometry(1.8, 32, 32);
        const globeMat = new THREE.MeshPhongMaterial({
          color: 0x1E40AF,
          shininess: 60,
          transparent: true,
          opacity: 0.85
        });
        const globeMesh = new THREE.Mesh(globeGeo, globeMat);
        globeGroup.add(globeMesh);

        // Wireframe
        const globeWireGeo = new THREE.SphereGeometry(1.82, 16, 16);
        const globeWireMat = new THREE.MeshPhongMaterial({ color: 0x60A5FA, wireframe: true });
        const globeWireMesh = new THREE.Mesh(globeWireGeo, globeWireMat);
        globeGroup.add(globeWireMesh);

        // Latitude lines
        for (let i = -2; i <= 2; i++) {
          const latRadius = 1.83 * Math.cos(Math.asin(i * 0.4));
          const latGeo = new THREE.RingGeometry(latRadius - 0.01, latRadius + 0.01, 64);
          const latMat = new THREE.MeshPhongMaterial({ color: 0x93C5FD, side: THREE.DoubleSide });
          const latMesh = new THREE.Mesh(latGeo, latMat);
          latMesh.position.y = i * 0.72;
          latMesh.rotation.x = Math.PI / 2;
          globeGroup.add(latMesh);
        }

        // Longitude lines (curved rings)
        for (let i = 0; i < 8; i++) {
          const lonGeo = new THREE.TorusGeometry(1.83, 0.015, 8, 64);
          const lonMat = new THREE.MeshPhongMaterial({ color: 0x93C5FD });
          const lonMesh = new THREE.Mesh(lonGeo, lonMat);
          lonMesh.rotation.y = (i / 8) * Math.PI;
          globeGroup.add(lonMesh);
        }

        // Land masses (simplified - small green patches)
        const landPositions = [
          { lat: 0.3, lon: 0.5, scale: 0.4 },
          { lat: -0.2, lon: 1.2, scale: 0.3 },
          { lat: 0.5, lon: 2.0, scale: 0.35 },
          { lat: -0.4, lon: 2.8, scale: 0.25 },
          { lat: 0.1, lon: 3.8, scale: 0.3 },
          { lat: 0.6, lon: 4.5, scale: 0.2 },
        ];
        const landMat = new THREE.MeshPhongMaterial({ color: 0x10B981 });
        landPositions.forEach(function(pos) {
          const landGeo = new THREE.SphereGeometry(pos.scale, 8, 8, pos.lon, 0.8, pos.lat, 0.5);
          const land = new THREE.Mesh(landGeo, landMat);
          land.position.set(0, 0, 0);
          globeGroup.add(land);
        });

        // Poles
        const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 4, 8);
        const poleMat = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        globeGroup.add(pole);

        scene.add(globeGroup);
        targetMesh = globeGroup;`;

      case 'laptop':
        return `
        // Laptop
        const laptopGroup = new THREE.Group();

        // Base (keyboard area)
        const baseGeo = new THREE.BoxGeometry(3.5, 0.12, 2.4);
        const baseMat = new THREE.MeshPhongMaterial({ color: 0x404040, shininess: 60 });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = 0;
        laptopGroup.add(baseMesh);

        // Keyboard surface
        const kbGeo = new THREE.BoxGeometry(2.8, 0.02, 1.2);
        const kbMat = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
        const kbMesh = new THREE.Mesh(kbGeo, kbMat);
        kbMesh.position.set(0, 0.07, -0.1);
        laptopGroup.add(kbMesh);

        // Touchpad
        const tpGeo = new THREE.BoxGeometry(1.0, 0.02, 0.7);
        const tpMat = new THREE.MeshPhongMaterial({ color: 0x353535 });
        const tpMesh = new THREE.Mesh(tpGeo, tpMat);
        tpMesh.position.set(0, 0.07, 0.65);
        laptopGroup.add(tpMesh);

        // Screen
        const screenLidGeo = new THREE.BoxGeometry(3.4, 2.2, 0.08);
        const screenLidMat = new THREE.MeshPhongMaterial({ color: 0x404040, shininess: 60 });
        const screenLidMesh = new THREE.Mesh(screenLidGeo, screenLidMat);
        screenLidMesh.position.set(0, 1.16, -1.2);
        screenLidMesh.rotation.x = -0.15;
        laptopGroup.add(screenLidMesh);

        // Display
        const displayGeo = new THREE.BoxGeometry(3.1, 1.9, 0.01);
        const displayMat = new THREE.MeshPhongMaterial({ color: 0x4fc3f7, shininess: 120, emissive: 0x1a237e, emissiveIntensity: 0.3 });
        const displayMesh = new THREE.Mesh(displayGeo, displayMat);
        displayMesh.position.set(0, 1.16, -1.15);
        displayMesh.rotation.x = -0.15;
        laptopGroup.add(displayMesh);

        scene.add(laptopGroup);
        targetMesh = laptopGroup;`;

      default:
        return `
        // Default placeholder cube
        const boxGeo = new THREE.BoxGeometry(2, 2, 2);
        const boxMat = new THREE.MeshPhongMaterial({ color: 0x4F46E5 });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        scene.add(boxMesh);
        targetMesh = boxMesh;`;
    }
  }

  /**
   * Generate the complete Three.js inline script for the HTML template
   */
  static generateScript(config: ThreeJSConfig): string {
    const modelCode = this.generateModelMesh(config.model);
    const bgColor = config.backgroundColor || '0xf0f0f0';
    const cam = config.cameraPosition || { x: 5, y: 4, z: 5 };
    const autoRotate = config.autoRotate !== false;

    return `
// Three.js 3D Visualization - Generated by @cherrylnh/web-template-generator
(function() {
  // Load Three.js from CDN
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = function() {
    initThreeJS_${config.model}();
  };
  document.head.appendChild(script);

  function initThreeJS_${config.model}() {
    const container = document.getElementById('threejs-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(${bgColor});

    // Setup camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(${cam.x}, ${cam.y}, ${cam.z});
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3, 50);
    pointLight.position.set(-3, 3, -3);
    scene.add(pointLight);

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0xe0e0e0 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -1.19;
    scene.add(gridHelper);

    // Model
    let targetMesh = null;
    ${modelCode}

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener('mousedown', function(e) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', function(e) {
      if (!isDragging || !targetMesh) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      targetMesh.rotation.y += deltaMove.x * 0.01;
      targetMesh.rotation.x += deltaMove.y * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mouseup', function() {
      isDragging = false;
    });

    renderer.domElement.addEventListener('mouseleave', function() {
      isDragging = false;
    });

    // Zoom with scroll
    renderer.domElement.addEventListener('wheel', function(e) {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(3, Math.min(15, camera.position.z));
      camera.lookAt(0, 0, 0);
    });

    // Handle resize
    window.addEventListener('resize', function() {
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Animation loop
    var _autoRotate = ${autoRotate};
    function animate() {
      requestAnimationFrame(animate);
      if (targetMesh && !isDragging && _autoRotate) {
        targetMesh.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    }
    animate();
  }
})();
`;
  }

  /**
   * Generate the HTML container for Three.js canvas
   */
  static generateContainer(config: ThreeJSConfig): string {
    if (!config.enable) return '';

    return `
    <!-- Three.js 3D Visualization -->
    <section id="threejs-section" style="padding: 2rem 0;">
      <div class="container">
        <h2 class="section-title">3D Preview - ${this.getModelDisplayName(config.model, 'en')}</h2>
        <div id="threejs-container" style="width: 100%; height: 500px; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);"></div>
        <p style="text-align: center; margin-top: 1rem; color: #666;">
          <em>Klik dan drag untuk memutar model. Scroll untuk zoom.</em>
        </p>
      </div>
    </section>`;
  }
}