
console.log("Press Q to Display Box collide");

var camera, scene, dlight, renderer, effcutout
//Character
var olay, olayMixer, olayCk, olayCollide, olayIntersects
var olayCheck=false
var olayClick=0
var olayBox = []
var speng, spengMixer, spengCk, spengCollide, spengIntersects
var spengCheck=false
var spengClick=0
var spengBox = []
var mno, mnoMixer, mnoCk, mnoCollide, mnoIntersects
var mnoCheck=false
var mnoClick=0
var mnoBox = []
var ishuen, ishuenMixer, ishuenCk, ishuenCollide, ishuenIntersects
var ishuenCheck=false
var ishuenClick=0
var ishuenBox = []
//CollideBox
var geometry = new THREE.BoxGeometry( 1,2,1 );
var material = new THREE.MeshPhongMaterial({color:0xffffff, wireframe: true});

var theta=0
var speedPlus=0.5
var speedHTML, htmlTime, time=0
var radius=16
var clock = new THREE.Clock()

var mouseCoords = new THREE.Vector2()
var raycaster = new THREE.Raycaster()
console.log("Thank you\nCredit lib of three.js");
console.log("screenshot by shivasaxena\n");
var strDownloadMime = "image/octet-stream";
// - Main code -
init()
animate()
// - Functions -
function init() {
  container = document.createElement('div')
  document.body.appendChild(container)
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x3333ff)
  scene.add(new THREE.AmbientLight(0x505050))
  camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1000)
  camera.position.set(0,0,50)
  // console.log(camera);

  dlight = new THREE.DirectionalLight( 0xffffff, 1 )
  dlight.position.set( -10, 10, 15 )
  dlight.castShadow = true
  let dl = 100
  dlight.shadow.camera.left = -dl
  dlight.shadow.camera.right = dl
  dlight.shadow.camera.top = dl
  dlight.shadow.camera.bottom = -dl
  dlight.shadow.camera.near = 2
  dlight.shadow.camera.far = 1000
  dlight.shadow.mapSize.x = 1024
  dlight.shadow.mapSize.y = 1024
  scene.add(dlight)
  // model
  var loader = new THREE.GLTFLoader()
  // olay model
  loader.load( './models/drum_boy/scene.gltf', (object) => {
    var animations = object.animations
    olay = object.scene
    olay.position.x = THREE.Math.randInt(-5,5)
    olay.position.y = THREE.Math.randInt(-5,5)
    olay.position.z = THREE.Math.randInt(-5,5)
    olay.traverse((node) => {
      if(node instanceof THREE.Mesh){
        node.castShadow = true
        node.resiveShadow = true
        }
      })
    olayMixer = new THREE.AnimationMixer( olay )
    var olayAct = olayMixer.clipAction(animations[0])
    olayAct.play()
    scene.add( olay )
    // olay Collide
    olayCollide =  new THREE.Mesh(geometry,material);
    olayCollide.name = "olayCollide"
    olayCollide.position.set(olay.position.x,olay.position.y+1,olay.position.z)
    olayCollide.material.transparent = true
    olayCollide.material.opacity = 0
    scene.add(olayCollide)
    olayBox.push(olayCollide)
    // olay text
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      olayCK = new THREE.Mesh( textGeo, textMaterial );
      // olayCK.position.copy(olayCollide.position);
      olayCK.position.set(olayCollide.position.x-.3, olayCollide.position.y+1, olayCollide.position.z);
      olayCK.castShadow = true;
      olayCK.receiveShadow = true;
      scene.add( olayCK );
    });
  })


  //speng
  loader.load( './models/action_boy/scene.gltf', function ( object ) {
    var animations = object.animations
    speng = object.scene
    speng.position.x = THREE.Math.randInt(-5,5)
    speng.position.y = THREE.Math.randInt(-5,5)
    speng.position.z = THREE.Math.randInt(-5,5)
    speng.traverse(function(node){
      if(node instanceof THREE.Mesh){
        node.castShadow = true
        node.resiveShadow = true
        }
      })
    spengMixer = new THREE.AnimationMixer( speng )
    var spengAct = spengMixer.clipAction(animations[0])
    spengAct.play()
    scene.add( speng )
    //spengCollide
    spengCollide =  new THREE.Mesh(geometry,material);
    spengCollide.name = "spengCollide"
    spengCollide.position.set(speng.position.x,speng.position.y+1,speng.position.z)
    scene.add(spengCollide)
    spengBox.push(spengCollide)
    // speng text
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      spengCK = new THREE.Mesh( textGeo, textMaterial );
      spengCK.position.set(spengCollide.position.x-.3, spengCollide.position.y+1, spengCollide.position.z);
      spengCK.castShadow = true;
      spengCK.receiveShadow = true;
      scene.add( spengCK );
    });
  } )

  //mno
  loader.load( './models/crazy_boy/scene.gltf', function ( object ) {
    var animations = object.animations
    mno = object.scene
    mno.position.x = THREE.Math.randInt(-5,5)
    mno.position.y = THREE.Math.randInt(-5,5)
    mno.position.z = THREE.Math.randInt(-5,5)
    mno.traverse(function(node){
      if(node instanceof THREE.Mesh){
        node.castShadow = true
        node.resiveShadow = true
        }
      })
    mnoMixer = new THREE.AnimationMixer( mno )
    var mnoAct = mnoMixer.clipAction(animations[2])
    mnoAct.play()
    scene.add( mno )
    //mnoCollide
    mnoCollide =  new THREE.Mesh(geometry,material);
    mnoCollide.name = "mnoCollide"
    mnoCollide.position.set(mno.position.x,mno.position.y+1,mno.position.z)
    scene.add(mnoCollide)
    mnoBox.push(mnoCollide)
    // mno text
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      mnoCK = new THREE.Mesh( textGeo, textMaterial );
      mnoCK.position.set(mnoCollide.position.x-.3, mnoCollide.position.y+1, mnoCollide.position.z);
      mnoCK.castShadow = true;
      mnoCK.receiveShadow = true;
      scene.add( mnoCK );
    });
  } )
  //ishuen
  loader.load( './models/quite_boy/scene.gltf', function ( object ) {
    var animations = object.animations
    ishuen = object.scene
    ishuen.position.x = THREE.Math.randInt(-5,5)
    ishuen.position.y = THREE.Math.randInt(-5,5)
    ishuen.position.z = THREE.Math.randInt(-5,5)
    ishuen.traverse(function(node){
      if(node instanceof THREE.Mesh){
        node.castShadow = true
        node.resiveShadow = true
        }
      })
    ishuenMixer = new THREE.AnimationMixer( ishuen )
    var ishuenAct = ishuenMixer.clipAction(animations[1])
    ishuenAct.play()
    scene.add( ishuen )
    //ishuenCollide
    ishuenCollide =  new THREE.Mesh(geometry,material);
    ishuenCollide.name = "ishuenCollide"
    ishuenCollide.position.set(ishuen.position.x,ishuen.position.y+1,ishuen.position.z)
    scene.add(ishuenCollide)
    ishuenBox.push(ishuenCollide)
    // ishuen text
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      ishuenCK = new THREE.Mesh( textGeo, textMaterial );
      ishuenCK.position.set(ishuenCollide.position.x-.3, ishuenCollide.position.y+1, ishuenCollide.position.z);
      ishuenCK.castShadow = true;
      ishuenCK.receiveShadow = true;
      scene.add( ishuenCK );
    });
  } )
  renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer: true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)
  renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.speng = THREE.PCFShadowMap
  container.appendChild(renderer.domElement)
  // controls = new THREE.OrbitControls(camera, renderer.domElement)
  effcutout = new THREE.OutlineEffect(renderer)
  //speedhtml
  speedHTML = document.createElement("speedHTML")
  speedHTML.style.position = 'absolute'
  speedHTML.style.bottom = '40px'
  speedHTML.style.textAlign = 'left'
  speedHTML.style.color = '#00aadd'
  speedHTML.style.textShadow = '0 0 4px #000'
  document.body.appendChild(speedHTML)
  //timehtml
  htmlTime = document.createElement("htmlTime")
  htmlTime.style.position = 'absolute'
  htmlTime.style.bottom = '25px'
  htmlTime.style.textAlign = 'left'
  htmlTime.style.color = '#f747c7'
  htmlTime.style.textShadow = '0 0 4px #000'
  document.body.appendChild(htmlTime);
  //screenshot
  var saveLink = document.createElement('div');
  saveLink.style.position = 'absolute';
  saveLink.style.bottom = '10px';
  saveLink.style.color = 'white !important';
  saveLink.style.textAlign = 'left';
  saveLink.style.textShadow = '1 1 6px #000'
  saveLink.innerHTML = '<a href="#" id="saveLink">Screenshot</a>';
  document.body.appendChild(saveLink);

  document.getElementById("saveLink").addEventListener('click', saveAsImage);

  document.addEventListener('mousedown',onDocumentMouseDown,false)
  document.addEventListener('touchstart',onDocumentTouchStart,false)
  window.addEventListener('resize',onWindowResize,false)
  window.addEventListener( 'keydown', ( event ) => {
    switch ( event.keyCode ) {
      case 81: // Q
      olayCollide.material.opacity = 0.5
      setTimeout(function(){
        olayCollide.material.opacity = 0
      }, 3000);
        break;
    }
  });

}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
}
function saveAsImage() {
  var imgData, imgNode;

  try {
      var strMime = "image/jpeg";
      imgData = renderer.domElement.toDataURL(strMime);

      saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

  } catch (e) {
      console.log(e);
      return;
  }

}

