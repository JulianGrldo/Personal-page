/*
	Read Only by HTML5 UP - VERSIÓN FINAL CON CORRECCIÓN PARA MÓVIL
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav');

	// Breakpoints
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['1025px', '1280px'],
		medium: ['737px', '1024px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Page Load
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Panel (Menú lateral en móvil)
	$header.panel({
		delay: 500,
		hideOnClick: true,
		hideOnSwipe: true,
		resetScroll: true,
		resetForms: true,
		side: 'right',
		target: $body,
		visibleClass: 'header-visible'
	});

	// Title Bar (Barra superior en móvil)
	$titleBar = $('<div id="titleBar"><a href="#header" class="toggle"></a><span class="title">' + $('#logo').html() + '</span></div>').appendTo($body);

	// Scrolly (Desplazamiento suave al hacer clic en el menú)
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function() {
			if (breakpoints.active('<=medium')) {
				return $titleBar.height();
			}
			return 0;
		}
	});

	// --- LÓGICA UNIFICADA DE SCROLLEX ---

	var $nav_a = $nav.find('a');

	$nav_a.scrolly({
		speed: 1000,
		offset: function() {
			return $titleBar.height();
		}
	});


	// Bucle principal que maneja todas las secciones
	$('#main > section').each(function() {
		var $this = $(this),
			id = $this.attr('id'),
			$section_a = $nav_a.filter('[href="#' + id + '"]'); // El link del menú correspondiente

		// Por defecto, el offset es -150 para todas las secciones.
		var scrollexOffset = -150;

		// Si la sección actual es la de "Contacto", cambiamos el offset para que sea más sensible
		// y se active aunque se llegue al final de la página en móvil.
		if (id === 'Contacto') {
			scrollexOffset = -50;
		}


		$this.scrollex({
			mode: 'middle',
			offset: scrollexOffset, // Usamos la variable que contiene el offset correcto

			// Al entrar la sección en la pantalla
			enter: function() {

				// ACCIÓN 1: Activa la animación del contenido de la sección
				$this.addClass('is-visible');

				// ACCIÓN 2: Pinta de azul el link del menú correspondiente
				if ($section_a.length > 0) {
					if ($nav_a.filter('.active-locked').length === 0) {
						$nav_a.removeClass('active');
						$section_a.addClass('active');
					}
				}
			},

			// Al salir la sección de la pantalla
			leave: function() {

				// ACCIÓN 1: Resetea la animación para que pueda volver a ocurrir si el usuario sube
				$this.removeClass('is-visible');

				// ACCIÓN 2: Quita el color azul del link del menú
				if ($section_a.length > 0) {
					$section_a.removeClass('active');
				}
			}
		});
	});

	// Lógica para que el link del menú se quede "bloqueado" al hacer clic
	$nav_a.on('click', function() {
		var $this = $(this);
		if ($this.attr('href').charAt(0) !== '#') {
			return;
		}
		$nav_a.removeClass('active').removeClass('active-locked');
		$this.addClass('active').addClass('active-locked');
	}).on('blur', function() {
		// Desbloquea cuando el link pierde el foco
		$(this).removeClass('active-locked');
	});

})(jQuery);