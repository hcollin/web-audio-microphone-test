(function() {


  var effectStack = [];

  function addToStack(name) {
    effectStack.push(name);
    console.log("EffectStack:", effectStack);
    renderStack();
  }


  function removeFromStack(name) {
    var newArr = [], max = effectStack.length;

    for(var i = 0; i<max; i++) {
      var val = effectStack[i];
      if(val != name)
        newArr.push(effectStack[i]);
    }
    effectStack = newArr;
    console.log("EffectStack:", effectStack);
    renderStack();
  }

  function renderStack() {
    var el = document.getElementById("stackView");
    var max = effectStack.length;
    if(max == 0) {
        el.innerHTML = "No Effects";
        return;
    }

    el.innerHTML = "";
    var input = document.createElement("div");
    var output = document.createElement("div");
    input.classList.add("input");
    output.classList.add("output");
    el.append(input);
    for(var i = 0; i<max; i++) {
      var d = document.createElement("div");
      d.innerHTML = effectStack[i];
      el.append(d);
    }
    el.append(output);
  }

  function handleButtonById(id, cb) {
    document.getElementById(id).addEventListener("click", cb);
  }

  function toggleButton(id) {
    elem = document.getElementById(id);
    return elem.classList.toggle("active");
  }

  // Setup input
  var microphone = new Pizzicato.Sound(
    {source: 'input'},
    function(error) {
      if (!error) return;
      console.log("ERROR IN MIC!");
  });

  // Setup Reverb Effect
  var reverb = new Pizzicato.Effects.Reverb({
    time: 0.5,
    decay: 0.5,
    reverse: false,
    mix: 0.5
  });

  var delay = new Pizzicato.Effects.Reverb({
    feedback: 0.7,
    time: 2,
    mix: 0.5
  });

  var dist = new Pizzicato.Effects.Distortion({
    gain: 0.7
  });

  var flanger = new Pizzicato.Effects.Flanger({
    time: 0.75,
    speed: 0.3,
    depth: 0.3,
    feedback: 0.2,
    mix: 0.3
});

  handleButtonById("play", function(e) {
    if(toggleButton("play")) {
      microphone.play();
    } else {
      microphone.stop();
    }

  });

  handleButtonById("reverb", function(e) {
    if(toggleButton("reverb")) {
      microphone.addEffect(reverb);
      addToStack("Reverb");
    } else {
      microphone.removeEffect(reverb);
      removeFromStack("Reverb");
    }
  });

  handleButtonById("dist", function(e) {
    if(toggleButton("dist")) {
      microphone.addEffect(dist);
      addToStack("Distortion");
    } else {
      microphone.removeEffect(dist);
      removeFromStack("Distortion");
    }
  });

  handleButtonById("delay", function(e) {
    if(toggleButton("delay")) {
      microphone.addEffect(delay);
      addToStack("Delay");
    } else {
      microphone.removeEffect(delay);
      removeFromStack("Delay");
    }
  });

  handleButtonById("flanger", function(e) {
    if(toggleButton("flanger")) {
      microphone.addEffect(flanger);
      addToStack("Flanger");
    } else {
      microphone.removeEffect(flanger);
      removeFromStack("Flanger");
    }
  });

})();
