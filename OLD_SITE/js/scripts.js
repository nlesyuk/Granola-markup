// -------- popup ------------
$(".green_button").click(function() {
  $(".reg").show();
  $("body").css('overflow-y', 'hidden');
});  
$(".sign_close").click(function() {
  $(".reg").hide();
  $(".confirm_box").hide();
  $(".reg_popup").show();
  $("body").css('overflow', 'auto');
});

$('.try_form').validate();

$(".try_form").submit(function(e) {
	e.preventDefault();
	var name = $("input[name='name']").val();
	var phone = $("input[name='phone']").val();
	var email = $("input[name='email']").val();
	var comment = $("textarea[name='comment']").val();
	// console.log(comment);
	if ($(".try_form").valid() ) {
		$.ajax({
			type: "POST",
			url: "/mailer.php",
			// dataType: "json",	// Тип данных, в которых сервер должен прислать ответ
			data: "action=send&name="+name+"&phone="+phone+"&email="+email+"&comment="+comment,	// Строка POST-запроса
			error: function () {
				alert('При выполнении запроса произошла ошибка');
			},
			success: function ( data ) {
				console.log(data);
				if (data != 'error') {
					$('.try_form').trigger('reset');
					$(".reg_popup").hide();
					$(".confirm_box").show();
					if(typeof fbq != 'undefined') fbq('track', 'Lead');
				} else {
					alert('При выполнении запроса на сервере произошла ошибка');
				}
			}
		});
	}
});
// ----------- popup end -----------

