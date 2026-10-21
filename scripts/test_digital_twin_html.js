const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/digital-twin.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  combinedJs += match[1] + '\n;';
}

console.log('Digital Twin JS length:', combinedJs.length);

const mockObj3D = function() {
  const self = {
    position: { x: 0, y: 0, z: 0, set: () => {}, copy: () => {}, add: () => {}, clone: () => new mockObj3D().position, lerp: () => {}, lerpVectors: () => {}, multiplyScalar: () => {} },
    rotation: { x: 0, y: 0, z: 0, set: () => {}, copy: () => {} },
    scale: { x: 1, y: 1, z: 1, set: () => {}, setScalar: () => {} },
    add: () => {},
    remove: () => {},
    children: [],
    traverse: (fn) => fn(new mockObj3D()),
    userData: {},
    shadow: { mapSize: { set: () => {} }, camera: {} },
    clone: function() { return mockObj3D(); }
  };
  return self;
};

const MockTHREE = {
  Scene: mockObj3D,
  Group: mockObj3D,
  Color: function(c) {
    return {
      setHex: () => {},
      copy: () => {},
      clone: () => new MockTHREE.Color(c),
      lerp: () => new MockTHREE.Color(c),
      setHSL: () => new MockTHREE.Color(c)
    };
  },
  FogExp2: function() { return { color: new MockTHREE.Color(0) }; },
  PerspectiveCamera: function() {
    return {
      position: { set: () => {}, copy: () => {}, clone: () => ({ sub: () => ({}), add: () => ({}) }), lerpVectors: () => {}, multiplyScalar: () => {} },
      lookAt: () => {},
      updateProjectionMatrix: () => {}
    };
  },
  WebGLRenderer: function() {
    return {
      setSize: () => {},
      setPixelRatio: () => {},
      shadowMap: { mapSize: { set: () => {} } },
      domElement: {
        appendChild: () => {},
        addEventListener: () => {},
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
        style: {}
      },
      render: () => {},
      dispose: () => {},
      capabilities: { getMaxAnisotropy: () => 16 }
    };
  },
  DirectionalLight: function() {
    const o = mockObj3D();
    o.shadow = { mapSize: { set: () => {} }, camera: {} };
    o.color = new MockTHREE.Color(0);
    return o;
  },
  HemisphereLight: function() {
    const o = mockObj3D();
    return o;
  },
  PointLight: mockObj3D,
  BoxGeometry: function() { return {}; },
  CylinderGeometry: function() { return { rotateX: () => {}, rotateZ: () => {} }; },
  SphereGeometry: function() { return {}; },
  ConeGeometry: function() { return { rotateZ: () => {}, rotateX: () => {} }; },
  TorusGeometry: function() { return { rotateX: () => {}, rotateZ: () => {} }; },
  EdgesGeometry: function() { return {}; },
  BufferGeometry: function() {
    return {
      setFromPoints: () => {},
      setAttribute: () => {},
      attributes: { position: { array: new Float32Array(300 * 6), needsUpdate: false } }
    };
  },
  BufferAttribute: function() { return {}; },
  LineSegments: mockObj3D,
  Line: mockObj3D,
  Mesh: function(geo, mat) {
    const o = mockObj3D();
    o.geometry = geo;
    o.material = mat || { color: new MockTHREE.Color(0), emissive: new MockTHREE.Color(0) };
    return o;
  },
  MeshStandardMaterial: function(cfg) {
    return {
      clone: function() { return MockTHREE.MeshStandardMaterial(cfg); },
      color: new MockTHREE.Color(cfg?.color || 0),
      emissive: new MockTHREE.Color(cfg?.emissive || 0),
      needsUpdate: false
    };
  },
  MeshBasicMaterial: function(cfg) {
    return {
      color: new MockTHREE.Color(cfg?.color || 0),
      clone: function() { return MockTHREE.MeshBasicMaterial(cfg); },
      scale: { setScalar: () => {} }
    };
  },
  LineBasicMaterial: function() { return {}; },
  CanvasTexture: function() {
    return {
      wrapS: 0,
      wrapT: 0,
      repeat: { set: () => {} },
      anisotropy: 16,
      encoding: 3001
    };
  },
  Vector2: function(x, y) { return { x: x||0, y: y||0, set: () => {} }; },
  Vector3: function(x, y, z) {
    return {
      x: x||0, y: y||0, z: z||0,
      set: function(nx, ny, nz) { this.x = nx; this.y = ny; this.z = nz; },
      copy: function(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; },
      clone: function() { return new MockTHREE.Vector3(this.x, this.y, this.z); },
      add: function(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; },
      sub: function(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; },
      project: () => ({ x: 0, y: 0, z: 0.5 }),
      applyMatrix4: function() { return this; },
      lerp: function(v, t) { this.x += (v.x - this.x)*t; this.y += (v.y - this.y)*t; this.z += (v.z - this.z)*t; return this; },
      lerpVectors: function(a, b, t) { this.x = a.x + (b.x - a.x)*t; this.y = a.y + (b.y - a.y)*t; this.z = a.z + (b.z - a.z)*t; return this; },
      multiplyScalar: function(s) { this.x *= s; this.y *= s; this.z *= s; return this; },
      lengthSq: () => 1
    };
  },
  Matrix4: function() {
    return {
      extractRotation: () => new MockTHREE.Matrix4()
    };
  },
  Spherical: function() {
    return { radius: 50, theta: 0, phi: 0, setFromVector3: () => {} };
  },
  Raycaster: function() {
    return {
      setFromCamera: () => {},
      intersectObjects: () => []
    };
  },
  CatmullRomCurve3: function() {
    return {
      getPointAt: () => new MockTHREE.Vector3(0, 0, 0),
      getTangentAt: () => new MockTHREE.Vector3(1, 0, 0)
    };
  },
  MathUtils: {
    lerp: (x, y, t) => x + (y - x) * t
  },
  OrbitControls: function(cam, dom) {
    return {
      target: new MockTHREE.Vector3(0, 0, 0),
      enableDamping: true,
      update: () => {},
      autoRotate: false
    };
  },
  EffectComposer: function() {
    return {
      addPass: () => {},
      setSize: () => {},
      render: () => {}
    };
  },
  RenderPass: function() { return {}; },
  ShaderPass: function() { return {}; },
  UnrealBloomPass: function() { return {}; },
  GLTFExporter: function() {
    return {
      parse: (scene, cb) => cb(new ArrayBuffer(100))
    };
  },
  PCFSoftShadowMap: 1,
  ACESFilmicToneMapping: 1,
  RepeatWrapping: 1000,
  EquirectangularReflectionMapping: 1001,
  DoubleSide: 2,
  BackSide: 1,
  sRGBEncoding: 3001
};

