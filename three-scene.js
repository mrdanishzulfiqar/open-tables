import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export class Food3DScene {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error(`Container #${canvasContainerId} not found`);
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentFoodGroup = null;
    this.pedestalGroup = null;
    this.steamParticles = null;
    this.garnishParticles = null;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0.35, y: 0 };
    this.currentRotation = { x: 0.35, y: 0 };
    this.targetScale = 1;
    this.currentScale = 1;
    this.clock = new THREE.Clock();
    this.autoRotate = true;
    this.currentCategory = null;
    this.currentItem = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 550;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x111116, 0.04);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 3.2, 5.2);
    this.camera.lookAt(0, 0.2, 0);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting setup
    this.setupLighting();

    // 5. Serving Pedestal / Base Platter
    this.setupPedestal();

    // 6. Particle Systems (Warm Steam & Floating Herb specks)
    this.setupParticles();

    // 7. Event listeners for interactive orbit drag
    this.setupInteraction();

    // 8. Resize listener
    window.addEventListener('resize', () => this.onResize());

    // 9. Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff1e0, 1.4);
    this.scene.add(ambientLight);

    // Key Light (Warm golden sunlight/spotlight)
    const keyLight = new THREE.DirectionalLight(0xffeed6, 2.5);
    keyLight.position.set(4, 7, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    this.scene.add(keyLight);

    // Rim / Back Light (Orange glow giving delicious rim highlights)
    const rimLight = new THREE.DirectionalLight(0xff8c1a, 2.2);
    rimLight.position.set(-4, 3, -3);
    this.scene.add(rimLight);

    // Cool blue subtle fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xa5c4ff, 0.9);
    fillLight.position.set(-3, 2, 4);
    this.scene.add(fillLight);

    // Soft glowing center point light under food
    const bottomGlow = new THREE.PointLight(0xff6a00, 1.2, 5);
    bottomGlow.position.set(0, -0.4, 0);
    this.scene.add(bottomGlow);
  }

  setupPedestal() {
    this.pedestalGroup = new THREE.Group();

    // Dark sleek gourmet slate platter
    const platterGeo = new THREE.CylinderGeometry(2.3, 2.1, 0.15, 64);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a20,
      roughness: 0.65,
      metalness: 0.2,
      bumpScale: 0.05
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.y = -0.45;
    platter.receiveShadow = true;
    this.pedestalGroup.add(platter);

    // Golden metallic rim ring on platter
    const rimGeo = new THREE.TorusGeometry(2.26, 0.03, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xe6a13c,
      roughness: 0.3,
      metalness: 0.8
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.38;
    this.pedestalGroup.add(rim);

    // Floor shadow receiver plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.55;
    shadowPlane.receiveShadow = true;
    this.pedestalGroup.add(shadowPlane);

    this.scene.add(this.pedestalGroup);
  }

  setupParticles() {
    // 1. Steam Particles
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamVel = [];

    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 1.5;
      steamPos[i * 3 + 1] = 0.2 + Math.random() * 1.8;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      steamVel.push({
        y: 0.008 + Math.random() * 0.012,
        x: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003
      });
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.16,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    this.steamParticles = new THREE.Points(steamGeo, steamMat);
    this.steamVel = steamVel;
    this.scene.add(this.steamParticles);

    // 2. Garnish Particles (Oregano, chili flakes drifting)
    const garnishCount = 40;
    const garnishGeo = new THREE.BufferGeometry();
    const garnishPos = new Float32Array(garnishCount * 3);
    const garnishColors = new Float32Array(garnishCount * 3);

    for (let i = 0; i < garnishCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 1.2;
      garnishPos[i * 3] = Math.cos(angle) * radius;
      garnishPos[i * 3 + 1] = -0.2 + Math.random() * 1.6;
      garnishPos[i * 3 + 2] = Math.sin(angle) * radius;

      // Random chili red or oregano green
      if (Math.random() > 0.5) {
        garnishColors[i * 3] = 0.85; garnishColors[i * 3 + 1] = 0.15; garnishColors[i * 3 + 2] = 0.1; // chili
      } else {
        garnishColors[i * 3] = 0.18; garnishColors[i * 3 + 1] = 0.55; garnishColors[i * 3 + 2] = 0.15; // oregano
      }
    }

    garnishGeo.setAttribute('position', new THREE.BufferAttribute(garnishPos, 3));
    garnishGeo.setAttribute('color', new THREE.BufferAttribute(garnishColors, 3));
    const garnishMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });
    this.garnishParticles = new THREE.Points(garnishGeo, garnishMat);
    this.scene.add(this.garnishParticles);
  }

  setupInteraction() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    dom.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.012;
      this.targetRotation.x = Math.max(0.1, Math.min(0.9, this.targetRotation.x + deltaY * 0.008));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support for mobile / tablets
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    dom.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.014;
      this.targetRotation.x = Math.max(0.1, Math.min(0.9, this.targetRotation.x + deltaY * 0.01));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Set the 3D model according to item data
  displayItem(categoryKey, item, sizeName = null) {
    this.currentCategory = categoryKey;
    this.currentItem = item;

    // Smooth exit animation on previous model
    if (this.currentFoodGroup) {
      this.animateModelOut(() => {
        this.buildAndDisplayModel(categoryKey, item, sizeName);
      });
    } else {
      this.buildAndDisplayModel(categoryKey, item, sizeName);
    }
  }

  animateModelOut(callback) {
    const oldGroup = this.currentFoodGroup;
    let progress = 0;
    const speed = 0.08;

    const fadeStep = () => {
      progress += speed;
      if (oldGroup) {
        oldGroup.scale.multiplyScalar(0.9);
        oldGroup.position.y += 0.04;
        oldGroup.rotation.y += 0.15;
      }
      if (progress < 1) {
        requestAnimationFrame(fadeStep);
      } else {
        if (oldGroup && oldGroup.parent) {
          this.scene.remove(oldGroup);
          this.disposeGroup(oldGroup);
        }
        if (callback) callback();
      }
    };
    fadeStep();
  }

  buildAndDisplayModel(categoryKey, item, sizeName) {
    let group = null;

    switch (categoryKey) {
      case 'pizzas':
        group = this.createPizza(item, sizeName);
        break;
      case 'burgers':
        group = this.createBurger(item);
        break;
      case 'wraps':
        group = this.createShawarma(item);
        break;
      case 'broast':
        group = this.createBroast(item);
        break;
      case 'steaks':
        group = this.createSteak(item);
        break;
      case 'drinks':
        group = this.createDrink(item);
        break;
      case 'deals':
        group = this.createDeal(item);
        break;
      default:
        group = this.createPizza(item, sizeName);
    }

    if (group) {
      group.position.set(0, 0, 0);
      group.scale.set(0.01, 0.01, 0.01);
      this.scene.add(group);
      this.currentFoodGroup = group;

      // Animate entry with satisfying spin & bounce
      let t = 0;
      const targetScale = this.getScaleForSize(sizeName);
      const enterStep = () => {
        t += 0.07;
        const currentS = THREE.MathUtils.lerp(0.01, targetScale, Math.min(t * 1.3, 1));
        if (group && group.parent) {
          group.scale.set(currentS, currentS, currentS);
          group.rotation.y = (1 - Math.min(t, 1)) * 3.5;
        }
        if (t < 1) {
          requestAnimationFrame(enterStep);
        } else {
          group.scale.set(targetScale, targetScale, targetScale);
        }
      };
      enterStep();
    }
  }

  getScaleForSize(sizeName) {
    switch (sizeName) {
      case 'Small': return 0.85;
      case 'Medium': return 1.0;
      case 'Large': return 1.15;
      case 'XL': return 1.3;
      default: return 1.05;
    }
  }

  updateSizeScale(sizeName) {
    if (!this.currentFoodGroup) return;
    const target = this.getScaleForSize(sizeName);
    const start = this.currentFoodGroup.scale.x;
    let t = 0;

    const scaleStep = () => {
      t += 0.1;
      const s = THREE.MathUtils.lerp(start, target, Math.min(t, 1));
      if (this.currentFoodGroup) {
        this.currentFoodGroup.scale.set(s, s, s);
      }
      if (t < 1) {
        requestAnimationFrame(scaleStep);
      }
    };
    scaleStep();
  }

  // ================= 3D PIZZA GENERATOR =================
  createPizza(item, sizeName) {
    const group = new THREE.Group();
    const radius = 1.7;

    // 1. Crust base
    const crustBaseGeo = new THREE.CylinderGeometry(radius, radius * 0.96, 0.14, 48);
    // Perturb vertices slightly for organic wood-fired look
    const pos = crustBaseGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > radius * 0.7) {
        pos.setY(i, pos.getY(i) + (Math.sin(x * 6) + Math.cos(z * 6)) * 0.03);
      }
    }
    crustBaseGeo.computeVertexNormals();

    const crustMat = new THREE.MeshStandardMaterial({
      color: 0xda9446,
      roughness: 0.8,
      metalness: 0.05,
      bumpScale: 0.04
    });
    const crust = new THREE.Mesh(crustBaseGeo, crustMat);
    crust.castShadow = true;
    crust.receiveShadow = true;
    group.add(crust);

    // 2. Raised outer crust rim (Torus)
    const isCrownCrust = item.toppingType === 'crown-crust';
    const isKababPopper = item.toppingType === 'kabab-popper';
    const isStuffed = item.toppingType === 'stuffed-crust';

    if (isCrownCrust) {
      // Crown crust peaks
      const crownCount = 12;
      for (let i = 0; i < crownCount; i++) {
        const angle = (i / crownCount) * Math.PI * 2;
        const peakGeo = new THREE.ConeGeometry(0.18, 0.35, 8);
        const peakMat = new THREE.MeshStandardMaterial({ color: 0xcd8235, roughness: 0.75 });
        const peak = new THREE.Mesh(peakGeo, peakMat);
        peak.position.set(Math.cos(angle) * (radius - 0.05), 0.15, Math.sin(angle) * (radius - 0.05));
        peak.rotation.x = Math.PI / 2;
        peak.rotation.z = -angle;
        group.add(peak);

        // Cream cheese dollop inside peak
        const dollopGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const dollopMat = new THREE.MeshStandardMaterial({ color: 0xfffae8, roughness: 0.3 });
        const dollop = new THREE.Mesh(dollopGeo, dollopMat);
        dollop.position.set(Math.cos(angle) * (radius - 0.15), 0.12, Math.sin(angle) * (radius - 0.15));
        group.add(dollop);
      }
    } else if (isKababPopper) {
      // Kabab popper bites rim
      const popperCount = 14;
      for (let i = 0; i < popperCount; i++) {
        const angle = (i / popperCount) * Math.PI * 2;
        const popperGeo = new THREE.CapsuleGeometry(0.12, 0.15, 8, 16);
        const popperMat = new THREE.MeshStandardMaterial({ color: 0x733d1b, roughness: 0.8 });
        const popper = new THREE.Mesh(popperGeo, popperMat);
        popper.position.set(Math.cos(angle) * (radius - 0.05), 0.12, Math.sin(angle) * (radius - 0.05));
        popper.rotation.y = -angle;
        popper.castShadow = true;
        group.add(popper);
      }
    } else {
      // Standard or Stuffed Crust outer rim
      const rimRadius = isStuffed ? 0.22 : 0.16;
      const rimGeo = new THREE.TorusGeometry(radius - 0.1, rimRadius, 16, 48);
      const rimMat = new THREE.MeshStandardMaterial({
        color: isStuffed ? 0xd08133 : 0xcc7a2b,
        roughness: 0.82
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.08;
      rim.castShadow = true;
      group.add(rim);
    }

    // 3. Tomato Sauce layer
    const sauceGeo = new THREE.CylinderGeometry(radius - 0.22, radius - 0.22, 0.03, 32);
    const sauceColor = (item.toppingType === 'alfredo' || item.toppingType === 'garlic-parm') ? 0xfbf2d8 : 0xb51e0b;
    const sauceMat = new THREE.MeshStandardMaterial({
      color: sauceColor,
      roughness: 0.45,
      metalness: 0.05
    });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.y = 0.07;
    group.add(sauce);

    // 4. Melted Mozzarella Cheese Layer
    const cheeseGeo = new THREE.CylinderGeometry(radius - 0.24, radius - 0.24, 0.035, 32);
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xffea88,
      roughness: 0.38,
      metalness: 0.05,
      emissive: 0x553d08,
      emissiveIntensity: 0.15
    });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.085;
    cheese.receiveShadow = true;
    group.add(cheese);

    // 5. Golden Toasted Cheese Spots
    const spotCount = 14;
    for (let i = 0; i < spotCount; i++) {
      const spotAngle = Math.random() * Math.PI * 2;
      const spotDist = Math.random() * (radius - 0.5);
      const spotGeo = new THREE.CircleGeometry(0.06 + Math.random() * 0.08, 12);
      const spotMat = new THREE.MeshBasicMaterial({ color: 0x934c11, transparent: true, opacity: 0.65 });
      const spot = new THREE.Mesh(spotGeo, spotMat);
      spot.rotation.x = -Math.PI / 2;
      spot.position.set(Math.cos(spotAngle) * spotDist, 0.106, Math.sin(spotAngle) * spotDist);
      group.add(spot);
    }

    // 6. Dynamic Toppings based on pizza type
    this.addToppingsToPizza(group, item.toppingType, radius - 0.3);

    return group;
  }

  addToppingsToPizza(group, toppingType, maxRadius) {
    const toppingGroup = new THREE.Group();

    // Pepperoni Discs
    if (toppingType === 'pepperoni' || toppingType === 'extreme') {
      const pepCount = toppingType === 'pepperoni' ? 18 : 10;
      for (let i = 0; i < pepCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.92;
        const theta = Math.random() * Math.PI * 2;
        const pepGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.025, 20);
        const pepMat = new THREE.MeshStandardMaterial({
          color: 0xa82012,
          roughness: 0.35,
          metalness: 0.1
        });
        const pep = new THREE.Mesh(pepGeo, pepMat);
        pep.position.set(Math.cos(theta) * r, 0.115, Math.sin(theta) * r);
        pep.rotation.y = Math.random() * Math.PI;
        pep.castShadow = true;
        toppingGroup.add(pep);

        // Pepperoni center oil glisten
        const glistenGeo = new THREE.CircleGeometry(0.12, 12);
        const glistenMat = new THREE.MeshBasicMaterial({ color: 0x731106 });
        const glisten = new THREE.Mesh(glistenGeo, glistenMat);
        glisten.rotation.x = -Math.PI / 2;
        glisten.position.set(Math.cos(theta) * r, 0.129, Math.sin(theta) * r);
        toppingGroup.add(glisten);
      }
    }

    // Chicken Chunks (Crispy, Fajita, Malai, BBQ, Extreme)
    const needsChicken = ['crispy-chicken', 'buffalo', 'fajita', 'garlic-parm', 'malai-botti', 'extreme', 'alfredo', 'kabab-popper', 'crown-crust', 'bbq'].includes(toppingType);
    if (needsChicken) {
      const chickenCount = 22;
      const isMalai = toppingType === 'malai-botti';
      const isBuffalo = toppingType === 'buffalo';
      const isBbq = toppingType === 'bbq';

      let chkColor = 0xc28543;
      if (isMalai) chkColor = 0xf0e3cc;
      if (isBuffalo) chkColor = 0xd9381e;
      if (isBbq) chkColor = 0x5a230e;

      for (let i = 0; i < chickenCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const chkGeo = new THREE.DodecahedronGeometry(0.11 + Math.random() * 0.05, 0);
        const chkMat = new THREE.MeshStandardMaterial({
          color: chkColor,
          roughness: 0.7
        });
        const chk = new THREE.Mesh(chkGeo, chkMat);
        chk.position.set(Math.cos(theta) * r, 0.125, Math.sin(theta) * r);
        chk.rotation.set(Math.random(), Math.random(), Math.random());
        chk.castShadow = true;
        toppingGroup.add(chk);
      }
    }

    // Seekh Kabab Slices
    if (toppingType === 'seekh-kabab') {
      const kababCount = 16;
      for (let i = 0; i < kababCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const kabGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 12);
        const kabMat = new THREE.MeshStandardMaterial({ color: 0x593018, roughness: 0.8 });
        const kab = new THREE.Mesh(kabGeo, kabMat);
        kab.position.set(Math.cos(theta) * r, 0.125, Math.sin(theta) * r);
        kab.rotation.x = Math.PI / 2;
        kab.rotation.z = Math.random() * Math.PI;
        kab.castShadow = true;
        toppingGroup.add(kab);
      }
    }

    // Bell Peppers (Green Capsicum & Red)
    if (['fajita', 'extreme', 'seekh-kabab', 'bbq', 'crown-crust'].includes(toppingType)) {
      const pepperCount = 18;
      for (let i = 0; i < pepperCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.88;
        const theta = Math.random() * Math.PI * 2;
        const pGeo = new THREE.TorusGeometry(0.13, 0.025, 8, 12, Math.PI * 0.7);
        const pColor = Math.random() > 0.4 ? 0x2e8b2e : 0xcc2222;
        const pMat = new THREE.MeshStandardMaterial({ color: pColor, roughness: 0.35 });
        const p = new THREE.Mesh(pGeo, pMat);
        p.position.set(Math.cos(theta) * r, 0.12, Math.sin(theta) * r);
        p.rotation.set(Math.PI / 2, 0, Math.random() * Math.PI * 2);
        toppingGroup.add(p);
      }
    }

    // Black Olives
    if (['fajita', 'extreme', 'crispy-chicken', 'alfredo', 'crown-crust'].includes(toppingType)) {
      const oliveCount = 14;
      for (let i = 0; i < oliveCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.85;
        const theta = Math.random() * Math.PI * 2;
        const oGeo = new THREE.TorusGeometry(0.08, 0.03, 8, 16);
        const oMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.4 });
        const o = new THREE.Mesh(oGeo, oMat);
        o.position.set(Math.cos(theta) * r, 0.125, Math.sin(theta) * r);
        o.rotation.x = Math.PI / 2;
        toppingGroup.add(o);
      }
    }

    // Button Mushrooms
    if (['alfredo', 'extreme', 'garlic-parm'].includes(toppingType)) {
      const mushCount = 12;
      for (let i = 0; i < mushCount; i++) {
        const r = Math.sqrt(Math.random()) * maxRadius * 0.85;
        const theta = Math.random() * Math.PI * 2;
        const mGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.03, 10);
        const mMat = new THREE.MeshStandardMaterial({ color: 0x8a7765, roughness: 0.7 });
        const m = new THREE.Mesh(mGeo, mMat);
        m.position.set(Math.cos(theta) * r, 0.12, Math.sin(theta) * r);
        m.rotation.x = (Math.random() - 0.5) * 0.2;
        toppingGroup.add(m);
      }
    }

    // Oregano / Herb Dust Sprinkle
    const herbCount = 60;
    const herbGeo = new THREE.BufferGeometry();
    const herbPos = new Float32Array(herbCount * 3);
    for (let i = 0; i < herbCount; i++) {
      const r = Math.sqrt(Math.random()) * maxRadius * 0.95;
      const theta = Math.random() * Math.PI * 2;
      herbPos[i * 3] = Math.cos(theta) * r;
      herbPos[i * 3 + 1] = 0.13 + Math.random() * 0.01;
      herbPos[i * 3 + 2] = Math.sin(theta) * r;
    }
    herbGeo.setAttribute('position', new THREE.BufferAttribute(herbPos, 3));
    const herbMat = new THREE.PointsMaterial({ color: 0x1f471f, size: 0.035 });
    const herbPoints = new THREE.Points(herbGeo, herbMat);
    toppingGroup.add(herbPoints);

    group.add(toppingGroup);
  }

  // ================= 3D BURGER GENERATOR =================
  createBurger(item) {
    const group = new THREE.Group();
    const bType = item.burgerType || 'patty';
    let currentY = -0.3;

    // 1. Bottom Bun
    const botBunGeo = new THREE.CylinderGeometry(1.2, 1.1, 0.26, 32);
    const bunMat = new THREE.MeshStandardMaterial({
      color: 0xd9883b,
      roughness: 0.65
    });
    const botBun = new THREE.Mesh(botBunGeo, bunMat);
    botBun.position.y = currentY;
    botBun.castShadow = true;
    botBun.receiveShadow = true;
    group.add(botBun);
    currentY += 0.2;

    // 2. Secret Sauce spread
    const sauceGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.04, 24);
    const sauceMat = new THREE.MeshStandardMaterial({ color: 0xf2542d, roughness: 0.3 });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.y = currentY;
    group.add(sauce);
    currentY += 0.06;

    // Helper to add Patty + Cheese
    const addPattyAndCheese = (isChicken, isZinger, isBeef) => {
      // Patty
      const pattyRadius = 1.25;
      const pattyHeight = isZinger ? 0.38 : 0.3;
      const pattyGeo = new THREE.CylinderGeometry(pattyRadius, pattyRadius * 0.95, pattyHeight, 32);

      let pattyColor = 0x542611; // Beef
      if (isChicken) pattyColor = 0xbb7832;
      if (isZinger) pattyColor = 0xc77826; // Golden crispy crumb

      const pattyMat = new THREE.MeshStandardMaterial({
        color: pattyColor,
        roughness: isZinger ? 0.9 : 0.75,
        bumpScale: 0.08
      });
      const patty = new THREE.Mesh(pattyGeo, pattyMat);
      patty.position.y = currentY + pattyHeight / 2;
      patty.castShadow = true;
      group.add(patty);
      currentY += pattyHeight;

      // Cheese Slice with melted drooping corners
      const cheeseGeo = new THREE.BoxGeometry(1.9, 0.04, 1.9);
      const cheeseMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        roughness: 0.32,
        metalness: 0.05
      });
      const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
      cheese.position.y = currentY + 0.02;
      cheese.rotation.y = 0.4;
      cheese.castShadow = true;
      group.add(cheese);
      currentY += 0.05;
    };

    // Number of patties based on burger type
    if (bType === 'beef-monster') {
      // 4 Beef patties
      for (let p = 0; p < 4; p++) {
        addPattyAndCheese(false, false, true);
      }
    } else if (bType === 'beef-smash') {
      // Double Beef smash
      addPattyAndCheese(false, false, true);
      addPattyAndCheese(false, false, true);
    } else if (bType === 'double-zinger' || bType === 'triple-grilled' || bType === 'double-grilled') {
      // Multi chicken stack
      const count = bType === 'triple-grilled' ? 3 : 2;
      for (let p = 0; p < count; p++) {
        addPattyAndCheese(true, bType === 'double-zinger', false);
      }
    } else {
      // Single Patty (Zinger, Chapli, Grilled, etc.)
      const isZing = bType === 'zinger' || bType === 'fiery';
      addPattyAndCheese(true, isZing, false);
    }

    // Tomato Slices (2 overlapping discs)
    for (let t = 0; t < 2; t++) {
      const tomGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.07, 24);
      const tomMat = new THREE.MeshStandardMaterial({ color: 0xd90429, roughness: 0.28 });
      const tom = new THREE.Mesh(tomGeo, tomMat);
      tom.position.set(t === 0 ? -0.38 : 0.38, currentY + 0.04, t === 0 ? 0.1 : -0.1);
      tom.rotation.z = (t === 0 ? 1 : -1) * 0.08;
      tom.castShadow = true;
      group.add(tom);
    }
    currentY += 0.1;

    // Ruffled Crisp Lettuce
    const lettuceGeo = new THREE.TorusGeometry(1.05, 0.22, 16, 32);
    const lettuceMat = new THREE.MeshStandardMaterial({
      color: 0x40916c,
      roughness: 0.55
    });
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuce.rotation.x = Math.PI / 2;
    lettuce.position.y = currentY + 0.06;
    lettuce.castShadow = true;
    group.add(lettuce);
    currentY += 0.18;

    // Top Brioche Bun Dome
    const topBunGeo = new THREE.SphereGeometry(1.3, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const topBunMat = new THREE.MeshStandardMaterial({
      color: 0xe08f3c,
      roughness: 0.45,
      metalness: 0.05
    });
    const topBun = new THREE.Mesh(topBunGeo, topBunMat);
    topBun.position.y = currentY;
    topBun.castShadow = true;
    group.add(topBun);

    // Sesame Seeds on Top Bun
    const seedCount = 65;
    for (let i = 0; i < seedCount; i++) {
      const phi = Math.random() * Math.PI * 0.38;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.305;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) + currentY;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seedGeo = new THREE.CapsuleGeometry(0.02, 0.04, 4, 8);
      const seedMat = new THREE.MeshStandardMaterial({ color: 0xfff3c4, roughness: 0.4 });
      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(x, y, z);
      seed.lookAt(0, currentY, 0);
      group.add(seed);
    }

    return group;
  }

  // ================= 3D SHAWARMA / WRAP GENERATOR =================
  createShawarma(item) {
    const group = new THREE.Group();

    // Cylindrical toasted flatbread roll (angled)
    const wrapGeo = new THREE.CylinderGeometry(0.55, 0.48, 2.4, 32);
    const wrapMat = new THREE.MeshStandardMaterial({
      color: 0xf5deb3,
      roughness: 0.75
    });
    const wrap = new THREE.Mesh(wrapGeo, wrapMat);
    wrap.position.y = 0.5;
    wrap.rotation.z = -0.3;
    wrap.castShadow = true;
    group.add(wrap);

    // Grill marks on wrap
    for (let g = 0; g < 4; g++) {
      const grillGeo = new THREE.TorusGeometry(0.54, 0.02, 8, 32);
      const grillMat = new THREE.MeshBasicMaterial({ color: 0x6e3c15 });
      const grill = new THREE.Mesh(grillGeo, grillMat);
      grill.position.set(0, -0.3 + g * 0.4, 0);
      grill.rotation.x = Math.PI / 2;
      wrap.add(grill);
    }

    // Silver Foil wrapping around bottom half
    const foilGeo = new THREE.CylinderGeometry(0.53, 0.50, 1.2, 32);
    const foilMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.85,
      roughness: 0.25
    });
    const foil = new THREE.Mesh(foilGeo, foilMat);
    foil.position.y = -0.55;
    wrap.add(foil);

    // Overflowing Roasted Shawarma Chicken & Pickles at open top
    const topMeatCount = 18;
    for (let i = 0; i < topMeatCount; i++) {
      const mGeo = new THREE.DodecahedronGeometry(0.12, 0);
      const mMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.4 ? 0xa86729 : 0x542d13,
        roughness: 0.7
      });
      const m = new THREE.Mesh(mGeo, mMat);
      m.position.set(
        (Math.random() - 0.5) * 0.6,
        1.2 + Math.random() * 0.25,
        (Math.random() - 0.5) * 0.6
      );
      wrap.add(m);
    }

    // White Garlic Toum dripping
    const toumGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const toumMat = new THREE.MeshStandardMaterial({ color: 0xfffced, roughness: 0.25 });
    const toum = new THREE.Mesh(toumGeo, toumMat);
    toum.position.set(0.1, 1.25, 0.2);
    wrap.add(toum);

    // Green pickle strips sticking out
    const pickleGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const pickleMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.4 });
    const pickle = new THREE.Mesh(pickleGeo, pickleMat);
    pickle.position.set(-0.15, 1.35, 0.1);
    pickle.rotation.z = 0.25;
    wrap.add(pickle);

    return group;
  }

  // ================= 3D BROAST / STARTERS GENERATOR =================
  createBroast(item) {
    const group = new THREE.Group();
    const isFriesOnly = item.broastType && item.broastType.startsWith('fries');

    if (!isFriesOnly) {
      // Golden crunchy fried chicken drumstick & piece
      const drumGeo = new THREE.CapsuleGeometry(0.48, 0.8, 16, 24);
      const drumMat = new THREE.MeshStandardMaterial({
        color: 0xb86c1f,
        roughness: 0.85,
        bumpScale: 0.12
      });
      const drum = new THREE.Mesh(drumGeo, drumMat);
      drum.position.set(-0.35, 0.2, 0);
      drum.rotation.z = 0.6;
      drum.castShadow = true;
      group.add(drum);

      // Drumstick bone handle
      const boneGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.5, 16);
      const boneMat = new THREE.MeshStandardMaterial({ color: 0xfffaea, roughness: 0.5 });
      const bone = new THREE.Mesh(boneGeo, boneMat);
      bone.position.set(-0.9, -0.15, 0);
      bone.rotation.z = 0.6;
      group.add(bone);
    }

    // French Fries Cluster
    const fryCount = isFriesOnly ? 35 : 18;
    for (let f = 0; f < fryCount; f++) {
      const fryGeo = new THREE.BoxGeometry(0.09, 1.1 + Math.random() * 0.3, 0.09);
      const fryMat = new THREE.MeshStandardMaterial({
        color: item.broastType === 'fries-masala' ? 0xd4682c : 0xf4a261,
        roughness: 0.55
      });
      const fry = new THREE.Mesh(fryGeo, fryMat);
      const fx = isFriesOnly ? (Math.random() - 0.5) * 1.5 : 0.45 + (Math.random() - 0.5) * 0.7;
      const fz = (Math.random() - 0.5) * 1.2;
      fry.position.set(fx, 0.05, fz);
      fry.rotation.set((Math.random() - 0.5) * 0.4, Math.random() * Math.PI, (Math.random() - 0.5) * 0.4);
      fry.castShadow = true;
      group.add(fry);
    }

    // Dip Sauce Ramekin Cup
    const cupGeo = new THREE.CylinderGeometry(0.38, 0.3, 0.26, 24);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    cup.position.set(0.7, -0.1, 0.7);
    group.add(cup);

    // Sauce inside ramekin (Garlic White or Hot Red)
    const sauceGeo = new THREE.CircleGeometry(0.34, 24);
    const sauceMat = new THREE.MeshStandardMaterial({ color: 0xbf1a1a, roughness: 0.3 });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.set(0.7, 0.02, 0.7);
    sauce.rotation.x = -Math.PI / 2;
    group.add(sauce);

    return group;
  }

  // ================= 3D STEAK & PASTA GENERATOR =================
  createSteak(item) {
    const group = new THREE.Group();
    const isPasta = item.steakType === 'pasta' || item.steakType === 'mac-cheese';

    if (isPasta) {
      // Gourmet Pasta Bowl
      const bowlGeo = new THREE.CylinderGeometry(1.6, 0.8, 0.7, 32);
      const bowlMat = new THREE.MeshStandardMaterial({ color: 0x1f1f26, roughness: 0.3 });
      const bowl = new THREE.Mesh(bowlGeo, bowlMat);
      bowl.position.y = -0.1;
      group.add(bowl);

      // Creamy Alfredo / Mac & Cheese Pasta loops
      const loopCount = 28;
      for (let i = 0; i < loopCount; i++) {
        const loopGeo = new THREE.TorusGeometry(0.25, 0.07, 8, 16);
        const loopMat = new THREE.MeshStandardMaterial({
          color: item.steakType === 'mac-cheese' ? 0xffaa00 : 0xfffae0,
          roughness: 0.4
        });
        const loop = new THREE.Mesh(loopGeo, loopMat);
        loop.position.set((Math.random() - 0.5) * 1.8, 0.15 + Math.random() * 0.2, (Math.random() - 0.5) * 1.8);
        loop.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        group.add(loop);
      }
    } else {
      // Sizzling Prime Steak Fillet
      const steakGeo = new THREE.CylinderGeometry(1.3, 1.25, 0.32, 28);
      const pos = steakGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setX(i, pos.getX(i) * 1.3); // Oval steak shape
      }
      steakGeo.computeVertexNormals();

      const steakMat = new THREE.MeshStandardMaterial({
        color: 0x4a1f10,
        roughness: 0.7,
        bumpScale: 0.08
      });
      const steak = new THREE.Mesh(steakGeo, steakMat);
      steak.position.y = 0.05;
      steak.castShadow = true;
      group.add(steak);

      // Char grill marks
      for (let m = -3; m <= 3; m++) {
        const markGeo = new THREE.BoxGeometry(0.04, 0.02, 2.0);
        const markMat = new THREE.MeshBasicMaterial({ color: 0x1a0a04 });
        const mark = new THREE.Mesh(markGeo, markMat);
        mark.position.set(m * 0.35, 0.22, 0);
        mark.rotation.y = 0.6;
        group.add(mark);
      }

      // Melting Garlic Herb Butter pat
      const butterGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 16);
      const butterMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.2 });
      const butter = new THREE.Mesh(butterGeo, butterMat);
      butter.position.set(0.1, 0.28, 0.1);
      group.add(butter);

      // Fresh Rosemary Sprig
      const roseGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8);
      const roseMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.6 });
      const rosemary = new THREE.Mesh(roseGeo, roseMat);
      rosemary.position.set(-0.3, 0.25, 0.2);
      rosemary.rotation.set(Math.PI / 2, 0, 0.8);
      group.add(rosemary);
    }

    return group;
  }

  // ================= 3D DRINKS & SHAKES GENERATOR =================
  createDrink(item) {
    const group = new THREE.Group();
    const drinkColor = item.drinkColor || 0x22c55e;
    const isShake = item.category === 'Thick Shake';

    // 1. Transparent Glass Cup
    const glassGeo = new THREE.CylinderGeometry(0.72, 0.52, 2.4, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.4
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = 0.8;
    glass.castShadow = true;
    group.add(glass);

    // Glass base
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.18, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x33333e, roughness: 0.2 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -0.32;
    group.add(base);

    // 2. Beverage Liquid Level
    const liquidGeo = new THREE.CylinderGeometry(0.68, 0.5, 2.1, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: drinkColor,
      roughness: 0.35,
      transparent: true,
      opacity: isShake ? 0.96 : 0.82
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.75;
    group.add(liquid);

    if (isShake) {
      // Swirled Whipped Cream Top
      const creamGeo = new THREE.SphereGeometry(0.65, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfffef7, roughness: 0.35 });
      const cream = new THREE.Mesh(creamGeo, creamMat);
      cream.position.y = 1.95;
      group.add(cream);

      // Chocolate / Caramel Sauce Drizzle Ribbons
      const dripCount = 4;
      for (let d = 0; d < dripCount; d++) {
        const dripGeo = new THREE.TorusGeometry(0.52, 0.03, 8, 24);
        const dripMat = new THREE.MeshStandardMaterial({
          color: item.drinkType === 'strawberry' ? 0xd90429 : 0x4a2810,
          roughness: 0.25
        });
        const drip = new THREE.Mesh(dripGeo, dripMat);
        drip.position.y = 1.8 + d * 0.12;
        drip.rotation.set(0.2 * d, 0.4 * d, Math.PI / 2);
        group.add(drip);
      }
    } else {
      // Floating translucent ice cubes & Lemon Wheel for cool drinks
      for (let c = 0; c < 3; c++) {
        const iceGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
        const iceMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.95,
          roughness: 0.1,
          transparent: true,
          opacity: 0.7
        });
        const ice = new THREE.Mesh(iceGeo, iceMat);
        ice.position.set((c - 1) * 0.25, 1.6, (Math.random() - 0.5) * 0.3);
        ice.rotation.set(Math.random(), Math.random(), 0);
        group.add(ice);
      }

      // Citrus Wheel on rim
      const lemonGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.04, 16);
      const lemonMat = new THREE.MeshStandardMaterial({ color: 0xffea00, roughness: 0.4 });
      const lemon = new THREE.Mesh(lemonGeo, lemonMat);
      lemon.position.set(0.68, 2.05, 0);
      lemon.rotation.z = Math.PI / 3;
      group.add(lemon);
    }

    // 3. Striped Drinking Straw
    const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 16);
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.4 });
    const straw = new THREE.Mesh(strawGeo, strawMat);
    straw.position.set(0.25, 1.7, 0);
    straw.rotation.z = -0.22;
    group.add(straw);

    return group;
  }

  // ================= 3D VALUE DEALS COMBO GENERATOR =================
  createDeal(item) {
    const group = new THREE.Group();

    // Mini Pizza on left
    const miniPizza = this.createPizza({ toppingType: 'pepperoni' }, 'Small');
    miniPizza.scale.set(0.65, 0.65, 0.65);
    miniPizza.position.set(-0.9, 0, -0.2);
    group.add(miniPizza);

    // Mini Burger on right
    const miniBurger = this.createBurger({ burgerType: 'patty' });
    miniBurger.scale.set(0.65, 0.65, 0.65);
    miniBurger.position.set(0.9, 0, 0.3);
    group.add(miniBurger);

    // Chilled Drink Bottle in center
    const drinkCup = this.createDrink({ drinkColor: 0x1f140e, category: 'Coolers' });
    drinkCup.scale.set(0.65, 0.65, 0.65);
    drinkCup.position.set(0.1, 0, -0.7);
    group.add(drinkCup);

    return group;
  }

  // ================= ANIMATION TICK =================
  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth rotation interpolation
    if (this.autoRotate && !this.isDragging) {
      this.targetRotation.y += delta * 0.35;
    }

    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    if (this.currentFoodGroup) {
      this.currentFoodGroup.rotation.y = this.currentRotation.y;
      this.currentFoodGroup.rotation.x = this.currentRotation.x;

      // Subtle breathing float effect
      this.currentFoodGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.04;
    }

    // Animate steam particles rising
    if (this.steamParticles) {
      const pos = this.steamParticles.geometry.attributes.position.array;
      for (let i = 0; i < this.steamVel.length; i++) {
        pos[i * 3 + 1] += this.steamVel[i].y;
        pos[i * 3] += this.steamVel[i].x;
        pos[i * 3 + 2] += this.steamVel[i].z;

        if (pos[i * 3 + 1] > 2.8) {
          pos[i * 3 + 1] = 0.2;
          pos[i * 3] = (Math.random() - 0.5) * 1.5;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
        }
      }
      this.steamParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate garnish particles orbiting
    if (this.garnishParticles) {
      this.garnishParticles.rotation.y = -elapsedTime * 0.15;
    }

    this.renderer.render(this.scene, this.camera);
  }

  disposeGroup(group) {
    group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
}
