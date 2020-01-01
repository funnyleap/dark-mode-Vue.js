/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// NPM
import { ValidationProvider } from "vee-validate"

// PROJECT: COMPONENTS
import BaseIcon from "../components/base/BaseIcon.vue"
import FieldLabel from "../components/form/FieldLabel.vue"
import FieldMessage from "../components/form/FieldMessage.vue"

// PROJECT: HELPERS
import { generateUUID } from "../helpers/helpers.js"

/**************************************************************************
 * MIXINS > FIELDS
 * @docs https://vuejs.org/v2/guide/mixins.html
 ***************************************************************************/

export default {
  components: {
    BaseIcon,
    FieldLabel,
    FieldMessage,
    ValidationProvider
  },

  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    info: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: [Object, String],
      default: null
    },
    rulesName: {
      type: String,
      default: null
    },
    rulesVid: {
      type: String,
      default: null
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: "normal",
      validator(x) {
        return ["error", "normal", "success", "warning"].includes(x)
      }
    },
    success: {
      type: String,
      default: null
    },
    warning: {
      type: String,
      default: null
    }
  },

  data: () => ({
    // --> STATE <--

    innerValue: null,
    uuid: ""
  }),

  computed: {
    computedMessageContent() {
      if (this.error) {
        return this.error
      } else if (this.success) {
        return this.success
      } else if (this.warning) {
        return this.warning
      } else if (this.info) {
        return this.info
      } else if (this.description) {
        return this.description
      }
    },

    computedMessageStatus() {
      if (this.error) {
        return "error"
      } else if (this.success) {
        return "success"
      } else if (this.warning) {
        return "warning"
      } else if (this.info) {
        return "info"
      } else if (this.description) {
        return "description"
      }
    },

    computedStatus() {
      if (this.error) {
        return "error"
      } else if (this.success) {
        return "success"
      } else if (this.warning) {
        return "warning"
      }

      return this.status
    },

    labelRequired() {
      if (!this.rules) {
        return false
      } else if (typeof this.rules === "text") {
        return this.rules.includes("required")
      } else if (typeof this.rules === "object") {
        return this.rules.required
      }
    }
  },

  watch: {
    value(value) {
      this.synchronize()
      this.validate(true)
    }
  },

  mounted() {
    this.uuid = generateUUID()

    this.synchronize()
    this.validate()

    // Focus only on desktop and larger screens
    if (this.autofocus && window.innerWidth >= 1024) {
      this.focus()
    }
  },

  methods: {
    // --> HELPERS <--

    focus() {
      const field = this.$el.querySelector(".js-tag-for-autofocus")

      field.focus()
    },

    // --> EVENT LISTENERS <--

    synchronize() {
      // Synchronize inner value with new one
      this.innerValue = this.value
    },

    validate(dirty) {
      // Validate new value with vee-validate
      this.$refs.validationProvider.validate(this.value)

      if (dirty) {
        this.$refs.validationProvider.setFlags({
          dirty: true
        })
      }
    }
  }
}
