#!/bin/bash

# Generate the env.js file
cat > assets/env.js <<EOF
(function (window) {
  window["env"] = window["env"] || {};
EOF

# Iterate through all environment variables and populate env.js
for var in $(compgen -e); do
  value=${!var}
  echo "  window[\"env\"][\"${var}\"] = \"${value}\";" >> assets/env.js
done

# Close the env.js file
echo "})(this);" >> assets/env.js

# Start NGINX
nginx -g "daemon off;"