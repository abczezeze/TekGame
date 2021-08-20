var camera, scene, dlight, renderer, effcutout
//1Character 11var
var olay, olayMixer, olayCk, olayCollide, olayIntersects
var olaySound, olayAudioLoader, olayListener = new THREE.AudioListener();
var olayCheck=false, olayClick=0, olayBox = []
var speng, spengMixer, spengCk, spengCollide, spengIntersects
var spengSound, spengAudioLoader, spengListener = new THREE.AudioListener();
var spengCheck=false, spengClick=0, spengBox = []
var mno, mnoMixer, mnoCk, mnoCollide, mnoIntersects
var mnoSound, mnoAudioLoader, mnoListener = new THREE.AudioListener();
var mnoCheck=false, mnoClick=0, mnoBox = []
var ishuen, ishuenMixer, ishuenCk, ishuenCollide, ishuenIntersects
var ishuenSound, ishuenAudioLoader, ishuenListener = new THREE.AudioListener();
var ishuenCheck=false, ishuenClick=0, ishuenBox = []
//skb Model
var cloundModel
//threejs model
var FlamingoModel, FlamingoMixer=[]
//obj model
var instrumentMusical, instrumentMusicalMate
//total score
var totalScoreCk, totalScoreClick=0
//CollideBox
var geometry = new THREE.BoxGeometry( 1,2,1 );
// var material = new THREE.MeshPhongMaterial({color:0x0000ff, transparent: true, opacity:0, wireframe:true});
var material = new THREE.MeshPhongMaterial({transparent: true, opacity:0});

var theta=0
var speedPlus=0.5
var speedHTML, htmlTime, time=0
var radius=16
var clock = new THREE.Clock()
//sound
var listener = new THREE.AudioListener();
//raycast
var mouseCoords = new THREE.Vector2()
var raycaster = new THREE.Raycaster()
//credit
console.log("Thank you\nCredit lib of three.js");
console.log("screenshot by shivasaxena");

var strDownloadMime = "image/octet-stream";
//loadingScreen
var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 100),
  box: new THREE.Mesh( new THREE.BoxGeometry( 1,1,1 ), new THREE.MeshPhongMaterial({ color:0x221155 })),
  hemiLight: new THREE.HemisphereLight( 0xff1111, 0xff1111, 0.6 )
};
var loadingManager = null;
var RESOURCES_LOADED = false;
var itemload, itemtotal;
var loadpage=0;

