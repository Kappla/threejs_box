import React from 'react';
import * as THREE from 'three';

class Content extends React.Component {

  private domElement: any;

  private box!: THREE.Mesh;
  private scene!: THREE.Scene;
  private renderer!: THREE.Renderer;
  private camera!: THREE.Camera;

  public componentDidMount() {

    const height = window.innerHeight;
    const width = window.innerWidth;

    /***********************************************
    *       Scene / Camera
    ************************************************/

    /* a Scene is the grouping object, think Project */
    this.scene = new THREE.Scene();

    /* camera configuration */
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 5;

    /***********************************************
    *       Lights
    ************************************************/

    const ambientLight = new THREE.AmbientLight(0xbfbfbf); // white light (lights up the room without shadows)
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // will create shadows
    this.scene.add(directionalLight);

    /***********************************************
    *       Box
    ************************************************/

    // we want to work with simple geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // create a "surface" Material
    const material = new THREE.MeshLambertMaterial({
      color: 0xff0000,    // red (can also use a CSS color string here)
    });

    // create a cube with the green material
    this.box = new THREE.Mesh(geometry, material);

    // add it to the cube
    this.scene.add(this.box);

    /***********************************************
    *       Configure renderer
    ************************************************/

    /* the renderer which outputs the content to the window */
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    // add it as a child
    this.domElement.appendChild(this.renderer.domElement);

    /***********************************************
    *       Animation
    ************************************************/

    this.animate();
  }

  private animate = () => {

    requestAnimationFrame(this.animate);

    // slightly rotate
    this.box.rotation.x += 0.02;
    // this.box.rotation.y += ?;
    // this.camera.rotation.z += ?;
    // this.box.rotation.x += ?;
    // this.box.scale.x = ?;

    // and update the output
    this.renderer.render(this.scene, this.camera);
  }


  public render() {

    return (
      <div ref={ref => this.domElement = ref} />
    )
  }
}

export default Content;