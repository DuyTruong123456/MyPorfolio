import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import fbxUrl from '../../Meshy_AI_Portrait_with_Glasses_0527085020_texture_fbx 2/Meshy_AI_Portrait_with_Glasses_0527085020_texture.fbx?url'
import baseColorUrl from '../../Meshy_AI_Portrait_with_Glasses_0527085020_texture_fbx 2/Meshy_AI_Portrait_with_Glasses_0527085020_texture.png?url'

const assetBase = new URL(
  '../../Meshy_AI_Portrait_with_Glasses_0527085020_texture_fbx 2/',
  import.meta.url,
).href

function loadTexture(textureLoader, url) {
  return new Promise((resolve, reject) => {
    textureLoader.load(url, resolve, undefined, reject)
  })
}

function configureColorMap(texture, anisotropy = 4) {
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = anisotropy
  texture.needsUpdate = true
  return texture
}

function frameCameraToObject(camera, controls, object, fitOffset = 1.28) {
  const box = new THREE.Box3().setFromObject(object)
  if (box.isEmpty()) return false

  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z, 0.001)

  const fov = (camera.fov * Math.PI) / 180
  let distance = maxDim / (2 * Math.tan(fov / 2))
  distance *= fitOffset

  camera.position.set(center.x, center.y + maxDim * 0.02, center.z + distance)
  camera.near = distance / 100
  camera.far = distance * 100
  camera.updateProjectionMatrix()

  controls.target.copy(center)
  controls.update()
  return true
}

function prepareMeshes(model) {
  let meshCount = 0

  model.traverse((child) => {
    if (!child.isMesh) return
    meshCount += 1

    child.castShadow = false
    child.receiveShadow = false
    child.frustumCulled = true

    const geometry = child.geometry
    if (!geometry) return

    geometry.computeVertexNormals()
    if (geometry.attributes.normal) {
      geometry.attributes.normal.needsUpdate = true
    }
  })

  return meshCount
}

function applyPortraitMaterials(model, colorMap) {
  const material = new THREE.MeshLambertMaterial({
    map: colorMap,
    color: 0xffffff,
  })

  model.traverse((child) => {
    if (!child.isMesh) return

    const previous = child.material
    if (Array.isArray(previous)) previous.forEach((m) => m?.dispose?.())
    else previous?.dispose?.()

    child.material = material
  })
}

function disposeModel(obj) {
  const materials = new Set()

  obj?.traverse?.((child) => {
    if (!child.isMesh) return
    child.geometry?.dispose?.()
    const m = child.material
    if (m) materials.add(m)
  })

  materials.forEach((m) => m.dispose?.())
}

export default function Face3DViewer({ className = '' }) {
  const mountRef = useRef(null)
  const [status, setStatus] = useState('Loading 3D face...')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let disposed = false
    let raf = 0
    let model = null

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 2000)
    camera.position.set(0, 0, 3)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    const maxAniso = renderer.capabilities.getMaxAnisotropy?.() ?? 4
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = 0.5
    controls.maxDistance = 12

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches
    controls.autoRotate = !prefersReducedMotion
    controls.autoRotateSpeed = 1.2

    // Soft studio lighting (similar to Meshy preview — no harsh specular).
    scene.add(new THREE.HemisphereLight(0xfff6ee, 0x1a2430, 1.35))
    const front = new THREE.DirectionalLight(0xffffff, 0.45)
    front.position.set(0, 1.5, 4)
    scene.add(front)
    const left = new THREE.DirectionalLight(0xe8f4ff, 0.22)
    left.position.set(-3, 0.5, 2)
    scene.add(left)

    const textureLoader = new THREE.TextureLoader()

    const handleResize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(mount)
    handleResize()

    const loadPortrait = async () => {
      try {
        setStatus('Loading 3D face...')

        const colorMap = await loadTexture(textureLoader, baseColorUrl)
        if (disposed) return
        configureColorMap(colorMap, maxAniso)

        setStatus('Rendering portrait...')

        const loader = new FBXLoader()
        loader.setResourcePath(assetBase)

        const loaded = await new Promise((resolve, reject) => {
          loader.load(fbxUrl, resolve, undefined, reject)
        })

        if (disposed) {
          disposeModel(loaded)
          return
        }

        const meshCount = prepareMeshes(loaded)
        if (meshCount === 0) throw new Error('FBX contains no meshes')

        applyPortraitMaterials(loaded, colorMap)

        const box = new THREE.Box3().setFromObject(loaded)
        const center = box.getCenter(new THREE.Vector3())
        loaded.position.sub(center)

        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z, 0.001)
        loaded.scale.setScalar(1.75 / maxDim)

        model = loaded
        scene.add(model)

        if (!frameCameraToObject(camera, controls, model)) {
          throw new Error('Could not frame portrait')
        }

        setStatus('Drag to rotate • Scroll to zoom')
      } catch (error) {
        console.error('Face3DViewer:', error)
        if (!disposed) setStatus('Failed to load 3D face.')
      }
    }

    const animate = () => {
      if (disposed) return
      controls.update()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    loadPortrait()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      controls.dispose()

      if (model) {
        disposeModel(model)
        scene.remove(model)
      }

      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      className={`face-viewer${className ? ` ${className}` : ''}`}
      aria-label="Interactive 3D portrait"
    >
      <div ref={mountRef} className="face-viewer__canvas" />
      <div className="face-viewer__status" role="status" aria-live="polite">
        {status}
      </div>
    </div>
  )
}
