export const addrBookTemplate = `curl -s {{endpoint}} > $HOME/.{{home}}/config/addrbook.json

sudo systemctl restart {{binary}}`;
