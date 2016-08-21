# Nobilis Radio Buttons (NoRB) JS Plugin

Hey and thanks for checking out our plugin!

The NoRB is a Javascript plugin aimed at improving the appearance of radio buttons in forms. It does so by allowing developers attach different styling to the elements while maintaining the radio-button-like functionality.

## Setup

1) Include the plugin file at the end of the HTML document together with jquery. 

    ```html
    <script src="src/jquery-3.1.0.min.js"></script>
    <script src="src/nobilis-radio-buttons.js"></script>
    ```

    Ensure the source matches the directory where you've saved the plugin file. Also jQuery can be included from the web by setting the source to the latest release at http://jquery.com/.

2) Setup the button group in the HTML document as follows

    ````html
    <div class="norb">
    ...
    <input type="hidden" disabled>
    ...
    <button data-value="option 1">option 1 label</button>
    <button data-value="option 2">option 2 label</button>
    <button data-value="option 3">option 3 label</button>
    <button data-value="option 4">option 4 label</button>
    ...
    </div>
    ````

    The above template is the bare minimum structure needed for the buttons to work. The buttons can be nested and also have other elements between them. Thus within `div.norb`, there should be an `<input>` tag (preferably hidden) and at least one `<button data-value=""></button>` tag.

3) Add the following lines to the end of the HTML document, right after where you've included the plugin. This initializes the plugin.

    ```html
    <script type="text/javascript">
    	// Initialize the plugin at the end of the file
    	NoRB.init();
    </script>
    ```

Congratulations!
You've successfully included the NoRB in your HTML document. 

## Dependency

This feature enables interaction between different button groups ie one `master` group can control the operation of other `slave` groups by enabling or disabling their buttons.

To implement this feature in your button groups, you'll need to setup the `master` and `slave` groups.

1) **master button group** 

    ```html
    <div class="norb dependent master" data-dependency-group="group1">
    ...
    <input type="hidden" disabled>
    ...
    <button data-value="option1_master">option1</button>
    <button data-value="option2_master">option2</button>
    <button data-value="option3_master">option3</button>
    <button data-value="option4_master">option4</button>
    ...
    </div>
    ````

    1. add the `dependent` and `master` classes to the main container div.
    2. add a `data-dependency-group="your_group_name"` tag to the main container div. This links the `master` button group to its `slave` groups hence the group name, `your_group_name`, should be the same accross the related groups.

2) **slave button group(s)** - *you can have multiple slave groups but implementation is the same in all of them*

    ```html
    <div class="norb dependent slave" data-dependency-group="group1">
    ...
    <input type="hidden" disabled>
    ...
    <button data-value="option1" data-dependent-on="option1_master">option1</button>
    <button data-value="option2" data-dependent-on="option1_master">option2</button>
    <button data-value="option3" data-dependent-on="option2_master">option3</button>
    <button data-value="option4" data-dependent-on="option2_master" data-dependency="default">option4</button>
    ...
    </div>
    ````

    1. add the `dependent` and `slave` classes to the main container div.
    2. add a `data-dependency-group="your_group_name"` tag to the main container div. This links the `master` button group to its `slave` groups hence the group name, `your_group_name`, should be the same accross the related groups.
    3. for each button, add a `data-dependent-on="master_value"` where `master_value` is the `data-value` attribute of a button in master. This sets the master button that a particular slave button depends on. **Eg** in the samples above, when button "option2" in master is selected, buttons "option3" and "option4" in slave are enabled while all others are disabled.
    4. *(Optional)* If you wish to have a default value set when non-dependent slave buttons are disabled, add `data-dependency="default"` to the slave button you wish to be selected. **Eg** in the samples above, when button "option3" in master is selected, all slave buttons are disabled since none depend on button "option3" in master. Also, button "option4" in slave will be selected.

## Styling

This plugin has a couple of preset classes that enable the user style the buttons to match the rest of the web page. They are as follows:

	norb - main container for the input and buttons
	.selected - for the selected button. only one button in the main container can have this class at a time
	.dependent - added to the main container of button groups with dependency
	.master - added to the main container of a button group that will act as the control for other button groups in the same dependency-group
	.slave - added to the main container of button groups that depend on another button group in the same dependency-group
	.disabled - added to buttons in slave groups that do not depend on the currently selected option in the master group. These buttons are disabled and inoperable


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nobilis-ltd/nobilis-radio-buttons. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

This plugin is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).