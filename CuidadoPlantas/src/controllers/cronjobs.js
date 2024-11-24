const cron = require('node-cron');
const DashboardController = require('./DashboardController');

// Tarea programada para actualizar el dashboard cada 15 minutos
cron.schedule('*/15 * * * *', async () => {
    console.log('Actualizando datos del dashboard...');
    try {
        await DashboardController.renderDashboard();
        console.log('Datos del dashboard actualizados con éxito.');
    } catch (err) {
        console.error('Error al actualizar el dashboard:', err);
    }
});