const express = require("express");

const ProjectService = require("../service/projectService");

function projectApi(app){
    const router = express.Router();
    app.use("/api/projects", router);

    const ProjectServices = new ProjectService();

    //Listar Todos los proyectos
    router.get("/", async function(request, response, next){
        const { tags } = request.query;
        try {
            const projects = await ProjectServices.getProjects({ tags });

            response.send(projects);

            //console.log(projects);
            
        } catch (error) {
            next(error);
        }
    });

    //Listar un proyecto
    router.get("/:projectId", async function(request, response, next){
        const { projectId } = request.params;
        try {
            const project = await ProjectServices.getProject({ projectId });

            response.status(200).json({
                data: project,
                message: "Proyecto Filtrado"
            })
        } catch (error) {
            next(error);
        }
    });

    //Crear un proyecto
    router.post("/", async function(request, response, next){
        const { body: project } = request;
        try {
            const createdProject = await ProjectServices.createProject({ project });

            response.status(201).json({
                data: createdProject,
                message: "Proyecto creado exitosamente"
            })
        } catch (error) {
            next(error)
        }
    });

    //Actualizar un proyecto
    router.put("/:projectId", async function(request, response, next){
        const { body : project } = request;
        const { projectId } = request.params;

        try {
            const updateProject = await ProjectServices.updateProject({ projectId, project})
            response.status(200).json({
                data: updateProject,
                message: "Proyecto actualizado exitosamente"
            })
        } catch (error) {
            next(error)
        }
    });

    //Eliminar un proyecto
    router.delete("/:projectId", async function(request, response, next){
        const { projectId } = request.params;
        try {
            const deleteProject = await ProjectServices.deleteProject({ projectId });

            response.status(200).json({
                data: deleteProject,
                message: "Proyecto eliminado exitosamente"
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = projectApi;