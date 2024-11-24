const PlantModel = require('../Models/plantModel'); // Importa tu modelo de plantas

const getDashboardData = async (req, res) => {
  try {
    const userToken = req.body.userToken; // Extraer el token del body
    if (!userToken) {
      return res.status(400).json({ error: 'No se proporcionó el token del usuario.' });
    }

    // Consultar las plantas asociadas al token del usuario
    const plants = await PlantModel.find({ token:userToken });

    console.log(plants);
    res.json({ plants });
  } catch (error) {
    console.error('Error al obtener los datos del dashboard:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { getDashboardData };
