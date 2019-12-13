import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const UsuarioModel = (sequelize: any) => {
    const Usuario = sequelize.define(
        'Usuario',
        {
            idUsuario: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            nombre: Sequelize.STRING,
            clave: Sequelize.STRING,
            coordenadas: Sequelize.STRING,
            apellido: Sequelize.STRING,
            foto: Sequelize.STRING,
            mail: Sequelize.STRING,
            celular: Sequelize.STRING,
            ciudad: Sequelize.STRING,
            direccion: Sequelize.STRING,
            IdPais: Sequelize.INTEGER,
            IdProvincia: Sequelize.INTEGER,
        },
        {
            timestamps: false,
            tableName: 'Usuario',
            // Aliases for joins
            name: {
                singular: 'Usuario',
                plural: 'Usuarios',
            },
        }
    );

    Usuario.associate = (models: DBModelsI) => {
        Usuario.belongsTo(models.pais, {
            foreignKey: {
                name: 'IdPais',
                allowNull: false,
            },
        });
        Usuario.belongsTo(models.provincia, {
            foreignKey: {
                name: 'IdProvincia',
                allowNull: false,
            },
        });
    };

    return Usuario;
};

export default UsuarioModel;
