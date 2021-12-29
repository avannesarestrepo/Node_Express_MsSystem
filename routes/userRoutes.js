const express = require("express");

const UserService = require("../service/userService");

function userApi(app){
    const router = express.Router();
    app.use("/api/users", router);

    const UserServices = new UserService();

    //Listar todos los usuarios
    router.get("/", async function(request, response, next){
        const { tags } = request.query;
        try {
            const users = await UserServices.getUsers({ tags });

            response.status(200).json({
                data: users,
                message: "Estos son todos los usuarios"
            });
        } catch (error) {
            next(error);
        }
    });

    //Listar un usuario
    router.get("/:userId", async function(request, response, next){
        const { userId } = request.params;
        try {
            const user = await UserServices.getUser({ userId });

            response.status(200).json({
                data: user,
                message: "Usuario Filtrado"
            });
        } catch (error) {
            next(error);
        }
    });


    //Crear un usuario
    router.post("/", async function(request, response, next){
        const { body: user } = request;
        try {
            const createdUser = await UserServices.createUser({ user });

            response.status(201).json({
                data: createdUser,
                message: "Usuario creado exitosamente"
            })
        } catch (error) {
            next(error);
        }
    });

    //Actualizar un usuario
    router.put("/:userId", async function(request, response, next){
        const { body : user} = request;
        const { userId } = request.params;

        try {
            const updateUser = await UserServices.updateUser({ userId, user });
            response.status(200).json({
                data: updateUser,
                message: "Usuario actualizado exitosamente"
            });
        } catch (error) {
            next(error);
        }
    });

    //Eliminar un usuario
    router.delete("/:userId", async function(request, response, next){
        const { userId } = request.params;
        try {
            const deleteUser = await UserServices.deleteUser({ userId });

            response.status(200).json({
                data: deleteUser,
                message: "Usuario eliminado exitosamente"
            });
        } catch (error) {
            next(error);
        }
    })

}

module.exports = userApi;