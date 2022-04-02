#!/bin/bash

SERVER_IP=$1
#"185.246.153.11"
echo $SERVER_IP

ssh root@$SERVER_IP

CLIENTS_DIR=$2
CLIENT_NAME=$3
scp root@$SERVER_IP:~/clients/$CLIENT_NAME.ovpn $CLIENTS_DIR
#scp root@185.246.153.11:~/clients/kravl.ovpn ./clients/
#scp root@185.246.153.11:/root/clients/testish04367427382.ovpn /home/ashling/PROJECTS/netherland_vpn/build/clients/
exit
