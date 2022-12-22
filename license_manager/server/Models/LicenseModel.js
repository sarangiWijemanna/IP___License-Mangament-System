import mongoose from "mongoose";

const licenseSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,

    },
    client_name: {
      type: String,
      required: true,
    },
    client_email: {
      type: String,
      required: true,
    },
    
    serial: {
      type: String,
      required: true,
    },
    decrypt_check_variable: {
      type: String,
      required: true,
    },
    product: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    
    },
    num_mgmt_iface: {
      type: Number,
      required: true,
    },
    num_bridge_iface: {
      type: Number,
      required: true,
    },
    mgmt_mac1: {
      type: String,
      required: true,
    },
    mgmt_mac2: {
      type: String,
      required: true,
    },

    inputFields:[
      {
        id:{
          type: Number,
          required: true,
        },
        br_internal_mac: {
          type: String,
          required: true,
        },
        br_external_mac: {
          type: String,
          required: true,
        }
      }
    ],

    period_in_days: {
      type: Number,
      required: true,
    },

    starting_date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const License = mongoose.model("License", licenseSchema);

export default License;