var saveFile = function (strData, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
      document.body.appendChild(link); //Firefox requires the link to be in the body
      link.download = filename;
      link.href = strData;
      link.click();
      document.body.removeChild(link); //remove the link when done
  } else {
      location.replace(uri);
  }
}
function onDocumentTouchStart( event ) {
  event.preventDefault()
  event.clientX = event.touches[0].clientX
  event.clientY = event.touches[0].clientY
  onDocumentMouseDown( event )
}
function onDocumentMouseDown(event){
  event.preventDefault()
  mouseCoords.x = (event.clientX/window.innerWidth)*2-1
  mouseCoords.y = -(event.clientY/window.innerHeight)*2+1
  raycaster.setFromCamera(mouseCoords,camera)
  // var intersects = raycaster.intersectObjects(scene.children)
  olayIntersects = raycaster.intersectObjects(olayBox)
  // console.log(olayIntersects);
  spengIntersects = raycaster.intersectObjects(spengBox)
  mnoIntersects = raycaster.intersectObjects(mnoBox)
  ishuenIntersects = raycaster.intersectObjects(ishuenBox)
  //console.log(intersects[0])
  if(olayIntersects.length>0){
    // intersects[0].object.material.color.setHex(0xffffff)
    olayCheck=true
    olayClick++
    olay.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    olayCollide.position.set(olay.position.x,olay.position.y+1,olay.position.z)
    speedPlus+=0.1
  }
  if(spengIntersects.length>0){
    spengCheck=true
    spengClick++
    speng.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    spengCollide.position.set(speng.position.x,speng.position.y+1,speng.position.z)
    speedPlus+=0.1
  }
  if(mnoIntersects.length>0){
    mnoCheck=true
    mnoClick++
    mno.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    mnoCollide.position.set(mno.position.x,mno.position.y+1,mno.position.z)
    speedPlus+=0.1
  }
  if(ishuenIntersects.length>0){
    ishuenCheck=true
    ishuenClick++
    ishuen.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    ishuenCollide.position.set(ishuen.position.x,ishuen.position.y+1,ishuen.position.z)
    speedPlus+=0.1
  }

}
function animate(){
  requestAnimationFrame(animate)

  render()
}

