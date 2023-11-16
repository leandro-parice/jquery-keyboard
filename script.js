let focusInput = null;
let tabIndex = 0;
let selectedAccent = null;

$(document).ready(function () {
  $('#name').on('focus', function(){
    focusInput = 'name';
    tabIndex = 1;
    showKeyboard('keyboard-name');
  });

  $('#email').on('focus', function(){
    focusInput = 'email';
    tabIndex = 2;
    showKeyboard('keyboard-email');
  });

  $('#phone').on('focus', function(){
    focusInput = 'phone';
    tabIndex = 3;
    showKeyboard('keyboard-number');
  });

  $('#cpf').on('focus', function(){
    focusInput = 'cpf';
    tabIndex = 4;
    showKeyboard('keyboard-number');
  });

  $('#birthday').on('focus', function(){
    focusInput = 'birthday';
    tabIndex = 5;
    showKeyboard('keyboard-number');
  });

  $('#address').on('focus', function(){
    focusInput = 'address';
    tabIndex = 6;
    showKeyboard('keyboard-address');
  });

  $('#name').focus();
});

function showKeyboard(keyboardName){
  $('.keyboard .template').removeClass('active');
  $('.keyboard #'+keyboardName).addClass('active');
}

function handleKey(key) {
  const elementInput = $('#'+focusInput);

  if (key === 'backspace') {
    const currentValue = elementInput.val();
    elementInput.val(currentValue.slice(0, -1));
  } else if (key === 'del') {
    elementInput.val('');
  } else if (key === 'ok') {
    tabIndex += 1;
    $('[tabindex="'+tabIndex+'"]').focus();
  } else {
    const currentValue = elementInput.val();
    if(selectedAccent){
      const accentedLetter = applyAccent(key.toLowerCase());
      elementInput.val(currentValue + accentedLetter);
      selectedAccent = null;
      $('.btn-accent').removeClass('active');
    }else{
      elementInput.val(currentValue + key.toLowerCase() );
    }
  }
}

function handleAccent(accent) {
  $('.btn-accent').removeClass('active');
  $('#btn-accent-'+accent).addClass('active');
  selectedAccent = accent;
}

function applyAccent(letter) {
  const letterAccents = {
    'acute': { 'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú' },
    'grave': { 'a': 'à', 'e': 'è', 'i': 'ì', 'o': 'ò', 'u': 'ù' },
    'tilde': { 'a': 'ã', 'o': 'õ', 'n': 'ñ' },
    'circumflex': { 'a': 'â', 'e': 'ê', 'i': 'î', 'o': 'ô', 'u': 'û' },
  };

  const accents = {
    'acute': '´',
    'grave': '`',
    'tilde': '˜',
    'circumflex': '^',
  }

  const accentMap = letterAccents[selectedAccent];
  return accentMap && accentMap[letter] !== undefined ? accentMap[letter] : accents[selectedAccent]+letter;
}