//DataFirebase
var playerIp = "1.1.1.1"
var playerCoutry = "Country"
var gamescore = 0
var gametime = 0
var firebaseDT = new firebase.firestore.Timestamp.now()
//Html
var htmlTime, htmlScore, htmlPlayer, htmlCountry, htmlIp, btn

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


    loadingScreen// Set up the loading screen's scene.
    loadingScreen.box.position.set(0,0,5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    loadingScreen.scene.add(loadingScreen.hemiLight);
    loadingScreen.scene.background = new THREE.Color(0x441166);

    // Create a loading manager to set RESOURCES_LOADED when appropriate.
    // Pass loadingManager to all resource loaders.
    loadingManager = new THREE.LoadingManager();
    // foo = document.createElement('foo');
    // document.body.appendChild(foo)
    loadingManager.onProgress = function(item, loaded, total){
      //console.log(item, loaded, total);
      perload = loaded/total*100
      foo = document.getElementById('foo');
      foo.style.position = 'absolute';
      foo.style.top = '100px';
      foo.style.textAlign = 'center';
      foo.style.width = '100%'
      foo.style.color = '#990000';
      foo.style.fontSize = '35px';
      // foo.innerHTML = "Loading: "+perload.toFixed(2)+"%<br>Total: "+total;
      foo.innerHTML = "Loading: "+perload.toFixed(2)+"%<br>Total: "+total+"<br>Item: "+item+"<br>F12: Credit";

      fooBar = document.getElementById("fooBar");
      fooBar.style.position = 'absolute'
      fooBar.style.bottom = '200px'
      // fooBar.style.width = '100px'
      fooBar.style.height = '20px'
      // fooBar.style.border = '4px solid gray'      
      fooBar.style.background = "#101010";
      fooBar.style.textAlign = 'center';
      fooBar.innerHTML = fooBar.style.width = ''+perload*100
      if(loaded == total){
        foo.remove();
        fooBar.remove();
      }
      // console.log('Loading file: '+item+'.\nLoaded: '+loaded+' of ' +total+' files.');
    };

    loadingManager.onLoad = function(){
      console.log("loaded all resources");
      RESOURCES_LOADED = true;
    };



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
  var loader = new THREE.GLTFLoader(loadingManager)
  // olay model
  loader.load( './models/olay2021_1.glb', (object) => {
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
    scene.add(olayCollide)
    olayBox.push(olayCollide)
    // olayText
    loadertxt = new THREE.FontLoader(loadingManager);
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      olayCk = new THREE.Mesh( textGeo, textMaterial );
      // olayCk.position.copy(olayCollide.position);
      olayCk.position.set(olayCollide.position.x-.3, olayCollide.position.y+1, olayCollide.position.z);
      //olaySound
      olayCk.add( olayListener );
      olaySound = new THREE.Audio( olayListener );
      olayAudioLoader = new THREE.AudioLoader(loadingManager);
      olayAudioLoader.load( 'audio/drum.mp3', function( buffer ) {
        olaySound.setBuffer( buffer );
        olaySound.setLoop( false );
        olaySound.setVolume( 2 );
      });
      scene.add( olayCk );
    });
  })

  //speng
  loader.load( './models/speng2021_1.glb', function ( object ) {
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
    var spengAct = spengMixer.clipAction(animations[1])
    spengAct.play()
    scene.add( speng )
    //spengCollide
    spengCollide =  new THREE.Mesh(geometry,material);
    spengCollide.name = "spengCollide"
    spengCollide.position.set(speng.position.x,speng.position.y+1,speng.position.z)
    scene.add(spengCollide)
    spengBox.push(spengCollide)
    // speng text
    loadertxt = new THREE.FontLoader(loadingManager);
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      spengCk = new THREE.Mesh( textGeo, textMaterial );
      spengCk.position.set(spengCollide.position.x-.3, spengCollide.position.y+1, spengCollide.position.z);
      //spengSound
      spengCk.add( spengListener );
      spengSound = new THREE.Audio( spengListener );
      spengAudioLoader = new THREE.AudioLoader(loadingManager);
      spengAudioLoader.load( 'audio/guitar0.mp3', function( buffer ) {
        spengSound.setBuffer( buffer );
        spengSound.setLoop( false );
        spengSound.setVolume( 2 );
      });
      scene.add( spengCk );
    });
  } )

  //mno
  loader.load( './models/mno2021_1.glb', function ( object ) {
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
    var mnoAct = mnoMixer.clipAction(animations[0])
    mnoAct.play()
    scene.add( mno )
    //mnoCollide
    mnoCollide =  new THREE.Mesh(geometry,material);
    mnoCollide.name = "mnoCollide"
    mnoCollide.position.set(mno.position.x,mno.position.y+1,mno.position.z)
    scene.add(mnoCollide)
    mnoBox.push(mnoCollide)
    // mno text
    loadertxt = new THREE.FontLoader(loadingManager);
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      mnoCk = new THREE.Mesh( textGeo, textMaterial );
      mnoCk.position.set(mnoCollide.position.x-.3, mnoCollide.position.y+1, mnoCollide.position.z);
      //mnoSound
      mnoCk.add( mnoListener );
      mnoSound = new THREE.Audio( mnoListener );
      mnoAudioLoader = new THREE.AudioLoader(loadingManager);
      mnoAudioLoader.load( 'audio/bass00.mp3', function( buffer ) {
        mnoSound.setBuffer( buffer );
        mnoSound.setLoop( false );
        mnoSound.setVolume( 0.7 );
      });
      scene.add( mnoCk );
    });
  } )
  //ishuen
  loader.load( './models/ishuen2021_1.glb', function ( object ) {
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
    var ishuenAct = ishuenMixer.clipAction(animations[0])
    ishuenAct.play()
    scene.add( ishuen )
    //ishuenCollide
    ishuenCollide =  new THREE.Mesh(geometry,material);
    ishuenCollide.name = "ishuenCollide"
    ishuenCollide.position.set(ishuen.position.x,ishuen.position.y+1,ishuen.position.z)
    scene.add(ishuenCollide)
    ishuenBox.push(ishuenCollide)
    // ishuen text
    loadertxt = new THREE.FontLoader(loadingManager);
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
      textGeo = new THREE.TextBufferGeometry( "0",{
        font: font,
        size: .4,
        height: .1,
        curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xeecc00 } );
      ishuenCk = new THREE.Mesh( textGeo, textMaterial );
      ishuenCk.position.set(ishuenCollide.position.x-.3, ishuenCollide.position.y+1, ishuenCollide.position.z);
      //ishuenSound
      ishuenCk.add( ishuenListener );
      ishuenSound = new THREE.Audio( ishuenListener );
      ishuenAudioLoader = new THREE.AudioLoader(loadingManager);
      ishuenAudioLoader.load( 'audio/Turntable0.mp3', function( buffer ) {
        ishuenSound.setBuffer( buffer );
        ishuenSound.setLoop( false );
        ishuenSound.setVolume( 0.7 );
      });
      scene.add( ishuenCk );
    });
  } )
  // total score
  loadertxt = new THREE.FontLoader(loadingManager);
  loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( "0",{
      font: font,
      size: .7,
      height: .1,
      curveSegments: 1,
    });
    textMaterial = new THREE.MeshPhongMaterial( { color: 0xee1111 } );
    totalScoreCk = new THREE.Mesh( textGeo, textMaterial );
    totalScoreCk.castShadow = true;
    totalScoreCk.receiveShadow = true;
    //sound
    totalScoreCk.add( listener );
    var sound = new THREE.Audio( listener );
    var audioLoader = new THREE.AudioLoader(loadingManager);
    audioLoader.load( 'audio/4JaTuRus.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });
    scene.add( totalScoreCk );
  });
    // OBJmodel
    var mtlLoader = new THREE.MTLLoader(loadingManager);
    mtlLoader.load("models/instrument_musical.mtl", function(materials){
      materials.preload();
      var objLoader = new THREE.OBJLoader(loadingManager);
      objLoader.setMaterials(materials);
      objLoader.load("models/instrument_musical.obj", function(mesh){
        mesh.traverse(function(node){
          if( node instanceof THREE.Mesh ){
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        scene.add(mesh);
        mesh.position.set(0, -8, 0);
        instrumentMusicalMate = materials.materials
        for(let key in materials.materials){
          // console.log(materials.materials[key].opacity)
          materials.materials[key].transparent = true
          materials.materials[key].opacity = .7
        }
        mesh.scale.set(3,3,3);
        instrumentMusical = mesh
      });
    });
    //cloundModel
    console.log("cloud//Hyungjung Kim//Sketchfab");
    for(let i = 0;i<7;i++){
      var loader = new THREE.GLTFLoader(loadingManager)
      loader.load( './models/low_poly_cloud_Hyungjung Kim/scene.gltf', (object) => {
        cloundModel = object.scene
        cloundModel.position.set(THREE.Math.randInt(-15,15),THREE.Math.randInt(-15,15),THREE.Math.randInt(-15,15))
        cloundModel.scale.set(.05,.05,.05)
        cloundModel.rotation.y = Math.random()*Math.PI*4
        cloundModel.traverse((node) => {
          if(node instanceof THREE.Mesh){
            node.castShadow = true
            node.resiveShadow = true
            node.material.opacity = 0.5
            node.material.transparent = true
            // console.log(node)
            }
          })
          scene.add( cloundModel );
      });
    }
    //birdModel
    console.log("Flamingo//threejs");
    for(let i = 0;i<7;i++){
      var loader = new THREE.GLTFLoader(loadingManager)
      loader.load( './models/Flamingo.glb', (object) => {
        let animations = object.animations
        FlamingoModel = object.scene
        FlamingoModel.position.set(THREE.Math.randInt(-15,15),THREE.Math.randInt(-15,15),THREE.Math.randInt(-15,15))
        FlamingoModel.rotation.y = Math.random()*Math.PI*4
        FlamingoModel.scale.set(.03,.03,.03)
        FlamingoModel.traverse((node) => {
          if(node instanceof THREE.Mesh){
            node.castShadow = true
            node.resiveShadow = true
            node.material.opacity = 0.5
            node.material.transparent = true
            }
          })
          FlamingoMixer[i] = new THREE.AnimationMixer( FlamingoModel )
          var FlamingoAct = FlamingoMixer[i].clipAction(animations[0])
          FlamingoAct.play()
          scene.add( FlamingoModel );
      });
    }
    
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
  speedHTML.style.top = '110px'
  speedHTML.style.textAlign = 'left'
  speedHTML.style.color = '#00aadd'
  speedHTML.style.textShadow = '0 0 4px #000'
  document.body.appendChild(speedHTML)
  //timehtml
  htmlTime = document.createElement("htmlTime")
  htmlTime.style.position = 'absolute'
  htmlTime.style.top = '90px'
  htmlTime.style.textAlign = 'left'
  htmlTime.style.color = '#f747c7'
  htmlTime.style.textShadow = '0 0 4px #000'
  document.body.appendChild(htmlTime);
  //htmlIp
  htmlIp = document.createElement("htmlIp")
  htmlIp.style.position = 'absolute'
  htmlIp.style.top = '70px'
  htmlIp.style.textAlign = 'left'
  htmlIp.style.color = '#ffa16c'
  htmlIp.style.textShadow = '0 0 4px #000'
  document.body.appendChild(htmlIp);  
  //htmlCountry
  htmlCountry = document.createElement("htmlCountry")
  htmlCountry.style.position = 'absolute'
  htmlCountry.style.top = '50px'
  htmlCountry.style.textAlign = 'left'
  htmlCountry.style.color = '#aaaaaa'
  htmlCountry.style.textShadow = '0 0 4px #000'
  document.body.appendChild(htmlCountry);
  //screenshot
  var saveLink = document.createElement('div');
  saveLink.style.position = 'absolute';
  saveLink.style.top = '30px';
  saveLink.style.color = 'white !important';
  saveLink.style.textAlign = 'left';
  saveLink.style.textShadow = '1 1 6px #000'
  saveLink.style.backgroundColor = "red";
  saveLink.innerHTML = '<a href="#" id="saveLink">Screenshot</a>';
  document.body.appendChild(saveLink);

  $.getJSON('https://ipapi.co/json/', function(data) {
    // console.log(JSON.stringify(data, null, 2));
      // getip.innerText = "PlayerIP: "+data.ip
      playerIp = data.ip
      htmlIp.innerText = "Ip: "+playerIp

      playerCoutry = data.country_name
      htmlCountry.innerText = "Country: "+playerCoutry
      // console.log('cou:',playerCoutry);
  });
  cantRec = document.createElement("cantRec")
  cantRec.style.position = 'absolute'
  cantRec.style.bottom = '90px'
  cantRec.style.textAlign = 'left'
  cantRec.style.color = '#4ef1d3'
  cantRec.style.textShadow = '0 0 4px #000'

  // console.log('da_ti: ',firebaseDT)

  btn = document.createElement("button");
  btn.innerHTML = "Record Score";
  btn.setAttribute('title','Record & Reset a score')
  btn.setAttribute('class','button')
  btn.setAttribute('id','opener')
  //btn.disabled = true
  btn.onclick = function(){  
    // alert('Thank you for playing');
    if(gamescore <= 5){
      console.log("Your score more than 5. Please!")
      cantRec.innerHTML = 'Your score more than 5. Please!'
      setTimeout(function(){
        cantRec.innerHTML = '';
      }, 5000);
      document.body.appendChild(cantRec);
      
    }else{
      // console.log("Record score = ",gamescore)
      cantRec.innerHTML = 'Record score: '+gamescore
      setTimeout(function(){
        cantRec.innerHTML = '';
      }, 3000);
      document.body.appendChild(cantRec);
      // let currentTime=new Date()
      // console.log('JS date: ',currentTime)
      //let firebaseDT = new firebase.firestore.Timestamp.now()
      //console.log('da_ti: ',firebaseDT)
      addData(playerIp,playerCoutry,gamescore,gametime,firebaseDT)
      btn.remove();
      setTimeout(function(){
        location.reload();
      }, 3000);
    }    
     //console.log('1Sc:',gamescore,'Ti:',gametime,'Na:',playerName,'Ip:',playerIp,'Cou:',playerCoutry);
  };
  btn.onmouseover = function()  {
    this.style.backgroundColor = "blue";
  }  
  document.body.appendChild(btn);
  // console.log(btn.style)
  let linkbtn = document.createElement("a");
  linkbtn.innerHTML = "Top Charts";
  linkbtn.setAttribute('href','./indexdb.html')
  linkbtn.setAttribute('class','linkbtn')
  linkbtn.setAttribute('target','_blank')
  document.body.appendChild(linkbtn);

  console.log("-------------------------------------------------------------");
  console.log("Press Q to Display Box collide");
  console.log("-------------------------------------------------------------");
  console.log("   ----    ------      -------    -------   -------");
  console.log(" --------  ---------  ---------  --------- ---------");
  console.log("---    --- --     --- --      -  --     -- --       -- ");
  console.log("--      -- ---------  --            -----  --        --  --------");
  console.log("---------- ---------  --            -----  --        --      --");
  console.log("---------- --     --- --      -  --     -- --       --     --");
  console.log("--      -- ---------  ---------  --------- ---------     --");
  console.log("--      --  ------     -------    ------    -------    ---------");
  
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

      saveFile(imgData.replace(strMime, strDownloadMime), "TekGame.jpg");

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
    olaySound.play()
    olay.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    olayCollide.position.set(olay.position.x,olay.position.y+1,olay.position.z)
    speedPlus+=0.1
  }
  if(spengIntersects.length>0){
    spengCheck=true
    spengClick++
    spengSound.play()
    speng.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    spengCollide.position.set(speng.position.x,speng.position.y+1,speng.position.z)
    speedPlus+=0.1
  }
  if(mnoIntersects.length>0){
    mnoCheck=true
    mnoClick++
    mnoSound.play()
    mno.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    mnoCollide.position.set(mno.position.x,mno.position.y+1,mno.position.z)
    speedPlus+=0.1
  }
  if(ishuenIntersects.length>0){
    ishuenCheck=true
    ishuenClick++
    ishuenSound.play()
    ishuen.position.set(THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5),THREE.Math.randInt(-5,5))
    ishuenCollide.position.set(ishuen.position.x,ishuen.position.y+1,ishuen.position.z)
    speedPlus+=0.1
  }

}
function animate(){
    // This block runs while resources are loading.
if( RESOURCES_LOADED == false ){
  requestAnimationFrame(animate);
  // loadingScreen.box.position.x -= 0.05;
  loadingScreen.box.rotation.x -= 0.05;
  loadingScreen.box.rotation.y -= 0.05;
  loadingScreen.box.scale.x -= 0.05;
  loadingScreen.box.scale.y -= 0.05;
  loadingScreen.box.scale.z -= 0.05;
  if( loadingScreen.box.scale.x < -3 ) loadingScreen.box.scale.set(1,1,1);

  effcutout.render(loadingScreen.scene, loadingScreen.camera);

  return; // Stop the function here.
}
  requestAnimationFrame(animate)

  render()
}

