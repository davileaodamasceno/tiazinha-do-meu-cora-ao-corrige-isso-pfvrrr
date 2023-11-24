// Inicialização de variáveis de previsão
prediction_1 = ""
prediction_2 = ""

// Faça as Configurações da webcam
Webcam.set({
  Width:201,
  image_format:"jpeg",
  jpeg_quality:20000
});

// pegar o elemento da câmera pelo ID

camera = getElementById=("camera");
// Anexa a webcam ao elemento da câmera
Webcam.attach('#camera');

// Função para tirar uma foto e exibi-la no elemento com o ID "result"
function take_snapshot() {
  Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
  });
}

// Log da versão da biblioteca ml5
console.log('ml5 version:', ml5.version);

// Carrega o classificador de imagem com o modelo treinado
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json', modelLoaded);

// Função chamada quando o modelo é carregado
function modelLoaded() {
  console.log('Model Loaded!');
}

// Função para falar as previsões
function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "A primeira previsão é " + prediction_1;
  speak_data_2 = "E a segunda previsão é " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}



// Função para verificar a imagem capturada usando o classificador
function check() {
   img = document.getElementById('captured_image');
      classifier.classify(img, gotResult);
}



// Função chamada quando o resultado do classificador é obtido
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    // Atualiza os elementos HTML com os resultados das previsões
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    
    // Chama a função para falar as previsões
    speak();

    // (emojis são baseados nas previsões de emoções "feliz", "triste" e "irritado")
    if (results[0].label == "feliz") {
       document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if (results[0].label == "triste") {
       document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if (results[0].label == "irritado") {
       document.getElementById("update_emoji").innerHTML = "&#128548;";
    }

    if (results[1].label == "feliz") {
      document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if (results[1].label == "triste") {
      document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if (results[1].label == "irritado") {
      document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
  }
}
