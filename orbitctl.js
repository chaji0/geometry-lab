/* OrbitControls 대체 — kepler.html 이 쓰는 기능만 담은 가벼운 판.
   회전(끌기) · 확대축소(휠 / 두 손가락) · 감쇠(damping).
   예전에는 unpkg.com 에서 받아 왔는데, 학교 인터넷에서 느려서 같은 폴더에 둔다. */
import * as THREE from 'three';

export class OrbitControls {
  constructor(camera, dom){
    this.object = camera; this.domElement = dom;
    this.target = new THREE.Vector3();
    this.enabled = true;
    this.enableDamping = false; this.dampingFactor = 0.05;
    this.minDistance = 0.01; this.maxDistance = Infinity;
    this.minPolarAngle = 0.001; this.maxPolarAngle = Math.PI - 0.001;
    this.rotateSpeed = 1.0; this.zoomSpeed = 1.0;

    this._sph = new THREE.Spherical();
    this._dTheta = 0; this._dPhi = 0; this._scale = 1;
    this._ptrs = new Map(); this._last = null; this._pinch = null;

    dom.style.touchAction = 'none';
    const lp = e => [e.clientX, e.clientY];

    this._onDown = e => {
      if(!this.enabled) return;
      dom.setPointerCapture(e.pointerId);
      this._ptrs.set(e.pointerId, lp(e));
      if(this._ptrs.size === 1) this._last = lp(e);
    };
    this._onMove = e => {
      if(!this.enabled || !this._ptrs.has(e.pointerId)) return;
      const p = lp(e); this._ptrs.set(e.pointerId, p);
      if(this._ptrs.size >= 2){
        const v = [...this._ptrs.values()];
        const d = Math.hypot(v[0][0]-v[1][0], v[0][1]-v[1][1]);
        if(this._pinch) this._scale *= this._pinch / d;
        this._pinch = d; this._last = null; return;
      }
      if(!this._last) { this._last = p; return; }
      const h = this.domElement.clientHeight || 1;
      this._dTheta -= 2*Math.PI*(p[0]-this._last[0])/h*this.rotateSpeed;
      this._dPhi   -= 2*Math.PI*(p[1]-this._last[1])/h*this.rotateSpeed;
      this._last = p;
    };
    this._onUp = e => {
      this._ptrs.delete(e.pointerId);
      if(this._ptrs.size < 2) this._pinch = null;
      if(this._ptrs.size === 0) this._last = null;
      try{ dom.releasePointerCapture(e.pointerId); }catch(err){}
    };
    this._onWheel = e => {
      if(!this.enabled) return;
      e.preventDefault();
      this._scale *= Math.pow(0.95, -Math.sign(e.deltaY)*this.zoomSpeed);
    };
    this._onCtx = e => e.preventDefault();

    dom.addEventListener('pointerdown', this._onDown);
    dom.addEventListener('pointermove', this._onMove);
    dom.addEventListener('pointerup', this._onUp);
    dom.addEventListener('pointercancel', this._onUp);
    dom.addEventListener('wheel', this._onWheel, {passive:false});
    dom.addEventListener('contextmenu', this._onCtx);
  }

  update(){
    const off = new THREE.Vector3().subVectors(this.object.position, this.target);
    this._sph.setFromVector3(off);
    this._sph.theta += this._dTheta;
    this._sph.phi   += this._dPhi;
    this._sph.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._sph.phi));
    this._sph.radius *= this._scale;
    this._sph.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this._sph.radius));
    off.setFromSpherical(this._sph);
    this.object.position.copy(this.target).add(off);
    this.object.lookAt(this.target);
    if(this.enableDamping){
      const k = 1 - this.dampingFactor;
      this._dTheta *= k; this._dPhi *= k;
      this._scale = 1 + (this._scale - 1) * k;
      if(Math.abs(this._dTheta) < 1e-6) this._dTheta = 0;
      if(Math.abs(this._dPhi)   < 1e-6) this._dPhi   = 0;
      if(Math.abs(this._scale-1) < 1e-6) this._scale = 1;
    } else { this._dTheta = 0; this._dPhi = 0; this._scale = 1; }
    return true;
  }

  dispose(){
    const d = this.domElement;
    d.removeEventListener('pointerdown', this._onDown);
    d.removeEventListener('pointermove', this._onMove);
    d.removeEventListener('pointerup', this._onUp);
    d.removeEventListener('pointercancel', this._onUp);
    d.removeEventListener('wheel', this._onWheel);
    d.removeEventListener('contextmenu', this._onCtx);
  }
}
export default OrbitControls;
