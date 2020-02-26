let NoRB = (function() {
	// VARIABLES
	var $doc, $btn_groups, $dependent_groups,
		$dependent_masters, $dependent_slaves;

	// CACHE DOM
	function cacheDOM() {
		$doc = $(document);
		$btn_groups = $doc.find('.norb');

		// Caching dependent button groups
		$dependent_groups = $doc.find('.norb.dependent');
		$dependent_masters =
			$($.grep($dependent_groups, function(e) {return e.className.indexOf("master") > -1 }))
		$dependent_slaves =
			$($.grep($dependent_groups, function(e) {return e.className.indexOf("slave") > -1 }))
	}

	// Event binding
	function bindEvents() {
		$btn_groups.on('click', 'button', setValue);
		$btn_groups.on('change', 'input', matchBtns);

		$dependent_masters.on('click', 'button', checkDependency);
	}

	// INIT
	function init() {
		cacheDOM();
		bindEvents();

		// Method to run on initiate
		startUp();
	}

	// METHODS

	// Normal Check: The hidden inputs are checked when the page loads.
	// If they have a value, the appropriate button is set to '.selected'.
	// Dependency check: For dependent groups, the slave buttons are
	// disabled or enabled depending on the preloaded value, if any.
	// The default value in each slave group, if specified, is also set
	function startUp() {

		// normal check. Loop through all groups in $btn_groups
		for(var i = 0; i < $btn_groups.length; i++) {
			var $input_value;
			var $btn;
			$input_value = $($btn_groups[i]).find('input').val();

			if ($input_value != "") {
				$btn = $($btn_groups[i]).find('button[data-value="' + $input_value + '"]')
				setBtns($btn);
			}
		}

		// dependency check. Loop through all groups in $dependent_masters
		for (var i = 0; i < $dependent_masters.length; i++) {
			var $master = $($dependent_masters[i]);
			var value = $master.find('input').val();

			// exit loop if there is no preloaded value in current master
			if (value == "") {
				continue;
			}

			enforceDependency($master, value)
		}
	}

	// Action begins here. The hidden input per group is set according to
	// the button clicked. The button display is then set ie '.selected'
	// is added/removed appropriately in the respective buttons
	function setValue(event) {
		var $btn = $(event.target).closest('button[data-value]');
		var $input_field = $btn.closest('div.norb').find('input');

		$input_field.val($btn.data('value'));
		$input_field.trigger('change');
	}

	// Remove '.selected' from all buttons in the group and added to the
	// clicked button
	function setBtns($btn) {
		var $other_btns = $btn.closest('div.norb').find('button');

		for(var i=0; i < $other_btns.length; i++) {
			$($other_btns[i]).removeClass('selected');
		}
		$btn.addClass('selected');
	}

	// Add '.selected' to correct btn when value of hidden input changes
	function matchBtns(event) {
		var value = $(event.target).val();
		var $btn = $(event.target).closest('div.norb').find('button[data-value="' + value + '"]');

		setBtns($btn);
	}

	// Retrieves master button group from clicked button plus value
	// selected then hands over to enforcement method
	function checkDependency(event) {
		var $btn = $(event.target);
		var $master = $($btn.closest('div.norb')[0]);
		var value = $btn.data('value');

		enforceDependency($master, value);
	}

	// Using master div and value provided, this method carries out
	// the appropriate disabling of buttons in slave button group
	function enforceDependency($master, value) {
		var dependency_group = $master.data('dependency-group');
		var $slaves = $(
			$.grep(
				$dependent_slaves,
				function(e) {
					return $(e).data('dependency-group') == dependency_group
				}
			)
		);

		// loop through all slaves of current master
		for (var i = 0; i < $slaves.length; i++) {
			var $slave = $($slaves[i]);
			var $slave_btns = $slave.find('button');

			// check if slave has default else clear value
			// default will be set during button loop below
			if ($slave.find('button[data-dependency="default"]').length == 0) {
				$slave.find('input').val("");
			}

			// loop through all buttons in current slave
			for (var j = 0; j < $slave_btns.length; j++) {
				var $btn = $($slave_btns[j]);
				var dependency = $btn.data('dependent-on');

				// convert values to strings for comparison
				value = boolToString(value);
				dependency = boolToString(dependency);

				// check if button is dependent and disable as appropriate
				if (dependency == value) {
					$btn.removeClass('disabled');
					$btn.removeAttr('disabled');
				}
				else {
					if ($btn.data('dependency') == "default") {
						$btn.click();
					}
					else {
						// remove in case button group has no default
						$btn.removeClass('selected');
					}

					$btn.addClass('disabled');
					$btn.attr('disabled', true);
				}
			}
		}
	}

	// Short method to convert boolean to string
	function boolToString(value) {
		if (value == true) return 'true'
		else if (value == false) return 'false'
		else return value
	}

	// API
	return {
		init: init
	}
}) ();
