#!/bin/bash

echo "Generating certificates"
openssl req -x509 -nodes -subj "/CN=localhost" -newkey rsa:4096 -sha256 -keyout server.key -out server.crt -days 3650
openssl req -x509 -nodes -subj "/CN=localhost" -newkey rsa:4096 -sha256 -keyout client.key -out client.crt -days 3650



# TODO specify clients and servers via the commandline
echo "Generating trustCertCollection"
rm trusted-servers-collection
rm trusted-clients-collection
#----------------------------------------------------------
echo "Creating a new trusted servers collection "
cat server.crt >> trusted-servers-collection
#----------------------------------------------------------
echo "Creating a new trusted clients collection "
cat client.crt >> trusted-clients-collection

echo "--- DONE ---"
