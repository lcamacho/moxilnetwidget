(function($){
	$.fn.selectoul = function(options) {
		var options = $.extend({},$.fn.selectoul.defaults, options);
		 
			function convertSelectToUl(theSelectID){
				$('#' + theSelectID + ' option').each(function(index) {
					var  lista = '<li>' + $(this).text() + "</li>";
					$("."+ theSelectID +"").append(lista);
				});
				$('#' + theSelectID).remove();
				
			}
			
			function findTheSelect () {
				 $("select."+options.selectClass).each(function(){
					
					var theSelectID = $("." + options.selectClass).attr("id");
					var theSelectName = $("." + options.selectClass).attr("name");
					var selectedItem = $('#' + theSelectID + ' :selected').text();
					
					$(this).after("<div class='"+options.ulWrapClass+"'><input class='hidval' name='"+theSelectName+"' type='hidden' value='"+selectedItem+"'><span class='"+options.selectedItemClass+"'><b>" + selectedItem + "</b></span><ul class='"+ options.ulClass +" "+ theSelectID + "'></ul></div>");
					
					convertSelectToUl(theSelectID)
					
				});	
			}
			findTheSelect()
			
			/* the dropdown effect */
			$('.'+ options.ulClass).hide(); //hiding the already converded dropdowns
			$('.'+ options.selectedItemClass).click(function(){
					$(this).parent().find("ul").show();
					$('.'+ options.selectedItemClass).mouseout(function(){
						$(this).parent().find("ul").hide();
						
					})
					$(this).parent().find("ul").mouseover(function(){
						$(this).parent().find("ul").show();
					}).mouseout(function(){
						$(this).parent().find("ul").hide();
					});
				});


			//clicking on the dropdown's elements
			$('.'+ options.ulClass +' li').click(function(){
				$(this).parent().hide();
				clickedItem = $(this).text();
				$(this).parent().parent().find(".hidval").val(clickedItem);
				$(this).parent().parent().find("." + options.selectedItemClass + " b").html(clickedItem);
			})
	
		
	};
	
	/* setting up the default values */
	$.fn.selectoul.defaults = {
		selectClass: "convertToUl", //the class of SELECT element to be converted [select]
		ulWrapClass: "fancyDrpDwn", //choose a class for the genereated's list wrapper [div]
		ulClass: "exSelect", //choose a class for the genereated's list [ul]
		selectedItemClass: "selectedFromList" //choose a class for the selected item box [span]
	};
})(jQuery);