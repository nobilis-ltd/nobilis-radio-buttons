/* Brian Bosire, Nobilis Ltd. Kenya
 * 
 * Small library to enable aesthetically pleasing display for grouped buttons
 * that act as radio buttons
 */

if (typeof jQuery === 'undefined') {
  throw new Error('\'Nobilis Radio Buttons\' requires jQuery')
}

var NoRB = (function() {
	// CACHE DOM
	var $doc = $(document);
	var $btn_groups = $doc.find('.norb');

	// INIT
	function init() {
		// Event binding
		$btn_groups.on('click', 'button', setValue);

		// Method to run on innitiate
		startUp();
		checkSelection();
	}

	// METHODS

	// The hidden inputs are checked when the page loads. If they have a
	// value, the appropriate button is set to '.selected'
	function startUp() {
		var $input;
		var $btn;
		for(var i=0; i<$btn_groups.length; i++) {
			$input_value = $($btn_groups[i]).find('input').val();
			if ($input_value != "") {
				$btn = $($btn_groups[i]).find('button[data-value="' + $input_value + '"]')
				setBtns($btn);
			}
		}
	}

	// Action begins here. The hidden input per group is set according to
	// the button clicked. The button display is then set ie '.selected' 
	// is added/removed appropriately in the respective buttons
	function setValue(event) {
		var $btn = $(event.target);
		var $input_field = $btn.closest('div.norb').find('input');

		$input_field.val($btn.data('value'));

		setBtns($btn);
	}

	// Remove '.selected' from all buttons in the group and added to the
	// clicked button 
	function setBtns(btn) {
		var $btn = btn;
		var $other_btns = $btn.closest('div.norb').find('button');
		
		for(var i=0; i<$other_btns.length; i++) {
			$($other_btns[i]).removeClass('selected');
		}
		$btn.addClass('selected');
	}

	// API
	return {
		init: init
	}
}) ();