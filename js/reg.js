$(document).ready(function() {
	$('#formPhoneNumber').mask("+375 (AB) 000-00-00", {translation: {'A': {pattern: /2|3|4/}, 'B': {pattern: /3|4|5|9/}}, placeholder: "+375 (XX) XXX-XXX-XX"});
	$('#formPhoneNumber').on("change", function() {
		$('#reg-button-get-code').removeAttr("disabled");
	});
	$('#formEmail').mask("A", {
		translation: {
			"A": { pattern: /[\w@\-.+]/, recursive: true }
		}
	});
	$('#formPassportNumber').mask("0000000A000AA0", {
		translation: {'A': {pattern: /[A-Z]/}}, 
		placeholder: "1234567D123FG4"
	});
	$('#reg-button-get-code').on("click", function() {
		var phone_number = $('#formPhoneNumber').val();
		$.ajax({
			type: "POST",
			url: "reg.php?action=get_code",
			data: {"phone_number" : phone_number},
			dataType: "json",
		}).done(function(data) {
			if(data.result == "success") {
				$('#sendMsg').removeClass("feedback-form__msg--error");
				$('#sendMsg').addClass("feedback-form__msg--ok");
				$('#reg-button-get-code').attr("disabled", "disabled");
			}
			else {
				$('#sendMsg').removeClass("feedback-form__msg--ok");
				$('#sendMsg').addClass("feedback-form__msg--error");
			}
			$('#sendMsg').html(data.message);			
			$('#sendMsg').fadeIn('slow');
		});
	});
	$('#registration-form').on("submit", function() {
		$('.submit-btn').attr("disabled", "disabled");
		$('#formToken').val('');
		var m_data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "reg.php?action=registration",
			data: m_data,
			dataType: "json",
		}).done(function(data) {
			if(data.result == "success") {
				$('#regMsg').removeClass("feedback-form__msg--error");
				$('#regMsg').addClass("feedback-form__msg--ok");
			}
			else {
				$('#regMsg').removeClass("feedback-form__msg--ok");
				$('#regMsg').addClass("feedback-form__msg--error");
				$('.submit-btn').removeAttr("disabled");
			}
			$('#regMsg').html(data.message);			
			$('#regMsg').fadeIn('slow');
		});
		
		return false;
	});
	$('.feedback-form__msg').on("click",function(e){$(this).fadeOut()});
});