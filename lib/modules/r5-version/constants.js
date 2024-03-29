// Bucket where R5 JARs are to be found
export const R5_BUCKET = 'https://r5-builds.s3.amazonaws.com'

// Recommended r5 version
export const RECOMMENDED_R5_VERSION = 'v6.4'

// R5 v4 has numerous breaking changes in worker/broker communication
export const MINIMUM_R5_VERSION = 'v4.0.0'

// Parse a version into its constituent pieces (major, minor, patch, distance from last release, commit)
export const VERSION_PARSE_REGEX = /^v([0-9]+)\.([0-9]+)-?([0-9]+)?-?.*?$/
export const OLD_VERSION_PARSE_REGEX = /^v([0-9]+)\.([0-9]+)\.([0-9]+)-?([0-9]+)?-?.*?$/