function render(){
  theta += speedPlus
  var delta = clock.getDelta()
  if ( olayMixer !== undefined ) {
    olayMixer.update(delta)
  }
  if ( spengMixer !== undefined ) {
    spengMixer.update(delta)
  }
  if ( mnoMixer !== undefined ) {
    mnoMixer.update(delta)
  }
  if ( ishuenMixer !== undefined ) {
    ishuenMixer.update(delta)
  }

  camera.position.x = radius*Math.sin(THREE.Math.degToRad(theta))
  // camera.position.y = radius*Math.sin(THREE.Math.degToRad(theta))
  camera.position.z = radius*Math.cos(THREE.Math.degToRad(theta))
  camera.lookAt(scene.position)
  // console.log(delta);

  // camera.position.z = 15
  // olay.position.x += Math.random()*Math.sin(-.1)
  // olay.position.y += 0.2*Math.sin(-.1)
  // olay.position.x += 0.01*Math.sin(THREE.Math.degToRad(-.1))
  // olay.position.z += 0.01*Math.cos(THREE.Math.degToRad(-.1))

  if(olayCheck){
    scene.remove(olayCK);
    olayCheck = false
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( olayClick,{
      font: font,
      size: .4,
      height: .1,
      curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      olayCK = new THREE.Mesh( textGeo, textMaterial );
      // olayCK.position.copy(olayCollide.position);
      olayCK.position.set(olayCollide.position.x-.3, olayCollide.position.y+1, olayCollide.position.z);
      olayCK.castShadow = true;
      olayCK.receiveShadow = true;
      scene.add( olayCK );
      //console.log(loadertxt);
    });
  }
  if(spengCheck){
    scene.remove(spengCK);
    spengCheck = false
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( spengClick,{
      font: font,
      size: .4,
      height: .1,
      curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      spengCK = new THREE.Mesh( textGeo, textMaterial );      
      spengCK.position.set(spengCollide.position.x-.3, spengCollide.position.y+1, spengCollide.position.z);
      spengCK.castShadow = true;
      spengCK.receiveShadow = true;
      scene.add( spengCK );
    });
  }
  if(mnoCheck){
    scene.remove(mnoCK);
    mnoCheck = false
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( mnoClick,{
      font: font,
      size: .4,
      height: .1,
      curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      mnoCK = new THREE.Mesh( textGeo, textMaterial );
      mnoCK.position.set(mnoCollide.position.x-.3, mnoCollide.position.y+1, mnoCollide.position.z);
      mnoCK.castShadow = true;
      mnoCK.receiveShadow = true;
      scene.add( mnoCK );
    });
  }
  if(ishuenCheck){
    scene.remove(ishuenCK);
    ishuenCheck = false
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( ishuenClick,{
      font: font,
      size: .4,
      height: .1,
      curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      ishuenCK = new THREE.Mesh( textGeo, textMaterial );
      ishuenCK.position.set(ishuenCollide.position.x-.3, ishuenCollide.position.y+1, ishuenCollide.position.z);
      ishuenCK.castShadow = true;
      ishuenCK.receiveShadow = true;
      scene.add( ishuenCK );
    });
  }

  //innerHTML
  speedHTML.innerText = "Speed: "+speedPlus.toFixed(2)
  effcutout.render(scene, camera)
  //renderer.render(scene, camera)
  time += delta
  htmlTime.innerHTML = "PlayTime: "+time.toFixed( 2 )
}
