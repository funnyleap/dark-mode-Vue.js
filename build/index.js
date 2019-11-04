/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// NPM
import vClickOutside from "v-click-outside";
import VueHotkey from "v-hotkey";

import {
  ValidationObserver,
  ValidationProvider
} from "vee-validate/dist/vee-validate.full.min";

// BASE COMPONENTS
import BaseAlert from "./../components/base/BaseAlert.vue";
import BaseAvatar from "./../components/base/BaseAvatar.vue";
import BaseBadge from "./../components/base/BaseBadge.vue";
import BaseButton from "./../components/base/BaseButton.vue";
import BaseDivider from "./../components/base/BaseDivider.vue";
import BaseHeading from "./../components/base/BaseHeading.vue";
import BaseIcon from "./../components/base/BaseIcon.vue";
import BaseProgressBar from "./../components/base/BaseProgressBar.vue";
import BaseSocialButton from "./../components/base/BaseSocialButton.vue";
import BaseSpinner from "./../components/base/BaseSpinner.vue";
import BaseToast from "./../components/base/BaseToast.vue";

// FORM COMPONENTS
import FieldCheckbox from "./../components/form/FieldCheckbox.vue";
import FieldFile from "./../components/form/FieldFile.vue";
import FieldInput from "./../components/form/FieldInput.vue";
import FieldLabel from "./../components/form/FieldLabel.vue";
import FieldMessage from "./../components/form/FieldMessage.vue";
import FieldRadios from "./../components/form/FieldRadios.vue";
import FieldSelect from "./../components/form/FieldSelect.vue";
import FieldTabs from "./../components/form/FieldTabs.vue";
import FieldTextarea from "./../components/form/FieldTextarea.vue";
import FieldToggle from "./../components/form/FieldToggle.vue";

/**************************************************************************
 * ENVIRONMENT CONFIGURATIONS
 ***************************************************************************/

// Install function executed by Vue.use()
function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  const components = {
    alert: BaseAlert,
    avatar: BaseAvatar,
    badge: BaseBadge,
    button: BaseButton,
    divider: BaseDivider,
    heading: BaseHeading,
    icon: BaseIcon,
    "progress-bar": BaseProgressBar,
    "social-button": BaseSocialButton,
    spinner: BaseSpinner,
    toast: BaseToast,
    checkbox: FieldCheckbox,
    file: FieldFile,
    input: FieldInput,
    label: FieldLabel,
    message: FieldMessage,
    radios: FieldRadios,
    select: FieldSelect,
    tabs: FieldTabs,
    textarea: FieldTextarea,
    toggle: FieldToggle
  };

  // Declare all components when options is not set or array is empty
  // Or when the user explicitely specify it
  for (let component in components) {
    if (
      !options ||
      !options.components ||
      options.components.length === 0 ||
      options.components.includes(component)
    ) {
      Vue.component("dm-" + component, components[component]);
    }
  }

  // Install Vee-Validate for form validation
  // https://logaretm.github.io/vee-validate/
  Vue.component("ValidationObserver", ValidationObserver);
  Vue.component("ValidationProvider", ValidationProvider);

  // Install V-Hotkeys to bind hotkeys to components
  // https://github.com/Dafrok/v-hotkey
  Vue.use(VueHotkey);

  // Install V-Click-Outside to react on clicks outside elements
  // https://github.com/ndelvalle/v-click-outside
  Vue.use(vClickOutside);
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export components
export default plugin;
