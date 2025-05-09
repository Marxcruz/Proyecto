const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese su nombre']
    },
    apellido: {
        type: String,
        required: [true, 'Por favor ingrese su apellido']
    },
    email: {
        type: String,
        required: [true, 'Por favor ingrese su email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Por favor confirme su contraseña'],
        validate: {
            // Esta validación solo funciona en CREATE y SAVE
            validator: function(el) {
                return el === this.password;
            },
            message: 'Las contraseñas no coinciden'
        }
    },
    role: {
        type: String,
        enum: ['usuario', 'medico', 'admin'],
        default: 'usuario'
    },
    medicoId: {
        type: Schema.Types.ObjectId,
        ref: 'Medico'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Middleware para encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    // Solo ejecutar esta función si la contraseña fue modificada
    if (!this.isModified('password')) return next();
    
    // Hash la contraseña con un costo de 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Eliminar passwordConfirm
    this.passwordConfirm = undefined;
    next();
});

// Middleware para actualizar passwordChangedAt cuando se cambia la contraseña
usuarioSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Método para verificar si la contraseña es correcta
usuarioSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Método para verificar si el usuario cambió la contraseña después de emitir el token
usuarioSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    
    // False significa que NO cambió
    return false;
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
