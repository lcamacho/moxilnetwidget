/*
 * Autor: Leonard Camacho
 * Licencia: GPL 3.0
 *
 */
var moxilnet_captcha_url = "http://smsinternet.movilnet.com.ve/smsinternet/Captcha.jpg";
var moxilnet_post_url = "http://smsinternet.movilnet.com.ve/smsinternet/telefono.do";
var moxilnet_prefijo = '';
var moxilnet_telefono = '';
var moxilnet_mensaje = '';
var moxilnet_captcha = '';

function cargar_captcha() {
  $('#formulario_captcha').show();
  $('.en_espera').hide();
  $('#captcha_respuesta').focus();
}
function resetear() {
  $('#telefono').val('');
  $('#mensaje').val('');
  $('#captcha_respuesta').val('');
  $('#formulario_mensaje').show();
  $('#formulario_captcha').hide();
  $('.resultado').hide();
  $('.error_telefono').hide();
  $('.error_mensaje').hide();
  $('.error_captcha').hide();
  $('input[name=prefijo]').val('416');
  $('.selectedFromList b').text('416');
  $('#telefono').focus();
  $('.cuenta').text('120');
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
    $(this).hide();
    $('.en_espera').show();
    prefijo = $('input[name=prefijo]').val();
    moxilnet_prefijo = (prefijo == '416')? '158': '199';
    console.log('prefijo '+prefijo);
    moxilnet_telefono = $('#telefono').val();
    moxilnet_mensaje = $('#mensaje').val();
    $('#captcha').attr('src',moxilnet_captcha_url+"?rand="+(new Date().getTime()));
  }
}
function validar_formulario() {
  expresion = /^\d{7}$/;
  telefono = $('#telefono').val();
  mensaje = $('#mensaje').val();
  valido = true;
  if (expresion.test(telefono)) {
    $('.error_telefono').hide();
  } else {
    $('.error_telefono').show();
    valido = false;
  }
  if (mensaje.length != 0) {
    $('.error_mensaje').hide();
  } else {
    $('.error_mensaje').show();
    valido = false;
  }
  return valido;
}
function enviar_formulario_captcha(evento) {
  evento.preventDefault();
  moxilnet_captcha = $('#captcha_respuesta').val();
  if (moxilnet_captcha.length != 0) {
    $('.en_espera').show();
    $(this).hide();
    $.post(moxilnet_post_url,{'codigo':moxilnet_prefijo,'numero':moxilnet_telefono,
      'mensaje':moxilnet_mensaje,'servicio':'movilnet','tipomensaje':'SMS','captcha':moxilnet_captcha},
      function(data,textStatus){
        if (data.lastIndexOf('Tu mensaje fue enviado con &eacute;xito') != -1) {
          respuesta = 'Tu mensaje fue enviado con éxito.';
        } else {
          respuesta = 'Tu mensaje no fue enviado.';
        }
        $('.respuesta').html(respuesta);
        $('.resultado').show();
        $('.en_espera').hide();
        $('#fomulario_captcha').hide();
      }
    );
  } else {
    $('.error_captcha').show();
    $('#captcha_respuesta').focus();
  }
}
function abrir_link(evento) {
  evento.preventDefault();
  direccion = $(this).attr('href');
  postMessage(direccion);
}

$('#tipo_mensaje').selectoul();
$('#mensaje').keyup(contar);
$('#captcha').load(cargar_captcha);
$('#formulario_mensaje').submit(enviar_formulario_mensaje);
$('#formulario_captcha').submit(enviar_formulario_captcha);
$('a').click(abrir_link);
$('.resetear').click(resetear);