function render(){
  theta += speedPlus
  var delta = clock.getDelta()
  if ( ishuenMixer !== undefined && mnoMixer !== undefined && spengMixer !== undefined && olayMixer !== undefined) {
    ishuenMixer.update(delta)
    mnoMixer.update(delta)
    spengMixer.update(delta)
    olayMixer.update(delta)
    }

  for(let i=0;i<FlamingoMixer.length;i++){
    FlamingoMixer[i].update(delta)
  }

  camera.position.x = radius*Math.sin(THREE.Math.degToRad(theta))
  // camera.position.y = radius*Math.sin(THREE.Math.degToRad(theta))
  camera.position.z = radius*Math.cos(THREE.Math.degToRad(theta))
  camera.lookAt(scene.position)

  // cloundModel.position.x +=.05
  // cloundModel.position.y = Math.sin(cloundModel.position.x)

  if(olayCheck || spengCheck || mnoCheck || ishuenCheck){
    scene.remove(totalScoreCk);
    totalScoreClick = olayClick+spengClick+mnoClick+ishuenClick
    loadertxt = new THREE.FontLoader();
    loadertxt.load('font/helvetiker_regular.typeface.json',(font) => {
    textGeo = new THREE.TextBufferGeometry( totalScoreClick,{
      font: font,
      size: .7,
      height: .1,
      curveSegments: 1,
      });
      textMaterial = new THREE.MeshPhongMaterial( { color: 0xee1111 } );
      totalScoreCk = new THREE.Mesh( textGeo, textMaterial );
      totalScoreCk.castShadow = true;
      totalScoreCk.receiveShadow = true;
      scene.add( totalScoreCk );
    });
  }
  gamescore = totalScoreClick;
  if(olayCheck){
    scene.remove(olayCk);
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
      olayCk = new THREE.Mesh( textGeo, textMaterial );
      // olayCK.position.copy(olayCollide.position);
      olayCk.position.set(olayCollide.position.x-.3, olayCollide.position.y+1, olayCollide.position.z);
      olayCk.castShadow = true;
      olayCk.receiveShadow = true;
      scene.add( olayCk );
      //console.log(loadertxt);
    });
  }
  if(spengCheck){
    scene.remove(spengCk);
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
      spengCk = new THREE.Mesh( textGeo, textMaterial );
      spengCk.position.set(spengCollide.position.x-.3, spengCollide.position.y+1, spengCollide.position.z);
      spengCk.castShadow = true;
      spengCk.receiveShadow = true;
      scene.add( spengCk );
    });
  }
  if(mnoCheck){
    scene.remove(mnoCk);
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
      mnoCk = new THREE.Mesh( textGeo, textMaterial );
      mnoCk.position.set(mnoCollide.position.x-.3, mnoCollide.position.y+1, mnoCollide.position.z);
      mnoCk.castShadow = true;
      mnoCk.receiveShadow = true;
      scene.add( mnoCk );
    });
  }
  if(ishuenCheck){
    scene.remove(ishuenCk);
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
      ishuenCk = new THREE.Mesh( textGeo, textMaterial );
      ishuenCk.position.set(ishuenCollide.position.x-.3, ishuenCollide.position.y+1, ishuenCollide.position.z);
      ishuenCk.castShadow = true;
      ishuenCk.receiveShadow = true;
      scene.add( ishuenCk );
    });
  }
  // console.log(instrumentMusicalMate);
  // for(let key in instrumentMusicalMate){
  //   instrumentMusicalMate[key].opacity = totalScoreClick/100*100
  // }  
  //innerHTML
  speedHTML.innerText = "Speed: "+speedPlus.toFixed(2)
  effcutout.render(scene, camera)
  //renderer.render(scene, camera)
  time += delta
  gametime = time.toFixed( 2 )
  htmlTime.innerHTML = "PlayTime: "+time.toFixed( 2 )
  //console.log('Sc:',gamescore,'Ti:',gametime,'Ip:',playerIp,'Cou:',playerCoutry);
}
//Database
function addData(ip,coutry,score,playtime,datetime){
  const db=firebase.firestore();
	db.collection('Users').add({
    ip: ip,
    score: score,
    country: coutry,
    time: playtime,
    dati: datetime
	});
}