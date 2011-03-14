var moxilnet_captcha_url = "http://smsinternet.movilnet.com.ve/smsinternet/Captcha.jpg";
var moxilnet_post_url = "http://smsinternet.movilnet.com.ve/smsinternet/telefono.do";
var moxilnet_prefijo = '';
var moxilnet_telefono = '';
var moxilnet_mensaje = '';
var moxilnet_captcha = '';
function cargar_captcha() {
  $(this).show();
  $('#espera').hide();
}
function reset() {
  $('#telefono').val('');
  $('#mensaje').val('');
}
function truncar() {
  texto_mensaje = $('#mensaje').val();
  texto_truncado = texto_mensaje.substr(0,120);
  $('#mensaje').val(texto_truncado);
}
function contar() {
  nro_caracteres = $(this).val().length;
  caracteres_restantes = 120 - nro_caracteres;
  if (caracteres_restantes < 0) {
    truncar();
    caracteres_restantes = 0;
  }
  $('.cuenta').text(caracteres_restantes);
}
function enviar_formulario_mensaje(evento) {
  evento.preventDefault();
  if (validar_formulario()) {
    prefijo = $('input[name=prefijo]').val();
    moxilnet_prefijo = (prefijo == '416')? '158': '199';
    moxilnet_telefono = $('#telefono').val();
    moxilnet_mensaje = $('#mensaje').val();
    $('#captcha').attr('src',moxilnet_captcha_url+"?rand="+String((new Date()).getTime()).replace(/\D/gi,''));
    $(this).hide();
    $('#formulario_captcha').show();
  }
}
function validar_formulario() {
  expresion = /^\d{7}$/;
  telefono = $('#telefono').val();
  if (expresion.test(telefono)) {
    $('.error').hide();
    return true;
  } else {
    $('.error').show();
    return false;
  }
}
function enviar_formulario_captcha(evento) {
  evento.preventDefault();
  moxilnet_captcha = $('#captcha-respuesta').val();
  console.log(moxilnet_captcha);
  $('#captcha-respuesta').val('');
  $(this).hide();
  $('#formulario_mensaje').show();
  $('#captcha').hide();
  $('#espera').show();
  $.post(moxilnet_post_url,{'codigo':moxilnet_prefijo,'numero':moxilnet_telefono,
    'mensaje':moxilnet_mensaje,'servicio':'movilnet','tipomensaje':'SMS','captcha':moxilnet_captcha},function(data,textStatus){
      $('.exito').html(data);
      $('.exito').show();
      $('#fomulario_captcha').hide();
    });
}
$('#tipo_mensaje').selectoul();
$('#telefono').focus();
$('#mensaje').keyup(contar);
$('#captcha').load(cargar_captcha);
$('#formulario_mensaje').submit(enviar_formulario_mensaje);
$('#formulario_captcha').submit(enviar_formulario_captcha);