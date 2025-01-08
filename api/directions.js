const axios = require("axios");

module.exports = async (req, res) => {
  const { origin, destination, apiKey } = req.query;

  // Adicione cabeçalhos CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Permite apenas GET e OPTIONS
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permite cabeçalhos específicos

  // Responde para requisições OPTIONS (pré-voo do CORS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!origin || !destination || !apiKey) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: { origin, destination, key: apiKey },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const axios = require("axios");

// module.exports = async (req, res) => {
//   const { origin, destination, apiKey } = req.query;

//   if (!origin || !destination || !apiKey) {
//     return res.status(400).json({ error: "Missing required parameters" });
//   }

//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/directions/json`,
//       {
//         params: { origin, destination, key: apiKey },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
