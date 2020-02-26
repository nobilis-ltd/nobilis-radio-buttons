/* Brian Bosire, Nobilis Ltd. Kenya
 * 
 * Small library to enable aesthetically pleasing display for grouped buttons
 * that act as radio buttons
 */

if (typeof jQuery === 'undefined') {
  throw new Error('\'Nobilis Radio Buttons\' requires jQuery')
}

// VARIABLES
let $doc,
    $btn_groups,
    $dependent_groups,
    $dependent_masters,
    $dependent_slaves

// INIT
function init() {
  cacheDOM()
  bindEvents()

  // Method to run on initiate
  startUp()
}

// CACHE DOM
function cacheDOM() {
  $doc = $(document)
  $btn_groups = $doc.find('.norb')

  // Caching dependent button groups
  $dependent_groups = $doc.find('.norb.dependent')
  $dependent_masters = 
    $(
      $.grep(
        $dependent_groups,
        el => el.className.indexOf("master") > -1 
      )
    )
  $dependent_slaves = 
    $(
      $.grep(
        $dependent_groups,
        e => e.className.indexOf("slave") > -1 
      )
    )
}

// Event binding
function bindEvents() {
  $btn_groups.on('click', 'button', setValue)	
  $dependent_masters.on('click', 'button', checkDependency)
}

// Normal Check: The hidden inputs are checked when the page loads. 
// If they have a value, the appropriate button is set to '.selected'.
// Dependency check: For dependent groups, the slave buttons are
// disabled or enabled depending on the preloaded value, if any.
// The default value in each slave group, if specified, is also set
function startUp() {
  // normal check. Loop through all groups in $btn_groups
  for(let i = 0; i < $btn_groups.length; i++) {
    let $input_value
    let $btn

    $input_value = $($btn_groups[i]).find('input').val()
    if ($input_value == "") continue
    
    $btn = $($btn_groups[i]).find(`button[data-value="${$input_value}"]`)
    setBtns($btn)
  }

  // dependency check. Loop through all groups in $dependent_masters
  for (let i = 0; i < $dependent_masters.length; i++) {
    let $master = $($dependent_masters[i])
    let value = $master.find('input').val()

    // exit loop if there is no preloaded value in current master
    if (value == "") continue

    enforceDependency($master, value)
  }
}
// Action begins here. The hidden input per group is set according to
// the button clicked. The button display is then set ie '.selected' 
// is added/removed appropriately in the respective buttons
function setValue(event) {
  let $btn = $(event.target)
  let $input_field = $btn.closest('div.norb').find('input')

  $input_field.val($btn.data('value'))
  $input_field.trigger('change')

  setBtns($btn)
}
// Remove '.selected' from all buttons in the group and added to the
// clicked button 
function setBtns($btn) {
  let $other_btns = $btn.closest('div.norb').find('button')
  
  for (let i=0; i<$other_btns.length; i++) {
    $($other_btns[i]).removeClass('selected')
  }
  $btn.addClass('selected')
}
// Retrieves master button group from clicked button plus value
// selected then hands over to enforcement method
function checkDependency(event) {
  let $btn = $(event.target)
  let $master = $($btn.closest('div.norb')[0])
  let value = $btn.data('value')

  enforceDependency($master, value)
}
// Using master div and value provided, this method carries out
// the appropriate disabling of buttons in slave button group
function enforceDependency($master, value) {
  let dependency_group = $master.data('dependency-group')
  let $slaves = $(
    $.grep(
      $dependent_slaves, 
      function(e) {
        return $(e).data('dependency-group') == dependency_group
      }
    )
  )

  // loop through all slaves of current master
  for (let i = 0; i < $slaves.length; i++) {
    let $slave = $($slaves[i])
    let $slave_btns = $slave.find('button')

    // check if slave has default else clear value
    // default will be set during button loop below
    if ($slave.find('button[data-dependency="default"]').length == 0) {
      $slave.find('input').val("")
    }

    // loop through all buttons in current slave
    for (let j = 0; j < $slave_btns.length; j++) {
      let $btn = $($slave_btns[j])
      let dependency = $btn.data('dependent-on')

      // convert values to strings for comparison
      value = boolToString(value)
      dependency = boolToString(dependency)

      // check if button is dependent and disable as appropriate
      if (dependency == value) {
        $btn.removeClass('disabled')
        $btn.removeAttr('disabled')
      }
      else {
        if ($btn.data('dependency') == "default") {
          $btn.click()
        }
        else {
          // remove in case button group has no default
          $btn.removeClass('selected')
        }

        $btn.addClass('disabled')
        $btn.attr('disabled', true)
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

// Function to update button classes incase hidden input was updated externally
function updateBtns() {
  for(let i = 0, n = $btn_groups.length; i < n; i++){
    let $btn_group = $($btn_groups[i])
    let value = $btn_group.find('input').val()
    
    if (value == "") continue

    let btns = $btn_group.find('button')
    for(let j = 0, m = btns.length; j < m; j++) {
      let $btn = $(btns[j])

      if (boolToString($btn.data("value")) == value) $btn.addClass("selected")
      else $btn.removeClass("selected")
    }
  }
}

const NoRB = {
  init: init,
  updateBtns: updateBtns
}
export default NoRB
