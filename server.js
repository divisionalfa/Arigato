const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const SECRET_TOKEN = 'MTI2ODIzMDQzNzAwODgzODc2MQ.GCId39.vOUt94K8WLJRevJxt6aMGYAo0DnLczbzwwBlQ4'; // Remplace par ton token

app.use(bodyParser.json());

// Route pour recevoir des alertes
app.post('/alert', (req, res) => {
    const token = req.body.token;

    if (token !== SECRET_TOKEN) {
        // Log l'accès non autorisé
        const logMessage = `Tentative d'accès non autorisé avec le token : ${token}\n`;
        fs.appendFile('unauthorized_access.log', logMessage, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture dans le fichier de logs :', err);
            }
        });

        // Envoyer une alerte (par exemple, par email ou SMS) ici

        res.status(403).send('Accès non autorisé');
    } else {
        res.status(200).send('OK');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur de surveillance en écoute sur le port ${PORT}`);
});
