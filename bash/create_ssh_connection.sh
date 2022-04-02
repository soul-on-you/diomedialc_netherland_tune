#!/bin/bash

SERVER_IP=$1
echo $SERVER_IP

ssh root@$SERVER_IP

CLIENTS_DIR=$2
CLIENT_NAME=$3
scp root@$SERVER_IP:~/clients/$CLIENT_NAME.ovpn $CLIENTS_DIR

exit
