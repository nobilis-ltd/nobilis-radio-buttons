# Nobilis Radio Buttons (NoRB) JS Plugin

Hey and thanks for checking out our plugin!

The NoRB is a Javascript plugin aimed at improving the appearance of radio buttons in forms. It does so by allowing developers attach different styling to the elements while maintaining the radio-button-like functionality.

## Setup

1) Include the plugin file at the end of the HTML document together with jquery. 

```html
<script src="src/jquery-3.1.0.min.js"></script>
<script src="src/nobilis-radio-buttons.js"></script>
```

Ensure the source matches the directory where you've saved the plugin file. Also jQuery can be included from the web by setting the source to the latest release at 'http://jquery.com/'.

2) Setup the input group in the HTML document as follows

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

The above template is the bare minimum structure needed for the buttons to work. The buttons can be nested and also have other elements between them. Thus within `div.norb`, there should be a `<input>` field (preferably hidden) and at least one `<button data-value=""></button>`.

3) Add the following line to the end of the HTML document, right after where you've included the plugin. This initializes the plugin.

```html
<script type="text/javascript">
// Initialize the plugin at the end of the file
NoRB.init();
</script>
```

Congratulations!
You've successfully included the NoRB in your HTML document. Style the 

## Styling

This plugin has a couple of preset classes that enable the user style the buttons to match the rest of the web page. They are as follows:

	norb - main container for the input and buttons
	selected - for the selected button. only one button in the main container can have this class at a time

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nobilis-ltd/nobilis-radio-buttons. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

This plugin is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).