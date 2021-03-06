import Sequelize from 'sequelize';

const ProfessionalModel = (sequelize: any) => {
    const Professional = sequelize.define('Professional', {
        code: Sequelize.STRING,
        dni: Sequelize.STRING,
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        pwd: Sequelize.STRING,
        mobile: Sequelize.STRING,
        email: Sequelize.STRING,
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        picture: Sequelize.STRING,
        rating: Sequelize.INTEGER,
        description: Sequelize.STRING,
        in_service: Sequelize.BOOLEAN,
        on_line: Sequelize.BOOLEAN,
        fcmtoken: Sequelize.STRING,
        comvlife: Sequelize.DOUBLE(11, 10),

    });

    return Professional;
};

export default ProfessionalModel;
