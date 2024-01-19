#!/bin/bash
set -e
INTERNETIP="$(dig +short myip.opendns.com @resolver1.opendns.com -4)"
INTERNETIPv6="$(dig +short aaaa myip.opendns.com @resolver1.opendns.com)"
echo $(jq -n --arg internetip "$INTERNETIP" --arg internetipv6 "$INTERNETIPv6" '{"internet_ip":$internetip, "internet_ipv6":$internetipv6}')
# echo $(jq -n --arg internetipv6 "$INTERNETIPv6" '{"internet_ipv6":$internetipv6}')