const mockElem = (id = '') => ({
  id,
  innerHTML: '',
  value: '1',
  textContent: '',
  classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => true },
  appendChild: () => {},
  removeChild: () => {},
  setAttribute: () => {},
  style: {},
  clientWidth: 800,
  clientHeight: 600,
  dataset: {},
  getContext: () => ({
    createLinearGradient: () => ({ addColorStop: () => {} }),
    fillRect: () => {},
    strokeRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fill: () => {},
    closePath: () => {},
    clearRect: () => {},
    arc: () => {},
    setLineDash: () => {},
    fillText: () => {},
    drawImage: () => {}
  }),
  querySelectorAll: () => [],
  addEventListener: () => {}
});

const sandbox = {
  console: console,
  document: {
    documentElement: { classList: { contains: () => true } },
    getElementById: (id) => mockElem(id),
    createElement: (tag) => mockElem(tag),
    querySelectorAll: () => [],
    querySelector: () => mockElem(),
    addEventListener: () => {},
    readyState: 'complete'
  },
  window: {
    addEventListener: () => {},
    location: { hash: '' },
    innerWidth: 1200,
    innerHeight: 800,
    devicePixelRatio: 1,
    parent: null
  },
  THREE: MockTHREE,
  Float32Array: Float32Array,
  Uint8Array: Uint8Array,
  ArrayBuffer: ArrayBuffer,
  Buffer: Buffer,
  Blob: function() { return {}; },
  URL: { createObjectURL: () => 'blob:test' },
  performance: { now: () => Date.now() },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame: () => {},
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  clearTimeout: () => {},
  navigator: { userAgent: 'test' }
};

sandbox.window.document = sandbox.document;
sandbox.window.self = sandbox.window;
sandbox.window.top = sandbox.window;
sandbox.global = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(combinedJs, sandbox);
  console.log('✓ preview/digital-twin.html executed cleanly in VM sandbox with 0 errors!');
} catch (e) {
  console.error('❌ Error in preview/digital-twin.html:', e);
  process.exit(1);
}
