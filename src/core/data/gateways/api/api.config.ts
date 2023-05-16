// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
import { API_URL, BASE_URL } from "../../../../config"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  url: string
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: BASE_URL
}

export const API_CONFIG: ApiConfig = {
  url: API_URL
}