const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// URLs do GAS (ocultas no backend)
const URL_LOGIN = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgN3LP7od-511cMvZ_Uq9CQcwt4PEMe0nDpWgFzhwCeQD2xnz2fgjJqWVnI8UYPPjn_XlzdLLwItNT7hUNgELjQGII-M2e6P4m5Hy07CSPyScNCSf1nWmeGzhNWRJK5sLfpeGcuKwL2ecx-eT6rq7zNzFjyBMf4BrSWwkvrJ8Efw-jOJNsRmHD6eFOffABuKXasVbIAId16hmy4Bs_2vWDj8t1KW48f3gVilfnsZH6tQEEwkSIBcaRItj_h9OHsu6qNNd7DMgunwYffuo0AQ1DVXmXSyyyoulO-y56fRNrxTXSn85c&lib=M3tW5QDQB73oOtWiNneTbon0hJi_LB5za';
const URL_POSTES = 'https://script.google.com/macros/s/AKfycbwQRVLB8u3nQVm192ovbOtYqBli_fbJ0stqYwfxiuF4dSTRWF_9vQme-dKkzhNUTYVr7g/exec';

// CORS liberado (pode limitar para seu domínio se quiser)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy Login
app.get('/api/login', async (req, res) => {
  try {
    const response = await fetch(URL_LOGIN);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro no proxy de login' });
  }
});

// Proxy Postes
app.get('/api/postes', async (req, res) => {
  try {
    const response = await fetch(URL_POSTES);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro no proxy de postes' });
  }
});

// Servir o frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Start Server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});