export const addrBook = `curl -s {{endpoint}} > $HOME/.{{home}}/config/addrbook.json

sudo systemctl restart {{binary}}`;
