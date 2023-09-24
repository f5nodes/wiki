export const addrBook = `curl -s {{endpoint}} > $HOME/.{{workingDirectory}}/config/addrbook.json

sudo systemctl restart {{binary}}`;
