const User = require('../Models/userModel');
const bcrypt = require('bcrypt'); // Para hash de contraseñas
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'clase_IoT';

// Registro de usuarios
const signup = async (req, res) => {
    const { name, email, password, token, role } = req.body;
    console.log('Datos recibidos para registro:', req.body);

    if (!name || !email || !password || !token) {
        return res.status(400).send("<h1>Todos los campos son obligatorios</h1>");
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('El usuario ya existe:', email);
            return res.status(400).send("<h1>El usuario ya existe</h1>");
        }

        // Crear y guardar un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, token, status: "active" });
        await newUser.save();
        console.log('Usuario guardado en la base de datos:', newUser);

        res.redirect('/login');
    } catch (error) {
        console.error('Error durante el registro:', error);
        res.status(500).send("<h1>Error interno del servidor</h1>");
    }
};

// Inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Intento de inicio de sesión para el email:', email);

  try {
      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
          console.error('Usuario no encontrado:', email);
          return res.send(`
              <script>
                  alert('Usuario no encontrado. Por favor, intente nuevamente.');
                  window.location.href = '/login';
              </script>
          `);
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          console.error('Contraseña incorrecta para el email:', email);
          return res.send(`
              <script>
                  alert('Credenciales inválidas. Por favor, intente nuevamente.');
                  window.location.href = '/login';
              </script>
          `);
      }

      // Generar JWT
      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Token del usuario:', user.token);

      // Enviar el token y el correo al cliente
      res.send(`
          <script>
              // Guardar el correo y el token en sessionStorage
              sessionStorage.setItem('jwt', '${token}');
              sessionStorage.setItem('token', '${user.token}');
              sessionStorage.setItem('email', '${email}');
              window.location.href = '/dashboard';
          </script>
      `);
  } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      res.status(500).send(`
          <script>
              alert('Error interno del servidor. Por favor, intente más tarde.');
              window.location.href = '/login';
          </script>
      `);
  }
};


module.exports = { signup, login };
