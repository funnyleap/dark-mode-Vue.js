/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: COMPONENTS
import BaseIcon from "../components/base/BaseIcon.vue"
import FieldLabel from "../components/fields/FieldLabel.vue"
import FieldMessage from "../components/fields/FieldMessage.vue"

// PROJECT: HELPERS
import { generateUUID } from "../helpers/helpers.js"

/**************************************************************************
 * MIXINS > FIELD
 * @docs https://vuejs.org/v2/guide/mixins.html
 ***************************************************************************/

export default {
  components: {
    BaseIcon,
    FieldLabel,
    FieldMessage
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
    fullWidth: {
      type: Boolean,
      default: false
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
    required: {
      type: Boolean,
      default: false
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
    validation: {
      type: Object,
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
    computedStatus() {
      if (this.error || this.validationMessage) {
        return "error"
      } else if (this.success) {
        return "success"
      } else if (this.warning) {
        return "warning"
      }

      return this.status
    },

    fieldMessageContent() {
      if (this.validationMessage) {
        return this.validationMessage
      } else if (this.error) {
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

    fieldMessageStatus() {
      if (this.error || this.validationMessage) {
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

    validationMessage() {
      let message = ""

      if (this.validation && this.validation.$dirty) {
        if (this.validation.required === false) {
          message = "This field is required."
        } else if (this.validation.email === false) {
          message = "This field is not a valid email."
        } else if (this.validation.minLength === false) {
          const min = this.validation.$params.minLength.min
          message = `This field is too short (min: ${min}).`
        } else if (this.validation.maxLength === false) {
          const max = this.validation.$params.minLength.max
          message = `This field is too long (max ${max}).`
        } else if (this.validation.sameAs === false) {
          const field = this.validation.$params.sameAs.eq
          message = `This field does not match: ${field}.`
        } else if (this.validation.$invalid === true) {
        } else if (this.validation.url === false) {
          message = "This field is not a valid url."
        } else if (this.validation.$invalid === true) {
          message = "This field is invalid."
        }
      }

      return message
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        // Synchronize inner value with new one
        this.innerValue = this.value
      }
    }
  },

  mounted() {
    this.uuid = generateUUID()

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
    }
  }
}
