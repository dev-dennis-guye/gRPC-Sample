#!/usr/bin/env bash

echo "Generating js and ts code..."
# Required to generate .d.ts files
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"
OUT_PATH="./src/proto"

# JavaScript code generating
${GRPC_TOOLS_NODE_PROTOC} \
      --js_out=import_style=commonjs,binary:src/proto \
      --grpc_out="${OUT_PATH}" \
      --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
      -I proto \
      proto/*.proto

# Generate type script definitions
${GRPC_TOOLS_NODE_PROTOC} \
      --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
      --ts_out="${OUT_PATH}" \
      -I proto \
      proto/*.proto
echo "Done!"